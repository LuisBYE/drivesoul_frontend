"use client";
import React, { useState } from "react";
import NavegadorMenu from "../../component/Pages/Menu/Navegador";
import Buscador from "../../Utils/Menu/Buscador";
import Productos from "./Productos";
import PanelFiltro from "../../component/Pages/Catalogo/PanelFiltro";
import { FormProvider } from "../../context/FormContext";
import Head from "next/head";

const Catalogo = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="catalogo-container">
      <NavegadorMenu />
      
      <div className="main-content">
        <FormProvider>
          {/* Panel de filtros fijo */}
          <aside className="filtros-sidebar">
            <PanelFiltro />
          </aside>

          {/* Contenido principal */}
          <main className="productos-content">
            <div className="buscador-container">
              <h1>Catálogo</h1>
              <Buscador onSearch={handleSearch} />
            </div>
            <Productos />
          </main>
        </FormProvider>
      </div>

      <style jsx>{`
        .catalogo-container {
          min-height: 100vh;
          background-color: #f5f5f5;
        }

        .main-content {
          display: flex;
          gap: 20px;
          padding: 0 20px;
          margin-top: 20px;
          position: relative;
        }

        .filtros-sidebar {
          width: 280px;
          position: sticky;
          top: 20px;
          height: calc(100vh - 100px);
          overflow-y: auto;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 15px;
        }

        .productos-content {
          flex: 1;
          min-width: 0;
        }

        .buscador-container {
          margin-bottom: 20px;
        }

        .buscador-container h1 {
          font-size: 2rem;
          color: #333;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .main-content {
            flex-direction: column;
          }

          .filtros-sidebar {
            width: 100%;
            position: relative;
            top: 0;
            height: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Catalogo;