import React from "react";
import "./Buscador.css"; // Importa los estilos específicos para el buscador

// Componente funcional Buscador
const Buscador = () => {
  return (
    <div className="buscador-container">
      {/* Campo de entrada para búsqueda */}
      <input type="text" className="buscador-input" placeholder="Buscar..." />
      {/* Botón de búsqueda con texto */}
      <button className="buscador-button">Buscar</button>
    </div>
  );
};

export default Buscador;
