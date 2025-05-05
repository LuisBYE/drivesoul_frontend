import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FormContext } from "../../../context/FormContext";

export default function PanelFiltro() {
  const { register, handleSubmit, watch } = useForm();
  const { setFormValues } = useContext(FormContext); // Accede al contexto

  const formValues = watch();

  const onSubmit = (data) => {
    setFormValues(data); // Actualiza el contexto con los valores del formulario
    console.log("Formulario enviado:", data); // Muestra los datos en un alert
  };

  return (
    <>
      {/* CONTENEDOR FILTROS */}
    

      <div className="containerPanel">
        <h2>Filtros de búsqueda</h2>
        <form className="filtros-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="filtro-grupo">
            <label htmlFor="modelo">Modelo:</label>
            <input
              type="text"
              id="modelo"
              name="modelo"
              {...register("modelo", {
                // required: "modelo es requerida"
              })}
            />
          </div>
          <div className="filtro-grupo">
            <label htmlFor="marca">Marca:</label>
            <input
              type="text"
              id="marca"
              name="marca"
              {...register("marca", {
                // required: "Marca es requerida"
              })}
            />
          </div>

          <div className="filtro-grupo">
            <label htmlFor="precioMin">Precio Mínimo:</label>
            <input
              type="number"
              id="precioMin"
              name="precioMin"
              {...register("precioMin", {
                // required: "Precio mínimo es requerido",
              })}
            />
          </div>

          <div className="filtro-grupo">
            <label htmlFor="precioMax">Precio Máximo:</label>
            <input
              type="number"
              id="precioMax"
              name="precioMax"
              {...register("precioMax")}
            />
          </div>

          <div className="filtro-grupo">
            <label htmlFor="kmMin">Kilómetros Mínimos:</label>
            <input
              type="number"
              id="kmMin"
              name="kmMin"
              {...register("kmMin")}
            />
          </div>

          <div className="filtro-grupo">
            <label htmlFor="kmMax">Kilómetros Máximos:</label>
            <input
              type="number"
              id="kmMax"
              name="kmMax"
              {...register("kmMax")}
            />
          </div>

          <div className="filtro-grupo">
            <label htmlFor="anio">Año:</label>
            <input type="number" id="anio" name="anio" {...register("anio")} />
          </div>

          <div className="filtro-grupo">
            <label htmlFor="combustible">Combustible:</label>
            <select
              id="combustible"
              name="combustible"
              {...register("combustible")}
            >
              <option value="">Seleccione</option>
              <option value="Gasolina">Gasolina</option>
              <option value="Diesel">Diesel</option>
              <option value="Eléctrico">Eléctrico</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>

          <div className="filtro-grupo">
            <label htmlFor="color">Color:</label>
            <input type="text" id="color" name="color" {...register("color")} />
          </div>

          <button type="submit">Enviar</button>
        </form>
        <style jsx>{`
          /* FORMULARIO FILTROS */
          .containerPanel {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;
            background: #1a1a1a;
            border-radius: 8px;
            color: #fff;
            max-width: 400px;

            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          .filtros-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          /* TITULOS DE FILTROS */
          .filtro-grupo label {
            display: block;
            margin-bottom: 8px;
            color: #ffffff;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          /* CUADRADOS DE ENTRADA */
          .filtro-grupo input,
          .filtro-grupo select {
            width: 100%;
            padding: 12px;
            background: #2d2d2d;
            border: 1px solid #3d3d3d;
            color: white;
            border-radius: 5px;
            outline: none;
          }

          /* ENFOQUE DE CAMPO */
          .filtro-grupo input:focus,
          .filtro-grupo select:focus {
            border-color: #ff3333;
            box-shadow: 0 0 0 2px rgba(255, 51, 51, 0.2);
          }

          /* BOTON DE ENVIO */
          button {
            padding: 15px;
            background: #ff3333;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
          }

          button:hover {
            background: #cc0000;
          }

          /* Estilos para dispositivos móviles */
          @media (max-width: 768px) {
            .filtros-form {
              padding: 10px;
            }
          }
        `}</style>
      </div>
    </>
  );
}
