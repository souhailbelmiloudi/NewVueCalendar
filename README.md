# Calendario Interactivo con Vue.js 🗓️

Este proyecto es un calendario interactivo desarrollado con Vue.js que permite a los usuarios gestionar eventos de manera eficiente y visualmente atractiva.

## Características 🚀

- **Visualización Flexible**: El calendario muestra eventos de manera clara y organizada, permitiendo a los usuarios ver rápidamente sus actividades programadas.
  
- **Gestión de Eventos**: Los usuarios pueden agregar, modificar y eliminar eventos directamente desde el calendario, lo que facilita la gestión de sus horarios.
  
- **Funcionalidad de Arrastrar y Soltar**: La funcionalidad de arrastrar y soltar permite a los usuarios cambiar fácilmente la fecha y los eventos dentro del mismo mes o entre meses.
  
- **Integración con API**: El calendario se integra con una API para recuperar eventos almacenados en un servidor externo, asegurando una experiencia actualizada y en tiempo real.
  
- **Formulario Reactivo**: Un formulario reactivo permite a los usuarios cambiar el mes y año, actualizando dinámicamente el calendario en respuesta a los cambios.

## Tecnologías Utilizadas 🛠️

- Vue.js
- TypeScript
- HTML5
- CSS3
- API Fetch/Axios

## Instalación y Uso 📋

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del proyecto con `npm install`.
3. **Levantar el servidor de la API:**
    - Para levantar el API de eventos, primero navega a la carpeta `bd` en tu terminal:
        ```bash
        cd bd
        ```
    - Utiliza json-server para iniciar el servidor con el archivo `eventos.json`: 
        ```bash
        json-server --watch eventos.json --port 4000
        ```
       Esto levantará el servidor en el puerto 4000 de tu máquina local y servirá los datos del archivo `eventos.json`.
   
4. Una vez que el servidor esté en funcionamiento, vuelve a la raíz del proyecto y ejecuta la aplicación con `npm run dev`.
5. Accede a la aplicación en tu navegador utilizando la dirección proporcionada por el servidor de desarrollo de Vue.

## Contribuciones 💡

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar este proyecto, por favor, crea una solicitud de extracción y estaré encantado de revisarla.

¡Gracias por tu interés en este proyecto!

