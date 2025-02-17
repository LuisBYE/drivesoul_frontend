let users = [
    { username: "Unax", password: "1234" } // Usuario para probar
];

export default function login(username, password) {
    // Validar usuario
    const user = users.find(user => user.username === username);
    if (user && user.password === password) {
        return { success: true, message: "Usuario loggueado" };
    } else {
        return { success: false, message: "Usuario o contraseña incorrectos" };
    }
}