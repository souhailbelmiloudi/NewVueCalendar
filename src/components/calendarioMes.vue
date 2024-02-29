<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { withDefaults, ref, defineProps } from 'vue';
import { getAllEventos, createEvento, deleteEvento, updateEvento } from '@/CrudAxios/crudAxios';
import { diasSemana, diasSemanaIngles, diasSemanaCorto2 } from '@/utils/dateFunciones';
import type { Evento, PropsCelda } from '@/utils/Interfaces';
import celdaCalendario from '@/components/celdaCalendario.vue';
import PopUpModificar from '@/components/PopUpModificar.vue';
import PopUp from '@/components/PopUp.vue';
import EncabezadoDias from '@/vistas/EncabezadoDias.vue';

const tipodedias = ref<string>('español');


/**
 * Función para filtrar dias de segun el tipo pasado
 */
const filtrarDias = (tipo: string) => {
  switch (tipo) {
    case 'español':
      return diasSemana;
      break;
    case 'ingles':
     return diasSemanaIngles;
      break;
    case 'corto':
   return diasSemanaCorto2;
      break;
    case 'soloFinde':
      return [ 'Lunes', 'Martes' ]
      break;
    case 'soloLaborales':
      return ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
      break;
  }
};


const cols = computed(() => {
  console.log(filtrarDias(tipodedias.value));
  return filtrarDias(tipodedias.value);
});

// Definir props con valores por defecto
const props = withDefaults(defineProps<PropsCelda>(), {
  cols: () => diasSemana,
  COLS: 7,
  ROWS: 6,
  anio: 2000,
  mes: 1
});

// Referencias reactivas
const eventoss = ref<Evento[]>([]);
const selectedDate = ref<string>("");
const popUp = ref<boolean>(false);
const popUpModificar = ref<boolean>(false);

const evento = ref<Evento>({
  id: '',
  tarea: '',
  descripcion: '',
  hora: '',
  fecha: '',
//horaFin: ''
});

/**
 * Función para cargar todos los eventos.
 */
const cargarEventos = async () => {
  try {
    eventoss.value = await getAllEventos();
  } catch (error) {
    alert('Error al cargar eventos');
  }
};

/**
 * Función para abrir el pop-up para agregar un evento.
 * @param {string} date - La fecha seleccionada para agregar el evento.
 */
const openPopUp = (date: string) => {
  popUp.value = true;
  selectedDate.value = date
};

/**
 * Función para abrir el pop-up para modificar un evento existente.
 * @param {Evento} event - El evento a modificar.
 */
const openPopUpModificar = (event: Evento) => {
  popUpModificar.value = true;
  evento.value = event;
};
/**
 * Función para cerrar el pop-up de agregar evento.
 */
const closePopUp = () => {
  popUp.value = false;
};
/**
 * Función para cerrar el pop-up de modificar evento.
 */
const closePopUpModificar = () => {
  popUpModificar.value = false;
};

/**
 * Función para manejar los datos recibidos al agregar un evento.
 * @param {Object} datos - Los datos del evento a agregar.
 * @param {string} datos.tarea - La tarea del evento.
 * @param {string} datos.descripcion - La descripción del evento.
 * @param {string} datos.hora - La hora del evento.
 */
const maneJarDatosRecibidos = async (datos: { tarea: string; descripcion: string; hora: string; }) => {
  await createEvento(datos);
  await cargarEventos();
  closePopUp();
};

/**
 * Función para modificar un evento existente.
 * @param {Object} datos - Los datos del evento a modificar.
 * @param {string} datos.id - El ID del evento a modificar.
 * @param {string} datos.tarea - La nueva tarea del evento.
 * @param {string} datos.descripcion - La nueva descripción del evento.
 * @param {string} datos.hora - La nueva hora del evento.
 * @param {string} datos.fecha - La nueva fecha del evento.
 */
const modificarEvento = async (datos: { id: string, tarea: string; descripcion: string; hora: string; fecha: string }) => {
  await updateEvento(datos.id, datos);
  await cargarEventos();
  closePopUpModificar();
};

/**
 * Función para eliminar un evento.
 * @param {string} id - El ID del evento a eliminar.
 */
const eliminarEvento = async (id: string) => {
  await deleteEvento(id);
  await cargarEventos();
};


const anadevalorSecuencial = (numero: number, valor: string, celdas: string[][]) => {
  const fila = Math.floor(numero / props.COLS);
  const columna = numero % props.COLS;
  celdas[fila][columna] = valor;
};
const tablaMes = computed(() => {
  const celdas = Array.from(Array(props.COLS).keys()).map(() =>
    Array.from(Array(props.ROWS + 1).keys()).map(() => '- ')) 
  const primerDia = new Date(`${props.anio}-${props.mes}-1`)
  const posicionPrimerDia = [6, 0, 1, 2, 3, 4, 5][primerDia.getDay()]
  const numDiasMes = new Date(props.anio, props.mes, 0).getDate()
  const rangoNumeros = [...Array(numDiasMes).keys()].map(i => i + posicionPrimerDia)
  rangoNumeros.map((el, ind) => anadevalorSecuencial(el, `${ind + 1}/${props.mes}/${props.anio}`, celdas))
  return celdas;
});

// Función que se ejecuta cuando un evento es arrastrado
const eventorastrado = (event: Evento) => {
  evento.value = event
}

