import React, { use, useContext, useEffect, useState } from "react";
import { FormContext } from "../../context/FormContext"; // Asegúrate de que la ruta sea correcta

export default function CardCoches({ producto }) {
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
  return (
    <>
    <pre> modelo formulario: {detailFormModelo}</pre>
      <pre>{JSON.stringify(coche, null, 2)}</pre>
      <div className="ContainerCard">
        {coche.length > 0 ? (
          coche.map((item) => (
            <div key={item.modelo_id} className="producto-item">
              <div className="titulo_Producto">
                <p>{item.nombre}</p>
              </div>
              <div
                className="acualizar_Detalle"
                onClick={() => mostrarCocheId(item.modelo_id)}
              >
                Detalles
              </div>
              {cocheId === item.modelo_id ? (
                <div className="detalle_Producto ">
                  <div className="div_item">
                    <p>Modelo: </p>
                    {item.modelo_id}
                  </div>

                  {/* <div className="div_item">
                    <p>Marca </p>
                    {item.marca}
                  </div> */}
                  <div className="div_item">
                    <p>Año: </p>
                    {item.anio}
                  </div>
                  <div className="div_item">
                    <p>Kilometraje: </p>
                    {item.kilometraje}
                  </div>
                  <div className="div_item">
                    <p>Color: </p>
                    {item.color}
                  </div>
                  <div className="div_item">
                    <p>Combustible: </p>
                    {item.tipo_combustible}
                  </div>
                  <div className="div_item">
                    <p>Transmisión: </p>
                    {item.transmision}
                  </div>
                  <div className="div_item">
                    <p>Precio: </p>
                    {item.precio}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))
        ) : (
          <p>No se encontraron coches para el año seleccionado.</p>
        )}
      </div>

      <style jsx>{`
        .ContainerCard {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          padding: 20px;
          background-color: rgb(106, 100, 100);
        }
        .div_item {
          display: flex;
          /* justify-content: center; */
          align-items: center;
        }
        .div_item p {
          font-weight: bold;
          margin: 8px 0;
          font-size: 14px;
        }
        .titulo_Producto p {
          font-size: 20px;
          text-align: center;
          margin: 10px 0;
          border-bottom: 1px solid #ccc;
        }
        .acualizar_Detalle {
          cursor: pointer;
          background-color: rgb(152, 152, 152);
        }

        .detalle_Producto {
          display: flex;
          flex-direction: column;
          padding: 10px;
          background-color: rgb(255, 255, 255);
          maxheight: ${cocheDesplegado ? "1000px" : "0"};
          border-radius: 8px;
          overflow: "hidden";
          transition: ${transitionStyle};
        }
        .producto-item {
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 20px;
          text-align: left;
          width: 250px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .producto-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .producto-titulo {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
          text-align: center;
        }
      `}</style>
    </>
  );
}
