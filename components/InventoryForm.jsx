
'use client';
import { useState } from 'react';
import { useCreateInventory } from '@/hooks/useInventory';

export default function InventoryForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    cantidad: 0,
    unidad: '',
    precioUnitario: 0,
  });

  const { createInventory, loading } = useCreateInventory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.cantidad || !formData.precioUnitario) {
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    await createInventory(formData);
    setFormData({ nombre: '', descripcion: '', cantidad: 0, unidad: '', precioUnitario: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold">Agregar Inventario</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre del producto"
        value={formData.nombre}
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
      <div className="flex gap-4">
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="unidad"
          placeholder="Unidad (kg, l, etc.)"
          value={formData.unidad}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
      </div>
      <input
        type="number"
        step="0.01"
        name="precioUnitario"
        placeholder="Precio unitario"
        value={formData.precioUnitario}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}
