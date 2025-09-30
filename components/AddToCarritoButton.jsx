"use client";
import { useCarrito } from "../app/hooks/useCarrito";

export default function AddToCarritoButton({ producto }) {
  const { agregar } = useCarrito();

  return (
    <button
      onClick={() => agregar(producto.id, 1, Number(producto.precioventa))}
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
    >
      Añadir
    </button>
  );
}
