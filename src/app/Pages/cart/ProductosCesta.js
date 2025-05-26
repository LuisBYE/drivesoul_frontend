import React, { useState } from "react";
import "./cart.css";
import ReqCarrito from "../../component/AxiosResquestAll/RequestsCarrito";

const ProductosCesta = ({ productoCesta }) => {
  // Estado para todas las cantidades, usando el id del producto como clave
  const [cantidades, setCantidades] = useState(() =>
    Object.fromEntries(
      productoCesta.map((producto) => [
        producto.carritoItemId,
        producto.cantidad || 1,
      ])
    )
  );

  const handleIncrease = (id) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const handleDecrease = (id) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const handleRemoveItem = async (carritoItemId) => {
    const deleteItem = await ReqCarrito.removeCartItem(carritoItemId);
    if (deleteItem) {
      alert(`Item con ID ${carritoItemId} eliminado correctamente.`);
      console.log(`Item con ID ${carritoItemId} eliminado correctamente.`);
      // Aquí podrías actualizar el estado del carrito si es necesario
    } else {
      console.error(`Error al eliminar el item con ID ${carritoItemId}.`);
    }
  };

  return (
    <div className="productos-cesta">
      {productoCesta.map((producto) => (
        <div key={producto.carritoItemId} className="producto-cesta">
          {/* <div className="producto-imagen">
              <img 
                src={producto.imagen || "/FOTOS/COCHES/ImgProductosDefault.png"} 
                alt={producto.nombre || "Producto sin nombre"} 
              />
            </div> */}

          <div className="producto-info">
            <h3>{producto.nombre || "Producto sin nombre"}</h3>
            <p>Descripción: {producto.descripcion || "No especificada"}</p>
            <p>Categoría: {producto.categoria || "No especificado"}</p>
            <p>Cantidad: {cantidades[producto.carritoItemId]}</p>
            <p>carritoItemId: {producto.carritoItemId}</p>
            <p className="precio">
              Precio: {producto.precio?.toLocaleString("es-ES") || 0}€
            </p>
          </div>
          <div className="producto-acciones">
            <button
              onClick={() => handleRemoveItem(producto.carritoItemId)}
              className="btn-eliminar"
              title="Eliminar"
            >
              <i className="fas fa-trash"></i>
            </button>
            <button
              onClick={() => handleDecrease(producto.carritoItemId)}
              className="btn-cantidad"
              title="Restar"
              disabled={cantidades[producto.carritoItemId] === 1}
            >
              <i className="fas fa-minus"></i>
            </button>
            <button
              onClick={() => handleIncrease(producto.carritoItemId)}
              className="btn-cantidad"
              title="Sumar"
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      ))}
      <style jsx>{`
        .productos-cesta {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          background: #f5f7fa;
          min-height: 100vh;
        }
        .producto-cesta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          padding: 24px;
          transition: box-shadow 0.2s;
        }
        .producto-cesta:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.13);
        }
        .producto-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .producto-info h3 {
          margin: 0 0 4px 0;
          font-size: 1.3rem;
          color: #222;
        }
        .producto-info p {
          margin: 0;
          color: #555;
          font-size: 1rem;
        }
        .precio {
          font-weight: bold;
          color: #007bff;
          font-size: 1.1rem;
        }
        .producto-acciones {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .btn-eliminar {
          background: #ff4d4f;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-eliminar:hover {
          background: #d9363e;
          transform: scale(1.08);
        }
        .btn-cantidad {
          background: #007bff;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-cantidad:hover {
          background: #0056b3;
          transform: scale(1.08);
        }
        @media (max-width: 700px) {
          .producto-cesta {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .producto-acciones {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductosCesta;
