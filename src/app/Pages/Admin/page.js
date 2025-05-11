"use client";
import NavegadorPag from "../../component/Pages/Menu/Navegador";
import React, { useEffect, useState } from "react";
import FomUsuarios from "./FuncionUsuarios";
import FormProductos from "./FuncionProductos";

export default function PageAdmin() {
  const [optionUsuario, setOptionUsuario] = useState(false);
  const [optionProducto, setOptionProducto] = useState(false);

  return (
    <>
      <div>
        <NavegadorPag />
        {/* HAY QUE CAMBIAR EL MARGIN TOP EN LA PAGINA PRINCIPAL DE NAVEGADORPAGE */}

        <div className="panelFunciones">
          <h1 style={{ fontSize: "3rem", color: "#333" }}>
            Página de Administración
          </h1>
          <button
            className="boton_funciones"
            onClick={() => {
              setOptionUsuario(true), setOptionProducto(false);
            }}
          >
            {" "}
            Funciones para Usuario{" "}
          </button>
          <button
            className="boton_funciones"
            onClick={() => {
              setOptionUsuario(false), setOptionProducto(true);
            }}
          >
            {" "}
            Funciones para Producto{" "}
          </button>
        </div>
        <div style={{ display: optionUsuario ? "" : "none" }}>
          <FomUsuarios />
        </div>
        <div style={{ display: optionProducto ? "" : "none" }}>
          <FormProductos />
        </div>
      </div>
      <style jsx>{`
        .panelFunciones {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-top: 90px;
          background: linear-gradient(135deg, #e0eafc, #cfdef3);
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra */
        }

        .panelFunciones h1 {
          font-size: 3rem;
          color: #ffffff; /* Texto blanco */
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }

        .boton_funciones {
          background-color: #ffffff; /* Fondo blanco */
          color: rgb(136, 185, 240); /* Texto azul */
          border: 2px solid #4a90e2; /* Borde azul */
          padding: 12px 25px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1.2rem;
          font-weight: bold;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra */
        }

        .boton_funciones:hover {
          background-color: rgb(162, 186, 214); /* Fondo azul */
          color: #ffffff; /* Texto blanco */
          transform: translateY(-2px); /* Efecto de elevación */
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra más intensa */
        }

        @media (max-width: 768px) {
          .panelFunciones {
            padding: 20px;
          }

          .panelFunciones h1 {
            font-size: 2.5rem;
          }

          .boton_funciones {
            font-size: 1rem;
            padding: 10px 20px;
          }
        }
      `}</style>
    </>
  );
}
