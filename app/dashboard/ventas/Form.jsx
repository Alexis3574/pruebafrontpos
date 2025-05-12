'use client';
import { useState, useEffect } from 'react';

export default function Form({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    venta_id: '',
    producto_id: '',
    cantidad: '',
    precio_unitario: '',
  });

  useEffect(() => {
    setForm({
      venta_id: initialData.venta_id ?? '',
      producto_id: initialData.producto_id ?? '',
      cantidad: initialData.cantidad ?? '',
      precio_unitario: initialData.precio_unitario ?? '',
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar y convertir los datos
    const data = {
      venta_id: parseInt(form.venta_id),
      producto_id: parseInt(form.producto_id),
      cantidad: parseInt(form.cantidad),
      precio_unitario: parseFloat(form.precio_unitario),
    };

    // Evitar envío si algún campo está vacío o mal
    if (
      isNaN(data.venta_id) ||
      isNaN(data.producto_id) ||
      isNaN(data.cantidad) ||
      isNaN(data.precio_unitario)
    ) {
      alert('Por favor llena todos los campos correctamente.');
      return;
    }

    onSubmit(data);
    setForm({ venta_id: '', producto_id: '', cantidad: '', precio_unitario: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input name="venta_id" value={form.venta_id} onChange={handleChange} placeholder="Venta ID" className="border p-2" />
      <input name="producto_id" value={form.producto_id} onChange={handleChange} placeholder="Producto ID" className="border p-2" />
      <input name="cantidad" type="number" value={form.cantidad} onChange={handleChange} placeholder="Cantidad" className="border p-2" />
      <input name="precio_unitario" type="number" value={form.precio_unitario} onChange={handleChange} placeholder="Precio Unitario" className="border p-2" />
      <button type="submit" className="col-span-1 md:col-span-2 bg-indigo-600 text-white py-2 rounded">
        {initialData.id ? 'Actualizar' : 'Agregar Detalle'}
      </button>
    </form>
  );
}
