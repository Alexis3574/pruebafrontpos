// app/hooks/useConfiguracion.js
'use client';

import { useState, useEffect } from 'react';

export function useConfiguracion() {
  const [configuracion, setConfiguracion] = useState(null);

  const obtenerConfiguracion = async () => {
    try {
      const res = await fetch('/api/configuracion');
      const data = await res.json();
      setConfiguracion(data);
    } catch (error) {
      console.error('Error al obtener la configuración:', error);
    }
  };

  const guardarConfiguracion = async (configActualizada) => {
    try {
      const res = await fetch('/api/configuracion', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configActualizada),
      });
      const data = await res.json();
      setConfiguracion(data);
    } catch (error) {
      console.error('Error al guardar configuración:', error);
    }
  };

  useEffect(() => {
    obtenerConfiguracion();
  }, []);

  return {
    configuracion,
    obtenerConfiguracion,
    guardarConfiguracion,
  };
}
