"use client";
import React from "react";
import NavegadorMenu from "../../component/Pages/Menu/Navegador";
import Productos from "./Productos";
import PanelFiltro from "../../component/Pages/Catalogo/PanelFiltro";
import { FormProvider } from "../../context/FormContext";
import "./catalogo.css";
import Footer from "../../component/footer";

const Catalogo = () => {
  return (
    <>
    <div className="catalogo-container">
      <NavegadorMenu />
      <FormProvider>
        <div className="main-content">
          <aside className="filtros-sidebar">
            <PanelFiltro />
          </aside>
          <main className="productos-content">
            <Productos />
           
          </main>
        </div>
      </FormProvider>
    </div>
    <Footer />
    </>
  );
};

export default Catalogo;