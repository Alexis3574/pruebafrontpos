'use client';

import Head from 'next/head';
import HeaderView from '../../components/HeaderView';
import Footer from '../../components/Footer';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const dummySales = [
  { day: 'Lun', ventas: 120 },
  { day: 'Mar', ventas: 180 },
  { day: 'Mié', ventas: 90 },
  { day: 'Jue', ventas: 150 },
  { day: 'Vie', ventas: 200 },
  { day: 'Sáb', ventas: 250 },
  { day: 'Dom', ventas: 100 },
];

const dummyTable = [
  { id: 1, tipo: 'Venta', producto: 'Queso', cantidad: 2, fecha: '2025-04-28' },
  { id: 2, tipo: 'Entrada', producto: 'Leche', cantidad: 10, fecha: '2025-04-27' },
  { id: 3, tipo: 'Salida', producto: 'Huevos', cantidad: 5, fecha: '2025-04-27' },
];

export default function Resumen() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated !== 'true') {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Head>
        <title>Resumen | Panel de Administración</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <HeaderView />

        <main className="flex-grow px-6 py-8 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6">Resumen General</h1>

          {/* Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card title="Ventas del Día" value="$1,250" />
            <Card title="Stock Bajo" value="3 productos" warning />
            <Card title="Próximos a Caducar" value="5 productos" />
            <Card title="Más Vendido" value="Yogurt Natural" />
          </div>

          {/* Gráfico */}
          <div className="bg-white p-4 rounded-xl shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Ventas esta semana</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dummySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventas" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tabla */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Últimos movimientos</h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Tipo</th>
                  <th className="px-4 py-2 text-left">Producto</th>
                  <th className="px-4 py-2 text-left">Cantidad</th>
                  <th className="px-4 py-2 text-left">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {dummyTable.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.tipo}</td>
                    <td className="px-4 py-2">{item.producto}</td>
                    <td className="px-4 py-2">{item.cantidad}</td>
                    <td className="px-4 py-2">{item.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

function Card({ title, value, warning = false }) {
  return (
    <div className={`p-4 rounded-xl shadow text-white ${warning ? 'bg-red-500' : 'bg-indigo-600'}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
}
