import 'source-map-support/register.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import { readFileSync } from 'fs';
import { endAuth, exchangeAccessToken, generateSessionToken, getMemberInfo, getUserInfo } from './module/util.js';
import { Database } from './module/database.js';
const { port } = JSON.parse(readFileSync('config.json', 'utf-8')) as {port: number};

const db = new Database();
const app = express();

app.use(cookieParser());

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
            const key = crypto.getRandomValues(new Uint32Array(1))[0];
            const session = generateSessionToken(user.id, key.toString());
            db.addSession(session, user.id, key.toString(), member.roles.includes('998873642119208981'));
            response.cookie('ssid', session.toString('hex'), { maxAge: accessToken.expires_in * 1000 });
            response.redirect('/home');
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

app.use('/assets', express.static('assets'));

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));