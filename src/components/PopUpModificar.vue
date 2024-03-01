<script setup lang="ts">
import { ref, withDefaults, watchEffect, h } from 'vue';
import type { Evento } from '@/utils/Interfaces';
import { convertirFecha, convertirFechaInversa } from '@/utils/dateFunciones';



const props = withDefaults(defineProps<Evento>(), {
    id: '',
    tarea: '',
    descripcion: '',
    hora: '',
    fecha: '', 
    //horaFin: ''  
});
const emit = defineEmits(['close', 'confirmar']);
//variables reactivas
const tarea = ref<string>(props.tarea);
const descripcion = ref<string>(props.descripcion);
const hora = ref<string>(props.hora);
const fecha = ref<string>(props.fecha);
//const horaFin = ref<string>(props.horaFin);

//funciones para el manejo de eventos
const confirmar = () => {
    const datosTarea = {
        id : props.id,
        tarea: tarea.value,
        descripcion: descripcion.value,
        hora: hora.value,
        fecha: convertirFechaInversa(fecha.value),
        //horaFin: horaFin.value
    };
    emit('confirmar', datosTarea);
};

watchEffect(() => {
    tarea.value = props.tarea;
    descripcion.value = props.descripcion;
    hora.value = props.hora;
    fecha.value = convertirFecha(props.fecha);
   // horaFin.value = props.horaFin;
});


</script>


<template>
    <div class="pop-up">
        <div class="pop-up-inner">
            <div class="pop-up-cerrar" @click="$emit('close')">
              &times;
            </div>
            <h1>
                {{ convertirFechaInversa(fecha) }}
          
            </h1>
            <div class="input">
                <input type="text" v-model="tarea" placeholder="Tarea" required/>
                <input type="text" v-model="descripcion" placeholder="Descripcion" />
                <input type="time" v-model="hora" placeholder="Hora" />
                <!-- <input type="time" v-model="horaFin" placeholder="Hora Fin" /> -->
                <input type="date" v-model="fecha"  placeholder="fecha" />
            
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