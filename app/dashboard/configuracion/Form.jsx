'use client';

import { useEffect, useState } from 'react';
import { useConfiguracion } from '../../hooks/useConfiguracion';
import ScreenReaderToggle from '../../../components/accessibility/ScreenReaderToggle';
import { useAccessibility } from '../../context/AccessibilityContext';

export default function ConfiguracionForm() {
  const { valores, setValores, guardar, obtener } = useConfiguracion();
  const { enabled, announce } = useAccessibility();

  const [vozSeleccionada, setVozSeleccionada] = useState('');
  const [vocesDisponibles, setVocesDisponibles] = useState([]);
  const [velocidad, setVelocidad] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const cargarVoces = () => {
      const voces = window.speechSynthesis.getVoices();
      setVocesDisponibles(voces);
    };

    cargarVoces();
    window.speechSynthesis.onvoiceschanged = cargarVoces;
  }, []);

  useEffect(() => {
    (async () => {
      await obtener();
      const res = await fetch('/api/configuracion', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const voz = data.find((c) => c.clave === 'voz_tts');
        const vel = data.find((c) => c.clave === 'velocidad_tts');
        setVozSeleccionada(voz ? voz.valor : '');
        setVelocidad(vel ? parseFloat(vel.valor) : 1);
      }
    })();
  }, []);

  const handleGuardarVoz = async (vozURI) => {
    setVozSeleccionada(vozURI);
    await guardar('voz_tts', vozURI || '');
    announce('Voz del lector de pantalla actualizada');
  };

  const handleGuardarVelocidad = async (valor) => {
    const v = parseFloat(valor);
    setVelocidad(v);
    await guardar('velocidad_tts', v);
    announce(`Velocidad del lector ajustada a ${v.toFixed(1)}x`);
  };

  const handleToggleOscuro = async () => {
    const nuevo = !valores.modoOscuro;
    setValores((prev) => ({ ...prev, modoOscuro: nuevo }));
    await guardar('modoOscuro', nuevo);
    localStorage.setItem('modoOscuro', JSON.stringify(nuevo));
    window.dispatchEvent(new CustomEvent('modoOscuroChange', { detail: nuevo }));
    announce(nuevo ? 'Modo oscuro activado' : 'Modo oscuro desactivado');
  };

  const handleToggleGrises = async () => {
    const nuevo = !valores.modoGrises;
    setValores((prev) => ({ ...prev, modoGrises: nuevo }));
    await guardar('modoGrises', nuevo);
    window.dispatchEvent(new CustomEvent('modoGrisesChange', { detail: nuevo }));
  };

  const handleToggleContraste = async () => {
    const nuevo = !valores.modoContraste;
    setValores((prev) => ({ ...prev, modoContraste: nuevo }));
    await guardar('modoContraste', nuevo);
    window.dispatchEvent(new CustomEvent('modoContrasteChange', { detail: nuevo }));
  };

  const handleTextoChange = async (valor) => {
    const porcentaje = parseInt(valor);
    setValores((prev) => ({ ...prev, tamanoTexto: porcentaje }));
    await guardar('tamanoTexto', porcentaje);
    window.dispatchEvent(new CustomEvent('modoTextoChange', { detail: porcentaje }));
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
      Object.assign(cursorSimulado.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '8px',
        height: '8px',
        background: 'black',
        borderRadius: '50%',
        pointerEvents: 'none',
        transition: 'width 0.15s ease, height 0.15s ease, background 0.15s ease, transform 0.03s linear',
        zIndex: '99999',
        opacity: '0.9',
      });
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

    return () => window.removeEventListener('mousemove', moverCursor);
  }, [valores.tamanoCursor, valores.modoContraste, valores.modoGrises]);

  return (
    <div className="space-y-8 p-6 max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-colors duration-300">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Ajustes de Accesibilidad y Apariencia
      </h2>

      <div className="flex items-center justify-between">
        <label className="font-semibold text-gray-700 dark:text-gray-300">
          Modo oscuro
        </label>
        <button
          onClick={handleToggleOscuro}
          className={`px-4 py-2 rounded-full transition ${
            valores.modoOscuro ? 'bg-blue-600 text-white' : 'bg-gray-500 text-white'
          }`}
          data-sr="Alternar modo oscuro"
        >
          {valores.modoOscuro ? 'Activado' : 'Desactivado'}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <label className="font-semibold text-gray-700 dark:text-gray-300">
          Escala de grises global
        </label>
        <button
          onClick={handleToggleGrises}
          className={`px-4 py-2 rounded-full transition ${
            valores.modoGrises ? 'bg-green-600 text-white' : 'bg-gray-500 text-white'
          }`}
          data-sr="Alternar modo escala de grises"
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
          data-sr="Alternar modo alto contraste"
        >
          {valores.modoContraste ? 'Activado' : 'Desactivado'}
        </button>
      </div>

      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
        <ScreenReaderToggle />
      </div>

      {enabled && (
        <div className="mt-4 space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            Configuración del lector de pantalla
          </h3>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Seleccionar voz:
            </label>
            <select
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              value={vozSeleccionada}
              onChange={(e) => handleGuardarVoz(e.target.value)}
            >
              <option value="">Predeterminada del sistema</option>
              {vocesDisponibles.map((v, i) => (
                <option key={i} value={v.voiceURI}>
                  {v.name} {v.lang ? `(${v.lang})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Velocidad de lectura: {velocidad.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={velocidad}
              onChange={(e) => handleGuardarVelocidad(e.target.value)}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Lenta</span>
              <span>Normal</span>
              <span>Rápida</span>
            </div>
          </div>
        </div>
      )}

    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
      <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
        Tipografía del texto
      </label>
      <select
        value={valores.tipografia || 'Inter'}
        onChange={async (e) => {
          const nuevaTipografia = e.target.value;
          setValores((prev) => ({ ...prev, tipografia: nuevaTipografia }));
          await guardar('tipografia', nuevaTipografia);

    
          document.documentElement.style.setProperty(
            '--font-base',
            `'${nuevaTipografia}', sans-serif`
          );

          announce(`Tipografía cambiada a ${nuevaTipografia}`);
        }}
        className="w-full mt-1 p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
      >
        {[
          'Inter (Predeterminado)',
          'Roboto',
          'Poppins',
          'Open Sans',
          'Montserrat',
          'Lato',
          'Nunito',
          'Raleway',
          'Merriweather',
          'Source Sans Pro'
        ].map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
      <p className="text-sm text-gray-500 mt-1">
        Cambia la fuente de todo el texto de la aplicación.
      </p>
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
