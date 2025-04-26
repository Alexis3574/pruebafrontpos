'use client';


export default function HeroCard() {
    return (
      <div className="bg-white shadow-md p-6 rounded-xl w-full md:w-1/2">
        <h2 className="text-2xl font-semibold mb-2 text-black">Productos frescos, control total.</h2>
        <p className="text-black mb-4">Optimiza tu venta, con nuestro sistema fácil y rápido.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Conoce más
        </button>
      </div>
    );
  }
  