import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { waLink, MESSAGES } from '../config.js';

// Escalating labels for the "No" — already specified by the design.
const NO_LABELS = ['No', '¿Segura?', 'Piénsalo', 'Última oportunidad', 'Ese día no, proponme otro'];
const LAST = NO_LABELS.length - 1;

export default function Rsvp() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [offset, setOffset] = useState({ dx: 0, dy: 0 });

  const settled = step >= LAST;

  // Same dodge logic as the design: nudge to a fresh random spot each try,
  // and once we reach the last step, snap back to center and become a link.
  const flee = (e) => {
    if (step >= LAST) return;
    if (e && (e.type === 'touchstart' || e.type === 'click')) e.preventDefault();
    const next = step + 1;
    if (next >= LAST) {
      setStep(next);
      setOffset({ dx: 0, dy: 0 });
      return;
    }
    const r = (m) => (Math.random() * 2 - 1) * m;
    let dx = r(100);
    const dy = r(56);
    if (Math.abs(dx - offset.dx) < 60) dx = -dx;
    setStep(next);
    setOffset({ dx, dy });
  };

  // "No" styling — black (#14120F) in the settled state instead of red.
  const noStyle = {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    transform: `translateX(-50%) translate(${offset.dx}px, ${offset.dy}px)`,
    transition:
      'transform .32s cubic-bezier(.2,.9,.3,1), color .25s ease, border-color .25s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
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

  const noLabel = NO_LABELS[Math.min(step, LAST)];

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
          minHeight: '240px',
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

        {/* "No" — flees 4 labels, then settles into a REAL wa.me link. */}
        {settled ? (
          <a href={waLink(MESSAGES.no)} target="_blank" rel="noopener" style={noStyle}>
            {noLabel}
          </a>
        ) : (
          <button
            type="button"
            onMouseEnter={flee}
            onTouchStart={flee}
            onClick={flee}
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
