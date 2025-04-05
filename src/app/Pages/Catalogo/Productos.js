import React, { useEffect, useState } from "react";
import ReqProductos from "../../component/AxiosResquestAll/RequestsProductos"; //

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const productosObtenidos = await ReqProductos.getProductos(); // Llamada a la API
      setProductos(productosObtenidos); // Actualiza el estado con los productos
      alert(JSON.stringify(productosObtenidos));
    };

    fetchProductos(); // Ejecuta la función al cargar el componente
  }, []);

  return (
    <div className="productos-lista">
      {JSON.stringify(productos, null, 2)}
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
