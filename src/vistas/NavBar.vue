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
                        <li><router-link to="/"><box-icon name='calendar'></box-icon></router-link></li>
                        <li><router-link to="event"><box-icon name='calendar-check'></box-icon></router-link></li>
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