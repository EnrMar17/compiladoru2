"use client";

import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [codigo, setCodigo] = useState("");
  const [errores, setErrores] = useState("");
  const [sqlGenerado, setSqlGenerado] = useState("");
  const [estructura, setEstructura] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensajeBD, setMensajeBD] = useState("");
  const [ejecutandoBD, setEjecutandoBD] = useState(false);
  const [tipoMensaje, setTipoMensaje] = useState<"ok" | "error" | "">("");
  const [bases, setBases] = useState<string[]>([]);
  const [bdSeleccionada, setBdSeleccionada] = useState("");
  const [estructuraBD, setEstructuraBD] = useState<any[]>([]);

  const cargarBases = async () => {
    const res = await fetch("/api/db");
    const data = await res.json();
    setBases(data.bases || []);
  };

  const cargarEstructuraBD = async (nombre: string) => {
    setBdSeleccionada(nombre);

    const res = await fetch(`/api/db?nombre=${nombre}`);
    const data = await res.json();

    setEstructuraBD(data.tablas || []);
  };

  useEffect(() => {
    cargarBases();
  }, []);

  const compilar = async () => {
    setCargando(true);
    setErrores("");
    setSqlGenerado("");
    setEstructura("");
    setMensajeBD("");

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

  const crearBD = async () => {
    if (!sqlGenerado) return;

    setEjecutandoBD(true);
    setMensajeBD("");

    try {
      const res = await fetch("/api/ejecutar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql: sqlGenerado }),
      });

      const data = await res.json();

      if (!res.ok) {
        setTipoMensaje("error");
        setMensajeBD(data.error || "Error al crear la BD");
        return;
      }

      setTipoMensaje("ok");
      setMensajeBD("Base de datos creada correctamente");
    } catch {
      setMensajeBD("Error de conexión con el servidor");
    } finally {
      setEjecutandoBD(false);
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
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* TEXTO */}
            <div>
              <h1 className="text-3xl font-bold text-white">
                Lenguaje para crear bases de datos
              </h1>

              <div className="mt-2 flex gap-2">
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white">
                  ANTLR
                </span>
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white">
                  SQLite
                </span>
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-white">
                  Next.js
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Entrada
                </h2>
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

              <button
                onClick={crearBD}
                disabled={!sqlGenerado || ejecutandoBD}
                className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {ejecutandoBD ? "Creando BD..." : "Crear Base de Datos"}
              </button>
            </div>
            {mensajeBD && (
              <div
                className={`mt-3 rounded-xl p-3 text-sm ${
                  tipoMensaje === "ok"
                    ? "bg-green-50 border border-green-300 text-green-700"
                    : "bg-red-50 border border-red-300 text-red-700"
                }`}
              >
                {mensajeBD}
              </div>
            )}
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
                <h2 className="text-xl font-semibold text-slate-900">
                  SQL generado
                </h2>
                <p className="text-sm text-slate-500">
                  Resultado equivalente en SQL.
                </p>
              </div>

              <button
                onClick={() => descargarArchivo(sqlGenerado, "sql.txt")}
                disabled={!sqlGenerado || ejecutandoBD || !!errores}
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
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Explorador de bases de datos
              </h2>
              <p className="text-sm text-slate-500">
                Visualiza tablas, columnas y relaciones reales desde SQLite.
              </p>
            </div>

            <select
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
              value={bdSeleccionada}
              onChange={(e) => cargarEstructuraBD(e.target.value)}
            >
              <option value="">Selecciona una base</option>
              {bases.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* CONTENIDO */}
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {estructuraBD.length === 0 && bdSeleccionada && (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
                No hay tablas en esta base de datos.
              </div>
            )}

            {!bdSeleccionada && (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
                Selecciona una base de datos para ver su estructura.
              </div>
            )}

            {estructuraBD.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-800">
                  {t.tabla}
                </h3>

                {/* COLUMNAS */}
                <div className="mt-3 space-y-2">
                  {t.columnas.map((c: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
                    >
                      <div>
                        <span className="font-medium text-slate-800">
                          {c.name}
                        </span>
                        <span className="ml-2 text-slate-500">({c.type})</span>
                      </div>

                      <div className="flex gap-2">
                        {c.pk ? (
                          <span className="rounded-md bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                            PK
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>

                {/* FOREIGN KEYS */}
                {t.foreignKeys.length > 0 && (
                  <div className="mt-4 border-t pt-3">
                    <p className="text-xs font-semibold text-slate-500">
                      Relaciones
                    </p>

                    <div className="mt-2 space-y-1 text-sm text-blue-600">
                      {t.foreignKeys.map((fk: any, idx: number) => (
                        <div key={idx}>
                          {fk.from} →{" "}
                          <span className="font-medium">
                            {fk.table}({fk.to})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
