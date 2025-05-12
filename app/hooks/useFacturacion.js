// app/hooks/useFacturas.js
'use client';

import { useState, useEffect } from 'react';

export function useFacturas() {
  const [facturas, setFacturas] = useState([]);

  const obtenerFacturas = async () => {
    try {
      const res = await fetch('/api/facturas');
      const data = await res.json();
      setFacturas(data);
    } catch (error) {
      console.error('Error al obtener facturas:', error);
    }
  };

  const crearFactura = async (nuevaFactura) => {
    try {
      const res = await fetch('/api/facturas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaFactura),
      });
      const data = await res.json();
      setFacturas([...facturas, data]);
    } catch (error) {
      console.error('Error al crear factura:', error);
    }
  };

  useEffect(() => {
    obtenerFacturas();
  }, []);

  return {
    facturas,
    obtenerFacturas,
    crearFactura,
  };
}
