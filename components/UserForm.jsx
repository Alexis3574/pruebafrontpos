import { useState, useEffect } from 'react';

export default function UserForm({ onSubmit, initialData = {} }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setEmail(initialData.email || '');
      setRole(initialData.role || 'admin');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, role });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo" type="email" required />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="vendedor">Vendedor</option>
      </select>
      <button type="submit">Guardar Usuario</button>
    </form>
  );
}
