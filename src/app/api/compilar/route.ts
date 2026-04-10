import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

// Fuerza runtime de Node.js para poder usar fs y procesos externos
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

    // Ajusta esta ruta a donde tengas tus archivos Java/ANTLR
    const compilerDir = path.join(process.cwd(), "grammar");

    const entradaPath = path.join(compilerDir, "entrada.txt");
    const sqlPath = path.join(compilerDir, "sql.txt");
    const estructuraPath = path.join(compilerDir, "estructura.txt");

    // Guarda el caso de prueba escrito en la página
    await fs.writeFile(entradaPath, codigo, "utf8");

    // Limpia archivos anteriores por si quedaron de una compilación previa
    await fs.rm(sqlPath, { force: true });
    await fs.rm(estructuraPath, { force: true });

    // Ejecuta: java Test entrada.txt
    // execFile ejecuta el binario directamente, sin pasar por shell
    const { stdout, stderr } = await execFileAsync(
      "java",
      ["Test", "entrada.txt"],
      { cwd: compilerDir }
    );

    // Si el compilador reportó errores, se muestran en la página
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