import { useState, useEffect } from 'react';

export default function ProveedorForm({ onSubmit, initialData = {} }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [products, setProducts] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setContact(initialData.contact || '');
      setProducts(initialData.products || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, contact, products });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" required />
      <input value={contact} onChange={e => setContact(e.target.value)} placeholder="Contacto" required />
      <input value={products} onChange={e => setProducts(e.target.value)} placeholder="Productos que provee" />
      <button type="submit">Guardar Proveedor</button>
    </form>
  );
}
