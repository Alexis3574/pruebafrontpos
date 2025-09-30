"use client";
import { useEffect, useState } from "react";

export default function useReporteForm(initial = null) {
  const [id, setId] = useState(initial?.id || null);
  const [tipo, setTipo] = useState(initial?.tipo || "");
  const [contenido, setContenido] = useState(initial?.datos?.contenido || "");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (initial) {
      setId(initial.id || null);
      setTipo(initial.tipo || "");
      setContenido(initial.datos?.contenido || "");
      setTouched(false);
    }
  }, [initial]);

  const errors = [];
  if (!tipo.trim()) errors.push("El campo 'Tipo' es obligatorio.");
  if (!contenido.trim()) errors.push("El 'Contenido' no puede estar vacío.");

  return {
    id,
    tipo,
    contenido,
    setTipo,
    setContenido,
    isValid: errors.length === 0,
    errors,
    touched,
    setTouched,
    reset: () => {
      setId(null);
      setTipo("");
      setContenido("");
      setTouched(false);
    },
    load: (r) => {
      setId(r?.id || null);
      setTipo(r?.tipo || "");
      setContenido(r?.datos?.contenido || "");
      setTouched(false);
    },
  };
}
