import { readFileSync } from 'fs';
import mysql, { RowDataPacket } from 'mysql2/promise';
const { databaseIp, databasePort, databaseUser, databasePassword } = JSON.parse(readFileSync('config.json', 'utf-8')) as {databaseIp: string, databasePort: number, databaseUser: string, databasePassword: string};

export class Database {
    connection: mysql.Connection | undefined;

    constructor() {
        mysql.createConnection({
            host: databaseIp,
            port: databasePort,
            user: databaseUser,
            password: databasePassword,
            database: 'mtrq',
            supportBigNumbers: true, 
            bigNumberStrings: true
        }).then(async (c) => {
            this.connection = c;

            // Perform full session check and expiration
            const result = await this.connection?.query('SELECT * FROM sessions');
            const rows: RowDataPacket[] = result ? result[0] as RowDataPacket[] : [];
            for (const session of rows) {
                if (parseInt(session.expires) < Math.floor(Date.now() / 1000)) {
                    this.dropSession(session.SSID.toString('hex'));
                }
            }
        });
    }

    // SESSIONS AND AUTHORIZATION
    async addSession(ssid: Buffer, userId: string, key1: string, key2: string, builder: boolean, discordName: string, discordAvatar: string | null) {
        if (this.connection === undefined) await this.connection;
        await this.connection?.query(
            'INSERT INTO sessions (SSID, discordID, sessionKey, sessionKey2, builder, expires, discordName, discordAvatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [ssid, userId, key1, key2, builder, Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, discordName, discordAvatar]
        ); 
    }
    async checkSession(ssid: string) {
        if (typeof ssid !== "string" || ssid.length !== 32) return false;
        if (this.connection === undefined) await this.connection;
        const result = await this.connection?.query('SELECT expires FROM sessions WHERE SSID = ? LIMIT 1', [Buffer.from(ssid, 'hex')]);
        const rows: RowDataPacket[] = result ? result[0] as RowDataPacket[] : [];
        // assume first session
        const session = rows[0];
        if (!session) return false;
        // check to make sure session is not expired
        if (session && parseInt(session.expires) < Math.floor(Date.now() / 1000)) {
            this.dropSession(ssid);
            return false;
        }
        return true;
    }
    async checkBuilder(ssid: string) {
        if (typeof ssid !== "string" || ssid.length !== 32) return false;
        if (this.connection === undefined) await this.connection;
        const result = await this.connection?.query('SELECT builder, expires FROM sessions WHERE SSID = ? LIMIT 1', [Buffer.from(ssid, 'hex')]);
        const rows: RowDataPacket[] = result ? result[0] as RowDataPacket[] : [];
        // assume first session
        const session = rows[0];
        if (!session) return BuilderStatus.INVALID;
        // check to make sure session is not expired
        if (session && parseInt(session.expires) < Math.floor(Date.now() / 1000)) {
            this.dropSession(ssid);
            return BuilderStatus.INVALID;
        }
        if (session.builder) return BuilderStatus.SUCCESS;
        return BuilderStatus.UNAUTHORIZED;
    }
    async getBuilder(ssid: string) {
        if (typeof ssid !== "string" || ssid.length !== 32) return false;
        if (this.connection === undefined) await this.connection;
        const result = await this.connection?.query('SELECT discordID, builder, expires FROM sessions WHERE SSID = ? LIMIT 1', [Buffer.from(ssid, 'hex')]);
        const rows: RowDataPacket[] = result ? result[0] as RowDataPacket[] : [];
        // assume first session
        const session = rows[0];
        if (!session) return false;
        // check to make sure session is not expired
        if (session && parseInt(session.expires) < Math.floor(Date.now() / 1000)) {
            this.dropSession(ssid);
            return false;
        }
        if (!session.builder) return false;
        return session.discordID;
    }
    async dropSession(ssid: string) {
        if (typeof ssid !== "string" || ssid.length !== 32) return;
        if (this.connection === undefined) await this.connection;
        await this.connection?.query('DELETE FROM sessions WHERE SSID = ?', [Buffer.from(ssid, 'hex')]);
    }

    // DATA CALLS
    async getUserInfo(ssid: string) {
        if (typeof ssid !== "string" || ssid.length !== 32) return false;
        if (this.connection === undefined) await this.connection;
        const result = await this.connection?.query('SELECT discordID, discordName, discordAvatar, expires FROM sessions WHERE SSID = ? LIMIT 1', [Buffer.from(ssid, 'hex')]);
        const rows: RowDataPacket[] = result ? result[0] as RowDataPacket[] : [];
        // assume first session
        const session = rows[0];
        if (!session) return false;
        // check to make sure session is not expired
        if (session && parseInt(session.expires) < Math.floor(Date.now() / 1000)) {
            this.dropSession(ssid);
            return false;
        }
        return session;
    }
    async getLocations(builderId: string, showAll: boolean = false) {
        if (this.connection === undefined) await this.connection;
        const locationIds = await this.connection?.query(`SELECT locID FROM loc_owners${showAll ? "" : ` WHERE ownerID = ${builderId}`}`);
        const ids: RowDataPacket[] = locationIds ? locationIds[0] as RowDataPacket[] : [];
        if (ids.length === 0) return [];
        const idList = ids.map((id) => id.locID);
        const idString = idList.join(',');
        const locations = await this.connection?.query(
            `SELECT locations.locID, locations.name, locations.type, locations.status, GROUP_CONCAT(loc_owners.ownerName) as "owners" FROM locations LEFT JOIN loc_owners ON locations.locID = loc_owners.locID WHERE locations.locID IN (${idString}) GROUP BY locations.locID`
        );
        const rows: RowDataPacket[] = locations ? locations[0] as RowDataPacket[] : [];
        return rows;
    }
    async getNotes(locId: string) {
        if (this.connection === undefined) await this.connection;
        const notes = await this.connection?.query('SELECT name, notes FROM locations WHERE locID = ? LIMIT 1', [locId]);
        const rows: RowDataPacket[] = notes ? notes[0] as RowDataPacket[] : [];
        return rows[0];
    }

    async ping() {
        if (this.connection === undefined) await this.connection;
        await this.connection?.ping();
    }
}

export enum BuilderStatus {
    SUCCESS, UNAUTHORIZED, INVALID
}