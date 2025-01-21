'use client'

import React, { useState } from 'react';
import './Login.css'; // Importa el CSS
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importa Font Awesome
import Link from 'next/link'; // Importa el componente Link de Next.js

const Login: React.FC = () => {
  // Estado para controlar si se muestra el formulario de registro o inicio de sesión
  const [isSignUp, setIsSignUp] = useState(false);

  // Función para alternar entre registro e inicio de sesión
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form>
          <h1>Crea tu cuenta</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fab fa-github"></i></a>
            <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>o usa tu correo electrónico</span>
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Correo" required />
          <input type="password" placeholder="Contraseña" required />
          <Link href="/admin">
            <button type="submit" >Registrate</button>
          </Link>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Inicia Sesión</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fab fa-github"></i></a>
            <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>o utliza tu correo electrónico para iniciar sesión</span>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <a href="#" className='Forget'>Olvidaste tu contraseña?</a>
          <Link href="/admin">
            <button type="submit">Iniciar</button>
          </Link>

        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Ya tienes cuenta?</h1>
            <p>Inicia sesion para comenzar </p>
            <br />
            <div className="w-32 h-32 relative flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl animate-pulse"
              ></div>

              <div className="w-full h-full relative flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin blur-sm"
                ></div>

                <div
                  className="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden"
                >
                  <div className="flex gap-1 items-center">
                    <div
                      className="w-1.5 h-12 bg-cyan-500 rounded-full animate-[bounce_1s_ease-in-out_infinite]"
                    ></div>
                    <div
                      className="w-1.5 h-12 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.1s]"
                    ></div>
                    <div
                      className="w-1.5 h-12 bg-indigo-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.2s]"
                    ></div>
                    <div
                      className="w-1.5 h-12 bg-purple-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.3s]"
                    ></div>
                  </div>

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse"
                  ></div>
                </div>
              </div>

              <div
                className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"
              ></div>
              <div
                className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-100"
              ></div>
              <div
                className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-500 rounded-full animate-ping delay-200"
              ></div>
              <div
                className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300"
              ></div>
            </div>
            <br />
            <button onClick={toggleForm}>iniciar sesion</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Aun no tienes cuenta?</h1>
            <p>Estas a un click de formar parte de nuestra comunidad</p>
            <br />
            <div className="w-32 h-32 relative flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl animate-pulse"
              ></div>

              <div className="w-full h-full relative flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin blur-sm"
                ></div>

                <div
                  className="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden"
                >
                  <div className="flex gap-1 items-center">
                    <div
                      className="w-1.5 h-12 bg-cyan-500 rounded-full animate-[bounce_1s_ease-in-out_infinite]"
                    ></div>
                    <div
                      className="w-1.5 h-12 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.1s]"
                    ></div>
                    <div
                      className="w-1.5 h-12 bg-indigo-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.2s]"
                    ></div>
                    <div
                      className="w-1.5 h-12 bg-purple-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.3s]"
                    ></div>
                  </div>

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse"
                  ></div>
                </div>
              </div>

              <div
                className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"
              ></div>
              <div
                className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-100"
              ></div>
              <div
                className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-500 rounded-full animate-ping delay-200"
              ></div>
              <div
                className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300"
              ></div>
            </div>
            <br />

            <button onClick={toggleForm}>Crear cuenta</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;