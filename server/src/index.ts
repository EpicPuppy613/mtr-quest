import 'source-map-support/register.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { readFileSync } from 'fs';
import { endAuth, exchangeAccessToken, generateSessionToken, getMemberInfo, getUserInfo } from './module/util.js';
import { BuilderStatus, Database } from './module/database.js';
import { APIGuildMember, APIUser, RESTPostOAuth2AccessTokenResult } from 'discord.js';
import winston from 'winston';
const { port } = JSON.parse(readFileSync('config.json', 'utf-8')) as {port: number};

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/server.log' }),
    ]
})

function validate(response: express.Response, condition: boolean, code: number, message: string) {
    if (condition) {
        response.status(code).send(message);
        return true;
    }
    return false;
}

const db = new Database();
const userMap = await db.getUserMap();
const app = express();

function getName(id: string) {
    return userMap[id] || null;
}
function getId(name: string) {
    for (const [id, uname] of Object.entries(userMap)) {
        if (uname === name) return id;
    }
    return null;
}

app.use(cookieParser());
app.use(bodyParser.json());

// WEB ENDPOINTS

app.get('/', async ({ query, cookies }, response) => {
	const { code, suppress } = query;

    if (!(suppress && suppress.length)) {
        if (code && typeof code === 'string' && code.length) {
            const accessToken = await exchangeAccessToken(code) as RESTPostOAuth2AccessTokenResult;
            if (validate(response, accessToken === null, 401, 'Unauthorized')) return;
            const user = await getUserInfo(accessToken.access_token) as APIUser;
            if (validate(response, user === null, 401, 'Unauthorized')) return;
            const member = await getMemberInfo(accessToken.access_token) as APIGuildMember;
            if (validate(response, member === null, 401, 'Unauthorized')) return;
            await endAuth(accessToken.access_token);
            const keys = crypto.getRandomValues(new Uint32Array(2));
            const session = generateSessionToken(user.id, keys[0].toString(), keys[1].toString());
            await db.addSession(session, user.id, keys[0].toString(), keys[1].toString(), member.roles.includes('998873642119208981'), user.username, user.avatar);
            response.cookie('ssid', session.toString('hex'), { maxAge: accessToken.expires_in * 1000 });
            response.redirect('/home');
            logger.info(`Session create: ${session.toString('hex').substring(0, 6)}.. ${user.username} (${user.id}) ${member.roles.includes('998873642119208981') ? '- B' : ''}`);
            if (member.roles.includes('998873642119208981')) {
                if (await db.addUserId(user.id, user.username)) {
                    userMap[user.id] = user.username;
                };
            }
            return;
        }
    
        // Get cookie
        if (cookies && cookies.ssid) {
            if (await db.checkSession(cookies.ssid)) {
                response.redirect('/home');
                return;
            }
        }
    }

	return response.sendFile('assets/index.html', { root: '.' });
});

app.get('/home', async ({ cookies }, response) => {
    if (cookies && cookies.ssid) {
        if (await db.checkSession(cookies.ssid)) {
            return response.sendFile('assets/home.html', { root: '.' });
        }
    }
    return response.redirect('/');
});

app.get('/manage', async ({ cookies }, response) => {
    if (cookies && cookies.ssid) {
        const status = await db.checkBuilder(cookies.ssid);
        if (status == BuilderStatus.SUCCESS) {
            return response.sendFile('assets/manage.html', { root: '.' });
        }
        if (status == BuilderStatus.UNAUTHORIZED) {
            return response.redirect('/home#unauthorized');
        }
    }
    return response.redirect('/');
});

app.use('/assets', express.static('assets'));

// API ENDPOINTS

app.get('/api/locations', async ({ cookies, headers }, response) => {
    if (validate(response, !cookies || !cookies.ssid, 401, 'Unauthorized')) return;
    const user = await db.getBuilder(cookies.ssid);
    if (validate(response, !user, 401, 'Unauthorized')) return;
    let showAll = false;
    if (headers) {
        showAll = headers['show-all'] === '1';
    }
    const locations = await db.getLocations(user, showAll);
    response.json(locations);
    return;
});

app.get('/api/locations/details', async ({ cookies, headers }, response) => {
    if (validate(response, !cookies || !cookies.ssid, 401, 'Unauthorized')) return;
    const user = await db.getBuilder(cookies.ssid);
    if (validate(response, !user, 401, 'Unauthorized')) return;
    const { id } = headers as {id: string};
    if (validate(response, typeof id !== 'string' || id.length === 0, 400, 'Bad Request')) return;
    // Verify ownership
    const verify = await db.verifyOwner(id, user);
    if (validate(response, !verify, 401, 'Unauthorized')) return;
    const location = await db.getLocation(id);
    if (validate(response, !location, 404, 'Not Found')) return;
    const owners = await db.getOwners(id);
    if (validate(response, !owners, 404, 'Not Found')) return;
    const loc = {
        ...location,
        owners: owners
    }
    response.json(loc);
    return;
});

