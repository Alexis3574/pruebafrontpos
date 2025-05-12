// app/hooks/useInventario.js
'use client';

import { useState, useEffect } from 'react';

export function useInventario() {
  const [inventario, setInventario] = useState([]);

  const obtenerInventario = async () => {
    try {
      const res = await fetch('/api/inventario');
      const data = await res.json();
      setInventario(data);
    } catch (error) {
      console.error('Error al obtener inventario:', error);
    }
  };

  const crearInventario = async (nuevoItem) => {
    const res = await fetch('/api/inventario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoItem),
    });
    if (res.ok) await obtenerInventario();
  };

  const actualizarInventario = async (id, itemActualizado) => {
    const res = await fetch(`/api/inventario/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemActualizado),
    });
    if (res.ok) await obtenerInventario();
  };

  useEffect(() => {
    obtenerInventario();
  }, []);

  return {
    inventario,
    crearInventario,
    actualizarInventario,
    obtenerInventario,
  };
}
