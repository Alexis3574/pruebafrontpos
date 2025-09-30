'use client';
import { useState, useEffect } from 'react';

export function useConfiguracion() {
  const [configuracion, setConfiguracion] = useState([]);

  const obtener = async () => {
    try {
      const res = await fetch('/api/configuracion');
      if (!res.ok) throw new Error('Error al obtener configuraciones');
      const data = await res.json();
      setConfiguracion(data);
    } catch (error) {
      console.error('❌ Error al obtener configuraciones:', error);
    }
  };

  const crear = async (item) => {
    try {
      const res = await fetch('/api/configuracion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error('Error al crear configuración');
      await res.json();
      obtener();
    } catch (error) {
      console.error('❌ Error al crear configuración:', error);
    }
  };

  const actualizar = async (id, item) => {
    try {
      const res = await fetch(`/api/configuracion/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error('Error al actualizar configuración');
      await res.json();
      obtener();
    } catch (error) {
      console.error('❌ Error al actualizar configuración:', error);
    }
  };

  const eliminar = async (id) => {
    try {
      const res = await fetch(`/api/configuracion/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar configuración');
      await res.json();
      obtener();
    } catch (error) {
      console.error('❌ Error al eliminar configuración:', error);
    }
  };

  useEffect(() => {
    obtener();
  }, []);

  return {
    configuracion,
    obtener,
    crear,
    actualizar,
    eliminar,
  };
}
