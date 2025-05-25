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
    ConfirmPassword: '',
    Apellido: '',
    Email: '',
    Telefono: '',
    Ciudad: '',
    Rol: ''
  });
  
  // Estado para validación de contraseña
  const [passwordMatch, setPasswordMatch] = useState(true);

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
      const updatedData = {
        ...formData,
        [name]: value
      };
      
      setFormData(updatedData);
      
      // Validar coincidencia de contraseñas
      if (name === 'Password' || name === 'ConfirmPassword') {
        const password = name === 'Password' ? value : formData.Password;
        const confirmPassword = name === 'ConfirmPassword' ? value : formData.ConfirmPassword;
        
        if (password && confirmPassword) {
          setPasswordMatch(password === confirmPassword);
        }
      }
    }
  };

  // ENVÍO DEL FORMULARIO - LOGIN O REGISTRO
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    // Validar coincidencia de contraseñas en registro
    if (!isLoginView && formData.Password !== formData.ConfirmPassword) {
      setMessage('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    if (isLoginView) {
      // PROCESO DE LOGIN
      const result = await ReqUsuarios.getLoginUser(paramsLogin);
      
      if (result) {
        console.log('Datos del usuario:', result);
        // GUARDAR USUARIO EN LOCALSTORAGE (SERIAN COMO LAS COOKIES  )
        localStorage.setItem('user', JSON.stringify(result));
        
        // Disparar evento personalizado de login
        const loginEvent = new Event('login');
        window.dispatchEvent(loginEvent);
        console.log('Evento de login disparado');
        
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
        console.log('Usuario registrado:', result);
        // Guardamos el usuario en localStorage inmediatamente después del registro
        localStorage.setItem('user', JSON.stringify(result));
        
        // Disparar evento personalizado de login
        const loginEvent = new Event('login');
        window.dispatchEvent(loginEvent);
        console.log('Evento de login disparado');
        
        setMessage('Usuario creado correctamente');
        setTimeout(() => router.push('/'), 1000);
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
        {/* Efecto de luz radial */}
        <div className="auth-light-effect"></div>
        
        {/* Fondo con degradado */}
        <div className="auth-car-image"></div>
        
        <div className="auth-layout">
          {/* Columna izquierda con imagen */}
          <div className="auth-image-column">
            {/* Efecto de brillo */}
            <div className="auth-image-glow"></div>
            
            {/* Imagen del coche */}
            <img src="/FOTOS/REGISTRO,INCIO.png" alt="Coche premium" />
            
            {/* Título y descripción */}
            <div className="auth-car-content">
              <h2>DRIVE<span>SOUL</span></h2>
              <p>Tu experiencia premium en la búsqueda del vehículo perfecto.</p>
            </div>
          </div>
          
          {/* Columna derecha con formulario */}
          <div className="auth-form-column">
            <div className="auth-card">
              {/* Título de la página */}
              <h1 className="auth-title">
                {isLoginView ? 'Bienvenido de nuevo a ' : 'Regístrate en '}
                <span>DRIVESOUL</span>
              </h1>
              <p className="auth-subtitle">
                {isLoginView ? 'Accede a tu cuenta para continuar' : 'Crea tu cuenta para disfrutar de todas las ventajas'}
              </p>
              
              {/* BOTONES PARA CAMBIAR ENTRE REGISTRO Y LOGIN */}
              <div className={`auth-tabs ${isLoginView ? 'login-active' : ''}`}>
                <button 
                  className={!isLoginView ? 'active' : ''} 
                  onClick={() => setIsLoginView(false)}
                >
                  REGISTRO
                </button>
                <button 
                  className={isLoginView ? 'active' : ''} 
                  onClick={() => setIsLoginView(true)}
                >
                  INICIAR SESIÓN
                </button>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                {/* FORMULARIO DE LOGIN */}
                {isLoginView ? (
                  <>
                    <div className="input-group">
                      <div className="input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input 
                        type="text" 
                        name="Identificador" 
                        placeholder="Nombre de usuario o Email" 
                        value={paramsLogin.Identificador} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className="input-group">
                      <div className="input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input 
                        type="password" 
                        name="Password" 
                        placeholder="Contraseña" 
                        value={paramsLogin.Password} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className="checkbox-group">
                      <div className="checkbox-container">
                        <input type="checkbox" id="remember" name="remember" />
                        <label htmlFor="remember">Recordar mis datos</label>
                      </div>
                    </div>
                  </>
                ) : (
                  /* FORMULARIO DE REGISTRO */
                  <>
                    <div className="form-grid">
                      {/* Primera fila: Nombre y Apellido */}
                      <div className="input-group">
                        <div className="input-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input 
                          type="text" 
                          name="Nombre" 
                          placeholder="Nombre de usuario" 
                          value={formData.Nombre} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                      
                      <div className="input-group">
                        <div className="input-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                        </div>
                        <input 
                          type="text" 
                          name="Apellido" 
                          placeholder="Apellido de usuario" 
                          value={formData.Apellido} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                      
                      {/* Segunda fila: Contraseña y Confirmación */}
                      <div className="input-group">
                        <div className="input-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input 
                          type="password" 
                          name="Password" 
                          placeholder="Contraseña" 
                          value={formData.Password} 
                          onChange={handleChange} 
                          required 
                          className={formData.ConfirmPassword && !passwordMatch ? 'border-red-500' : ''}
                        />
                      </div>
                      
                      <div className="input-group">
                        <div className="input-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input 
                          type="password" 
                          name="ConfirmPassword" 
                          placeholder="Confirmar contraseña" 
                          value={formData.ConfirmPassword} 
                          onChange={handleChange} 
                          required 
                          className={formData.ConfirmPassword && !passwordMatch ? 'border-red-500' : ''}
                        />
                      </div>
                      
                      {/* Mensaje de error para contraseñas */}
                      {formData.ConfirmPassword && !passwordMatch && (
                        <div className="input-group full-width error-message">
                          <p className="text-red-500 text-sm">Las contraseñas no coinciden</p>
                        </div>
                      )}
                      
                      {/* Tercera fila: Email y Teléfono */}
                      <div className="input-group">
                        <div className="input-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <input 
                          type="email" 
                          name="Email" 
                          placeholder="Email" 
                          value={formData.Email} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                      
                      <div className="input-group">
                        <div className="input-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <input 
                          type="tel" 
                          name="Telefono" 
                          placeholder="Teléfono" 
                          value={formData.Telefono} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                      
                      {/* Cuarta fila: Ciudad */}
                      <div className="input-group full-width">
                        <div className="input-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input 
                          type="text" 
                          name="Ciudad" 
                          placeholder="Ciudad" 
                          value={formData.Ciudad} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* BOTÓN DE ENVÍO CON ESTADO DE CARGA */}
                <button type="submit" disabled={isLoading} className="submit-button">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : isLoginView ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      INICIAR SESIÓN
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                      REGISTRARSE
                    </>
                  )}
                </button>
              </form>

              {/* MENSAJES DE FEEDBACK AL USUARIO */}
              {message && <p className="message">{message}</p>}
              
              {/* Enlaces adicionales */}
              <div className="auth-links">
                {isLoginView ? (
                  <p>¿No tienes una cuenta? <a href="#" onClick={() => setIsLoginView(false)}>Regístrate ahora</a></p>
                ) : (
                  <p>¿Ya tienes una cuenta? <a href="#" onClick={() => setIsLoginView(true)}>Inicia sesión</a></p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
