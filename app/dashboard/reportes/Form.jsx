'use client';
import { useState } from 'react';

export default function Form({ onFilter }) {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fechaInicio || !fechaFin) {
      alert('Ambas fechas son requeridas');
      return;
    }

    onFilter({ fechaInicio, fechaFin });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <input
        type="date"
        className="border px-3 py-2 rounded"
        value={fechaInicio}
        onChange={(e) => setFechaInicio(e.target.value)}
      />
      <input
        type="date"
        className="border px-3 py-2 rounded"
        value={fechaFin}
        onChange={(e) => setFechaFin(e.target.value)}
      />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Filtrar
      </button>
    </form>
  );
}
