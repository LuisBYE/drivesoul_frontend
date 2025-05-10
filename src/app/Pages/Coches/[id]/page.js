'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NavegadorMenu from '../../../component/Pages/Menu/Navegador';
import { obtenerGradiente } from '../../../Utils/Coches/coloresCoches';
import './detalles.css';

export default function DetallesCoche() {
  const router = useRouter();
  const [coche, setCoche] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  const getImagenesCoche = (modelo_id) => {
    const rutasBase = {
      1: 'SEATIBIZAROJO',
      2: 'HYUNDAII30NFASTBACK',
      90: 'SEATLEONBLANCO',
      91: 'SEATARONAAZUL',
      92: 'HYUNDAITUCSONGRIS',
      93: 'HYUNDAIKONA',
      94: 'AUDIA3NEGRO',
      95: 'AUDIA4AZUL',
      96: 'AUDIQ5BLANCO',
      97: 'VOLKSWAGENGOLFGRIS',
      98: 'VOLKSWAGENPOLOROJO',
      99: 'VOLKSWAGENTROCNEGRO',
      100: 'PEUGEOT208AZUL',
      101: 'PEUGEOT3008BLANCO',
      102: 'PEUGEOT508GRIS2023',
      103: 'MERCEDESCLASEANEGRO',
      104: 'MERCEDESCLASECROJO',
      105: 'MERCEDES GLCAZUL'
    };

    const extensiones = {
      1: ['.jpg', '.jpg', '.webp', '.png'],
      2: ['.png', '.png', '.png', '.png'],
      90: ['.jpg', '.jpg', '.jpg', '.jpg'],
      91: ['.png', '.png', '.png', '.png'],
      92: ['.png', '.png', '.png', '.png'],
      93: ['.jpg', '.jpg', '.png', '.jpg'],
      94: ['.png', '.png', '.png', '.png'],
      95: ['.png', '.png', '.png', '.png'],
      96: ['.png', '.png', '.png', '.png'],
      97: ['.png', '.png', '.png', '.png'],
      98: ['.png', '.png', '.png', '.png'],
      99: ['.png', '.png', '.png', '.png'],
      100: ['.png', '.png', '.png', '.png'],
      101: ['.png', '.png', '.png', '.png'],
      102: ['.png', '.png', '.png', '.png'],
      103: ['.png', '.png', '.png', '.png'],
      104: ['.jpeg', '.jpeg', '.jpeg', '.png'],
      105: ['.png', '.png', '.png', '.png']
    };

    if (!rutasBase[modelo_id]) return ['/FOTOS/COCHES/default.jpg'];

    return [1, 2, 3, 4].map((num, index) => 
      `/FOTOS/COCHES/${rutasBase[modelo_id]}/${num}${extensiones[modelo_id][index]}`
    );
  };

  // CARGA INICIAL DE DATOS
  useEffect(() => {
    const cocheData = localStorage.getItem('cocheSeleccionado');
    if (cocheData) {
      const parsedCoche = JSON.parse(cocheData);
      setCoche(parsedCoche);
      setImages(getImagenesCoche(parsedCoche.modelo_id));
    }
  }, []);

  // AUTOPLAY DEL CARRUSEL
  useEffect(() => {
    const timer = setInterval(() => {
      if (images.length > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    }, 15000);
    return () => clearInterval(timer);
  }, [images]);

  if (!coche) {
    return (
      <div>
        <NavegadorMenu />
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div>No se encontró información del vehículo</div>
          <button 
            onClick={() => router.push('/Pages/Catalogo')}
            style={{
              background: '#ff0000',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              marginTop: '20px',
              cursor: 'pointer'
            }}
          >
            Volver al Catálogo
          </button>
        </div>
      </div>
    );
  }

  // OBTENER COLORES SEGÚN EL COLOR DEL COCHE
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
                <button onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}>
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              
              <div className="thumbnail-container">
                {images.map((img, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                    style={{ borderColor: colores.acento }}
                  >
                    <img src={img} alt={`Miniatura ${index + 1}`} />
                  </div>
                ))}
              </div>
            </>
          )}
          
          {coche.tipo_combustible.toLowerCase() === 'híbrido' && (
            <div className="eco-badge">
              ECO
            </div>
          )}
        </div>

        <div className="info-container" style={{ background: colores.fondo }}>
          <div style={{ position: 'relative', paddingRight: '120px', marginBottom: '40px' }}>
            <h1 className="titulo-coche">{coche.nombre}</h1>
            <button 
              onClick={() => router.push('/Pages/Catalogo')}
              style={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#ff0000',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Catálogo
            </button>
            <div>
              <div className="precio-actual" style={{ color: colores.acento }}>{coche.precio.toLocaleString('es-ES')} €</div>
              <div className="precio-mensual">
                Desde {Math.round(coche.precio / 72).toLocaleString('es-ES')} €/mes*
              </div>
            </div>
          </div>

          <div className="specs-grid">
            {[
              { icon: 'calendar-alt', label: 'Año', value: coche.anio },
              { icon: 'road', label: 'Kilómetros', value: `${coche.kilometraje.toLocaleString('es-ES')} km` },
              { icon: 'gas-pump', label: 'Combustible', value: coche.tipo_combustible },
              { icon: 'cog', label: 'Transmisión', value: coche.transmision },
              { icon: 'palette', label: 'Color', value: coche.color },
              { icon: 'car', label: 'Estado', value: coche.kilometraje === 0 ? 'Nuevo' : 'Usado' }
            ].map((spec, index) => (
              <div key={index} className="spec-item">
                <div className="spec-icon" style={{ background: colores.acento }}>
                  <i className={`fas fa-${spec.icon}`}></i>
                </div>
                <div className="spec-content">
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              </div>
            ))}
          </div>

          <button style={{
            background: colores.acento,
            color: 'white',
            border: 'none',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '1.2rem',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%'
          }}>
            Me interesa
          </button>
        </div>
      </div>
    </div>
  );
}