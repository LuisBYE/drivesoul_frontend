"use client";
import React, { useState } from "react";
import NavegadorMenu from "../../component/Pages/Menu/Navegador";
import Buscador from "../../Utils/Menu/Buscador";
import Productos from "./Productos";
import PanelFiltro from "../../component/Pages/Catalogo/PanelFiltro";
import { FormProvider } from "../../context/FormContext";
import "./catalogo.css";

const Catalogo = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="catalogo-container">
      <NavegadorMenu />
      <FormProvider>
        <div className="main-content">
          <aside className="filtros-sidebar">
            <PanelFiltro />
          </aside>
          <main className="productos-content">
            <div className="buscador-container">
              <Buscador onSearch={handleSearch} />
            </div>
            <Productos />
          </main>
        </div>
      </FormProvider>
    </div>
  );
};

export default Catalogo;