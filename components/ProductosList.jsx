"use client";
import ProductoCard from "./cards/ProductoCard";

export default function ProductosList({ productos }) {
  if (!productos || productos.length === 0) {
    return <p className="text-gray-600">No hay productos disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {productos.map((p) => (
        <ProductoCard key={p.id} producto={p} />
      ))}
    </div>
  );
}
