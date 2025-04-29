'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderView from '@/components/HeaderView';
import Footer from '@/components/Footer';

export default function Configuracion() {
  const router = useRouter();
  const [datosNegocio, setDatosNegocio] = useState({
    nombre: 'Mi Negocio',
    correo: 'contacto@negocio.com',
    telefono: '555-1234',
  });

  const [parametros, setParametros] = useState({
    stockMinimo: 10,
    notificaciones: true,
  });

  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Admin', correo: 'admin@negocio.com', rol: 'Administrador' },
    { id: 2, nombre: 'María', correo: 'maria@negocio.com', rol: 'Vendedor' },
  ]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated !== 'true') router.push('/login');
  }, []);

  const guardarCambios = () => {
    alert('Cambios guardados correctamente (simulado)');
  };

  return (
    <>
      <Head>
        <title>Configuración | Panel de Administración</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <HeaderView />

        <main className="flex-grow px-6 py-8 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>

          {/* Datos del negocio */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Datos del negocio</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                className="border p-2 rounded"
                placeholder="Nombre del negocio"
                value={datosNegocio.nombre}
                onChange={(e) =>
                  setDatosNegocio({ ...datosNegocio, nombre: e.target.value })
                }
              />
              <input
                type="email"
                className="border p-2 rounded"
                placeholder="Correo electrónico"
                value={datosNegocio.correo}
                onChange={(e) =>
                  setDatosNegocio({ ...datosNegocio, correo: e.target.value })
                }
              />
              <input
                type="text"
                className="border p-2 rounded"
                placeholder="Teléfono"
                value={datosNegocio.telefono}
                onChange={(e) =>
                  setDatosNegocio({ ...datosNegocio, telefono: e.target.value })
                }
              />
            </div>
          </div>

          {/* Parámetros del sistema */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Parámetros del sistema</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Stock mínimo global</label>
                <input
                  type="number"
                  className="border p-2 rounded w-full"
                  value={parametros.stockMinimo}
                  onChange={(e) =>
                    setParametros({ ...parametros, stockMinimo: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notificaciones</label>
                <select
                  className="border p-2 rounded w-full"
                  value={parametros.notificaciones ? 'si' : 'no'}
                  onChange={(e) =>
                    setParametros({ ...parametros, notificaciones: e.target.value === 'si' })
                  }
                >
                  <option value="si">Activadas</option>
                  <option value="no">Desactivadas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Gestión de usuarios */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Gestión de usuarios</h2>
            <table className="min-w-full mb-4">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Correo</th>
                  <th className="px-4 py-2">Rol</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="border-t">
                    <td className="px-4 py-2">{usuario.nombre}</td>
                    <td className="px-4 py-2">{usuario.correo}</td>
                    <td className="px-4 py-2">{usuario.rol}</td>
                    <td className="px-4 py-2">
                      <button
                        className="text-blue-600 hover:underline mr-2"
                        onClick={() => alert(`Editar usuario ${usuario.nombre}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => alert(`Eliminar usuario ${usuario.nombre}`)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => alert('Agregar nuevo usuario (simulado)')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Agregar Usuario
            </button>
          </div>

          <div className="text-right">
            <button
              onClick={guardarCambios}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Guardar Cambios
            </button>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
