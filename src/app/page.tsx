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
  const [clavePrimariaManual, setClavePrimariaManual] = useState(false);

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

  const generarHTML = (tabla: any, claveManual: boolean = false) => {
    const nombreTabla = tabla?.tabla || "tabla";
    const columnas: any[] = tabla?.columnas || [];
    const foreignKeys: any[] = tabla?.foreignKeys || [];
    const nombreNormalizado = String(nombreTabla).toLowerCase();
    const obtenerRelacion = (columna: string) =>
      foreignKeys.find((fk: any) => String(fk?.from || "") === columna);
    const esColumnaId = (c: any) => {
      const nombre = String(c?.name || "").toLowerCase();
      const esRelacion = Boolean(obtenerRelacion(c?.name));
      return (
        Boolean(c?.pk) ||
        nombre === "id" ||
        nombre === `id_${nombreNormalizado}` ||
        nombre === `id${nombreNormalizado}` ||
        nombre === "id_tabla" ||
        (nombre.startsWith("id_") && !esRelacion)
      );
    };
    const columnasFormulario = columnas.filter(
      (c: any) => claveManual || !esColumnaId(c)
    );

    const inputs = columnasFormulario
      .map((c: any) => {
        const tipo = String(c.type || "").toUpperCase();
        const relacion = obtenerRelacion(c.name);
        const esLlavePrimaria = esColumnaId(c);
        let inputType = "text";
        if (tipo.includes("INT")) inputType = "number";
        else if (tipo.includes("REAL") || tipo.includes("FLOAT") || tipo.includes("DOUBLE") || tipo.includes("NUMERIC") || tipo.includes("DECIMAL")) inputType = "number";
        else if (tipo.includes("DATETIME") || tipo.includes("TIMESTAMP")) inputType = "datetime-local";
        else if (tipo.includes("DATE")) inputType = "date";
        else if (tipo.includes("TIME")) inputType = "time";

        return `      <div class="campo">
        <label for="${c.name}">${c.name}${relacion ? ` (relación con ${relacion.table || "otra tabla"})` : ""}</label>
        <input type="${inputType}" id="${c.name}" name="${c.name}" placeholder="${c.name}">
        ${esLlavePrimaria ? `<small>Clave primaria: identifica este registro.</small>` : ""}
        ${relacion ? `<small>Dato relacionado con otra tabla.</small>` : ""}
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRUD de ${nombreTabla}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
  <header class="encabezado">
    <div>
      <h1>CRUD generado</h1>
      <p>Tabla seleccionada: <strong>${nombreTabla}</strong></p>
      <p>Lenguajes y Automatas II</p>
      <div class="equipo">
        <span>Desarrollado por:</span>
        <ul>
          <li>José Antonio Medina Ayala</li>
          <li>Cesar Enrique Díaz Maldonado</li>
          <li>Enrique Martínez</li>
        </ul>
      </div>
    </div>
  </header>

  <main class="contenedor">
    <section class="ayuda card">
      <h2>Ayuda</h2>
      <ul>
        <li>La clave primaria identifica cada registro.</li>
        <li>Si no sabes qué valor poner, puedes dejar que el sistema la genere automáticamente.</li>
        <li>Una clave foránea sirve para relacionar datos con otra tabla.</li>
      </ul>
    </section>

    <section class="card">
      <div class="card-header">
        <h2 id="formTitulo">Nuevo registro</h2>
        <p id="formSubtitulo">Completa los campos y guarda el registro.</p>
      </div>

      <form id="formulario" autocomplete="off">
        <input type="hidden" id="__indice" value="-1">
${inputs}
        <div class="acciones">
          <button type="button" id="btnGuardar" class="btn btn-primary">
            <span class="btn-icon">+</span> Guardar
          </button>
          <button type="button" id="btnLimpiar" class="btn btn-secondary">
            Limpiar
          </button>
        </div>
      </form>
    </section>

    <section class="card">
      <div class="card-header card-header-row">
        <div>
          <h2>Registros</h2>
        </div>
        <div class="toolbar">
          <input type="text" id="buscador" placeholder="Buscar..." class="buscador">
        </div>
      </div>

      <div class="tabla-wrapper">
        <table id="tabla">
          <thead>
            <tr>
${ths}
              <th class="th-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>

        <div id="vacio" class="vacio">
          <p>Sin registros.</p>
        </div>
      </div>
    </section>
  </main>

  <script src="script.js"></script>
</body>
</html>
`;
  };

  const generarCSS = () => {
    return `*, *::before, *::after {
  box-sizing: border-box;
}

:root {
  --c-bg: #f1f5f9;
  --c-surface: #ffffff;
  --c-border: #e2e8f0;
  --c-border-strong: #cbd5e1;
  --c-text: #0f172a;
  --c-text-soft: #475569;
  --c-text-muted: #94a3b8;
  --c-primary: #1e293b;
  --c-primary-hover: #334155;
  --c-primary-soft: #f8fafc;
  --c-danger: #dc2626;
  --c-danger-hover: #b91c1c;
  --c-edit: #2563eb;
  --c-edit-hover: #1d4ed8;
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
  --radius: 14px;
  --radius-sm: 8px;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
  background: var(--c-bg);
  color: var(--c-text);
  min-height: 100vh;
  line-height: 1.5;
}

.encabezado {
  max-width: 1100px;
  margin: 24px auto;
  padding: 24px;
  background: #0f172a;
  color: #ffffff;
  border-radius: 18px;
  box-shadow: var(--shadow-sm);
}

.encabezado h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px;
}

.encabezado p {
  margin: 0 0 6px;
  color: #cbd5e1;
  font-size: 15px;
}

.encabezado strong {
  color: #ffffff;
  font-weight: 600;
}

.encabezado span {
  color: #e2e8f0;
  font-size: 13px;
}

.equipo {
  margin-top: 10px;
}

.equipo ul,
.ayuda ul {
  margin: 6px 0 0 18px;
  padding: 0;
}

.equipo li {
  color: #e2e8f0;
  font-size: 13px;
}

.contenedor {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px 32px;
  display: grid;
  gap: 24px;
}

.card {
  background: var(--c-surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--c-border);
  overflow: hidden;
}

.ayuda {
  padding: 18px 24px;
}

.ayuda h2 {
  margin: 0;
  font-size: 17px;
}

.ayuda li {
  color: var(--c-text-soft);
  font-size: 14px;
}

.card-header {
  padding: 22px 26px 18px;
  border-bottom: 1px solid var(--c-border);
}

.card-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.card-header h2 {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 600;
  color: var(--c-text);
}

.card-header p {
  margin: 0;
  font-size: 13px;
  color: var(--c-text-soft);
}

/* FORM */
form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  padding: 22px 26px 26px;
}

.campo {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--c-text-soft);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

small {
  margin-top: 6px;
  color: var(--c-text-soft);
  font-size: 12px;
}

input {
  padding: 11px 14px;
  font-size: 14px;
  border: 1px solid var(--c-border-strong);
  border-radius: var(--radius-sm);
  outline: none;
  background: #ffffff;
  color: var(--c-text);
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  font-family: inherit;
}

input::placeholder {
  color: var(--c-text-muted);
}

input:hover {
  border-color: #94a3b8;
}

input:focus {
  border-color: var(--c-primary);
  box-shadow: 0 0 0 3px rgba(30, 41, 59, 0.12);
  background: #ffffff;
}

.acciones {
  grid-column: 1 / -1;
  display: flex;
  gap: 10px;
  margin-top: 4px;
}

/* BUTTONS */
.btn,
button {
  font-family: inherit;
  padding: 11px 22px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary,
#btnGuardar {
  background: var(--c-primary);
  color: #ffffff;
}

.btn-primary:hover,
#btnGuardar:hover {
  background: var(--c-primary-hover);
}

.btn-secondary,
#btnLimpiar {
  background: #ffffff;
  color: var(--c-text);
  border-color: var(--c-border-strong);
}

.btn-secondary:hover,
#btnLimpiar:hover {
  background: var(--c-bg);
  border-color: #94a3b8;
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
}

/* TOOLBAR / BUSCADOR */
.toolbar {
  display: flex;
  gap: 8px;
}

.buscador {
  min-width: 240px;
  padding: 9px 14px;
  font-size: 13px;
}

/* TABLA */
.tabla-wrapper {
  position: relative;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  font-size: 14px;
}

thead {
  background: #f1f5f9;
}

th {
  text-align: left;
  padding: 14px 18px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--c-text-soft);
  border-bottom: 1px solid var(--c-border);
  white-space: nowrap;
}

.th-acciones {
  text-align: right;
}

td {
  padding: 14px 18px;
  border-bottom: 1px solid var(--c-border);
  color: var(--c-text);
  vertical-align: middle;
}

tbody tr {
  transition: background 0.12s;
}

tbody tr:hover {
  background: var(--c-primary-soft);
}

tbody tr:last-child td {
  border-bottom: none;
}

.celda-acciones {
  text-align: right;
  white-space: nowrap;
}

.btn-editar,
.btn-eliminar {
  padding: 6px 14px;
  font-size: 12px;
  border-radius: 8px;
  margin-left: 6px;
  color: #ffffff;
  font-weight: 600;
}

.btn-editar {
  background: var(--c-edit);
}

.btn-editar:hover {
  background: var(--c-edit-hover);
}

.btn-eliminar {
  background: var(--c-danger);
}

.btn-eliminar:hover {
  background: var(--c-danger-hover);
}

/* ESTADO VACÍO */
.vacio {
  display: none;
  padding: 34px 20px;
  text-align: center;
  color: var(--c-text-muted);
}

.vacio.activo {
  display: block;
}

.vacio p {
  margin: 0;
  font-weight: 600;
  color: var(--c-text-soft);
  font-size: 15px;
}

@media (max-width: 640px) {
  .encabezado {
    margin: 16px;
    padding: 20px;
  }

  .encabezado h1 {
    font-size: 24px;
  }

  .contenedor {
    padding: 0 16px 30px;
  }

  .card-header,
  form {
    padding: 18px;
  }

  th, td {
    padding: 12px;
  }

  .buscador {
    min-width: 0;
    width: 100%;
  }
}

/* SweetAlert custom */
.swal-popup-custom {
  border-radius: var(--radius) !important;
  font-family: "Inter", "Segoe UI", system-ui, sans-serif !important;
}

.swal-title-custom {
  color: var(--c-text) !important;
  font-weight: 600 !important;
}

.swal-confirm-custom {
  background: var(--c-primary) !important;
  border-radius: var(--radius-sm) !important;
  padding: 10px 22px !important;
  font-weight: 600 !important;
}

.swal-cancel-custom {
  background: #ffffff !important;
  color: var(--c-text) !important;
  border: 1px solid var(--c-border-strong) !important;
  border-radius: var(--radius-sm) !important;
  padding: 10px 22px !important;
  font-weight: 600 !important;
}

.swal-danger-custom {
  background: var(--c-danger) !important;
}
`;
  };

  const generarJS = (tabla: any, claveManual: boolean = false) => {
    const nombreTabla = tabla?.tabla || "tabla";
    const columnas: any[] = tabla?.columnas || [];
    const foreignKeys: any[] = tabla?.foreignKeys || [];
    const nombreNormalizado = String(nombreTabla).toLowerCase();
    const obtenerRelacion = (columna: string) =>
      foreignKeys.find((fk: any) => String(fk?.from || "") === columna);
    const esColumnaId = (c: any) => {
      const nombre = String(c?.name || "").toLowerCase();
      const esRelacion = Boolean(obtenerRelacion(c?.name));
      return (
        Boolean(c?.pk) ||
        nombre === "id" ||
        nombre === `id_${nombreNormalizado}` ||
        nombre === `id${nombreNormalizado}` ||
        nombre === "id_tabla" ||
        (nombre.startsWith("id_") && !esRelacion)
      );
    };
    const campos = columnas.map((c: any) => c.name);
    const camposFormulario = columnas
      .filter((c: any) => claveManual || !esColumnaId(c))
      .map((c: any) => c.name);
    const camposId = columnas
      .filter((c: any) => esColumnaId(c))
      .map((c: any) => c.name);
    const camposJson = JSON.stringify(campos);
    const camposFormularioJson = JSON.stringify(camposFormulario);
    const camposIdJson = JSON.stringify(camposId);

    return `const STORAGE_KEY = "${nombreTabla}";
const CAMPOS = ${camposJson};
const CAMPOS_FORMULARIO = ${camposFormularioJson};
const CAMPOS_ID = ${camposIdJson};
const CLAVE_PRIMARIA_MANUAL = ${claveManual};

// SweetAlert2.

let registros = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let filtro = "";

const tbody = document.querySelector("#tabla tbody");
const inputIndice = document.getElementById("__indice");
const buscador = document.getElementById("buscador");
const vacio = document.getElementById("vacio");
const formTitulo = document.getElementById("formTitulo");
const formSubtitulo = document.getElementById("formSubtitulo");
const btnGuardar = document.getElementById("btnGuardar");

const SWAL_CLASSES = {
  popup: "swal-popup-custom",
  title: "swal-title-custom",
  confirmButton: "swal-confirm-custom",
  cancelButton: "swal-cancel-custom",
};

const SWAL_DANGER_CLASSES = Object.assign({}, SWAL_CLASSES, {
  confirmButton: "swal-confirm-custom swal-danger-custom",
});

document.getElementById("btnGuardar").addEventListener("click", guardar);
document.getElementById("btnLimpiar").addEventListener("click", () => {
  limpiar();
  modoCrear();
});

buscador.addEventListener("input", (e) => {
  filtro = e.target.value.trim().toLowerCase();
  render();
});

function notif(icon, title) {
  if (typeof Swal === "undefined") return;
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: { popup: "swal-popup-custom", title: "swal-title-custom" },
  });
}

async function guardar() {
  const datos = {};
  let vacios = [];

  CAMPOS_FORMULARIO.forEach((campo) => {
    const el = document.getElementById(campo);
    const valor = el ? el.value.trim() : "";
    datos[campo] = valor;
    if (!valor) vacios.push(campo);
  });

  if (CAMPOS_FORMULARIO.length > 0 && vacios.length === CAMPOS_FORMULARIO.length) {
    Swal.fire({
      icon: "warning",
      title: "Formulario vacío",
      text: "Completa al menos un campo.",
      customClass: SWAL_CLASSES,
    });
    return;
  }

  const idx = parseInt(inputIndice.value, 10);
  const editando = idx >= 0;

  if (CLAVE_PRIMARIA_MANUAL) {
    const claveVacia = CAMPOS_ID.some((campo) => !String(datos[campo] || "").trim());
    if (claveVacia) {
      Swal.fire({
        icon: "warning",
        title: "Falta la clave primaria",
        text: "Escribe la clave primaria.",
        customClass: SWAL_CLASSES,
      });
      return;
    }

    const claveRepetida = registros.some((reg, i) => {
      if (editando && i === idx) return false;
      return CAMPOS_ID.some((campo) => String(reg[campo]) === String(datos[campo]));
    });

    if (claveRepetida) {
      Swal.fire({
        icon: "warning",
        title: "Clave primaria repetida",
        text: "Ya existe un registro con esa clave primaria.",
        customClass: SWAL_CLASSES,
      });
      return;
    }
  }

  const confirmacion = await Swal.fire({
    title: editando ? "¿Actualizar este registro?" : "¿Guardar este registro?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    customClass: SWAL_CLASSES,
  });

  if (!confirmacion.isConfirmed) return;

  if (editando) {
    registros[idx] = Object.assign({}, registros[idx], datos);
  } else {
    if (!CLAVE_PRIMARIA_MANUAL) {
      CAMPOS_ID.forEach((campo) => {
        datos[campo] = siguienteId(campo);
      });
    }
    registros.push(datos);
  }

  persistir();
  limpiar();
  modoCrear();
  render();

  notif("success", editando ? "Registro actualizado correctamente." : "Registro guardado correctamente.");
}

function editar(i) {
  const reg = registros[i];
  CAMPOS_FORMULARIO.forEach((campo) => {
    const el = document.getElementById(campo);
    if (el) el.value = reg[campo] != null ? reg[campo] : "";
  });
  inputIndice.value = String(i);
  modoEditar();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function eliminar(i) {
  Swal.fire({
    title: "¿Eliminar registro?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    customClass: SWAL_DANGER_CLASSES,
  }).then((res) => {
    if (!res.isConfirmed) return;
    registros.splice(i, 1);
    persistir();
    limpiar();
    modoCrear();
    render();
    notif("success", "Registro eliminado");
  });
}

function limpiar() {
  CAMPOS_FORMULARIO.forEach((campo) => {
    const el = document.getElementById(campo);
    if (el) el.value = "";
  });
  inputIndice.value = "-1";
}

function modoEditar() {
  formTitulo.textContent = "Editar registro";
  formSubtitulo.textContent = "Modifica los campos y guarda los cambios.";
  btnGuardar.innerHTML = '<span class="btn-icon">✓</span> Actualizar';
}

function modoCrear() {
  formTitulo.textContent = "Nuevo registro";
  formSubtitulo.textContent = "Completa los campos y guarda el registro.";
  btnGuardar.innerHTML = '<span class="btn-icon">+</span> Guardar';
}

function persistir() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registros));
}

function siguienteId(campo) {
  const mayor = registros.reduce((max, reg) => {
    const valor = Number(reg[campo]);
    return Number.isFinite(valor) && valor > max ? valor : max;
  }, 0);
  return mayor + 1;
}

function coincide(reg) {
  if (!filtro) return true;
  return CAMPOS.some((c) => String(reg[c] || "").toLowerCase().includes(filtro));
}

function render() {
  tbody.innerHTML = "";

  const visibles = registros
    .map((r, i) => ({ r, i }))
    .filter(({ r }) => coincide(r));

  if (visibles.length === 0) {
    vacio.classList.add("activo");
    vacio.querySelector("p").textContent = "Sin registros.";
    return;
  }

  vacio.classList.remove("activo");

  visibles.forEach(({ r, i }) => {
    const tr = document.createElement("tr");

    CAMPOS.forEach((campo) => {
      const td = document.createElement("td");
      td.textContent = r[campo] != null && r[campo] !== "" ? r[campo] : "—";
      tr.appendChild(td);
    });

    const tdAcciones = document.createElement("td");
    tdAcciones.className = "celda-acciones";

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
    setHtmlGenerado(generarHTML(tabla, clavePrimariaManual));
    setCssGenerado(generarCSS());
    setJsGenerado(generarJS(tabla, clavePrimariaManual));
  };

  const cambiarClavePrimariaManual = (valor: boolean) => {
    setClavePrimariaManual(valor);
    if (!tablaSeleccionada) return;
    setHtmlGenerado(generarHTML(tablaSeleccionada, valor));
    setCssGenerado(generarCSS());
    setJsGenerado(generarJS(tablaSeleccionada, valor));
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

              <div className="mt-3 text-sm text-slate-200">
                <p className="font-medium">Desarrollado por:</p>
                <ul className="mt-1 list-disc pl-5">
                  <li>José Antonio Medina Ayala</li>
                  <li>Cesar Enrique Díaz Maldonado</li>
                  <li>Enrique Martínez</li>
                </ul>
              </div>

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
                  {(t.columnas || []).map((c: any, idx: number) => (
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
                {(t.foreignKeys || []).length > 0 && (
                  <div className="mt-4 border-t pt-3">
                    <p className="text-xs font-semibold text-slate-500">
                      Relaciones
                    </p>

                    <div className="mt-2 space-y-1 text-sm text-blue-600">
                      {(t.foreignKeys || []).map((fk: any, idx: number) => (
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
                    Generar aplicación CRUD
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
              <p className="mt-1 text-sm text-slate-500">
                Descarga los tres archivos en la misma carpeta y abre index.html
                en el navegador.
              </p>
              <label className="mt-3 flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={clavePrimariaManual}
                  onChange={(e) =>
                    cambiarClavePrimariaManual(e.target.checked)
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                />
                <span>
                  <span className="block font-medium">
                    Quiero ingresar la clave primaria manualmente
                  </span>
                  <span className="block text-slate-500">
                    Si no sabes qué es esto, no te preocupes, déjanoslo a nosotros.
                  </span>
                </span>
              </label>
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
