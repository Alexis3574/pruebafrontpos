'use client';

import { useEffect } from 'react';
import { useAccessibility } from '../../app/context/AccessibilityContext';
import { useConfiguracion } from '../../app/hooks/useConfiguracion';

export default function ScreenReaderToggle({ className = '' }) {
  const { enabled, setEnabled, announce } = useAccessibility();
  const { guardar } = useConfiguracion();

  useEffect(() => {
    const cargarConfiguracion = async () => {
      try {
        const res = await fetch('/api/configuracion/lector_pantalla_activo', {
          cache: 'no-store',
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data && typeof data.valor !== 'undefined') {
          const activo = JSON.parse(data.valor);
          setEnabled(activo);
        }
      } catch (error) {
        console.error('❌ Error al obtener estado del lector:', error);
      }
    };

    cargarConfiguracion();
  }, [setEnabled]);

  const toggleLectorPantalla = async () => {
    const nuevoEstado = !enabled;
    setEnabled(nuevoEstado);

    try {
      await guardar('lector_pantalla_activo', nuevoEstado);
      announce(
        nuevoEstado
          ? 'Lector de pantalla activado'
          : 'Lector de pantalla desactivado'
      );
    } catch (error) {
      console.error('❌ Error al guardar estado del lector:', error);
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 shadow transition-colors ${className}`}
    >
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Lector de pantalla
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Lee en voz alta etiquetas al navegar con teclado. Atajo:{' '}
          <kbd className="px-1 border rounded">Ctrl</kbd>+
          <kbd className="px-1 border rounded">Alt</kbd>+
          <kbd className="px-1 border rounded">S</kbd>
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={toggleLectorPantalla}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition
          ${enabled ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}`}
        aria-label={
          enabled
            ? 'Desactivar lector de pantalla'
            : 'Activar lector de pantalla'
        }
        data-sr={
          enabled
            ? 'Desactivar lector de pantalla'
            : 'Activar lector de pantalla'
        }
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition
            ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
}
