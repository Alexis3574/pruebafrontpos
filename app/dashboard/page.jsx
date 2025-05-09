'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated !== 'true') {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    document.cookie = 'authenticated=; Max-Age=0; path=/;';
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Panel de Administración | POS-ITIZ</title>
        <meta name="description" content="Administra tu negocio desde aquí." />
      </Head>

      <div className="flex flex-col min-h-screen">

        <main className="flex-grow p-6 bg-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Cerrar Sesión
            </button>
          </div>

          <p>Desde aquí podrás gestionar ventas, productos, inventario y más.</p>
        </main>

      </div>
    </>
  );
}
