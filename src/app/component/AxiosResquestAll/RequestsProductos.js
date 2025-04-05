import axiosInstance from "../../Utils/axiosInstance";

// Función para obtener productos
const getProductos = async () => {
    try {
        const response = await axiosInstance.get('/api/productos'); // Ruta para obtener productos
        return response.data; // Devuelve los datos de los productos
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        return null; // Devuelve null en caso de error
    }
};

// Exportar las funciones
const ReqProductos = { 
    getProductos 
};

export default ReqProductos; 