'use client';

import { useProveedores } from '@/hooks/useProveedores';

export default function ProveedoresList() {
  const { data: proveedores, isLoading } = useProveedores();

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Proveedores</h2>
      <ul className="space-y-3">
        {proveedores.map(prov => (
          <li key={prov.id} className="border p-3 rounded">
            <p><strong>{prov.nombre}</strong></p>
            <p>Contacto: {prov.contacto}</p>
            <p>Productos: {prov.productos.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
