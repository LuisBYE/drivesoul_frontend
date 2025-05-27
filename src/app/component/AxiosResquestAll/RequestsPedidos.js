import axiosInstance from "../../Utils/axiosInstance";

/* ARCHIVO DE PETICIONES PARA PEDIDOS
 * CONTIENE TODAS LAS FUNCIONES PARA INTERACTUAR CON EL BACKEND
 * RELACIONADAS CON LOS PEDIDOS
 */

// FUNCIÓN PARA OBTENER TODOS LOS PEDIDOS
const getPedidos = async () => {
    try {
        const response = await axiosInstance.get('/Pedido');
        console.log("Pedidos obtenidos:", response.data);
        return response.data;
    } catch (error) {
        console.error("ERROR AL OBTENER PEDIDOS:", error);
        return null;
    }
};

// FUNCIÓN PARA OBTENER UN PEDIDO ESPECÍFICO POR ID
const getPedidoById = async (pedidoId) => {
    try {
        if (!pedidoId) {
            console.error("ID DE PEDIDO INVÁLIDO");
            return null;
        }

        const response = await axiosInstance.get(`/Pedido/${pedidoId}`);
        console.log("Pedido obtenido:", response.data);
        return response.data;
    } catch (error) {
        console.error(`ERROR AL OBTENER PEDIDO ${pedidoId}:`, error);
        return null;
    }
};

// FUNCIÓN PARA OBTENER TODOS LOS PEDIDOS DE UN USUARIO
const getPedidosUsuario = async () => {
    try {
        // VERIFICAR SI HAY UN USUARIO AUTENTICADO
        const userData = localStorage.getItem('user');
        if (!userData) return null;
        
        const userObj = JSON.parse(userData);
        
        const response = await axiosInstance.get(`/Pedido/usuario/${userObj.id}`);
        console.log("Pedidos del usuario obtenidos:", response.data);
        return response.data;
    } catch (error) {
        console.error("ERROR AL OBTENER PEDIDOS DEL USUARIO:", error);
        return null;
    }
};

// FUNCIÓN PARA CREAR UN NUEVO PEDIDO
const createPedido = async (pedidoData) => {
    try {
        // VERIFICAR QUE LOS DATOS DEL PEDIDO SEAN VÁLIDOS
        if (!pedidoData) {
            console.error("DATOS DE PEDIDO INVÁLIDOS");
            return null;
        }

        const response = await axiosInstance.post('/Pedido', pedidoData);
        console.log("Pedido creado:", response.data);
        return response.data;
    } catch (error) {
        console.error("ERROR AL CREAR PEDIDO:", error);
        return null;
    }
};

// EXPORTAR LAS FUNCIONES
const ReqPedidos = {
    getPedidos,
    getPedidoById,
    getPedidosUsuario,
    createPedido
};

export default ReqPedidos;
