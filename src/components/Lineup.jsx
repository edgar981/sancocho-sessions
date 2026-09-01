import Reveal from './Reveal.jsx';

export default function Lineup() {
  return (
    <Reveal as="section" style={{ padding: '56px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '26px' }}>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '.18em',
            color: '#C8271A',
          }}
        >
          LINEUP
        </span>
        <span style={{ flex: 1, height: '1.5px', background: 'rgba(20,18,15,.22)' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'center' }}>
        <div>
          <div
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '10px',
              letterSpacing: '.2em',
              color: 'rgba(20,18,15,.5)',
              marginBottom: '6px',
            }}
          >
            HEADLINER
          </div>
          <div
            style={{
              fontSize: 'clamp(38px,11.5vw,58px)',
              lineHeight: 0.9,
              fontWeight: 900,
              letterSpacing: '-.04em',
              textTransform: 'uppercase',
            }}
          >
            Eduardo
          </div>
          <div
            style={{
              fontSize: '12.5px',
              fontWeight: 600,
              letterSpacing: '.02em',
              color: 'rgba(20,18,15,.66)',
              marginTop: '8px',
            }}
          >
            live con campana de salsa
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(20,18,15,.16)' }} />

        <div>
          <div
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '10px',
              letterSpacing: '.2em',
              color: 'rgba(20,18,15,.5)',
              marginBottom: '8px',
            }}
          >
            SUPPORT
          </div>
          <div
            style={{
              fontSize: 'clamp(22px,6.6vw,32px)',
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: '-.025em',
              textTransform: 'uppercase',
            }}
          >
            {/* b2b es jerga de DJ, va intencional — no tocar */}
            Edgar <span style={{ color: '#FF5B04' }}>b2b</span> María Alejandra
          </div>
        </div>
      </div>

      <p
        style={{
          margin: '26px 0 0',
          fontFamily: '"Space Mono", monospace',
          fontSize: '11px',
          lineHeight: 1.7,
          letterSpacing: '.03em',
          color: 'rgba(20,18,15,.55)',
          textAlign: 'center',
        }}
      >
        Género: salsa. Sí, salsa.
      </p>
    </Reveal>
  );
}
