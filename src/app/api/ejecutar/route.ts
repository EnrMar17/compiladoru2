import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { sql } = await req.json();

    if (!sql || typeof sql !== "string") {
      return NextResponse.json({ error: "SQL no válido" }, { status: 400 });
    }

    // detectar nombre BD
    const match = sql.match(/CREATE DATABASE (\w+)/i);
    const nombreBD = match ? match[1] : "default";

    const dbPath = path.join(process.cwd(), "databases", `${nombreBD}.db`);
    const existe = fs.existsSync(dbPath);

    const url = new URL(req.url);
    const overwrite = url.searchParams.get("overwrite");

    if (existe && overwrite !== "true") {
      return NextResponse.json({
        existe: true,
        mensaje: `La base "${nombreBD}" ya existe`,
      });
    }

    if (existe && overwrite === "true") {
      try {
        fs.unlinkSync(dbPath);
      } catch (err: any) {
        return NextResponse.json(
          { error: "No se pudo sobrescribir la base (archivo en uso)" },
          { status: 500 },
        );
      }
    }

    const db = getDB(nombreBD);

<<<<<<< HEAD
    // +limpiar SQL
=======
>>>>>>> 5f4174fcbdd698ddda86707fca08b3c7fcac6d06
    let sqlLimpio = sql
      .replace(/CREATE DATABASE .*?;/gi, "")
      .replace(/USE .*?;/gi, "")
      .replace(/AUTO_INCREMENT/gi, "")
      .replace(/ENGINE=.*?;/gi, "");

    const instrucciones = sqlLimpio.split(";");

    for (let inst of instrucciones) {
      const limpia = inst.trim();
      if (!limpia) continue;

      try {
        db.prepare(limpia).run();
      } catch (e: any) {
        db.close();
        return NextResponse.json(
          {
            error: "Error en instrucción SQL: " + limpia + " → " + e.message,
          },
          { status: 500 },
        );
      }
    }

    db.close();

    return NextResponse.json({
      ok: true,
      mensaje:
        overwrite === "true"
          ? `Base de datos "${nombreBD}" sobrescrita correctamente`
          : `Base de datos "${nombreBD}" creada correctamente`,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error interno al ejecutar SQL",
      },
      { status: 500 },
    );
  }
}
