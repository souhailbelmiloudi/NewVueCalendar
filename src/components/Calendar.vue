<script setup lang="ts">
import calendarioMes from '@/components/calendarioMes.vue';
import { useCalendario } from '@/stores/CalendarioStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

const CalendarioStore = useCalendario();
const { mes, anio, Numeromes } = storeToRefs(CalendarioStore);

//Variables reactivas para el mes y el año
const mimes = ref(Numeromes.value + 1)
const mianio = ref(anio.value)

//Función para volver al mes actual
const VolverAlMesActual = () => {
    mimes.value = Numeromes.value + 1;
    mianio.value = anio.value;
};

//Función para incrementar el mes
const increment = () => {
    mimes.value++
    if (mimes.value === 13) {
        mimes.value = 1;
        mianio.value++
    }
}
//Decrementar el mes
const decrement = () => {
    mimes.value--
    if (mimes.value === 0) {
        mimes.value = 12;
        mianio.value--
    }
}

const incrementDrop = () => {
  setTimeout(() => {
    mimes.value++
    if (mimes.value === 13) {
        mimes.value = 1;
        mianio.value++
    }
  }, 1000)
}
const decrementDrop = () => {
  setTimeout(() => {
    mimes.value--
    if (mimes.value === 0) {
        mimes.value = 12;
        mianio.value--
    }
  }, 1000)
}
</script>
<template>
    <main>
        <div class="header">
            <div class="wrapper">
                <!-- Boton para ir al año anterior -->
                <div class="chev" @click="mianio--">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="m12.707 7.707-1.414-1.414L5.586 12l5.707 5.707 1.414-1.414L8.414 12z" />
                        <path d="M16.293 6.293 10.586 12l5.707 5.707 1.414-1.414L13.414 12l4.293-4.293z" />
                    </svg>
                </div>
                <!--Boton para ir al mes anterior -->
                <div class="chev" @click="decrement"  >
                    <img src="https://img.icons8.com/ios/50/000000/long-arrow-left.png"  @dragenter="decrementDrop"/>
                </div>
                <input type="text" v-model="mes[mimes - 1]" readonly />
                <!-- <select name="" id="" v-model="mimes">
                    <option v-for="(mesLetra, index) in mes" :key="index" :value="index + 1">
                        {{ mesLetra }}
                    </option>
                </select> -->
                <div class="chev" @click="VolverAlMesActual" @dragenter="VolverAlMesActual" @dragover.prevent>
                    <button @click="VolverAlMesActual" class="btnHoy">Hoy</button>
                </div>
                <h2>
                    <input type="number" v-model="mianio" min="2000" max="2050" />
                </h2>
                <div class="chev" @click="increment"  @dragover.prevent>
                    <img src="https://img.icons8.com/ios/50/000000/long-arrow-right.png" @dragenter="incrementDrop"/>
                </div>
                <div class="chev" @click="mianio++">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M10.296 7.71 14.621 12l-4.325 4.29 1.408 1.42L17.461 12l-5.757-5.71z" />
                        <path d="M6.704 6.29 5.296 7.71 9.621 12l-4.325 4.29 1.408 1.42L12.461 12z" />
                    </svg>
                </div>
            </div>
        </div>
        <calendarioMes :mes="mimes" :anio="mianio" />

    </main>
</template>

<style>
.header {
    display: flex;
    flex-direction: column;
    /* Maintains column layout */
    padding: 10px;
    background: linear-gradient(to right, #9adfff, #c4facf);
    border-radius: 5px 5px 0 0;
}

.header .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
    /* Adjusts padding for cleaner layout */
}

.header .wrapper .month h2 {
    font-size: 22px;
    /* Balances font size and responsiveness */
    font-weight: bold;
    letter-spacing: 2px;
    /* Subtle letter spacing */
    color: #030303;
    /* Maintains white text color */
}

.header .wrapper .chev {
    user-select: none;

    width: 40px;
    /* Adjusts button size for better balance */
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    /* Smooth transition effect */
}

.header .wrapper .chev:hover {
    background-color: #13a58d;
    width: 45px;
    height: 45px;
}

.header .wrapper .chev img {
    width: 70%;
    transform: translateX(2px);
}

.header .wrapper .left-chev {
    transform: rotate(180deg);
}

/* Responsive adjustments */
@media (max-width: 600px) {
    .header .wrapper {
        flex-direction: column;
        /* Keeps column layout */
        padding: 10px 0;
        /* Adjusts padding for smaller screens */
    }

    .header .wrapper .month h2 {
        font-size: 20px;
        /* Consistent font size reduction */
        letter-spacing: 1px;
        /* Minimal letter spacing on small screens */
    }

    .header .wrapper .chev {
        width: 30px;
        /* Consistent button size reduction */
        height: 30px;
    }

    .header .wrapper .chev img {
        width: 50%;
        /* Consistent image size reduction */
    }
}

.papelera {
    background-color: #f71212;
    border: none;
    cursor: pointer;
    border-radius: 12px;
    width: 50px;
    height: 30px;
}

.btnHoy {
    background-color: #13a58d;
    border: none;
    color: black;
    cursor: pointer;
    border-radius: 12px;
    width: 50px;
    height: 30px;
}

.btnBorrar {
    background-color: #ff1b01;
    border: none;
    color: black;
    cursor: pointer;
    border-radius: 12px;
    width: 50px;
    height: 30px;
}

.header select {
    width: 100px;
    height: 30px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    text-align: center;
    background-color: #13a58d;
    color: white;
    font-weight: bold;
    font-size: 16px;
    border: 2px solid #abd4cd;
    border-radius: 12px;
}

.header input {
    width: 100px;
    height: 30px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    text-align: center;
    background-color: #13a58d;
    color: white;
    font-weight: bold;
    font-size: 16px;
    border: 2px solid #abd4cd;
    border-radius: 12px;
}</style>