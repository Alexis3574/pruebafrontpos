'use client';
import PrintFactura from './printfactura';

export default function List({ facturas }) {
  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Historial de Facturas</h2>
      <table className="w-full table-auto mb-6">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2">Cliente</th>
            <th className="px-4 py-2">Productos</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Imprimir</th>
          </tr>
        </thead>
        <tbody>
          {facturas.length > 0 ? (
            facturas.map((factura) => (
              <tr key={factura.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{factura.cliente}</td>
                <td className="px-4 py-2">{factura.productos}</td>
                <td className="px-4 py-2">${factura.total.toFixed(2)}</td>
                <td className="px-4 py-2">{new Date(factura.fecha).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <PrintFactura factura={factura} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">No hay facturas registradas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
