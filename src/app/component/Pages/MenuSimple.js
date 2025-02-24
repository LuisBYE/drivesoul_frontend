'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './css.css'; 

const MenuSimple = () => {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <nav className="nav-principal">
            <div onClick={() => handleNavigation('/')} style={{cursor: 'pointer'}}>
                <img src="/FOTOS/LOGO.png" alt="Logo BMW" className="logo" />
            </div>
            <ul className="menu">
                <li onClick={() => handleNavigation('/Pages/Novedades')}>Novedades</li>
                <li onClick={() => handleNavigation('/Pages/Catalogo')}>Catálogo</li>
                <li onClick={() => handleNavigation('/Pages/Noticias')}>Noticias del Motor</li>
                <li onClick={() => handleNavigation('/Pages/Coches')}>Coche a medida</li>
                <li onClick={() => handleNavigation('/Pages/Contacto')}>Contacto</li>
                <li onClick={() => handleNavigation('/Pages/Vlogin')}>Registro</li>
            </ul>
        </nav>
    );
};

export default MenuSimple; 