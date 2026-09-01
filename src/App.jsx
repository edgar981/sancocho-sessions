import { useState } from 'react';
import Marquee from './components/Marquee.jsx';
import Hero from './components/Hero.jsx';
import Lineup from './components/Lineup.jsx';
import Rider from './components/Rider.jsx';
import Rsvp from './components/Rsvp.jsx';
import Faq from './components/Faq.jsx';
import Gate from './components/Gate.jsx';
import { SHOW_FAQ } from './config.js';

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/></filter><rect width='180' height='180' filter='url(%23g)' opacity='0.5'/></svg>\")";

export default function App() {
  // El hero se renderiza siempre; la reja (Gate) va encima hasta entrar (#1 ronda 3).
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#131010',
        fontFamily: "'Big Shoulders Display', system-ui, sans-serif",
        color: '#F0E7D6',
      }}
    >
      {/* Filtro de tinta para el sello (textura de estampado) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="ink">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="11" result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0.55 0 0 0 -0.30"
            result="m"
          />
          <feComposite in="SourceGraphic" in2="m" operator="out" />
        </filter>
      </svg>

      {/* Fondo: grano fijo + halo cálido desde arriba */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
          opacity: 0.5,
          backgroundImage: GRAIN,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(120% 90% at 50% 0%,rgba(255,90,22,.10),rgba(19,16,16,0) 62%)',
        }}
      />

      {/* content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* cinta superior — franja naranja */}
        <Marquee variant="bar" duration={21} />

        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 20px 44px' }}>
          <Hero revealed={revealed} />
          <Lineup />
          <Rider />
          {SHOW_FAQ && <Faq />}
          <Rsvp />
        </div>

        {/* cinta inferior — velocidad distinta, a todo el ancho */}
        <div style={{ marginTop: '56px' }}>
          <Marquee variant="line" duration={27} />
        </div>
      </div>

      {/* Pantalla de acceso, encima de todo hasta que el usuario entra */}
      {!revealed && <Gate onEnter={() => setRevealed(true)} />}
    </div>
  );
}
