// app/hooks/useReportes.js
'use client';

import { useState, useEffect } from 'react';

export function useReportes() {
  const [reportes, setReportes] = useState([]);

  const obtenerReportesPorFecha = async (fechaInicio, fechaFin) => {
    try {
      const res = await fetch(`/api/reportes?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
      const data = await res.json();
      setReportes(data);
    } catch (error) {
      console.error('Error al obtener reportes:', error);
    }
  };

  return {
    reportes,
    obtenerReportesPorFecha,
  };
}
