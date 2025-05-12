import axiosInstance from "../../Utils/axiosInstance";

/* ARCHIVO DE PETICIONES PARA CARRITO
 * CONTIENE TODAS LAS FUNCIONES PARA INTERACTUAR CON EL BACKEND
 * RELACIONADAS CON EL CARRITO DE COMPRAS
 */

// FUNCIÓN PARA OBTENER TODOS LOS ITEMS DEL CARRITO DE UN USUARIO
const getCarritoUsuario = async () => {
  try {
    // VERIFICAR SI HAY UN USUARIO AUTENTICADO
    const userData = localStorage.getItem("user");
    if (!userData) return null;

    const userObj = JSON.parse(userData);
    alert("llega aqui ");
    console.log(`aqui usuario ${JSON.stringify(userData)}`);

    if (!userObj?.id) {
      console.warn("ID de usuario no encontrado.");
      return null;
    }

    // LLAMADA AL ENDPOINT DEL BACKEND CON EL ID DEL USUARIO
    const response = await axiosInstance.get(`/Carrito/Usuario/${userObj.id}`);
    console.log("Items del carrito obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("ERROR AL OBTENER CARRITO DEL USUARIO:", error);

    // Fallback a localStorage en caso de error
    const storedCart = localStorage.getItem("drivesoulCart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
};

// FUNCIÓN PARA AÑADIR UN ITEM AL CARRITO
const addItemToCart = async (item) => {
  try {
    // VERIFICAR SI HAY UN USUARIO AUTENTICADO
    const userData = localStorage.getItem("user");
    if (!userData) return null;

    const userObj = JSON.parse(userData);

    // VERIFICAR QUE LOS DATOS DEL ITEM SEAN VÁLIDOS
    if (!item || !item.modelo_id) {
      console.error("DATOS DE ITEM INVÁLIDOS");
      return null;
    }

    // PREPARAR DATOS PARA EL BACKEND
    const itemData = {
      usuario_id: userObj.id,
      producto_id: item.modelo_id, // Cambiado de coche_id a producto_id
      cantidad: item.quantity || 1,
    };

    // LLAMADA AL ENDPOINT DEL BACKEND
    const response = await axiosInstance.post("/Carrito", itemData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Item añadido al carrito:", response.data);
    return response.data;
  } catch (error) {
    console.error("ERROR AL AÑADIR ITEM AL CARRITO:", error);
    return null; // DEVUELVE NULL EN CASO DE ERROR
  }
};

// FUNCIÓN PARA ACTUALIZAR LA CANTIDAD DE UN ITEM EN EL CARRITO
const updateCartItemQuantity = async (itemId, newQuantity) => {
  try {
    // VERIFICAR SI HAY UN USUARIO AUTENTICADO
    const userData = localStorage.getItem("user");
    if (!userData) return null;

    // VERIFICAR QUE LOS DATOS SEAN VÁLIDOS
    if (!itemId || newQuantity < 1) {
      console.error("DATOS DE ACTUALIZACIÓN INVÁLIDOS");
      return null;
    }

    // LLAMADA AL ENDPOINT DEL BACKEND
    const response = await axiosInstance.put(
      `/Carrito/${itemId}`,
      { cantidad: newQuantity },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Cantidad de item actualizada:", response.data);
    return response.data;
  } catch (error) {
    console.error(`ERROR AL ACTUALIZAR CANTIDAD DEL ITEM ${itemId}:`, error);
    return null; // DEVUELVE NULL EN CASO DE ERROR
  }
};

// FUNCIÓN PARA ELIMINAR UN ITEM DEL CARRITO
const removeCartItem = async (itemId) => {
  try {
    // VERIFICAR SI HAY UN USUARIO AUTENTICADO
    const userData = localStorage.getItem("user");
    if (!userData) return null;

    // VERIFICAR QUE LOS DATOS SEAN VÁLIDOS
    if (!itemId) {
      console.error("ID DE ITEM INVÁLIDO");
      return null;
    }

    // LLAMADA AL ENDPOINT DEL BACKEND
    const response = await axiosInstance.delete(`/Carrito/${itemId}`);
    console.log("Item eliminado del carrito:", response.data);
    return response.data;
  } catch (error) {
    console.error(`ERROR AL ELIMINAR ITEM ${itemId} DEL CARRITO:`, error);
    return null; // DEVUELVE NULL EN CASO DE ERROR
  }
};

// FUNCIÓN PARA VACIAR EL CARRITO DE UN USUARIO
const clearUserCart = async () => {
  try {
    // VERIFICAR SI HAY UN USUARIO AUTENTICADO
    const userData = localStorage.getItem("user");
    if (!userData) return null;

    const userObj = JSON.parse(userData);

    // LLAMADA AL ENDPOINT DEL BACKEND
    const response = await axiosInstance.delete(
      `/Carrito/Usuario/${userObj.id}`
    );
    console.log("Carrito vaciado:", response.data);
    return response.data;
  } catch (error) {
    console.error("ERROR AL VACIAR CARRITO:", error);
    return null; // DEVUELVE NULL EN CASO DE ERROR
  }
};

// EXPORTAR LAS FUNCIONES
const ReqCarrito = {
  getCarritoUsuario,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearUserCart,
};

export default ReqCarrito;
