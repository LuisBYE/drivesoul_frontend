import axios from 'axios';

// Detectamos automáticamente si estamos en localhost o en red local
const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

// Si estamos en localhost, usamos localhost, si no, usamos la IP del servidor
const backendHost = host === 'localhost' || host === '127.0.0.1' ? 'localhost' : host;

// Usamos el puerto correcto para el backend
const backendPort = '5000'; // Puerto de ASP.NET Core según tu configuración

// Construimos la URL completa
const baseURL = `http://${backendHost}:${backendPort}/api`;
console.log('Usando backend en:', baseURL);

// Crea una instancia de Axios con configuración base
const axiosInstance = axios.create({
    baseURL: baseURL,
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
