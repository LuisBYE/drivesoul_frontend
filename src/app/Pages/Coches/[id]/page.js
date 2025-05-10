'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NavegadorMenu from '../../../component/Pages/Menu/Navegador';
import { getImagenesCoches } from '../../../Utils/Coches/imagenesCoches';
import { obtenerGradiente } from '../../../Utils/Coches/coloresCoches';
import './detalles.css';

export default function DetallesCoche() {
  const router = useRouter();
  const [coche, setCoche] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  // CARGA INICIAL DE DATOS
  useEffect(() => {
    const cocheData = localStorage.getItem('cocheSeleccionado');
    if (cocheData) {
      const parsedCoche = JSON.parse(cocheData);
      setCoche(parsedCoche);
      setImages(getImagenesCoches(parsedCoche.modelo_id));
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
              padding: '10px 20px',
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
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: '#4CAF50',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
              zIndex: '10'
            }}>
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