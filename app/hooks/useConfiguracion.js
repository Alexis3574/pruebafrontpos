'use client';
import { useState, useEffect } from 'react';

export function useConfiguracion() {
  const [configuracion, setConfiguracion] = useState([]);
  const [valores, setValores] = useState({
    modoGrises: false,
    modoContraste: false,
    tamanoTexto: 100,
    tipografia: 'Inter', // 🔹 Fuente por defecto de Tailwind
  });

  // 🟢 Obtener configuraciones desde la API
  const obtener = async () => {
    try {
      const res = await fetch('/api/configuracion');
      if (!res.ok) throw new Error('Error al obtener configuraciones');
      const data = await res.json();
      setConfiguracion(data);

      const gris = data.find((c) => c.clave === 'modoGrises');
      const contraste = data.find((c) => c.clave === 'modoContraste');
      const texto = data.find((c) => c.clave === 'tamanoTexto');
      const fuente = data.find((c) => c.clave === 'tipografia');

      setValores({
        modoGrises: gris ? JSON.parse(gris.valor) : false,
        modoContraste: contraste ? JSON.parse(contraste.valor) : false,
        tamanoTexto: texto ? parseInt(texto.valor) : 100,
        tipografia: fuente ? JSON.parse(fuente.valor) : 'Inter',
      });
    } catch (error) {
      console.error('❌ Error al obtener configuraciones:', error);
    }
  };

  // 🟠 Guardar o actualizar configuración (por clave)
  const guardar = async (clave, valor) => {
    try {
      const res = await fetch(`/api/configuracion/${clave}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor }),
      });
      if (!res.ok) throw new Error('Error al guardar configuración');
      await res.json();
      obtener(); // Refrescar configuración
    } catch (error) {
      console.error(`❌ Error al guardar ${clave}:`, error);
    }
  };

  // 🎨 Aplicar efectos visuales globales
  useEffect(() => {
    let filtro = '';

    if (valores.modoGrises) filtro += 'grayscale(100%) ';
    if (valores.modoContraste) filtro += 'contrast(150%) ';

    // Aplica filtros globales
    document.documentElement.style.filter = filtro.trim();

    // Tamaño de texto
    document.documentElement.style.fontSize = `${valores.tamanoTexto}%`;

    // Tipografía global
    document.body.style.fontFamily =
      valores.tipografia ||
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  }, [valores]);

  useEffect(() => {
    obtener();
  }, []);

  return {
    configuracion,
    valores,
    setValores,
    guardar,
    obtener,
  };
}
