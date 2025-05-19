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
            <div style={{background: 'linear-gradient(to bottom, #000000, #1a0000)', minHeight: '100vh', color: '#ffffff'}}>
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
                
                <div style={{maxWidth: '1200px', margin: '0 auto', padding: '20px 10px'}}>
                    
                    <div className="productos-grid">
                        {cochesEnOferta.map((coche) => (
                        <div key={coche.id} className="producto-card" style={{height: '800px', width: '100%', background: 'linear-gradient(145deg, #1a1a1a, #2a2020)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 0, 0, 0.15)', display: 'flex', flexDirection: 'column', position: 'relative'}}>
                            <div className="producto-imagen" style={{position: 'relative', width: '100%', paddingTop: '80%', overflow: 'hidden'}}>
                                <img
                                    src={getImagenCoche(coche.modelo_id)}
                                    alt={coche.nombre}
                                    className="imagen-principal"
                                    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}}
                                    onError={(e) => { e.target.src = '/FOTOS/COCHES/default.jpg' }}
                                />
                                {coche.tipo_combustible && coche.tipo_combustible.toLowerCase() === "híbrido" && (
                                    <div className="eco-badge">
                                        <span>ECO</span>
                                    </div>
                                )}
                                <div className="descuento-badge" style={{position: 'absolute', top: '10px', right: '10px', backgroundColor: '#cc0000', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', boxShadow: '0 2px 4px rgba(204, 0, 0, 0.3)', zIndex: 2}}>
                                    <span>-{coche.porcentaje_descuento}%</span>
                                </div>
                            </div>

                            <div className="producto-info" style={{padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                <div className="producto-header" style={{marginBottom: '10px'}}>
                                    <h3 className="producto-titulo" style={{fontSize: '1.4rem', fontWeight: 600, color: '#ffffff', margin: '0 0 10px 0', height: '40px', display: '-webkit-box', WebkitLineClamp: 2, lineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{coche.nombre}</h3>
                                    <div className="producto-precio">
                                        <div style={{textDecoration: 'line-through', color: '#999', fontSize: '0.9rem', marginBottom: '2px'}}>
                                            {coche.precio.toLocaleString("es-ES")} €
                                        </div>
                                        <div style={{fontSize: '1.5rem', fontWeight: 700, color: '#ff3333'}}>
                                            {coche.precio_oferta.toLocaleString("es-ES")} €
                                        </div>
                                        <div style={{fontSize: '0.9rem', color: '#cccccc', marginTop: '2px'}}>
                                            Desde {Math.round(coche.precio_oferta / 72).toLocaleString("es-ES")} €/mes*
                                        </div>
                                    </div>
                                </div>

                                <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3px', margin: '5px 0', fontSize: '0.6rem', color: '#ffffff'}}>
                                    <div className="spec-item" style={{padding: '2px', backgroundColor: 'rgba(255, 255, 255, 0.05)'}}>
                                        <i className="fas fa-calendar" style={{color: '#ff3333', fontSize: '0.5rem'}}></i>
                                        <span style={{marginLeft: '1px'}}>{coche.anio}</span>
                                    </div>
                                    <div className="spec-item" style={{padding: '2px', backgroundColor: 'rgba(255, 255, 255, 0.05)'}}>
                                        <i className="fas fa-tachometer-alt" style={{color: '#ff3333', fontSize: '0.5rem'}}></i>
                                        <span style={{marginLeft: '1px'}}>{coche.kilometraje ? coche.kilometraje.toLocaleString("es-ES") : '0'} km</span>
                                    </div>
                                    <div className="spec-item" style={{padding: '2px', backgroundColor: 'rgba(255, 255, 255, 0.05)'}}>
                                        <i className="fas fa-gas-pump" style={{color: '#ff3333', fontSize: '0.5rem'}}></i>
                                        <span style={{marginLeft: '1px'}}>{coche.tipo_combustible}</span>
                                    </div>
                                    <div className="spec-item" style={{padding: '2px', backgroundColor: 'rgba(255, 255, 255, 0.05)'}}>
                                        <i className="fas fa-cog" style={{color: '#ff3333', fontSize: '0.5rem'}}></i>
                                        <span style={{marginLeft: '1px'}}>{coche.transmision}</span>
                                    </div>
                                </div>
                                
                                <div style={{marginTop: '15px'}}>
                                    <a
                                        href={`/Pages/Coches/${coche.modelo_id}`}
                                        className="ver-detalles" style={{width: '100%', backgroundColor: '#cc0000', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 8px rgba(204, 0, 0, 0.2)', textDecoration: 'none', display: 'block', textAlign: 'center', position: 'relative', zIndex: 2}}
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
                
                {/* Sección de Tecnología Automotriz */}
                <div style={{maxWidth: '1200px', margin: '60px auto 0', padding: '20px 10px'}}>
                    <h2 style={{color: '#ffffff', fontSize: '2rem', fontWeight: '700', marginBottom: '30px', textAlign: 'center', position: 'relative'}}>
                        TECNOLOGÍA AUTOMOTRIZ
                        <div style={{width: '80px', height: '3px', background: '#cc0000', margin: '15px auto'}}></div>
                    </h2>
                    
                    <div style={{display: 'flex', gap: '30px', marginTop: '20px', overflow: 'hidden', borderRadius: '12px'}}>
                        <div style={{flex: '1', background: 'linear-gradient(145deg, #1a1a1a, #2a2020)', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 0, 0, 0.15)'}}>
                            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                                <div style={{color: '#ff3333', fontSize: '2.5rem', marginBottom: '20px', textAlign: 'center'}}>
                                    <i className="fas fa-charging-station"></i>
                                </div>
                                <h3 style={{fontSize: '1.5rem', fontWeight: 600, color: '#ffffff', margin: '0 0 15px 0', textAlign: 'center'}}>Movilidad Eléctrica</h3>
                                <p style={{fontSize: '1rem', color: '#cccccc', lineHeight: '1.6', flex: '1'}}>
                                    La revolución eléctrica está transformando la industria automotriz. Los nuevos modelos ofrecen mayor autonomía, menos tiempo de carga y una experiencia de conducción más silenciosa y sostenible.
                                </p>
                                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
                                    <a href="#" style={{display: 'inline-block', backgroundColor: '#cc0000', color: 'white', padding: '10px 25px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s ease'}}>Ver catálogo eléctrico</a>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{flex: '1', background: 'linear-gradient(145deg, #1a1a1a, #2a2020)', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 0, 0, 0.15)'}}>
                            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                                <div style={{color: '#ff3333', fontSize: '2.5rem', marginBottom: '20px', textAlign: 'center'}}>
                                    <i className="fas fa-car-side"></i>
                                </div>
                                <h3 style={{fontSize: '1.5rem', fontWeight: 600, color: '#ffffff', margin: '0 0 15px 0', textAlign: 'center'}}>Conducción Autónoma</h3>
                                <p style={{fontSize: '1rem', color: '#cccccc', lineHeight: '1.6', flex: '1'}}>
                                    Los sistemas de asistencia a la conducción evolucionan rápidamente. Los vehículos modernos incorporan tecnologías que mejoran la seguridad y comodidad, acercando la conducción autónoma a la realidad cotidiana.
                                </p>
                                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
                                    <a href="#" style={{display: 'inline-block', backgroundColor: '#cc0000', color: 'white', padding: '10px 25px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s ease'}}>Descubrir más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Sección de Consejos de Compra */}
                <div style={{maxWidth: '1200px', margin: '60px auto 0', padding: '20px 10px'}}>
                    <h2 style={{color: '#ffffff', fontSize: '2rem', fontWeight: '700', marginBottom: '30px', textAlign: 'center', position: 'relative'}}>
                        CONSEJOS DE COMPRA
                        <div style={{width: '80px', height: '3px', background: '#cc0000', margin: '15px auto'}}></div>
                    </h2>
                    
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px'}}>
                        <div style={{background: 'linear-gradient(145deg, #1a1a1a, #2a2020)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 0, 0, 0.15)', padding: '20px'}}>
                            <div style={{color: '#ff3333', fontSize: '2rem', marginBottom: '15px', textAlign: 'center'}}>
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <h3 style={{fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', margin: '0 0 15px 0', textAlign: 'center'}}>¿Cómo elegir tu primer coche?</h3>
                            <p style={{fontSize: '0.9rem', color: '#cccccc', textAlign: 'center'}}>Descubre los aspectos clave que debes considerar al comprar tu primer vehículo.</p>
                        </div>
                        
                        <div style={{background: 'linear-gradient(145deg, #1a1a1a, #2a2020)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 0, 0, 0.15)', padding: '20px'}}>
                            <div style={{color: '#ff3333', fontSize: '2rem', marginBottom: '15px', textAlign: 'center'}}>
                                <i className="fas fa-coins"></i>
                            </div>
                            <h3 style={{fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', margin: '0 0 15px 0', textAlign: 'center'}}>Financiación inteligente</h3>
                            <p style={{fontSize: '0.9rem', color: '#cccccc', textAlign: 'center'}}>Consejos para obtener la mejor financiación al comprar tu próximo coche.</p>
                        </div>
                        
                        <div style={{background: 'linear-gradient(145deg, #1a1a1a, #2a2020)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 0, 0, 0.15)', padding: '20px'}}>
                            <div style={{color: '#ff3333', fontSize: '2rem', marginBottom: '15px', textAlign: 'center'}}>
                                <i className="fas fa-car-crash"></i>
                            </div>
                            <h3 style={{fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', margin: '0 0 15px 0', textAlign: 'center'}}>Inspección de vehículos usados</h3>
                            <p style={{fontSize: '0.9rem', color: '#cccccc', textAlign: 'center'}}>Qué revisar cuando compras un coche de segunda mano para evitar sorpresas.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Novedades;