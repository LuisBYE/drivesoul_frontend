"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavegadorMenu from '../../component/Pages/Menu/Navegador';
import ReqUsuarios from "../../component/AxiosResquestAll/RequestsUsuarios";
import './css_REGISTRO_LOGG.css';

export default function Registro() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginView, setIsLoginView] = useState(false);

  // ESTADO PARA LOGIN CON USUARIO O EMAIL
  const [paramsLogin, setParamsLogin] = useState({
    Identificador: '',
    Password: ''
  });

  // DATOS DEL FORMULARIO DE REGISTRO
  const [formData, setFormData] = useState({
    Nombre: '',
    Password: '',
    Apellido: '',
    Email: '',
    Telefono: '',
    Ciudad: '',
    Rol: ''
  });

  // MANEJO DE CAMBIOS EN LOS CAMPOS DEL FORMULARIO
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (isLoginView) {
      // ACTUALIZAR ESTADO DE LOGIN
      setParamsLogin({
        ...paramsLogin,
        [name]: value
      });
    } else {
      // ACTUALIZAR ESTADO DE REGISTRO
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // ENVÍO DEL FORMULARIO - LOGIN O REGISTRO
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (isLoginView) {
      // PROCESO DE LOGIN
      const result = await ReqUsuarios.getLoginUser(paramsLogin);
      
      if (result) {
        // GUARDAR USUARIO EN LOCALSTORAGE (SERIAN COMO LAS COOKIES  )
        localStorage.setItem('user', JSON.stringify(result));
        setMessage('Usuario logueado correctamente');
        
        // REDIRECCIONAR A INICIO
        setTimeout(() => router.push('/'), 1000);
      } else {
        setMessage('Usuario/Email o contraseña incorrectos');
      }
    } else {
      // REGISTRO DE USUARIO
      const result = await ReqUsuarios.postUsuarios(formData);
      
      if (result) {
        setMessage('Usuario creado correctamente');
        setTimeout(() => setIsLoginView(true), 1000);
      } else {
        setMessage('Error al crear usuario');
      }
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <NavegadorMenu />
      <div className="auth-container">
        <div className="auth-card">
          {/* BOTONES PARA CAMBIAR ENTRE REGISTRO Y LOGIN */}
          <div className="auth-tabs">
            <button 
              className={!isLoginView ? 'active' : ''} 
              onClick={() => setIsLoginView(false)}
            >
              Registro
            </button>
            <button 
              className={isLoginView ? 'active' : ''} 
              onClick={() => setIsLoginView(true)}
            >
              Iniciar Sesión
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* FORMULARIO DE LOGIN */}
            {isLoginView ? (
              <>
                <input 
                  type="text" 
                  name="Identificador" 
                  placeholder="Nombre de usuario o Email" 
                  value={paramsLogin.Identificador} 
                  onChange={handleChange} 
                  required 
                />
                <input 
                  type="password" 
                  name="Password" 
                  placeholder="Contraseña" 
                  value={paramsLogin.Password} 
                  onChange={handleChange} 
                  required 
                />
              </>
            ) : (
              /* FORMULARIO DE REGISTRO */
              <>
                <input 
                  type="text" 
                  name="Nombre" 
                  placeholder="Nombre de usuario" 
                  value={formData.Nombre} 
                  onChange={handleChange} 
                  required 
                />
                <input 
                  type="password" 
                  name="Password" 
                  placeholder="Contraseña" 
                  value={formData.Password} 
                  onChange={handleChange} 
                  required 
                />
                <input 
                  type="text" 
                  name="Apellido" 
                  placeholder="Apellido de usuario" 
                  value={formData.Apellido} 
                  onChange={handleChange} 
                  required 
                />
                <input 
                  type="email" 
                  name="Email" 
                  placeholder="Email" 
                  value={formData.Email} 
                  onChange={handleChange} 
                  required 
                />
                <input 
                  type="tel" 
                  name="Telefono" 
                  placeholder="Telefono" 
                  value={formData.Telefono} 
                  onChange={handleChange} 
                  required 
                />
                <input 
                  type="text" 
                  name="Ciudad" 
                  placeholder="Ciudad" 
                  value={formData.Ciudad} 
                  onChange={handleChange} 
                  required 
                />
              </>
            )}

            {/* BOTÓN DE ENVÍO CON ESTADO DE CARGA */}
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Procesando...' : isLoginView ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </form>

          {/* MENSAJES DE FEEDBACK AL USUARIO */}
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </>
  );
}
