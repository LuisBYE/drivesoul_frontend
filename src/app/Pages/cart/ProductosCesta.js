import ReqCarrito from "../../component/AxiosResquestAll/RequestsCarrito";
export default function ProductosCesta({ productoCesta = [] }) {
  const productos = Array.isArray(productoCesta)
    ? productoCesta
    : [productoCesta];

  const eliminarProductoCesta = async (id) => {
    alert(
      "falta meter id de carritoItems en Productos cesta en el componete Page de Cart "
    );
    console.log(`ID PARA ELIMINAR ${id}`);
    // const response = await ReqCarrito.removeCartItem(id);
  };

  return (
    <>
      <div className="cesta-container">
        {productos.length > 0 ? (
          productos.map((item) => (
            <div key={item.id} className="producto-card">
              <div className="imagen">
                <img
                  src={item.imagen || "/FOTOS/COCHES/ImgProductosDefault.png"}
                  alt={item.nombre || "Producto sin nombre"}
                />
              </div>
              <div className="detalles">
                <h3>{item.nombre || "Producto sin nombre"}</h3>
                <p className="descripcion">
                  {item.descripcion || "Sin descripción"}
                </p>
                <p className="precio">
                  {item.precio?.toLocaleString("es-ES")} €
                </p>
                <span className="categoria">
                  {item.categoria || "Sin categoría"}
                </span>
              </div>
              <div className="acciones">
                <button
                  className="btn-eliminar"
                  aria-label="Eliminar"
                  onClick={() => eliminarProductoCesta(item.id)}
                >
                  <i className="fas fa-trash" />
                </button>
                <div className="control-cantidad">
                  <button className="btn-cantidad">
                    <i className="fas fa-minus" />
                  </button>
                  <span className="cantidad">1</span>
                  <button className="btn-cantidad">
                    <i className="fas fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="mensaje-vacio">No hay productos en el carrito.</p>
        )}
      </div>

      <style jsx>{`
        .cesta-container {
          width: 100%;
          max-width: 1200px;
          margin: auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .producto-card {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          background: #fdfdfd;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
          align-items: center;
          transition: box-shadow 0.3s;
        }

        .producto-card:hover {
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
        }

        .imagen img {
          width: 140px;
          height: 140px;
          object-fit: cover;
          border-radius: 12px;
          border: 1px solid #ddd;
        }

        .detalles {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .detalles h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #222;
          margin: 0;
        }

        .descripcion {
          color: #666;
          font-size: 0.95rem;
        }

        .precio {
          font-size: 1.1rem;
          font-weight: 700;
          color: #198754;
        }

        .categoria {
          font-size: 0.85rem;
          color: #999;
        }

        .acciones {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .btn-eliminar {
          background: #dc3545;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.5rem 0.75rem;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.2s ease-in-out, transform 0.2s;
        }

        .btn-eliminar:hover {
          background: #b02a37;
          transform: scale(1.05);
        }

        .control-cantidad {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-cantidad {
          background: #0d6efd;
          color: #fff;
          border: none;
          padding: 0.4rem 0.6rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.2s ease-in-out;
        }

        .btn-cantidad:hover {
          background: #084298;
        }

        .cantidad {
          font-weight: 600;
          min-width: 20px;
          text-align: center;
        }

        .mensaje-vacio {
          text-align: center;
          font-size: 1.2rem;
          color: #888;
        }

        @media (max-width: 768px) {
          .producto-card {
            flex-direction: column;
            align-items: stretch;
          }

          .acciones {
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
