'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderView from '../../components/HeaderView';
import Footer from '../../components/Footer';

const productosDummy = [
  { id: 1, nombre: 'Leche', tipo: 'Animal', compra: 10, venta: 15, stock: 3, caducidad: '2025-05-01' },
  { id: 2, nombre: 'Tomate', tipo: 'Vegetal', compra: 2, venta: 5, stock: 20, caducidad: '2025-04-30' },
  { id: 3, nombre: 'Queso', tipo: 'Derivado', compra: 8, venta: 12, stock: 1, caducidad: '2025-04-29' },
];

export default function Productos() {
  const router = useRouter();
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated !== 'true') router.push('/login');
  }, []);

  const productosFiltrados = productosDummy.filter(p => {
    if (filtro === 'Todos') return true;
    if (filtro === 'Vencimiento') {
      const cad = new Date(p.caducidad);
      const hoy = new Date();
      const dias = (cad - hoy) / (1000 * 60 * 60 * 24);
      return dias <= 5;
    }
    return p.tipo === filtro;
  });

  return (
    <>
      <Head>
        <title>Productos | Panel de Administración</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <HeaderView />

        <main className="flex-grow px-6 py-8 bg-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Gestión de Productos</h1>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              + Agregar Producto
            </button>
          </div>

          <div className="mb-4 flex gap-4">
            <select
              onChange={(e) => setFiltro(e.target.value)}
              value={filtro}
              className="border px-3 py-2 rounded"
            >
              <option value="Todos">Todos</option>
              <option value="Animal">Animal</option>
              <option value="Vegetal">Vegetal</option>
              <option value="Derivado">Derivado</option>
              <option value="Vencimiento">Por Vencer</option>
            </select>
          </div>

          <div className="overflow-x-auto bg-white shadow rounded-xl">
            <table className="w-full table-auto">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Tipo</th>
                  <th className="px-4 py-2 text-left">Compra</th>
                  <th className="px-4 py-2 text-left">Venta</th>
                  <th className="px-4 py-2 text-left">Stock</th>
                  <th className="px-4 py-2 text-left">Caducidad</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((producto) => (
                  <tr
                    key={producto.id}
                    className={producto.stock < 5 ? 'bg-red-100' : 'hover:bg-gray-50'}
                  >
                    <td className="px-4 py-2">{producto.nombre}</td>
                    <td className="px-4 py-2">{producto.tipo}</td>
                    <td className="px-4 py-2">${producto.compra}</td>
                    <td className="px-4 py-2">${producto.venta}</td>
                    <td className="px-4 py-2">{producto.stock}</td>
                    <td className="px-4 py-2">{producto.caducidad}</td>
                    <td className="px-4 py-2">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
                        Editar
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {productosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                      No hay productos en esta categoría.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
