import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FormContext } from "../../../context/FormContext";

export default function PanelFiltro() {
  const { register, handleSubmit, watch } = useForm();
  const { setFormValues } = useContext(FormContext);

  const formValues = watch();

  const onSubmit = (data) => {
    setFormValues(data);
    console.log("Formulario enviado:", data);
  };

  return (
    <>
      <div className="panel-filtro">
        <div className="panel-header">
          <div className="header-stripe"></div>
          <h2>Filtros de Búsqueda</h2>
          <div className="header-stripe"></div>
        </div>
        
        <form className="panel-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-container">
            <div className="form-group vehicle-group">
              <div className="group-title">Vehículo</div>
              <div className="form-row brand-model">
                <div className="input-block">
                  <label className="input-label">Marca</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Todas"
                      className="styled-input"
                      {...register("marca")}
                    />
                    <div className="input-focus-line"></div>
                  </div>
                </div>
                
                <div className="input-block">
                  <label className="input-label">Modelo</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Todos"
                      className="styled-input"
                      {...register("modelo")}
                    />
                    <div className="input-focus-line"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <div className="group-title">Rango de Precio</div>
              <div className="range-inputs">
                <div className="range-block">
                  <label className="small-label">Mínimo</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      placeholder="0"
                      className="range-input"
                      {...register("precioMin")}
                    />
                    <span className="euro-symbol">€</span>
                    <div className="input-focus-line"></div>
                  </div>
                </div>
                
                <div className="range-divider">
                  <span className="divider-line"></span>
                </div>
                
                <div className="range-block">
                  <label className="small-label">Máximo</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      placeholder="Sin límite"
                      className="range-input"
                      {...register("precioMax")}
                    />
                    <span className="euro-symbol">€</span>
                    <div className="input-focus-line"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <div className="group-title">Kilometraje</div>
              <div className="range-inputs">
                <div className="range-block">
                  <label className="small-label">Mínimo</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      placeholder="0"
                      className="range-input"
                      {...register("kmMin")}
                    />
                    <span className="unit-symbol">km</span>
                    <div className="input-focus-line"></div>
                  </div>
                </div>
                
                <div className="range-divider">
                  <span className="divider-line"></span>
                </div>
                
                <div className="range-block">
                  <label className="small-label">Máximo</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      placeholder="Sin límite"
                      className="range-input"
                      {...register("kmMax")}
                    />
                    <span className="unit-symbol">km</span>
                    <div className="input-focus-line"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <div className="group-title">Detalles Adicionales</div>
              <div className="details-grid">
                <div className="detail-block">
                  <label className="input-label">Año</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      placeholder="Cualquiera"
                      className="styled-input"
                      {...register("anio")}
                    />
                    <div className="input-focus-line"></div>
                  </div>
                </div>
                
                <div className="detail-block">
                  <label className="input-label">Color</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      placeholder="Cualquiera"
                      className="styled-input"
                      {...register("color")}
                    />
                    <div className="input-focus-line"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <div className="group-title">Tipo de Combustible</div>
              <div className="fuel-grid">
                <label className="fuel-option">
                  <input
                    type="radio"
                    value="Gasolina"
                    {...register("combustible")}
                  />
                  <span className="fuel-checkbox"></span>
                  <span className="fuel-name">Gasolina</span>
                </label>
                
                <label className="fuel-option">
                  <input
                    type="radio"
                    value="Diesel"
                    {...register("combustible")}
                  />
                  <span className="fuel-checkbox"></span>
                  <span className="fuel-name">Diesel</span>
                </label>
                
                <label className="fuel-option">
                  <input
                    type="radio"
                    value="Eléctrico"
                    {...register("combustible")}
                  />
                  <span className="fuel-checkbox"></span>
                  <span className="fuel-name">Eléctrico</span>
                </label>
                
                <label className="fuel-option">
                  <input
                    type="radio"
                    value="Híbrido"
                    {...register("combustible")}
                  />
                  <span className="fuel-checkbox"></span>
                  <span className="fuel-name">Híbrido</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="form-divider">
            <div className="divider-line"></div>
          </div>
          
          <div className="buttons-container">
            <button type="reset" className="button-reset">
              <span>Limpiar</span>
            </button>
            <button type="submit" className="button-search">
              <span>Buscar</span>
            </button>
          </div>
        </form>
        
        <style jsx>{`
          .panel-filtro {
            background-color: #0d0d0d;
            color: #fff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            max-width: 320px;
            min-height: 600px;
            font-family: 'Montserrat', sans-serif;
            border: 1px solid #252525;
            margin-top: 15px;
            display: flex;
            flex-direction: column;
          }
          
          .panel-header {
            background: linear-gradient(45deg, #000, #1a1a1a);
            padding: 12px 0;
            text-align: center;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
          }
          
          .header-stripe {
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.5), transparent);
            margin: 3px 0;
          }
          
          .panel-header:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(to right, transparent, #ff0000, transparent);
          }
          
          .panel-header h2 {
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 1px;
            margin: 5px 0;
            color: #fff;
          }
          
          .panel-form {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          
          .form-container {
            flex: 1;
            padding: 18px 15px 10px;
          }
          
          .form-group {
            margin-bottom: 16px;
            position: relative;
          }
          
          .group-title {
            font-size: 14px;
            color: #ff0000;
            margin-bottom: 8px;
            font-weight: 500;
            position: relative;
            display: inline-block;
          }
          
          .group-title:after {
            content: '';
            position: absolute;
            bottom: -3px;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(to right, #ff0000, transparent);
          }
          
          .form-row {
            margin-bottom: 8px;
          }
          
          .brand-model {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          
          .input-block {
            margin-bottom: 8px;
          }
          
          .input-label {
            display: block;
            font-size: 12px;
            color: #ccc;
            margin-bottom: 4px;
          }
          
          .small-label {
            display: block;
            font-size: 11px;
            color: #999;
            margin-bottom: 4px;
          }
          
          .input-wrapper {
            position: relative;
          }
          
          .styled-input, .range-input {
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid #333;
            border-radius: 8px;
            color: white;
            padding: 8px 10px;
            font-size: 13px;
            transition: all 0.3s;
          }
          
          .range-input {
            padding-right: 26px;
          }
          
          .styled-input:focus, .range-input:focus {
            outline: none;
            border-color: #ff0000;
            background: rgba(255, 255, 255, 0.08);
          }
          
          .input-focus-line {
            position: absolute;
            bottom: 0;
            left: 5%;
            width: 0;
            height: 2px;
            background: linear-gradient(to right, #ff0000, #ff3333);
            transition: width 0.3s;
            border-radius: 1px;
          }
          
          .styled-input:focus ~ .input-focus-line,
          .range-input:focus ~ .input-focus-line {
            width: 90%;
          }
          
          .styled-input::placeholder,
          .range-input::placeholder {
            color: #666;
            font-style: italic;
            font-size: 12px;
          }
          
          .range-inputs {
            display: flex;
            align-items: flex-end;
          }
          
          .range-block {
            flex: 1;
            position: relative;
          }
          
          .euro-symbol, .unit-symbol {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #888;
            font-size: 13px;
            pointer-events: none;
          }
          
          .range-divider {
            padding: 0 8px;
            display: flex;
            align-items: center;
            height: 35px;
          }
          
          .divider-line {
            width: 10px;
            height: 1px;
            background-color: #555;
          }
          
          .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          
          .detail-block {
            position: relative;
          }
          
          .fuel-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          
          .fuel-option {
            position: relative;
            display: flex;
            align-items: center;
            padding: 7px 10px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid #333;
          }
          
          .fuel-option:hover {
            background: rgba(255, 255, 255, 0.08);
          }
          
          .fuel-option input {
            position: absolute;
            opacity: 0;
          }
          
          .fuel-checkbox {
            display: inline-block;
            width: 16px;
            height: 16px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            margin-right: 8px;
            position: relative;
            transition: all 0.2s;
            border: 1px solid #444;
          }
          
          .fuel-checkbox:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #ff0000;
            transition: all 0.3s ease;
          }
          
          .fuel-option input:checked ~ .fuel-checkbox {
            background: rgba(255, 0, 0, 0.1);
            border: 1px solid #ff0000;
          }
          
          .fuel-option input:checked ~ .fuel-checkbox:after {
            transform: translate(-50%, -50%) scale(1);
          }
          
          .fuel-name {
            font-size: 12px;
            color: #ddd;
          }
          
          .form-divider {
            padding: 0 15px;
            margin-bottom: 15px;
          }
          
          .form-divider .divider-line {
            width: 100%;
            height: 1px;
            background: linear-gradient(to right, transparent, #333, transparent);
          }
          
          .buttons-container {
            display: flex;
            padding: 0 15px 20px;
            gap: 10px;
          }
          
          .button-reset, .button-search {
            flex: 1;
            border: none;
            border-radius: 8px;
            padding: 12px 0;
            font-size: 14px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
          }
          
          .button-reset {
            background: rgba(255, 255, 255, 0.08);
            color: #ccc;
            border: 1px solid #333;
          }
          
          .button-search {
            background: linear-gradient(45deg, #cc0000, #ff0000);
            color: white;
            box-shadow: 0 5px 15px rgba(255, 0, 0, 0.2);
          }
          
          .button-reset:hover {
            background: rgba(255, 255, 255, 0.12);
            color: #fff;
          }
          
          .button-search:hover {
            background: linear-gradient(45deg, #dd0000, #ff1a1a);
            transform: translateY(-2px);
            box-shadow: 0 7px 20px rgba(255, 0, 0, 0.3);
          }
          
          .button-search:active {
            transform: translateY(0);
          }
          
          .button-reset span, .button-search span {
            position: relative;
            z-index: 1;
          }
          
          /* Eliminar flechas de inputs numéricos */
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          
          input[type=number] {
            -moz-appearance: textfield;
          }
        `}</style>
      </div>
    </>
  );
}
