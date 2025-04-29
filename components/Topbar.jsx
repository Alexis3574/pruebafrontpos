'use client';

import { useRouter } from 'next/navigation';

export default function Topbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    document.cookie = 'authenticated=false; path=/;';
    router.push('/login');
  };

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">Panel de Administración</h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
