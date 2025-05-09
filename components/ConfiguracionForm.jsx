import { useState, useEffect } from 'react';

export default function ConfiguracionForm({ onSubmit, initialData = {} }) {
  const [nombreNegocio, setNombreNegocio] = useState('');
  const [email, setEmail] = useState('');
  const [stockMinimo, setStockMinimo] = useState(10);

  useEffect(() => {
    if (initialData) {
      setNombreNegocio(initialData.nombreNegocio || '');
      setEmail(initialData.email || '');
      setStockMinimo(initialData.stockMinimo || 10);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombreNegocio, email, stockMinimo });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={nombreNegocio} onChange={e => setNombreNegocio(e.target.value)} placeholder="Nombre del negocio" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo" type="email" />
      <input value={stockMinimo} onChange={e => setStockMinimo(e.target.value)} placeholder="Stock mínimo global" type="number" />
      <button type="submit">Guardar Configuración</button>
    </form>
  );
}
