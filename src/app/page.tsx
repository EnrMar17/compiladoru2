"use client";

import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Editor from "@monaco-editor/react";
import { useRef } from "react";

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
  const [mounted, setMounted] = useState(false);

  const [tablaSeleccionada, setTablaSeleccionada] = useState<any>(null);
  const [htmlGenerado, setHtmlGenerado] = useState("");
  const [cssGenerado, setCssGenerado] = useState("");
  const [jsGenerado, setJsGenerado] = useState("");

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    monaco.editor.defineTheme("miTema", {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#f8fafc",
        "editor.lineHighlightBackground": "#e2e8f0",
        "editorCursor.foreground": "#0f172a",
        "editorLineNumber.foreground": "#94a3b8",
        "editorLineNumber.activeForeground": "#0f172a",
      },
    });

    monaco.editor.setTheme("miTema");
  };

  const marcarErrores = (textoErrores: string) => {
    if (!monacoRef.current || !editorRef.current) return;

    const monaco = monacoRef.current;
    const model = editorRef.current.getModel();

    const markers = [];

    const lineas = textoErrores.split("\n");

    for (let linea of lineas) {
      const match = linea.match(/Línea (\d+): (.*)/);

      if (match) {
        const numeroLinea = parseInt(match[1]);
        const mensaje = match[2];

        markers.push({
          startLineNumber: numeroLinea,
          endLineNumber: numeroLinea,
          startColumn: 1,
          endColumn: 100,
          message: mensaje,
          severity: monaco.MarkerSeverity.Error,
        });

        editorRef.current.revealLine(numeroLinea);
      }
    }

    monaco.editor.setModelMarkers(model, "owner", markers);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

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
        marcarErrores("");
        return;
      }

      setErrores(data.errores || "");

      if (data.errores) {
        marcarErrores(data.errores);
      } else {
        marcarErrores("");
      }
      setSqlGenerado(data.sql || "");
      setEstructura(data.estructura || "");
    } catch {
      setErrores("No se pudo conectar con el compilador.");
    } finally {
      setCargando(false);
    }
  };

  const crearBD = async () => {
    try {
      setEjecutandoBD(true);

      const res = await fetch("/api/ejecutar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql: sqlGenerado }),
      });

      const data = await res.json();

      if (data.existe) {
        const resultado = await Swal.fire({
          title: "Sobrescribir base de datos",
          text: "Ya existe una base con este nombre. Si continúas, se reemplazará completamente.",
          showCancelButton: true,
          confirmButtonText: "Sobrescribir",
          cancelButtonText: "Cancelar",
          customClass: {
            popup: "swal-popup",
            title: "swal-title",
            htmlContainer: "swal-text",
            confirmButton: "swal-confirm",
            cancelButton: "swal-cancel",
          },
        });

        if (!resultado.isConfirmed) {
          setEjecutandoBD(false);
          return;
        }

        const res2 = await fetch("/api/ejecutar?overwrite=true", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sql: sqlGenerado }),
        });

        const data2 = await res2.json();

        if (data2.error) {
          await Swal.fire({
            title: "Error",
            text: data2.error,
            icon: "error",
            customClass: {
              popup: "swal-popup",
              title: "swal-title",
              htmlContainer: "swal-text",
              confirmButton: "swal-cancel",
            },
          });

          setEjecutandoBD(false);
          return;
        }

        await Swal.fire({
          title: "Base sobrescrita",
          text: data2.mensaje,
          icon: "success",
          customClass: {
            popup: "swal-popup",
            title: "swal-title",
            htmlContainer: "swal-text",
            confirmButton: "swal-confirm",
          },
        });

        setSqlGenerado("");
        setEstructura("");
        setErrores("");
        marcarErrores("");

        cargarBases();
        setEjecutandoBD(false);
        return;
      }

      if (data.error) {
        await Swal.fire({
          title: "Error",
          text: data.error,
          icon: "error",
          customClass: {
            popup: "swal-popup",
            title: "swal-title",
            htmlContainer: "swal-text",
            confirmButton: "swal-cancel",
          },
        });

        setEjecutandoBD(false);
        return;
      }

      await Swal.fire({
        title: "Base creada",
        text: data.mensaje,
        icon: "success",
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          htmlContainer: "swal-text",
          confirmButton: "swal-confirm",
        },
      });

      setSqlGenerado("");
      setEstructura("");
      setErrores("");
      marcarErrores("");

      cargarBases();
      setEjecutandoBD(false);
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Error al crear la base de datos",
        icon: "error",
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          htmlContainer: "swal-text",
          confirmButton: "swal-cancel",
        },
      });

      setEjecutandoBD(false);
      console.error(error);
    }
  };

  const descargarArchivo = (
    contenido: string,
    nombre: string,
    mime: string = "text/plain;charset=utf-8"
  ) => {
    if (!contenido) return;

    const blob = new Blob([contenido], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = nombre;
    a.click();

    URL.revokeObjectURL(url);
  };

  const generarHTML = (tabla: any) => {
    const nombreTabla = tabla.tabla;
    const columnas: any[] = tabla.columnas || [];

    const inputs = columnas
      .map((c: any) => {
        const tipo = String(c.type || "").toUpperCase();
        let inputType = "text";
        if (tipo.includes("INT")) inputType = "number";
        else if (tipo.includes("REAL") || tipo.includes("FLOAT") || tipo.includes("DOUBLE") || tipo.includes("NUMERIC") || tipo.includes("DECIMAL")) inputType = "number";
        else if (tipo.includes("DATE")) inputType = "date";

        return `      <div class="campo">
        <label for="${c.name}">${c.name}</label>
        <input type="${inputType}" id="${c.name}" name="${c.name}" placeholder="${c.name}">
      </div>`;
      })
      .join("\n");

    const ths = columnas
      .map((c: any) => `          <th>${c.name}</th>`)
      .join("\n");

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>CRUD de ${nombreTabla}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="contenedor">
    <h1>CRUD de ${nombreTabla}</h1>

    <form id="formulario" autocomplete="off">
      <input type="hidden" id="__indice" value="-1">
${inputs}
      <div class="acciones">
        <button type="button" id="btnGuardar">Guardar</button>
        <button type="button" id="btnLimpiar">Limpiar</button>
      </div>
    </form>

    <table id="tabla">
      <thead>
        <tr>
${ths}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>

  <script src="script.js"></script>
</body>
</html>
`;
  };

  const generarCSS = () => {
    return `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
  background: #f1f5f9;
  color: #0f172a;
  padding: 30px 20px;
}

.contenedor {
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}

h1 {
  margin: 0 0 24px 0;
  font-size: 26px;
  color: #0f172a;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 12px;
}

form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
}

