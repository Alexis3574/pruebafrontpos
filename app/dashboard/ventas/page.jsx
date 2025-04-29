'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ventasDummy = [
  {
    id: 1,
    fecha: '2025-04-27',
    total: 45.0,
    metodo: 'Efectivo',
    detalle: [
      { nombre: 'Leche', cantidad: 2, precio: 10 },
      { nombre: 'Queso', cantidad: 1, precio: 25 },
    ],
  },
];

const productos = [
  { id: 1, nombre: 'Leche', precio: 10 },
  { id: 2, nombre: 'Queso', precio: 25 },
  { id: 3, nombre: 'Pan', precio: 5 },
];

export default function Ventas() {
  const router = useRouter();
  const [ventas, setVentas] = useState(ventasDummy);
  const [seleccionados, setSeleccionados] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated !== 'true') router.push('/login');
  }, []);

  const agregarProducto = () => {
    const producto = productos.find((p) => p.id === parseInt(productoId));
    if (!producto) return;

    setSeleccionados([...seleccionados, { ...producto, cantidad }]);
    setProductoId('');
    setCantidad(1);
  };

  const totalVenta = seleccionados.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const registrarVenta = () => {
    const nuevaVenta = {
      id: ventas.length + 1,
      fecha: new Date().toISOString().split('T')[0],
      total: totalVenta,
      metodo: 'Efectivo',
      detalle: seleccionados,
    };
    setVentas([nuevaVenta, ...ventas]);
    setSeleccionados([]);
    alert('Venta registrada correctamente.');
  };

  const imprimirTicket = (venta) => {
    window.print(); // Simplificación para simular impresión
  };

  return (
    <>
      <Head>
        <title>Ventas | Panel de Administración</title>
      </Head>

      <div className="flex flex-col min-h-screen">

        <main className="flex-grow px-6 py-8 bg-gray-100 text-black">
          <h1 className="text-3xl font-bold mb-6">Registro de Ventas</h1>

          {/* Registro Rápido */}
          <div className="bg-white p-4 rounded-xl shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Nueva Venta (modo rápido)</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              <select
                value={productoId}
                onChange={(e) => setProductoId(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option value="">Seleccionar producto</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} - ${p.precio}
                  </option>
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
              <button
                onClick={agregarProducto}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Agregar
              </button>
            </div>

            {/* Lista productos seleccionados */}
            {seleccionados.length > 0 && (
              <div className="mb-4">
                <ul className="list-disc ml-6 text-gray-700">
                  {seleccionados.map((item, idx) => (
                    <li key={idx}>
                      {item.nombre} x {item.cantidad} = ${item.precio * item.cantidad}
                    </li>
                  ))}
                </ul>
                <p className="font-semibold mt-2">Total: ${totalVenta.toFixed(2)}</p>
              </div>
            )}

            {seleccionados.length > 0 && (
              <button
                onClick={registrarVenta}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Registrar Venta
              </button>
            )}
          </div>

          {/* Tabla de Ventas */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4 text-black">Historial de Ventas</h2>
            <table className="w-full table-auto">
              <thead className="bg-indigo-600 text-white text-black">
                <tr>
                  <th className="px-4 py-2 text-left">Fecha</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Método</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((venta) => (
                  <tr key={venta.id} className="hover:bg-gray-50 text-black">
                    <td className="px-4 py-2">{venta.fecha}</td>
                    <td className="px-4 py-2">${venta.total.toFixed(2)}</td>
                    <td className="px-4 py-2">{venta.metodo}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => alert(JSON.stringify(venta.detalle, null, 2))}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        Ver Detalle
                      </button>
                      <button
                        onClick={() => imprimirTicket(venta)}
                        className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800"
                      >
                        Imprimir
                      </button>
                    </td>
                  </tr>
                ))}
                {ventas.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-4 text-center text-black">
                      No se han registrado ventas.
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
