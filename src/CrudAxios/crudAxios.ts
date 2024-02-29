import axios from 'axios';
import swal from 'sweetalert2';

const baseURL = 'http://localhost:4000'; // URL de la API

// Función para obtener todos los eventos
export const getAllEventos = async () => {
    try {
        const response = await axios.get(`${baseURL}/eventos`);
        return response.data

    } catch (error) {
        swal.fire({
            title: 'Error',
            text: 'No se pudo obtener los eventos',
            icon: 'error'
        });
    }
};

// Función para crear un nuevo evento
export const createEvento = async (evento: any) => {
    try {
        const response = await axios.post(`${baseURL}/eventos`, evento);
        return response.data;
    } catch (error) {
        swal.fire({
            title: 'Error',
            text: 'No se pudo crear el evento',
            icon: 'error'
        });

    }
};

// Función para actualizar un evento existente
export const updateEvento = async (id: string, evento: any) => {
    try {
        const response = await axios.put(`${baseURL}/eventos/${id}`, evento);
        return response.data;
    } catch (error) {
        swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar el evento',
            icon: 'error'
        });
    }
};

// Función para eliminar un evento
export const deleteEvento = async (id: string) => {
    try {
        const response = await axios.delete(`${baseURL}/eventos/${id}`);
        return response.data;
    } catch (error) {
        swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar el evento',
            icon: 'error'
        });
    }
};

// función para modificar con patch
export const patchEvento = async (id: string, evento: any) => {
    try {
        const response = await axios.patch(`${baseURL}/eventos/${id}`, evento);
        return response.data;
    } catch (error) {
        swal.fire({
            title: 'Error',
            text: 'No se pudo modificar el evento',
            icon: 'error'
        });
    }
};

