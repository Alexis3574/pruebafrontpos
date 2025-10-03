'use client';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }) {
  const [modoGrises, setModoGrises] = useState(false);
  const [modoContraste, setModoContraste] = useState(false);

  useEffect(() => {
  
    setModoGrises(localStorage.getItem('modoGrises') === 'true');
    setModoContraste(localStorage.getItem('modoContraste') === 'true');


    window.addEventListener('modoGrisesChange', (e) =>
      setModoGrises(e.detail)
    );
    window.addEventListener('modoContrasteChange', (e) =>
      setModoContraste(e.detail)
    );

    return () => {
      window.removeEventListener('modoGrisesChange', () => {});
      window.removeEventListener('modoContrasteChange', () => {});
    };
  }, []);

  return (
    <html lang="es">
      <body
        className={`${modoGrises ? 'grayscale' : ''} ${
          modoContraste ? 'contrast' : ''
        } bg-white text-gray-800`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
