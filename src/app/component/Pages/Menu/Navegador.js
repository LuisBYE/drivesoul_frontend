'use client';

import { useRouter } from 'next/navigation';
import './menu.css'; 

function NavegadorMenu() {
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
                <li onClick={() => handleNavigation('/Pages/Catalogo')}>Catálogo Coches</li>
                <li onClick={() => handleNavigation('/Pages/Noticias')}>Noticias del Motor</li>
                <li onClick={() => handleNavigation('/Pages/Coches')}>Coche a medida</li>
                <li onClick={() => handleNavigation('/Pages/Contacto')}>Contacto</li>
                <li onClick={() => handleNavigation('/Pages/Registro')}>Registro</li>
                <li onClick={handleLogout}>Cerrar Sesión </li>
            </ul>
        </nav>
    );
}

export default NavegadorMenu; 