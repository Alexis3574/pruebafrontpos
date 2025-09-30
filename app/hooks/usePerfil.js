'use client';
import { useState, useEffect } from 'react';

export function usePerfil() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtener = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/perfil');
      if (!res.ok) throw new Error('Error al obtener perfil');

      const data = await res.json();
      setUsuario(data);
    } catch (err) {
      console.error('❌ Error al obtener perfil:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const actualizar = async (datos) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/perfil', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      if (!res.ok) {
        const msg = await res.text();
        console.error('❌ Error HTTP:', res.status, msg);
        throw new Error(msg || 'Error al actualizar perfil');
      }

      const text = await res.text();
      if (text) {
        const data = JSON.parse(text);
        setUsuario(data);
      }
    } catch (err) {
      console.error('❌ Error al actualizar perfil:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarCuenta = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/perfil', {
        method: 'DELETE',
      });

      if (!res.ok) {
        const msg = await res.text();
        console.error('❌ Error HTTP:', res.status, msg);
        throw new Error(msg || 'Error al eliminar cuenta');
      }

      setUsuario(null); 
    } catch (err) {
      console.error('❌ Error al eliminar cuenta:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtener();
  }, []);

  return {
    usuario,
    actualizar,
    eliminarCuenta,
    obtener,
    loading,
    error,
  };
}
