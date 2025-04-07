import React, { useEffect, useState } from "react";
import ReqProductos from "../../component/AxiosResquestAll/RequestsProductos"; // IMPORTA LA FUNCION PARA OBTENER PRODUCTOS

const Productos = ({ searchTerm }) => {
  const [productos, setProductos] = useState([]); // ESTO SE ENCARGA DE ALMACENAR LA LISTA DE PRODUCTOS

  useEffect(() => {
    const fetchProductos = async () => {
      const productosObtenidos = await ReqProductos.getProductos(); // LLAMA AL BACKEND PARA OBTENER LOS PRODUCTOS
      setProductos(productosObtenidos); // SE ENCARGA DE ACTUALIZAR EL ESTADO CON LOS PRODUCTOS OBTENIDOS
    };

    fetchProductos(); // se EJECUTA CUANDO SE CARGA EL COMPONENTE ES DECIR CUANDO SE ACTUALIZA LA PAGINA
  }, []);

  // FILTRAJE DE PRODUCTOS 

  const filteredProductos = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="productos-lista"> {/* LISTA DE PRODUCTOS */}
      {filteredProductos.map((producto) => (
        <div key={producto.id} className="producto-item"> {/* ID PRODUCTO */}
          <h2>{producto.nombre}</h2> {/* Muestra el nombre del producto */}
          <p>{producto.descripcion}</p> {/* Muestra la descripción del producto */}
          <p>Precio: {producto.precio} €</p> {/* Muestra el precio del producto */}
          <p>Categoría: {producto.categoria}</p> {/* Muestra la categoría del producto */}
          <img src={producto.imagen} alt={producto.nombre} /> {/* Muestra la imagen del producto */}
        </div>
      ))}
    </div>
  );
};

export default Productos; // 
