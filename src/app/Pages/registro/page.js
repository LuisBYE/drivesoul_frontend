"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MenuSimple from '../../component/Pages/MenuSimple';
import ReqUsuarios from "../../component/AxiosResquestAll/RequestsUsuarios";
import './css_REGISTRO_LOGG.css';

export default function Registro() {
  const router = useRouter();
  const [isLoginView, setIsLoginView] = useState(false);
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellido: '',
    Email: '',
    Telefono: '',
    Ciudad: '',
    password: '',
    rol:''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginView) {
      setMessage('Esta función no está implementada aún');
      alert(`Iniciar sesión aún no está disponible`);
    } else {
      alert(`Registrando usuario: ${JSON.stringify(formData)}`);

      // Llamada a la API correctamente con await
      const result = await ReqUsuarios.postUsuarios(formData);

      if (result) {
        alert(`Usuario Creado Correctamente: ${JSON.stringify(result)}`);

        setTimeout(() => {
          alert(`Redirigiendo a la página principal`);
          router.push('/');
        }, 1000);
      } else {
        alert(`Error al crear usuario.`);
      }
    }
  };

  return (
    <>
      <MenuSimple />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-tabs">
            <button className={!isLoginView ? 'active' : ''} onClick={() => setIsLoginView(false)}>
              Registro
            </button>
            <button className={isLoginView ? 'active' : ''} onClick={() => setIsLoginView(true)}>
              Iniciar Sesión
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <input type="text" name="Nombre" placeholder="Nombre de usuario" value={formData.Nombre} onChange={handleChange} />
            <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
            <input type="text" name="Apellido" placeholder="Apellido de usuario" value={formData.Apellido} onChange={handleChange} />
            <input type="text" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} />
            <input type="text" name="Telefono" placeholder="Telefono" value={formData.Telefono} onChange={handleChange} />
            <input type="text" name="Ciudad" placeholder="Ciudad" value={formData.Ciudad} onChange={handleChange} />

            <button type="submit">{isLoginView ? 'Iniciar Sesión' : 'Registrarse'}</button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
        <pre> Datos ingresados: {JSON.stringify(formData, null, 2)} </pre>
      </div>
    </>
  );
}
