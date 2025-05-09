'use client';
import { useState } from 'react';
import { useCreateFactura } from '@/hooks/useFacturacion';

export default function FacturaForm() {
  const [formData, setFormData] = useState({
    cliente: '',
    rfc: '',
    fecha: '',
    montoTotal: 0,
    metodoPago: '',
  });

  const { createFactura, loading } = useCreateFactura();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cliente || !formData.montoTotal) {
      alert('Campos obligatorios incompletos');
      return;
    }

    await createFactura(formData);
    setFormData({ cliente: '', rfc: '', fecha: '', montoTotal: 0, metodoPago: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold">Nueva Factura</h2>

      <input
        type="text"
        name="cliente"
        placeholder="Nombre del cliente"
        value={formData.cliente}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <input
        type="text"
        name="rfc"
        placeholder="RFC"
        value={formData.rfc}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />
      <input
        type="date"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />
      <input
        type="number"
        name="montoTotal"
        step="0.01"
        placeholder="Monto total"
        value={formData.montoTotal}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <input
        type="text"
        name="metodoPago"
        placeholder="Método de pago"
        value={formData.metodoPago}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        {loading ? 'Generando...' : 'Generar Factura'}
      </button>
    </form>
  );
}
