import React from 'react';
import NavegadorMenu from '../../component/Pages/Menu/Navegador';
import Footer from "../../component/footer";
import AsistenteCoche from "./AsistenteCoche";
import { FormProvider } from "../../context/FormContext";

const Coche = () => {
    return (
        <FormProvider>
            <div className="coches-page-container">
                <NavegadorMenu />
                <AsistenteCoche />
                <Footer />
            </div>
        </FormProvider>
    );
};

export default Coche;
