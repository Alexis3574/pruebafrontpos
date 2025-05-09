'use client';

import { useUsers } from '@/hooks/useUsers';

export default function UsersList() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error al cargar usuarios.</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Usuarios</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border p-3 rounded">
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo:</strong> {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
