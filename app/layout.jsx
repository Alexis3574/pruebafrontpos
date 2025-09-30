'use client';

import './globals.css';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
   <body className="bg-white text-gray-800">        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
