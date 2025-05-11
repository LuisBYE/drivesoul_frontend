"use client";
import React from "react";
import FuncionesAdminForm from "../../../../component/Pages/formulario";
import ReqUsuarios from "../../../../component/AxiosResquestAll/RequestsUsuarios"; // Asegúrate de que la ruta sea correcta
import NavegadorPag from "../../../../component/Pages/Menu/Navegador";
export default function EditarUsuarioPag({ params }) {
  const [id, setId] = React.useState(null);
  const [usuario, setUsuario] = React.useState();

  React.useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await params; // Desenvuelve la promesa
      setId(resolvedParams.id); // Establece el ID en el estado
    }
    fetchParams();
  }, [params]);

  React.useEffect(() => {
    if (id) {
      fetchUsuario();
    }
  }, [id]); // Llama a la función cuando el ID cambia

  const actualizarUsuario = async (id, formData) => {
    console.log("Datos del formulario antes:", formData);
    const filledFormData = {
      nombre: formData.nombre === "" ? usuario?.nombre : formData.nombre,
      apellido:
        formData.apellido === "" ? usuario?.apellido : formData.apellido,
      email: formData.email === "" ? usuario?.email : formData.email,
      telefono:
        formData.telefono === "" ? usuario?.telefono : formData.telefono,
      ciudad: formData.ciudad === "" ? usuario?.ciudad : formData.ciudad,
      rol: formData.rol === "" ? usuario?.rol : formData.rol,
    };
    ReqUsuarios.validateUsuario(filledFormData);
    console.log("Datos del formulario despues:", filledFormData);

    try {
      const response = await ReqUsuarios.updateUsuario(id, filledFormData); // Pasa el ID y los datos del usuario
      alert("Función de editar usuario async");
      console.log("Respuesta de la API:", response);

      if (response) {
        alert("Usuario actualizado correctamente");
      } else {
        alert("Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const fetchUsuario = async () => {
    try {
      const response = await ReqUsuarios.getUsuarioById(id);
      if (response) {
        setUsuario(response);
        console.log("Usuario obtenido:", response);
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };

  return (
    <div>
      <NavegadorPag />
      <div className="editar-usuario-container">
        <div className="view-datos-usuario">
          <h1 className="editar-usuario-title">Datos del Usuario</h1>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Imagen de usuario"
            className="editar-usuario-imagen"
          />
          <p className="editar-usuario-id">ID del usuario: {id}</p>
          <p className="editar-usuario-nombre">
            <strong>Nombre:</strong> {usuario?.nombre}
          </p>
          <p className="editar-usuario-apellido">
            <strong>Apellido:</strong> {usuario?.apellido}
          </p>
          <p className="editar-usuario-email">
            <strong>Email:</strong> {usuario?.email}
          </p>
          <p className="editar-usuario-telefono">
            <strong>Teléfono:</strong> {usuario?.telefono}
          </p>
          <p className="editar-usuario-ciudad">
            <strong>Ciudad:</strong> {usuario?.ciudad}
          </p>
          <p className="editar-usuario-rol">
            <strong>Rol:</strong> {usuario?.rol}
          </p>
        </div>
        <div className="editar-usuario-card">
          {/* Renderiza el formulario solo si los datos del usuario están disponibles */}
          <FuncionesAdminForm
            imputValue={[
              "nombre",
              "apellido",
              "email",
              "telefono",
              "ciudad",
              "rol",
            ]}
            nameButton="Actualizar Usuario"
            onSubmit={(formData) => {
              actualizarUsuario(id, formData); // Pasa el ID y los datos del formulario
            }}
            titlePage="Editar Usuario"
            defaultValues={{
              nombre: usuario?.nombre,
              apellido: usuario?.apellido,
              email: usuario?.email,
              telefono: usuario?.telefono,
              ciudad: usuario?.ciudad,
              rol: usuario?.rol,
            }}
          />
        </div>

        <style jsx>{`
          .view-datos-usuario {
            background-color: #1e272e; /* Fondo oscuro */
            color: #ffffff; /* Texto claro */
            padding: 20px;
            border-radius: 12px;

            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-wrap: wrap; /* Permite que los elementos se ajusten si no caben en una fila */
            justify-content: space-between; /* Espaciado uniforme entre elementos */
            gap: 15px;
          }

          .editar-usuario-title {
            font-size: 2rem;
            margin-bottom: 20px;
            text-align: center;
            font-weight: bold;
            color: #00cec9; /* Color destacado */
            width: 100%; /* Ocupa toda la fila */
          }
          .editar-usuario-id {
            align-content: center;
          }
          .editar-usuario-nombre {
            align-content: center;
          }

          .editar-usuario-imagen {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-bottom: 20px;
            border: 3px solid #00cec9; /* Borde destacado */
            align-self: center; /* Centra la imagen verticalmente */
          }

          .view-datos-usuario p {
            flex: 1 1 calc(33.333% - 10px); /* Tres columnas */
            font-size: 1.2rem;
            margin: 0;
            padding: 10px;
            background-color: #2f3640; /* Fondo de cada tarjeta */
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          }

          .view-datos-usuario p strong {
            display: block;
            font-size: 1rem;
            margin-bottom: 5px;
            color: #00cec9; /* Color destacado para los títulos */
          }

          @media (max-width: 768px) {
            .view-datos-usuario {
              flex-direction: column; /* Cambia a formato vertical en pantallas pequeñas */
              align-items: center;
            }

            .view-datos-usuario p {
              flex: 1 1 100%; /* Ocupa toda la fila en pantallas pequeñas */
            }
          }
        `}</style>
      </div>
    </div>
  );
}
