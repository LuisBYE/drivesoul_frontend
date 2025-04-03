'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import loginService from './login';
import './css.css'; 

function MenuSimple() {
    const router = useRouter();


    const handleNavigation = (path) => {
        router.push(path);
    };

    const handleLogout = () => {
        router.push('/');
    };

    return (
        <nav className="nav-principal">
            <div onClick={() => handleNavigation('/')} style={{cursor: 'pointer'}}>
            <img src="/FOTOS/logo.png" alt="Logo BMW" className="logo" />
            </div>
            <ul className="menu">
                <li onClick={() => handleNavigation('/Pages/Novedades')}>Novedades</li>
                <li onClick={() => handleNavigation('/Pages/Catalogo')}>Catálogo</li>
                <li onClick={() => handleNavigation('/Pages/Noticias')}>Noticias del Motor</li>
                <li onClick={() => handleNavigation('/Pages/Coches')}>Coche a medida</li>
                <li onClick={() => handleNavigation('/Pages/Contacto')}>Contacto</li>
                {!isUserLoggedIn ? (
                    <li onClick={() => handleNavigation('/Pages/Registro')}>Registro</li>
                ) : (
                    <li onClick={handleLogout}>Cerrar Sesión </li>
                )}
            </ul>
        </nav>
    );
}

export default MenuSimple; 