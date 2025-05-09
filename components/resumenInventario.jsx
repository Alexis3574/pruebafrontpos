'use client';

import { useInventario } from '@/hooks/useInventario';

export default function ResumenInventario() {
  const { data: inventario, isLoading } = useInventario();

  if (isLoading) return <p>Cargando inventario...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {inventario.map(item => (
        <div key={item.id} className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-bold">{item.producto.nombre}</h3>
          <p><strong>Cantidad:</strong> {item.cantidad}</p>
          <p><strong>Tipo:</strong> {item.tipo}</p>
        </div>
      ))}
    </div>
  );
}
