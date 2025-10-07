'use client';

import { useEffect } from 'react';
import { useConfiguracion } from '../../hooks/useConfiguracion';

export default function ConfiguracionForm() {
  const { valores, setValores, guardar } = useConfiguracion();

  const handleToggleGrises = async () => {
    const nuevo = !valores.modoGrises;
    setValores((prev) => ({ ...prev, modoGrises: nuevo }));
    await guardar('modoGrises', JSON.stringify(nuevo));
  };

  const handleToggleContraste = async () => {
    const nuevo = !valores.modoContraste;
    setValores((prev) => ({ ...prev, modoContraste: nuevo }));
    await guardar('modoContraste', JSON.stringify(nuevo));
  };

  const handleTextoChange = async (valor) => {
    const porcentaje = parseInt(valor);
    setValores((prev) => ({ ...prev, tamanoTexto: porcentaje }));
    await guardar('tamanoTexto', porcentaje);
  };

  const handleCursorChange = async (valor) => {
    const escala = parseFloat(valor);
    setValores((prev) => ({ ...prev, tamanoCursor: escala }));
    await guardar('tamanoCursor', escala);
  };

  useEffect(() => {
    document.body.style.cursor = 'none';

    let cursorSimulado = document.getElementById('cursor-simulado');
    if (!cursorSimulado) {
      cursorSimulado = document.createElement('div');
      cursorSimulado.id = 'cursor-simulado';
      cursorSimulado.style.position = 'fixed';
      cursorSimulado.style.top = '0';
      cursorSimulado.style.left = '0';
      cursorSimulado.style.width = '8px';
      cursorSimulado.style.height = '8px';
      cursorSimulado.style.background = 'black';
      cursorSimulado.style.borderRadius = '50%';
      cursorSimulado.style.pointerEvents = 'none';
      cursorSimulado.style.transition =
        'width 0.15s ease, height 0.15s ease, background 0.15s ease, transform 0.03s linear';
      cursorSimulado.style.zIndex = '99999';
      cursorSimulado.style.opacity = '0.9';
      document.body.appendChild(cursorSimulado);
    }

    const moverCursor = (e) => {
      cursorSimulado.style.transform = `translate(${e.clientX - cursorSimulado.offsetWidth / 2}px, ${e.clientY - cursorSimulado.offsetHeight / 2}px)`;
    };

    window.addEventListener('mousemove', moverCursor);

    const base = 8;
    const nuevoTamaño = base * (valores.tamanoCursor || 1);
    cursorSimulado.style.width = `${nuevoTamaño}px`;
    cursorSimulado.style.height = `${nuevoTamaño}px`;

    if (valores.modoContraste) {
      cursorSimulado.style.background = 'yellow';
      cursorSimulado.style.boxShadow = '0 0 10px 2px rgba(255, 255, 0, 0.8)';
    } else if (valores.modoGrises) {
      cursorSimulado.style.background = 'gray';
      cursorSimulado.style.boxShadow = 'none';
    } else {
      cursorSimulado.style.background = 'black';
      cursorSimulado.style.boxShadow = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', moverCursor);
    };
  }, [valores.tamanoCursor, valores.modoContraste, valores.modoGrises]);

  return (
    <div className="space-y-8 p-6 max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Ajustes de Accesibilidad y Apariencia
      </h2>

      <div className="flex items-center justify-between">
        <label className="font-semibold text-gray-700 dark:text-gray-300">
          Escala de grises global
        </label>
        <button
          onClick={handleToggleGrises}
          className={`px-4 py-2 rounded-full transition ${
            valores.modoGrises ? 'bg-green-600 text-white' : 'bg-gray-500 text-white'
          }`}
        >
          {valores.modoGrises ? 'Activado' : 'Desactivado'}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="font-semibold text-gray-700 dark:text-gray-300">
          Modo alto contraste
        </label>
        <button
          onClick={handleToggleContraste}
          className={`px-4 py-2 rounded-full transition ${
            valores.modoContraste ? 'bg-yellow-400 text-black' : 'bg-gray-500 text-white'
          }`}
        >
          {valores.modoContraste ? 'Activado' : 'Desactivado'}
        </button>
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
          Tamaño del texto: {valores.tamanoTexto}%
        </label>
        <input
          type="range"
          min="50"
          max="150"
          step="5"
          value={valores.tamanoTexto}
          onChange={(e) => handleTextoChange(e.target.value)}
          className="w-full cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>Pequeño</span>
          <span>Predeterminado</span>
          <span>Grande</span>
        </div>
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
          Tamaño del cursor: {(valores.tamanoCursor * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={valores.tamanoCursor || 1}
          onChange={(e) => handleCursorChange(e.target.value)}
          className="w-full cursor-pointer accent-purple-600"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>Pequeño</span>
          <span>Normal</span>
          <span>Grande</span>
        </div>
      </div>
    </div>
  );
}
