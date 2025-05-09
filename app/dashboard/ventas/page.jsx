'use client';
import { useState } from 'react';
import VentaForm from '@/components/forms/VentaForm';
import { useVentas } from '@/hooks/useVentas';

export default function VentasPage() {
  const { ventas, crearVenta, actualizarVenta, eliminarVenta } = useVentas();
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const manejarEnvio = (venta) => {
    if (ventaSeleccionada) {
      actualizarVenta(ventaSeleccionada.id, venta);
      setVentaSeleccionada(null);
    } else {
      crearVenta(venta);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Ventas</h1>

      <VentaForm onSubmit={manejarEnvio} ventaInicial={ventaSeleccionada} />

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Historial de Ventas</h2>
        <table className="w-full table-auto">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Cliente</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{venta.cliente}</td>
                <td className="px-4 py-2">${venta.total}</td>
                <td className="px-4 py-2">{new Date(venta.fecha).toLocaleDateString()}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => setVentaSeleccionada(venta)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarVenta(venta.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {ventas.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No hay ventas registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
