<script setup lang="ts">
import { getAllEventos, createEvento, deleteEvento, updateEvento } from '@/CrudAxios/crudAxios';
import { convertirFecha, convertirFechaInversa } from '@/utils/dateFunciones';
import { ref, onMounted } from 'vue';
import type { Evento } from '@/utils/Interfaces';

/** Lista reactiva que almacena todos los eventos */
const eventos = ref<Evento[]>([]);

// Variables para el formulario ts
const tarea = ref<string>('');
const descripcion = ref<string>('');
const hora = ref<string>('');
const fecha = ref<string>('');
const inputbtn = ref<string>('Añadir');
const id = ref<string>('');

/**
 * Función asincrónica para añadir un nuevo evento.
 * @returns {Promise<void>}
 */
const addEvento = async (): Promise<void> => {
    if (inputbtn.value === 'Añadir') {
        try {
            const evento = await createEvento({
                tarea: tarea.value,
                descripcion: descripcion.value,
                hora: hora.value,
                fecha: convertirFechaInversa(fecha.value)
            });
            eventos.value.push(evento);
            resetForm();
        } catch (error) {
            alert('Error al añadir evento');
        }
    } else {
        try {
            await updateEvento(id.value, {
                tarea: tarea.value,
                descripcion: descripcion.value,
                hora: hora.value,
                fecha: convertirFechaInversa(fecha.value)
            });
            eventos.value = eventos.value.map((evento) => {
                if (evento.id === id.value) {
                    return {
                        ...evento,
                        tarea: tarea.value,
                        descripcion: descripcion.value,
                        hora: hora.value,
                        fecha: convertirFechaInversa(fecha.value)
                    };
                }
                return evento;
            });

            resetForm();


        } catch (error) {
            alert('Error al modificar evento');
        }

    }
};
const ModificarEvent = (evento: Evento) => {
    tarea.value = evento.tarea;
    descripcion.value = evento.descripcion;
    hora.value = evento.hora;
    inputbtn.value = 'Modificar';
    fecha.value=convertirFecha(evento.fecha)
    id.value = evento.id;

}
/**
 * Función asincrónica para eliminar un evento existente.
 * @param {string} id - ID del evento a eliminar.
 * @returns {Promise<void>}
 */
const borrarEvent = async (id: string): Promise<void> => {
    try {
        await deleteEvento(id);
        eventos.value = eventos.value.filter((evento) => evento.id !== id);
    } catch (error) {
        alert('Error al eliminar evento');
    }
};

/**
 * Función asincrónica para cargar todos los eventos existentes.
 * @returns {Promise<void>}
 */
const cargarEventos = async (): Promise<void> => {
    try {
        eventos.value = await getAllEventos();
    } catch (error) {
        alert('Error al cargar eventos');
    }
};

const resetForm = () => {
    tarea.value = '';
    descripcion.value = '';
    hora.value = '';
    fecha.value = '';
    inputbtn.value = 'Añadir';
    id.value = '';
};

onMounted(async () => {
    await cargarEventos();
});
</script>


<template>
    <div class="contenedor">

        <div class="formulario">
            <h2>Añadir Tarea</h2>
            <form @submit.prevent="addEvento">
                <!-- input hidden para el id -->
                <input type="hidden" id="id" v-model="id" readonly />
                <input type="text" id="tarea" v-model="tarea" placeholder="Tarea" />
                <input type="text" id="descripcion" v-model="descripcion" placeholder="Descripción" />
                <input type="time" id="hora" v-model="hora" />
                <input type="date" id="fecha" v-model="fecha" />
                <!--btn no activado-->
                <input type="submit" :value="inputbtn" class="btnForm" />
            </form>
        </div>
        <div class="lista-tareas">
            <h2>Lista de Tareas</h2>
            <ul v-for="evento in eventos" :key="evento.id">
                <li>
                    <h3>{{ evento.tarea }}</h3>
                    <p><span>Descripción: </span>{{ evento.descripcion }}</p>
                    <p> <span>Hora: </span>{{ evento.hora }}</p>
                    <p><span>Fecha :</span>{{ evento.fecha }}</p>
                    <button @click="borrarEvent(evento.id)">Eliminar</button>
                    <button @click="ModificarEvent(evento)" class="modificar">Modificar</button>

                </li>
            </ul>
        </div>

    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.contenedor {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to right, #9adfff, #c4facf);
}

.formulario {
    width: 40%;
    padding: 20px;
    border-radius: 20px;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 30px;
}

.formulario h2 {
    text-align: center;
    color: #6a3cf3;
    font-size: 24px;
}

.formulario form {
    display: flex;
    flex-direction: column;
}

.formulario label {
    font-weight: bold;
    margin-top: 10px;
}

.formulario input {
    border: 1px solid #9aa6ff;
    border-radius: 10px;
    padding: 10px;
}

.formulario .btnForm {
    margin-top: 10px;
    border: none;
    border-radius: 10px;
    padding: 10px;
    background: #4c6cec;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

.lista-tareas {
    width: 40%;
    margin-top: 20px;
    padding: 20px;
    border-radius: 20px;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.lista-tareas h2 {
    text-align: center;
    color: #4881ec;
    font-size: 24px;
}

.lista-tareas ul {
    list-style: none;
}

.lista-tareas li {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #cac4fa;
    border-radius: 10px;
}

.lista-tareas li h3 {
    color: #0c3c54;
    font-size: 18px;
}

.lista-tareas li p {
    color: #0b453e;
    font-size: 14px;
}

.lista-tareas li button {
    float: right;
    border: none;
    border-radius: 10px;
    padding: 5px;
    margin-left: 5px;
    background: #ba3a17;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

.lista-tareas li .modificar {
    background: #1ab2a5;
    color: black;
}
</style>