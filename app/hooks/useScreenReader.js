'use client';
import { useEffect } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function useScreenReaderAutoFocus() {
  const { enabled, announce } = useAccessibility();

  useEffect(() => {
    if (!enabled) return;

    const describe = (el) => {
      if (!el) return '';
      const dsr = el.getAttribute?.('data-sr');
      if (dsr) return dsr;

      const aria = el.getAttribute?.('aria-label');
      if (aria) return aria;

      const labelledby = el.getAttribute?.('aria-labelledby');
      if (labelledby) {
        const lab = document.getElementById(labelledby);
        if (lab?.textContent) return lab.textContent.trim();
      }

      const ph = el.getAttribute?.('placeholder');
      if (ph) return ph;

      const text = (el.textContent || '').trim();
      if (text) return text;

      const role = el.getAttribute?.('role') || el.tagName?.toLowerCase();
      return role ? `Elemento ${role}` : 'Elemento';
    };

    const onFocus = (e) => {
      const el = e.target;
      const label = describe(el);
      const role = el.getAttribute?.('role') || el.tagName?.toLowerCase();
      const state = el.getAttribute?.('aria-pressed') === 'true' ? 'presionado' : '';
      const msg = [label, role, state].filter(Boolean).join(', ');
      announce(msg);
    };

    document.addEventListener('focusin', onFocus);
    return () => document.removeEventListener('focusin', onFocus);
  }, [enabled, announce]);
}
