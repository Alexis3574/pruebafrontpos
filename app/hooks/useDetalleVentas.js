'use client';
import { useState, useEffect } from 'react';

export function useDetalleVentas() {
  const [detalles, setDetalles] = useState([]);
  const [error, setError] = useState(null);

  const obtener = async () => {
    try {
      const res = await fetch('/api/detalleVentas');
      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      setDetalles(data);
    } catch (error) {
      console.error('❌ Error al obtener detalle_ventas:', error);
      setError('No se pudieron obtener los detalles de venta');
    }
  };

  const crear = async (detalle) => {
    try {
      const res = await fetch('/api/detalleVentas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(detalle),
      });

      const text = await res.text();

      if (!res.ok) {
        const data = text ? JSON.parse(text) : {};
        throw new Error(data.error || 'Error al crear detalle_venta');
      }

      const data = text ? JSON.parse(text) : null;

      await obtener();

      return data;
    } catch (error) {
      console.error('❌ Error al crear detalle_venta:', error);
      setError(error.message);
      return null;
    }
  };

  const actualizar = async (id, datos) => {
    try {
      const res = await fetch(`/api/detalleVentas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      const text = await res.text();

      if (!res.ok) {
        const data = text ? JSON.parse(text) : {};
        throw new Error(data.error || 'Error al actualizar detalle_venta');
      }

      await obtener();
    } catch (error) {
      console.error('❌ Error al actualizar detalle_venta:', error);
      setError(error.message);
    }
  };

  const eliminar = async (id) => {
    try {
      const res = await fetch(`/api/detalleVentas/${id}`, {
        method: 'DELETE',
      });

      const text = await res.text();

      if (!res.ok) {
        const data = text ? JSON.parse(text) : {};
        throw new Error(data.error || 'Error al eliminar detalle_venta');
      }

      await obtener();
    } catch (error) {
      console.error('❌ Error al eliminar detalle_venta:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    obtener();
  }, []);

  return {
    detalles,
    obtener,
    crear,
    actualizar,
    eliminar,
    error,
  };
}
