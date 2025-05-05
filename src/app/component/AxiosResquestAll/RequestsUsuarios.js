import axiosInstance from "../../Utils/axiosInstance";

// FUNCIÓN PARA OBTENER TODOS LOS USUARIOS
const getUsuarios = async () => {
    try {
        const response = await axiosInstance.get('/Usuarios');
        return response.data;
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return null;
    }
};

// FUNCIÓN PARA REGISTRAR UN USUARIO
const postUsuarios = async (user) => {
    try {
        const response = await axiosInstance.post('/Usuarios', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return null;
    }
};

// FUNCIÓN PARA LOGIN CON NOMBRE O EMAIL
const getLoginUser = async (params) => {
    try {
        const response = await axiosInstance.post('/Usuarios/login', params, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return null;
    }
}

// EXPORTAR LAS FUNCIONES
const ReqUsuarios = { 
    getUsuarios, 
    postUsuarios, 
    getLoginUser
};

export default ReqUsuarios;
