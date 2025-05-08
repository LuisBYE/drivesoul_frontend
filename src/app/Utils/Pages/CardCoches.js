import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../../context/FormContext";
import { useRouter } from 'next/navigation';

export default function CardCoches({ producto }) {
  const router = useRouter();
  const { formValues } = useContext(FormContext);
  const [coche, setCoche] = useState([]);

  const detailFormAnio = formValues.anio;
  const detailFormPrecioMin = formValues.precioMin;
  const detailFormPrecioMax = formValues.precioMax;
  const detailFormModelo = formValues.modelo;
  const detailFormKilometrajeMin = formValues.kilometrajeMin;
  const detailFormKilometrajeMax = formValues.kilometrajeMax;
  const detailFormColor = formValues.detailFormColor;
  const detailFormCombustible = formValues.combustible;
  const detailFormTransmision = formValues.transmision;

  useEffect(() => {
    if (producto && producto.length > 0) {
      console.log("Productos recibidos:", producto);
      const filtroCoche = producto.filter(
        (item) =>
          (!detailFormAnio || Number(item.anio) === Number(detailFormAnio)) &&
          (!detailFormPrecioMin || Number(item.precio) >= Number(detailFormPrecioMin)) &&
          (!detailFormPrecioMax || Number(item.precio) <= Number(detailFormPrecioMax)) &&
          (!detailFormKilometrajeMin || item.kilometraje >= detailFormKilometrajeMin) &&
          (!detailFormKilometrajeMax || item.kilometraje <= detailFormKilometrajeMax) &&
          (!detailFormColor || item.color.toLowerCase() === detailFormColor.toLowerCase()) &&
          (!detailFormCombustible || item.tipo_combustible.toLowerCase() === detailFormCombustible.toLowerCase()) &&
          (!detailFormTransmision || item.transmision.toLowerCase() === detailFormTransmision.toLowerCase())
      );
      setCoche(filtroCoche);
    } else {
      setCoche([]);
    }
  }, [formValues, producto]);

  const navegarADetalles = (coche) => {
    localStorage.setItem('cocheSeleccionado', JSON.stringify(coche));
    router.push(`/Pages/Coches/${coche.modelo_id}`);
  };

  // Obtener la imagen del coche según su modelo_id
  const getImagenCoche = (cocheId) => {
    const rutasImagenes = {
      1: '/FOTOS/COCHES/SEATIBIZAROJO/1.jpg',
      2: '/FOTOS/COCHES/HYUNDAII30NFASTBACK/1.png',
      90: '/FOTOS/COCHES/SEATLEONBLANCO/1.jpg',
      91: '/FOTOS/COCHES/SEATARONAAZUL/1.jpg',
      92: '/FOTOS/COCHES/HYUNDAITUCSONGRIS/1.jpg',
      93: '/FOTOS/COCHES/HYUNDAIKONA/1.jpg',
      94: '/FOTOS/COCHES/AUDIA3NEGRO/1.jpg',
      95: '/FOTOS/COCHES/AUDIA4AZUL/1.jpg',
      96: '/FOTOS/COCHES/AUDIQ5BLANCO/1.jpg',
      97: '/FOTOS/COCHES/VOLKSWAGENGOLFGRIS/1.jpg',
      98: '/FOTOS/COCHES/VOLKSWAGENPOLOROJO/1.jpg',
      99: '/FOTOS/COCHES/VOLKSWAGENTROCNEGRO/1.jpg',
      100: '/FOTOS/COCHES/PEUGEOT208AZUL/1.jpg',
      101: '/FOTOS/COCHES/PEUGEOT3008BLANCO/1.jpg',
      102: '/FOTOS/COCHES/PEUGEOT508GRIS2023/1.jpg',
      103: '/FOTOS/COCHES/MERCEDESCLASEANEGRO/1.jpg',
      104: '/FOTOS/COCHES/MERCEDESCLASECROJO/1.jpg',
      105: '/FOTOS/COCHES/MERCEDES GLCAZUL/1.jpg'
    };
    
    return rutasImagenes[cocheId] || '/FOTOS/COCHES/default.jpg';
  };

  return (
    <div className="productos-grid">
      {coche.length > 0 ? (
        coche.map((item) => (
          <div key={item.id || item.modelo_id} className="producto-card">
            <div className="producto-imagen">
              <img
                src={getImagenCoche(item.modelo_id)}
                alt={item.nombre}
                className="imagen-principal"
              />
              {item.tipo_combustible.toLowerCase() === 'híbrido' && (
                <div className="eco-badge">
                  <span>ECO</span>
                </div>
              )}
              <div className="estado-badge">
                <span>{item.kilometraje === 0 ? 'NUEVO' : 'USADO'}</span>
              </div>
            </div>

            <div className="producto-info">
              <div className="producto-header">
                <h3 className="producto-titulo">{item.nombre}</h3>
                <div className="producto-precio">
                  <div className="precio-actual">{item.precio.toLocaleString('es-ES')} €</div>
                  <div className="precio-mensual">
                    Desde {Math.round(item.precio / 72).toLocaleString('es-ES')} €/mes*
                  </div>
                </div>
              </div>

              <div className="producto-specs">
                <div className="spec-item">
                  <i className="fas fa-calendar"></i>
                  <span>{item.anio}</span>
                </div>
                <div className="spec-separator">·</div>
                <div className="spec-item">
                  <i className="fas fa-tachometer-alt"></i>
                  <span>{item.kilometraje.toLocaleString('es-ES')} km</span>
                </div>
                <div className="spec-separator">·</div>
                <div className="spec-item">
                  <i className="fas fa-gas-pump"></i>
                  <span>{item.tipo_combustible}</span>
                </div>
                <div className="spec-separator">·</div>
                <div className="spec-item">
                  <i className="fas fa-cog"></i>
                  <span>{item.transmision}</span>
                </div>
              </div>

              <button className="ver-detalles" onClick={() => navegarADetalles(item)}>
                Ver Detalles
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-resultados">No se encontraron coches con los filtros seleccionados.</p>
      )}

      <style jsx>{`
        .productos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
          padding: 20px;
        }

        .producto-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .producto-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 12px rgba(0,0,0,0.15);
        }

        .producto-imagen {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
        }

        .imagen-principal {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .producto-card:hover .imagen-principal {
          transform: scale(1.05);
        }

        .eco-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #4CAF50;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .estado-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #2c5282;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .producto-info {
          padding: 20px;
        }

        .producto-header {
          margin-bottom: 15px;
        }

        .producto-titulo {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0 0 10px 0;
        }

        .producto-precio {
          margin-bottom: 15px;
        }

        .precio-actual {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c5282;
        }

        .precio-mensual {
          font-size: 0.9rem;
          color: #718096;
          margin-top: 4px;
        }

        .producto-specs {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          color: #4a5568;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .spec-item i {
          color: #2c5282;
        }

        .spec-separator {
          color: #cbd5e0;
        }

        .ver-detalles {
          width: 100%;
          background-color: #2c5282;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .ver-detalles:hover {
          background-color: #2a4365;
        }

        .no-resultados {
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px;
          color: #718096;
          font-size: 1.1rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .productos-grid {
            grid-template-columns: 1fr;
            padding: 15px;
          }

          .producto-imagen {
            height: 180px;
          }
        }
      `}</style>
    </div>
  );
}
