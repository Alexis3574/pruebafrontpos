'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated !== 'true') {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow px-6 py-4">
          <Topbar />
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
