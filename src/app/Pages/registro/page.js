"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavegadorMenu from '../../component/Pages/Menu/Navegador';
import ReqUsuarios from "../../component/AxiosResquestAll/RequestsUsuarios";
import './css_REGISTRO_LOGG.css';

export default function Registro() {
  const router = useRouter();
  // Mensaje de Resgistro o loginService
  const [message, setMessage] = useState('Mensajes de Registro o Login');

  const [isLoginView, setIsLoginView] = useState(false);

  const [paramsLogin, setParamsLogin] = useState(
    {
      Nombre: '',
      Password: ''
    }
  );
  const [formData, setFormData] = useState(
    {
      ...paramsLogin,
      Apellido: '',
      Email: '',
      Telefono: '',
      Ciudad: '',
      Rol: ''
    }
  );



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setParamsLogin({
      ...paramsLogin,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginView) {

      const result = await ReqUsuarios.getLoginUser(paramsLogin);
 
      if (result) {
        alert("Login ok")
        setMessage('Usuario logueado correctamente');
      }else{
        alert("Login no")
        setMessage('Usuario o contraseña incorrectos');
      }
    } else {
      // Llamada a la API correctamente con await
      const result = await ReqUsuarios.postUsuarios(formData);

      if (result) {
        setMessage(`Usuario Creado Correctamente: ${JSON.stringify(result)}`);
     
      } else {
        setMessage(`Error al crear usuario.`);
      }
    }
  };

  return (
    <>
      <NavegadorMenu />
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
            <input type="password" name="Password" placeholder="Contraseña" value={formData.Password} onChange={handleChange} />
            {isLoginView === false ?
              <>
                <input type="text" name="Apellido" placeholder="Apellido de usuario" value={formData.Apellido} onChange={handleChange} />
                <input type="text" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} />
                <input type="text" name="Telefono" placeholder="Telefono" value={formData.Telefono} onChange={handleChange} />
                <input type="text" name="Ciudad" placeholder="Ciudad" value={formData.Ciudad} onChange={handleChange} />
              </>
              : ""}

            <button type="submit">{isLoginView ? 'Iniciar Sesión' : 'Registrarse'}</button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
       
      
      </div>
    </>
  );
}
