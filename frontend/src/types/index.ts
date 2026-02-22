export interface Cliente {
    id?: number;
    nombre: string;
    email: string;
    telefono: string;
    puntos_totales?: number;
    fecha_registro?: string;
}