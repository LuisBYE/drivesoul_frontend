"use client";
import React from "react";
import NavegadorMenu from "../../component/Pages/Menu/Navegador";
import "./filtros.css";
import Buscador from "../../Utils/Menu/Buscador";
import Productos from "./Productos";
import PanelFiltro from "../../component/Pages/Catalogo/PanelFiltro";

const Catalogo = () => {
  return (
    <>
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

      {/* CONTENEDOR FILTROS (ESTILOS CSS)*/}
      {/* <div>
        <PanelFiltro />
      </div> */}
      <div>
        <Productos />
      </div>
    </>
  );
};

export default Catalogo;
