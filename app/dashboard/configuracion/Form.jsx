'use client';

import { useState } from 'react';

export default function ConfiguracionForm({ onSave }) {
  const [config, setConfig] = useState({
    modoGrises: localStorage.getItem('modoGrises') === 'true' || false,
    modoContraste: localStorage.getItem('modoContraste') === 'true' || false,
  });

  const handleToggleGrises = () => {
    const nuevoEstado = !config.modoGrises;
    setConfig((prev) => ({ ...prev, modoGrises: nuevoEstado }));

    // Guardar preferencia
    localStorage.setItem('modoGrises', nuevoEstado);

    // Notificar al layout
    window.dispatchEvent(
      new CustomEvent('modoGrisesChange', { detail: nuevoEstado })
    );
  };

  const handleToggleContraste = () => {
    const nuevoEstado = !config.modoContraste;
    setConfig((prev) => ({ ...prev, modoContraste: nuevoEstado }));

    // Guardar preferencia
    localStorage.setItem('modoContraste', nuevoEstado);

    // Notificar al layout
    window.dispatchEvent(
      new CustomEvent('modoContrasteChange', { detail: nuevoEstado })
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(config);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 p-4">
      {/* Opción para escala de grises */}
      <div>
        <label className="block mb-2 font-semibold">
          Escala de grises global
        </label>
        <button
          type="button"
          onClick={handleToggleGrises}
          className={`px-4 py-2 rounded ${
            config.modoGrises
              ? 'bg-green-600 text-white'
              : 'bg-gray-500 text-white'
          }`}
        >
          {config.modoGrises ? 'Activado' : 'Desactivado'}
        </button>
      </div>

      {/* Opción para contraste */}
      <div>
        <label className="block mb-2 font-semibold">
          Modo alto contraste
        </label>
        <button
          type="button"
          onClick={handleToggleContraste}
          className={`px-4 py-2 rounded ${
            config.modoContraste
              ? 'bg-yellow-600 text-black'
              : 'bg-gray-500 text-white'
          }`}
        >
          {config.modoContraste ? 'Activado' : 'Desactivado'}
        </button>
      </div>

      {/* Botón Guardar */}
      <button
        type="submit"
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Guardar configuración
      </button>
    </form>
  );
}
