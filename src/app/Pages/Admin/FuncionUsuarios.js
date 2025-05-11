"use client";
import FuncionesAdminForm from "../../component/Pages/formulario";
import React, { useEffect, useState } from "react";
import ReqUsuarios from "../../component/AxiosResquestAll/RequestsUsuarios";
import CardUsuario from "../../component/Pages/Admin/CardUsuario"; // Asegúrate de que la ruta sea correcta
export default function FomUsuarios() {
  const [optionUsuario, setOptionUsuario] = useState();
  const [usuarios, setUsuarios] = useState();

  const addUser = optionUsuario === "Agregar Usuario" && true;
  const editUser = optionUsuario === "Editar Usuario" && true;
  const verUser = optionUsuario === "Ver Usuarios" && true;

  const agregarUsuarios = async (formData) => {
    const response = await ReqUsuarios.postUsuarios(formData);
    console.log("Respuesta de la API:", response);
    if (response) {
      alert("Usuario agregado correctamente");
    }
  };

  const editarUsuarios = async () => {
    console.log("Función de editar usuario async");
  };

  const listarUsuarios = async () => {
    const usuarios = await ReqUsuarios.getUsuarios();
    setUsuarios(usuarios);
  };

  useEffect(() => {
    listarUsuarios(); // Llamada a la API para listar usuarios
  }, []); // Se ejecuta cada vez que cambia el optionUsuario

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div className="panelFunciones">
          <button
            className="boton_funciones"
            onClick={() => setOptionUsuario("Agregar Usuario")}
          >
            Agregar Usuario
          </button>

          <button
            className="boton_funciones"
            onClick={() => setOptionUsuario("Ver Usuarios")}
          >
            Ver Usuarios
          </button>
        </div>
        <div className="funcionesAdmin">
          <FuncionesAdminForm
            imputValue={[
              "Nombre",
              "Password",
              "Apellido",
              "Email",
              "Telefono",
              "Ciudad",
              "rol",
            ]}
            onSubmit={(data) => agregarUsuarios(data)}
            display={addUser ? "" : "none"}
            titlePage="Agregar Usuario"
          />
          <FuncionesAdminForm
            imputValue={[
              "nombre",
              "apellido",
              "email",
              "telefono",
              "Contraseña",
              "Ciudad",
            ]}
            onClick={() => editarUsuarios()}
            titlePage="Editar Usuario"
            display={editUser ? "" : "none"}
          />
        </div>

        {verUser && <CardUsuario usuarios={usuarios}> </CardUsuario>}
      </div>

      <style jsx>{`
        .panelFunciones {
          background: linear-gradient(
            135deg,
            #4facfe,
            /* Celeste intenso */ rgb(150, 236, 251)
          );
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .boton_funciones {
          padding: 12px 25px;
          font-size: 1.2rem;
          font-weight: bold;
          color: #ffffff;
          background-color: rgb(33, 105, 193); /* Morado suave */
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .boton_funciones:hover {
          background-color: rgb(
            1,
            93,
            197
          ); /* Morado más fuerte al hacer hover */
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .panelFunciones {
            flex-direction: column;
            align-items: center;
          }

          .boton_funciones {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
