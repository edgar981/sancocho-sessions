import Marquee from './components/Marquee.jsx';
import Hero from './components/Hero.jsx';
import Lineup from './components/Lineup.jsx';
import Rider from './components/Rider.jsx';
import Rsvp from './components/Rsvp.jsx';
import Faq from './components/Faq.jsx';
import { SHOW_FAQ } from './config.js';

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.42'/></svg>\")";

export default function App() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#EFE7D8',
        fontFamily: 'Archivo, system-ui, sans-serif',
        color: '#14120F',
      }}
    >
      {/* Ambient background: two drifting warm blobs + a subtle grain overlay */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            width: '120vw',
            height: '120vw',
            left: '-35vw',
            top: '-30vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle at center,rgba(255,91,4,.22),rgba(255,91,4,0) 60%)',
            filter: 'blur(30px)',
            animation: 'drift1 30s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '110vw',
            height: '110vw',
            right: '-45vw',
            bottom: '-20vh',
            borderRadius: '50%',
            background: 'radial-gradient(circle at center,rgba(200,39,26,.14),rgba(200,39,26,0) 58%)',
            filter: 'blur(36px)',
            animation: 'drift2 38s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            mixBlendMode: 'multiply',
            opacity: 0.28,
            backgroundImage: NOISE,
          }}
        />
      </div>

      {/* content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* #7 — top marquee, duplicated from the footer at a slightly faster speed */}
        <Marquee duration={19} border="bottom" fullBleed />

        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 22px 56px' }}>
          <Hero />
          <Lineup />
          <Rider />
          {SHOW_FAQ && <Faq />}
          <Rsvp />

          {/* footer marquee — original speed, so the two never sync up */}
          <div style={{ marginTop: '52px' }}>
            <Marquee duration={24} border="top" />
          </div>
        </div>
      </div>
    </div>
  );
}
