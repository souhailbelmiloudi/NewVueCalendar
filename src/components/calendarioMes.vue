<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { withDefaults, ref } from 'vue';
import { getAllEventos, createEvento, deleteEvento, updateEvento } from '@/CrudAxios/crudAxios';
import { diasSemana, diasSemanaIngles, diasSemanaCorto2 } from '@/utils/dateFunciones';
import type { Evento, PropsCelda } from '@/utils/Interfaces';
import celdaCalendario from '@/components/celdaCalendario.vue';
import PopUpModificar from '@/components/PopUpModificar.vue';
import PopUp from '@/components/PopUp.vue';
import EncabezadoDias from '@/vistas/EncabezadoDias.vue';
import Eventos from '@/components/EventosVue.vue';


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
const tipodedias = ref<string>('español');
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
 * Función para mantener la lista actualizada en tiempo real.
 * esto se puede hacer con polling o con websockets 
 */

// const startPolling = async () => {
//     setInterval(async () => {
//         try {
//            eventoss.value = await getAllEventos();
//            ;
//         } catch (error) {
//             console.error('Error en el polling:', error);
//         }
//     }, 5000); // Realizar polling cada 5 segundos (ajusta el intervalo según tus necesidades)
// };
// startPolling();

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
    Array.from(Array(props.ROWS + 1).keys()).map(() => '')) 
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
      return ['Lunes', 'Martes']
      break;
    case 'soloLaborales':
      return ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
      break;
  }
};

//computed para filtrar los dias segun el tipo
const cols = computed(() => {
  return filtrarDias(tipodedias.value);
});

const calcularClasesCelda = (fetcha: string) => {
  const hoy = new Date();
  const FormatoFecha = `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`
  if (fetcha === FormatoFecha) {
    return 'bold'
  } else if (fetcha === '') {
    return 'inactive'
  } else {
    return ''
  }

};


watchEffect(() => {
  cargarEventos();
  tipodedias.value

});



</script>

<template>
  

 
   <div class="header ">
    <div class="btnCalendar">
      <button  class="btnBorrar" 
               @dragover="eventoDragover" 
               @drop="dropBorrar">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m8.293 16.293 1.414 1.414L12 15.414l2.293 2.293 1.414-1.414L13.414 14l2.293-2.293-1.414-1.414L12 12.586l-2.293-2.293-1.414 1.414L10.586 14z"/><path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm.002 16H5V8h14l.002 12z"/></svg>
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
        
        <td v-for="(c, j) in cols" :key="c" :class="calcularClasesCelda(tablaMes[i - 1][j])">
          <celdaCalendario :fecha="tablaMes[i - 1][j]"  />
          <button class="btn" 
          @click="openPopUp(tablaMes[i - 1][j])"  
          @dragover="eventoDragover"
          @drop="eventoDrop(tablaMes[i - 1][j])"
          v-if="tablaMes[i - 1][j] !== ''">
          +</button>
          <!--campo eventos -->
          <Eventos  :fechaEvento="`${tablaMes[i - 1][j]}`" 
                    :eventoss="eventoss"  
                    @eliminar="eliminarEvento" 
                    @open="openPopUpModificar" 
                    @dragstart="eventorastrado"/>
          <!-- fin campo eventos -->
          <transition name="fade">
            <PopUp v-show="popUp && selectedDate === tablaMes[i - 1][j]" @close="closePopUp"
              @confirmar="maneJarDatosRecibidos" :fecha="selectedDate" />
          </transition>
          <transition name="fade">
            <PopUpModificar v-show="popUpModificar && evento" @close="closePopUpModificar" @confirmar="modificarEvento"
              :id="evento.id" :tarea="evento.tarea" :descripcion="evento.descripcion" :hora="evento.hora"
              :fecha="evento.fecha"  />
              <!-- :horaFin="evento.horaFin" -->
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


th {
  background-color: #c5e1d7;
 
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


td {
 font-weight: bold;
 
  padding: 10px;
  /* Relleno de celda */
  border: 1px solid #ddd;
  /* Agrega un borde delgado a las celdas */
  font-size: 14px;
  /* Tamaño de fuente */
  color: #333;
}
th {
  padding: 10px;
  /* Relleno de celda */
  border: 1px solid #ddd;
  /* Agrega un borde delgado a las celdas */
  font-size: 14px;
  /* Tamaño de fuente */
  color: #333;
}
td:hover {
  background-color: #b9c7f1;
  color: rgb(1, 1, 1);
  /* Color de fondo más claro al pasar el cursor */
}

.inactive {
  color: #888;
  background-color: #f4f4f4;
  /* Color de texto apagado */
}

.inactive:hover {
  background-color: #f4f4f4;
  /* Color de fondo más claro al pasar el cursor */
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
  background-color: #ffffff;
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
  color: #333;
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
