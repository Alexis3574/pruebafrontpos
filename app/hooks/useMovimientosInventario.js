'use client';
import { useState, useEffect } from 'react';

export function useMovimientosInventario() {
  const [movimientos, setMovimientos] = useState([]);

  const obtener = async () => {
    try {
      const res = await fetch('/api/movimientosinventario');
      if (!res.ok) throw new Error('Error al obtener movimientos');
      const data = await res.json();

      setMovimientos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('❌ Error al obtener movimientos:', error);
      setMovimientos([]); 
    }
  };

  const crear = async (movimiento) => {
    try {
      const res = await fetch('/api/movimientosinventario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movimiento),
      });
      if (!res.ok) throw new Error('Error al crear movimiento');
      await res.json();
      obtener();
    } catch (error) {
      console.error('❌ Error al crear movimiento:', error);
    }
  };

  const actualizar = async (id, datos) => {
    try {
      const res = await fetch(`/api/movimientosinventario/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });
      if (!res.ok) throw new Error('Error al actualizar movimiento');
      await res.json();
      obtener();
    } catch (error) {
      console.error('❌ Error al actualizar movimiento:', error);
    }
  };

  const eliminar = async (id) => {
    try {
      const res = await fetch(`/api/movimientosinventario/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar movimiento');
      await res.json();
      obtener();
    } catch (error) {
      console.error('❌ Error al eliminar movimiento:', error);
    }
  };

  useEffect(() => {
    obtener();
  }, []);

  return {
    movimientos,
    obtener,
    crear,
    actualizar,
    eliminar,
  };
}
