import axiosInstance from "../../Utils/axiosInstance";

// Función para obtener productos
// Función para obtener productos
const getCoches = async () => {
  try {
    const response = await axiosInstance.get("/Coche/ListarCoches"); // Ruta de Controller
    const Coches = response.data; // Los datos devueltos desde el backend

    console.log("Coches obtenidos:", Coches);

    return Coches;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return null; // Devuelve null en caso de error
  }
};

// Exportar las funciones
const ReqCoches = {
  getCoches,
};

export default ReqCoches;
