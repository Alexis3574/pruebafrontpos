"use client";
import AddToCarritoButton from "../AddToCarritoButton";

export default function ProductoCard({ producto }) {
  return (
    <div className="border rounded-lg shadow p-4 flex flex-col justify-between bg-white text-black">
      <div>
        <h3 className="font-bold text-lg">{producto.nombre}</h3>
        <p className="text-gray-700">Precio: ${producto.precioventa}</p>
        {producto.stock !== null && (
          <p className="text-sm text-gray-500">Stock: {producto.stock}</p>
        )}
      </div>
      <div className="mt-4">
        <AddToCarritoButton producto={producto} />
      </div>
    </div>
  );
}