app.delete('/api/locations', async ({ cookies, headers }, response) => {
    if (validate(response, !cookies || !cookies.ssid, 401, 'Unauthorized')) return;
    const user = await db.getBuilder(cookies.ssid);
    if (validate(response, !user, 401, 'Unauthorized')) return;
    const { id } = headers as {id: string};
    if (validate(response, typeof id !== 'string' || id.length === 0, 400, 'Bad Request')) return;
    // Verify ownership
    const verify = await db.verifyOwner(id, user);
    if (validate(response, !verify, 401, 'Unauthorized')) return;
    const location = await db.getLocation(id);
    if (validate(response, !location, 404, 'Not Found')) return;
    await db.deleteLocation(id);
    response.status(200).send('OK');
    logger.info(`Loc delete: ${location.name} (${id}) by ${getName(user)} (${user})`);
    return;
});

app.put('/api/locations', async ({ cookies, body }, response) => {
    if (validate(response, !cookies || !cookies.ssid, 401, 'Unauthorized')) return;
    const user = await db.getBuilder(cookies.ssid);
    if (validate(response, !user, 401, 'Unauthorized')) return;
    const { id, name, type, notes, status, owners } = body as {id: number, name: string, type: string, notes: string, status: string, owners: string[]};
    // Verify ownership
    const verify = await db.verifyOwner(id.toString(), user);
    if (validate(response, !verify, 401, 'Unauthorized')) return;
    const location = await db.getLocation(id.toString());
    if (validate(response, !location, 404, 'Not Found')) return;
    if (validate(response, typeof id !== 'number' || id <= 0, 400, 'Bad Request')) return;
    if (validate(response, typeof name !== 'string' || name.length === 0, 400, 'Bad Request')) return;
    if (validate(response, typeof type !== 'string' || type.length === 0, 400, 'Bad Request')) return;
    if (validate(response, typeof status !== 'string' || status.length === 0, 400, 'Bad Request')) return;
    if (validate(response, typeof owners !== 'object' || !Array.isArray(owners), 400, 'Bad Request')) return;
    await db.logChange(id.toString(), user, name, type, notes, status, owners);
    await db.updateLocation(id.toString(), name, type, notes, status, owners);
    response.status(200).send('OK');
    logger.info(`Loc update: ${name} (${id}) by ${getName(user)} (${user})`);
    return;
});

app.post('/api/locations', async ({ cookies, body }, response) => {
    if (validate(response, !cookies || !cookies.ssid, 401, 'Unauthorized')) return;
    const user = await db.getBuilder(cookies.ssid);
    if (validate(response, !user, 401, 'Unauthorized')) return;
    const { name, type, notes, status, owners } = body as {id: number, name: string, type: string, notes: string, status: string, owners: string[]};
    if (validate(response, typeof name !== 'string' || name.length === 0, 400, 'Bad Request')) return;
    if (validate(response, typeof type !== 'string' || type.length === 0, 400, 'Bad Request')) return;
    if (validate(response, typeof status !== 'string' || status.length === 0, 400, 'Bad Request')) return;
    if (validate(response, typeof owners !== 'object' || !Array.isArray(owners), 400, 'Bad Request')) return;
    const id = await db.addLocation(name, type, notes, status, owners);
    response.status(200).send('OK');
    logger.info(`Loc create: ${name} (${id}) by ${getName(user)} (${user})`);
    return;
});

app.get('/api/notes', async ({ query, cookies }, response) => {
    if (!cookies || !cookies.ssid) {
        response.status(401).send('Unauthorized');
        return;
    }
    const user = await db.getBuilder(cookies.ssid);
    if (!user) {
        response.status(401).send('Unauthorized');
        return;
    }
    const { id } = query;
    if (typeof id !== 'string' || id.length === 0) {
        response.status(400).send('Bad Request');
        return;
    }
    const notes = await db.getNotes(id);
    response.json(notes);
    return;
});

app.get('/api/user', async ({ cookies }, response) => {
    if (!cookies || !cookies.ssid) {
        response.status(401).send('Unauthorized');
        return;
    }
    const user = await db.getUserInfo(cookies.ssid);
    if (!user) {
        response.status(401).send('Unauthorized');
        return;
    }
    response.json(user);
    return;
});

app.get('/api/userid', async ({ cookies, headers }, response) => {
    if (!cookies || !cookies.ssid) {
        response.status(401).send('Unauthorized');
        return;
    }
    const { name } = headers;
    if (typeof name !== 'string' || name.length === 0) {
        response.status(400).send('Bad Request');
        return; 
    }
    const user = {
        ID: getId(name),
        name
    }
    if (!user.ID) {
        response.status(404).send('Not Found');
        return;
    }
    response.json(user);
    return;
});

setInterval(async () => {
    await db.ping();
}, 60000);

app.listen(port, () => logger.info(`Server started on port ${port}`));