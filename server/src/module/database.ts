import { readFileSync } from 'fs';
import mysql, { RowDataPacket } from 'mysql2/promise';
const { databaseIp, databasePort, databaseUser, databasePassword } = JSON.parse(readFileSync('config.json', 'utf-8')) as {databaseIp: string, databasePort: number, databaseUser: string, databasePassword: string};

export class Database {
    connected: boolean = false;
    promise: Promise<mysql.Connection>;
    connection: mysql.Connection | undefined;

    constructor() {
        this.promise = mysql.createConnection({
            host: databaseIp,
            port: databasePort,
            user: databaseUser,
            password: databasePassword,
            database: 'mtrq',
            supportBigNumbers: true, 
            bigNumberStrings: true
        });

        this.promise.then(async (c) => {
            this.connection = c;
            this.connected = true;

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
        if (!this.connected) await this.promise;
        await this.connection?.query(
            'INSERT INTO sessions (SSID, discordID, sessionKey, sessionKey2, builder, expires, discordName, discordAvatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [ssid, userId, key1, key2, builder, Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, discordName, discordAvatar]
        ); 
    }
    async checkSession(ssid: string) {
        if (typeof ssid !== "string" || ssid.length !== 32) return false;
        if (!this.connected) await this.promise;
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
        if (!this.connected) await this.promise;
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
        if (!this.connected) await this.promise;
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
        if (!this.connected) await this.promise;
        await this.connection?.query('DELETE FROM sessions WHERE SSID = ?', [Buffer.from(ssid, 'hex')]);
    }

    // DATA CALLS
    async addUserId(userId: string, username: string) {
        if (!this.connected) await this.promise;
        const id = await this.getId(username);
        if (id) return false;
        await this.connection?.query('INSERT INTO userids (id, name) VALUES (?, ?)', [userId, username]);
        return true;
    }
    async getUserInfo(ssid: string) {
        if (typeof ssid !== "string" || ssid.length !== 32) return false;
        if (!this.connected) await this.promise;
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
        if (!this.connected) await this.promise;
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
        if (!this.connected) await this.promise;
        const notes = await this.connection?.query('SELECT name, notes FROM locations WHERE locID = ? LIMIT 1', [locId]);
        const rows: RowDataPacket[] = notes ? notes[0] as RowDataPacket[] : [];
        return rows[0];
    }
    async getId(username: string) {
        if (!this.connected) await this.promise;
        const id = await this.connection?.query('SELECT * FROM userids WHERE name = ? LIMIT 1', [username]);
        const rows: RowDataPacket[] = id ? id[0] as RowDataPacket[] : [];
        return rows[0];
    }
    async getName(userId: string) {
        if (!this.connected) await this.promise;
        const name = await this.connection?.query('SELECT * FROM userids WHERE id = ? LIMIT 1', [userId]);
        const rows: RowDataPacket[] = name ? name[0] as RowDataPacket[] : [];
        return rows[0];
    }
    async verifyOwner(locId: string, ownerId: string) {
        if (!this.connected) await this.promise;
        const owner = await this.connection?.query('SELECT * FROM loc_owners WHERE locID = ? AND ownerID = ? LIMIT 1', [locId, ownerId]);
        const rows: RowDataPacket[] = owner ? owner[0] as RowDataPacket[] : [];
        return rows.length;
    }
    async getLocation(locId: string) {
        if (!this.connected) await this.promise;
        const location = await this.connection?.query('SELECT * FROM locations WHERE locID = ? LIMIT 1', [locId]);
        const rows: RowDataPacket[] = location ? location[0] as RowDataPacket[] : [];
        return rows[0];
    }
    async getOwners(locId: string) {
        if (!this.connected) await this.promise;
        const owners = await this.connection?.query('SELECT * FROM loc_owners WHERE locID = ?', [locId]);
        const rows: RowDataPacket[] = owners ? owners[0] as RowDataPacket[] : [];
        return rows;
    }
    async deleteLocation(locId: string) {
        if (!this.connected) await this.promise;
        await this.connection?.query('DELETE FROM locations WHERE locID = ?', [locId]);
        await this.connection?.query('DELETE FROM loc_owners WHERE locID = ?', [locId]);
    }
    async updateLocation(locId: string, name: string, type: string, notes: string, status: string, owners: string[]) {
        if (!this.connected) await this.promise;
        // Check to see if location is built or active
        const location = await this.connection?.query('SELECT * FROM locations WHERE locID = ? LIMIT 1', [locId]);
        const rows: RowDataPacket[] = location ? location[0] as RowDataPacket[] : [];
        if (rows.length === 0) return;
        const loc = rows[0];
        if (loc.status === 'built' || loc.status === 'active') {
            await this.connection?.query('UPDATE locations SET name = ?, notes = ? WHERE locID = ?', [name, notes, locId]);
        } else {
            await this.connection?.query('UPDATE locations SET name = ?, type = ?, notes = ?, status = ? WHERE locID = ?', [name, type, notes, status, locId]);
        }
        await this.connection?.query('DELETE FROM loc_owners WHERE locID = ?', [locId]);
        let i = 0;
        for (const owner of owners) {
            await this.connection?.query('INSERT INTO loc_owners (locID, ownerIndex, ownerID, ownerName) VALUES (?, ?, ?, ?)', [locId, i, owner, (await this.getName(owner)).name]);
            i++;
        }
    }
    async addLocation(name: string, type: string, notes: string, status: string, owners: string[]) {
        if (!this.connected) await this.promise;
        const next = await this.connection?.query('SELECT MAX(locID) as id from locations');
        const nextRows: RowDataPacket[] = next ? next[0] as RowDataPacket[] : [];
        const nextId = nextRows[0].id + 1;
        if (nextId === undefined) return;
        const result = await this.connection?.query('INSERT INTO locations (locID, name, type, notes, status) VALUES (?, ?, ?, ?, ?)', [nextId, name, type, notes, status]);
        const rows: RowDataPacket[] = result ? result[0] as RowDataPacket[] : [];
        let i = 0;
        for (const owner of owners) {
            await this.connection?.query('INSERT INTO loc_owners (locID, ownerIndex, ownerID, ownerName) VALUES (?, ?, ?, ?)', [nextId, i, owner, (await this.getName(owner)).name]);
            i++;
        }
        return nextId;
    }

    async logChange(locId: string, user: string, name: string, type: string, notes: string, status: string, owners: string[]) {
        if (!this.connected) await this.promise;
        // Obtain current location data
        const location = await this.connection?.query('SELECT * FROM locations WHERE locID = ? LIMIT 1', [locId]);
        const rows: RowDataPacket[] = location ? location[0] as RowDataPacket[] : [];
        if (rows.length === 0) return;
        const loc = rows[0];
        // Check for changes
        const changes: string[] = [];
        if (loc.name !== name) changes.push(`Nme ${loc.name} -> ${name}`);
        if (loc.type !== type) changes.push(`Typ ${loc.type} -> ${type}`);
        if (loc.notes !== notes) changes.push(`Not ${loc.notes.length} -> ${notes.length}`);
        if (loc.status !== status) changes.push(`Sta ${loc.status} -> ${status}`);
        const oldOwners = await this.getOwners(locId);
        const oldOwnerIds = oldOwners.map((owner) => owner.ownerID);
        const newOwnerIds = owners;
        for (const owner of oldOwnerIds) {
            if (!newOwnerIds.includes(owner)) {
                changes.push(`- Own ${owner}`);
            }
        }
        for (const owner of newOwnerIds) {
            if (!oldOwnerIds.includes(owner)) {
                changes.push(`+ Own ${owner}`);
            }
        }
        // Log changes
        if (changes.length) await this.connection?.query('INSERT INTO loc_changes (locID, user, changes) VALUES (?, ?, ?)', [locId, user, changes.join('; ')]);
    }

    async ping() {
        if (!this.connected) await this.promise;
        await this.connection?.ping();
    }
    async getUserMap() {
        if (!this.connected) await this.promise;
        const result = await this.connection?.query('SELECT * FROM userids');
        const rows: RowDataPacket[] = result ? result[0] as RowDataPacket[] : [];
        const map: Record<string, string> = {};
        for (const row of rows) {
            map[row.ID] = row.name;
        }
        return map;
    }
}

export enum BuilderStatus {
    SUCCESS, UNAUTHORIZED, INVALID
}