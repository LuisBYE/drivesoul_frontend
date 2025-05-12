import Link from "next/link";
import ReqUsuarios from "../../AxiosResquestAll/RequestsUsuarios"; // Asegúrate de que la ruta sea correcta
import { useEffect } from "react";
import { useState } from "react";
export default function CardUsuario({ usuarios }) {
  const [_usuarios, setUsuarios] = useState(usuarios);
  const eliminarUsuario = async (_id) => {
    const id = parseInt(_id, 10);
    try {
      const response = await ReqUsuarios.deleteUsuarios(id); // Pasa el id como argumento
      console.log("Respuesta de la API:", response);
      if (response) {
        alert("Usuario eliminado correctamente");
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.id !== id)
        );
      } else {
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <div className="cards-container">
      {_usuarios.map((usuario) => (
        <div className="card" key={usuario.id}>
          <div className="card-header">
            <h3>
              {usuario.nombre} {usuario.apellido}
            </h3>
            <p className="rol">{usuario.rol || "Sin rol asignado"}</p>
          </div>
          <div className="card-body">
            <p>
              <strong>Email:</strong> {usuario.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {usuario.telefono}
            </p>
            <p>
              <strong>Ciudad:</strong> {usuario.ciudad}
            </p>
            <p>
              <strong>Contraseña:</strong> *****
            </p>
          </div>
          <div className="card-footer">
            <Link href={`/Pages/Admin/EditarUsuario/${usuario.id}`}>
              <button>Editar</button>
            </Link>
            <button onClick={() => eliminarUsuario(usuario.id)}>
              Eliminar Usuario
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
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          width: 300px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
        .card-header .rol {
          font-size: 0.9rem;
          color: #6b7280;
          font-style: italic;
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
          color: #4b5563;
        }
        .card-body p strong {
          color: #111827;
        }
        .card-footer {
          text-align: center;
          margin-top: 15px;
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .card-footer button {
          background-color: #3b82f6;
          color: white;
          padding: 10px 20px;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .card-footer button:hover {
          background-color: #2563eb;
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
