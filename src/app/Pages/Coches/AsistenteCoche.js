"use client";
"use client";
import React, { useState, useEffect } from 'react';
import './asistenteCoche.css';
import NavegadorMenu from '../../component/Pages/Menu/Navegador';
import Footer from '../../component/footer';
import CardCoches from '../../Utils/Pages/CardCoches';
import PageBanner from '../../components/PageBanner';
import { bannerCoche, mockCoches } from './mockCoches';
import '../../styles/global.css';

const preguntasBase = [
  {
    key: "presupuesto",
    texto: "¿Cuál es tu presupuesto máximo?",
    opciones: [
      { label: "Menos de 20.000 €", value: 20000 },
      { label: "Hasta 25.000 €", value: 25000 },
      { label: "Hasta 30.000 €", value: 30000 },
      { label: "Hasta 40.000 €", value: 40000 },
      { label: "Sin límite", value: 100000 },
    ],
  },
  {
    key: "tipo_combustible",
    texto: "¿Qué tipo de combustible prefieres?",
    opciones: [], // Se rellena dinámicamente
  },
  {
    key: "transmision",
    texto: "¿Qué tipo de transmisión quieres?",
    opciones: [], // Se rellena dinámicamente
  },
  {
    key: "tipo_vehiculo",
    texto: "¿Qué tipo de vehículo prefieres?",
    opciones: [
      { label: "SUV", value: "SUV" },
      { label: "Urbano", value: "Urbano" },
      { label: "Deportivo", value: "Deportivo" },
      { label: "Familiar", value: "Familiar" },
      { label: "Compacto", value: "Compacto" },
      { label: "Berlina", value: "Berlina" },
    ],
  },
  {
    key: "marca",
    texto: "¿Qué marcas te gustan más?",
    opciones: [], // Se rellena dinámicamente
  },

];

const tipoVehiculoPorModelo = {
  // Puedes extender esto según el catálogo real
  "Ibiza": "Urbano",
  "i30 N Fastback": "Deportivo",
  "Leon": "Compacto",
  "Arona": "SUV",
  "Tucson": "SUV",
  "Kona": "SUV",
  "A3": "Compacto",
  "A4": "Berlina",
  "Q5": "SUV",
  "Golf": "Compacto",
  "Polo": "Urbano",
  "T-Roc": "SUV",
  "208": "Urbano",
  "3008": "SUV",
  "508": "Berlina",
  "Clase A": "Compacto",
  "Clase C": "Berlina",
  "GLC": "SUV",
};

function getOpcionesDinamicas(coches, key) {
  if (key === "tipo_combustible") {
    // Solo combustibles disponibles según presupuesto
    return Array.from(
      new Set(coches.map((c) => c.tipo_combustible))
    ).map((comb) => ({ label: comb, value: comb }));
  }
  if (key === "transmision") {
    return Array.from(
      new Set(coches.map((c) => c.transmision))
    ).map((t) => ({ label: t, value: t }));
  }
  if (key === "marca") {
    return Array.from(new Set(coches.map((c) => c.marca))).map((m) => ({ label: m, value: m }));
  }
  return [];
}

function getTipoVehiculo(modelo) {
  return tipoVehiculoPorModelo[modelo] || "Otro";
}

function getCoincidencias(coche, respuestas) {
  let score = 0;
  if (respuestas.presupuesto && coche.precio <= respuestas.presupuesto) score++;
  if (respuestas.tipo_combustible && coche.tipo_combustible === respuestas.tipo_combustible) score++;
  if (respuestas.transmision && coche.transmision === respuestas.transmision) score++;
  if (respuestas.tipo_vehiculo && getTipoVehiculo(coche.modelo) === respuestas.tipo_vehiculo) score++;
  if (respuestas.marca && coche.marca === respuestas.marca) score++;

  return score;
}

function RecomendacionesSimilares({ respuestas }) {
  // Calcula score de coincidencias para cada coche
  const scored = mockCoches.map(coche => ({
    coche,
    score: getCoincidencias(coche, respuestas)
  }));
  // Ordena por score descendente y precio más cercano
  const maxScore = Math.max(...scored.map(s => s.score));
  const recomendados = scored
    .filter(s => s.score === maxScore && maxScore > 0)
    .sort((a, b) => Math.abs((respuestas.presupuesto||999999)-a.coche.precio) - Math.abs((respuestas.presupuesto||999999)-b.coche.precio))
    .slice(0, 3)
    .map(s => s.coche);

  if (!recomendados.length) return null;
  return (
    <div className="asistente-similares">
      <h3>Recomendaciones similares</h3>
      <CardCoches producto={recomendados} />
    </div>
  );
}

