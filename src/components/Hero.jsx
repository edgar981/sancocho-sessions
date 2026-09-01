import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EVENT } from '../config.js';

/**
 * Hero tipográfico (sin copa 3D, #2). El sello "SIN SANCOCHO" se estampa 500ms
 * después de que se revela el hero (`revealed`), una sola vez (#3).
 */
export default function Hero({ revealed }) {
  const reduce = useReducedMotion();
  const [stampIn, setStampIn] = useState(false);

  useEffect(() => {
    if (reduce) {
      setStampIn(true); // sin animación → aparece ya estampado
      return;
    }
    if (revealed) {
      const t = setTimeout(() => setStampIn(true), 500);
      return () => clearTimeout(t);
    }
  }, [revealed, reduce]);

  // Entrada escalonada del resto del hero (queda resuelto bajo el overlay).
  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: [0.2, 0.7, 0.3, 1], delay },
        };

  const dateLine = `${EVENT.date} · ${EVENT.venueName.toUpperCase()}, ${EVENT.city.toUpperCase()}`;

  return (
    <section
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '14px',
        padding: '40px 0 32px',
      }}
    >
      {/* eyebrow */}
      <motion.div {...rise(0.05)} style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#C8271A', flex: 'none' }} />
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '.16em',
            color: 'rgba(20,18,15,.62)',
          }}
        >
          EVENTO ÚNICO · SOLO UNA FECHA
        </span>
      </motion.div>

      {/* title + SIN SANCOCHO stamp — afiche tipográfico a todo el ancho */}
      <div style={{ position: 'relative' }}>
        <h1
          style={{
            position: 'relative',
            zIndex: 1,
            margin: 0,
            // Sin copa, el título llena el ancho: "SANCOCHO" (palabra más larga)
            // ocupa ~el ancho del contenedor en 390px, con tope para desktop.
            fontSize: 'clamp(40px,14.3vw,70px)',
            lineHeight: 0.84,
            fontWeight: 900,
            letterSpacing: '-.045em',
            textTransform: 'uppercase',
          }}
        >
          <motion.span style={{ display: 'block' }} {...rise(0.22)}>
            Sancocho
          </motion.span>
          <motion.span style={{ display: 'block', color: '#FF5B04' }} {...rise(0.32)}>
            Sessions
          </motion.span>
        </h1>

        {/* STAMP (#3): textura + multiply, tamaño grande, cruza el título.
            Animación de estampado disparada por `stampIn` (reveal + 500ms). */}
        <motion.div
          initial={{ opacity: 0, scale: 1.3, rotate: -10 }}
          animate={stampIn ? { opacity: 1, scale: 1, rotate: -10 } : { opacity: 0, scale: 1.3, rotate: -10 }}
          transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.2, 1.4, 0.4, 1] }}
          style={{
            position: 'absolute',
            left: '3%',
            top: '12%',
            width: '94%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 5, // por encima del <h1>
            transformOrigin: 'center',
          }}
        >
          <div
            style={{
              filter: 'url(#stampGrain)', // textura de estampado (grano / bordes irregulares)
              mixBlendMode: 'multiply', // tinta sobre papel
              border: '7px solid #C8271A',
              borderRadius: '7px',
              padding: '8px 18px 10px',
              boxShadow: 'inset 0 0 0 3px rgba(200,39,26,.4), 0 5px 18px rgba(20,18,15,.2)',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(38px,11.4vw,54px)',
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: '.01em',
                textTransform: 'uppercase',
                color: '#C8271A',
                whiteSpace: 'nowrap',
              }}
            >
              Sin sancocho
            </span>
          </div>
        </motion.div>
      </div>

      {/* subtitle */}
      <motion.p
        {...rise(0.42)}
        style={{
          margin: '2px 0 0',
          fontSize: '16px',
          lineHeight: 1.35,
          fontWeight: 700,
          letterSpacing: '-.01em',
          color: 'rgba(20,18,15,.78)',
        }}
      >
        Vol. 1 — aforo máximo: dos personas.
      </motion.p>

      {/* date band */}
      <motion.div
        {...rise(0.5)}
        style={{
          borderTop: '1.5px solid rgba(20,18,15,.22)',
          borderBottom: '1.5px solid rgba(20,18,15,.22)',
          padding: '13px 0',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: '"Space Mono", monospace',
            fontSize: '12.5px',
            lineHeight: 1.6,
            letterSpacing: '.04em',
            color: '#14120F',
          }}
        >
          {dateLine}
        </p>
      </motion.div>

      {/* RSVP jump button */}
      <motion.a
        href="#rsvp"
        {...rise(0.6)}
        whileHover={reduce ? undefined : { backgroundColor: '#FF5B04', color: '#14120F', y: -2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          background: '#14120F',
          color: '#EFE7D8',
          padding: '19px 24px',
          borderRadius: '2px',
          fontSize: '16px',
          fontWeight: 900,
          letterSpacing: '.06em',
          textTransform: 'uppercase',
          minHeight: '56px',
        }}
      >
        <span>RSVP</span>
        <span style={{ fontFamily: '"Space Mono", monospace', fontSize: '15px' }}>↓</span>
      </motion.a>
    </section>
  );
}
