"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MenuSimple from '../../component/Pages/MenuSimple';
import loginService from '../../component/Pages/login';
import './css_REGISTRO_LOGG.css';

// http://localhost:3000/Pages/registro
export default function Registro() {
  const router = useRouter();
  const [isLoginView, setIsLoginView] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLoginView) {
      const result = loginService.login(formData.username, formData.password);
      setMessage(result.message);
      if (result.success) {
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }
    } else {
      setMessage('Registro no implementado aún');
    }
  };

  return (
    <>
      <MenuSimple />
      <div className="auth-container">
        <div className="auth-card">
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
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleChange}
            />
            
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
            />

            <button type="submit">
              {isLoginView ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </>
  );
}
