'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import './menu.css';
import { createPortal } from 'react-dom'; 

function NavegadorMenu() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [rol, setRol]= useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount, setCartCount } = useCart();
    const user = localStorage.getItem('user');
    // Función para verificar y actualizar el estado de autenticación
    const checkAuthStatus = () => {
        
        if (user) {
            try {
                const userData = JSON.parse(user);
                setIsLoggedIn(true);
                setUsername(userData.nombre);
                setRol(userData.rol)
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

    // Estilo inline para el menú con máxima prioridad
    const menuStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 9999999,
        background: 'linear-gradient(to right, rgba(0, 0, 0, 0.98), rgba(0, 0, 0, 0.95))',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
        transform: 'translateZ(0)',
        WebkitTransform: 'translate3d(0,0,0)',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 3rem',
        height: 'auto'
    };

    // Estado para controlar si el portal está listo para renderizarse
    const [mounted, setMounted] = useState(false);

    // Efecto para montar el portal solo en el cliente
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // El contenido del menú que se renderizará en el portal
    const menuContent = (
        <nav className="nav-principal" style={menuStyle}>
            <div onClick={() => handleNavigation('/')} className="logo-container">
                <img src="/FOTOS/logo.png" alt="DriveSoul Logo" className="logo" />
            </div>
            <ul className="menu">
                <li onClick={() => handleNavigation('/Pages/Novedades')}>Novedades</li>
                <li onClick={() => handleNavigation('/Pages/Catalogo')}>Catálogo Coches</li>
                <li onClick={() => handleNavigation('/Pages/Noticias')}>Noticias del Motor</li>
                <li onClick={() => handleNavigation('/Pages/Coches')}>Coche a medida</li>
              <li onClick={() => handleNavigation('/Pages/Contacto')}>Contacto</li>
              {rol === "administrador" && user !== null && <li onClick={() => handleNavigation('/Pages/Admin')}>Admin</li>}
              
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

    // Renderizar el menú usando un portal para asegurar que esté por encima de todo
    return mounted && typeof document !== 'undefined' ? 
        createPortal(menuContent, document.body) : 
        menuContent;
}

export default NavegadorMenu; 