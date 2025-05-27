import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../../context/FormContext";
import { useRouter } from "next/navigation";
import "./tarjetas.css";

export default function CardCoches({ producto }) {
  const router = useRouter();
  const { formValues } = useContext(FormContext);
  const [coche, setCoche] = useState([]);
  const [cocheId, setCocheId] = useState(null);
  const [cocheDesplegado, setCocheDesplegado] = useState(null);

  // Estado para almacenar el coche desplegado por ID
  const transitionStyle = cocheDesplegado
    ? "max-height 0.6s ease-out"
    : "max-height 0.3s ease-in";
  console.log("consola producto", producto);
  console.log("consola coche", coche);
  console.log("valores del formulario", formValues);

  const mostrarCocheId = (id) => {
    setCocheId(cocheId === id ? null : id);
    setCocheDesplegado(cocheId !== id);
  };
  useEffect(() => {
    console.log("consola producto", JSON.stringify(producto));
    if (producto && producto.length > 0) {
      setCoche(producto);
    }
  }, [producto]);

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

  // IDs de los coches que están en oferta y deben ocultarse en el catálogo
  // Estos son los IDs de producto (no de modelo)
  const cochesEnOferta = [2, 10, 17]; // Hyundai i30 N Fastback, Volkswagen Golf, Mercedes Clase C

  // IDs de modelo de los coches en oferta
  const modelosEnOferta = [2, 97, 104]; // Modelo IDs correspondientes a los coches en oferta

  useEffect(() => {
    if (producto && producto.length > 0) {
      console.log("Productos antes de filtrar:", producto);

      const filtroCoche = producto.filter((item) => {
        // Verificamos si el ID del producto o el ID del modelo está en la lista de coches en oferta
        const estaEnOferta =
          cochesEnOferta.includes(item.id) ||
          cochesEnOferta.includes(Number(item.id)) ||
          modelosEnOferta.includes(item.modelo_id) ||
          modelosEnOferta.includes(Number(item.modelo_id));

        // Filtrado por marca (si está definido)
        const pasaFiltroMarca =
          !formValues.marca ||
          item.nombre.toLowerCase().includes(formValues.marca.toLowerCase());

        // Filtrado por modelo (si está definido)
        const pasaFiltroModelo =
          !formValues.modelo ||
          item.nombre.toLowerCase().includes(formValues.modelo.toLowerCase());

        // Filtrado por año (si está definido)
        const pasaFiltroAnio =
          !formValues.anio ||
          (formValues.anio && Number(item.anio) === Number(formValues.anio));

        // Filtrado por precio mínimo (si está definido)
        const pasaFiltroPrecioMin =
          !formValues.precioMin ||
          (formValues.precioMin &&
            Number(item.precio) >= Number(formValues.precioMin));

        // Filtrado por precio máximo (si está definido)
        const pasaFiltroPrecioMax =
          !formValues.precioMax ||
          (formValues.precioMax &&
            Number(item.precio) <= Number(formValues.precioMax));

        // Filtrado por kilometraje mínimo (si está definido)
        const pasaFiltroKmMin =
          !formValues.kmMin ||
          (formValues.kmMin &&
            Number(item.kilometraje) >= Number(formValues.kmMin));

        // Filtrado por kilometraje máximo (si está definido)
        const pasaFiltroKmMax =
          !formValues.kmMax ||
          (formValues.kmMax &&
            Number(item.kilometraje) <= Number(formValues.kmMax));

        // Filtrado por color (si está definido)
        const pasaFiltroColor =
          !formValues.color ||
          (formValues.color &&
            item.color?.toLowerCase().includes(formValues.color.toLowerCase()));

        // Filtrado por tipo de combustible (si está definido)
        const pasaFiltroCombustible =
          !formValues.combustible ||
          (formValues.combustible &&
            item.tipo_combustible?.toLowerCase() ===
              formValues.combustible.toLowerCase());

        // Filtrado por transmisión (si está definido)
        const pasaFiltroTransmision =
          !formValues.transmision ||
          (formValues.transmision &&
            item.transmision?.toLowerCase() ===
              formValues.transmision.toLowerCase());

        console.log(
          `Coche ${item.id} (modelo ${item.modelo_id}): ${
            estaEnOferta ? "Está en oferta" : "No está en oferta"
          }`
        );
        console.log(
          `Filtros para ${
            item.nombre
          }: Marca: ${pasaFiltroMarca}, Modelo: ${pasaFiltroModelo}, Año: ${pasaFiltroAnio}, Precio: ${
            pasaFiltroPrecioMin && pasaFiltroPrecioMax
          }, Km: ${
            pasaFiltroKmMin && pasaFiltroKmMax
          }, Color: ${pasaFiltroColor}, Combustible: ${pasaFiltroCombustible}, Transmisión: ${pasaFiltroTransmision}`
        );

        return (
          // Si está en oferta, no lo mostramos en el catálogo
          !estaEnOferta &&
          pasaFiltroMarca &&
          pasaFiltroModelo &&
          pasaFiltroAnio &&
          pasaFiltroPrecioMin &&
          pasaFiltroPrecioMax &&
          pasaFiltroKmMin &&
          pasaFiltroKmMax &&
          pasaFiltroColor &&
          pasaFiltroCombustible &&
          pasaFiltroTransmision
        );
      });

      console.log("Productos después de filtrar:", filtroCoche);
      setCoche(filtroCoche);
    } else {
      setCoche([]);
    }
  }, [formValues, producto]);
  const navegarADetalles = (coche) => {
    // Guarda los datos del coche seleccionado
    localStorage.setItem("cocheSeleccionado", JSON.stringify(coche));

    // Guardar el estado actual para poder volver
    sessionStorage.setItem("ultimaPagina", "catalogo");

    // Navegar a la página de detalles
    router.push(`/Pages/Coches/${coche.modelo_id}`);
  };

  const getImagenCoche = (modelo_id) => {
    const rutasImagenes = {
      1: "/FOTOS/COCHES/SEATIBIZAROJO/1.jpg",
      2: "/FOTOS/COCHES/HYUNDAII30NFASTBACK/1.png",
      90: "/FOTOS/COCHES/SEATLEONBLANCO/1.jpg",
      91: "/FOTOS/COCHES/SEATARONAAZUL/1.png",
      92: "/FOTOS/COCHES/HYUNDAITUCSONGRIS/1.png",
      93: "/FOTOS/COCHES/HYUNDAIKONA/1.jpg",
      94: "/FOTOS/COCHES/AUDIA3NEGRO/1.png",
      95: "/FOTOS/COCHES/AUDIA4AZUL/1.png",
      96: "/FOTOS/COCHES/AUDIQ5BLANCO/1.png",
      97: "/FOTOS/COCHES/VOLKSWAGENGOLFGRIS/1.png",
      98: "/FOTOS/COCHES/VOLKSWAGENPOLOROJO/1.png",
      99: "/FOTOS/COCHES/VOLKSWAGENTROCNEGRO/1.png",
      100: "/FOTOS/COCHES/PEUGEOT208AZUL/1.png",
      101: "/FOTOS/COCHES/PEUGEOT3008BLANCO/1.png",
      102: "/FOTOS/COCHES/PEUGEOT508GRIS2023/1.png",
      103: "/FOTOS/COCHES/MERCEDESCLASEANEGRO/1.png",
      104: "/FOTOS/COCHES/MERCEDESCLASECROJO/1.jpeg",
      105: "/FOTOS/COCHES/MERCEDES GLCAZUL/1.png",
    };

    return rutasImagenes[modelo_id] || "/FOTOS/COCHES/default.jpg";
  };

  return (
    <div className="productos-grid">
      {coche.length > 0 ? (
        coche.map((item, index) => (
          <div key={` ${index}-${item.modelo_id}`} className="producto-card">
            <div className="producto-imagen">
              <img
                src={getImagenCoche(item.modelo_id)}
                alt={item.nombre}
                className="imagen-principal"
              />
              {item.tipo_combustible.toLowerCase() === "híbrido" && (
                <div className="eco-badge">
                  <span>ECO</span>
                </div>
              )}
              <div className="estado-badge">
                <span>{item.kilometraje === 0 ? "NUEVO" : "USADO"}</span>
              </div>
            </div>

            <div className="producto-info">
              <div className="producto-header">
                <h3 className="producto-titulo">
                  {item.nombre_producto ||
                    item.nombre ||
                    `${item.marca} ${item.modelo}`}
                </h3>
                <div className="producto-precio">
                  <div className="precio-actual">
                    {item.precio.toLocaleString("es-ES")} €
                  </div>
                  <div className="precio-mensual">
                    Desde {Math.round(item.precio / 72).toLocaleString("es-ES")}{" "}
                    €/mes*
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
                  <span>{item.kilometraje.toLocaleString("es-ES")} km</span>
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
              <button
                className="ver-detalles"
                onClick={() => navegarADetalles(item)}
              >
                Ver Detalles
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-resultados">
          No se encontraron coches con los filtros seleccionados.
        </p>
      )}
    </div>
  );
}
