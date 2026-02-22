import { Router } from 'express';
import { 
    getClientes, 
    getClienteById, 
    crearCliente, 
    actualizarCliente, 
    eliminarCliente 
} from '../controllers/cliente.controller.js'; // <-- CORREGIDO: Sin la extensión .ts

const router = Router();

// GET /api/clientes - Obtiene todos los clientes
router.get('/', getClientes);

// GET /api/clientes/:id - Obtiene un cliente específico por su ID
router.get('/:id', getClienteById);

// POST /api/clientes - Crea un nuevo cliente
router.post('/', crearCliente);

// PUT /api/clientes/:id - Actualiza un cliente existente
router.put('/:id', actualizarCliente);

// DELETE /api/clientes/:id - Elimina un cliente
router.delete('/:id', eliminarCliente);

export default router;