export const Meses: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
export const diasSemana: string[] = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
export const diasSemanaCorto: string[] = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
export const diasSemanaCorto2: string[] = ["L", "M", "X", "J", "V", "S", "D"];
export const diasSemanaIngles: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
//recuperar el mes actual
export const mesActual = () => new Date().getMonth();
//recuperar el año actual
export const anioActual = () => new Date().getFullYear();
//recuperar el ultimo dia del mes
export const ultimoDiaMes = (anio: number, mes: number) => new Date(anio, mes + 1, 0).getDate();
//recuperar el primer dia del mes
export const primerDiaMes = (anio: number, mes: number) => new Date(anio, mes, 1).getDay();
//ultimo dia del mes anterior
export const ultimoDiaMesAnterior = (anio: number, mes: number) => new Date(anio, mes, 0).getDate();

export const convertirFecha=(fechaInput : string) : string =>{
    // Divide la fecha de entrada en día, mes y año
    const [dia, mes, anio] = fechaInput.split('/');
    // Crea un objeto Date con la fecha proporcionada
    const fecha = new Date(`${anio}-${mes}-${dia}`);
    // Extrae año, mes y día del objeto Date
    const anioNuevo = fecha.getFullYear();
    const mesNuevo = String(fecha.getMonth() + 1).padStart(2, '0');
    const diaNuevo = String(fecha.getDate()).padStart(2, '0');
    // Devuelve la fecha en el formato deseado (yyyy/mm/dd)
    return `${anioNuevo}-${mesNuevo}-${diaNuevo}`;
}

export const convertirFechaInversa = (fechaInput : string) : string => {
    // Divide la fecha de entrada en año, mes y día
    const [anio, mes, dia] = fechaInput.split('-');
    // Crea un objeto Date con la fecha proporcionada
    const fecha = new Date(`${anio}-${mes}-${dia}`);
    // Extrae año, mes y día del objeto Date
    const anioNuevo = fecha.getFullYear();
    const mesNuevo = fecha.getMonth() + 1;
    const diaNuevo = fecha.getDate();
    // Devuelve la fecha en el formato deseado (d/m/yyyy)
    return `${diaNuevo}/${mesNuevo}/${anioNuevo}`;
}
