'use client';

import Head from 'next/head';
import HeaderView from '../../components/HeaderView';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [view, setView] = useState('login'); // login | register | forgot
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  // Simulación de obtener usuarios de localStorage
  const getUsers = () => {
    if (typeof window !== 'undefined') {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      return users;
    }
    return [];
  };

  const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('authenticated', 'true');
      document.cookie = "authenticated=true; path=/;";
      router.push('/dashboard');
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const users = getUsers();
    const existingUser = users.find(u => u.email === newEmail);

    if (existingUser) {
      alert('Ya existe una cuenta con este correo.');
      return;
    }

    saveUser({ email: newEmail, password: newPassword });
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    setView('login');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (user) {
      alert(`Hemos enviado un enlace de recuperación al correo: ${email}`);
    } else {
      alert('Correo no registrado.');
    }
  };

  return (
    <>
      <Head>
        <title>Iniciar Sesión | SAE-ITIZ</title>
        <meta name="description" content="Accede a tu cuenta para gestionar tu negocio." />
      </Head>

      <div className="flex flex-col min-h-screen">
        <HeaderView />

        <main className="flex flex-col items-center justify-center flex-grow px-6 py-12 bg-gray-50 text-black">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            {view === 'login' && (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Iniciar Sesión</h2>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black">Correo electrónico</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black">Contraseña</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Ingresar
                  </button>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => setView('forgot')}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                    <br />
                    <button
                      type="button"
                      onClick={() => setView('register')}
                      className="text-sm text-gray-600 hover:underline mt-2"
                    >
                      ¿No tienes cuenta? Regístrate
                    </button>
                  </div>
                </form>
              </>
            )}

            {view === 'register' && (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Crear Cuenta</h2>

                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black">Correo electrónico</label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      required
                      className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black">Contraseña</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black">Confirmar Contraseña</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Registrarse
                  </button>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => setView('login')}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Ya tengo cuenta
                    </button>
                  </div>
                </form>
              </>
            )}

            {view === 'forgot' && (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h2>

                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                  >
                    Enviar recuperación
                  </button>

                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => setView('login')}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Volver a Iniciar Sesión
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
