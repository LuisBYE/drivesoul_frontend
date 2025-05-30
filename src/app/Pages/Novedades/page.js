'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavegadorMenu from '../../component/Pages/Menu/Navegador';
import Footer from "../../component/footer";
import { useCart } from '../../context/CartContext';
import { obtenerGradiente } from '../../Utils/Coches/coloresCoches';
import './ofertas.css';
import '../../Utils/Pages/tarjetas.css';

const Novedades = () => {
    const router = useRouter();
    const { addToCart } = useCart();
    const [addedToCart, setAddedToCart] = useState({});
    const [cocheDesplegado, setCocheDesplegado] = useState(null);
    const [cocheId, setCocheId] = useState(null);

    // Datos de los coches en oferta
    const cochesEnOferta = [
        {
            id: 2,
            modelo_id: 2,
            nombre: "Hyundai i30 N Fastback",
            precio: 39000,
            precio_oferta: 33150,
            porcentaje_descuento: 15,
            anio: "2023",
            kilometraje: 0,
            color: "Azul Performance",
            tipo_combustible: "Gasolina",
            transmision: "Manual 6 velocidades",
            potencia: "280 CV",
            aceleracion: "5.9 segundos (0-100 km/h)",
            velocidad_maxima: "250 km/h",
            consumo: "8.4 l/100km",
            categoria_oferta: 1,
            descripcion: "Hyundai i30 N Fastback Performance, 280CV, increíble rendimiento, deportivo compacto con acabados premium y tecnología de competición. Incluye diferencial autoblocante electrónico, escape deportivo variable y modos de conducción configurables."
        },
        {
            id: 10,
            modelo_id: 97,
            nombre: "Volkswagen Golf",
            precio: 28000,
            precio_oferta: 23800,
            porcentaje_descuento: 15,
            anio: "2023",
            kilometraje: 0,
            color: "Gris Piedra Lunar",
            tipo_combustible: "Gasolina",
            transmision: "DSG 7 velocidades",
            potencia: "150 CV",
            aceleracion: "8.5 segundos (0-100 km/h)",
            velocidad_maxima: "224 km/h",
            consumo: "5.7 l/100km",
            categoria_oferta: 2,
            descripcion: "Volkswagen Golf 2023, motor 1.5 TSI, 150CV, compacto alemán con tecnología de última generación. Equipado con sistema de infoentretenimiento de 10 pulgadas, asistentes de conducción avanzados y conectividad Car-Net."
        },
        {
            id: 17,
            modelo_id: 104,
            nombre: "Mercedes Clase C",
            precio: 45000,
            precio_oferta: 36000,
            porcentaje_descuento: 20,
            anio: "2023",
            kilometraje: 0,
            color: "Rojo Jacinto",
            tipo_combustible: "Gasolina",
            transmision: "Automática 9G-TRONIC",
            potencia: "204 CV",
            aceleracion: "7.3 segundos (0-100 km/h)",
            velocidad_maxima: "246 km/h",
            consumo: "6.2 l/100km",
            categoria_oferta: 3,
            descripcion: "Mercedes Clase C 2023, motor 2.0, 204CV, berlina premium con acabados de lujo y tecnología avanzada. Incluye sistema MBUX con pantalla de 11.9 pulgadas, iluminación ambiental personalizable y paquete de asistencia a la conducción."
        }
    ];

    // Categorías de ofertas
    const categoriasOfertas = {
        1: 'Promoción Especial',
        2: 'Liquidación',
        3: 'Descuento Financiación'
    };

    // Función para mostrar/ocultar detalles del coche
    const mostrarCocheId = (id) => {
        setCocheId(cocheId === id ? null : id);
        setCocheDesplegado(cocheId !== id);
    };
    

    
    // Función para navegar a la página de detalles del coche
    const navegarADetalles = (coche) => {
        // Guardar los datos del coche seleccionado con precio de oferta
        const cocheConOferta = {
            ...coche,
            precioOriginal: coche.precio,  // Guardamos el precio original
            precio: coche.precio_oferta,   // Reemplazamos el precio por el precio de oferta
            en_oferta: true,               // Marcamos que está en oferta
            porcentaje_descuento: coche.porcentaje_descuento  // Guardamos el porcentaje de descuento
        };
        
        localStorage.setItem('cocheSeleccionado', JSON.stringify(cocheConOferta));
        
        // Navegar a la página de detalles usando window.location para forzar una recarga completa
        // Esto asegura que al volver, la página se recargue completamente y no haya problemas de diseño
        window.location.href = `/Pages/Coches/${coche.modelo_id}`;
    };

    // Función para añadir al carrito
    const agregarAlCarrito = (coche) => {
        const cocheParaCarrito = {
            id: coche.id,
            modelo_id: coche.modelo_id,
            nombre: coche.nombre,
            precio: coche.precio_oferta,
            anio: coche.anio,
            color: coche.color,
            tipo_combustible: coche.tipo_combustible,
            imagen: getImagenCoche(coche.modelo_id)
        };
        
        addToCart(cocheParaCarrito);
        setAddedToCart({ ...addedToCart, [coche.id]: true });
    };

    // Función para obtener la imagen del coche
    const getImagenCoche = (modelo_id) => {
        const rutasImagenes = {
            1: "/FOTOS/COCHES/SEATIBIZAROJO/1.jpg",
            2: "/FOTOS/COCHES/HYUNDAII30NFASTBACK/1.png",
            90: "/FOTOS/COCHES/SEATLEONBLANCO/1.jpg",
            91: "/FOTOS/COCHES/SEATARONAAZUL/1.png",
            92: "/FOTOS/COCHES/HYUNDAITUCSONGRIS/1.png",
            93: "/FOTOS/COCHES/HYUNDAIKONA/1.jpg",
            94: "/FOTOS/COCHES/AUDIA3NEGRO/1.png",
            95: "/FOTOS/COCHES/AUDIA4AZUL/1.png",
            96: "/FOTOS/COCHES/AUDIQ5BLANCO/1.png",
            97: "/FOTOS/COCHES/VOLKSWAGENGOLFGRIS/1.png",
            98: "/FOTOS/COCHES/VOLKSWAGENPOLOROJO/1.png",
            99: "/FOTOS/COCHES/VOLKSWAGENTROCNEGRO/1.png",
            100: "/FOTOS/COCHES/PEUGEOT208AZUL/1.png",
            101: "/FOTOS/COCHES/PEUGEOT3008BLANCO/1.png",
            102: "/FOTOS/COCHES/PEUGEOT508GRIS2023/1.png",
            103: "/FOTOS/COCHES/MERCEDESCLASEANEGRO/1.png",
            104: "/FOTOS/COCHES/MERCEDESCLASECROJO/1.jpeg",
            105: "/FOTOS/COCHES/MERCEDES GLCAZUL/1.png",
        };

        return rutasImagenes[modelo_id] || "/FOTOS/COCHES/default.jpg";
    };

    return (
        <>
            <div className="novedades-container">
                <NavegadorMenu />
                
                <div className="banner-container">
                    <img 
                        src="/FOTOS/BANNEROFERTAS.png" 
                        alt="Ofertas especiales" 
                        className="banner-image"
                    />
                    <div className="banner-overlay">
                        <div>
                            <h1 className="banner-title">OFERTAS EXCLUSIVAS</h1>
                            <p className="banner-subtitle">Descubre nuestras mejores promociones</p>
                        </div>
                    </div>
                </div>
                
                <div className="ofertas-content" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                    
                    <div className="productos-grid">
                        {cochesEnOferta.map((coche) => (
                        <div key={coche.id} className="producto-card">
                            <div className="producto-imagen">
                                <img
                                    src={getImagenCoche(coche.modelo_id)}
                                    alt={coche.nombre}
                                    className="imagen-principal"
                                    onError={(e) => { e.target.src = '/FOTOS/COCHES/default.jpg' }}
                                />
                                {coche.tipo_combustible && coche.tipo_combustible.toLowerCase() === "híbrido" && (
                                    <div className="eco-badge">
                                        <span>ECO</span>
                                    </div>
                                )}
                                <div className="descuento-badge">
                                    <span>-{coche.porcentaje_descuento}%</span>
                                </div>
                            </div>

                            <div className="producto-info">
                                <div className="producto-header">
                                    <h3 className="producto-titulo">{coche.nombre}</h3>
                                    <div className="producto-precio">
                                        <div className="precio-original" style={{ 
                                            textDecoration: 'line-through', 
                                            color: '#999', 
                                            fontSize: '0.9em' 
                                        }}>
                                            {coche.precio.toLocaleString("es-ES")} €
                                        </div>
                                        <div className="precio-actual" style={{ color: '#ff3a3a', fontWeight: 'bold' }}>
                                            {coche.precio_oferta.toLocaleString("es-ES")} €
                                        </div>
                                        <div className="precio-mensual">
                                            Desde {Math.round(coche.precio_oferta / 72).toLocaleString("es-ES")} €/mes*
                                        </div>
                                    </div>
                                </div>

                                <div className="producto-specs">
                                    <div className="spec-item">
                                        <i className="fas fa-calendar"></i>
                                        <span>{coche.anio}</span>
                                    </div>
                                    <div className="spec-separator">·</div>
                                    <div className="spec-item">
                                        <i className="fas fa-tachometer-alt"></i>
                                        <span>{coche.kilometraje ? coche.kilometraje.toLocaleString("es-ES") : '0'} km</span>
                                    </div>
                                    <div className="spec-separator">·</div>
                                    <div className="spec-item">
                                        <i className="fas fa-gas-pump"></i>
                                        <span>{coche.tipo_combustible}</span>
                                    </div>
                                    <div className="spec-separator">·</div>
                                    <div className="spec-item">
                                        <i className="fas fa-cog"></i>
                                        <span>{coche.transmision}</span>
                                    </div>
                                </div>
                                
                                <div className="producto-acciones">
                                    <a
                                        href={`/Pages/Coches/${coche.modelo_id}`}
                                        className="ver-detalles"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Guardar los datos del coche en localStorage antes de navegar
                                            const cocheConOferta = {
                                                ...coche,
                                                precioOriginal: coche.precio,
                                                precio: coche.precio_oferta,
                                                en_oferta: true,
                                                porcentaje_descuento: coche.porcentaje_descuento
                                            };
                                            localStorage.setItem('cocheSeleccionado', JSON.stringify(cocheConOferta));
                                            
                                            // Navegar directamente usando window.location para forzar una recarga completa
                                            window.location.href = `/Pages/Coches/${coche.modelo_id}`;
                                        }}
                                    >
                                        Ver Detalles
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Novedades;