import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { sql } = await req.json();

    if (!sql || typeof sql !== "string") {
      return NextResponse.json({ error: "SQL no válido" }, { status: 400 });
    }

    // detectar nombre BD
    const match = sql.match(/CREATE DATABASE (\w+)/i);
    const nombreBD = match ? match[1] : "default";

    const db = getDB(nombreBD); // ✅ SOLO UNA VEZ

    // +limpiar SQL
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
        db.prepare(limpia).run(); // 🔥 AQUÍ ESTABA LO QUE FALTABA
      } catch (e: any) {
        return NextResponse.json(
          {
            error: "Error en instrucción SQL: " + limpia + " → " + e.message,
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({
      ok: true,
      mensaje: `Base de datos "${nombreBD}" creada correctamente`,
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
