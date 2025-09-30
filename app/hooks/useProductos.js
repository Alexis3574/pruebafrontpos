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
    const res = await fetch('/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto),
    });

    if (!res.ok) {
      console.error('Error al crear producto');
      return;
    }

    const nuevo = await res.json();
    setProductos(prev => [...prev, nuevo]); 
  };

  const actualizarProducto = async (id, datos) => {
    const res = await fetch(`/api/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });

    if (!res.ok) {
      console.error('Error al actualizar producto');
      return;
    }

    const actualizado = await res.json();
    setProductos(prev =>
      prev.map(p =>
        p.id === id ? actualizado : p
      )
    );
  };

  const eliminarProducto = async (id) => {
    const res = await fetch(`/api/productos/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      console.error('Error al eliminar producto');
      return;
    }

    setProductos(prev => prev.filter(p => p.id !== id));
  };

  return {
    productos,
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
  };
}
