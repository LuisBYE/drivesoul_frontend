"use client";
import React, { useState } from "react";
import NavegadorMenu from "../../component/Pages/Menu/Navegador";
import Buscador from "../../Utils/Menu/Buscador";
import Productos from "./Productos";
import PanelFiltro from "../../component/Pages/Catalogo/PanelFiltro";
import { FormProvider } from "../../context/FormContext";
import Head from "next/head";

const FILTRO_WIDTH = 560; // px
const MENU_HEIGHT = 64; // px (ajusta si tu menú es más alto)

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

      <style jsx>{`
        .catalogo-container {
          min-height: 100vh;
          overflow-x: hidden;
        }
        .main-content {
          display: flex;
          width: 100%;
          margin-top: ${MENU_HEIGHT}px;
        }
        .filtros-sidebar {
          position: fixed;
          top: ${MENU_HEIGHT}px;
          left: 0;
          width: ${FILTRO_WIDTH}px;
          height: calc(100vh - ${MENU_HEIGHT}px);
          padding: 20px;
          z-index: 10;
        }
        .productos-content {
          flex: 1;
          margin-left: ${FILTRO_WIDTH}px;
          padding: 20px;
        }
        .buscador-container {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
          width: 100%;
        }
        .buscador-container > div {
          background: transparent !important;
          box-shadow: none !important;
        }

        @media (max-width: 900px) {
          .main-content {
            flex-direction: column;
            margin-top: 0;
          }
          .filtros-sidebar {
            position: relative;
            top: auto;
            width: 100%;
            height: auto;
            padding: 10px;
          }
          .productos-content {
            margin-left: 0;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Catalogo;