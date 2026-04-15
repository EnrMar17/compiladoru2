import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dbFolder = path.join(process.cwd(), "databases");

if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder);
}

export function getDB(nombre: string) {

  const limpio = nombre.replace(/[^a-zA-Z0-9_]/g, "");

  const dbPath = path.join(dbFolder, `${limpio}.db`);

  const db = new Database(dbPath);

  db.exec("PRAGMA foreign_keys = ON");

  return db;
}