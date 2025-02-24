const mysql = require('mysql2');

// Crear una conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Nombre de usuario de la base de datos
  password: '',  // Si tienes una contraseña, reemplaza este campo con la contraseña correspondiente
  database: 'drivesoul',  // Reemplaza con el nombre de tu base de datos
});

// Conectar y verificar si hay un error
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos con el ID: ' + connection.threadId);
});

// Cerrar la conexión
// connection.end();
