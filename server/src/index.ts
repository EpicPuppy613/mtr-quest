import 'source-map-support/register.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import { readFileSync } from 'fs';
import { endAuth, exchangeAccessToken, generateSessionToken, getMemberInfo, getUserInfo } from './module/util.js';
import { BuilderStatus, Database } from './module/database.js';
const { port } = JSON.parse(readFileSync('config.json', 'utf-8')) as {port: number};

const db = new Database();
const app = express();

app.use(cookieParser());

// WEB ENDPOINTS

app.get('/', async ({ query, cookies }, response) => {
	const { code, suppress } = query;

    if (!(suppress && suppress.length)) {
        if (code && typeof code === 'string' && code.length) {
            const accessToken = await exchangeAccessToken(code);
            if (accessToken === null) {
                response.status(401).send('Unauthorized');
                return;
            }
            const user = await getUserInfo(accessToken.access_token);
            if (user === null) {
                response.status(401).send('Unauthorized');
                return;
            }
            const member = await getMemberInfo(accessToken.access_token);
            if (member === null) {
                response.status(500).send('Internal Server Error');
                return;
            }
            await endAuth(accessToken.access_token);
            const keys = crypto.getRandomValues(new Uint32Array(2));
            const session = generateSessionToken(user.id, keys[0].toString(), keys[1].toString());
            db.addSession(session, user.id, keys[0].toString(), keys[1].toString(), member.roles.includes('998873642119208981'), user.username, user.avatar);
            response.cookie('ssid', session.toString('hex'), { maxAge: accessToken.expires_in * 1000 });
            response.redirect('/home');
            console.log(`[${new Date().toISOString()}] New session: ${session.toString('hex').substring(0, 6)}.. for ${user.username} (${user.id}) ${member.roles.includes('998873642119208981') ? '- Builder' : ''}`);
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
    if (!cookies || !cookies.ssid) {
        response.status(401).send('Unauthorized');
        return;
    }
    const user = await db.getBuilder(cookies.ssid);
    if (!user) {
        response.status(401).send('Unauthorized');
        return;
    }
    let showAll = false;
    if (headers) {
        showAll = headers['show-all'] === '1';
    }
    const locations = await db.getLocations(user, showAll);
    response.json(locations);
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

setInterval(async () => {
    await db.ping();
}, 60000);

app.listen(port, () => console.log(`[${new Date().toISOString()}] App listening at http://localhost:${port}`));