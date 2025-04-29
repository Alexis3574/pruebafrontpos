'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeaderView from '@/components/HeaderView';
import Footer from '@/components/Footer';

const productos = ['Leche', 'Queso', 'Yogurt', 'Carne'];

export default function Inventario() {
  const router = useRouter();
  const [movimientos, setMovimientos] = useState([]);
  const [producto, setProducto] = useState('');
  const [tipo, setTipo] = useState('entrada');
  const [cantidad, setCantidad] = useState(1);
  const [observacion, setObservacion] = useState('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated !== 'true') router.push('/login');
  }, []);

  const registrarMovimiento = () => {
    if (!producto || cantidad < 1) return alert('Completa todos los campos correctamente');

    const nuevoMovimiento = {
      id: movimientos.length + 1,
      fecha: new Date().toISOString().split('T')[0],
      tipo,
      producto,
      cantidad,
      observacion,
    };

    setMovimientos([nuevoMovimiento, ...movimientos]);
    setProducto('');
    setCantidad(1);
    setObservacion('');
    alert('Movimiento registrado');
  };

  return (
    <>
      <Head>
        <title>Inventario | Panel de Administración</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <HeaderView />

        <main className="flex-grow px-6 py-8 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6">Control de Inventario</h1>

          {/* Ajuste manual */}
          <div className="bg-white p-4 rounded-xl shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Ajuste Manual</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
              </select>

              <select
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option value="">Seleccionar producto</option>
                {productos.map((p, idx) => (
                  <option key={idx} value={p}>{p}</option>
                ))}
              </select>

              <input
                type="number"
                min={1}
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
                className="border px-3 py-2 rounded w-24"
                placeholder="Cantidad"
              />

              <input
                type="text"
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                className="border px-3 py-2 rounded flex-1"
                placeholder="Observación"
              />

              <button
                onClick={registrarMovimiento}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Registrar Movimiento
              </button>
            </div>
          </div>

          {/* Tabla de movimientos */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Historial de Movimientos</h2>
            <table className="w-full table-auto">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Fecha</th>
                  <th className="px-4 py-2 text-left">Tipo</th>
                  <th className="px-4 py-2 text-left">Producto</th>
                  <th className="px-4 py-2 text-left">Cantidad</th>
                  <th className="px-4 py-2 text-left">Observación</th>
                </tr>
              </thead>
              <tbody>
                {movimientos.map((mov, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{mov.fecha}</td>
                    <td className={`px-4 py-2 font-medium ${mov.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                      {mov.tipo}
                    </td>
                    <td className="px-4 py-2">{mov.producto}</td>
                    <td className="px-4 py-2">{mov.cantidad}</td>
                    <td className="px-4 py-2">{mov.observacion}</td>
                  </tr>
                ))}
                {movimientos.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                      No hay movimientos registrados aún.
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
