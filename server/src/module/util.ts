import { request } from 'undici';
import { readFileSync } from 'fs';
import { APIGuildMember, APIUser, RESTPostOAuth2AccessTokenResult } from 'discord.js';
import { createHash } from 'crypto';
const { clientId, clientSecret, port } = JSON.parse(readFileSync('config.json', 'utf-8')) as {clientId: string, clientSecret: string, port: number};

export async function exchangeAccessToken(code: string): Promise<RESTPostOAuth2AccessTokenResult | null> {
    try {
        const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                code: code as string,
                grant_type: 'authorization_code',
                redirect_uri: `http://localhost:8080`,
                scope: 'identify',
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return await tokenResponseData.body.json() as RESTPostOAuth2AccessTokenResult;
    } catch (error) {
        // NOTE: An unauthorized token will not throw an error
        // tokenResponseData.statusCode will be 401
        console.error(error);
        return null;
    }
}

export async function getUserInfo(accessToken: string): Promise<APIUser | null> {
    try {
        const userResponseData = await request('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return await userResponseData.body.json() as APIUser;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export async function getMemberInfo(accessToken: string): Promise<APIGuildMember | null> {
    try {
        const memberResponseData = await request('https://discord.com/api/users/@me/guilds/763273460465270816/member', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return await memberResponseData.body.json() as APIGuildMember;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export async function endAuth(accessToken: string): Promise<void> {
    try {
        await request('https://discord.com/api/oauth2/token/revoke', {
            method: 'POST',
            body: new URLSearchParams({
                token: accessToken,
            }).toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    }
    catch (error) {
        console.error(error);
    }
}

export function generateSessionToken(userId: string, sessionKey: string) {
    let string = `${userId}:${sessionKey}`;
    return createHash('md5').update(string).digest();
}