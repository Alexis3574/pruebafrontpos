'use client';
import { createContext, useContext, useState, useMemo } from 'react';

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = {
          ...copy[idx],
          cantidad: copy[idx].cantidad + item.cantidad,
        };
        return copy;
      }
      return [...prev, item];
    });
  };

  const updateQty = (id, cantidad) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, cantidad: Math.max(1, cantidad) } : i
      )
    );
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const count = useMemo(
    () => items.reduce((a, i) => a + i.cantidad, 0),
    [items]
  );

  const total = useMemo(
    () => items.reduce((a, i) => a + i.precio * i.cantidad, 0),
    [items]
  );

  const value = { items, addItem, updateQty, removeItem, clear, count, total };
  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>');
  return ctx;
}
