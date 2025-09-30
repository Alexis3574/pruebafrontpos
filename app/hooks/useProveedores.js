'use client';
import { useState, useEffect } from 'react';

export function useProveedores() {
  const [proveedores, setProveedores] = useState([]);

  const obtener = async () => {
    const res = await fetch('/api/proveedores');
    const data = await res.json();
    setProveedores(data);
  };

  const crear = async (datos) => {
    await fetch('/api/proveedores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    obtener();
  };

  const actualizar = async (id, datos) => {
    await fetch(`/api/proveedores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    obtener();
  };

  const eliminar = async (id) => {
    await fetch(`/api/proveedores/${id}`, { method: 'DELETE' });
    obtener();
  };

  useEffect(() => {
    obtener();
  }, []);

  return { proveedores, crear, actualizar, eliminar };
}
