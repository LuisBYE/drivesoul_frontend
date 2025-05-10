import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../../context/FormContext";
import { useRouter } from 'next/navigation';
import './tarjetas.css';

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
      105: '/FOTOS/MERCEDES GLCAZUL/1.jpg'
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
    </div>
  );
}
