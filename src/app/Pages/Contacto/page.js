"use client";
import React from "react";
import NavegadorMenu from '../../component/Pages/Menu/Navegador';
import Footer from "../../component/footer";
import "./contacto.css";

const Contacto = () => {
    return (
        <div className="contacto-container">
            <NavegadorMenu />

            {/* Sección principal */}
            <section className="seccion-principal">
                <div className="imagen-container">
                    <img src="/FOTOS/contacto1.avif" alt="Mujer con coche" className="imagen-izquierda" />
                </div>
                <div className="texto-derecha">
                    <p className="disponible">Disponible en cualquier momento</p>
                    <h1>Atención al Cliente DRIVESOUL</h1>
                    <p>
                        Nuestro equipo de expertos en servicio al cliente está siempre disponible para ayudarte con cualquier pregunta o consulta sobre nuestros productos o servicios.
                    </p>
                </div>
            </section>

            {/* Sección de Guía */}
            <section className="seccion-guia">
                <div className="guia-texto">
                    <h2>Te guiamos en todo lo que necesites</h2>
                    <p>¿Tienes alguna pregunta sobre nuestros productos o servicios? No dudes en ponerte en contacto con nosotros.</p>
                    
                    <ul className="contacto-opciones">
                        <li>
                            En Drivesoul, estamos aquí para ayudarte en todo lo que necesites. Si tienes cualquier pregunta o consulta, 
                            no dudes en ponerte en contacto con nuestro equipo. Llámanos gratis de 09:00 a 21:00 al <strong>936 854 874</strong> y estaremos 
                            encantados de atenderte. Si lo prefieres, completa el siguiente formulario y nos pondremos en contacto 
                            contigo lo antes posible. También puedes escribirnos a <a href="mailto:drivesoul_responde@drivesoul.es">drivesoul_responde@drivesoul.es</a> y te responderemos a la mayor brevedad.
                        </li>
                    </ul>
                </div>
                <div className="imagen-derecha">
                    <img src="/FOTOS/contacto2.avif" alt="Hombre con coche" className="imagen-final" />
                </div>
            </section>

            {/* Sección de Contacto */}
            <section className="seccion-contacto">
                <div className="contenedor-contacto">
                    
                    {/* Bloque de Información y Mapa */}
                    <div className="bloque-info">
                        <p className="info-importante">📍Tu confianza es nuestra prioridad. En DriveSoul, estamos siempre disponibles
                             para resolver tus dudas y ofrecerte la mejor atención.</p>
                        <p className="info-importante">Visítanos en nuestra sede oficial de DriveSoul en Barcelona.</p>
                        <iframe
                            className="mapa-contacto"
                            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d3926.708968374289!2d2.181872422698821!3d41.38324689708541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e3!4m0!4m5!1s0x12a4a2faa2471041%3A0x7b4415b99422728f!2sDrive%20Me%20Barcelona%2C%20Supercar%20Driving%20Experiences%2C%20Rentals%20%26%20Events%2C%20Carrer%20del%20Doctor%20Aiguader%2C%205%2C%207%2C%20Ciutat%20Vella%2C%2008003%20Barcelona!3m2!1d41.3825563!2d2.1860434!5e1!3m2!1ses!2ses!4v1742142794073!5m2!1ses!2ses"
                            allowFullScreen=""
                            loading="lazy">
                        </iframe>
                        <p><strong>Dirección:</strong> Carrer del Doctor Aiguader, Ciutat Vella, 08003 Barcelona, España</p>
                        <p><strong>Teléfono:</strong> 936 854 874</p>
                        <p><strong>Email:</strong> drivesould_responde@drivesoul.es</p>
                    </div>

                    {/* Bloque del Formulario */}
                    <div className="bloque-formulario">
                        <p className="info-importante">💬 Cuéntanos tu consulta y nuestro equipo te responderá lo antes posible.</p>
                        <p className="info-importante">Déjanos tu Mensaje</p>
                        <form>
                            <label htmlFor="nombre">Nombre *</label>
                            <input type="text" id="nombre" required />

                            <label htmlFor="email">Email *</label>
                            <input type="email" id="email" required />

                            <label htmlFor="mensaje">Mensaje *</label>
                            <textarea id="mensaje" rows="4" required></textarea>

                            <button type="submit" className="btn-enviar">ENVIAR</button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Contacto;
