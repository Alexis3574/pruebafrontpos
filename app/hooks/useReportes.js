"use client";
import { useCallback, useState } from "react";

export default function useReportes() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const list = useCallback(async (params = {}) => {
    try {
      setLoading(true); setError(""); setMsg("");
      const qs = new URLSearchParams(params).toString();
      const res = await fetch(`/api/reportes?${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "No se pudo listar");
      setItems(json.data || []);
      setPagination(json.pagination || { page: 1, pageSize: 10, total: 0, pages: 0 });
    } catch (e) {
      setError(e.message || "Error al listar reportes");
    } finally {
      setLoading(false);
    }
  }, []);

  const getById = useCallback(async (id) => {
    try {
      setLoading(true); setError(""); setMsg("");
      const res = await fetch(`/api/reportes/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "No se pudo obtener");
      return json.data;
    } catch (e) {
      setError(e.message || "Error al obtener el reporte");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (payload) => {
    try {
      setLoading(true); setError(""); setMsg("");
      const res = await fetch(`/api/reportes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "No se pudo crear");
      setMsg(json?.message || "Creado");
      return json.data;
    } catch (e) {
      setError(e.message || "Error al crear");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id, payload) => {
    try {
      setLoading(true); setError(""); setMsg("");
      const res = await fetch(`/api/reportes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "No se pudo actualizar");
      setMsg(json?.message || "Actualizado");
      return json.data;
    } catch (e) {
      setError(e.message || "Error al actualizar");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id) => {
    try {
      setLoading(true); setError(""); setMsg("");
      const res = await fetch(`/api/reportes/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "No se pudo eliminar");
      setMsg(json?.message || "Eliminado");
      return true;
    } catch (e) {
      setError(e.message || "Error al eliminar");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { items, pagination, loading, msg, error, list, getById, create, update, remove, setMsg, setError };
}
