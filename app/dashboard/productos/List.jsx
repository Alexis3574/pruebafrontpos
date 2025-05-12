'use client';

export default function List({ productos, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Lista de Productos</h2>
      <table className="w-full table-auto">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Precio</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Categoría</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
   <tbody>
  {productos.length > 0 ? (
    productos.map((prod) => (
      <tr key={prod.id} className="hover:bg-gray-100 text-black">
        <td className="px-4 py-2">{prod.nombre}</td>
        <td className="px-4 py-2">${prod.precio_venta}</td>
        <td className="px-4 py-2">{prod.stock}</td>
        <td className="px-4 py-2">{prod.tipo}</td>
       <td className="px-4 py-2">
         <button onClick={() => onEdit(prod)} className="text-indigo-600 hover:underline mr-2">Editar</button>
        <button onClick={() => onDelete(prod.id)} className="text-red-600 hover:underline">Eliminar</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="px-4 py-4 text-center text-gray-500">No hay productos registrados.</td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
}