.campo {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #334155;
}

input {
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  outline: none;
  background: #f8fafc;
  transition: border-color 0.15s, background 0.15s;
}

input:focus {
  border-color: #0f172a;
  background: #ffffff;
}

.acciones {
  grid-column: 1 / -1;
  display: flex;
  gap: 10px;
  margin-top: 6px;
}

button {
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s, transform 0.05s;
}

button:active {
  transform: translateY(1px);
}

#btnGuardar {
  background: #0f172a;
  color: #ffffff;
}

#btnGuardar:hover {
  background: #1e293b;
}

#btnLimpiar {
  background: #e2e8f0;
  color: #0f172a;
}

#btnLimpiar:hover {
  background: #cbd5e1;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
}

thead {
  background: #0f172a;
  color: #ffffff;
}

th, td {
  padding: 12px 14px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #e2e8f0;
}

tbody tr:hover {
  background: #f8fafc;
}

.btn-editar,
.btn-eliminar {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 8px;
  margin-right: 6px;
  color: #ffffff;
}

.btn-editar {
  background: #2563eb;
}

.btn-editar:hover {
  background: #1d4ed8;
}

.btn-eliminar {
  background: #dc2626;
}

.btn-eliminar:hover {
  background: #b91c1c;
}
`;
  };

  const generarJS = (tabla: any) => {
    const nombreTabla = tabla.tabla;
    const columnas: any[] = tabla.columnas || [];
    const campos = columnas.map((c: any) => c.name);
    const camposJson = JSON.stringify(campos);

    return `const STORAGE_KEY = "${nombreTabla}";
const CAMPOS = ${camposJson};

let registros = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const form = document.getElementById("formulario");
const tbody = document.querySelector("#tabla tbody");
const inputIndice = document.getElementById("__indice");

document.getElementById("btnGuardar").addEventListener("click", guardar);
document.getElementById("btnLimpiar").addEventListener("click", limpiar);

function guardar() {
  const datos = {};
  CAMPOS.forEach((campo) => {
    const el = document.getElementById(campo);
    datos[campo] = el ? el.value : "";
  });

  const idx = parseInt(inputIndice.value, 10);

  if (idx >= 0) {
    registros[idx] = datos;
  } else {
    registros.push(datos);
  }

  persistir();
  limpiar();
  render();
}

function editar(i) {
  const reg = registros[i];
  CAMPOS.forEach((campo) => {
    const el = document.getElementById(campo);
    if (el) el.value = reg[campo] != null ? reg[campo] : "";
  });
  inputIndice.value = String(i);
}

function eliminar(i) {
  if (!confirm("¿Eliminar este registro?")) return;
  registros.splice(i, 1);
  persistir();
  limpiar();
  render();
}

function limpiar() {
  CAMPOS.forEach((campo) => {
    const el = document.getElementById(campo);
    if (el) el.value = "";
  });
  inputIndice.value = "-1";
}

