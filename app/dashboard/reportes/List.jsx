'use client';

export default function List({ reportes }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Movimientos del periodo</h2>
      <table className="w-full table-auto text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Monto</th>
          </tr>
        </thead>
        <tbody>
          {reportes.length > 0 ? (
            reportes.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{new Date(r.fecha).toLocaleDateString()}</td>
                <td className="px-4 py-2">{r.descripcion}</td>
                <td className="px-4 py-2">{r.tipo}</td>
                <td className="px-4 py-2">${r.monto.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">No hay reportes para este periodo.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
