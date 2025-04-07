import React, { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    if (
      formValues.anio ||
      formValues.marca ||
      formValues.precioMin ||
      formValues.precioMax ||
      formValues.kilometrajeMin ||
      formValues.kilometrajeMax ||
      formValues.color ||
      formValues.combustible ||
      formValues.transmision
    ) {
      // alert("Hay un filtro activo");
      const filtroCoche = producto.filter(
        (item) =>
          (!formValues.anio || Number(item.anio) === Number(formValues.anio)) &&
          (!formValues.precioMin ||
            Number(item.precio) >= Number(formValues.precioMin)) &&
          (!formValues.precioMax ||
            Number(item.precio) <= Number(formValues.precioMax)) &&
          (!formValues.kilometrajeMin ||
            item.kilometraje >= formValues.kilometrajeMin) &&
          (!formValues.kilometrajeMax ||
            item.kilometraje <= formValues.kilometrajeMax) &&
          (!formValues.color ||
            item.color.toLowerCase() === formValues.color.toLowerCase()) &&
          (!formValues.combustible ||
            item.tipo_combustible.toLowerCase() ===
              formValues.combustible.toLowerCase()) &&
          (!formValues.transmision ||
            item.transmision.toLowerCase() === formVcombustiblen.toLowerCase())
      );
      console.log("filtroCoche:", filtroCoche);
      setCoche(filtroCoche);
    } else {
      setCoche(producto); // Si no hay filtro, muestra todos los coches
    }
  }, [formValues, producto]);

  return (
    <>
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
