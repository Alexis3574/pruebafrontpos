// hooks/useFetch.js
import { useState, useEffect } from 'react';

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => (isMounted = false);
  }, [url]);

  return { data, loading, error };
}

// hooks/useMutate.js
export async function postData(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function putData(url, data) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteData(url) {
  const res = await fetch(url, {
    method: 'DELETE',
  });
  return res.json();
}

// hooks por entidad
import useFetch from './usefetch';

export const useUsuarios = () => useFetch('/api/usuarios');
export const useProductos = () => useFetch('/api/productos');
export const useVentas = () => useFetch('/api/ventas');
export const useInventario = () => useFetch('/api/inventario');
export const useProveedores = () => useFetch('/api/proveedores');
export const useReportes = () => useFetch('/api/reportes');
export const useFacturacion = () => useFetch('/api/facturacion');
export const useConfiguracion = () => useFetch('/api/configuracion');
export const usePerfil = () => useFetch('/api/perfil');
