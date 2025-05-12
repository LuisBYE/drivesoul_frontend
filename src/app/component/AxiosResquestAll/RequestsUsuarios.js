import axiosInstance from "../../Utils/axiosInstance";

// FUNCIÓN PARA OBTENER TODOS LOS USUARIOS
const getUsuarios = async () => {
  try {
    const response = await axiosInstance.get("/Usuarios");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return null;
  }
};

const getUsuarioById = async (id) => {
  try {
    const response = await axiosInstance.get(`/Usuarios/${id}`);
    return response.data; // Devuelve los datos del usuario
  } catch (error) {
    console.error(
      "Error al obtener el usuario por ID:",
      error.response || error
    );
    throw error; // Lanza el error para manejarlo en el frontend
  }
};
// FUNCIÓN PARA REGISTRAR UN USUARIO
const postUsuarios = async (user) => {
  try {
    const response = await axiosInstance.post("/Usuarios", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return null;
  }
};

const deleteUsuarios = async (id) => {
  try {
    const response = await axiosInstance.delete(`/Usuarios/${id}`);
    return response;
  } catch (error) {
    console.error("Error en deleteUsuarios:", error.response || error);
    throw error;
  }
};

// FUNCIÓN PARA LOGIN CON NOMBRE O EMAIL
const getLoginUser = async (params) => {
  try {
    const response = await axiosInstance.post("/Usuarios/login", params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return null;
  }
};

const validateUsuario = (usuario) => {
  // alert("Validando usuario...");
  const errors = {};

  if (!usuario.nombre || usuario.nombre.trim() === "") {
    errors.nombre = "El campo nombre es obligatorio.";
  }
  if (!usuario.apellido || usuario.apellido.trim() === "") {
    errors.apellido = "El campo apellido es obligatorio.";
  }
  if (!usuario.email || !/^\S+@\S+\.\S+$/.test(usuario.email)) {
    errors.email = "El campo email no tiene un formato válido.";
  }
  if (!usuario.telefono || !/^\d+$/.test(usuario.telefono)) {
    errors.telefono = "El campo telefono debe contener solo números.";
  }
  console.log("Errores de validación:", errors);
  return errors;
};

const updateUsuario = async (id, updatedUsuario) => {
  console.log("Datos ID del usuario a actualizar:", id);
  console.log("Datos del usuario a actualizar:", updatedUsuario);
  try {
    const response = await axiosInstance.put(
      `/Usuarios/${id}`,
      updatedUsuario,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Usuario actualizado:", response.data);
    return response.data; // Devuelve los datos actualizados
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      console.error("Errores de validación:", error.response.data.errors);
    } else {
      console.error("Error desconocido:", error);
    }
    throw error; // Lanza el error para manejarlo en el frontend
  }
};
// EXPORTAR LAS FUNCIONES
const ReqUsuarios = {
  getUsuarios,
  postUsuarios,
  getLoginUser,
  deleteUsuarios,
  getUsuarioById,
  updateUsuario,
  validateUsuario,
};

export default ReqUsuarios;
