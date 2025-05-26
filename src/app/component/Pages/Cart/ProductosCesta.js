// import React from 'react';
// import './cart.css';

// const ProductosCesta = ({ productoCesta, onRemoveItem }) => {
//   return (
//     <div className="productos-cesta">
//       {productoCesta.map((producto) => (
//         <div key={producto.carritoItemId} className="producto-cesta">
//           <div className="producto-imagen">
//             <img src={producto.imagen} alt={producto.nombre} />
//           </div>
//           <div className="producto-info">
//             <h3>{producto.nombre}</h3>
//             <p>Marca: {producto.marca}</p>
//             <p>Modelo: {producto.modelo}</p>
//             <p>Cantidad: {producto.cantidad}</p>
//             <p className="precio">Precio: {producto.precio}€</p>
//           </div>
//           <div className="producto-acciones">
//             <button
//               onClick={() => onRemoveItem(producto.carritoItemId)}
//               className="btn-eliminar"
//             >
//               <i className="fas fa-trash"></i> Eliminar
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductosCesta;
