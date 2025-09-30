'use client';

import { useState } from 'react';
import { useUsuarios } from '../../hooks/useUsuarios';
import UserForm from './UserForm';
import UserList from './UserList';

export default function ConfiguracionPage() {
  const { usuarios, crear: crearUsuario, eliminar, actualizarRol, actualizar } =
    useUsuarios();

  const [usuarioEditar, setUsuarioEditar] = useState(null);

  const handleSave = async (formData) => {
    if (usuarioEditar) {
      await actualizar(usuarioEditar.id, formData);
      setUsuarioEditar(null);
    } else {
      await crearUsuario(formData);
    }
  };

  const handleEdit = (usuario) => {
    setUsuarioEditar(usuario);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 text-slate-800">
      {/* Título */}
      <header>
        <h1 className="text-3xl font-bold text-emerald-700">
          Gestión de Usuarios
        </h1>
        <p className="text-slate-600 mt-1 text-sm">
          Administra cuentas, roles y credenciales de acceso.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
          <UserForm
            onSubmit={handleSave}
            usuarioEditar={usuarioEditar}
            onCancelEdit={() => setUsuarioEditar(null)}
          />
        </div>

        <UserList
          usuarios={usuarios}
          onDelete={eliminar}
          onUpdateRol={actualizarRol}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}
