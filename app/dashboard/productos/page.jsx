'use client';
import { useState, useEffect } from 'react';
import Form from './Form';
import List from './List';
import { useProductos } from '../../hooks/useProductos';

export default function ProductosPage() {
  const { productos, crearProducto, actualizarProducto, obtenerProductos, eliminarProducto } = useProductos();
  const [productoEditar, setProductoEditar] = useState(null);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleSave = async (datos) => {
    if (productoEditar) {
      await actualizarProducto(productoEditar.id, datos);
      setProductoEditar(null);
    } else {
      await crearProducto(datos);
    }
    obtenerProductos();
  };
 const handleDelete = async (id) => {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    await eliminarProducto(id);
  }
};

  return (
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold mb-6">Gestión de Productos</h1>
      <Form productoEditar={productoEditar} onSave={handleSave} />
<List productos={productos} onEdit={setProductoEditar} onDelete={handleDelete} />
    </div>
  );
}
