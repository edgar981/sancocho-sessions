import { motion, useReducedMotion } from 'framer-motion';
import AperolGlass from './AperolGlass.jsx';
import { EVENT } from '../config.js';

export default function Hero() {
  const reduce = useReducedMotion();

  // Staggered mount reveal (mirrors the design's `rise` keyframe + delays).
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
      <motion.div
        {...rise(0.05)}
        style={{ display: 'flex', alignItems: 'center', gap: '9px' }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#C8271A',
            flex: 'none',
          }}
        />
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

      {/* 3D Aperol glass (with static fallback baked in) */}
      <motion.div
        {...rise(0.12)}
        style={{ position: 'relative', height: '25svh', minHeight: '160px', margin: '0 -8px' }}
      >
        <AperolGlass />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '2px',
            width: '56%',
            height: '16px',
            transform: 'translateX(-50%)',
            background:
              'radial-gradient(ellipse at center,rgba(20,18,15,.22),rgba(20,18,15,0) 70%)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* title + SIN SANCOCHO stamp */}
      <div style={{ position: 'relative' }}>
        <h1
          style={{
            position: 'relative',
            zIndex: 1,
            margin: 0,
            fontSize: 'clamp(56px,16.6vw,86px)',
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

        {/* --- STAMP: raised above <h1>, ~30% larger, -10°, shadow + multiply --- */}
        <motion.div
          initial={
            reduce
              ? { opacity: 1, scale: 1, rotate: -10 }
              : { opacity: 0, scale: 1.5, rotate: -10 }
          }
          animate={{ opacity: 1, scale: 1, rotate: -10 }}
          transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.3, 1.4, 0.5, 1], delay: 0.95 }}
          style={{
            position: 'absolute',
            left: '2%',
            top: '-15%',
            width: '92%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 5, // above the <h1>
            transformOrigin: 'center',
          }}
        >
          <div
            style={{
              filter: 'url(#stampGrain)',
              mixBlendMode: 'multiply', // stamped-into-the-paper look on cream
              border: '5px solid #C8271A',
              borderRadius: '6px',
              padding: '9px 18px 8px',
              boxShadow:
                'inset 0 0 0 2px rgba(200,39,26,.35), 0 4px 16px rgba(20,18,15,.22)',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(31px,9.6vw,49px)', // ~30% larger than before
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
