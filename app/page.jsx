'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import HeaderView from '../components/HeaderView';
import Footer from '../components/Footer';

export default function Dashboard() {
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
        <title>Panel de Administración | SAE-ITIZ</title>
        <meta name="description" content="Administra tu negocio desde aquí." />
      </Head>

      <div className="flex flex-col min-h-screen">
        <HeaderView />

        <main className="flex-grow p-6 bg-gray-100">
          <h1 className="text-3xl font-bold mb-4">Bienvenido al Panel de Administración</h1>
          <p>Desde aquí podrás gestionar ventas, productos, inventario y más.</p>
        </main>

        <Footer />
      </div>
    </>
  );
}
