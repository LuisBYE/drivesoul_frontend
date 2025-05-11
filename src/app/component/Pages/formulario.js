import React from "react";
import { useForm } from "react-hook-form";

export default function FuncionesAdminForm({
  imputValue = [],
  options = [],
  defaultValues = {},
  onSubmit,
  display = "",
  titlePage = "Formulario",
  nameButton = "Enviar",
}) {
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data); // Envía los datos al componente padre
  };

  return (
    <div className="form-container" style={{ display: display }}>
      <div className="form-card">
        <h3 className="form-title">{titlePage}</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Campos de entrada */}
          {imputValue.map((field, index) => (
            <div key={index} className="form-group">
              <label className="form-label">{field}</label>
              <input
                className="form-input"
                {...register(field)}
                defaultValue={defaultValues[field]} // Establece el valor inicial
                placeholder={`Ingrese ${field}`}
              />
            </div>
          ))}

          {/* Opciones de selección */}
          {options.length > 0 && (
            <div className="form-group">
              <label className="form-label">Opciones</label>
              <select className="form-select" {...register("opciones")}>
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button type="submit" className="form-button">
            {nameButton}
          </button>
        </form>
      </div>

      <style jsx>{`
        .form-container {
          display: flex;
          justify-content: center;
          align-items: center;

          background: linear-gradient(135deg, #f3f4f6, #e3e4e8);
          padding: 50px;
        }

        .form-card {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .form-title {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 20px;
          font-weight: bold;
        }

        .form-group {
          margin-bottom: 15px;
          text-align: left;
        }

        .form-label {
          display: block;
          font-size: 1rem;
          margin-bottom: 5px;
          color: #555;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .form-input:focus,
        .form-select:focus {
          border-color: #4a90e2;
          box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
          outline: none;
        }

        .form-button {
          background-color: #4a90e2;
          color: white;
          padding: 12px 20px;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          width: 100%;
        }

        .form-button:hover {
          background-color: #357abd;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .form-card {
            width: 90%;
          }

          .form-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
