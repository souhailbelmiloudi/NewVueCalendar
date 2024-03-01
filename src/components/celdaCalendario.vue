<script setup lang="ts">
import type { PropsDate } from '@/utils/Interfaces';

const props = withDefaults(defineProps<PropsDate>(), {
  fecha: '-'
})

/****
 * Función que recibe una fecha dd/mm/yyyy y devuelve solo el día.
 * @param {string} fecha - La fecha a procesar.
 * @returns {string} - El día de la fecha.
 * 
 */
const obtenerDia = (fecha: string) : string => {
  return fecha.split('/')[0];
};
</script>

<template>
   <div >
    <p>{{obtenerDia(props.fecha)}}</p>
   </div>
</template>

<style scoped>


</style>