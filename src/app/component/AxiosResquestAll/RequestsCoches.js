import axiosInstance from "../../Utils/axiosInstance";

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

// Función para obtener un coche específico por ID
const getCocheById = async (id) => {
  try {
    const response = await axiosInstance.get(`/Coche/${id}`);
    console.log("Coche obtenido:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo coche con ID ${id}:`, error);
    return null;
  }
};

// Exportar las funciones
const ReqCoches = {
  getCoches,
  getCocheById,
};

export default ReqCoches;
