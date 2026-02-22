import { Request, Response } from 'express';
import pool from '../db.js';

// 1. Obtener todos los clientes
export const getClientes = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los clientes' });
    }
};

// 2. Obtener un solo cliente por ID
export const getClienteById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const [rows]: any = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).json({ mensaje: 'Cliente no encontrado' });
            return;
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el cliente' });
    }
};

// 3. Crear un cliente nuevo
export const crearCliente = async (req: Request, res: Response) => {
    const { nombre, email, telefono } = req.body;
    try {
        const [result]: any = await pool.query(
            'INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)',
            [nombre, email, telefono]
        );
        res.status(201).json({ 
            mensaje: 'Cliente creado con éxito',
            id: result.insertId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el cliente' });
    }
};

// 4. Actualizar un cliente
export const actualizarCliente = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
    try {
        const [result]: any = await pool.query(
            'UPDATE clientes SET nombre = ?, email = ?, telefono = ? WHERE id = ?',
            [nombre, email, telefono, id]
        );
        if (result.affectedRows === 0) {
            res.status(404).json({ mensaje: 'Cliente no encontrado para actualizar' });
            return;
        }
        res.json({ mensaje: 'Cliente actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar el cliente' });
    }
};

// 5. Eliminar un cliente
export const eliminarCliente = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const [result]: any = await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ mensaje: 'Cliente no encontrado para eliminar' });
            return;
        }
        res.json({ mensaje: 'Cliente eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el cliente' });
    }
};