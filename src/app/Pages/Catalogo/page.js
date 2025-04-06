"use client";
import React from "react";
import NavegadorMenu from "../../component/Pages/Menu/Navegador";
import Buscador from "../../Utils/Menu/Buscador";
import Productos from "./Productos";
import PanelFiltro from "../../component/Pages/Catalogo/PanelFiltro";

import { FormProvider } from "../../context/FormContext"; // Importa el contexto
import Head from "next/head";

const Catalogo = () => {
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7"
          crossOrigin="anonymous"
        />
      </Head>
      {/* MENU */}
      <NavegadorMenu />

      {/* Título del catálogo */}
      <h1
        style={{
          fontSize: "3rem",
          textAlign: "center",
          margin: "20px 0",
          color: "#333",
        }}
      >
        Catálogo
      </h1>

      {/* Buscador colocado debajo del título */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <Buscador />
      </div>
      <FormProvider>
        {/* CONTENEDOR FILTROS */}
        <div className="containerPanel">
          <PanelFiltro />
        </div>

        {/* CONTENEDOR DE PRODUCTOS */}
        <div className="container_CardProductos">
          <Productos />
        </div>
      </FormProvider>

      <style jsx>
        {`
          .container_CardProductos {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            padding: 20px;
          }
          .containerPanel {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
          }
        `}
      </style>
    </>
  );
};

export default Catalogo;
