import React from 'react';
import NavegadorMenu from '../../component/Pages/Menu/Navegador';

const Coche = () => {
    return (
        <div>
            <NavegadorMenu />
            <h1 style={{ fontSize: '3rem', textAlign: 'center', margin: '20px 0', color: '#333' }}>Catálogo</h1>
            
            <div className="informacion-adicional" style={{ marginTop: '40px', padding: '20px', backgroundColor: '#817674', borderRadius: '8px' }}>
                <h2>COCHES A MEDIDA</h2>    
            </div>
            
           

            
        </div>
    );
};

export default Coche;
