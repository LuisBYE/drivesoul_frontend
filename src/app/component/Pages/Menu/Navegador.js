'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import './menu.css'; 

function NavegadorMenu() {
    const router = useRouter();
    
    // ESTO LO QUE HACE ES QUE SI HAY UN USUARIO LOGUEADO, SE OCULTE EL BOTON DE REGISTRO/LOGIN
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    // VERIFICAR SI HAY UN USUARIO LOGUEADO AL CARGAR (DETECCION DE ERRORES)
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userData = JSON.parse(user);
                setIsLoggedIn(true);
                setUsername(userData.Nombre || "Usuario");
            } catch {
                localStorage.removeItem('user');
            }
        }
    }, []);

    // NAVEGAR A OTRA PÁGINA 
    const handleNavigation = (path) => {
        if (showDropdown) setShowDropdown(false);
        router.push(path);
    };

    // CERRAR SESIÓN DE USUARIO  
    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUsername("");
        setShowDropdown(false);
        router.push('/');
    };

    // MOSTRAR/OCULTAR MENÚ DESPLEGABLE 
    const toggleDropdown = (e) => {
        e.stopPropagation();
        setShowDropdown(!showDropdown);
    };

    // MANEJO CIERRA EL DESPLEGABLE AL HACER CLIC FUERA
    useEffect(() => {
        if (!showDropdown) return;
        
        const closeDropdown = () => setShowDropdown(false);
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, [showDropdown]);


    // MANEJO GENERAL DEL MENU
    return (
        <nav className="nav-principal">
            <div onClick={() => handleNavigation('/')} style={{cursor: 'pointer'}}>
                <img src="/FOTOS/logo.png" alt="Logo BMW" className="logo" />
            </div>
            <ul className="menu">
                <li onClick={() => handleNavigation('/Pages/Novedades')}>Novedades</li>
                <li onClick={() => handleNavigation('/Pages/Catalogo')}>Catálogo Coches</li>
                <li onClick={() => handleNavigation('/Pages/Noticias')}>Noticias del Motor</li>
                <li onClick={() => handleNavigation('/Pages/Coches')}>Coche a medida</li>
                <li onClick={() => handleNavigation('/Pages/Contacto')}>Contacto</li>
                
                {/* MENÚ DE USUARIO CON DESPLEGABLE PARA CERRAR SESIÓN */}
                {isLoggedIn ? (
                    <li className="user-menu">
                        <div onClick={toggleDropdown} className="username">
                            {username}
                        </div>
                        {showDropdown && (
                            <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                <div onClick={handleLogout}>Cerrar Sesión</div>
                            </div>
                        )}
                    </li>
                ) : (
                    <li onClick={() => handleNavigation('/Pages/Registro')}>Registro</li>
                )}
            </ul>
        </nav>
    );
}

export default NavegadorMenu; 