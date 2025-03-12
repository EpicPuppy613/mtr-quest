import 'source-map-support/register.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { readFileSync } from 'fs';
import { endAuth, exchangeAccessToken, generateSessionToken, getMemberInfo, getUserInfo } from './module/util.js';
import { BuilderStatus, Database } from './module/database.js';
import { APIGuildMember, APIUser, RESTPostOAuth2AccessTokenResult } from 'discord.js';
import winston from 'winston';
import { Cache } from './module/cache.js';
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
const app = express();

await Cache.populate(db);

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
                    Cache.addId(user.id, user.username);
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
        if (await Cache.getSession(cookies.ssid)) {
            return response.sendFile('assets/home.html', { root: '.' });
        }
    }
    return response.redirect('/');
});

app.get('/manage', async ({ cookies }, response) => {
    if (cookies && cookies.ssid) {
        const status = await Cache.getSession(cookies.ssid);
        if (!status) return response.redirect('/');
        if (status.builder) {
            return response.sendFile('assets/manage.html', { root: '.' });
        }
        return response.redirect('/home#unauthorized');
    }
    return response.redirect('/');
});

app.use('/assets', express.static('assets'));

// API ENDPOINTS

app.get('/api/locations', async ({ query, cookies }, response) => {
    if (validate(response, !cookies || !cookies.ssid, 401, 'Unauthorized')) return;
    const user = await Cache.getBuilder(cookies.ssid);
    if (validate(response, !user, 401, 'Unauthorized')) return;
    let showAll = false;
    if (query) {
        showAll = query.showAll == '1';
    }
    const locations = await db.getLocations(user as string, showAll);
    response.json(locations);
    return;
});

app.get('/api/locations/details', async ({ query, cookies }, response) => {
    if (validate(response, !cookies || !cookies.ssid, 401, 'Unauthorized')) return;
    const user = await Cache.getBuilder(cookies.ssid);
    if (validate(response, !user, 401, 'Unauthorized')) return;
    const { id } = query as {id: string};
    if (validate(response, typeof id !== 'string' || id.length === 0, 400, 'Bad Request')) return;
    // Verify ownership
    const verify = await db.verifyOwner(id, user as string);
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

app.delete('/api/locations', async ({ query, cookies }, response) => {
    if (validate(response, !cookies || !cookies.ssid, 401, 'Unauthorized')) return;
    const user = await Cache.getBuilder(cookies.ssid);
    if (validate(response, !user, 401, 'Unauthorized')) return;
    const { id } = query as {id: string};
    if (validate(response, typeof id !== 'string' || id.length === 0, 400, 'Bad Request')) return;
    // Verify ownership
    const verify = await db.verifyOwner(id, user as string);
    if (validate(response, !verify, 401, 'Unauthorized')) return;
    const location = await db.getLocation(id);
    if (validate(response, !location, 404, 'Not Found')) return;
    await db.deleteLocation(id);
    response.status(200).send('OK');
    logger.info(`Loc delete: ${location.name} (${id}) by ${Cache.getName(user as string)} (${user})`);
    return;
});

app.put('/api/locations', async ({ cookies, body }, response) => {
    if (validate(response, !cookies || !cookies.ssid, 401, 'Unauthorized')) return;
    const user = await Cache.getBuilder(cookies.ssid);
    if (validate(response, !user, 401, 'Unauthorized')) return;
    const { id, name, type, notes, status, owners } = body as {id: number, name: string, type: string, notes: string, status: string, owners: string[]};
    // Verify ownership
    const verify = await db.verifyOwner(id.toString(), user as string);
    if (validate(response, !verify, 401, 'Unauthorized')) return;
    const location = await db.getLocation(id.toString());
    if (validate(response, !location, 404, 'Not Found')) return;
    if (validate(response, typeof id !== 'number' || id <= 0, 400, 'Bad Request')) return;
    if (validate(response, typeof name !== 'string' || name.length === 0, 400, 'Bad Request')) return;
    if (validate(response, typeof type !== 'string' || type.length === 0, 400, 'Bad Request')) return;
    if (validate(response, typeof status !== 'string' || status.length === 0, 400, 'Bad Request')) return;
    if (validate(response, typeof owners !== 'object' || !Array.isArray(owners), 400, 'Bad Request')) return;
    await db.logChange(id.toString(), user as string, name, type, notes, status, owners);
    await db.updateLocation(id.toString(), name, type, notes, status, owners);
    response.status(200).send('OK');
    logger.info(`Loc update: ${name} (${id}) by ${Cache.getName(user as string)} (${user})`);
    return;
});

app.post('/api/locations', async ({ cookies, body }, response) => {
    if (validate(response, !cookies || !cookies.ssid, 401, 'Unauthorized')) return;
    const user = await Cache.getBuilder(cookies.ssid);
    if (validate(response, !user, 401, 'Unauthorized')) return;
    const { name, type, notes, status, owners } = body as {id: number, name: string, type: string, notes: string, status: string, owners: string[]};
    if (validate(response, typeof name !== 'string' || name.length === 0, 400, 'Bad Request')) return;
    if (validate(response, typeof type !== 'string' || type.length === 0, 400, 'Bad Request')) return;
    if (validate(response, typeof status !== 'string' || status.length === 0, 400, 'Bad Request')) return;
    if (validate(response, typeof owners !== 'object' || !Array.isArray(owners), 400, 'Bad Request')) return;
    const id = await db.addLocation(name, type, notes, status, owners);
    response.status(200).send('OK');
    logger.info(`Loc create: ${name} (${id}) by ${Cache.getName(user as string)} (${user})`);
    return;
});

app.get('/api/notes', async ({ query, cookies }, response) => {
    if (validate(response, !cookies || !cookies.ssid, 401, 'Unauthorized')) return;
    const user = await Cache.getBuilder(cookies.ssid);
    if (validate(response, !user, 401, 'Unauthorized')) return;
    const { id } = query;
    if (validate(response, typeof id !== 'string' || id.length === 0, 400, 'Bad Request')) return;
    const notes = await db.getNotes(id as string);
    response.json(notes);
    return;
});

app.get('/api/user', async ({ cookies }, response) => {
    if (validate(response, !cookies || !cookies.ssid, 401, 'Unauthorized')) return;
    const user = await Cache.getSession(cookies.ssid);
    if (validate(response, !user, 401, 'Unauthorized')) return;
    response.json({
        discordID: user!.dId,
        discordName: user!.dName,
        discordAvatar: user!.dAvatar
    });
    return;
});

app.get('/api/userid', async ({ query, cookies }, response) => {
    if (validate(response, !cookies || !cookies.ssid, 401, 'Unauthorized')) return;
    const { name } = query;
    if (validate(response, typeof name !== 'string' || name.length === 0, 400, 'Bad Request')) return;
    const user = {
        ID: Cache.getId(name as string),
        name
    }
    if (validate(response, !user.ID, 404, 'Not Found')) return;
    response.json(user);
    return;
});

// Every 10 minutes, run a maintainence pass
setInterval(async () => {
    await db.ping();
    Cache.trimSessions();
}, 600000);

app.listen(port, () => logger.info(`Server started on port ${port}`));