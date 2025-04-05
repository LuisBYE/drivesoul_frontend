import axiosInstance from "../../Utils/axiosInstance";

// Función para obtener productos
const getProductos = async () => {
    alert("getProductos")
    try {
        const response = await axiosInstance.get('/Producto'); // Ruta para obtener productos
        alert(`${JSON.stringify(response.data)}`)
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