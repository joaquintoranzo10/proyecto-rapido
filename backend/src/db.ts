import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargamos las variables del archivo .env
dotenv.config();

// Creamos un "pool" de conexiones (es más eficiente que abrir y cerrar una sola conexión)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;