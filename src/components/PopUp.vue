<script setup lang="ts">
import { ref, withDefaults } from 'vue';
import type { PropsDate } from '@/utils/Interfaces';


// Definir props con valores por defecto
const props = withDefaults(defineProps<PropsDate>(), {
    fecha: '1',

});

// Definir emisores de eventos
const emit = defineEmits(['close', 'confirmar']);

// Variables reactivas para los datos de la tarea
const tarea = ref<string>();
const descripcion = ref<string>();
const hora = ref<string>(); 
const error = ref<string>();
//const horaFin = ref<string>('');

// Función para confirmar la tarea y emitir el evento 'confirm' con los datos de la tarea
const confirmar = () => {
    //verificar que los campos no esten vacios
    if (!tarea.value ) {
     error.value = 'El campo tarea es obligatorio';
    }else{
         // Crear un objeto con los datos de la tarea
        const datosTarea = {
        tarea: tarea.value,
        descripcion: descripcion.value,
        hora: hora.value,
        fecha: props.fecha  
    };
     // Emitir el evento 'confirm' con los datos de la tarea
        emit('confirmar', datosTarea); 
        clear()
    }
   
};

// Función para limpiar los campos de la tarea
const clear = () => {
    tarea.value = '';
    descripcion.value = '';
    hora.value = '';
    error.value = '';
    //horaFin.value = '';
};

</script>


<template>
    <div class="pop-up">
        <div class="pop-up-inner">
            <div class="pop-up-cerrar" @click="$emit('close')">
              &times;
            </div>
            <h1>
                {{ fecha }} 
            </h1>
            <div class="input">
                 <div class="error" v-if="error">{{ error }}</div>

                 
                <input type="text" placeholder="Tarea" v-model="tarea"  required/>
                <input type="text" placeholder="Descripcion" v-model="descripcion" required/>
                <label for="fecha">Hora</label>
                <input type="time" id="fecha" name="fecha" v-model="hora" />
                <label for="fecha">Hora Fin</label>
                <!-- <input type="time" id="fecha" name="fecha" v-model="horaFin" /> -->
        
            </div>
            <button @click="$emit('close')">
                Cerrar
            </button>
            <button @click="confirmar">
                Confirmar
            </button>
        </div>

    </div>
</template>

<style scoped>
    .error {
        color: rgba(255, 0, 0, 0.759);
        border: 2px solid rgba(255, 0, 0, 0.267);
        background-color: rgba(255, 0, 0, 0.267);
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;

    }
    .pop-up {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(228, 238, 255, 0.029);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pop-up-inner {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgb(82, 66, 255);
        position: relative;
        transition: all 300ms ease-in-out;
    }
    .pop-up-cerrar {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 24px;
        cursor: pointer;
    }
    .pop-up-cerrar:hover {
        color: red;
    }
    button {
        padding: 10px 20px;
        margin: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    button:hover {
        background-color: #f0f0f0;
    }
    button:active {
        background-color: #e0e0e0;
    }
    button:first-child {
        background-color: #f0f0f0;
    }
    button:first-child:hover {
        background-color: #e0e0e0;
    }
    button:first-child:active {
        background-color: #d0d0d0;
    }
    button:last-child {
        background-color: #00f;
        color: white;
    }
    button:last-child:hover {
        background-color: #00e;
    }
    button:last-child:active {
        background-color: #00d;
    }

    .fade-enter, .fade-leave-to {
      opacity: 0;

      
    }
     

    .fade-enter-active, .fade-leave-active {
      transition: all 290ms ease-in-out;
    }

.input {
    display: flex;
    flex-direction: column;
    gap: 10px; /* Espacio entre cada input */
}

.input input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none; /* Quita el borde resaltado al hacer clic */
    transition: border-color 0.3s ease-in-out; /* Agrega una transición suave al color del borde */
}

.input input:focus {
    border-color: #007bff; /* Cambia el color del borde cuando el input está enfocado */
}

</style>