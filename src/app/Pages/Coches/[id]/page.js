'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import NavegadorMenu from '../../../component/Pages/Menu/Navegador';

export default function DetallesCoche() {
  const params = useParams();
  const coche = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cocheSeleccionado')) : null;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (coche) {
      // Cargar las imágenes del coche según el modelo_id
      const imagenes = getImagenesCoches(coche.modelo_id);
      setImages(imagenes);
    }
  }, [coche]);

  // Función para obtener el gradiente según el color del coche
  const obtenerGradiente = (color) => {
    const gradientes = {
      'rojo': {
        fondo: 'linear-gradient(135deg, #1a1a1a 0%, #8B3A3A 100%)',
        acento: '#FF9999',
        texto: '#FFB3B3'
      },
      'azul': {
        fondo: 'linear-gradient(135deg, #1a1a1a 0%, #2c5282 100%)',
        acento: '#64B5F6',
        texto: '#90CAF9'
      },
      'negro': {
        fondo: 'linear-gradient(135deg, #1a1a1a 0%, #404040 100%)',
        acento: '#757575',
        texto: '#9E9E9E'
      },
      'blanco': {
        fondo: 'linear-gradient(135deg, #1a1a1a 0%, #4A4A4A 100%)',
        acento: '#E0E0E0',
        texto: '#BDBDBD'
      },
      'gris': {
        fondo: 'linear-gradient(135deg, #1a1a1a 0%, #455A64 100%)',
        acento: '#90A4AE',
        texto: '#B0BEC5'
      },
      'plata': {
        fondo: 'linear-gradient(135deg, #1a1a1a 0%, #546E7A 100%)',
        acento: '#B0BEC5',
        texto: '#CFD8DC'
      },
      'verde': {
        fondo: 'linear-gradient(135deg, #1a1a1a 0%, #2E7D32 100%)',
        acento: '#81C784',
        texto: '#A5D6A7'
      },
      'amarillo': {
        fondo: 'linear-gradient(135deg, #1a1a1a 0%, #856D00 100%)',
        acento: '#FFD54F',
        texto: '#FFE082'
      }
    };

    // Convertir el color a minúsculas para la comparación
    const colorLower = color.toLowerCase();
    
    // Devolver el gradiente correspondiente o un valor por defecto
    return gradientes[colorLower] || {
      fondo: 'linear-gradient(135deg, #1a1a1a 0%, #2c5282 100%)',
      acento: '#64B5F6',
      texto: '#90CAF9'
    };
  };

  // Función para obtener todas las imágenes del coche según su modelo_id
  const getImagenesCoches = (modelo_id) => {
    const rutasImagenesPorModelo = {
      1: [
        '/FOTOS/COCHES/SEATIBIZAROJO/1.jpg',
        '/FOTOS/COCHES/SEATIBIZAROJO/2.jpg',
        '/FOTOS/COCHES/SEATIBIZAROJO/3.webp',
        '/FOTOS/COCHES/SEATIBIZAROJO/4.png'
      ],
      2: [
        '/FOTOS/COCHES/HYUNDAII30NFASTBACK/1.png',
        '/FOTOS/COCHES/HYUNDAII30NFASTBACK/2.png',
        '/FOTOS/COCHES/HYUNDAII30NFASTBACK/3.png',
        '/FOTOS/COCHES/HYUNDAII30NFASTBACK/4.png'
      ],
      90: [
        '/FOTOS/COCHES/SEATLEONBLANCO/1.jpg',
        '/FOTOS/COCHES/SEATLEONBLANCO/2.jpg',
        '/FOTOS/COCHES/SEATLEONBLANCO/3.jpg',
        '/FOTOS/COCHES/SEATLEONBLANCO/4.jpg'
      ],
      91: [
        '/FOTOS/COCHES/SEATARONAAZUL/1.jpg',
        '/FOTOS/COCHES/SEATARONAAZUL/2.jpg',
        '/FOTOS/COCHES/SEATARONAAZUL/3.jpg',
        '/FOTOS/COCHES/SEATARONAAZUL/4.jpg'
      ],
      92: [
        '/FOTOS/COCHES/HYUNDAITUCSONGRIS/1.jpg',
        '/FOTOS/COCHES/HYUNDAITUCSONGRIS/2.jpg',
        '/FOTOS/COCHES/HYUNDAITUCSONGRIS/3.jpg',
        '/FOTOS/COCHES/HYUNDAITUCSONGRIS/4.jpg'
      ],
      93: [
        '/FOTOS/COCHES/HYUNDAIKONA/1.jpg',
        '/FOTOS/COCHES/HYUNDAIKONA/2.jpg',
        '/FOTOS/COCHES/HYUNDAIKONA/3.jpg',
        '/FOTOS/COCHES/HYUNDAIKONA/4.jpg'
      ],
      94: [
        '/FOTOS/COCHES/AUDIA3NEGRO/1.jpg',
        '/FOTOS/COCHES/AUDIA3NEGRO/2.jpg',
        '/FOTOS/COCHES/AUDIA3NEGRO/3.jpg',
        '/FOTOS/COCHES/AUDIA3NEGRO/4.jpg'
      ],
      95: [
        '/FOTOS/COCHES/AUDIA4AZUL/1.jpg',
        '/FOTOS/COCHES/AUDIA4AZUL/2.jpg',
        '/FOTOS/COCHES/AUDIA4AZUL/3.jpg',
        '/FOTOS/COCHES/AUDIA4AZUL/4.jpg'
      ],
      96: [
        '/FOTOS/COCHES/AUDIQ5BLANCO/1.jpg',
        '/FOTOS/COCHES/AUDIQ5BLANCO/2.jpg',
        '/FOTOS/COCHES/AUDIQ5BLANCO/3.jpg',
        '/FOTOS/COCHES/AUDIQ5BLANCO/4.jpg'
      ],
      97: [
        '/FOTOS/COCHES/VOLKSWAGENGOLFGRIS/1.jpg',
        '/FOTOS/COCHES/VOLKSWAGENGOLFGRIS/2.jpg',
        '/FOTOS/COCHES/VOLKSWAGENGOLFGRIS/3.jpg',
        '/FOTOS/COCHES/VOLKSWAGENGOLFGRIS/4.jpg'
      ],
      98: [
        '/FOTOS/COCHES/VOLKSWAGENPOLOROJO/1.jpg',
        '/FOTOS/COCHES/VOLKSWAGENPOLOROJO/2.jpg',
        '/FOTOS/COCHES/VOLKSWAGENPOLOROJO/3.jpg',
        '/FOTOS/COCHES/VOLKSWAGENPOLOROJO/4.jpg'
      ],
      99: [
        '/FOTOS/COCHES/VOLKSWAGENTROCNEGRO/1.jpg',
        '/FOTOS/COCHES/VOLKSWAGENTROCNEGRO/2.jpg',
        '/FOTOS/COCHES/VOLKSWAGENTROCNEGRO/3.jpg',
        '/FOTOS/COCHES/VOLKSWAGENTROCNEGRO/4.jpg'
      ],
      100: [
        '/FOTOS/COCHES/PEUGEOT208AZUL/1.jpg',
        '/FOTOS/COCHES/PEUGEOT208AZUL/2.jpg',
        '/FOTOS/COCHES/PEUGEOT208AZUL/3.jpg',
        '/FOTOS/COCHES/PEUGEOT208AZUL/4.jpg'
      ],
      101: [
        '/FOTOS/COCHES/PEUGEOT3008BLANCO/1.jpg',
        '/FOTOS/COCHES/PEUGEOT3008BLANCO/2.jpg',
        '/FOTOS/COCHES/PEUGEOT3008BLANCO/3.jpg',
        '/FOTOS/COCHES/PEUGEOT3008BLANCO/4.jpg'
      ],
      102: [
        '/FOTOS/COCHES/PEUGEOT508GRIS2023/1.jpg',
        '/FOTOS/COCHES/PEUGEOT508GRIS2023/2.jpg',
        '/FOTOS/COCHES/PEUGEOT508GRIS2023/3.jpg',
        '/FOTOS/COCHES/PEUGEOT508GRIS2023/4.jpg'
      ],
      103: [
        '/FOTOS/COCHES/MERCEDESCLASEANEGRO/1.jpg',
        '/FOTOS/COCHES/MERCEDESCLASEANEGRO/2.jpg',
        '/FOTOS/COCHES/MERCEDESCLASEANEGRO/3.jpg',
        '/FOTOS/COCHES/MERCEDESCLASEANEGRO/4.jpg'
      ],
      104: [
        '/FOTOS/COCHES/MERCEDESCLASECROJO/1.jpg',
        '/FOTOS/COCHES/MERCEDESCLASECROJO/2.jpg',
        '/FOTOS/COCHES/MERCEDESCLASECROJO/3.jpg',
        '/FOTOS/COCHES/MERCEDESCLASECROJO/4.jpg'
      ],
      105: [
        '/FOTOS/COCHES/MERCEDES GLCAZUL/1.jpg',
        '/FOTOS/COCHES/MERCEDES GLCAZUL/2.jpg',
        '/FOTOS/COCHES/MERCEDES GLCAZUL/3.jpg',
        '/FOTOS/COCHES/MERCEDES GLCAZUL/4.jpg'
      ]
    };
    
    return rutasImagenesPorModelo[modelo_id] || ['/FOTOS/COCHES/default.jpg'];
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!coche) {
    return (
      <div>
        <NavegadorMenu />
        <div style={{ textAlign: 'center', padding: '20px' }}>No se encontró información del vehículo</div>
      </div>
    );
  }

  const colores = obtenerGradiente(coche.color);

  return (
    <div className="detalles-page">
      <NavegadorMenu />
      
      <div className="hero-section">
        <div className="imagen-container">
          {images.length > 0 && (
            <>
              <img
                src={images[currentImageIndex]}
                alt={`${coche.nombre} - Imagen ${currentImageIndex + 1}`}
                className="imagen-principal"
              />
              
              <div className="carousel-controls">
                <button className="control-button prev" onClick={prevImage}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="control-button next" onClick={nextImage}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              
              <div className="thumbnail-container">
                {images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={img} alt={`Miniatura ${index + 1}`} />
                  </div>
                ))}
              </div>
            </>
          )}
          
          {coche.tipo_combustible.toLowerCase() === 'híbrido' && (
            <div className="eco-badge">ECO</div>
          )}
        </div>

        <div className="info-container">
          <div className="header-content">
            <h1 className="titulo-coche">{coche.nombre}</h1>
            <div className="precio-container">
              <div className="precio-actual">{coche.precio.toLocaleString('es-ES')} €</div>
              <div className="precio-mensual">
                Desde {Math.round(coche.precio / 72).toLocaleString('es-ES')} €/mes*
              </div>
            </div>
          </div>

          <div className="specs-grid">
            <div className="spec-item">
              <div className="spec-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="spec-content">
                <span className="spec-label">Año</span>
                <span className="spec-value">{coche.anio}</span>
              </div>
            </div>

            <div className="spec-item">
              <div className="spec-icon">
                <i className="fas fa-road"></i>
              </div>
              <div className="spec-content">
                <span className="spec-label">Kilómetros</span>
                <span className="spec-value">{coche.kilometraje.toLocaleString('es-ES')} km</span>
              </div>
            </div>

            <div className="spec-item">
              <div className="spec-icon">
                <i className="fas fa-gas-pump"></i>
              </div>
              <div className="spec-content">
                <span className="spec-label">Combustible</span>
                <span className="spec-value">{coche.tipo_combustible}</span>
              </div>
            </div>

            <div className="spec-item">
              <div className="spec-icon">
                <i className="fas fa-cog"></i>
              </div>
              <div className="spec-content">
                <span className="spec-label">Transmisión</span>
                <span className="spec-value">{coche.transmision}</span>
              </div>
            </div>

            <div className="spec-item">
              <div className="spec-icon">
                <i className="fas fa-palette"></i>
              </div>
              <div className="spec-content">
                <span className="spec-label">Color</span>
                <span className="spec-value">{coche.color}</span>
              </div>
            </div>

            <div className="spec-item">
              <div className="spec-icon">
                <i className="fas fa-car"></i>
              </div>
              <div className="spec-content">
                <span className="spec-label">Estado</span>
                <span className="spec-value">{coche.kilometraje === 0 ? 'Nuevo' : 'Usado'}</span>
              </div>
            </div>
          </div>

          <button className="boton-contacto">
            Me interesa
          </button>
        </div>
      </div>

      <style jsx>{`
        .detalles-page {
          min-height: 100vh;
          background-color: #0a0a0a;
          color: white;
        }

        .hero-section {
          display: grid;
          grid-template-columns: 65fr 35fr;
          min-height: calc(100vh - 64px);
        }

        .imagen-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: calc(100vh - 64px);
        }

        .imagen-principal {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .carousel-controls {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          transform: translateY(-50%);
          padding: 0 20px;
        }

        .control-button {
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s, transform 0.3s;
        }

        .control-button:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: scale(1.1);
        }

        .thumbnail-container {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 10px;
          padding: 0 20px;
        }

        .thumbnail {
          width: 80px;
          height: 60px;
          border: 2px solid transparent;
          border-radius: 5px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s, border-color 0.3s;
        }

        .thumbnail.active {
          border-color: ${colores.acento};
          transform: scale(1.1);
        }

        .thumbnail:hover {
          transform: scale(1.05);
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .eco-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #4CAF50;
          color: white;
          padding: 8px 16px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
          z-index: 10;
        }

        .info-container {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: ${colores.fondo};
        }

        .header-content {
          margin-bottom: 40px;
        }

        .titulo-coche {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 20px;
          background: linear-gradient(45deg, #ffffff 30%, ${colores.texto} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleFade 1s ease-in;
        }

        @keyframes titleFade {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .precio-container {
          animation: priceFade 1s ease-in 0.3s both;
        }

        @keyframes priceFade {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .precio-actual {
          font-size: 2.5rem;
          font-weight: 700;
          color: ${colores.acento};
          margin-bottom: 8px;
        }

        .precio-mensual {
          font-size: 1.1rem;
          color: ${colores.texto};
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-bottom: 40px;
          animation: specsFade 1s ease-in 0.6s both;
        }

        @keyframes specsFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .spec-item:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
        }

        .spec-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${colores.acento};
          border-radius: 50%;
          font-size: 1.2rem;
        }

        .spec-content {
          display: flex;
          flex-direction: column;
        }

        .spec-label {
          font-size: 0.9rem;
          color: ${colores.texto};
        }

        .spec-value {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .boton-contacto {
          background: ${colores.acento};
          color: white;
          border: none;
          padding: 16px;
          border-radius: 12px;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          animation: buttonFade 1s ease-in 0.9s both;
        }

        @keyframes buttonFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .boton-contacto:hover {
          background: ${colores.texto};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px ${colores.acento}66;
        }

        @media (max-width: 1024px) {
          .hero-section {
            grid-template-columns: 1fr;
          }

          .imagen-container {
            height: 50vh;
            min-height: 400px;
          }

          .info-container {
            padding: 30px;
          }

          .titulo-coche {
            font-size: 2.5rem;
          }

          .specs-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}