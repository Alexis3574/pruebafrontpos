'use client';

import Head from 'next/head';
import HeaderView from '@/components/HeaderView';
import Footer from '@/components/Footer';

export default function Contacto() {
  return (
    <>
      <Head>
        <title>Contacto | SAE-ITIZ</title>
        <meta name="description" content="Ponte en contacto con nosotros para más información." />
      </Head>

      <div className="flex flex-col min-h-screen">
        <HeaderView />

        <main className="flex flex-col items-center px-6 py-10 flex-grow">
          <h2 className="text-2xl font-bold mb-4 text-center">Contáctanos</h2>
          <p className="text-gray-600 mb-10 text-center max-w-xl">
            ¿Tienes preguntas o deseas saber más sobre nuestros servicios? Completa el siguiente formulario y nos pondremos en contacto contigo.
          </p>

          <form className="bg-white shadow-lg p-6 rounded-xl w-full max-w-xl space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                placeholder="tucorreo@ejemplo.com"
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea
                rows="4"
                placeholder="Escribe tu mensaje aquí..."
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Enviar mensaje
            </button>
          </form>
        </main>

        <Footer />
      </div>
    </>
  );
}
