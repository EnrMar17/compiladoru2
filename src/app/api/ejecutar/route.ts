import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { sql } = await req.json();

    if (!sql || typeof sql !== "string") {
      return NextResponse.json({ error: "SQL no válido" }, { status: 400 });
    }

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
      mensaje: "Base de datos creada correctamente",
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
