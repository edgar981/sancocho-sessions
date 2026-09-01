import { useState, useRef, useLayoutEffect } from 'react';
import Reveal from './Reveal.jsx';
import { waLink, MESSAGES } from '../config.js';

const NO_LABELS = [
  'No',
  '¿Segura?',
  'Piénsalo',
  'Última oportunidad',
  'Por los niños del África',
  'Ese día no, proponme otro',
];
const LAST = NO_LABELS.length - 1;
const MONO = "'DM Mono', ui-monospace, monospace";
const MIN_JUMP = 70; // salto mínimo perceptible (px)

export default function Rsvp() {
  const [st, setSt] = useState({ step: 0, dx: 0, dy: 0 });
  const lastFlee = useRef(0);
  const pendingJump = useRef(false);
  const prevPos = useRef({ dx: 0, dy: 0 });

  const containerRef = useRef(null);
  const yesRef = useRef(null);
  const btnRef = useRef(null);

  const settled = st.step >= LAST;

  const flee = () => {
    const now = performance.now();
    if (now - lastFlee.current < 300) return; // throttle 300ms
    lastFlee.current = now;
    setSt((s) => {
      if (s.step >= LAST) return s;
      const next = s.step + 1;
      if (next >= LAST) {
        pendingJump.current = false;
        return { step: next, dx: 0, dy: 0 }; // estado final: centrado
      }
      // Marca para reposicionar en el layout effect, ya con el ancho real de la
      // NUEVA etiqueta (las etiquetas crecen), para no desbordar nunca.
      pendingJump.current = true;
      return { step: next, dx: s.dx, dy: s.dy };
    });
  };

  // Reposiciona el botón usando dimensiones REALES del contenedor y del botón:
  // (a) salto euclidiano >= MIN_JUMP en los DOS ejes; (b) clamp al área de juego.
  useLayoutEffect(() => {
    if (!pendingJump.current) return;
    pendingJump.current = false;
    const cont = containerRef.current;
    const btn = btnRef.current;
    if (!cont || !btn) return;

    const cw = cont.clientWidth;
    const ch = cont.clientHeight;
    const bw = btn.offsetWidth;
    const bh = btn.offsetHeight;
    const yesH = yesRef.current ? yesRef.current.offsetHeight : 60;
    const topGap = 14; // separación mínima con "Sí, voy"

    const maxDx = Math.max(0, (cw - bw) / 2); // dentro del ancho del contenedor
    const maxUp = Math.max(0, ch - bh - yesH - topGap); // arriba del ancla, bajo "Sí, voy"

    const prev = prevPos.current;
    let best = { dx: 0, dy: 0 };
    let bestD = -1;
    for (let i = 0; i < 20; i++) {
      const cdx = (Math.random() * 2 - 1) * maxDx; // ambos ejes aleatorios
      const cdy = -(Math.random() * maxUp); // solo hacia arriba (nunca sobre la confirmación)
      const d = Math.hypot(cdx - prev.dx, cdy - prev.dy);
      if (d > bestD) {
        bestD = d;
        best = { dx: cdx, dy: cdy };
      }
      if (d >= MIN_JUMP) {
        best = { dx: cdx, dy: cdy };
        break;
      }
    }
    prevPos.current = best;
    setSt((s) => ({ ...s, dx: best.dx, dy: best.dy }));
  }, [st.step]);

  const noStyle = {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    transform: `translateX(-50%) translate(${st.dx}px, ${st.dy}px)`,
    transition: 'transform .32s cubic-bezier(.2,.9,.3,1), color .25s ease, border-color .25s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: settled ? '2px solid #F0E7D6' : '2px solid rgba(240,231,214,.2)',
    color: settled ? '#F0E7D6' : 'rgba(240,231,214,.45)',
    padding: '14px 24px',
    cursor: 'pointer',
    fontFamily: MONO,
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '.1em',
    textTransform: 'uppercase',
    minHeight: '48px',
    whiteSpace: 'nowrap',
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    textDecoration: 'none',
  };

  const noLabel = NO_LABELS[Math.min(st.step, LAST)];

  return (
    <Reveal as="section" id="rsvp" style={{ padding: '70px 0 0', scrollMarginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '18px' }}>
        <span style={{ fontFamily: MONO, fontSize: '10.5px', letterSpacing: '.22em', color: '#FF5A16' }}>03 / RSVP</span>
        <span style={{ flex: 1, height: '2px', background: 'rgba(240,231,214,.22)' }} />
      </div>

      <h2 style={{ margin: '0 0 24px', fontSize: 'clamp(62px,19vw,88px)', lineHeight: 0.8, fontWeight: 900, letterSpacing: '-.01em', textTransform: 'uppercase' }}>
        Confirma tu
        <br />
        <span style={{ color: '#FF5A16' }}>asistencia</span>
      </h2>

      <div ref={containerRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '250px' }}>
        <a
          ref={yesRef}
          href={waLink(MESSAGES.yes)}
          target="_blank"
          rel="noopener"
          className="btn-o"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FF5A16',
            color: '#131010',
            padding: '18px',
            fontSize: '30px',
            fontWeight: 900,
            letterSpacing: '.02em',
            textTransform: 'uppercase',
            minHeight: '60px',
            transition: 'background .18s ease, color .18s ease',
          }}
        >
          Sí, voy
        </a>

        {settled ? (
          <a href={waLink(MESSAGES.no)} target="_blank" rel="noopener" style={noStyle}>
            {noLabel}
          </a>
        ) : (
          <button
            ref={btnRef}
            type="button"
            onMouseEnter={flee}
            onClick={(e) => {
              e.preventDefault();
              flee();
            }}
            style={noStyle}
          >
            {noLabel}
          </button>
        )}
      </div>

      <p style={{ margin: '24px 0 0', fontFamily: MONO, fontSize: '10.5px', lineHeight: 1.8, letterSpacing: '.06em', color: 'rgba(240,231,214,.5)' }}>
        Confirmación por WhatsApp.
        <br />
        Sin formularios, sin correos, sin sancocho.
      </p>
    </Reveal>
  );
}
