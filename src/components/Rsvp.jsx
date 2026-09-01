import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { waLink, MESSAGES } from '../config.js';

// #5 — 6 etiquetas. La última es el enlace real (deja de huir).
const NO_LABELS = [
  'No',
  '¿Segura?',
  'Piénsalo',
  'Última oportunidad',
  'Por los niños del África',
  'Ese día no, proponme otro',
];
const LAST = NO_LABELS.length - 1;

// Contenedor con altura fija y desplazamiento SIEMPRE hacia arriba: el botón
// nunca baja de su ancla (bottom:0), así que jamás tapa el texto de confirmación.
const CONTAINER_H = 250;

export default function Rsvp() {
  const reduce = useReducedMotion();
  const [st, setSt] = useState({ step: 0, dx: 0, dy: 0 });
  const lastFlee = useRef(0);

  const settled = st.step >= LAST;

  // #1 — un toque = un incremento. Colapsamos eventos duplicados de una misma
  // interacción (en móvil un tap dispara touch + click emulado). El debounce
  // por tiempo lo hace robusto sin depender de preventDefault (que React vuelve
  // pasivo en touchstart).
  const flee = () => {
    const now = performance.now();
    if (now - lastFlee.current < 300) return;
    lastFlee.current = now;

    setSt((s) => {
      if (s.step >= LAST) return s;
      const next = s.step + 1;
      if (next >= LAST) return { step: next, dx: 0, dy: 0 }; // estado final: centrado
      let dx = (Math.random() * 2 - 1) * 50; // ±50px: cabe incluso la etiqueta más larga
      if (Math.abs(dx - s.dx) < 40) dx = -dx;
      const dy = -(20 + Math.random() * 100); // -20..-120px: SOLO hacia arriba, dentro del área
      return { step: next, dx, dy };
    });
  };

  const onClick = (e) => {
    e.preventDefault();
    flee();
  };

  const noStyle = {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    transform: `translateX(-50%) translate(${st.dx}px, ${st.dy}px)`,
    transition:
      'transform .32s cubic-bezier(.2,.9,.3,1), color .25s ease, border-color .25s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    // #6 (ronda 1): negro, nunca rojo
    border: settled ? '1.5px solid #14120F' : '1.5px solid rgba(20,18,15,.16)',
    color: settled ? '#14120F' : 'rgba(20,18,15,.45)',
    padding: '16px 26px',
    borderRadius: '2px',
    cursor: 'pointer',
    fontFamily: 'Archivo, system-ui, sans-serif',
    fontSize: '14px',
    fontWeight: 700,
    letterSpacing: '.04em',
    textTransform: 'uppercase',
    minHeight: '48px',
    whiteSpace: 'nowrap',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    textDecoration: 'none',
  };

  const noLabel = NO_LABELS[Math.min(st.step, LAST)];

  return (
    <section id="rsvp" style={{ padding: '64px 0 0', scrollMarginTop: '20px' }}>
      <h2
        style={{
          margin: '0 0 22px',
          fontSize: 'clamp(34px,10vw,46px)',
          lineHeight: 0.92,
          fontWeight: 900,
          letterSpacing: '-.04em',
          textTransform: 'uppercase',
        }}
      >
        Confirma tu
        <br />
        <span style={{ color: '#FF5B04' }}>asistencia</span>
      </h2>

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          minHeight: `${CONTAINER_H}px`,
        }}
      >
        {/* "Sí, voy" — main CTA, opens WhatsApp prefilled */}
        <motion.a
          href={waLink(MESSAGES.yes)}
          target="_blank"
          rel="noopener"
          whileHover={reduce ? undefined : { backgroundColor: '#14120F', color: '#EFE7D8', y: -2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FF5B04',
            color: '#14120F',
            padding: '20px',
            borderRadius: '2px',
            fontSize: '17px',
            fontWeight: 900,
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            minHeight: '58px',
          }}
        >
          Sí, voy
        </motion.a>

        {/* "No" — huye (siempre hacia arriba, dentro del área) y al final es un wa.me real */}
        {settled ? (
          <a href={waLink(MESSAGES.no)} target="_blank" rel="noopener" style={noStyle}>
            {noLabel}
          </a>
        ) : (
          <button
            type="button"
            onMouseEnter={flee}
            onClick={onClick}
            style={noStyle}
          >
            {noLabel}
          </button>
        )}
      </div>

      <p
        style={{
          margin: '22px 0 0',
          fontFamily: '"Space Mono", monospace',
          fontSize: '11px',
          lineHeight: 1.7,
          letterSpacing: '.02em',
          color: 'rgba(20,18,15,.5)',
          textAlign: 'center',
        }}
      >
        Confirmación por WhatsApp.
        <br />
        Sin formularios, sin correos, sin sancocho.
      </p>
    </section>
  );
}
