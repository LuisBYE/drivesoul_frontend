import React, { useState } from 'react';
import './Buscador.css'; // Importa los estilos específicos para el buscador

// Componente funcional Buscador
const Buscador = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSearch = () => {
        onSearch(inputValue); // Llama a la función de búsqueda con el valor del input
    };

    return (
        <div className="buscador-container">
            {/* Campo de entrada para búsqueda */}
            <input 
                type="text" 
                className="buscador-input" 
                placeholder="Buscar..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} // Actualiza el estado del input
            />
            {/* Botón de búsqueda con texto */}
            <button className="buscador-button" onClick={handleSearch}>
                Buscar
            </button>
        </div>
    );
};

export default Buscador;
