'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavegadorMenu from '../../component/Pages/Menu/Navegador';
import Footer from "../../component/footer";
import { useCart } from '../../context/CartContext';
import { obtenerGradiente } from '../../Utils/Coches/coloresCoches';
import ReqCoches from "../../component/AxiosResquestAll/RequestsCoches"; 
import PageBanner from '../../components/PageBanner';
import ComparadorCoches from '../../component/ComparadorCoches';
import './ofertas.css';
import '../../Utils/Pages/tarjetas.css';
import '../../styles/global.css';

const Novedades = () => {
    console.log("[Novedades] Componente Novedades renderizando...");
    const router = useRouter();
    const { addToCart } = useCart();
    const [addedToCart, setAddedToCart] = useState({});
    const [cocheDesplegado, setCocheDesplegado] = useState(null);
    const [cocheId, setCocheId] = useState(null);
    const [cochesOfertasApi, setCochesOfertasApi] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    // Datos específicos para los coches que queremos mostrar como ofertas
    const ofertasEspecificasData = {
        2: { // Hyundai i30 N Fastback - modelo_id: 2
            nombreOferta: "Hyundai i30 N Fastback",
            precio_oferta: 33150,
            porcentaje_descuento: 15,
            categoria_oferta: 1,
            descripcionOferta: "Hyundai i30 N Fastback Performance, 280CV, increíble rendimiento, deportivo compacto con acabados premium y tecnología de competición. Incluye diferencial autoblocante electrónico, escape deportivo variable y modos de conducción configurables."
        },
        97: { // Volkswagen Golf - modelo_id: 97
            nombreOferta: "Volkswagen Golf",
            precio_oferta: 23800,
            porcentaje_descuento: 15,
            categoria_oferta: 2,
            descripcionOferta: "Volkswagen Golf 2023, motor 1.5 TSI, 150CV, compacto alemán con tecnología de última generación. Equipado con sistema de infoentretenimiento de 10 pulgadas, asistentes de conducción avanzados y conectividad Car-Net."
        },
        104: { // Mercedes Clase C - modelo_id: 104
            nombreOferta: "Mercedes Clase C",
            precio_oferta: 36000,
            porcentaje_descuento: 20,
            categoria_oferta: 3,
            descripcionOferta: "Mercedes Clase C 2023, motor 2.0, 204CV, berlina premium con acabados de lujo y tecnología avanzada. Incluye sistema MBUX con pantalla de 11.9 pulgadas, iluminación ambiental personalizable y paquete de asistencia a la conducción."
        }
    };

    useEffect(() => {
        const fetchYTransformarOfertas = async () => {
            console.log("[Novedades] fetchYTransformarOfertas iniciando..."); 
            try {
                setLoading(true);
                const todosLosCoches = await ReqCoches.getCoches();
                console.log("[Novedades] Datos recibidos de ReqCoches.getCoches():", todosLosCoches);

                if (todosLosCoches && Array.isArray(todosLosCoches)) {
                    const cochesEnOfertaTransformados = todosLosCoches
                        .filter(coche => ofertasEspecificasData.hasOwnProperty(coche.modelo_id)) // Filtrar solo los que tienen datos de oferta definidos
                        .map(coche => {
                            const datosOferta = ofertasEspecificasData[coche.modelo_id];
                            return {
                                ...coche, // Datos base de la BBDD (incluye el 'precio' original, 'id' de BBDD, etc.)
                                nombre: datosOferta.nombreOferta, // Usar nombre específico de la oferta
                                precio_oferta: datosOferta.precio_oferta,
                                porcentaje_descuento: datosOferta.porcentaje_descuento,
                                categoria_oferta: datosOferta.categoria_oferta,
                                descripcion: datosOferta.descripcionOferta // Usar descripción específica de la oferta
                            };
                        });

                    console.log("[Novedades] Coches transformados como ofertas:", cochesEnOfertaTransformados);
                    setCochesOfertasApi(cochesEnOfertaTransformados);
                    console.log("[Novedades] Estado cochesOfertasApi actualizado:", cochesEnOfertaTransformados);
                } else {
                    setCochesOfertasApi([]);
                    console.warn("[Novedades] La respuesta de ReqCoches.getCoches() no fue un array válido o está vacía.");
                }
            } catch (e) {
                setError(e.message);
                console.error("[Novedades] Error al cargar y transformar los coches en oferta:", e);
                setCochesOfertasApi([]);
            } finally {
                setLoading(false);
            }
        };

        fetchYTransformarOfertas();
    }, []); 

    const categoriasOfertas = {
        1: 'Promoción Especial',
        2: 'Liquidación',
        3: 'Descuento Financiación'
    };

    const mostrarCocheId = (id) => {
        setCocheId(cocheId === id ? null : id);
        setCocheDesplegado(cocheId !== id);
    };
    

    const navegarADetalles = (coche) => {
        const cocheConOferta = {
            ...coche,
            precioOriginal: coche.precio,  
            precio: coche.precio_oferta,   
            en_oferta: true,               
            porcentaje_descuento: coche.porcentaje_descuento  
        };
        
        localStorage.setItem('cocheSeleccionado', JSON.stringify(cocheConOferta));
        
        window.location.href = `/Pages/Coches/${coche.modelo_id}`;
    };

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
            <div className="novedades-page" style={{color: '#ffffff'}}>
                <NavegadorMenu />
                
                <PageBanner 
                    title="OFERTAS EXCLUSIVAS" 
                    subtitle="Descubre nuestras mejores promociones" 
                    backgroundImage="/FOTOS/BANNEROFERTAS.png"
                />
                
                <div style={{maxWidth: '1200px', margin: '80px auto 0', padding: '20px 10px'}}>
                    <div className="productos-grid">
                        {cochesOfertasApi.map((coche, index) => (
                        <div key={`oferta-${coche.modelo_id}-${index}`} className="producto-card" style={{height: '800px', width: '100%', background: 'linear-gradient(145deg, #1a1a1a, #2a2020)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 0, 0, 0.15)', display: 'flex', flexDirection: 'column', position: 'relative'}}>
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
                                            const cocheConOferta = {
                                                ...coche,
                                                precioOriginal: coche.precio,
                                                precio: coche.precio_oferta,
                                                en_oferta: true,
                                                porcentaje_descuento: coche.porcentaje_descuento
                                            };
                                            localStorage.setItem('cocheSeleccionado', JSON.stringify(cocheConOferta));
                                            
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
                
                {/* COMPARADOR DE MODELOS MEJORADO */}
                <ComparadorCoches />
                
                {/* TESTIMONIOS DE CLIENTES */}
                <div style={{maxWidth: '1200px', margin: '60px auto 0', padding: '20px 10px'}}>
                    <h2 style={{color: '#ffffff', fontSize: '2rem', fontWeight: '700', marginBottom: '30px', textAlign: 'center', position: 'relative'}}>
                        TESTIMONIOS DE CLIENTES
                        <div style={{width: '80px', height: '3px', background: '#cc0000', margin: '15px auto'}}></div>
                    </h2>
                    
                    <div style={{display: 'flex', gap: '30px', marginTop: '20px', overflow: 'hidden'}}>
                        <div style={{flex: '1', background: 'linear-gradient(145deg, #1a1a1a, #2a2020)', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 0, 0, 0.15)', position: 'relative'}}>
                            <div style={{position: 'absolute', top: '20px', left: '20px', color: '#ff3333', fontSize: '2rem', opacity: '0.3'}}>
                                <i className="fas fa-quote-left"></i>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: '1'}}>
                                <p style={{fontSize: '1rem', color: '#cccccc', lineHeight: '1.6', flex: '1', marginBottom: '20px', fontStyle: 'italic'}}>
                                    Compré mi Hyundai i30 N en DriveSoul y la experiencia fue excepcional. El asesoramiento fue profesional y personalizado, y el precio con la oferta especial fue imbatible. Recomiendo DriveSoul a todos mis amigos.
                                </p>
                                <div>
                                    <h4 style={{fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', margin: '0 0 5px 0'}}>Carlos Martínez</h4>
                                    <div style={{display: 'flex', color: '#ff3333'}}>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{flex: '1', background: 'linear-gradient(145deg, #1a1a1a, #2a2020)', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 0, 0, 0.15)', position: 'relative'}}>
                            <div style={{position: 'absolute', top: '20px', left: '20px', color: '#ff3333', fontSize: '2rem', opacity: '0.3'}}>
                                <i className="fas fa-quote-left"></i>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: '1'}}>
                                <p style={{fontSize: '1rem', color: '#cccccc', lineHeight: '1.6', flex: '1', marginBottom: '20px', fontStyle: 'italic'}}>
                                    La financiación que me ofrecieron fue exactamente lo que necesitaba. El proceso fue rápido y sin complicaciones. Mi Mercedes Clase C es todo lo que esperaba y más. El descuento del 20% marcó la diferencia.
                                </p>
                                <div>
                                    <h4 style={{fontSize: '1.1rem', fontWeight: 600, color: '#ffffff', margin: '0 0 5px 0'}}>Laura Sánchez</h4>
                                    <div style={{display: 'flex', color: '#ff3333'}}>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Novedades;