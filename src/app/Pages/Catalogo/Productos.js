import React, { useEffect, useState } from 'react';
import ReqProductos from '../../component/AxiosResquestAll/RequestsProductos'; // 

const Productos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            const data = await ReqProductos.getProductos(); // LLAMAR A LA FUNCION PARA OBTENER PRODUCTOS
            if (data) {
                setProductos(data); // ESTO SE ENCARGA DE ACTUALIZAR EL ESTADO CON LOS PRODUCTOS OBTENIDOS
            }
        };

        fetchProductos();
    }, []);

    return (
        <div className="productos-lista">
            {productos.map((producto) => (
                <div key={producto.id} className="producto-item">
                    <h2>{producto.nombre}</h2>
                    <p>Precio: {producto.precio} €</p>
                    <img src={producto.imagen} alt={producto.nombre} />
                </div>
            ))}
        </div>
    );
};

export default Productos; 