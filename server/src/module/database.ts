import mysql, { RowDataPacket } from 'mysql2/promise';

export class Database {
    connection: mysql.Connection | undefined;

    constructor() {
        mysql.createConnection({
            host: '192.168.86.26',
            port: 3306,
            user: 'epicpuppy',
            password: 'password',
            database: 'mtrq'
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

    async addSession(ssid: Buffer, userId: string, sessionKey: string, builder: boolean) {
        if (this.connection === undefined) await this.connection;
        await this.connection?.query(
            'INSERT INTO sessions (SSID, discordID, sessionKey, builder, expires) VALUES (?, ?, ?, ?, ?)', 
            [ssid, userId, sessionKey, builder, Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7]
        ); 
    }

    async checkSession(ssid: string) {
        if (typeof ssid !== "string" || ssid.length !== 32) return false;
        if (this.connection === undefined) await this.connection;
        const result = await this.connection?.query('SELECT * FROM sessions WHERE SSID = ? LIMIT 1', [Buffer.from(ssid, 'hex')]);
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

    async dropSession(ssid: string) {
        if (typeof ssid !== "string" || ssid.length !== 32) return;
        if (this.connection === undefined) await this.connection;
        await this.connection?.query('DELETE FROM sessions WHERE SSID = ?', [Buffer.from(ssid, 'hex')]);
    }
}