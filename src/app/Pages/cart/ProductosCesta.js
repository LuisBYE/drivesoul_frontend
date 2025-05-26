import React from 'react';
import './cart.css';
import ReqCarrito from "../../component/AxiosResquestAll/RequestsCarrito";

const ProductosCesta = ({ productoCesta, onRemoveItem }) => {
  const handleRemoveItem = async (carritoItemId) => {
    try {
      if (onRemoveItem) {
        await onRemoveItem(carritoItemId);
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Error al eliminar el producto del carrito");
    }
  };

  return (
    <div className="productos-cesta">
      {productoCesta.map((producto) => (
        <div key={producto.carritoItemId} className="producto-cesta">
          <div className="producto-imagen">
            <img 
              src={producto.imagen || "/FOTOS/COCHES/ImgProductosDefault.png"} 
              alt={producto.nombre || "Producto sin nombre"} 
            />
          </div>
          <div className="producto-info">
            <h3>{producto.nombre || "Producto sin nombre"}</h3>
            <p>Marca: {producto.marca || "No especificada"}</p>
            <p>Modelo: {producto.modelo || "No especificado"}</p>
            <p>Cantidad: {producto.cantidad || 1}</p>
            <p className="precio">Precio: {producto.precio?.toLocaleString("es-ES") || 0}€</p>
          </div>
          <div className="producto-acciones">
            <button 
              onClick={() => handleRemoveItem(producto.carritoItemId)}
              className="btn-eliminar"
            >
              <i className="fas fa-trash"></i> Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductosCesta;
