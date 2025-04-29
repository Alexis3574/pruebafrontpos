'use client';

import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const facturas = [
  {
    numero: 'F001-0001',
    cliente: 'Juan Pérez',
    fecha: '2025-04-25',
    total: 150.75,
    metodoPago: 'Efectivo',
  },
  {
    numero: 'F001-0002',
    cliente: 'María Gómez',
    fecha: '2025-04-26',
    total: 299.99,
    metodoPago: 'Tarjeta',
  },
];

export default function Facturacion() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated !== 'true') router.push('/login');
  }, []);

  const imprimirFactura = (numero) => {
    alert(`Simulando impresión de la factura ${numero}`);
  };

  return (
    <>
      <Head>
        <title>Facturación | Panel de Administración</title>
      </Head>

      <div className="flex flex-col min-h-screen">

        <main className="flex-grow px-6 py-8 bg-gray-100 text-black">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Facturación</h1>
            <button
              onClick={() => router.push('/dashboard/facturacion/nueva')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Nueva Factura
            </button>
          </div>

          <div className="overflow-x-auto bg-white shadow rounded-xl p-4">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Número</th>
                  <th className="px-4 py-2">Cliente</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Método de Pago</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {facturas.map((factura) => (
                  <tr key={factura.numero} className="border-t">
                    <td className="px-4 py-2">{factura.numero}</td>
                    <td className="px-4 py-2">{factura.cliente}</td>
                    <td className="px-4 py-2">{factura.fecha}</td>
                    <td className="px-4 py-2">${factura.total.toFixed(2)}</td>
                    <td className="px-4 py-2">{factura.metodoPago}</td>
                    <td className="px-4 py-2">
                      <button
                        className="text-blue-600 mr-2 hover:underline"
                        onClick={() => alert(`Detalles de ${factura.numero}`)}
                      >
                        Ver
                      </button>
                      <button
                        className="text-green-600 hover:underline"
                        onClick={() => imprimirFactura(factura.numero)}
                      >
                        Imprimir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

      </div>
    </>
  );
}
