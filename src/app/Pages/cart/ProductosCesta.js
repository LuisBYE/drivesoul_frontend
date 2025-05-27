import React, { useState, useEffect } from "react";
import "./cart.css";
import ReqCarrito from "../../component/AxiosResquestAll/RequestsCarrito";

const ProductosCesta = ({ productoCesta, onRemoveItem }) => {
  // Estado para el total del carrito
  const [totalCarrito, setTotalCarrito] = useState(0);
  // Estado para todas las cantidades, usando el id del producto como clave
  const [cantidades, setCantidades] = useState(() =>
    Object.fromEntries(
      productoCesta.map((producto) => [
        producto.carritoItemId,
        producto.cantidad || 1,
      ])
    )
  );

  const handleIncrease = async (id) => {
    // Obtener el producto actual para poder actualizar la cantidad en el backend
    const productoActual = productoCesta.find(p => p.carritoItemId === id);
    if (!productoActual) return;

    const nuevaCantidad = cantidades[id] + 1;
    
    try {
      // Actualizar en el backend
      await ReqCarrito.updateCartItemQuantity(id, nuevaCantidad);
      
      // Actualizar estado local
      setCantidades((prev) => ({
        ...prev,
        [id]: nuevaCantidad,
      }));
    } catch (error) {
      console.error('Error al aumentar la cantidad:', error);
    }
  };

  const handleDecrease = async (id) => {
    // Obtener el producto actual para poder actualizar la cantidad en el backend
    const productoActual = productoCesta.find(p => p.carritoItemId === id);
    if (!productoActual) return;
    
    if (cantidades[id] <= 1) return;
    
    const nuevaCantidad = cantidades[id] - 1;
    
    try {
      // Actualizar en el backend
      await ReqCarrito.updateCartItemQuantity(id, nuevaCantidad);
      
      // Actualizar estado local
      setCantidades((prev) => ({
        ...prev,
        [id]: nuevaCantidad,
      }));
    } catch (error) {
      console.error('Error al disminuir la cantidad:', error);
    }
  };

  const handleRemoveItem = async (carritoItemId) => {
    try {
      const deleteItem = await ReqCarrito.removeCartItem(carritoItemId);
      if (deleteItem !== null) {
        onRemoveItem(carritoItemId); // Primero actualizamos el estado
        console.log(`Item con ID ${carritoItemId} eliminado correctamente.`);
      } else {
        console.error(`Error al eliminar el item con ID ${carritoItemId}.`);
        alert('No se pudo eliminar el producto. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Ocurrió un error al eliminar el producto. Por favor, intenta de nuevo.');
    }
  };

  // Calcular el total del carrito cuando cambie el estado de las cantidades o los productos
  useEffect(() => {
    let total = 0;
    productoCesta.forEach(producto => {
      total += (producto.precio || 0) * cantidades[producto.carritoItemId];
    });
    setTotalCarrito(total);
  }, [cantidades, productoCesta]);

  return (
    <div className="productos-cesta">
      <div className="productos-lista">
        {productoCesta.map((producto) => (
          <div key={producto.carritoItemId} className="producto-cesta">
            <div className="producto-imagen">
              <img 
                src={producto.imagen || "/FOTOS/COCHES/default.jpg"} 
                alt={producto.nombre || "Producto sin nombre"} 
              />
            </div>

            <div className="producto-info">
              <h3>{producto.nombre || "Producto sin nombre"}</h3>
              <div className="producto-detalles">
                <div className="detalle">
                  <i className="fas fa-car"></i>
                  <span>{producto.descripcion || "No especificada"}</span>
                </div>
                <div className="detalle">
                  <i className="fas fa-tag"></i>
                  <span>Categoría: {producto.categoria || "No especificado"}</span>
                </div>
              </div>
              <div className="control-cantidad">
                <button
                  onClick={() => handleDecrease(producto.carritoItemId)}
                  className="btn-cantidad btn-decrease"
                  title="Restar"
                  disabled={cantidades[producto.carritoItemId] === 1}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="cantidad-display">{cantidades[producto.carritoItemId]}</span>
                <button
                  onClick={() => handleIncrease(producto.carritoItemId)}
                  className="btn-cantidad btn-increase"
                  title="Sumar"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            
            <div className="producto-precio-acciones">
              <div className="precio-unitario">
                <span className="etiqueta">Precio unitario:</span>
                <span className="valor">{producto.precio?.toLocaleString("es-ES") || 0}€</span>
              </div>
              <div className="precio-total">
                <span className="etiqueta">Total:</span>
                <span className="valor">{((producto.precio || 0) * cantidades[producto.carritoItemId]).toLocaleString("es-ES")}€</span>
              </div>
              <button
                onClick={() => handleRemoveItem(producto.carritoItemId)}
                className="btn-eliminar"
                title="Eliminar"
              >
                <i className="fas fa-trash"></i> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {productoCesta.length > 0 && (
        <div className="resumen-carrito">
          <h2>Resumen del Pedido</h2>
          <div className="resumen-lineas">
            {productoCesta.map((producto) => (
              <div key={producto.carritoItemId} className="resumen-linea">
                <span className="resumen-producto">{producto.nombre} x{cantidades[producto.carritoItemId]}</span>
                <span className="resumen-precio">{((producto.precio || 0) * cantidades[producto.carritoItemId]).toLocaleString("es-ES")}€</span>
              </div>
            ))}
          </div>
          <div className="total-carrito">
            <span className="total-etiqueta">TOTAL</span>
            <span className="total-valor">{totalCarrito.toLocaleString("es-ES")}€</span>
          </div>
        </div>
      )}
      <style jsx>{`
        .productos-cesta {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 0;
          width: 100%;
        }
        
        .productos-lista {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 25px;
        }
        
        .producto-cesta {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 20px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
          padding: 25px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-left: 4px solid #ff3333;
          position: relative;
          overflow: hidden;
        }
        
        .producto-cesta:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
        }
        
        .producto-imagen {
          width: 140px;
          height: 90px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        
        .producto-imagen img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .producto-cesta:hover .producto-imagen img {
          transform: scale(1.05);
        }
        
        .producto-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .producto-info h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
        }
        
        .producto-detalles {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 15px;
        }
        
        .detalle {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #555;
        }
        
        .detalle i {
          color: #ff3333;
          font-size: 14px;
          width: 20px;
        }
        
        .control-cantidad {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
        }
        
        .btn-cantidad {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
        }
        
        .btn-decrease {
          background: rgba(255, 51, 51, 0.1);
          color: #ff3333;
        }
        
        .btn-decrease:hover:not(:disabled) {
          background: rgba(255, 51, 51, 0.2);
          transform: scale(1.1);
        }
        
        .btn-decrease:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        
        .btn-increase {
          background: rgba(40, 167, 69, 0.1);
          color: #28a745;
        }
        
        .btn-increase:hover {
          background: rgba(40, 167, 69, 0.2);
          transform: scale(1.1);
        }
        
        .cantidad-display {
          font-size: 18px;
          font-weight: 600;
          min-width: 30px;
          text-align: center;
          color: #333;
        }
        
        .producto-precio-acciones {
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: right;
          min-width: 180px;
        }
        
        .precio-unitario, .precio-total {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        
        .etiqueta {
          font-size: 14px;
          color: #666;
        }
        
        .valor {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }
        
        .precio-total .valor {
          color: #ff3333;
          font-size: 22px;
        }
        
        .btn-eliminar {
          background: rgba(255, 51, 51, 0.1);
          color: #ff3333;
          border: none;
          border-radius: 6px;
          padding: 10px 15px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 500;
        }
        
        .btn-eliminar:hover {
          background: rgba(255, 51, 51, 0.2);
          transform: translateY(-2px);
        }
        
        .resumen-carrito {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
          padding: 25px;
          margin-top: 20px;
          position: relative;
          overflow: hidden;
        }
        
        .resumen-carrito::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #ff3333, #cc0000);
        }
        
        .resumen-carrito h2 {
          margin: 0 0 20px 0;
          font-size: 1.4rem;
          font-weight: 700;
          color: #333;
          text-align: center;
          position: relative;
          padding-bottom: 10px;
        }
        
        .resumen-carrito h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #ff3333, #cc0000);
          border-radius: 1.5px;
        }
        
        .resumen-lineas {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
          max-height: 150px;
          overflow-y: auto;
          padding-right: 10px;
        }
        
        .resumen-linea {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px dashed #eee;
        }
        
        .resumen-producto {
          font-size: 14px;
          color: #555;
        }
        
        .resumen-precio {
          font-size: 15px;
          font-weight: 600;
          color: #333;
        }
        
        .total-carrito {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 15px;
          border-top: 2px solid #eee;
          margin-top: 10px;
        }
        
        .total-etiqueta {
          font-size: 18px;
          font-weight: 700;
          color: #333;
        }
        
        .total-valor {
          font-size: 24px;
          font-weight: 800;
          color: #ff3333;
        }
        
        @media (max-width: 768px) {
          .producto-cesta {
            grid-template-columns: 1fr;
            padding: 20px;
            gap: 15px;
          }
          
          .producto-imagen {
            width: 100%;
            height: 140px;
            margin-bottom: 10px;
          }
          
          .producto-precio-acciones {
            width: 100%;
            text-align: left;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
          }
          
          .precio-unitario, .precio-total {
            text-align: left;
          }
          
          .btn-eliminar {
            width: 100%;
            margin-top: 15px;
            justify-content: center;
          }
        }
        
        @media (max-width: 576px) {
          .producto-precio-acciones {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductosCesta;
