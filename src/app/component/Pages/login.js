// Variables para mantener el estado
let isLoggedIn = false;
let currentUser = null;


const loginService = {


    login: (username, password) => {
        if (username === "unax" && password === "1234") {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            return { success: true, message: "Login exitoso" };
        }
        return { success: false, message: "Usuario o contraseña incorrectos" };
    },

    getLoginStatus: () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentUser = localStorage.getItem('currentUser');
        return { isLoggedIn, currentUser };
    },

    logout: () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
    }
};

export default loginService;