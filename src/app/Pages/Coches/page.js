import React from 'react';
import MenuSimple from '../../component/Pages/MenuSimple';

const Coche = () => {
    return (
        <div>
            <MenuSimple />
            <h1 style={{ fontSize: '3rem', textAlign: 'center', margin: '20px 0', color: '#333' }}>Catálogo</h1>
            
            <div className="informacion-adicional" style={{ marginTop: '40px', padding: '20px', backgroundColor: '#817674', borderRadius: '8px' }}>
                <h2>COCHES A MEDIDA</h2>    
            </div>
            
           

            
        </div>
    );
};

export default Coche;
