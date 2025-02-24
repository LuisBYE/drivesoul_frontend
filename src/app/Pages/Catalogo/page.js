import React from 'react';
import MenuSimple from '../../component/Pages/MenuSimple';
import '../../component/Pages/css.css';

const Catalogo = () => {
    return (
        <div>
            <MenuSimple />
            <h1 style={{ fontSize: '3rem', textAlign: 'center', margin: '20px 0', color: '#333' }}>Catálogo</h1>
            
            <div className="informacion-adicional" style={{ marginTop: '40px', padding: '20px', backgroundColor: '#817674', borderRadius: '8px' }}>
                <h2>CATALOGO</h2>    
            </div>
            <div className="catalogo-contenido">
                <h2>Productos Disponibles</h2>
                <ul>
                    <li>Producto 1: BMW Serie 1</li>
                    <li>Producto 2: BMW Serie 3</li>
                    <li>Producto 3: BMW X1</li>
                    <li>Producto 4: BMW X5</li>
                    <li>Producto 5: BMW i3</li>
                </ul>
            </div>

            
        </div>
    );
};

export default Catalogo;