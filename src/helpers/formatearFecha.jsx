const formatearFecha = (fecha) => {
  if (!fecha) {
    // Si fecha es undefined, devuelve un valor predeterminado o maneja el error
    return "Fecha no proporcionada";
  }

  // Si fecha no es undefined, continúa con la lógica existente
  const nuevaFecha = new Date(fecha.split("T")[0].split("-"));
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return nuevaFecha.toLocaleDateString("es-ES", opciones);
};

export default formatearFecha;