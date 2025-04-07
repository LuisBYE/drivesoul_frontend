"use client";
import React, { useState } from "react";
import NavegadorMenu from "../../component/Pages/Menu/Navegador";
import Buscador from "../../Utils/Menu/Buscador";
import Productos from "./Productos";
import PanelFiltro from "../../component/Pages/Catalogo/PanelFiltro";

import { FormProvider } from "../../context/FormContext"; // Importa el contexto
import Head from "next/head";

const Catalogo = () => {
  const [searchTerm, setSearchTerm] = useState(""); // ALMACENA LO QUE EL USUARIO ESCRIBE EN EL BUSCADOR

  const handleSearch = (term) => {
    setSearchTerm(term); // SE ECARGA DE "ACTIVARSE" CUANDO EL USUARIO ESCRIBE EN EL BUSCADOR
  };

  return (
    <>
      <NavegadorMenu />
      <h1 style={{ fontSize: "3rem", textAlign: "center", margin: "20px 0", color: "#333" }}>
        Catálogo
      </h1>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <Buscador onSearch={handleSearch} /> {/* Pasa la función de búsqueda */}
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