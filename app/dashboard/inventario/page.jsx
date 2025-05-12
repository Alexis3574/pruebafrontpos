'use client';
import { useState, useEffect } from 'react';
import Form from './Form';
import List from './List';
import { useInventario } from '../../hooks/useInventario';

export default function InventarioPage() {
  const { inventario, crearInventario, actualizarInventario, obtenerInventario } = useInventario();
  const [itemEditar, setItemEditar] = useState(null);

  useEffect(() => {
    obtenerInventario();
  }, []);

  const handleSave = async (data) => {
    if (itemEditar) {
      await actualizarInventario(itemEditar.id, data);
      setItemEditar(null);
    } else {
      await crearInventario(data);
    }
    obtenerInventario();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Inventario</h1>
      <Form itemEditar={itemEditar} onSave={handleSave} />
      <List inventario={inventario} onEdit={setItemEditar} />
    </div>
  );
}
