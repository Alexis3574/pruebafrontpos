'use client';
import { useState, useEffect } from 'react';

export default function Form({ configInicial, onGuardar }) {
  const [form, setForm] = useState({
    nombreNegocio: '',
    direccion: '',
    moneda: '',
    stockMinimo: '',
    notificaciones: false,
  });

  useEffect(() => {
    if (configInicial) setForm(configInicial);
  }, [configInicial]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-xl space-y-4">
      <div>
        <label className="block font-medium">Nombre del Negocio</label>
        <input
          name="nombreNegocio"
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={form.nombreNegocio}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block font-medium">Dirección</label>
        <input
          name="direccion"
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={form.direccion}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block font-medium">Moneda</label>
        <input
          name="moneda"
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={form.moneda}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block font-medium">Stock Mínimo (alerta)</label>
        <input
          name="stockMinimo"
          type="number"
          className="w-full border px-3 py-2 rounded"
          value={form.stockMinimo}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          name="notificaciones"
          type="checkbox"
          checked={form.notificaciones}
          onChange={handleChange}
        />
        <label>Activar notificaciones por correo</label>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Guardar Configuración
      </button>
    </form>
  );
}
