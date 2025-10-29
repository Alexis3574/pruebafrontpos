'use client';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { AccessibilityProvider } from './context/AccessibilityContext';
import useScreenReaderAutoFocus from '../app/hooks/useScreenReader';

function ScreenReaderBoot() {
  useScreenReaderAutoFocus();
  return null;
}

function ChatbotTidio() {
  const pathname = usePathname();
  const enDashboard = pathname && pathname.startsWith('/dashboard');

  if (enDashboard) {
    return (
      <Script
        src="//code.tidio.co/gnsiic9k412fulgjkxdmhyv5cio9boyi.js"
        strategy="afterInteractive"
      />
    );
  }

  return null;
}

export default function RootLayout({ children }) {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [modoGrises, setModoGrises] = useState(false);
  const [modoContraste, setModoContraste] = useState(false);
  const [tamanoTexto, setTamanoTexto] = useState(50);
  const [tipografia, setTipografia] = useState('Inter');

  useEffect(() => {
    setModoOscuro(localStorage.getItem('modoOscuro') === 'true');
    setModoGrises(localStorage.getItem('modoGrises') === 'true');
    setModoContraste(localStorage.getItem('modoContraste') === 'true');
    setTamanoTexto(parseInt(localStorage.getItem('tamanoTexto') || '50'));
    setTipografia(localStorage.getItem('tipografia') || 'Inter');

    window.addEventListener('modoOscuroChange', (e) => setModoOscuro(e.detail));
    window.addEventListener('modoGrisesChange', (e) => setModoGrises(e.detail));
    window.addEventListener('modoContrasteChange', (e) => setModoContraste(e.detail));
    window.addEventListener('modoTextoChange', (e) => setTamanoTexto(e.detail));
    window.addEventListener('tipografiaChange', (e) => setTipografia(e.detail));

    return () => {
      window.removeEventListener('modoOscuroChange', () => {});
      window.removeEventListener('modoGrisesChange', () => {});
      window.removeEventListener('modoContrasteChange', () => {});
      window.removeEventListener('modoTextoChange', () => {});
      window.removeEventListener('tipografiaChange', () => {});
    };
  }, []);

  useEffect(() => {
    if (modoOscuro) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('modoOscuro', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('modoOscuro', 'false');
    }
  }, [modoOscuro]);

  useEffect(() => {
    const escala = 0.8 + (tamanoTexto / 100) * 0.7;
    document.documentElement.style.setProperty('--font-scale', `${escala}rem`);
  }, [tamanoTexto]);

  useEffect(() => {
    if (tipografia) {
      document.documentElement.style.setProperty('--font-base', `'${tipografia}', sans-serif`);
      localStorage.setItem('tipografia', tipografia);
    }
  }, [tipografia]);

  useEffect(() => {
    const guardado = localStorage.getItem('modoOscuro');
    if (guardado === null) {
      const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setModoOscuro(prefiereOscuro);
    }
  }, []);

  return (
    <html lang="es">
      <body
        className={`${modoGrises ? 'grayscale' : ''} ${
          modoContraste ? 'contrast' : ''
        } bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300`}
      >
        <SessionProvider>
          <AccessibilityProvider>
            <ScreenReaderBoot />
            {children}

            <ChatbotTidio />
          </AccessibilityProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
