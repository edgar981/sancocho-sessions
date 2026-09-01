const TEXT = 'SANCOCHO SESSIONS · VOL. 1 · SIN SANCOCHO · CERO VALLENATO · BOGOTÁ · ';

/**
 * Infinite ticker. Two identical spans + translateX(-50%) = seamless loop.
 * `duration` sets the speed — top/bottom use different values so they never
 * look synced. The band has a FIXED height and centers the text vertically
 * (#4), so both ribbons share the same optical padding.
 */
export default function Marquee({ duration = 24, border = 'top', fullBleed = false }) {
  const borderKey = border === 'top' ? 'borderTop' : 'borderBottom';

  return (
    <div
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'center', // vertical centering
        height: '44px', // defined band height
        overflow: 'hidden',
        [borderKey]: '1.5px solid rgba(20,18,15,.18)',
        // full-bleed top ribbon spans the viewport even inside the 480px column
        ...(fullBleed
          ? { width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)' }
          : {}),
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `marq ${duration}s linear infinite`,
          fontFamily: '"Space Mono", monospace',
          fontSize: '10.5px',
          letterSpacing: '.2em',
          color: 'rgba(20,18,15,.38)',
          ...(fullBleed ? { paddingLeft: '22px' } : {}),
        }}
      >
        <span style={{ paddingRight: '24px', whiteSpace: 'nowrap' }}>{TEXT}</span>
        <span style={{ paddingRight: '24px', whiteSpace: 'nowrap' }}>{TEXT}</span>
      </div>
    </div>
  );
}
