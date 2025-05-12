'use client';
import { useState, useEffect } from 'react';

export default function Form({ itemEditar, onSave }) {
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');

  useEffect(() => {
    if (itemEditar) {
      setProducto(itemEditar.producto);
      setCantidad(itemEditar.cantidad);
      setUbicacion(itemEditar.ubicacion);
      setFechaIngreso(itemEditar.fechaIngreso.split('T')[0]);
    }
  }, [itemEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!producto || !cantidad || !ubicacion || !fechaIngreso) {
      alert('Todos los campos son obligatorios');
      return;
    }

    await onSave({
      producto,
      cantidad: parseInt(cantidad),
      ubicacion,
      fechaIngreso,
    });

    setProducto('');
    setCantidad('');
    setUbicacion('');
    setFechaIngreso('');
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
      <input type="text" placeholder="Producto" className="border px-3 py-2 rounded" value={producto} onChange={(e) => setProducto(e.target.value)} />
      <input type="number" placeholder="Cantidad" className="border px-3 py-2 rounded" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
      <input type="text" placeholder="Ubicación" className="border px-3 py-2 rounded" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
      <input type="date" className="border px-3 py-2 rounded" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} />
      <button type="submit" className="col-span-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        {itemEditar ? 'Actualizar Inventario' : 'Agregar Inventario'}
      </button>
    </form>
  );
}
