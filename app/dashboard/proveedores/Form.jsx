'use client';
import { useState, useEffect } from 'react';
import { useProductos } from '@/hooks/useProductos';

export default function Form({ productoEditar, onSave }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    if (productoEditar) {
      setNombre(productoEditar.nombre);
      setPrecio(productoEditar.precio);
      setStock(productoEditar.stock);
      setCategoria(productoEditar.categoria);
    }
  }, [productoEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !precio || !stock || !categoria) {
      alert('Todos los campos son obligatorios');
      return;
    }

    await onSave({ nombre, precio: parseFloat(precio), stock: parseInt(stock), categoria });
    setNombre('');
    setPrecio('');
    setStock('');
    setCategoria('');
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
      <input type="text" placeholder="Nombre" className="border px-3 py-2 rounded" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="number" placeholder="Precio" className="border px-3 py-2 rounded" value={precio} onChange={(e) => setPrecio(e.target.value)} />
      <input type="number" placeholder="Stock" className="border px-3 py-2 rounded" value={stock} onChange={(e) => setStock(e.target.value)} />
      <input type="text" placeholder="Categoría" className="border px-3 py-2 rounded" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      <button type="submit" className="col-span-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        {productoEditar ? 'Actualizar Producto' : 'Agregar Producto'}
      </button>
    </form>
  );
}
