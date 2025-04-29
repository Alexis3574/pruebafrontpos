'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Proveedores() {
  const router = useRouter();

  const [proveedores, setProveedores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [productos, setProductos] = useState('');
  const [modoEditar, setModoEditar] = useState(false);
  const [indiceEdicion, setIndiceEdicion] = useState(null);

  // Verificación de sesión
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated !== 'true') {
      router.push('/login');
    } else {
      const storedProveedores = JSON.parse(localStorage.getItem('proveedores')) || [];
      setProveedores(storedProveedores);
    }
  }, [router]);

  // Guardar en localStorage cada vez que cambia la lista
  useEffect(() => {
    localStorage.setItem('proveedores', JSON.stringify(proveedores));
  }, [proveedores]);

  const agregarProveedor = () => {
    if (!nombre || !contacto || !productos) {
      return alert('Todos los campos son obligatorios');
    }

    const nuevoProveedor = { nombre, contacto, productos };

    if (modoEditar) {
      const actualizados = [...proveedores];
      actualizados[indiceEdicion] = nuevoProveedor;
      setProveedores(actualizados);
      setModoEditar(false);
      setIndiceEdicion(null);
    } else {
      setProveedores([nuevoProveedor, ...proveedores]);
    }

    setNombre('');
    setContacto('');
    setProductos('');
  };

  const editarProveedor = (index) => {
    const proveedor = proveedores[index];
    setNombre(proveedor.nombre);
    setContacto(proveedor.contacto);
    setProductos(proveedor.productos);
    setModoEditar(true);
    setIndiceEdicion(index);
  };

  return (
    <>
      <Head>
        <title>Proveedores | Panel de Administración</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <main className="flex-grow px-6 py-8 bg-gray-100 text-black">
          <h1 className="text-3xl font-bold mb-6">Gestión de Proveedores</h1>

          <div className="bg-white p-4 rounded-xl shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {modoEditar ? 'Editar Proveedor' : 'Agregar Proveedor'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Nombre del proveedor"
                className="border px-3 py-2 rounded"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="text"
                placeholder="Contacto (teléfono o email)"
                className="border px-3 py-2 rounded"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
              />
              <input
                type="text"
                placeholder="Productos que provee"
                className="border px-3 py-2 rounded"
                value={productos}
                onChange={(e) => setProductos(e.target.value)}
              />
            </div>
            <button
              onClick={agregarProveedor}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              {modoEditar ? 'Actualizar' : 'Agregar'}
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Lista de Proveedores</h2>
            <table className="w-full table-auto">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Contacto</th>
                  <th className="px-4 py-2 text-left">Productos</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.length > 0 ? (
                  proveedores.map((prov, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{prov.nombre}</td>
                      <td className="px-4 py-2">{prov.contacto}</td>
                      <td className="px-4 py-2">{prov.productos}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => editarProveedor(index)}
                          className="text-indigo-600 hover:underline"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                      No hay proveedores registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
