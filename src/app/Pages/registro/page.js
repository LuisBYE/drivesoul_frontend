"use client";
import React, { useState } from 'react';

export default function Registro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', username, 'Email:', email, 'Teléfono:', phone, 'Contraseña:', password);
  };

  return (
    <>
      <div className="container">
        <div className="registro-card">
          <h1>Registro de Usuario</h1>
          <form onSubmit={handleSubmit} className="registro-form">
            <label>Nombre de usuario:</label>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email:</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Número de teléfono:</label>
            <input
              type="tel"
              placeholder="Número de teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Contraseña:</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>

      {/* Estilo moderno con CSS */}
      <style jsx>{`
        
        :global(body) {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
        }
          .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .registro-card {
          background-color: #1e1e1e;
          border-radius: 15px;
          padding: 40px 30px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
          width: 400px;
          color: #f5f5f5;
          border: 1px solid #007bff;
        }

        .registro-card h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #007bff;
        }

        .registro-form {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-top: 10px;
          font-weight: bold;
        }

        input {
          padding: 10px;
          margin-top: 5px;
          border: none;
          border-radius: 8px;
          background-color: #333;
          color: #fff;
          outline: none;
        }

        input::placeholder {
          color: #888;
        }

        button {
          margin-top: 20px;
          padding: 12px;
          border-radius: 8px;
          background-color: #007bff;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </>
  );
}
