import { useCallback, useEffect, useState } from "react";

export default function useFactura(id) {
  const [factura, setFactura] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState(null);

  const fetchOne = useCallback(async () => {
    if (!id) return;
    setLoading(true); setErr(null);
    try {
      const res = await fetch(`/api/facturas/${id}`);
      const json = await res.json();
      if (!res.ok || json?.ok === false) throw new Error(json?.error || "Error");
      setFactura(json.data || json);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const actualizar = useCallback(async (patch, { recalc = false } = {}) => {
    const url = `/api/facturas/${id}${recalc ? "?recalc=1" : ""}`;
    const res = await fetch(url, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch),
    });
    const json = await res.json();
    if (!res.ok || json?.ok === false) throw new Error(json?.error || "Error");
    setFactura(json.data);
    return json.data;
  }, [id]);

  useEffect(() => { fetchOne(); }, [fetchOne]);

  return { factura, loading, error, refresh: fetchOne, actualizar };
}
