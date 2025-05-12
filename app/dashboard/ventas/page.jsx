'use client';
import { useState } from 'react';
import { useDetalleVentas } from '../../hooks/useDetalleVentas';
import Form from './Form';
import List from './List';

export default function VentasPage() {
  const { detalles, crear, actualizar, eliminar } = useDetalleVentas();
  const [editing, setEditing] = useState(null);

  const handleSubmit = (data) => {
    if (editing) {
      actualizar(editing.id, data);
      setEditing(null);
    } else {
      crear(data);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h1 className="text-xl font-bold mb-4">Gestión de Ventas</h1>

      <div className="bg-white shadow rounded p-4 mb-6">
        <Form onSubmit={handleSubmit} initialData={editing || {}} />
      </div>

      <div className="bg-white shadow rounded p-4">
        <List data={detalles} onEdit={setEditing} onDelete={eliminar} />
      </div>
    </div>
  );
}
