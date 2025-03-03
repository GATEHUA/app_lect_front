export function formatearFechaText(fecha) {
  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  const fechaFormateada = new Intl.DateTimeFormat("es-ES", opciones).format(
    new Date(fecha)
  );
  return fechaFormateada;
}

export function formatearDatetoText(fechaISO) {
  const fecha = new Date(fechaISO);
  const año = fecha.getUTCFullYear().toString().padStart(4, "0");
  const mes = String(fecha.getUTCMonth() + 1).padStart(2, "0"); // Sumamos 1 porque los meses van de 0 a 11
  const dia = String(fecha.getUTCDate()).padStart(2, "0");
  return `${año}-${mes}-${dia}`;
}

export function formatearFecha(fecha) {
  const opciones = {
    day: "2-digit", // Dos dígitos para el día
    month: "2-digit", // Dos dígitos para el mes
    year: "numeric", // El año en formato numérico
    timeZone: "UTC", // Especifica la zona horaria como UTC
  };
  return new Date(fecha).toLocaleDateString("es-ES", opciones);
}
export function calcularEdad(fechaNacimiento) {
  const fechaNac = new Date(fechaNacimiento);

  const fechaActual = new Date();

  const diferencia = fechaActual - fechaNac;

  const edad = Math.floor(diferencia / (365 * 24 * 60 * 60 * 1000));

  return edad;
}
