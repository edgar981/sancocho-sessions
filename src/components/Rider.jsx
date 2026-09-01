import Reveal from './Reveal.jsx';
import { EVENT } from '../config.js';

const MONO = "'DM Mono', ui-monospace, monospace";
const RULE = '1px solid rgba(240,231,214,.18)';

const rowStyle = (last) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '3px',
  padding: '14px 0',
  borderTop: RULE,
  ...(last ? { borderBottom: RULE } : {}),
});
const dtStyle = { fontFamily: MONO, fontSize: '9.5px', letterSpacing: '.24em', color: 'rgba(240,231,214,.45)' };
const termStyle = { margin: 0, fontSize: '26px', lineHeight: 1.05, fontWeight: 700, letterSpacing: 0, textTransform: 'uppercase' };
const descStyle = { margin: 0, fontFamily: MONO, fontSize: '11.5px', lineHeight: 1.5, color: 'rgba(240,231,214,.58)' };

export default function Rider() {
  return (
    <Reveal as="section" style={{ padding: '66px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '22px' }}>
        <span style={{ fontFamily: MONO, fontSize: '10.5px', letterSpacing: '.22em', color: '#FF5A16' }}>02 / RIDER</span>
        <span style={{ flex: 1, height: '2px', background: 'rgba(240,231,214,.22)' }} />
      </div>

      <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
        <div style={rowStyle(false)}>
          <dt style={dtStyle}>BEBIDA</dt>
          <dd style={termStyle}>Aperol Spritz.</dd>
          <dd style={descStyle}>Máximo 2, si no luego empiezas a verme simpático.</dd>
        </div>

        <div style={rowStyle(false)}>
          <dt style={dtStyle}>MÚSICA</dt>
          <dd style={termStyle}>Cero vallenato.</dd>
          <dd style={descStyle}>Se aplica con rigor.</dd>
        </div>

        <div style={rowStyle(false)}>
          <dt style={dtStyle}>MENÚ</dt>
          <dd style={termStyle}>Todo menos pollo con papas.</dd>
          <dd style={descStyle}>Y desgranado, ni en broma.</dd>
        </div>

        <div style={rowStyle(false)}>
          <dt style={dtStyle}>DRESS CODE</dt>
          <dd style={termStyle}>Todo lo que te pones te queda bien.</dd>
        </div>

        <div style={rowStyle(false)}>
          <dt style={dtStyle}>HORA</dt>
          <dd style={termStyle}>{EVENT.time}</dd>
        </div>

        <div style={rowStyle(true)}>
          <dt style={dtStyle}>UBICACIÓN</dt>
          <dd style={termStyle}>
            <a href={EVENT.mapsUrl} target="_blank" rel="noopener" style={{ color: '#FF5A16', borderBottom: '2px solid rgba(255,90,22,.45)' }}>
              {EVENT.venueName}
            </a>
          </dd>
          <dd style={descStyle}>{EVENT.venueAddress}</dd>
        </div>
      </dl>
    </Reveal>
  );
}
