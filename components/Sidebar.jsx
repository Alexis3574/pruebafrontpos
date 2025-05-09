'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Resumen', path: '/dashboard/resumen' },
  { name: 'Ventas', path: '/dashboard/ventas' },
  { name: 'Productos', path: '/dashboard/productos' },
  { name: 'Inventario', path: '/dashboard/inventario' },
  { name: 'Proveedores', path: '/dashboard/proveedores' },
  { name: 'Reportes', path: '/dashboard/reportes' },
  { name: 'Facturación', path: '/dashboard/facturacion' },
  { name: 'Configuración', path: '/dashboard/configuracion' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full p-6 bg-white border-r border-gray-200">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">ITIZ-SAE</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <span
              className={`block px-4 py-2 rounded-lg cursor-pointer font-medium ${
                pathname === item.path
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
