"use client";

import { useState } from "react";

export default function Home() {
  const [codigo, setCodigo] = useState("");
  const [errores, setErrores] = useState("");
  const [sqlGenerado, setSqlGenerado] = useState("");
  const [estructura, setEstructura] = useState("");
  const [cargando, setCargando] = useState(false);

  const compilar = async () => {
    setCargando(true);
    setErrores("");
    setSqlGenerado("");
    setEstructura("");

    try {
      const res = await fetch("/api/compilar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrores(data.error || "Ocurrió un error al compilar.");
        return;
      }

      setErrores(data.errores || "");
      setSqlGenerado(data.sql || "");
      setEstructura(data.estructura || "");
    } catch {
      setErrores("No se pudo conectar con el compilador.");
    } finally {
      setCargando(false);
    }
  };

  const descargarArchivo = (contenido: string, nombre: string) => {
    if (!contenido) return;

    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = nombre;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-3xl font-bold text-slate-900">CompiladorU2</h1>
          <p className="mt-2 text-base text-slate-600">
            Compilador web para lenguaje de alto nivel orientado a bases de datos
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Entrada</h2>
                <p className="text-sm text-slate-500">
                  Escribe aquí las instrucciones del lenguaje.
                </p>
              </div>
            </div>

            <textarea
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="h-96 w-full resize-none rounded-2xl border border-slate-300 bg-white p-4 font-mono text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              placeholder={`crear escuela
usar escuela

tabla alumno
inicio
    id_alumno identificador
    nombre texto
    edad numero
fin

tabla materia
inicio
    id_materia identificador
    nombre texto
fin

tabla inscripcion
inicio
    id_inscripcion identificador
    alumno referencia alumno
    materia referencia materia
fin

cerrar`}
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={compilar}
                disabled={cargando}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cargando ? "Compilando..." : "Compilar"}
              </button>

              <button
                onClick={() => setCodigo("")}
                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Limpiar
              </button>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Estado</h2>
            <p className="mb-4 text-sm text-slate-500">
              Aquí se mostrarán errores solo cuando existan.
            </p>

            {errores ? (
              <div className="rounded-2xl border border-red-300 bg-red-50 p-4">
                <h3 className="mb-2 text-sm font-semibold text-red-700">
                  Errores de compilación
                </h3>
                <textarea
                  value={errores}
                  readOnly
                  className="h-80 w-full resize-none rounded-xl border border-red-200 bg-white p-4 font-mono text-sm text-red-700 outline-none"
                />
              </div>
            ) : (
              <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
                No hay errores por mostrar.
              </div>
            )}
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">SQL generado</h2>
                <p className="text-sm text-slate-500">
                  Resultado equivalente en SQL.
                </p>
              </div>

              <button
                onClick={() => descargarArchivo(sqlGenerado, "sql.txt")}
                disabled={!sqlGenerado}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Descargar
              </button>
            </div>

            <textarea
              value={sqlGenerado}
              readOnly
              className="h-80 w-full resize-none rounded-2xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm text-slate-900 outline-none"
              placeholder="Aquí aparecerá el código SQL equivalente..."
            />
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Estructura de la base de datos
                </h2>
                <p className="text-sm text-slate-500">
                  Descripción generada por el compilador.
                </p>
              </div>

              <button
                onClick={() => descargarArchivo(estructura, "estructura.txt")}
                disabled={!estructura}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Descargar
              </button>
            </div>

            <textarea
              value={estructura}
              readOnly
              className="h-80 w-full resize-none rounded-2xl border border-slate-300 bg-slate-50 p-4 font-mono text-sm text-slate-900 outline-none"
              placeholder="Aquí aparecerá la descripción de la estructura..."
            />
          </section>
        </div>
      </div>
    </main>
  );
}