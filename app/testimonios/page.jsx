'use client';

import Head from 'next/head';
import HeaderView from '../../components/HeaderView';
import Footer from '../../components/Footer';
import TestimonialCard from '../../components/cards/TestimonialCard';

const testimonios = [
  {
    nombre: 'Lucía Fernández',
    comentario: 'Desde que usamos SAE-ITIZ, nuestros productos siempre están bien controlados. ¡Nos ha ahorrado mucho tiempo!',
    ubicacion: 'Mercado Central',
  },
  {
    nombre: 'Carlos Méndez',
    comentario: 'El sistema es fácil de usar y muy intuitivo. Los reportes son visuales y rápidos.',
    ubicacion: 'Carnicería El Progreso',
  },
  {
    nombre: 'Rosa López',
    comentario: 'Gracias al control de caducidad hemos reducido pérdidas en un 30%. Excelente herramienta.',
    ubicacion: 'Frutería La Huerta',
  },
];

export default function Testimonios() {
  return (
    <>
      <Head>
        <title>Testimonios | SAE-ITIZ</title>
        <meta name="description" content="Conoce lo que opinan nuestros usuarios." />
      </Head>

      <div className=" bg-white flex flex-col min-h-screen">
        <HeaderView />

        <main className="flex flex-col items-center px-6 py-10 flex-grow">
          <h2 className=" text-black text-2xl font-bold mb-6 text-center">Lo que dicen nuestros clientes</h2>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
            {testimonios.map((t, index) => (
              <TestimonialCard key={index} nombre={t.nombre} comentario={t.comentario} ubicacion={t.ubicacion} />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
