import { Database } from "./database.js";

export class IdMap {
    private idMap: Map<string, IdEntry> = new Map();
    private nameMap: Map<string, IdEntry> = new Map();

    set(entry: IdEntry) {
        this.idMap.set(entry.id, entry);
        this.nameMap.set(entry.name, entry);
    }
    
    getId(name: string) {
        return this.nameMap.get(name)?.id;
    }
    getName(id: string) {
        return this.idMap.get(id)?.name;
    }

    remove(id: string) {
        const entry = this.idMap.get(id);
        if (entry) {
            this.idMap.delete(id);
            this.nameMap.delete(entry.name);
        }
    }
}

export class Cache {
    private static idMap = new IdMap();
    private static sessionMap: Map<string, SessionEntry> = new Map();
    private static db: Database;

    static async populate(db: Database) {
        this.db = db;
        const ids = await db.getUserMap();
        for (const [id, name] of Object.entries(ids)) {
            this.idMap.set(new IdEntry(id, name));
        }
    }

    static addId(id: string, name: string) {
        const entry = new IdEntry(id, name);
        this.idMap.set(entry);
        return entry;
    }
    static getName(id: string) {
        return this.idMap.getName(id);
    }
    static getId(name: string) {
        return this.idMap.getId(name);
    }

    static addSession(ssid: string, expires: number, dId: string, dName: string, dAvatar: string, builder: boolean) {
        const entry = new SessionEntry(ssid, expires, dId, dName, dAvatar, builder);
        this.sessionMap.set(ssid, entry);
        return entry;
    }
    static useSession(ssid: string) {
        const session = this.sessionMap.get(ssid);
        if (!session) return;
        session.used = Date.now();
        return session;
    }
    static async getSession(ssid: string) {
        const entry = this.useSession(ssid);
        if (entry) return entry;
        const session = await this.db.getSession(ssid);
        if (!session) return;
        return this.addSession(session.SSID.toString('hex'), session.expires, session.discordID, session.discordName, session.discordAvatar, session.builder);
    }
    static async getBuilder(ssid: string): Promise<false | string> {
        const entry = await this.getSession(ssid);
        if (entry && entry.builder) return entry.dId;
        return false;
    }
    static trimSessions() {
        const keys = this.sessionMap.keys();
        const time = Date.now();
        for (const key of keys) {
            if (time - this.sessionMap.get(key)!.used > 60 * 60 * 1000) this.sessionMap.delete(key);
        }
    }
}

class IdEntry {
    id: string;
    name: string;
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}

class SessionEntry {
    ssid: string;
    expires: number;
    dId: string;
    dName: string;
    dAvatar: string;
    builder: boolean;
    used: number;

    constructor(ssid: string, expires: number, dId: string, dName: string, dAvatar: string, builder: boolean) {
        this.ssid = ssid;
        this.expires = expires;
        this.dId = dId;
        this.dName = dName;
        this.dAvatar = dAvatar;
        this.builder = builder;
        this.used = Date.now();
    }
}