'use client';
import { useState } from 'react';

export default function Form({ onSave }) {
  const [cliente, setCliente] = useState('');
  const [productos, setProductos] = useState('');
  const [total, setTotal] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cliente || !productos || !total || !fecha) {
      alert('Todos los campos son obligatorios');
      return;
    }

    onSave({
      cliente,
      productos,
      total: parseFloat(total),
      fecha,
    });

    setCliente('');
    setProductos('');
    setTotal('');
    setFecha('');
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
      <input
        type="text"
        placeholder="Cliente"
        className="border px-3 py-2 rounded"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />
      <input
        type="text"
        placeholder="Productos vendidos"
        className="border px-3 py-2 rounded"
        value={productos}
        onChange={(e) => setProductos(e.target.value)}
      />
      <input
        type="number"
        placeholder="Total"
        className="border px-3 py-2 rounded"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
      />
      <input
        type="date"
        className="border px-3 py-2 rounded"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <button type="submit" className="col-span-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        Generar Factura
      </button>
    </form>
  );
}
