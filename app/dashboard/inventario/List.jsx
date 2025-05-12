'use client';
export default function List({ inventario, onEdit }) {
  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Lista de Inventario</h2>
      <table className="w-full table-auto">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Producto</th>
            <th className="px-4 py-2 text-left">Cantidad</th>
            <th className="px-4 py-2 text-left">Ubicación</th>
            <th className="px-4 py-2 text-left">Fecha Ingreso</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventario.length > 0 ? (
            inventario.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{item.producto}</td>
                <td className="px-4 py-2">{item.cantidad}</td>
                <td className="px-4 py-2">{item.ubicacion}</td>
                <td className="px-4 py-2">{new Date(item.fechaIngreso).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <button onClick={() => onEdit(item)} className="text-indigo-600 hover:underline">Editar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-4 text-center text-gray-500">No hay registros en el inventario.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
