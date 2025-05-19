"use client";
import React from 'react';
import NavegadorMenu from '../../../component/Pages/Menu/Navegador';
import Footer from '../../../component/footer';
import '../../Noticias/noticias.css';

export default function DetalleMercedesBenz() {
  const fechaPublicacion = "18 Mayo 2025";
  const imagenPrincipal = "/FOTOS/NOTICIAS/MERCEDES BENZ.png";
  const videoUrl = "https://www.youtube.com/embed/Z97oTgtn_VU";
  const tituloPrincipal = "Mercedes-Benz Clase E: Elegancia Tecnológica";

  // Adaptamos las características al formato de 'datosTecnicos'
  const datosTecnicos = [
    { etiqueta: "Motorización", valor: "Híbrida Enchufable" },
    { etiqueta: "Tecnología Principal", valor: "MBUX Hyperscreen" },
    { etiqueta: "Iluminación Avanzada", valor: "Digital Light" },
    { etiqueta: "Bienestar Interior", valor: "Confort Energizing Plus" },
    { etiqueta: "Agilidad Dinámica", valor: "Eje Trasero Direccional" },
  ];

  return (
    <>
      <NavegadorMenu />
      <div className="noticias-container" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        
        <div className="detalle-noticia-articulo-container-v4">

          <img 
            src={imagenPrincipal} 
            alt="Mercedes-Benz Clase E" 
            className="detalle-noticia-imagen-hero-v4" 
          />

          <div className="detalle-noticia-encabezado-v4">
            <h1 className="detalle-noticia-titulo-v4">{tituloPrincipal}</h1>
            <p className="detalle-noticia-fecha-v4">Publicado: {fechaPublicacion}</p>
          </div>

          <div className="detalle-noticia-cuerpo-v4">
            <h2>Análisis Profundo: Lujo, Rendimiento y Conectividad</h2>
            <p>
              El <strong>Mercedes-Benz Clase E</strong> se consolida una vez más como el referente en la categoría de berlinas ejecutivas. Su diseño exterior, una evolución sofisticada de líneas clásicas, irradia prestigio, mientras que el interior es un santuario de lujo y tecnología punta.
            </p>
            <p>
              <strong>Innovaciones y Características Clave:</strong>
            </p>
            <ul>
              <li><strong>MBUX Hyperscreen (Opcional):</strong> Una impresionante pantalla curva que abarca todo el ancho del salpicadero, fusionando inteligencia artificial con una interfaz de usuario intuitiva.</li>
              <li><strong>Motorizaciones Electrificadas:</strong> Opciones híbridas enchufables que ofrecen una autonomía eléctrica sorprendente para el día a día, sin sacrificar el rendimiento dinámico característico de Mercedes.</li>
              <li><strong>Digital Light:</strong> Faros de alta definición que pueden proyectar información y advertencias directamente sobre la carretera, llevando la seguridad activa a un nuevo nivel.</li>
              <li><strong>Confort Energizing Plus:</strong> Programas que ajustan la climatización, iluminación, música y masaje de los asientos para crear ambientes que mejoran el bienestar del conductor y pasajeros.</li>
              <li><strong>Eje Trasero Direccional:</strong> Mejora la agilidad a bajas velocidades y la estabilidad en carretera, ofreciendo una maniobrabilidad sorprendente para su tamaño.</li>
            </ul>
            <p>
              Conducir el Clase E es una experiencia que envuelve los sentidos. La calidad de los materiales, el silencio de marcha y la respuesta de sus motores configuran un vehículo que no solo cumple, sino que supera las expectativas más exigentes. Es la perfecta simbiosis entre tradición e innovación, diseñada para aquellos que valoran la excelencia en cada detalle.
            </p>
          </div>

          <div className="detalle-noticia-specs-block-usuario">
            <h3>Características Destacadas</h3> 
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
                title="Mercedes-Benz Clase E Video Review"
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
