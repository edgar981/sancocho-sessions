import Reveal from './Reveal.jsx';
import { EVENT } from '../config.js';

const RULE = '1px solid rgba(20,18,15,.16)';

const dtStyle = (isLast) => ({
  fontFamily: '"Space Mono", monospace',
  fontSize: '10.5px',
  letterSpacing: '.11em',
  color: 'rgba(20,18,15,.5)',
  padding: '13px 14px 13px 0',
  borderTop: RULE,
  ...(isLast ? { borderBottom: RULE } : {}),
});

const ddStyle = (isLast) => ({
  margin: 0,
  fontSize: '14px',
  lineHeight: 1.45,
  fontWeight: 700,
  padding: '13px 0',
  borderTop: RULE,
  ...(isLast ? { borderBottom: RULE } : {}),
});

const gray = { color: 'rgba(20,18,15,.58)', fontWeight: 400 };

export default function Rider() {
  return (
    <Reveal as="section" style={{ padding: '60px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '.18em',
            color: '#C8271A',
          }}
        >
          RIDER
        </span>
        <span style={{ flex: 1, height: '1.5px', background: 'rgba(20,18,15,.22)' }} />
      </div>

      <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'minmax(96px,auto) 1fr', gap: 0 }}>
        <dt style={dtStyle(false)}>BEBIDA</dt>
        <dd style={ddStyle(false)}>
          Aperol Spritz <span style={gray}>(garantizado, sin excepciones)</span>
        </dd>

        <dt style={dtStyle(false)}>MÚSICA</dt>
        <dd style={ddStyle(false)}>
          Cero vallenato. <span style={gray}>Se aplica con rigor.</span>
        </dd>

        {/* #3 — MENÚ */}
        <dt style={dtStyle(false)}>MENÚ</dt>
        <dd style={ddStyle(false)}>
          Todo menos pollo con papas. <span style={gray}>Y desgranado, ni de riesgos.</span>
        </dd>

        {/* #4 — DRESS CODE */}
        <dt style={dtStyle(false)}>DRESS CODE</dt>
        <dd style={ddStyle(false)}>Todo te luce.</dd>

        <dt style={dtStyle(false)}>HORA</dt>
        <dd style={ddStyle(false)}>{EVENT.time}</dd>

        <dt style={dtStyle(true)}>UBICACIÓN</dt>
        <dd style={ddStyle(true)}>
          <a
            href={EVENT.mapsUrl}
            target="_blank"
            rel="noopener"
            style={{
              color: '#C8271A',
              borderBottom: '1.5px solid rgba(200,39,26,.45)',
              paddingBottom: '1px',
            }}
          >
            {EVENT.venueName}
          </a>
          <br />
          <span style={gray}>{EVENT.venueAddress}</span>
        </dd>
      </dl>
    </Reveal>
  );
}
