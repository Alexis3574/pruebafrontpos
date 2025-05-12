'use client';

export default function List({ data, onEdit, onDelete }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Lista de Detalles de Venta</h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="p-2">Venta ID</th>
            <th className="p-2">Producto ID</th>
            <th className="p-2">Cantidad</th>
            <th className="p-2">Precio Unitario</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">No hay registros.</td>
            </tr>
          ) : (
            data.map((detalle) => (
              <tr key={detalle.id} className="border-t">
                <td className="p-2">{detalle.venta_id}</td>
                <td className="p-2">{detalle.producto_id}</td>
                <td className="p-2">{detalle.cantidad}</td>
                <td className="p-2">{detalle.precio_unitario}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => onEdit(detalle)} className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => onDelete(detalle.id)} className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
