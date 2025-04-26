'use client';

import Head from 'next/head';
import HeaderView from '@/components/HeaderView';
import Footer from '@/components/Footer';

export default function SobreNosotros() {
  return (
    <>
      <Head>
        <title>Sobre Nosotros | SAE-ITIZ</title>
        <meta name="description" content="Conoce nuestra misión, visión y objetivos." />
      </Head>

      <div className="flex flex-col min-h-screen">
        <HeaderView />

        <main className="flex flex-col items-center px-6 py-10 gap-10 flex-grow">
          <h2 className="text-2xl font-bold text-center text-white">Sobre Nosotros</h2>

          <div className="flex flex-col md:flex-row gap-6 max-w-6xl w-full">
            <div className="bg-gray-100 w-full md:w-1/2 h-64 flex items-center justify-center rounded-lg">
              Imagen representativa
            </div>

            <div className="bg-white shadow-lg p-6 rounded-xl w-full md:w-1/2">
              <p className="text-gray-700">
                Somos SAE-ITIZ, una solución tecnológica diseñada para ayudarte a mantener el control total
                de productos frescos en tu negocio. Nuestro enfoque es la eficiencia, la simplicidad y la reducción de pérdidas.
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl w-full space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-black ">Misión</h3>
              <p className="text-gray-700">
                Proveer soluciones tecnológicas para la gestión eficiente de productos perecederos, ayudando a negocios locales a reducir pérdidas.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-black ">Visión</h3>
              <p className="text-gray-700">
                Ser líderes regionales en tecnología para el control de productos frescos y perecederos.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-black">Objetivos</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Ofrecer herramientas intuitivas y efectivas.</li>
                <li>Reducir desperdicios por caducidad.</li>
                <li>Generar reportes útiles y automatizados.</li>
                <li>Apoyar a negocios pequeños con transformación digital.</li>
              </ul>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
