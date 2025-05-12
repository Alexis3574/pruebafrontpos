'use client';
import { useEffect, useState } from 'react';
import Form from './Form';
import List from './List';
import { useReportes } from '../../hooks/useReportes';

export default function ReportesPage() {
  const { reportes, obtenerReportesPorFecha } = useReportes();
  const [filtro, setFiltro] = useState(null);

  useEffect(() => {
    if (filtro) {
      obtenerReportesPorFecha(filtro);
    }
  }, [filtro]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reportes</h1>
      <Form onFilter={setFiltro} />
      <List reportes={reportes} />
    </div>
  );
}
