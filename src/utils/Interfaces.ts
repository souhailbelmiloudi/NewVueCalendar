// Objetivo: Definir las interfaces que se utilizarán en el proyecto.
export interface Evento {
    id: string;
    tarea: string;
    descripcion: string;
    hora: string;
    fecha: string;
    //horaFin : string;
}


export interface PropsDate {
    fecha: string;
}


export interface PropsCelda {
    mes?: number;
    anio?: number;
    cols?: string[];
    COLS?: number;
    ROWS?: number;
}