export default function AsistenteCoche() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [cochesFiltrados, setCochesFiltrados] = useState(mockCoches);

  // Banner visual atractivo
  const banner = (
    <div className="asistente-banner">
      <img
        src={bannerCoche}
        alt="Banner coche"
        className="banner-img"
      />
      <div className="banner-texto">
        <h1>Encuentra tu coche ideal</h1>
        <p>Responde unas sencillas preguntas y te recomendaremos el modelo perfecto para ti.</p>
      </div>
    </div>
  );

  // Lógica de filtrado progresivo
  function handleRespuesta(key, value) {
    const nuevasRespuestas = { ...respuestas, [key]: value };
    let filtrados = mockCoches;
    if (nuevasRespuestas.presupuesto) {
      filtrados = filtrados.filter((c) => c.precio <= nuevasRespuestas.presupuesto);
    }
    if (nuevasRespuestas.tipo_combustible) {
      filtrados = filtrados.filter((c) => c.tipo_combustible === nuevasRespuestas.tipo_combustible);
    }
    if (nuevasRespuestas.transmision) {
      filtrados = filtrados.filter((c) => c.transmision === nuevasRespuestas.transmision);
    }
    if (nuevasRespuestas.tipo_vehiculo) {
      filtrados = filtrados.filter((c) => getTipoVehiculo(c.modelo) === nuevasRespuestas.tipo_vehiculo);
    }
    if (nuevasRespuestas.marca) {
      filtrados = filtrados.filter((c) => c.marca === nuevasRespuestas.marca);
    }
    setRespuestas(nuevasRespuestas);
    setCochesFiltrados(filtrados);
    setPaso(paso + 1);
  }

  // Construir preguntas adaptativas
  const preguntas = preguntasBase.map((preg, idx) => {
    let opciones = preg.opciones;
    if ([1, 2, 4].includes(idx)) {
      // tipo_combustible, transmision, marca
      opciones = getOpcionesDinamicas(cochesFiltrados, preg.key);
      // Si solo hay una opción, saltar pregunta
      if (opciones.length === 1 && !respuestas[preg.key]) {
        setTimeout(() => handleRespuesta(preg.key, opciones[0].value), 300);
      }
    }
    // Si es transmisión y solo hay eléctricos/híbridos, no preguntar
    if (
      preg.key === "transmision" &&
      cochesFiltrados.every(
        (c) => c.tipo_combustible === "Eléctrico" || c.tipo_combustible === "Híbrido"
      )
    ) {
      return null;
    }
    // Si ya está respondida, no mostrar
    if (respuestas[preg.key]) return null;
    // Si no quedan opciones, no mostrar
    if (opciones.length === 0) return null;
    return { ...preg, opciones };
  }).filter(Boolean);

  // Mostrar recomendación final
  const mostrarRecomendacion = preguntas.length === 0 || cochesFiltrados.length === 1;

  return (
    <div className="page-container asistente-coche-bg coche-a-medida-page">
      <div className="asistente-banner-full">
        <img src={bannerCoche} alt="Banner coche" className="banner-img-full" />
        <div className="banner-texto-full">
          <h1 className="page-title">Encuentra tu coche ideal</h1>
          <p className="page-subtitle">Responde unas sencillas preguntas y te recomendaremos el modelo perfecto para ti.</p>
        </div>
      </div>
      <div className="asistente-coche-container">
        <div className="asistente-content">
        {!mostrarRecomendacion ? (
          <div className="asistente-pregunta">
            <div style={{ textAlign: 'center', width: '100%' }}>
              <h2 className="page-title">{preguntas[0].texto}</h2>
            </div>
            <div className="asistente-opciones">
              {preguntas[0].opciones.map((op) => (
                <button
                  key={op.value}
                  className="asistente-btn page-button"
                  onClick={() => handleRespuesta(preguntas[0].key, op.value)}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="asistente-recomendacion">
            <h2 className="page-title">Tu coche ideal</h2>
            {cochesFiltrados.length > 0 ? (
              <CardCoches producto={cochesFiltrados.slice(0, 1)} />
            ) : (
              <>
                <p>No hay coches que cumplan con tus preferencias exactas.</p>
                <RecomendacionesSimilares respuestas={respuestas} />
              </>
            )}
            <button className="asistente-reiniciar" onClick={() => { setPaso(0); setRespuestas({}); setCochesFiltrados(mockCoches); }}>
              Volver a empezar
            </button>
          </div>
        )}
        </div>
      </div>
      
      {/* Llamada a la acciu00f3n secundaria */}
      <div className="asistente-cta-secundaria">
        <div className="cta-container">
          <h3 className="page-title">¿Necesitas ayuda personalizada?</h3>
          <p className="page-subtitle">Nuestros asesores están disponibles para ayudarte a encontrar el vehículo perfecto para ti.</p>
          <div className="cta-buttons">
            <a href="/Pages/Contacto" className="cta-btn cta-primary page-button">Contactar con un asesor</a>
            <a href="/Pages/Catalogo" className="cta-btn cta-secondary page-button">Ver catálogo completo</a>
          </div>
        </div>
      </div>
    </div>
  );
}
