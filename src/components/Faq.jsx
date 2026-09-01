import Reveal from './Reveal.jsx';

// Apagada por defecto en el diseño (config.js → SHOW_FAQ). Se conserva íntegra.
const ITEMS = [
  { q: '¿Es un evento real?', a: 'Sí. El lineup es discutible, el plan no.' },
  { q: '¿Puedo llevar acompañante?', a: 'El cupo es de dos personas y ya está lleno.' },
  { q: '¿Habrá sancocho?', a: 'No. (Aún.)' },
];

export default function Faq() {
  return (
    <Reveal as="section" style={{ padding: '60px 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '.18em',
            color: '#C8271A',
          }}
        >
          FAQ
        </span>
        <span style={{ flex: 1, height: '1.5px', background: 'rgba(20,18,15,.22)' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {ITEMS.map((it) => (
          <div key={it.q}>
            <p style={{ margin: '0 0 5px', fontSize: '14.5px', fontWeight: 800, letterSpacing: '-.01em' }}>
              {it.q}
            </p>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, color: 'rgba(20,18,15,.66)' }}>
              {it.a}
            </p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
