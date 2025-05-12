'use client';
import { useEffect } from 'react';
import Form from './Form';
import { useConfiguracion } from '../../hooks/useConfiguracion';

export default function ConfiguracionPage() {
  const { configuracion, obtenerConfiguracion, guardarConfiguracion } = useConfiguracion();

  useEffect(() => {
    obtenerConfiguracion();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>
      <Form configInicial={configuracion} onGuardar={guardarConfiguracion} />
    </div>
  );
}
