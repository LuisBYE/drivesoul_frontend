"use client";
import React from 'react';
import MenuSimple from '../../component/Pages/MenuSimple';
import './contacto.css';

const Contacto = () => {
    return (
        <div className="contacto-container">
            <MenuSimple />
            
            {/* Banner Principal */}
            <div className="banner-principal">
                <div className="banner-imagen">
                    <img src="/FOTOS/contacto1.avif" alt="Atención al cliente" />
                </div>
                <div className="banner-texto">
                    <p className="disponible">Disponible en cualquier momento</p>
                    <h1>Atención al Cliente BMW</h1>
                    <p className="descripcion">
                        Nuestro equipo de expertos en servicio al cliente está siempre disponible para ayudarte con cualquier pregunta o consulta que tengas sobre nuestros productos o servicios.
                    </p>
                </div>
            </div>

            {/* Sección de Guía */}
            <div className="seccion-guia">
                <div className="guia-contenido">
                    <div className="guia-texto">
                        <h2>Te guiamos en todo lo que necesites</h2>
                        <p>¿Tienes alguna pregunta sobre nuestros productos o servicios? No dudes en ponerte en contacto con nosotros.</p>
                        
                        <ul className="contacto-opciones">
                            <li>
                                <span>Llama gratis de 09:00h a 20:00h al</span>
                                <a href="tel:900504868" className="telefono">900 504 868</a>
                                <span className="detalle">y nuestro equipo estará encantado de ayudarte.</span>
                            </li>
                            <li>
                                <span>Escríbenos a</span>
                                <a href="mailto:bmw-responde@bmw.es" className="email">bmw-responde@bmw.es</a>
                            </li>
                        </ul>
                    </div>
                    <div className="guia-imagen">
                        <img src="/FOTOS/contacto2.avif" alt="Servicio BMW" />
                    </div>
                </div>
            </div>

            {/* Sección de Asistencia */}
            <section className="asistencia-seccion">
                <div className="asistencia-contenido">
                    <div className="texto-asistencia">
                        <h2>Asistencia BMW.</h2>
                        <h3>A tu lado en todo momento</h3>
                        <p>En caso de avería, accidente, robo o daños graves, puedes contar con el servicio BMW ASSISTANCE las 24h los 365 días del año.</p>
                        <div className="asistencia-contacto">
                            <div className="contacto-item">
                                <h4>Teléfono Nacional</h4>
                                <p>900 100 200</p>
                            </div>
                            <div className="contacto-item">
                                <h4>Teléfono Internacional</h4>
                                <p>+34 91 594 94 94</p>
                            </div>
                        </div>
                    </div>
                    <div className="imagen-asistencia">
                        {/* Aquí irá la imagen del coche en la nieve */}
                    </div>
                </div>
            </section>

            {/* Sección de Soporte */}
            <section className="soporte-seccion">
                <div className="soporte-contenido">
                    <h2>Estamos aquí para ayudarte</h2>
                    <p>Si tienes alguna duda sobre BMW Connect o tu BMW, el Servicio de Atención al Cliente de BMW estará encantado de ayudarte.</p>
                    <div className="soporte-botones">
                        <button className="btn-soporte">Contactar con BMW</button>
                        <button className="btn-soporte">Localizar Concesionario</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contacto; 