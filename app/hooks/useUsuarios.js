'use client';
import { useState, useEffect } from 'react';

export function useDetalleVentas() {
  const [detalles, setDetalles] = useState([]);

  const obtenerDetalles = async () => {
    const res = await fetch('/api/detalle_ventas');
    const data = await res.json();
    setDetalles(data);
  };

  const crearDetalle = async (detalle) => {
    await fetch('/api/detalle_ventas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(detalle),
    });
    obtenerDetalles();
  };

  const actualizarDetalle = async (id, data) => {
    await fetch(`/api/detalle_ventas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    obtenerDetalles();
  };

  const eliminarDetalle = async (id) => {
    await fetch(`/api/detalle_ventas/${id}`, {
      method: 'DELETE',
    });
    obtenerDetalles();
  };

  useEffect(() => {
    obtenerDetalles();
  }, []);

  return {
    detalles,
    obtenerDetalles,
    crearDetalle,
    actualizarDetalle,
    eliminarDetalle,
  };
}
