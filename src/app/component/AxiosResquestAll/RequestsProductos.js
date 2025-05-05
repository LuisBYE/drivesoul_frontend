import axiosInstance from "../../Utils/axiosInstance";

// Función para obtener productos
// Función para obtener productos
const getProductos = async () => {
  try {
    const response = await axiosInstance.get("/Producto"); // Ruta para obtener productos
    const productos = response.data; // Los datos devueltos desde el backend

    // Si los productos se devuelven correctamente, los procesas aquí
    console.log("Productos obtenidos:", productos);

    // Aquí puedes manejar los productos como quieras
    // Si estás usando un estado en React, lo actualizas así:
    // setProducto(productos);

    return productos; // Devuelve los productos (opcional si necesitas usarlos más adelante)
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return null; // Devuelve null en caso de error
  }
};

// Exportar las funciones
const ReqProductos = {
  getProductos,
};

export default ReqProductos;
