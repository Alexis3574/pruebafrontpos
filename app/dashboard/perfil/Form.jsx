'use client';

import { useEffect, useState } from 'react';
import { usePerfil } from '../../hooks/usePerfil';
import { signOut } from 'next-auth/react';

export default function FormPerfil() {
  const { usuario, actualizar, eliminarCuenta } = usePerfil();
  const [form, setForm] = useState({
    nombre: '',
    usuario: '',
    password: '',
  });

  const [hoverEliminar, setHoverEliminar] = useState(false);

  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre || '',
        usuario: usuario.usuario || '',
        password: '',
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, ...rest } = form;
    const datosAEnviar = password ? form : rest;
    await actualizar(datosAEnviar);
    alert('Perfil actualizado');
  };

  const handleEliminar = async () => {
    const confirmar = confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (!confirmar) return;
    await eliminarCuenta();
    alert('Cuenta eliminada correctamente');
    signOut();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block font-medium">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Usuario</label>
        <input
          type="text"
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Contraseña (opcional)</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          type="button"
          onClick={handleEliminar}
          onMouseEnter={() => setHoverEliminar(true)}
          onMouseLeave={() => setHoverEliminar(false)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {hoverEliminar ? '⚠️ Esto eliminará tu cuenta' : 'Eliminar mi cuenta'}
        </button>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Guardar cambios
        </button>
      </div>
    </form>
  );
}
