const TEXT = 'SANCOCHO SESSIONS · VOL. 1 · SIN SANCOCHO · CERO VALLENATO · BOGOTÁ · ';

/**
 * Cinta infinita (variante visual). Dos modos:
 *  - "bar":  franja naranja con texto oscuro (arriba del hero).
 *  - "line": franja transparente con texto tenue y filetes (footer).
 * Velocidades distintas (duration) para que no se vean sincronizadas.
 */
export default function Marquee({ duration = 21, variant = 'bar' }) {
  const isBar = variant === 'bar';

  const band = {
    display: 'flex',
    alignItems: 'center',
    height: '38px',
    overflow: 'hidden',
    width: '100%',
    ...(isBar
      ? {
          background: '#FF5A16',
          color: '#131010',
          borderBottom: '1px solid rgba(240,231,214,.2)',
        }
      : {
          borderTop: '1px solid rgba(240,231,214,.2)',
          borderBottom: '1px solid rgba(240,231,214,.2)',
        }),
  };

  const track = {
    display: 'flex',
    width: 'max-content',
    animation: `marq ${duration}s linear infinite`,
    fontFamily: '"DM Mono", ui-monospace, monospace',
    fontSize: '10.5px',
    letterSpacing: '.26em',
    ...(isBar ? { fontWeight: 500 } : { color: 'rgba(240,231,214,.4)' }),
  };

  return (
    <div aria-hidden="true" style={band}>
      <div style={track}>
        <span style={{ paddingRight: '26px', whiteSpace: 'nowrap' }}>{TEXT}</span>
        <span style={{ paddingRight: '26px', whiteSpace: 'nowrap' }}>{TEXT}</span>
      </div>
    </div>
  );
}
