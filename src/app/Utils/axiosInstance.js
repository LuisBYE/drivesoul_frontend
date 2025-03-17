import axios from 'axios';

// Crea una instancia de Axios con configuración base
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5138/api', // Cambiar por la URL de tu backend 5138(CASA LUIS) o 5003(Portatil Luis) 
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer your-jwt-token',  // Token de autenticación
        //              'X-Custom-Header': 'foobar' 
    }
});

// Exporta la instancia correctamente
export default axiosInstance;
