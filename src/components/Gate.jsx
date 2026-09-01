import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Pantalla de "control de acceso" ficticia que precede al hero (#1).
 * El chiste: la lista de invitados es de una sola persona.
 * - Se muestra en cada carga (sin storage, la página es de un solo uso).
 * - "Sí, soy Mimi" desvanece el overlay (~400ms) y avisa al padre (onEnter),
 *   que revela el hero; el sello se estampa 500ms después (ver Hero).
 * - "No" cambia el título y ofrece un enlace de escape que hace lo mismo.
 * - Con prefers-reduced-motion se oculta sin transición.
 */
export default function Gate({ onEnter }) {
  const reduce = useReducedMotion();
  const [closing, setClosing] = useState(false);
  const [said, setSaid] = useState(false); // "No" pulsado → mensaje + enlace de escape

  // Bloquea el scroll del body mientras el overlay está visible.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const enter = () => {
    if (closing) return;
    if (reduce) {
      onEnter(); // sin transición
      return;
    }
    setClosing(true);
    setTimeout(onEnter, 400); // deja terminar el fade antes de revelar
  };

  const btnBase = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '18px 26px',
    borderRadius: '2px',
    minHeight: '56px',
    fontFamily: 'Archivo, system-ui, sans-serif',
    fontSize: '15px',
    fontWeight: 900,
    letterSpacing: '.06em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    flex: '1 1 0',
    transition: reduce ? 'none' : 'transform .18s ease, background .18s ease, color .18s ease',
  };

  return (
    <div
      role="dialog"
      aria-label="Control de acceso"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: '#EFE7D8',
        color: '#14120F',
        fontFamily: 'Archivo, system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        padding: '32px 24px',
        textAlign: 'center',
        opacity: closing ? 0 : 1,
        transition: reduce ? 'none' : 'opacity .4s ease',
      }}
    >
      <div
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '10px',
          letterSpacing: '.12em',
          color: 'rgba(20,18,15,.6)',
        }}
      >
        CONTROL DE ACCESO · LISTA DE INVITADOS: 1
      </div>

      <h2
        style={{
          margin: 0,
          maxWidth: '13ch',
          fontSize: said ? 'clamp(30px,8vw,48px)' : 'clamp(40px,12vw,64px)',
          lineHeight: 1.0,
          fontWeight: 900,
          letterSpacing: '-.03em',
          textTransform: 'uppercase',
        }}
      >
        {said ? 'Entonces este evento no es para ti.' : '¿Eres Mimi?'}
      </h2>

      {!said ? (
        <div className="gate-actions" style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px' }}>
          <button
            type="button"
            className="gate-btn gate-primary"
            onClick={enter}
            style={{ ...btnBase, background: '#FF5B04', color: '#14120F', border: '1.5px solid #FF5B04' }}
          >
            Sí, soy Mimi
          </button>
          <button
            type="button"
            className="gate-btn gate-secondary"
            onClick={() => setSaid(true)}
            style={{ ...btnBase, background: 'transparent', color: '#14120F', border: '1.5px solid #14120F' }}
          >
            No
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={enter}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: '"Space Mono", monospace',
            fontSize: '13px',
            letterSpacing: '.06em',
            color: '#C8271A',
            padding: '8px',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          bueno, sí soy Mimi →
        </button>
      )}
    </div>
  );
}
