'use client';
import { usePerfil } from '../../hooks/usePerfil';
import Form from './Form';

export default function PerfilPage() {
  const { usuario, actualizar, loading, error } = usePerfil();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">Mi Perfil</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-gray-500 mb-4">Cargando...</p>}

      {usuario ? (
        <Form usuario={usuario} onSave={actualizar} />
      ) : (
        <p className="text-gray-500">Cargando perfil...</p>
      )}
    </div>
  );
}
