import axiosInstance from "../../Utils/axiosInstance";

/* ARCHIVO DE PETICIONES PARA PEDIDOS
 * CONTIENE TODAS LAS FUNCIONES PARA INTERACTUAR CON EL BACKEND
 * RELACIONADAS CON LOS PEDIDOS DE COMPRA
 */

// FUNCIÓN PARA OBTENER TODOS LOS PEDIDOS DE UN USUARIO
const getPedidosUsuario = async () => {
    try {
        // VERIFICAR SI HAY UN USUARIO AUTENTICADO
        const userData = localStorage.getItem('user');
        if (!userData) return null;
        
        const userObj = JSON.parse(userData);
        
        // LLAMADA AL ENDPOINT DEL BACKEND
        // CUANDO EL BACKEND ESTÉ LISTO, DESCOMENTAR ESTE CÓDIGO
        /*
        const response = await axiosInstance.get(`/Pedido/Usuario/${userObj.id}`);
        console.log("Pedidos obtenidos:", response.data);
        return response.data;
        */
        
        // MIENTRAS TANTO, DEVOLVEMOS UN ARRAY VACÍO PARA PRUEBAS
        return [];
    } catch (error) {
        console.error("ERROR AL OBTENER PEDIDOS DEL USUARIO:", error);
        return null; // DEVUELVE NULL EN CASO DE ERROR
    }
};

// FUNCIÓN PARA OBTENER UN PEDIDO ESPECÍFICO POR ID
const getPedidoById = async (pedidoId) => {
    try {
        // LLAMADA AL ENDPOINT DEL BACKEND
        // CUANDO EL BACKEND ESTÉ LISTO, DESCOMENTAR ESTE CÓDIGO
        /*
        const response = await axiosInstance.get(`/Pedido/${pedidoId}`);
        console.log("Pedido obtenido:", response.data);
        return response.data;
        */
        
        // MIENTRAS TANTO, DEVOLVEMOS NULL PARA PRUEBAS
        return null;
    } catch (error) {
        console.error(`ERROR AL OBTENER PEDIDO CON ID ${pedidoId}:`, error);
        return null; // DEVUELVE NULL EN CASO DE ERROR
    }
};

// FUNCIÓN PARA CREAR UN NUEVO PEDIDO
const createPedido = async (pedidoData) => {
    try {
        // VERIFICAR QUE LOS DATOS DEL PEDIDO SEAN VÁLIDOS
        if (!pedidoData || !pedidoData.items || pedidoData.items.length === 0) {
            console.error("DATOS DE PEDIDO INVÁLIDOS");
            return null;
        }
        
        // LLAMADA AL ENDPOINT DEL BACKEND
        // CUANDO EL BACKEND ESTÉ LISTO, DESCOMENTAR ESTE CÓDIGO
        /*
        const response = await axiosInstance.post('/Pedido', pedidoData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Pedido creado:", response.data);
        return response.data;
        */
        
        // MIENTRAS TANTO, SIMULAMOS UNA RESPUESTA EXITOSA PARA PRUEBAS
        return {
            success: true,
            data: {
                id: Date.now(),
                fecha: new Date().toISOString(),
                estado: "PENDIENTE",
                ...pedidoData
            }
        };
    } catch (error) {
        console.error("ERROR AL CREAR PEDIDO:", error);
        return null; // DEVUELVE NULL EN CASO DE ERROR
    }
};

// FUNCIÓN PARA ACTUALIZAR EL ESTADO DE UN PEDIDO
const updateEstadoPedido = async (pedidoId, nuevoEstado) => {
    try {
        // VERIFICAR QUE LOS DATOS SEAN VÁLIDOS
        if (!pedidoId || !nuevoEstado) {
            console.error("DATOS DE ACTUALIZACIÓN INVÁLIDOS");
            return null;
        }
        
        // LLAMADA AL ENDPOINT DEL BACKEND
        // CUANDO EL BACKEND ESTÉ LISTO, DESCOMENTAR ESTE CÓDIGO
        /*
        const response = await axiosInstance.put(`/Pedido/${pedidoId}/estado`, { estado: nuevoEstado }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Estado de pedido actualizado:", response.data);
        return response.data;
        */
        
        // MIENTRAS TANTO, SIMULAMOS UNA RESPUESTA EXITOSA PARA PRUEBAS
        return {
            success: true,
            data: {
                id: pedidoId,
                estado: nuevoEstado,
                fechaActualizacion: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error(`ERROR AL ACTUALIZAR ESTADO DEL PEDIDO ${pedidoId}:`, error);
        return null; // DEVUELVE NULL EN CASO DE ERROR
    }
};

// FUNCIÓN PARA CANCELAR UN PEDIDO
const cancelarPedido = async (pedidoId, motivo) => {
    try {
        // VERIFICAR QUE LOS DATOS SEAN VÁLIDOS
        if (!pedidoId) {
            console.error("ID DE PEDIDO INVÁLIDO");
            return null;
        }
        
        // LLAMADA AL ENDPOINT DEL BACKEND
        // CUANDO EL BACKEND ESTÉ LISTO, DESCOMENTAR ESTE CÓDIGO
        /*
        const response = await axiosInstance.put(`/Pedido/${pedidoId}/cancelar`, { motivo }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Pedido cancelado:", response.data);
        return response.data;
        */
        
        // MIENTRAS TANTO, SIMULAMOS UNA RESPUESTA EXITOSA PARA PRUEBAS
        return {
            success: true,
            data: {
                id: pedidoId,
                estado: "CANCELADO",
                motivo: motivo || "Cancelado por el usuario",
                fechaCancelacion: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error(`ERROR AL CANCELAR PEDIDO ${pedidoId}:`, error);
        return null; // DEVUELVE NULL EN CASO DE ERROR
    }
};

// EXPORTAR LAS FUNCIONES
const ReqPedidos = {
    getPedidosUsuario,
    getPedidoById,
    createPedido,
    updateEstadoPedido,
    cancelarPedido
};

export default ReqPedidos;
