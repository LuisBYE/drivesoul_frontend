import axiosInstance from "../../Utils/axiosInstance";

// Función para obtener productos
const getProductos = async () => {
  alert("Función de obtener productos async");
  try {
    const response = await axiosInstance.get("/Producto");
    const productos = response.data;

    console.log("Productos obtenidos:", productos);

    return productos; // Devuelve la lista de productos
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return null; // Devuelve null en caso de error
  }
};
const postProductos = async (crearProductoDto) => {
  try {
    const response = await axiosInstance.post("/Producto", crearProductoDto, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Producto creado:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear producto:", error);

    // Intenta leer el mensaje personalizado del backend
    const mensaje =
      error.response?.data?.mensaje || "Error inesperado al crear el producto";

    return { success: false, error: mensaje };
  }
};
const getProductoById = async (id) => {
  try {
    const response = await axiosInstance.get(`/Producto/${id}`);
    return response.data; // Devuelve los datos del producto
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    throw error; // Lanza el error para manejarlo en el frontend
  }
};
//  Actualizar producto existente
const updateProducto = async (id, actualizarProductoDto) => {
  try {
    const response = await axiosInstance.put(
      `/Producto/${id}`,
      actualizarProductoDto,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Producto actualizado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};
// Exportar las funciones
const ReqProductos = {
  getProductos,
  postProductos,
  getProductoById,
  updateProducto,
};

export default ReqProductos;
