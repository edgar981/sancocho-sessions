import { useState, useEffect } from 'react';

const MONO = "'DM Mono', ui-monospace, monospace";
const DISPLAY = "'Big Shoulders Display', system-ui, sans-serif";

/**
 * Pantalla de "control de acceso" (variante visual, tema oscuro).
 * - "Sí, soy Mimi" desvanece el overlay (~420ms) y revela el hero (onEnter).
 * - "No" cambia el título y ofrece un enlace de escape que hace lo mismo.
 * - Sin storage, bloquea el scroll del body, respeta reduced-motion.
 */
export default function Gate({ onEnter }) {
  const [mode, setMode] = useState('ask'); // 'ask' | 'no'
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const enter = () => {
    if (closing) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      onEnter();
      return;
    }
    setClosing(true);
    setTimeout(onEnter, 420);
  };

  const btnBase = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px 24px',
    minHeight: '58px',
    fontFamily: DISPLAY,
    fontSize: '26px',
    fontWeight: 900,
    letterSpacing: '.02em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    flex: '1 1 0',
    WebkitTapHighlightColor: 'transparent',
    transition: 'background .18s ease, color .18s ease, border-color .18s ease',
  };

  return (
    <div
      role="dialog"
      aria-label="Control de acceso"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: '#131010',
        color: '#F0E7D6',
        fontFamily: DISPLAY,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        textAlign: 'center',
        overflow: 'hidden',
        opacity: closing ? 0 : 1,
        transition: 'opacity .42s ease',
      }}
    >
      {/* wordmark tenue de fondo */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span
          style={{
            fontSize: '23vw',
            lineHeight: 0.8,
            fontWeight: 900,
            letterSpacing: '-.01em',
            textTransform: 'uppercase',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(240,231,214,.08)',
            whiteSpace: 'nowrap',
            transform: 'rotate(-6.5deg)',
          }}
        >
          Sancocho Sessions
        </span>
      </div>

      {/* franja naranja superior (a la altura de la cinta) */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '38px', background: '#FF5A16' }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '26px', width: '100%' }}>
        <div style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '.22em', color: 'rgba(240,231,214,.6)' }}>
          CONTROL DE ACCESO · LISTA DE INVITADOS: 1
        </div>

        {mode === 'no' ? (
          <>
            <h2
              style={{
                margin: 0,
                maxWidth: '11ch',
                fontSize: 'clamp(52px,17vw,84px)',
                lineHeight: 0.82,
                fontWeight: 900,
                letterSpacing: '-.01em',
                textTransform: 'uppercase',
                textWrap: 'balance',
              }}
            >
              Entonces este evento no es para ti.
            </h2>
            <button
              type="button"
              onClick={enter}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: MONO, fontSize: '12.5px', letterSpacing: '.08em', color: '#FF5A16', padding: '10px', WebkitTapHighlightColor: 'transparent' }}
            >
              Bueno, sí soy Mimi →
            </button>
          </>
        ) : (
          <>
            {/* Fix #1: line-height 0.78 -> 0.90 para que el ¿ no invada "MIMI" */}
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(84px,29vw,140px)',
                lineHeight: 0.9,
                fontWeight: 900,
                letterSpacing: '-.02em',
                textTransform: 'uppercase',
              }}
            >
              ¿Eres
              <br />
              Mimi?
            </h2>
            <div className="gate-actions" style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '420px' }}>
              <button type="button" className="btn-o" onClick={enter} style={{ ...btnBase, background: '#FF5A16', color: '#131010', border: '2px solid #FF5A16' }}>
                Sí, soy Mimi
              </button>
              <button type="button" className="btn-g" onClick={() => setMode('no')} style={{ ...btnBase, background: 'transparent', color: '#F0E7D6', border: '2px solid rgba(240,231,214,.5)' }}>
                No
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
