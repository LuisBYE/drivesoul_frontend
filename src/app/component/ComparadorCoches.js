'use client';

import React, { useState, useEffect } from 'react';
import { mockCoches } from '../Pages/Coches/mockCoches';
import Link from 'next/link';

const ComparadorCoches = () => {
  // Estado para almacenar los coches seleccionados para comparar
  const [cochesSeleccionados, setCochesSeleccionados] = useState([]);
  // Estado para almacenar todos los coches disponibles
  const [cochesDisponibles, setCochesDisponibles] = useState([]);
  // Estado para el coche que se está seleccionando actualmente
  const [cocheSeleccionando, setCocheSeleccionando] = useState(null);
  // Máximo de coches que se pueden comparar
  const maxCoches = 4;

  // Características a comparar
  const caracteristicas = [
    { id: 'potencia', nombre: 'Potencia', unidad: 'CV' },
    { id: 'aceleracion', nombre: 'Aceleración 0-100 km/h', unidad: 's' },
    { id: 'consumo', nombre: 'Consumo medio', unidad: 'l/100km' },
    { id: 'tipo', nombre: 'Tipo', unidad: '' },
    { id: 'descuento', nombre: 'Descuento', unidad: '%' }
  ];

  // Datos adicionales de los coches (que no están en mockCoches)
  const datosAdicionales = {
    1: { potencia: '110', aceleracion: '10.2', consumo: '5.9', tipo: 'Urbano' },
    2: { potencia: '280', aceleracion: '5.9', consumo: '8.4', tipo: 'Deportivo' },
    90: { potencia: '150', aceleracion: '8.1', consumo: '6.2', tipo: 'Compacto' },
    91: { potencia: '110', aceleracion: '10.0', consumo: '5.8', tipo: 'SUV' },
    92: { potencia: '150', aceleracion: '9.5', consumo: '6.5', tipo: 'SUV' },
    93: { potencia: '120', aceleracion: '10.7', consumo: '5.9', tipo: 'SUV' },
    94: { potencia: '150', aceleracion: '8.2', consumo: '5.5', tipo: 'Compacto' },
    95: { potencia: '150', aceleracion: '8.5', consumo: '5.6', tipo: 'Berlina' },
    96: { potencia: '204', aceleracion: '7.6', consumo: '6.8', tipo: 'SUV' },
    97: { potencia: '150', aceleracion: '8.5', consumo: '5.7', tipo: 'Compacto' },
    98: { potencia: '110', aceleracion: '10.4', consumo: '5.4', tipo: 'Urbano' },
    99: { potencia: '150', aceleracion: '8.8', consumo: '6.3', tipo: 'SUV' },
    100: { potencia: '130', aceleracion: '9.1', consumo: '5.5', tipo: 'Urbano' },
    101: { potencia: '180', aceleracion: '8.0', consumo: '6.1', tipo: 'SUV' },
    102: { potencia: '180', aceleracion: '7.8', consumo: '5.8', tipo: 'Berlina' },
    103: { potencia: '163', aceleracion: '8.2', consumo: '6.0', tipo: 'Compacto' },
    104: { potencia: '204', aceleracion: '7.3', consumo: '6.2', tipo: 'Berlina' },
    105: { potencia: '194', aceleracion: '7.8', consumo: '7.1', tipo: 'SUV' }
  };

  // Cargar coches iniciales y preseleccionar algunos
  useEffect(() => {
    // Filtrar coches en oferta para mostrarlos primero
    const cochesEnOferta = mockCoches.filter(coche => coche.en_oferta);
    setCochesDisponibles(mockCoches);
    
    // Preseleccionar 3 coches en oferta (o menos si no hay suficientes)
    const cochesIniciales = [
      // Hyundai i30 N Fastback
      mockCoches.find(coche => coche.modelo_id === 2),
      // Volkswagen Golf
      mockCoches.find(coche => coche.modelo_id === 97),
      // Mercedes Clase C
      mockCoches.find(coche => coche.modelo_id === 104)
    ].filter(Boolean);
    
    setCochesSeleccionados(cochesIniciales);
  }, []);

  // Añadir un coche a la comparación
  const agregarCoche = (coche) => {
    if (cochesSeleccionados.length < maxCoches) {
      setCochesSeleccionados([...cochesSeleccionados, coche]);
      setCocheSeleccionando(null);
    }
  };

  // Eliminar un coche de la comparación
  const eliminarCoche = (index) => {
    const nuevosCoches = [...cochesSeleccionados];
    nuevosCoches.splice(index, 1);
    setCochesSeleccionados(nuevosCoches);
  };

  // Obtener el valor de una característica para un coche
  const getValorCaracteristica = (coche, caracteristica) => {
    const datos = datosAdicionales[coche.modelo_id] || {};
    
    switch (caracteristica.id) {
      case 'potencia':
        return `${datos.potencia || '?'} ${caracteristica.unidad}`;
      case 'aceleracion':
        return `${datos.aceleracion || '?'} ${caracteristica.unidad}`;
      case 'consumo':
        return `${datos.consumo || '?'} ${caracteristica.unidad}`;
      case 'tipo':
        return datos.tipo || '?';
      case 'descuento':
        return coche.porcentaje_descuento ? `${coche.porcentaje_descuento}${caracteristica.unidad}` : '-';
      default:
        return '?';
    }
  };

  return (
    <div style={{maxWidth: '1200px', margin: '60px auto 0', padding: '20px 10px'}}>
      <h2 style={{color: '#ffffff', fontSize: '2rem', fontWeight: '700', marginBottom: '30px', textAlign: 'center', position: 'relative'}}>
        COMPARADOR DE MODELOS
        <div style={{width: '80px', height: '3px', background: '#cc0000', margin: '15px auto'}}></div>
      </h2>
      
      <div style={{background: 'linear-gradient(145deg, #1a1a1a, #2a2020)', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(255, 0, 0, 0.2)', border: '1px solid rgba(255, 0, 0, 0.15)', marginTop: '20px'}}>
        {/* Sección para añadir coches */}
        {cochesSeleccionados.length < maxCoches && (
          <div style={{marginBottom: '20px'}}>
            <button 
              onClick={() => setCocheSeleccionando(!cocheSeleccionando)}
              style={{
                backgroundColor: '#cc0000', 
                color: 'white', 
                padding: '10px 20px', 
                borderRadius: '8px', 
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {cocheSeleccionando ? 'Cancelar' : 'Añadir coche a la comparación'}
            </button>
            
            {cocheSeleccionando && (
              <div style={{marginTop: '15px', maxHeight: '200px', overflowY: 'auto', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px'}}>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px'}}>
                  {cochesDisponibles
                    .filter(coche => !cochesSeleccionados.some(c => c.modelo_id === coche.modelo_id))
                    .map(coche => (
                      <div 
                        key={coche.modelo_id}
                        onClick={() => agregarCoche(coche)}
                        style={{
                          padding: '10px', 
                          background: 'rgba(255,255,255,0.05)', 
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            background: 'rgba(255,255,255,0.1)'
                          }
                        }}
                      >
                        <div style={{display: 'flex', alignItems: 'center'}}>
                          <img 
                            src={coche.imagen} 
                            alt={coche.nombre} 
                            style={{width: '50px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px'}}
                            onError={(e) => { e.target.src = '/FOTOS/COCHES/default.jpg' }}
                          />
                          <div>
                            <div style={{fontSize: '0.9rem', color: '#fff'}}>{coche.marca} {coche.modelo}</div>
                            <div style={{fontSize: '0.8rem', color: '#ff3333'}}>{coche.en_oferta ? coche.precio_oferta : coche.precio} €</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Grid de coches seleccionados */}
        <div style={{
          display: 'grid', 
          gridTemplateColumns: `repeat(${cochesSeleccionados.length > 0 ? cochesSeleccionados.length : 1}, 1fr)`, 
          gap: '20px'
        }}>
          {cochesSeleccionados.map((coche, index) => (
            <div key={index} style={{textAlign: 'center', position: 'relative'}}>
              <button 
                onClick={() => eliminarCoche(index)}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  background: 'rgba(255,0,0,0.7)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '12px',
                  zIndex: 2
                }}
              >
                ✕
              </button>
              <div style={{marginBottom: '15px'}}>
                <img 
                  src={coche.imagen} 
                  alt={`${coche.marca} ${coche.modelo}`} 
                  style={{width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px'}} 
                  onError={(e) => { e.target.src = '/FOTOS/COCHES/default.jpg' }} 
                />
              </div>
              <h3 style={{fontSize: '1.2rem', fontWeight: 600, color: '#ffffff', margin: '0 0 10px 0'}}>
                {coche.marca} {coche.modelo}
              </h3>
              <div style={{fontSize: '1.3rem', fontWeight: 700, color: '#ff3333', marginBottom: '10px'}}>
                {coche.en_oferta ? coche.precio_oferta : coche.precio} €
              </div>
            </div>
          ))}

          {/* Mostrar un mensaje si no hay coches seleccionados */}
          {cochesSeleccionados.length === 0 && (
            <div style={{textAlign: 'center', padding: '30px', color: '#aaa'}}>
              No hay coches seleccionados para comparar. Añade coches para comenzar.
            </div>
          )}
        </div>
        
        {/* Tabla de comparación */}
        {cochesSeleccionados.length > 0 && (
          <div style={{marginTop: '30px'}}>
            <table style={{width: '100%', borderCollapse: 'collapse', color: '#cccccc', fontSize: '0.9rem'}}>
              <thead>
                <tr style={{borderBottom: '1px solid rgba(255, 0, 0, 0.3)'}}>
                  <th style={{padding: '10px', textAlign: 'left', color: '#ffffff'}}>Características</th>
                  {cochesSeleccionados.map((coche, index) => (
                    <th key={index} style={{padding: '10px', textAlign: 'center', color: '#ffffff'}}>
                      {coche.marca} {coche.modelo}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {caracteristicas.map((caracteristica) => (
                  <tr key={caracteristica.id} style={{borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>
                    <td style={{padding: '10px'}}>{caracteristica.nombre}</td>
                    {cochesSeleccionados.map((coche, index) => (
                      <td 
                        key={index} 
                        style={{
                          padding: '10px', 
                          textAlign: 'center',
                          color: caracteristica.id === 'descuento' && coche.porcentaje_descuento ? '#ff3333' : 'inherit',
                          fontWeight: caracteristica.id === 'descuento' && coche.porcentaje_descuento ? '600' : 'normal'
                        }}
                      >
                        {getValorCaracteristica(coche, caracteristica)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div style={{textAlign: 'center', marginTop: '30px'}}>
          <Link href="/Pages/Catalogo" style={{display: 'inline-block', backgroundColor: '#cc0000', color: 'white', padding: '12px 30px', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s ease'}}>
            Ver catálogo completo <i className="fas fa-arrow-right" style={{marginLeft: '8px'}}></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComparadorCoches;