// Función que se ejecuta cuando un evento es arrastrado sobre una celda
const eventoDragover = (event: Event) => {
  event.preventDefault();
}


// Función que se ejecuta cuando un evento es soltado sobre una celda
const eventoDrop = async (dia: string) => {
  evento.value.fecha = dia
  await updateEvento(evento.value.id, evento.value);
  await cargarEventos(); // Recargar eventos después de modificar uno
}

// Función que se ejecuta cuando un evento es soltado sobre el botón de borrar
const dropBorrar = async () => {
  await deleteEvento(evento.value.id);
  await cargarEventos(); // Recargar eventos después de borrar uno
}




watchEffect(() => {
  cargarEventos();
 tipodedias.value
  
});

const calcularClasesCelda = (fetcha: string) => {
  const hoy = new Date();
  const FormatoFecha = `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`
  if (fetcha === FormatoFecha) {
    return 'bold'
  } else if (fetcha === '- ') {
    return 'inactive'
  } else {
    return ''
  }

};



</script>

<template>
  

 
   <div class="header ">
    <div class="btnCalendar">
      <button  class="btnBorrar" 
               @dragover="eventoDragover" 
               @drop="dropBorrar">
        <box-icon type='solid' name='calendar-x'></box-icon>
      </button>
      <select name="" id="" v-model="tipodedias">
        <option value="español">Español</option>
        <option value="ingles">Ingles</option>
        <option value="corto">Corto</option>
        <option value="soloFinde">Solo fin de semana</option>
        <option value="soloLaborales">Solo laborales</option>
      </select>
  </div>
 </div>
  <table>
        <EncabezadoDias :diasSemana="filtrarDias(tipodedias)" />
        
    <tbody>
      <tr v-for="i in props.ROWS" :key="i">
        <th>{{ i - 1 }}</th>
        <td v-for="(c, j) in cols" :key="c" :class="calcularClasesCelda(tablaMes[i - 1][j])">
          <celdaCalendario :valor="tablaMes[i - 1][j]"  />
          <button class="btn" 
          @click="openPopUp(tablaMes[i - 1][j])"  
          @dragover="eventoDragover"
          @drop="eventoDrop(tablaMes[i - 1][j])"
          v-if="tablaMes[i - 1][j] !== '- '">
          +</button>
          <!--campo eventos -->
          <div class="event-contenedor" v-for="event in eventoss" :key="event.id"   
          
                     >
            <div class="event" v-if="tablaMes[i - 1][j] === event.fecha" :draggable="true"  @dragstart="eventorastrado(event)" >
              <span>{{ event.tarea }}</span>
              <div class="btn-event">
                <button class="btn" @click="openPopUpModificar(event)">+</button>
                <button class="btn-rojo" @click="eliminarEvento(event.id)">-</button>
              </div>
            </div>
          </div>
          <!-- fin campo eventos -->
          <transition name="fade">
            <PopUp v-show="popUp && selectedDate === tablaMes[i - 1][j]" @close="closePopUp"
              @confirmar="maneJarDatosRecibidos" :dia="selectedDate" />
          </transition>
          <transition name="fade">
            <PopUpModificar v-show="popUpModificar && evento" @close="closePopUpModificar" @confirmar="modificarEvento"
              :id="evento.id" :tarea="evento.tarea" :descripcion="evento.descripcion" :hora="evento.hora"
              :fecha="evento.fecha" />
          </transition>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
body {
  margin: 0;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}

th {
  background-color: #eee;
}

tr:first-of-type th {
  width: 100px;
}

tr:first-of-type th:first-of-type {
  width: 25px;
}

td {
  border: 1px solid #ccc;
  height: 1.5em;
  overflow: hidden;
}

.event-contenedor {
  margin-top: 5px;
  display: flex;
  flex-direction: column;
}

/* Estilos opcionales para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  /* Asegura anchos de columna consistentes */
  border: 1px solid #ddd;
  /* Agrega un borde delgado a la tabla */
  font-family: sans-serif;
  /* Preferencia de fuente moderna */
  background-color: #fff;
  /* Color de fondo opcional para la tabla */
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  height: 80px;
  vertical-align: top;
}

.inactive {
  color: #888;
  background-color: #f4f4f4;
  /* Color de texto apagado */
}

/* Esquema de colores moderno y accesible */
.bold {
    font-weight: bold;
    background-color: #57eee176;

}

.bold:hover {
  background-color: #0062cc;
  /* Azul más oscuro al pasar el cursor */
}

tr:nth-child(even) {
  background-color: #f7f7f7;
}

.btn {
  background-color: #00b7ff;
  color: white;
  border: none;
  cursor: pointer;
  text-align: center;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  border-radius: 50%;
}

.btn:hover {
  background-color: #20272f;
  /* Azul más oscuro al pasar el cursor */
}

/* Estilo para el div de eventos */
.event {
  background-color: #ffffff;
  border: 1px solid #6663ba;
  border-radius: 10px;
  padding: 3px;
  margin-bottom: 1px;
  display: flex;
  justify-content: space-between;
}

.event-contenedor {
  margin-top: 5px;
}

.btn-rojo {
  background-color: #f01212d8;
  color: white;
  border: none;
  cursor: pointer;
  text-align: center;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  border-radius: 50%;
}

.btn-rojo:hover {
  background-color: #f01212;
  /* Rojo más oscuro al pasar el cursor */
}

.btnCalendar {
 display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
}

</style>
