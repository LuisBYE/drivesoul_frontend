'use client'; 

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './css.css'; 

  // VIDEOS BANNER
function Menu() {
    const router = useRouter();
    const videos = [
        '/videos_banner/coche.mp4',
        '/videos_banner/coche1.mp4',
        '/videos_banner/coche2.mp4',
        '/videos_banner/coche3.mp4',
        '/videos_banner/coche4.mp4',
        '/videos_banner/coche5.mp4',
        '/videos_banner/coche6.mp4',
        '/videos_banner/coche7.mp4',
        '/videos_banner/coche8.mp4',
        '/videos_banner/coche9.mp4',
        '/videos_banner/coche10.mp4',
        '/videos_banner/coche11.mp4',
    ];

    const videoRef = useRef(null);

    useEffect(() => {
        const playRandomVideo = () => {
            if (videoRef.current) {
                const randomIndex = Math.floor(Math.random() * videos.length);
                videoRef.current.src = videos[randomIndex];
                videoRef.current.play();
            }
        };

        playRandomVideo();

        if (videoRef.current) {
            videoRef.current.addEventListener('ended', playRandomVideo);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('ended', playRandomVideo);
            }
        };
    }, []);

    const handleNavigation = (path) => {
        router.push(path);
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
                    <li onClick={() => handleNavigation('/Pages/Vlogin')}>Registro</li>
                </ul>
            </nav>

            {/* VIDEO BANNER */}
            <div className="hero">
                <video
                    className="video-fondo"
                    autoPlay
                    muted
                    ref={videoRef}
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