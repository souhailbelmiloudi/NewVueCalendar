<script setup lang="ts">

const props = defineProps({
    diasSemana: Array

});
</script>

<template>
    <thead class="encabezado">
        <tr>
            <th v-for="dia in props.diasSemana">{{ dia }}</th>
        </tr>
    </thead>
</template>
<style scoped>
 
</style>

