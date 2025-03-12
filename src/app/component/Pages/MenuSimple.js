'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import loginService from './login';
import './css.css'; 

function MenuSimple() {
    const router = useRouter();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const { isLoggedIn, currentUser } = loginService.getLoginStatus();
        setIsUserLoggedIn(isLoggedIn);
        setUsername(currentUser);
    }, []);

    const handleNavigation = (path) => {
        router.push(path);
    };

    const handleLogout = () => {
        loginService.logout();
        setIsUserLoggedIn(false);
        setUsername(null);
        router.push('/');
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
                {!isUserLoggedIn ? (
                    <li onClick={() => handleNavigation('/Pages/Registro')}>Registro</li>
                ) : (
                    <li onClick={handleLogout}>Cerrar Sesión ({username})</li>
                )}
            </ul>
        </nav>
    );
}

export default MenuSimple; 