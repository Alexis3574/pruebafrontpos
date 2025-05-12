'use client';
import { useState } from 'react';

export function useProductos() {
  const [productos, setProductos] = useState([]);

  const obtenerProductos = async () => {
    const res = await fetch('/api/productos');
    if (!res.ok) {
      console.error('Error al obtener productos:', res.status);
      return;
    }
    const data = await res.json();
    setProductos(data);
  };

  const crearProducto = async (producto) => {
    await fetch('/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto),
    });
  };

  // ✅ Agrega esta función
  const actualizarProducto = async (id, datos) => {
    await fetch(`/api/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
  };
  const eliminarProducto = async (id) => {
  const res = await fetch(`/api/productos/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    console.error('Error al eliminar producto');
    return;
  }

  obtenerProductos(); // Actualiza la lista después de eliminar
};
  return {
    productos,
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto  // ✅ Asegúrate de retornarla aquí
  };
}
