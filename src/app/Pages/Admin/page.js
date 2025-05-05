'use client'
import NavegadorPag from "../../component/Pages/Menu/Navegador";
import React, { useEffect, useState } from "react";
import FomUsuarios from "./FuncionUsuarios";
import FormProductos from "./FuncionProductos";

export default function PageAdmin() {



    const productos = async () => {
        // Lógica para manejar productos async
    }




    return (
        <>
            <NavegadorPag />
            {/* HAY QUE CAMBIAR EL MARGIN TOP EN LA PAGINA PRINCIPAL DE NAVEGADORPAGE */}
            <FomUsuarios/>
            <FormProductos/>
        </>
    )

}