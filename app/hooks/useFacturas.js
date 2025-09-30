import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function parseError(err) {
  if (!err) return "Error desconocido";
  if (typeof err === "string") return err;
  if (err?.error) return err.error;
  if (err?.details) return JSON.stringify(err.details);
  return "Error en la operación";
}

async function jsonFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) {
    const msg = parseError(data);
    const e = new Error(msg);
    e.payload = data;
    e.status = res.status;
    throw e;
  }
  return data?.data ?? data; 
}

export default function useFacturas() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState(null);

  const listar = useCallback(async () => {
    setLoading(true); setErr(null);
    try {
      const data = await jsonFetch("/api/facturas");
      setList(Array.isArray(data.data) ? data.data : data);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const crear = useCallback(async (payload) => {
    setErr(null);
    const data = await jsonFetch("/api/facturas", { method: "POST", body: JSON.stringify(payload) });
    await listar();
    return data;
  }, [listar]);

  const actualizar = useCallback(async (id, patch, { recalc = false } = {}) => {
    setErr(null);
    const url = `/api/facturas/${id}${recalc ? "?recalc=1" : ""}`;
    const data = await jsonFetch(url, { method: "PUT", body: JSON.stringify(patch) });
    await listar();
    return data;
  }, [listar]);

  const eliminar = useCallback(async (id) => {
    setErr(null);
    await jsonFetch(`/api/facturas/${id}`, { method: "DELETE" });
    await listar();
  }, [listar]);

  useEffect(() => { listar(); }, [listar]);

  const state = useMemo(() => ({ list, loading, error }), [list, loading, error]);

  return { ...state, listar, crear, actualizar, eliminar };
}
