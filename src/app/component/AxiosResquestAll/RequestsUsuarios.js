import axiosInstance from "../../Utils/axiosInstance";

// Función para obtener usuarios
const getUsuarios = async () => {
    try {
        const response = await axiosInstance.get('/Usuarios');
        return response.data;
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
        return null;
    }
};

// Función para registrar un usuario
const postUsuarios = async (user) => {
    try {
        const response = await axiosInstance.post('/Usuarios', user, {
            headers: {
                'Content-Type': 'application/json' // Asegura que el backend lo reciba como JSON
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear usuario:", error.response?.data || error.message);
        alert(`Error al crear usuario peticion: ${JSON.stringify(error.response?.data || error.message)}`);
        return null;
    }
};
const getLoginUser = async (params) => {
    try{
        const response = await axiosInstance.get(`/Usuarios`, params, {
            headers: {
                'Content-Type': 'application/json' // Asegura que el backend lo reciba como JSON
            }
        })
        return response.data;

    }catch(error){
        
    }
}

// Exportar las funciones
const ReqUsuarios = { 
    getUsuarios, 
    postUsuarios, 
    getLoginUser
};
export default ReqUsuarios;
