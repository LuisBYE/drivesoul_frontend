"use client";
import React from 'react';
import NavegadorMenu from '../../../component/Pages/Menu/Navegador';
import Footer from '../../../component/footer';
import '../../Noticias/noticias.css'; 

export default function DetalleHyundaiIoniq() {
  const fechaPublicacion = "19 Mayo 2025";
  const imagenPrincipal = "/FOTOS/NOTICIAS/Hyundai Ioniq 6.png";
  const videoUrl = "https://www.youtube.com/embed/i_IE1q0H2O8";

  const datosTecnicos = [
    { etiqueta: "Potencia", valor: "Hasta 325 CV" },
    { etiqueta: "Batería", valor: "77.4 kWh" },
    { etiqueta: "Autonomía", valor: "+610 km (WLTP)" },
    { etiqueta: "Consumo", valor: "Desde 13.9 kWh/100km" },
    { etiqueta: "0-100 km/h", valor: "5.1s" },
    { etiqueta: "Coef. Aerodinámico", valor: "0.21 Cd" }
  ];

  return (
    <>
      <NavegadorMenu />
      <div className="noticias-container" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        
        {/* Contenedor principal del artículo con el nuevo diseño v4 */}
        <div className="detalle-noticia-articulo-container-v4">

          {/* Imagen Hero Destacada */}
          <img 
            src={imagenPrincipal} 
            alt="Hyundai Ioniq 6 en carretera" 
            className="detalle-noticia-imagen-hero-v4" 
          />

          {/* Encabezado del Artículo: Título y Fecha */}
          <div className="detalle-noticia-encabezado-v4">
            <h1 className="detalle-noticia-titulo-v4">Hyundai Ioniq 6: Pura Innovación Eléctrica</h1>
            <p className="detalle-noticia-fecha-v4">Publicado: {fechaPublicacion}</p>
          </div>

          {/* Cuerpo del Artículo: Review y Características */}
          <div className="detalle-noticia-cuerpo-v4">
            <h2>Análisis Detallado</h2>
            <p>
              El <strong>Hyundai Ioniq 6</strong> no es solo un coche, es una declaración de intenciones sobre el futuro de la movilidad eléctrica. Su diseño 'streamliner' no solo cautiva miradas, sino que optimiza la eficiencia aerodinámica hasta alcanzar un increíble coeficiente de 0.21.
            </p>
            <p>
              <strong>Avances y Características:</strong>
            </p>
            <ul>
              <li><strong>Plataforma E-GMP:</strong> Arquitectura modular para un interior espacioso y confort superior.</li>
              <li><strong>Carga Ultrarrápida 800V:</strong> Del 10% al 80% en solo 18 minutos.</li>
              <li><strong>Interior Digital y Sostenible:</strong> Doble pantalla de 12.3" y materiales ecológicos.</li>
              <li><strong>Hyundai SmartSense:</strong> Avanzados sistemas ADAS para conducción segura.</li>
              <li><strong>V2L (Vehicle-to-Load):</strong> Funcionalidad para alimentar dispositivos externos.</li>
            </ul>
            <p>
              Una obra maestra de ingeniería que redefine la experiencia de conducción eléctrica.
            </p>
          </div>

          {/* Bloque de Especificaciones Clave (mantiene su diseño anterior) */}
          <div className="detalle-noticia-specs-block-usuario">
            <h3>Especificaciones Clave</h3>
            <div className="detalle-noticia-specs-grid-usuario">
              {datosTecnicos.map(dato => (
                <div key={dato.etiqueta} className="detalle-noticia-spec-item-usuario">
                  <span className="spec-label">{dato.etiqueta}</span>
                  <span className="spec-value">{dato.valor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sección del Video (mantiene su diseño anterior) */}
          <div className="detalle-noticia-seccion-video-usuario">
            <div className="detalle-noticia-video-wrapper-usuario">
              <iframe 
                src={videoUrl} 
                title="Hyundai Ioniq 6 Video Review" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div> {/* Fin de detalle-noticia-articulo-container-v4 */}
      </div>
      <Footer />
    </>
  );
}
