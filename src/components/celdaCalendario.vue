<script setup lang="ts">


interface Props {
  valor?:string
}

const props = withDefaults(defineProps<Props>(), {
  valor: '-'
})

/****
 * Función que recibe una fecha dd/mm/yyyy y devuelve solo el día.
 * @param {string} fecha - La fecha a procesar.
 * @returns {string} - El día de la fecha.
 * 
 */
const obtenerDia = (fecha: string) => {
  return fecha.split('/')[0];

};
</script>

<template>
   <div >
    <p>{{obtenerDia(props.valor)}}</p>
   </div>
</template>

<style scoped>


</style>