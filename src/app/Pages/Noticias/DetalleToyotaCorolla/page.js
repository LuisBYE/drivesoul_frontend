"use client";
import React from 'react';
import NavegadorMenu from '../../../component/Pages/Menu/Navegador';
import Footer from '../../../component/footer';
import '../../Noticias/noticias.css';

export default function DetalleToyotaCorolla() {
  const fechaPublicacion = "17 Mayo 2025";
  const imagenPrincipal = "/FOTOS/NOTICIAS/toyota yaris.png"; // Mantenemos imagen yaris según original
  const videoUrl = "https://www.youtube.com/embed/KUlSCT_Kxq0";
  const tituloPrincipal = "Toyota Corolla 2025: Evolución Constante";

  const datosTecnicos = [
    { etiqueta: "Sistema Híbrido", valor: "5ª Generación" },
    { etiqueta: "Seguridad Activa", valor: "Toyota Safety Sense 3.0" },
    { etiqueta: "Sistema Multimedia", valor: "Toyota Smart Connect" },
    { etiqueta: "Panel Instrumentos", valor: "Digital 12.3 pulgadas" },
    { etiqueta: "Actualización Diseño", valor: "Refinado Exterior/Interior" },
  ];

  return (
    <>
      <NavegadorMenu />
      <div className="noticias-container" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        
        <div className="detalle-noticia-articulo-container-v4">

          <img 
            src={imagenPrincipal} 
            alt="Toyota Corolla 2025" // El alt puede seguir siendo Corolla
            className="detalle-noticia-imagen-hero-v4" 
          />

          <div className="detalle-noticia-encabezado-v4">
            <h1 className="detalle-noticia-titulo-v4">{tituloPrincipal}</h1>
            <p className="detalle-noticia-fecha-v4">Publicado: {fechaPublicacion}</p>
          </div>

          <div className="detalle-noticia-cuerpo-v4">
            <h2>A Fondo: Fiabilidad, Eficiencia y Tecnología Accesible</h2>
            <p>
              El <strong>Toyota Corolla 2025</strong> llega con una misión clara: seguir siendo el referente en fiabilidad y eficiencia, pero ahora con un plus de tecnología y un diseño más atractivo. Este icono automovilístico se renueva para ofrecer una experiencia de conducción aún más completa y satisfactoria.
            </p>
            <p>
              <strong>Principales Novedades y Fortalezas:</strong>
            </p>
            <ul>
              <li><strong>Sistema Híbrido de 5ª Generación:</strong> Más potente, más eficiente y con una respuesta más ágil. Disfruta de consumos reducidos sin renunciar a una conducción placentera.</li>
              <li><strong>Toyota Safety Sense 3.0:</strong> El paquete de seguridad activa más avanzado de Toyota, ahora con nuevas funciones como la Asistencia Proactiva a la Conducción y actualizaciones OTA (Over-The-Air).</li>
              <li><strong>Nuevo Sistema Multimedia Toyota Smart Connect:</strong> Con pantalla táctil de hasta 10.5 pulgadas, navegación conectada, asistente de voz mejorado y compatibilidad inalámbrica con Apple CarPlay y Android Auto.</li>
              <li><strong>Cuadro de Instrumentos Digital de 12.3 pulgadas:</strong> Totalmente personalizable para que tengas toda la información importante a tu vista, de forma clara y moderna.</li>
              <li><strong>Diseño Exterior e Interior Refinado:</strong> Nuevos faros, parrilla rediseñada y opciones de llantas que modernizan su imagen. En el interior, materiales de mayor calidad y una ergonomía cuidada al detalle.</li>
            </ul>
            <p>
              El Corolla 2025 no solo mantiene la legendaria fiabilidad que lo caracteriza, sino que se adapta a los nuevos tiempos con un equipamiento tecnológico de primer nivel y un sistema híbrido que sigue marcando la pauta. Es la elección inteligente para quienes buscan un coche completo, duradero y agradable de conducir cada día.
            </p>
          </div>

          <div className="detalle-noticia-specs-block-usuario">
            <h3>Novedades Destacadas</h3>
            <div className="detalle-noticia-specs-grid-usuario">
              {datosTecnicos.map(dato => (
                <div key={dato.etiqueta} className="detalle-noticia-spec-item-usuario">
                  <span className="spec-label">{dato.etiqueta}</span>
                  <span className="spec-value">{dato.valor}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="detalle-noticia-seccion-video-usuario">
            <div className="detalle-noticia-video-wrapper-usuario">
              <iframe 
                src={videoUrl} 
                title="Toyota Corolla 2025 Video Review"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
