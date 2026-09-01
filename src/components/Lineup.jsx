import Reveal from './Reveal.jsx';

const MONO = "'DM Mono', ui-monospace, monospace";

export default function Lineup() {
  return (
    <Reveal as="section" style={{ padding: '60px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '30px' }}>
        <span style={{ fontFamily: MONO, fontSize: '10.5px', letterSpacing: '.22em', color: '#FF5A16' }}>01 / LINEUP</span>
        <span style={{ flex: 1, height: '2px', background: 'rgba(240,231,214,.22)' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: '9.5px', letterSpacing: '.24em', color: 'rgba(240,231,214,.45)', marginBottom: '4px' }}>
            HEADLINER
          </div>
          <div style={{ fontSize: 'clamp(64px,20vw,92px)', lineHeight: 0.8, fontWeight: 900, letterSpacing: '-.01em', textTransform: 'uppercase' }}>
            Eduardo
          </div>
          <div style={{ fontFamily: MONO, fontSize: '11.5px', letterSpacing: '.02em', color: 'rgba(240,231,214,.6)', marginTop: '10px' }}>
            live con campana de salsa
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(240,231,214,.18)' }} />

        <div>
          <div style={{ fontFamily: MONO, fontSize: '9.5px', letterSpacing: '.24em', color: 'rgba(240,231,214,.45)', marginBottom: '4px' }}>
            SUPPORT
          </div>
          <div style={{ fontSize: 'clamp(34px,10.5vw,48px)', lineHeight: 0.88, fontWeight: 700, letterSpacing: 0, textTransform: 'uppercase' }}>
            {/* b2b es jerga de DJ, va intencional — no tocar */}
            Edgar <span style={{ color: '#FF5A16' }}>b2b</span> María Alejandra
          </div>
        </div>
      </div>

      <p style={{ margin: '30px 0 0', fontFamily: MONO, fontSize: '10.5px', lineHeight: 1.7, letterSpacing: '.06em', color: 'rgba(240,231,214,.5)' }}>
        Género: Salsa. Sí, salsa.
      </p>
    </Reveal>
  );
}
