'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import './menu.css'; 

function NavegadorMenu() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount, setCartCount } = useCart();

    // Función para verificar y actualizar el estado de autenticación
    const checkAuthStatus = () => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const userData = JSON.parse(user);
                setIsLoggedIn(true);
                setUsername(userData.nombre);
            } catch (error) {
                console.error('Error al parsear datos de usuario:', error);
                localStorage.removeItem('user');
                setIsLoggedIn(false);
                setUsername("");
            }
        } else {
            setIsLoggedIn(false);
            setUsername("");
        }
    };

    // Verificar autenticación al cargar el componente
    useEffect(() => {
        checkAuthStatus();
        
        // Escuchar eventos de login y logout
        window.addEventListener('login', checkAuthStatus);
        window.addEventListener('logout', checkAuthStatus);
        window.addEventListener('storage', checkAuthStatus);
        
        return () => {
            window.removeEventListener('login', checkAuthStatus);
            window.removeEventListener('logout', checkAuthStatus);
            window.removeEventListener('storage', checkAuthStatus);
        };
    }, []);

    const handleNavigation = (path) => {
        if (showDropdown) setShowDropdown(false);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        router.push(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('drivesoulCart'); // Limpiar el carrito al cerrar sesión
        
        // Disparar evento de logout
        const logoutEvent = new Event('logout');
        window.dispatchEvent(logoutEvent);
        
        setIsLoggedIn(false);
        setUsername("");
        setShowDropdown(false);
        router.push('/');
    };

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setShowDropdown(!showDropdown);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (showDropdown) setShowDropdown(false);
    };

    useEffect(() => {
        if (!showDropdown) return;
        const closeDropdown = () => setShowDropdown(false);
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, [showDropdown]);

    return (
        <nav className="nav-principal">
            <div onClick={() => handleNavigation('/')} className="logo-container">
                <img src="/FOTOS/logo.png" alt="DriveSoul Logo" className="logo" />
            </div>
            <ul className="menu">
                <li onClick={() => handleNavigation('/Pages/Novedades')}>Novedades</li>
                <li onClick={() => handleNavigation('/Pages/Catalogo')}>Catálogo Coches</li>
                <li onClick={() => handleNavigation('/Pages/Noticias')}>Noticias del Motor</li>
                <li onClick={() => handleNavigation('/Pages/Coches')}>Coche a medida</li>
                <li onClick={() => handleNavigation('/Pages/Contacto')}>Contacto</li>
                <li onClick={() => handleNavigation('/Pages/Admin')}>Admin</li>
                
                <li onClick={() => handleNavigation('/Pages/cart')} className="cart-icon-container">
                    <div className="cart-icon">
                        <i className="fas fa-shopping-cart"></i>
                        {isLoggedIn && cartCount > 0 && (
                            <span className="cart-count">{cartCount}</span>
                        )}
                    </div>
                </li>
                
                {isLoggedIn ? (
                    <li className="user-menu">
                        <div onClick={toggleDropdown} className="username">
                            {username}
                        </div>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <div onClick={() => handleNavigation('/Pages/Perfil')}>
                                    Mi Perfil
                                </div>
                                <div onClick={handleLogout}>
                                    Cerrar Sesión
                                </div>
                            </div>
                        )}
                    </li>
                ) : (
                    <li onClick={() => handleNavigation('/Pages/Registro')} className="register-button">
                        Registro
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default NavegadorMenu; 