import { useEffect, useRef, useState } from "react";

export default function useFolioCheck(serie, folio, delay = 400) {
  const [state, setState] = useState({ checking: false, exists: false, suggestion: null, error: null });
  const t = useRef(null);

  useEffect(() => {
    if (t.current) clearTimeout(t.current);
    if (!folio) { setState({ checking: false, exists: false, suggestion: null, error: null }); return; }

    t.current = setTimeout(async () => {
      try {
        setState(s => ({ ...s, checking: true, error: null }));
        const url = new URL("/api/facturas/exists", window.location.origin);
        url.searchParams.set("folio", folio);
        if (serie) url.searchParams.set("serie", serie);
        const res = await fetch(url);
        const json = await res.json();
        if (!res.ok || json.ok === false) throw new Error(json.error || "Error de verificación");
        setState({ checking: false, exists: json.exists, suggestion: json.suggestion, error: null });
      } catch (e) {
        setState({ checking: false, exists: false, suggestion: null, error: e.message });
      }
    }, delay);

    return () => clearTimeout(t.current);
  }, [serie, folio, delay]);

  return state;
}
