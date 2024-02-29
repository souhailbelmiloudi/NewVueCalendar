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
