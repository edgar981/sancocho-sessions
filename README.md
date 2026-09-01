# Sancocho Sessions — Vol. 1 (sin sancocho)

Landing de invitación. Vite + React + Tailwind, con Framer Motion (animaciones) y
three.js (la copa de Aperol del hero). Mobile-first (referencia 390px). Sin analytics,
sin tracking, sin formularios, sin login. El RSVP abre WhatsApp con un mensaje prellenado.

---

## Correr en local

```bash
npm install
npm run dev
```

Abre la URL que imprime (por defecto http://localhost:5173).

Build de producción y previsualización local del build:

```bash
npm run build
npm run preview
```

---

## Desplegar en Vercel

El proyecto ya trae `vercel.json` (framework `vite`, output `dist`). Dos caminos:

### Opción A — CLI (rápido)

```bash
npm i -g vercel      # solo la primera vez
vercel               # primer deploy: crea el proyecto (deja "sancocho-sessions" como nombre)
vercel --prod        # publica a producción
```

Cuando `vercel` pregunte el nombre del proyecto, déjalo como **`sancocho-sessions`**
para obtener el dominio `https://sancocho-sessions.vercel.app` (el que ya está en las
meta OG). Vercel detecta Vite y hace el build solo.

### Opción B — Git + dashboard

Sube el repo a GitHub y en vercel.com → **Add New → Project** impórtalo. Framework:
Vite (autodetectado). Build `vite build`, output `dist`.

---

## ⚠️ Dominio y preview del link (OG)

El `og:image` **debe** ser una URL absoluta con el dominio real de producción, o la
previsualización en WhatsApp no carga la imagen.

Está configurado a **`https://sancocho-sessions.vercel.app`** en [`index.html`](index.html).

Si despliegas a **otro dominio**, edita `index.html` y cambia el dominio en las 4 URLs
absolutas (`og:url`, `og:image`, `twitter:image`, y el `og:image` de nuevo). Están juntas
y marcadas con un comentario. Sube el `?v=2` (o el número que sea) del final de la imagen
si cambias `og.png`, para forzar que WhatsApp refresque el caché del preview.

Para probar el preview después de publicar: pega el link en
https://www.opengraph.xyz o mándatelo a ti en WhatsApp.

---

## Cambiar fecha, hora y lugar

Todo lo editable vive en un solo archivo: [`src/config.js`](src/config.js).

```js
export const EVENT = {
  date: 'VIERNES 04 SEPTIEMBRE',              // línea de fecha del hero (en MAYÚSCULAS)
  time: '08:00 pm',                            // fila HORA del rider
  venueName: 'Bulevar Salsa Bar',              // nombre del lugar
  venueAddress: 'Calle 51 # 7-57, Chapinero',  // dirección
  city: 'Bogotá',                              // ciudad
  mapsUrl: 'https://www.google.com/maps/...',  // link de Google Maps del lugar
};
```

- El hero arma solo la línea `FECHA · LUGAR, CIUDAD` a partir de esos campos.
- El número de WhatsApp (`WHATSAPP_NUMBER`) y los mensajes prellenados también están ahí,
  pero el número **ya viene puesto** — no hace falta tocarlo.
- Guardas y listo: en local recarga solo; en Vercel vuelve a hacer deploy.

---

## Estructura

```
index.html              meta OG + fuentes (aquí va el dominio de producción)
src/
  config.js             ← EDITA AQUÍ (fecha, hora, lugar, WhatsApp)
  App.jsx               fondo, marquees (arriba/abajo) y layout
  components/
    Hero.jsx            título + sello "SIN SANCOCHO" + copa 3D
    AperolGlass.jsx     three.js (carga diferida + fallback si no hay WebGL)
    Lineup.jsx  Rider.jsx  Rsvp.jsx  Faq.jsx  Marquee.jsx  Reveal.jsx
public/
  og.png                imagen del preview (1200×630)
  favicon.svg
_design_output/         diseño original exportado (referencia; NO se despliega)
```

## Notas técnicas

- three.js se carga con `import()` diferido → no bloquea el primer render (presupuesto 4G).
  Si no hay WebGL o el equipo es de gama baja / `prefers-reduced-motion`, se muestra un
  glow estático en vez de la copa.
- Se respeta `prefers-reduced-motion` (Framer Motion + media query CSS).
- La FAQ viene apagada (como en el diseño). Enciéndela con `SHOW_FAQ = true` en `config.js`.
