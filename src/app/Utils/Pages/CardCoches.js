import React, { use, useContext, useEffect, useState } from "react";
import { FormContext } from "../../context/FormContext"; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CardCoches({ producto }) {
  const router = useRouter();
  const { formValues } = useContext(FormContext); // Accede al contexto
  const [coche, setCoche] = useState([]); // Estado para almacenar los coches filtrados
  const [cocheId, setcocheId] = useState(null); // Estado para almacenar el filtro de coches
  const [cocheDesplegado, setCocheDesplegado] = useState(); // Estado para almacenar el coche desplegado

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
  const detailFormMarca = formValues.marca; //! falta añadir al DTO de marca
  const detailFormModelo = formValues.modelo; //! falta añadir al DTO de modelo
  const detailFormPrecioMin = formValues.precioMin;
  const detailFormPrecioMax = formValues.precioMax;
  const detailFormKilometrajeMin = formValues.kilometrajeMin;
  const detailFormKilometrajeMax = formValues.kilometrajeMax;
  const detailFormColor = formValues.detailFormColor;
  const detailFormCombustible = formValues.combustible;
  const detailFormTransmision = formValues.transmision;

  const comparacion = (itemId) => {
    console.log("respuesta itemId", itemId);
    const respuesta = modelo.some((item) => item.id === itemId);
    console.log("respuesta comparacion", respuesta);
    return respuesta;
  };
  
  useEffect(() => {
    if (
      detailFormAnio ||
      // detailFormMarca ||
      detailFormPrecioMin ||
      detailFormPrecioMax ||
      detailFormModelo||
      detailFormKilometrajeMin ||
      detailFormKilometrajeMax||

      detailFormColor ||
      detailFormCombustible ||
      detailFormTransmision
    ) {
      alert("Hay un filtro activo");
      const filtroCoche = producto.filter(
        (item) =>
          (!detailFormAnio || Number(item.anio) === Number(detailFormAnio)) &&
          (!detailFormPrecioMin||Number(item.precio) >= Number(detailFormPrecioMin)) &&
          (!detailFormPrecioMax ||Number(item.precio) <= Number(detailFormPrecioMax)) &&
          (!detailFormKilometrajeMin || item.kilometraje >= detailFormKilometrajeMin) &&
          (!detailFormKilometrajeMax || item.kilometraje <= detailFormKilometrajeMax) &&
          (!detailFormColor || item.color.toLowerCase() === detailFormColor.toLowerCase()) &&
          (!detailFormCombustible ||item.tipo_combustible.toLowerCase() === detailFormCombustible.toLowerCase()) &&
          (!detailFormTransmision ||item.transmision.toLowerCase() === detailFormTransmision.toLowerCase())&&
          // (!detailFormModelo || Number(item.modelo_id) === Number(detailFormModelo)) &&
           comparacion(item.modelo_id) 
      );
      alert("llega aqui")
      setCoche(filtroCoche);

    } else {
      setCoche(producto); // Si no hay filtro, muestra todos los coches
    }
     
  }, [formValues,producto]);

  //! FALTA AÑADIR MARCA DE COCHE EN EL DTO DE MODELO  O OTRO  TIENE VARIAS MARCAS 

  const navegarADetalles = (cocheId) => {
    router.push(`/Pages/Coches/${cocheId}`);
  };

  return (
    <div className="productos-grid">
      {coche.length > 0 ? (
        coche.map((item) => (
          <div key={item.modelo_id} className="producto-card" onClick={() => navegarADetalles(item.modelo_id)}>
            <div className="producto-imagen">
              <img
                src={`/FOTOS/COCHES/${item.modelo_id === 1 ? 'SEAT/IMG1.jpg' : 'HYUNDAI/IMG1.webp'}`}
                alt={item.nombre}
                className="imagen-principal"
              />
              <div className="eco-badge">
                <span>ECO</span>
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
                  <span>{item.anio}</span>
                </div>
                <div className="spec-separator">·</div>
                <div className="spec-item">
                  <span>{item.kilometraje.toLocaleString('es-ES')} km</span>
                </div>
                <div className="spec-separator">·</div>
                <div className="spec-item">
                  <span>{item.tipo_combustible}</span>
                </div>
                <div className="spec-separator">·</div>
                <div className="spec-item">
                  <span>{item.transmision}</span>
                </div>
              </div>

              <button className="ver-detalles">
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
          gap: 20px;
          padding: 20px 0;
        }

        .producto-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }

        .producto-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .producto-imagen {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .imagen-principal {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
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
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .producto-info {
          padding: 15px;
        }

        .producto-header {
          margin-bottom: 15px;
        }

        .producto-titulo {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px 0;
        }

        .producto-precio {
          margin-bottom: 12px;
        }

        .precio-actual {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c5282;
        }

        .precio-mensual {
          font-size: 0.9rem;
          color: #666;
          margin-top: 4px;
        }

        .producto-specs {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 15px;
          font-size: 0.9rem;
          color: #666;
        }

        .spec-separator {
          color: #ccc;
        }

        .ver-detalles {
          width: 100%;
          background-color: #2c5282;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 6px;
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
          color: #666;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .productos-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
