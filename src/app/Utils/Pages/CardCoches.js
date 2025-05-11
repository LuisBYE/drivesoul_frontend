import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../../context/FormContext";
import { useRouter } from 'next/navigation';
import './tarjetas.css';

export default function CardCoches({ producto }) {
  const router = useRouter();
  const { formValues } = useContext(FormContext);
  const [coche, setCoche] = useState([]);

  const [cocheDesplegadoId, setCocheDesplegadoId] = useState(null);

  // Estado para almacenar el coche desplegado por ID
  const transitionStyle = cocheDesplegado
    ? "max-height 0.6s ease-out"
    : "max-height 0.3s ease-in";
  console.log("consola producto", producto);
  console.log("consola coche", coche);

  const mostrarCocheId = (id) => {
    setcocheId(cocheId === id ? null : id);
    setCocheDesplegado(cocheId !== null ? true : false);
    // alert("actualizarStateDesplegable:  " + cocheDesplegado);
  };

  const marca = [
    "Seat",
    "Hyundai",
    "Audi",
    "BMW",
    "Mercedes-Benz",
    "Toyota",
    "Ford",
    "Honda",
    "Renault",
    "Kia",
    "Peugeot",
  ];

  const modelo = [
    { id: 1, name: "Ibiza" },
    { id: 2, name: "Hyundai i30 N" },
  ];

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
    if (
      detailFormAnio ||
      // detailFormMarca ||
      detailFormPrecioMin ||
      detailFormPrecioMax ||
      detailFormModelo ||
      detailFormKilometrajeMin ||
      detailFormKilometrajeMax ||
      detailFormColor ||
      detailFormCombustible ||
      detailFormTransmision
    ) {
      alert("Hay un filtro activo");
    if (producto && producto.length > 0) {
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
    // Guarda los datos del coche seleccionado
    localStorage.setItem('cocheSeleccionado', JSON.stringify(coche));
    
    // Eliminamos cualquier marcador de navegación
    sessionStorage.removeItem('vieneDePagina');
    sessionStorage.removeItem('ultimaNavegacion');
    
    // Navegar a la página de detalles
    router.push(`/Pages/Coches/${coche.modelo_id}`);
  };

  const getImagenCoche = (modelo_id) => {
    const rutasImagenes = {
      1: '/FOTOS/COCHES/SEATIBIZAROJO/1.jpg',
      2: '/FOTOS/COCHES/HYUNDAII30NFASTBACK/1.png',
      90: '/FOTOS/COCHES/SEATLEONBLANCO/1.jpg',
      91: '/FOTOS/COCHES/SEATARONAAZUL/1.png',
      92: '/FOTOS/COCHES/HYUNDAITUCSONGRIS/1.png',
      93: '/FOTOS/COCHES/HYUNDAIKONA/1.jpg',
      94: '/FOTOS/COCHES/AUDIA3NEGRO/1.png',
      95: '/FOTOS/COCHES/AUDIA4AZUL/1.png',
      96: '/FOTOS/COCHES/AUDIQ5BLANCO/1.png',
      97: '/FOTOS/COCHES/VOLKSWAGENGOLFGRIS/1.png',
      98: '/FOTOS/COCHES/VOLKSWAGENPOLOROJO/1.png',
      99: '/FOTOS/COCHES/VOLKSWAGENTROCNEGRO/1.png',
      100: '/FOTOS/COCHES/PEUGEOT208AZUL/1.png',
      101: '/FOTOS/COCHES/PEUGEOT3008BLANCO/1.png',
      102: '/FOTOS/COCHES/PEUGEOT508GRIS2023/1.png',
      103: '/FOTOS/COCHES/MERCEDESCLASEANEGRO/1.png',
      104: '/FOTOS/COCHES/MERCEDESCLASECROJO/1.jpeg',
      105: '/FOTOS/COCHES/MERCEDES GLCAZUL/1.png'
    };
    
    return rutasImagenes[modelo_id] || '/FOTOS/COCHES/default.jpg';
  };

  return (
    <div className="productos-grid">
      {coche.length > 0 ? (
        coche.map((item) => (
          <div key={item.modelo_id} className="producto-card">
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
