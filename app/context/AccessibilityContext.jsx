'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children, defaultEnabled = false }) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  const [vozURI, setVozURI] = useState('');
  const [velocidad, setVelocidad] = useState(1);
  const [voces, setVoces] = useState([]);

  const synthRef = useRef(
    typeof window !== 'undefined' ? window.speechSynthesis : null
  );
  const utterRef = useRef(null);

  // 🗣️ Cargar voces disponibles
  useEffect(() => {
    if (!window.speechSynthesis) return;

    const cargarVoces = () => {
      const lista = window.speechSynthesis.getVoices();
      setVoces(lista);
    };

    cargarVoces();
    window.speechSynthesis.onvoiceschanged = cargarVoces;
  }, []);

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetch('/api/configuracion', { cache: 'no-store' });
        if (!res.ok) return;

        const data = await res.json(); 
        if (cancel) return;

        const config = {};
        for (const c of data) config[c.clave] = c.valor;

        if (config.lector_pantalla_activo)
          setEnabled(config.lector_pantalla_activo === 'true');
        if (config.voz_tts) setVozURI(config.voz_tts);
        if (config.velocidad_tts)
          setVelocidad(parseFloat(config.velocidad_tts) || 1);
      } catch (e) {
        console.warn('No se pudo cargar configuración TTS:', e);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const speak = useCallback(
    (text) => {
      if (!text || !enabled || !synthRef.current) return;
      try {
        const synth = synthRef.current;
        synth.cancel();

        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = velocidad || 1;
        utter.pitch = 1;
        utter.volume = 1;

        if (vozURI && voces.length > 0) {
          const selectedVoice = voces.find((v) => v.voiceURI === vozURI);
          if (selectedVoice) utter.voice = selectedVoice;
        }

        utterRef.current = utter;
        synth.speak(utter);
      } catch (e) {
        console.warn('Error en TTS:', e);
      }
    },
    [enabled, vozURI, velocidad, voces]
  );

  const announce = useCallback(
    (text) => {
      speak(text);
      const live = document.getElementById('sr-live-region');
      if (live) live.textContent = text;
    },
    [speak]
  );

  const saveEnabled = useCallback(
    async (value) => {
      setEnabled(value);
      try {
        await fetch('/api/configuracion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clave: 'lector_pantalla_activo',
            valor: String(value),
          }),
        });
      } catch (e) {
        console.warn('Error guardando estado lector:', e);
      }
      announce(value ? 'Lector de pantalla activado' : 'Lector de pantalla desactivado');
    },
    [announce]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveEnabled(!enabled);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [enabled, saveEnabled]);

  const value = useMemo(
    () => ({
      enabled,
      setEnabled: saveEnabled,
      announce,
      vozURI,
      setVozURI,
      velocidad,
      setVelocidad,
      voces,
    }),
    [enabled, saveEnabled, announce, vozURI, velocidad, voces]
  );

  return (
    <AccessibilityContext.Provider value={value}>
      <div
        id="sr-live-region"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
};
