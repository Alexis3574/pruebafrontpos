'use client';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }) {
  const [modoGrises, setModoGrises] = useState(false);
  const [modoContraste, setModoContraste] = useState(false);
  const [tamanoTexto, setTamanoTexto] = useState(50); // 0-100%

  useEffect(() => {
    // Cargar configuraciones
    setModoGrises(localStorage.getItem('modoGrises') === 'true');
    setModoContraste(localStorage.getItem('modoContraste') === 'true');
    setTamanoTexto(parseInt(localStorage.getItem('tamanoTexto') || '50'));

    // Listeners
    window.addEventListener('modoGrisesChange', (e) => setModoGrises(e.detail));
    window.addEventListener('modoContrasteChange', (e) => setModoContraste(e.detail));
    window.addEventListener('modoTextoChange', (e) => setTamanoTexto(e.detail));

    return () => {
      window.removeEventListener('modoGrisesChange', () => {});
      window.removeEventListener('modoContrasteChange', () => {});
      window.removeEventListener('modoTextoChange', () => {});
    };
  }, []);

  useEffect(() => {
    // Ajustar escala de texto global (0% = 0.8rem, 100% = 1.5rem)
    const escala = 0.8 + (tamanoTexto / 100) * 0.7;
    document.documentElement.style.setProperty('--font-scale', `${escala}rem`);
  }, [tamanoTexto]);

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
