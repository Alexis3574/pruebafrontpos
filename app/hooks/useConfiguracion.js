'use client';
import { useState, useEffect, useRef } from 'react';

export function useConfiguracion() {
  const [configuracion, setConfiguracion] = useState([]);
  const [valores, setValores] = useState({
    modoGrises: false,
    modoContraste: false,
    tamanoTexto: 100,
    tipografia: 'Inter',
    tamanoCursor: 1, 
  });

  const cargado = useRef(false);

  const obtener = async () => {
    try {
      const res = await fetch('/api/configuracion');
      if (!res.ok) throw new Error('Error al obtener configuraciones');
      const data = await res.json();

      const gris = data.find((c) => c.clave === 'modoGrises');
      const contraste = data.find((c) => c.clave === 'modoContraste');
      const texto = data.find((c) => c.clave === 'tamanoTexto');
      const fuente = data.find((c) => c.clave === 'tipografia');
      const cursor = data.find((c) => c.clave === 'tamanoCursor');

      setConfiguracion(data);
      setValores({
        modoGrises: gris ? JSON.parse(gris.valor) : false,
        modoContraste: contraste ? JSON.parse(contraste.valor) : false,
        tamanoTexto: texto ? parseInt(texto.valor) : 100,
        tipografia: fuente ? fuente.valor : 'Inter',
        tamanoCursor: cursor ? parseFloat(cursor.valor) : 1,
      });

      cargado.current = true;
    } catch (error) {
      console.error('❌ Error al obtener configuraciones:', error);
    }
  };

  const guardar = async (clave, valor) => {
    try {
      await fetch(`/api/configuracion/${clave}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor }),
      });
    } catch (error) {
      console.error(`❌ Error al guardar ${clave}:`, error);
    }
  };

  useEffect(() => {
    if (!cargado.current) return;

    let filtro = '';
    if (valores.modoGrises) filtro += 'grayscale(100%) ';
    if (valores.modoContraste) filtro += 'contrast(150%) ';
    document.documentElement.style.filter = filtro.trim();
    document.documentElement.style.fontSize = `${valores.tamanoTexto}%`;
    document.documentElement.style.fontFamily = valores.tipografia;

    const style = document.getElementById('cursor-scale');
    if (style) style.remove();

    const newStyle = document.createElement('style');
    newStyle.id = 'cursor-scale';

    const size = 16 * valores.tamanoCursor;
    const strokeColor = valores.modoContraste ? 'yellow' : 'black';

    newStyle.textContent = `
      html, body, * {
        cursor: url('data:image/svg+xml;utf8,
          <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
            <path d="M2,2 L${size - 2},${size / 2} L${size / 3},${size - 2} Z"
              fill="${strokeColor}" stroke="white" stroke-width="1"/>
          </svg>'
        ) ${size / 6} ${size / 6}, auto !important;
      }
    `;

    document.head.appendChild(newStyle);
  }, [valores]);

  useEffect(() => {
    obtener();
  }, []);

  return {
    configuracion,
    valores,
    setValores,
    guardar,
  };
}
