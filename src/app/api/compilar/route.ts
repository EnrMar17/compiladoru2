import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

// runtime de Node.js para poder usar fs y procesos externos
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { codigo } = await req.json();

    if (!codigo || typeof codigo !== "string") {
      return NextResponse.json(
        { error: "No se recibió código válido." },
        { status: 400 }
      );
    }

    const compilerDir = path.join(process.cwd(), "grammar");

    const entradaPath = path.join(compilerDir, "entrada.txt");
    const sqlPath = path.join(compilerDir, "sql.txt");
    const estructuraPath = path.join(compilerDir, "estructura.txt");

    // Guarda el caso prubea
    await fs.writeFile(entradaPath, codigo, "utf8");

    // Limpia anteriores
    await fs.rm(sqlPath, { force: true });
    await fs.rm(estructuraPath, { force: true });

    const { stdout, stderr } = await execFileAsync(
      "java",
      ["Test", "entrada.txt"],
      { cwd: compilerDir }
    );

    // mostrar errores del compilador
    if (stderr && stderr.trim().length > 0) {
      return NextResponse.json({
        errores: stderr.trim(),
        sql: "",
        estructura: "",
        salida: stdout.trim(),
      });
    }

    // Lee resultados generados por ANTLR/Java
    const [sql, estructura] = await Promise.all([
      fs.readFile(sqlPath, "utf8").catch(() => ""),
      fs.readFile(estructuraPath, "utf8").catch(() => ""),
    ]);

    return NextResponse.json({
      errores: "",
      sql,
      estructura,
      salida: stdout.trim(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error interno al ejecutar el compilador.",
      },
      { status: 500 }
    );
  }
}