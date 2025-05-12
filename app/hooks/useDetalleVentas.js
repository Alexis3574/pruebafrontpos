'use client';
import { useState, useEffect } from 'react';

export function useDetalleVentas() {
  const [detalles, setDetalles] = useState([]);

  const obtener = async () => {
    try {
      const res = await fetch('/api/ventas');
      const text = await res.text();
      const data = text ? JSON.parse(text) : [];
      setDetalles(data);
    } catch (error) {
      console.error('Error al obtener detalle_ventas:', error);
    }
  };

  const crear = async (detalle) => {
      console.log("🧾 Detalle que se enviará:", detalle); 
    try {
      const res = await fetch('/api/ventas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(detalle),
      });

      if (!res.ok) throw new Error('Error al crear detalle_venta');
      await res.json(); // opcional si quieres usar la respuesta
      obtener();
    } catch (error) {
      console.error('Error al crear ventas:', error);
    }
  };

 const actualizar = async (id, datos) => {
  try {
    const res = await fetch(`/api/detalle_ventas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });

    if (!res.ok) throw new Error('Error al actualizar detalle_venta');
    await res.json();
    obtener();
  } catch (error) {
    console.error('Error al actualizar detalle_venta:', error);
  }
};


  const eliminar = async (id) => {
    try {
      const res = await fetch(`/api/ventas/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar detalle_venta');
      await res.json();
      obtener();
    } catch (error) {
      console.error('Error al eliminar venta:', error);
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
  };
}
