"use client";
import React from 'react';
import MenuSimple from '../../component/Pages/MenuSimple';
import '../../component/Pages/css.css';
import './filtros.css';
import Buscador from '../../Utils/Menu/Buscador';


const Catalogo = () => {
    return (
        <>
            {/* MENU */}
            <MenuSimple />
            
            {/* Título del catálogo */}
            <h1 style={{ fontSize: '3rem', textAlign: 'center', margin: '20px 0', color: '#333' }}>Catálogo</h1>
            
            {/* Buscador colocado debajo del título */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <Buscador />
            </div>
            
            {/* CONTENEDOR FILTROS (ESTILOS CSS)*/}
            <div className="catalogo-layout">
                
                {/* (ESTILOS CSS) */}
                <div className="filtros-sidebar">
                    <h3>Filtros</h3>
                    
                    {/* MARCA */}
                    <div className="filtro-grupo">
                        <label>Marca</label>
                        <select>
                            <option value="">Todas</option>
                            <option value="audi">Audi</option>
                            <option value="seat">Seat</option>
                            <option value="hyundai">Hyundai</option>
                            <option value="bmw">BMW</option>
                            <option value="mercedes">Mercedes</option> 
                        </select>
                    </div>

                    {/* PRECIOS*/}
                    <div className="filtro-grupo">
                        <label>Precio</label>
                        <div className="rango">
                            <input type="text" placeholder="Min €" />
                            <input type="text" placeholder="Max €" />
                        </div>
                    </div>

                    {/* KM */}
                    <div className="filtro-grupo">
                        <label>Kilometraje</label>
                        <div className="rango">
                            <input type="text" placeholder="Min km" />
                            <input type="text" placeholder="Max km" />
                        </div>
                    </div>

                    {/* AÑO */}
                    <div className="filtro-grupo">
                        <label>Año</label>
                        <select>
                            <option value="">Seleccionar año</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>

                    {/* COMBUSTIBLE */}
                    <div className="filtro-grupo">
                        <label>Combustible</label>
                        <select>
                            <option value="">Todos</option>
                            <option value="gasolina">Gasolina</option>
                            <option value="diesel">Diésel</option>
                            <option value="electrico">Eléctrico</option>
                        </select>
                    </div>

                    {/* COLOR COCHE */}
                    <div className="filtro-grupo">
                        <label>Color</label>
                        <select>
                            <option value="">Todos</option>
                            <option value="blanco">Blanco</option>
                            <option value="negro">Negro</option>
                            <option value="gris">Gris</option>
                            <option value="azul">Azul</option>
                            <option value="verde">Verde</option>
                            <option value="amarillo">Amarillo</option>
                            <option value="rojo">Rojo</option>  
                        </select>
                    </div>

                    {/* APLICAR FILTROS */}
                    <button className="btn-filtrar">Aplicar Filtros</button>
                </div>
            </div>
        </>
    );
};

export default Catalogo;