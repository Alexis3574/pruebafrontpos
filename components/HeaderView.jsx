
'use client';


import Link from 'next/link';

export default function HeaderView() {
  return (
    <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-black">SAE-ITIZ</h1>
      <nav className="space-x-4">
        <Link className="text-xl font-bold text-black" href="/">Inicio</Link>
        <Link className="text-xl font-bold text-black" href="/sobre-nosotros">Sobre nosotros</Link>
        <Link className="text-xl font-bold text-black" href="/testimonios">Testimonios</Link>
        <Link className="text-xl font-bold text-black" href="/contacto">Contacto</Link>
        <Link className="text-xl font-bold text-black" href="/login">Iniciar sesión</Link>
      </nav>
    </header>
  );
}
