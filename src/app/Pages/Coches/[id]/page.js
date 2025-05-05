'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import NavegadorMenu from '../../../component/Pages/Menu/Navegador';
import Image from 'next/image';

export default function DetallesCoche() {
  const params = useParams();
  const [coche, setCoche] = useState(null);
  const [imagenActual, setImagenActual] = useState(0);
  const [cochesRecomendados, setCochesRecomendados] = useState([]);

  // Simular carga de datos del coche
  useEffect(() => {
    // Aquí deberías hacer la llamada a tu API para obtener los detalles del coche
    // Por ahora usamos datos de ejemplo
    const mockCoche = {
      id: params.id,
      nombre: "Seat Ibiza 2022",
      precio: 18500,
      anio: 2022,
      kilometraje: 15000,
      color: "Rojo",
      tipo_combustible: "Gasolina",
      transmision: "Manual",
      imagenes: [
        "/FOTOS/COCHES/SEAT/IMG1.jpg",
        // Añadir más imágenes cuando estén disponibles
      ],
      caracteristicas: {
        motor: "1.0 TSI 110CV",
        potencia: "110 CV",
        consumo: "5.5 L/100km",
        emisiones: "125 g/km CO2",
      },
      equipamiento: [
        "Climatizador automático",
        "Control de crucero",
        "Sensores de aparcamiento",
        "Pantalla táctil 8\"",
        "Android Auto / Apple CarPlay",
      ]
    };

    setCoche(mockCoche);

    // Simular carga de coches recomendados
    const mockRecomendados = [
      // Añadir coches recomendados similares
    ];
    setCochesRecomendados(mockRecomendados);
  }, [params.id]);

  if (!coche) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="detalles-page">
      <NavegadorMenu />

      <div className="contenido-principal">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span>Catálogo</span> {'>'} <span>{coche.nombre}</span>
        </div>

        <div className="detalles-grid">
          {/* Galería de imágenes */}
          <div className="galeria-container">
            <div className="imagen-principal">
              <img
                src={coche.imagenes[imagenActual]}
                alt={coche.nombre}
                className="imagen-detalle"
              />
            </div>
            <div className="miniaturas">
              {coche.imagenes.map((img, index) => (
                <div
                  key={index}
                  className={`miniatura ${index === imagenActual ? 'activa' : ''}`}
                  onClick={() => setImagenActual(index)}
                >
                  <img src={img} alt={`${coche.nombre} - Vista ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Información del coche */}
          <div className="info-container">
            <h1>{coche.nombre}</h1>
            
            <div className="precio-container">
              <div className="precio-actual">{coche.precio.toLocaleString('es-ES')} €</div>
              <div className="precio-mensual">
                Desde {Math.round(coche.precio / 72).toLocaleString('es-ES')} €/mes*
              </div>
            </div>

            <div className="specs-principales">
              <div className="spec-item">
                <span className="spec-label">Año</span>
                <span className="spec-value">{coche.anio}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Kilómetros</span>
                <span className="spec-value">{coche.kilometraje.toLocaleString('es-ES')} km</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Combustible</span>
                <span className="spec-value">{coche.tipo_combustible}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Transmisión</span>
                <span className="spec-value">{coche.transmision}</span>
              </div>
            </div>

            <div className="caracteristicas">
              <h2>Características técnicas</h2>
              <div className="caracteristicas-grid">
                {Object.entries(coche.caracteristicas).map(([key, value]) => (
                  <div key={key} className="caracteristica-item">
                    <span className="caracteristica-label">{key}</span>
                    <span className="caracteristica-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="equipamiento">
              <h2>Equipamiento</h2>
              <ul className="equipamiento-lista">
                {coche.equipamiento.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <button className="boton-contacto">
              Me interesa
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .detalles-page {
          background-color: #f5f5f5;
          min-height: 100vh;
        }

        .contenido-principal {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .breadcrumb {
          margin-bottom: 20px;
          color: #666;
        }

        .detalles-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .galeria-container {
          width: 100%;
        }

        .imagen-principal {
          width: 100%;
          height: 400px;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .imagen-detalle {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .miniaturas {
          display: flex;
          gap: 10px;
          overflow-x: auto;
        }

        .miniatura {
          width: 80px;
          height: 60px;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .miniatura.activa {
          opacity: 1;
          border: 2px solid #2c5282;
        }

        .miniatura img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .info-container {
          padding: 20px;
        }

        .info-container h1 {
          font-size: 2rem;
          color: #333;
          margin-bottom: 20px;
        }

        .precio-container {
          margin-bottom: 30px;
        }

        .precio-actual {
          font-size: 2rem;
          font-weight: 700;
          color: #2c5282;
        }

        .precio-mensual {
          font-size: 1.1rem;
          color: #666;
          margin-top: 5px;
        }

        .specs-principales {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .spec-item {
          display: flex;
          flex-direction: column;
        }

        .spec-label {
          font-size: 0.9rem;
          color: #666;
        }

        .spec-value {
          font-size: 1.1rem;
          font-weight: 500;
          color: #333;
        }

        .caracteristicas {
          margin-bottom: 30px;
        }

        .caracteristicas h2 {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 15px;
        }

        .caracteristicas-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .caracteristica-item {
          display: flex;
          flex-direction: column;
        }

        .caracteristica-label {
          font-size: 0.9rem;
          color: #666;
        }

        .caracteristica-value {
          font-size: 1rem;
          color: #333;
        }

        .equipamiento {
          margin-bottom: 30px;
        }

        .equipamiento h2 {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 15px;
        }

        .equipamiento-lista {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .equipamiento-lista li {
          padding: 8px 0;
          color: #333;
          position: relative;
          padding-left: 20px;
        }

        .equipamiento-lista li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #2c5282;
        }

        .boton-contacto {
          width: 100%;
          background-color: #2c5282;
          color: white;
          border: none;
          padding: 15px;
          border-radius: 6px;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .boton-contacto:hover {
          background-color: #2a4365;
        }

        @media (max-width: 768px) {
          .detalles-grid {
            grid-template-columns: 1fr;
          }

          .imagen-principal {
            height: 300px;
          }

          .specs-principales,
          .caracteristicas-grid,
          .equipamiento-lista {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
} 