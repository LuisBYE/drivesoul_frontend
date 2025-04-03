import React from 'react';
import NavegadorMenu from '../../component/Pages/Menu/Navegador';

const Novedades = () => {
    return (
        <div style={{ textAlign: 'center' }}> {/* Overall centering container */}
            <NavegadorMenu />
            <h1 style={{ fontSize: '3rem', margin: '20px 0', color: '#333' }}>Catálogo</h1>

            <div className="informacion-adicional" style={{ marginTop: '40px', padding: '20px', backgroundColor: '#817674', borderRadius: '8px', color: 'white', display: 'inline-block' }}>
                <h2>NOVEDADES</h2>
            </div>

            <div className="feature-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)', // Changed to 3 columns
                gap: '20px',
                padding: '20px',
                maxWidth: '1200px',
                margin: '0 auto', // Center the grid
            }}>

                <div className="feature-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                        src="/FOTOS/FOT1.png"
                        alt="Elegancia Italiana en Movimiento"
                        style={{
                            width: '100%',
                            borderRadius: '8px',
                            height: '200px',  // Fixed height
                            objectFit: 'cover', // Maintain aspect ratio, crop if needed
                        }}
                    />
                    <h3>ELEGANCIA ITALIANA EN MOVIMIENTO</h3>
                    <p>Experimenta la conducción elevada de un coche híbrido con precisión y estilo en el Alfa Romeo Junior Ibriada, con un rendimiento superior y una artesanía sin igual. Con su espacioso interior y su tecnología de vanguardia, el nuevo deportivo híbrido compacto está preparado para mejorar tu</p>
                </div>

                <div className="feature-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                        src="/FOTOS/FOT2.png"
                        alt="Pura Pasión Por La Conducción"
                        style={{
                            width: '100%',
                            borderRadius: '8px',
                            height: '200px',  // Fixed height
                            objectFit: 'cover', // Maintain aspect ratio, crop if needed
                        }}
                    />
                    <h3>PURA PASIÓN POR LA CONDUCCIÓN</h3>
                    <p>Dinámica de conducción impecable para una auténtica experiencia Alfa Romeo de confianza y control: comportamiento en carretera y prestaciones del chasis sin igual en todas las condiciones de conducción.</p>
                </div>

                <div className="feature-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img
                        src="/FOTOS/FOT3.png"
                        alt="Listo Para La Vida Cotidiana"
                        style={{
                            width: '100%',
                            borderRadius: '8px',
                            height: '200px',  // Fixed height
                            objectFit: 'cover', // Maintain aspect ratio, crop if needed
                        }}
                    />
                    <h3>LISTO PARA LA VIDA COTIDIANA</h3>
                    <p>Experimenta una notable amplitud en el interior del nuevo Alfa Romeo Junior Ibrida con un maletero de más de 400 litros de capacidad.</p>
                </div>

            </div>
        </div>
    );
};

export default Novedades;