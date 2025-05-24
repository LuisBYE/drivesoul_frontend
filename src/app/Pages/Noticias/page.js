"use client";
import React, { useState, useEffect } from "react";
import NavegadorMenu from '../../component/Pages/Menu/Navegador';
import Footer from "../../component/footer";
import PageBanner from '../../components/PageBanner';
import "./noticias.css";
import '../../styles/global.css';

// Nuevo componente para la tarjeta de video individual
function VideoCardItem({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    // Expresión regular para extraer el ID de varias URLs de YouTube
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(video.videoUrl);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '/placeholder-video.jpg'; // Usar un placeholder si no hay ID

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="video-card">
      {!isPlaying ? (
        <div className="video-thumbnail-container" onClick={handlePlay}>
          <img src={thumbnailUrl} alt={video.titulo} className="video-thumbnail-img" loading="lazy" />
          <div className="play-button-overlay">
            <svg viewBox="0 0 24 24" fill="currentColor" width="60px" height="60px">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="video-container">
          <iframe
            className="video-iframe"
            src={`${video.videoUrl}${video.videoUrl.includes('?') ? '&' : '?'}autoplay=1`}
            title={video.titulo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className="video-info">
        <h3 className="video-titulo">{video.titulo}</h3>
        <p className="video-descripcion">{video.descripcion}</p>
      </div>
    </div>
  );
}

export default function Noticias() {
  // Datos para guías de compra
  const guiasCompra = [
    {
      id: 1,
      titulo: "Toyota Camry 2025: Prueba completa",
      descripcion: "Opinión detallada tras dos semanas de pruebas",
      videoUrl: "https://www.youtube.com/embed/p4_-CXCnoNI",
      categoria: "sedan"
    },
    {
      id: 2,
      titulo: "BMW X5 2025: Lo bueno y lo malo",
      descripcion: "Analizamos el nuevo X5 en carretera y ciudad",
      videoUrl: "https://www.youtube.com/embed/aOSb7gxgy_8",
      categoria: "suv"
    },
    {
      id: 3,
      titulo: "Ford Mustang Mach-E: Guía de compra",
      descripcion: "¿Merece la pena el SUV eléctrico de Ford?",
      videoUrl: "https://www.youtube.com/embed/O00OjUJ3f1I",
      categoria: "electricos"
    },
    {
      id: 4,
      titulo: "Audi A3 vs Mercedes Clase A",
      descripcion: "¿Cuál es el mejor compacto premium?",
      videoUrl: "https://www.youtube.com/embed/IdXp0Yc5szk",
      categoria: "compacto"
    }
  ];

  // Datos para recomendaciones
  const recomendados = [
    {
      id: 1,
      titulo: "Porsche 911 GT3 RS: LA BESTIA",
      descripcion: "Conducimos el 911 más radical en circuito",
      videoUrl: "https://www.youtube.com/embed/GXBVFlXpFrE",
      categoria: "deportivos"
    },
    {
      id: 2,
      titulo: "10 coches de segunda mano con mejor relación calidad-precio",
      descripcion: "Las mejores ofertas del mercado",
      videoUrl: "https://www.youtube.com/embed/dhKt6SzetGk",
      categoria: "guias"
    },
    {
      id: 3,
      titulo: "Lamborghini Revuelto: Primer contacto",
      descripcion: "El híbrido de 1000CV que lo cambia todo",
      videoUrl: "https://www.youtube.com/embed/fVzPOXs5niA",
      categoria: "deportivos"
    },
    {
      id: 4,
      titulo: "Ferrari SF90 vs McLaren Artura",
      descripcion: "Enfrentamos a dos híbridos de altas prestaciones",
      videoUrl: "https://www.youtube.com/embed/g7Ex1HmBlj8",
      categoria: "deportivos"
    }
  ];

  // Datos de las noticias destacadas (sin cambios en su estructura)
  const noticiasDestacadas = [
    {
      id: 1,
      titulo: "Nuevo Hyundai Ioniq 6: Innovación Eléctrica",
      fecha: "19 Mayo 2025",
      texto: "Descubre el diseño aerodinámico y la avanzada tecnología del Hyundai Ioniq 6, un referente en movilidad sostenible y eficiencia.",
      imagen: "/FOTOS/NOTICIAS/Hyundai Ioniq 6.png",
      enlace: "/Pages/Noticias/DetalleHyundaiIoniq"
    },
    {
      id: 2,
      titulo: "Mercedes-Benz Clase E: Lujo y Prestaciones",
      fecha: "18 Mayo 2025",
      texto: "El Mercedes-Benz Clase E redefine la elegancia y el confort, combinando un rendimiento excepcional con las últimas innovaciones en asistencia al conductor.",
      imagen: "/FOTOS/NOTICIAS/MERCEDES BENZ.png",
      enlace: "/Pages/Noticias/DetalleMercedesBenz"
    },
    {
      id: 3,
      titulo: "Toyota Corolla 2025: Fiabilidad y Eficiencia Renovadas",
      fecha: "17 Mayo 2025",
      texto: "El Toyota Corolla sigue siendo un líder en su segmento, ahora con un diseño actualizado, mayor eficiencia de combustible y tecnología mejorada.",
      imagen: "/FOTOS/NOTICIAS/toyota yaris.png", // Asumiendo que esta imagen es correcta para el Corolla según discusiones previas
      enlace: "/Pages/Noticias/DetalleToyotaCorolla"
    }
  ];

  /* 
  // El useEffect para IntersectionObserver de iframes se comenta/elimina 
  // ya que ahora los iframes se cargan al hacer clic.
  useEffect(() => {
    const videoElements = document.querySelectorAll('.video-iframe');
    // ... resto del observer ...
    return () => {
      // ... limpieza ...
    };
  }, []);
  */

  return (
    <>
      <NavegadorMenu />
      <div className="noticias-container noticias-page">
        {/* Banner superior */}
        <PageBanner
          title="NOTICIAS DEL MOTOR"
          subtitle="Mantente al día con las últimas novedades, pruebas y guías del mundo del motor."
          backgroundImage="/FOTOS/fot.jpg"
        />

        {/* Sección Noticias Destacadas */}
        <section className="seccion-noticias" style={{marginTop: '80px'}}>
          <div className="seccion-titulo-container">
            <h2 className="seccion-titulo">ÚLTIMAS NOVEDADES</h2>
          </div>
          <div className="ultimas-noticias-container">
            {noticiasDestacadas.map(noticia => (
              <div key={noticia.id} className="noticia-destacada">
                <img src={noticia.imagen} alt={noticia.titulo} className="noticia-img" />
                <div className="noticia-content">
                  <p className="noticia-fecha">{noticia.fecha}</p>
                  <h3 className="noticia-titulo">{noticia.titulo}</h3>
                  <p className="noticia-texto">{noticia.texto}</p>
                  <a href={noticia.enlace} className="noticia-btn">Leer Más</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GUÍAS DE COMPRA */}
        <section className="seccion-noticias">
          <div className="seccion-titulo-container">
            <h2 className="seccion-titulo">GUÍAS DE COMPRA</h2>
          </div>
          <p className="seccion-descripcion">
            Analizamos los coches más populares del mercado con todas nuestras opiniones y videos
          </p>
          <div className="videos-grid">
            {guiasCompra.map(video => (
              <VideoCardItem key={video.id} video={video} />
            ))}
          </div>
        </section>
        
        {/* RECOMENDADOS */}
        <section className="seccion-noticias">
          <div className="seccion-titulo-container">
            <h2 className="seccion-titulo">TE RECOMENDAMOS</h2>
          </div>
          <p className="seccion-descripcion">
            Nuestras recomendaciones y contenido más popular
          </p>
          <div className="videos-grid">
            {recomendados.map(video => (
              <VideoCardItem key={video.id} video={video} />
            ))}
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
}