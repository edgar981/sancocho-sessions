// ─────────────────────────────────────────────────────────────────────────────
//  EDITA AQUÍ  —  todo lo que puedas necesitar cambiar vive en este archivo.
//  (fecha, hora, lugar, mensajes de WhatsApp). No hace falta tocar nada más.
// ─────────────────────────────────────────────────────────────────────────────

export const EVENT = {
  // Línea de fecha del hero, en MAYÚSCULAS (así aparece tal cual).
  date: 'SÁBADO 12 SEPTIEMBRE',

  // Hora (fila HORA del rider). Escríbela como quieras verla.
  time: '08:30 pm',

  // Lugar
  venueName: 'Bulevar Salsa Bar',
  venueAddress: 'Calle 51 # 7-57, Chapinero',
  city: 'Bogotá',

  // Link de Google Maps del sitio (fila UBICACIÓN del rider).
  mapsUrl:
    'https://www.google.com/maps/place/BULEVAR+SALSA+BAR/@4.6376224,-74.0639218,17z/data=!3m1!4b1!4m6!3m5!1s0x8e3f9b0010f50f25:0x8d60a67d8493921e!8m2!3d4.6376224!4d-74.0639218!16s%2Fg%2F11yhxmk9vs',
};

// Número de WhatsApp de los enlaces wa.me — NO cambiar (ya viene del diseño).
export const WHATSAPP_NUMBER = '573160498092';

// Mensajes prellenados que se abren en WhatsApp.
export const MESSAGES = {
  yes: 'Confirmo asistencia a Sancocho Sessions 🍹',
  no: 'Ese día no puedo, pero propón otro',
};

// Construye un enlace wa.me con el texto correctamente codificado.
export const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

// La FAQ viene apagada en el diseño aprobado. Ponlo en true si la quieres mostrar.
export const SHOW_FAQ = false;
