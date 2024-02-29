import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { mesActual, anioActual, Meses, ultimoDiaMes, primerDiaMes, ultimoDiaMesAnterior ,diasSemana } from '@/utils/dateFunciones'

export const useCalendario = defineStore('calendario', () => {
  //Numero del mes actual
  const Numeromes = ref<number>(mesActual())
  //Año actual
  const anio = ref<number>(anioActual())
  //Mes actual en texto
  const mes = computed(() => Meses)

  const mimesNumero = computed(() => Numeromes.value+1)

  //Ultimo dia del mes
  const ultimoDia = computed(() => ultimoDiaMes(anio.value, Numeromes.value))
  
  //primer dia del mes
  const primerDia = computed(() => primerDiaMes(anio.value, Numeromes.value))

  //Ultimo dia del mes anterior
  const ultimoDiaAnterior = computed(() => ultimoDiaMesAnterior(anio.value, Numeromes.value))

  

  return { mes, anio, Numeromes, ultimoDia, primerDia, ultimoDiaAnterior, mimesNumero }
})
