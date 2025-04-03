'use client'; 

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './css.css'; 

  // VIDEOS BANNER
function Menu() {
    const router = useRouter();



    const handleNavigation = (path) => {
        router.push(path);
    };

    const handleLogout = () => {
       
        router.push('/');
    };

    return (
        <>
            {/* MENU */}
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
                    <li onClick={() => handleNavigation('/Pages/Registro')}>Registro</li>
                    <li onClick={handleLogout}>Cerrar Sesión </li>
                
                </ul>
            </nav>

            {/* VIDEO BANNER */}
            <div className="hero">
                <video
                    className="video-fondo"
                    autoPlay
                    muted
                    loop
                    src="/VIDEOS/VIDEOBANNER.mp4"
                />
                <div className="contenido-hero">
                    <h2>THE NEW</h2>
                    <div className="ix-logo">iX</div>
                    <p>Nuevo BMW iX. 100% eléctrico.</p>
                    <p>Hasta 701 km de autonomía.</p>
                </div>
            </div>
        </>
    );
}

export default Menu;