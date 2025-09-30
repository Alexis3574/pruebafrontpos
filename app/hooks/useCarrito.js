'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useCarrito() {
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const items = useMemo(() => carrito?.items ?? [], [carrito]);

  const total = useMemo(() => {
    return items.reduce((acc, it) => acc + (Number(it.cantidad) * Number(it.precio)), 0);
  }, [items]);

  const count = useMemo(() => {
    return items.reduce((acc, it) => acc + Number(it.cantidad || 0), 0);
  }, [items]);

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const r = await fetch('/api/carrito', { cache: 'no-store' });
      if (!r.ok) throw new Error('No se pudo cargar el carrito');
      const data = await r.json();
      // La API puede devolver el carrito actual o null
      setCarrito(data || null);
    } catch (e) {
      console.error('❌ cargar carrito:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const agregar = useCallback(async (productoId, cantidad, precio) => {
    try {
      setError(null);
      const r = await fetch('/api/carrito', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productoId: Number(productoId), cantidad: Number(cantidad), precio: Number(precio) }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || 'Error al agregar al carrito');
      await cargar();
      return data;
    } catch (e) {
      console.error('❌ agregar carrito:', e);
      setError(e.message);
      throw e;
    }
  }, [cargar]);

  const actualizar = useCallback(async (itemId, cantidad) => {
    try {
      setError(null);
      const r = await fetch('/api/carrito', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Number(itemId), cantidad: Number(cantidad) }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || 'Error al actualizar carrito');
      await cargar();
      return data;
    } catch (e) {
      console.error('❌ actualizar carrito:', e);
      setError(e.message);
      throw e;
    }
  }, [cargar]);

  const eliminar = useCallback(async (itemId) => {
    try {
      setError(null);
      const r = await fetch(`/api/carrito?id=${Number(itemId)}`, { method: 'DELETE' });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error || 'Error al eliminar del carrito');
      await cargar();
      return true;
    } catch (e) {
      console.error('❌ eliminar carrito:', e);
      setError(e.message);
      throw e;
    }
  }, [cargar]);

  const vaciar = useCallback(async () => {
    const current = carrito?.items ?? [];
    for (const it of current) {
      await eliminar(it.id);
    }
  }, [carrito?.items, eliminar]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return {
    carrito,
    items,
    total,
    count,
    loading,
    error,
    cargar,
    agregar,
    actualizar,
    eliminar, // 👈 exportado con este nombre
    vaciar,
  };
}
