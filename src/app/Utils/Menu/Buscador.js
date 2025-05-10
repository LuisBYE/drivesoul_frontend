import React, { useState } from 'react';
import './Buscador.css';

// Componente funcional Buscador
const Buscador = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSearch = () => {
        onSearch(inputValue);
    };

    return (
        <div className="buscador-container">
            <input
                type="text"
                className="buscador-input" 
                placeholder="Buscar..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="buscador-button" onClick={handleSearch}>
                Buscar
            </button>
        </div>
    );
};

export default Buscador;
