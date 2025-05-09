'use client';

import { useVentas } from '@/hooks/useVentas';

export default function VentasTable() {
  const { data: ventas, isLoading, error } = useVentas();

  if (isLoading) return <p>Cargando ventas...</p>;
  if (error) return <p>Error al cargar ventas.</p>;

  return (
    <table className="min-w-full bg-white shadow rounded">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="px-4 py-2">Fecha</th>
          <th className="px-4 py-2">Total</th>
          <th className="px-4 py-2">Método de Pago</th>
        </tr>
      </thead>
      <tbody>
        {ventas.map((venta) => (
          <tr key={venta.id} className="hover:bg-gray-50">
            <td className="px-4 py-2">{new Date(venta.fecha).toLocaleDateString()}</td>
            <td className="px-4 py-2">${venta.total}</td>
            <td className="px-4 py-2">{venta.metodoPago}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
