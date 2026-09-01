import { useEffect, useState } from 'react';
import { EVENT } from '../config.js';

const MONO = "'DM Mono', ui-monospace, monospace";

/**
 * Hero (variante visual, tema oscuro). El sello "SIN SANCOCHO" se estampa
 * ~480ms después de revelarse el hero (total ~900ms desde el click en la reja),
 * una sola vez. Con prefers-reduced-motion aparece ya estampado.
 */
export default function Hero({ revealed }) {
  const [stampIn, setStampIn] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setStampIn(true);
      return;
    }
    if (revealed) {
      const t = setTimeout(() => setStampIn(true), 480);
      return () => clearTimeout(t);
    }
  }, [revealed]);

  const rise = (delay) => ({ animation: `rise .8s cubic-bezier(.2,.7,.3,1) ${delay}s both` });
  const venueLine = `${EVENT.venueName}, ${EVENT.city}`.toUpperCase();

  return (
    <section
      style={{
        minHeight: 'calc(100svh - 38px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '16px',
        padding: '22px 0 26px',
      }}
    >
      {/* eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', ...rise(0.05) }}>
        <span style={{ width: '8px', height: '8px', background: '#FF5A16', flex: 'none' }} />
        <span style={{ fontFamily: MONO, fontSize: '10.5px', letterSpacing: '.2em', color: 'rgba(240,231,214,.62)' }}>
          EVENTO ÚNICO · SOLO UNA FECHA
        </span>
      </div>

      {/* title + SIN SANCOCHO stamp */}
      <div style={{ position: 'relative', margin: '2px 0 0' }}>
        <h1
          style={{
            position: 'relative',
            zIndex: 1,
            margin: 0,
            // 22vw mantiene "SANCOCHO" (la palabra más larga) dentro del
            // contenedor en 360px y 390px, sin overflow horizontal.
            fontSize: 'clamp(66px,22vw,106px)',
            lineHeight: 0.78,
            fontWeight: 900,
            letterSpacing: '-.012em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ display: 'block', ...rise(0.2) }}>Sancocho</span>
          <span style={{ display: 'block', color: '#FF5A16', ...rise(0.3) }}>Sessions</span>
        </h1>

        {/* Sello: barra oscura con filetes crema, textura de tinta. Se estampa una vez.
            Full-bleed (120vw, centrado en el viewport ignorando el padding): las
            líneas cruzan de borde a borde y se salen por ambos extremos. */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '31%',
            width: '120vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 5,
            transformOrigin: 'center',
            opacity: stampIn ? 1 : 0,
            transform: `translateX(-50%) rotate(-6.5deg) scale(${stampIn ? 1 : 1.45})`,
            transition: 'opacity .28s ease, transform .4s cubic-bezier(.2,1.5,.4,1)',
          }}
        >
          <div
            style={{
              filter: 'url(#ink)',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              background: 'rgba(19,16,16,.72)',
            }}
          >
            <span style={{ height: '3px', background: '#F0E7D6' }} />
            <span
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '7px 0 9px',
                fontSize: 'clamp(42px,13.5vw,62px)',
                lineHeight: 0.9,
                fontWeight: 800,
                letterSpacing: '.02em',
                textTransform: 'uppercase',
                color: '#F0E7D6',
                whiteSpace: 'nowrap',
              }}
            >
              Sin sancocho
            </span>
            <span style={{ height: '3px', background: '#F0E7D6' }} />
          </div>
        </div>
      </div>

      {/* subtitle */}
      <p
        style={{
          margin: '6px 0 0',
          fontFamily: MONO,
          fontSize: '12.5px',
          lineHeight: 1.45,
          letterSpacing: '.01em',
          color: 'rgba(240,231,214,.72)',
          ...rise(0.42),
        }}
      >
        Vol. 1 — aforo máximo: dos personas.
      </p>

      {/* date band */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '2px 14px',
          borderTop: '2px solid rgba(240,231,214,.28)',
          borderBottom: '2px solid rgba(240,231,214,.28)',
          padding: '11px 0',
          ...rise(0.5),
        }}
      >
        <span style={{ fontFamily: MONO, fontSize: '11.5px', letterSpacing: '.08em', color: '#F0E7D6' }}>
          {EVENT.date}
        </span>
        <span style={{ fontFamily: MONO, fontSize: '11.5px', letterSpacing: '.08em', color: 'rgba(240,231,214,.6)', textAlign: 'right' }}>
          {EVENT.time.toUpperCase()}
        </span>
        <span style={{ fontFamily: MONO, fontSize: '11.5px', letterSpacing: '.08em', color: 'rgba(240,231,214,.6)' }}>
          {venueLine}
        </span>
      </div>

      {/* RSVP jump button — la flecha ↓ se mueve en bucle (#4) */}
      <a
        href="#rsvp"
        className="btn-o"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          background: '#FF5A16',
          color: '#131010',
          padding: '16px 22px',
          fontSize: '26px',
          fontWeight: 900,
          letterSpacing: '.02em',
          textTransform: 'uppercase',
          minHeight: '56px',
          transition: 'background .18s ease, color .18s ease',
          ...rise(0.6),
        }}
      >
        <span>RSVP</span>
        <span className="rsvp-arrow" style={{ fontFamily: MONO, fontSize: '15px', fontWeight: 500 }}>
          ↓
        </span>
      </a>
    </section>
  );
}
