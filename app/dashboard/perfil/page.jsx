import React from 'react';
import { useHistory } from 'react-router-dom'; // Si estás usando React Router para la navegación

const ProfilePage = () => {
  const history = useHistory(); // Para redirigir al usuario si es necesario
  const user = { // Aquí debes reemplazarlo con la información real del usuario
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    avatar: 'https://via.placeholder.com/150', // Reemplazar con la URL del avatar del usuario
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión (eliminando el token, etc.)
    history.push('/login'); // Redirige a la página de inicio de sesión
  };

  const handleChangePassword = () => {
    // Lógica para cambiar la contraseña
    history.push('/change-password'); // Redirige a la página de cambiar contraseña
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <button
          onClick={handleChangePassword}
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Cambiar contraseña
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
