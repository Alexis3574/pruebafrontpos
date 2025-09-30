'use client';

import { useEffect, useState } from 'react';

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  const obtener = async () => {
    try {
      const res = await fetch('/api/usuarios');
      if (!res.ok) throw new Error('Error al obtener usuarios');
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      console.error('❌ Error al obtener usuarios:', err);
      setError(err.message);
    }
  };

  const crear = async (nuevo) => {
    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevo),
      });

      const text = await res.text();
      if (!res.ok) {
        const data = text ? JSON.parse(text) : {};
        throw new Error(data.error || 'Error al crear usuario');
      }

      obtener();
    } catch (err) {
      console.error('❌ Error al crear usuario:', err);
      setError(err.message);
    }
  };

  const eliminar = async (id) => {
    try {
      const res = await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });

      const text = await res.text();
      if (!res.ok) {
        const data = text ? JSON.parse(text) : {};
        throw new Error(data.error || 'Error al eliminar usuario');
      }

      obtener(); 
    } catch (err) {
      console.error('❌ Error al eliminar usuario:', err);
      setError(err.message);
    }
  };

  const actualizar = async (id, datos) => {
    try {
      const res = await fetch(`/api/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      const text = await res.text();

      if (!res.ok) {
        const errorData = text ? JSON.parse(text) : {};
        throw new Error(errorData.error || 'Error al actualizar usuario');
      }

      const result = text ? JSON.parse(text) : null;
      obtener();
      return result;
    } catch (err) {
      console.error('❌ Error al actualizar usuario:', err);
      setError(err.message);
    }
  };

  const actualizarRol = async (id, rol) => {
    await actualizar(id, { rol });
  };

  useEffect(() => {
    obtener();
  }, []);

  return {
    usuarios,
    crear,
    eliminar,
    actualizar,
    actualizarRol,
    error,
  };
}
