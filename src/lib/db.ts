import Database from "better-sqlite3";

const db = new Database("mi_base.db");

db.exec("PRAGMA foreign_keys = ON");

export default db;