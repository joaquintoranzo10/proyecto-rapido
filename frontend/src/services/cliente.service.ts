import { Cliente } from '../types';

const API_URL = 'http://localhost:3000/api/clientes';

export const obtenerClientes = async (): Promise<Cliente[]> => {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error('Error al obtener los clientes');
    return respuesta.json();
};

export const guardarCliente = async (cliente: Cliente): Promise<any> => {
    const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
    });
    if (!respuesta.ok) throw new Error('Error al guardar el cliente');
    return respuesta.json();
};