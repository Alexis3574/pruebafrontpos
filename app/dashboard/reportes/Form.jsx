"use client";
import { useEffect, useMemo, useState } from "react";
import useReportes from "../../hooks/useReportes";
import useReporteForm from "../../hooks/useReporteForm";
import { generarPDFReporteLibre } from "@/lib/pdf/reportesTextoPdf";

export default function ReporteForm({ onSaved, editingId }) {
  const { create, update, getById, loading, error, msg, setError, setMsg } = useReportes();
  const [loadingItem, setLoadingItem] = useState(false);
  const form = useReporteForm();

  useEffect(() => {
    (async () => {
      if (!editingId) return;
      setLoadingItem(true);
      setError(""); setMsg("");
      const item = await getById(editingId);
      if (item) form.load(item);
      setLoadingItem(false);
    })();
  }, [editingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.setTouched(true);
    if (!form.isValid) return;

    const payload = {
      tipo: form.tipo.trim(),
      datos: { contenido: form.contenido.trim() }, 
    };

    const saved = form.id ? await update(form.id, payload) : await create(payload);
    if (saved) {
      onSaved?.(saved);
      form.reset();
    }
  };

  const vistaPrevia = useMemo(() => {
    const c = (form.contenido || "").trim();
    if (!c) return "Aquí verás una vista previa de tu contenido.";
    return c;
  }, [form.contenido]);

  const verPDF = () => {
    const doc = generarPDFReporteLibre({
      titulo: "Reporte",
      tipo: form.tipo,
      contenido: form.contenido,
      autor: "Administrador",
      marcaNoOficial: true,
    });
    window.open(doc.output("bloburl"), "_blank");
  };

  const descargarPDF = () => {
    const doc = generarPDFReporteLibre({
      titulo: "Reporte",
      tipo: form.tipo,
      contenido: form.contenido,
      autor: "Administrador",
      marcaNoOficial: true,
    });
    doc.save(`Reporte_${form.tipo || "general"}.pdf`);
  };

  const disabledActions = loading || loadingItem || !form.isValid;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur text-slate-800">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {form.id ? "Editar Reporte" : "Nuevo Reporte"}
          </h2>
          <p className="text-sm text-slate-600">
            Define el <span className="font-medium">tipo</span> y escribe el contenido del reporte.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {form.id && (
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              <Dot className="h-3 w-3" /> Modo edición
            </span>
          )}
          {loadingItem && (
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
              <Spinner className="h-3 w-3" /> Cargando…
            </span>
          )}
        </div>
      </div>

      {(error || msg) && (
        <div className="mb-4 space-y-2">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          {msg && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
              {msg}
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Tipo <span className="text-red-500">*</span>
          </label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            placeholder="Ej. Ventas, Productos, Inventario, Notas"
            value={form.tipo}
            onChange={(e) => form.setTipo(e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-700">
              Contenido <span className="text-red-500">*</span>
            </label>
            <small className="text-xs text-slate-500">
              {form.contenido?.length || 0} caracteres
            </small>
          </div>
          <textarea
            className="mt-1 w-full min-h-[220px] rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm leading-relaxed shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            placeholder="Escribe el contenido del reporte en texto normal…"
            value={form.contenido}
            onChange={(e) => form.setContenido(e.target.value)}
          />
          {(!form.isValid || form.touched) && form.errors.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-700">
              {form.errors.map((er, i) => (
                <li key={i}>{er}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={disabledActions}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <SaveIcon className="h-4 w-4" />
            {form.id ? "Guardar cambios" : "Guardar reporte"}
          </button>

          <button
            type="button"
            onClick={verPDF}
            disabled={!form.contenido.trim()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            title="Previsualizar PDF (no oficial)"
          >
            <EyeIcon className="h-4 w-4" />
            Previsualizar PDF (no oficial)
          </button>

          <button
            type="button"
            onClick={descargarPDF}
            disabled={!form.contenido.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <DownloadIcon className="h-4 w-4" />
            Descargar PDF
          </button>

          <button
            type="button"
            onClick={() => { form.reset(); setError(""); setMsg(""); }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <BroomIcon className="h-4 w-4" />
            Limpiar
          </button>
        </div>
      </form>

      <section className="relative mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
          <span className="text-6xl font-extrabold rotate-12">NO OFICIAL</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Vista previa</h3>
        <p className="text-sm text-slate-600">
          Tipo: <b>{form.tipo || "—"}</b>
        </p>
        <div className="mt-3 whitespace-pre-wrap text-slate-800">{vistaPrevia}</div>
      </section>

      {loadingItem && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm">
          <div className="mb-3 h-6 w-40 animate-pulse rounded bg-slate-200" />
          <div className="mb-2 h-10 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-40 w-full animate-pulse rounded bg-slate-200" />
        </div>
      )}
    </section>
  );
}

function Dot(props) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="currentColor">
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
}
function Spinner(props) {
  return (
    <svg viewBox="0 0 24 24" className={`animate-spin ${props.className}`} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" opacity="0.25" />
      <path d="M21 12a9 9 0 0 1-9 9" />
    </svg>
  );
}
function SaveIcon(props) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21H5a2 2 0 0 1-2-2V7l4-4h10l4 4v12a2 2 0 0 1-2 2Z" />
      <path d="M7 21V10h10v11" />
    </svg>
  );
}
function EyeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function DownloadIcon(props) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}
function BroomIcon(props) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 3l6 6" />
      <path d="M8 13l9-9" />
      <path d="M6 15l-3 6 6-3 9-9-3-3-9 9z" />
    </svg>
  );
}
