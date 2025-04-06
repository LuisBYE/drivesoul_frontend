"use client";
import React, { useState } from "react";
import NavegadorMenu from "../../component/Pages/Menu/Navegador";
import "./filtros.css";
import Buscador from "../../Utils/Menu/Buscador";
import Productos from "./Productos";
import PanelFiltro from "../../component/Pages/Catalogo/PanelFiltro";

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
      <div>
        <Productos searchTerm={searchTerm} /> {/* Pasa el término de búsqueda */}
      </div>
      <div>
        <PanelFiltro />
      </div>
    </>
  );
};

export default Catalogo;