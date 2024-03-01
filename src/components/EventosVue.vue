<script setup lang="ts">
import type { Evento } from '@/utils/Interfaces';

// Define las propiedades esperadas en el componente
const props = defineProps<{
    fechaEvento: string;
    eventoss: Evento[];
}>(); 

// Define los eventos que pueden ser emitidos por el componente
const emit = defineEmits(['open', 'eliminar', 'dragstart']); // JSDoc: Define los eventos emitidos por el componente.

// Abre un evento
const abrir = (event: Evento) => {
    emit('open', event); // Emitir el evento 'open' con el evento como argumento.
};

// Elimina un evento
const deleteEvent = (id: string) => {
    emit('eliminar', id); // Emitir el evento 'eliminar' con el ID como argumento.
};

// Maneja el evento de arrastrar
const eventDragStart = (event: Evento) => {
    emit('dragstart', event); // Emitir el evento 'dragstart' con el evento como argumento.
};


</script>

<template>
    <div>
        <!-- Itera sobre los eventos proporcionados y renderiza la lista -->
        <div class="event-contenedor" v-for="event in props.eventoss" :key="event.id">
            <div class="event" v-if="event.fecha === props.fechaEvento" :draggable="true"
                @dragstart="eventDragStart(event)">
                <!-- Muestra el nombre de la tarea y botones para abrir y eliminar -->
                <span>{{ event.tarea }}</span>
                <div class="btn-event">
                    <button class="btn" @click="abrir(event)">+</button>
                    <button class="btn-rojo" @click="deleteEvent(event.id)">-</button>
                </div>
            </div>
        </div>
    </div>
</template>


