import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const nombre = url.searchParams.get("nombre");

    const dbFolder = path.join(process.cwd(), "databases");

    // LISTAR BASES DE DATOS
    if (!nombre) {
      const archivos = fs.readdirSync(dbFolder);

      const bases = archivos
        .filter((f) => f.endsWith(".db"))
        .map((f) => f.replace(".db", ""));

      return NextResponse.json({ bases });
    }

    // LEER UNA BD ESPECÍFICA
    const db = getDB(nombre);

    // tablas
    const tablas = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table'")
      .all();

    let resultado: any[] = [];

    for (let t of tablas) {
      const nombreTabla = t.name;

      // columnas
      const columnas = db.prepare(`PRAGMA table_info(${nombreTabla})`).all();

      // foreign keys
      const foreignKeys = db
        .prepare(`PRAGMA foreign_key_list(${nombreTabla})`)
        .all();

      resultado.push({
        tabla: nombreTabla,
        columnas,
        foreignKeys,
      });
    }

    return NextResponse.json({ tablas: resultado });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
