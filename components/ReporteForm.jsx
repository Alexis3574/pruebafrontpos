'use client';
import { useState } from 'react';
import { useCreateReporte } from '@/hooks/useReportes';

export default function ReporteForm() {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    tipo: 'venta',
  });

  const { createReporte, loading } = useCreateReporte();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.titulo || !formData.fecha) {
      alert('Completa los campos requeridos');
      return;
    }

    await createReporte(formData);
    setFormData({ titulo: '', descripcion: '', fecha: '', tipo: 'venta' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold">Crear Reporte</h2>

      <input
        type="text"
        name="titulo"
        placeholder="Título del reporte"
        value={formData.titulo}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />
      <input
        type="date"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <select
        name="tipo"
        value={formData.tipo}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      >
        <option value="venta">Reporte de Ventas</option>
        <option value="inventario">Reporte de Inventario</option>
        <option value="financiero">Reporte Financiero</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Creando...' : 'Crear Reporte'}
      </button>
    </form>
  );
}
