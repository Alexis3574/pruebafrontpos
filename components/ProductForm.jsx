import { useState, useEffect } from 'react';

export default function ProductForm({ onSubmit, initialData = {} }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('animal');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setCategory(initialData.category || 'animal');
      setPrice(initialData.price || 0);
      setStock(initialData.stock || 0);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, category, price: parseFloat(price), stock: parseInt(stock) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" required />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="animal">Animal</option>
        <option value="vegetal">Vegetal</option>
        <option value="derivado">Derivado</option>
      </select>
      <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Precio" type="number" required />
      <input value={stock} onChange={e => setStock(e.target.value)} placeholder="Stock" type="number" required />
      <button type="submit">Guardar Producto</button>
    </form>
  );
}
