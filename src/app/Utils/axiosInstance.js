import axios from 'axios';

// Crea una instancia de Axios con configuración base
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5138/api', // Cambiar por la URL de tu backend 5138(CASA LUIS) o 5003(Portatil Luis) 
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para añadir el token de autenticación si existe
axiosInstance.interceptors.request.use(config => {
    const user = localStorage.getItem('user');
    if (user) {
        try {
            const userData = JSON.parse(user);
            if (userData.token) {
                config.headers.Authorization = `Bearer ${userData.token}`;
            }
        } catch (error) {
            console.error('Error al procesar el token de usuario:', error);
        }
    }
    return config;
});

// Exporta la instancia correctamente
export default axiosInstance;
