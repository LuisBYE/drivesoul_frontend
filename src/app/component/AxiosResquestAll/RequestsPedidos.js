import axiosInstance from "../../Utils/axiosInstance";

const getPedidosUsuario = async () => {
    try {
        const userData = localStorage.getItem('user');
        if (!userData) return null;

        const userObj = JSON.parse(userData);
        const response = await axiosInstance.get(`/pedidos/usuario/${userObj.id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        return null;
    }
};

const getPedidoById = async (pedidoId) => {
    try {
        const response = await axiosInstance.get(`/pedidos/${pedidoId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener pedido:', error);
        return null;
    }
};

const createPedido = async (pedidoData) => {
    try {
        const response = await axiosInstance.post('/pedidos', pedidoData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

// Exportar las funciones
const ReqPedidos = {
    getPedidosUsuario,
    getPedidoById,
    createPedido
};

export default ReqPedidos;
