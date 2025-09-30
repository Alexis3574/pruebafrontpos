"use client";
import { useCarrito } from "../../hooks/useCarrito";

export default function CarritoList() {
  const { carrito, actualizarCantidad, eliminar, vaciar, confirmar } = useCarrito();

  const total = carrito.items?.reduce(
    (sum, item) => sum + item.cantidad * item.precio,
    0
  ) || 0;

  return (
    <div className="p-4 bg-white shadow rounded text-black">
      <h2 className="text-xl font-bold mb-4">🛒 Carrito</h2>

      {carrito.items?.length === 0 ? (
        <p className="text-gray-600">No hay productos en el carrito</p>
      ) : (
        <>
          <ul className="space-y-3">
            {carrito.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                {/* Nombre y cantidad */}
                <div className="flex flex-col">
                  <span className="font-medium">{item.producto.nombre}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <label className="text-sm">Cant:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) =>
                        actualizarCantidad(item.id, parseInt(e.target.value))
                      }
                      className="w-16 border rounded px-1 text-center"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-700">
                    ${(item.cantidad * item.precio).toFixed(2)}
                  </span>
                  <button
                    onClick={() => eliminar(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 text-lg font-bold flex justify-between">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={vaciar}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
            >
              Vaciar
            </button>
            <button
              onClick={confirmar}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            >
              Confirmar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
