import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.ts';
import clienteRoutes from './routes/cliente.routes.ts'; // <-- Importamos las rutas

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); 

// Rutas de tu API
app.use('/api/clientes', clienteRoutes); // <-- Conectamos las rutas de clientes

// Ruta de prueba para verificar la conexión a MySQL
app.get('/api/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT "¡Conexión exitosa a MySQL!" AS mensaje');
        res.json({ estado: 'éxito', datos: rows });
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
        res.status(500).json({ estado: 'error', mensaje: 'No se pudo conectar a la base de datos', detalle: error });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});