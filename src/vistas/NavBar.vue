<script setup lang="ts">
</script>

<template>
    <div>
        <nav class="navbar">
            <div class="navbar-inner">
                <div class="navbar-logo">
                    <h1>
                        Calendario
                    </h1>
                </div>
                <div class="navbar-links">
                    <ul>
                        <li><router-link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"/><path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"/></svg></router-link></li>
                        <li><router-link to="event"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m9.981 14.811-.467 2.726 2.449-1.287 2.449 1.287-.468-2.726 1.982-1.932-2.738-.398L11.963 10l-1.225 2.481L8 12.879z"/><path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm.002 16H5V8h14l.002 12z"/></svg></router-link></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>


<style scoped> .navbar {
     background-color: #f0f0f0;
     /* Cambia el color de fondo a gris claro */
     color: #041ea0;
     /* Cambia el color del texto a azul verdoso */
     border-radius: 10px;
     /* Aumenta el radio de la esquina redondeada */
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
     /* Añade una sombra alrededor de la barra de navegación */
 }

 .navbar-inner {
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 0.5em;
     /* Añade un poco de espacio alrededor del contenido de la barra de navegación */
 }

 .navbar-logo h1 {
     font-size: 1.5em;
     /* Aumenta el tamaño de la fuente del título */
     font-weight: bold;
     /* Hace que el título sea más grueso */
 }

 .navbar-links ul {
     display: flex;
     justify-content: space-between;
     list-style: none;
 }

 .navbar-links ul li a {
     color: #637e80;
     /* Cambia el color de los enlaces a azul verdoso */
     text-decoration: none;
     padding: 0.5em;
     /* Reduce el espacio alrededor de los enlaces */
     border-radius: 5px;
     /* Añade una esquina redondeada a los enlaces */
 }

 .navbar-links ul li box-icon:hover {
     color: white;
     /* Cambia el color del texto a blanco cuando se pasa el ratón por encima */
     background-color: #a5bfc6;
     /* Cambia el color de fondo a azul verdoso cuando se pasa el ratón por encima */
     border-radius: 10px
 }

 .navbar-links ul li a:active {
     color: white;
     /* Cambia el color del texto a blanco cuando se hace clic */
     background-color: #637e80;
     /* Cambia el color de fondo a azul verdoso cuando se hace clic */
     transform: scale(0.9);
     /* Reduce un poco el tamaño del enlace cuando se hace clic */
 }</style>