'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import NavegadorMenu from '../../../component/Pages/Menu/Navegador';

export default function DetallesCoche() {
  const params = useParams();
  const coche = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cocheSeleccionado')) : null;

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
          <img
            src={coche.modelo_id === 1 ? '/FOTOS/COCHES/SEAT/IMG1.jpg' : '/FOTOS/COCHES/HYUNDAI/IMG1.webp'}
            alt={coche.nombre}
            className="imagen-principal"
          />
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
          grid-template-columns: 1fr 1fr;
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