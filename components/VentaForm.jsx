import { useState } from 'react';

export default function VentaForm({ onSubmit }) {
  const [productos, setProductos] = useState([]);
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [total, setTotal] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ productos, metodoPago, total });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Aquí deberías usar un selector dinámico de productos y cantidades */}
      <input value={total} onChange={e => setTotal(e.target.value)} placeholder="Total" type="number" required />
      <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
        <option value="efectivo">Efectivo</option>
        <option value="tarjeta">Tarjeta</option>
        <option value="transferencia">Transferencia</option>
      </select>
      <button type="submit">Registrar Venta</button>
    </form>
  );
}
