import Link from "next/link";
import ReqProductos from "../../AxiosResquestAll/RequestsProductos"; // Ajusta la ruta si es diferente
import { useState } from "react";

export default function CardProducto({ productos }) {
  const [_productos, setProductos] = useState(productos);

  const eliminarProducto = async (_id) => {
    const id = parseInt(_id, 10);
    try {
      const response = await ReqProductos.deleteProducto(id);
      console.log("Respuesta de la API:", response);
      if (response) {
        alert("Producto eliminado correctamente");
        setProductos((prev) => prev.filter((producto) => producto.id !== id));
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="cards-container">
      {_productos?.map((producto) => (
        <div className="card" key={producto.id}>
          <div className="card-header">
            <h3>{producto.nombre}</h3>
            <p className="categoria">{producto.categoria || "Sin categoría"}</p>
          </div>
          <div className="card-body">
            <p>
              <strong>Descripción:</strong> {producto.descripcion}
            </p>
            <p>
              <strong>Precio:</strong> ${producto.precio}
            </p>
            <p>
              <strong>ID:</strong> {producto.id}
            </p>
          </div>
          <div className="card-footer">
            <Link href={`/Pages/Admin/EditarProducto/${producto.id}`}>
              <button>Editar</button>
            </Link>
            <button onClick={() => eliminarProducto(producto.id)}>
              Eliminar Producto
            </button>
          </div>
        </div>
      ))}

      <style jsx>{`
        .cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          padding: 20px;
        }

        .card {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 20px;
          width: 300px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          text-align: center;
          margin-bottom: 15px;
        }

        .card-header h3 {
          font-size: 1.5rem;
          color: #1f2937;
          margin: 0;
        }

        .card-header .categoria {
          font-size: 0.95rem;
          color: #3b82f6;
          font-weight: 500;
        }

        .card-body p {
          font-size: 1rem;
          margin: 8px 0;
          color: #4b5563;
        }

        .card-body p strong {
          color: #111827;
        }

        .card-footer {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 15px;
        }

        .card-footer button {
          background-color: rgb(33, 105, 193);
          color: white;
          padding: 10px 20px;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .card-footer button:hover {
          background-color: rgb(1, 93, 197);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .card-footer button:last-child {
          background-color: #ef4444;
        }

        .card-footer button:last-child:hover {
          background-color: #dc2626;
        }
      `}</style>
    </div>
  );
}