function persistir() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registros));
}

function render() {
  tbody.innerHTML = "";

  registros.forEach((reg, i) => {
    const tr = document.createElement("tr");

    CAMPOS.forEach((campo) => {
      const td = document.createElement("td");
      td.textContent = reg[campo] != null ? reg[campo] : "";
      tr.appendChild(td);
    });

    const tdAcciones = document.createElement("td");

    const btnE = document.createElement("button");
    btnE.textContent = "Editar";
    btnE.className = "btn-editar";
    btnE.addEventListener("click", () => editar(i));

    const btnD = document.createElement("button");
    btnD.textContent = "Eliminar";
    btnD.className = "btn-eliminar";
    btnD.addEventListener("click", () => eliminar(i));

    tdAcciones.appendChild(btnE);
    tdAcciones.appendChild(btnD);
    tr.appendChild(tdAcciones);

    tbody.appendChild(tr);
  });
}

render();
`;
  };

  const generarAplicacionCRUD = (tabla: any) => {
    setTablaSeleccionada(tabla);
    setHtmlGenerado(generarHTML(tabla));
    setCssGenerado(generarCSS());
    setJsGenerado(generarJS(tabla));
  };

  const probarCRUD = () => {
    if (!htmlGenerado || !cssGenerado || !jsGenerado) return;

    const htmlInline = htmlGenerado
      .replace(
        /<link\s+rel="stylesheet"\s+href="styles\.css">/,
        `<style>\n${cssGenerado}\n</style>`
      )
      .replace(
        /<script\s+src="script\.js"><\/script>/,
        `<script>\n${jsGenerado}\n</script>`
      );

    const blob = new Blob([htmlInline], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* TEXTO */}
            <div>
              <h1 className="text-3xl font-bold text-white">
                Generador de Aplicaciones - Lenguajes y Automatas II
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

            <div className="h-96 w-full overflow-hidden rounded-2xl border border-slate-300 bg-white">
              <Editor
                height="100%"
                defaultLanguage="plaintext"
                value={codigo}
                onChange={(value) => {
                  setCodigo(value || "");
                  marcarErrores("");
                }}
                onMount={handleEditorDidMount}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  lineNumbers: "on",
                  automaticLayout: true,
                  wordWrap: "on",
                }}
              />
            </div>

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
                disabled={!mounted || !sqlGenerado || ejecutandoBD}
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
              <option value="">Selecciona una base de datos</option>
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

                <div className="mt-4 border-t pt-3">
                  <button
                    onClick={() => generarAplicacionCRUD(t)}
                    className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                  >
                    Generar código CRUD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GENERADOR DE APLICACIÓN CRUD */}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Generador de aplicación CRUD
              </h2>
              <p className="text-sm text-slate-500">
                {tablaSeleccionada
                  ? `Aplicación generada para la tabla: ${tablaSeleccionada.tabla}`
                  : "Selecciona una tabla y presiona “Generar aplicación CRUD”."}
              </p>
            </div>

            {tablaSeleccionada && (
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                  Tabla: {tablaSeleccionada.tabla}
                </span>
                <button
                  onClick={probarCRUD}
                  disabled={!htmlGenerado}
                  className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Probar CRUD
                </button>
              </div>
            )}
          </div>

          {!tablaSeleccionada ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
              Aún no se ha generado ninguna aplicación CRUD.
            </div>
          ) : (
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-700">
                    HTML generado
                  </h3>
                  <button
                    onClick={() =>
                      descargarArchivo(htmlGenerado, "index.html", "text/html")
                    }
                    disabled={!htmlGenerado}
                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Descargar index.html
                  </button>
                </div>
                <textarea
                  value={htmlGenerado}
                  readOnly
                  className="h-80 w-full resize-none rounded-xl border border-slate-300 bg-white p-3 font-mono text-xs text-slate-900 outline-none"
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-700">
                    CSS generado
                  </h3>
                  <button
                    onClick={() =>
                      descargarArchivo(cssGenerado, "styles.css", "text/css")
                    }
                    disabled={!cssGenerado}
                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Descargar styles.css
                  </button>
                </div>
                <textarea
                  value={cssGenerado}
                  readOnly
                  className="h-80 w-full resize-none rounded-xl border border-slate-300 bg-white p-3 font-mono text-xs text-slate-900 outline-none"
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-700">
                    JavaScript generado
                  </h3>
                  <button
                    onClick={() =>
                      descargarArchivo(
                        jsGenerado,
                        "script.js",
                        "text/javascript"
                      )
                    }
                    disabled={!jsGenerado}
                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Descargar script.js
                  </button>
                </div>
                <textarea
                  value={jsGenerado}
                  readOnly
                  className="h-80 w-full resize-none rounded-xl border border-slate-300 bg-white p-3 font-mono text-xs text-slate-900 outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
