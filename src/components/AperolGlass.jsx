import { useEffect, useRef } from 'react';

// ── capability gates ──
function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) {
    return false;
  }
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Truly weak devices: render a single static frame instead of a live loop.
function lowPower() {
  if (navigator.deviceMemory && navigator.deviceMemory <= 2) return true;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return true;
  return false;
}

/**
 * Hero centerpiece: an Aperol Spritz in three.js.
 *
 * Robustness rules (round 2, bug #3):
 * - three.js is imported dynamically so it never blocks first paint.
 * - If WebGL exists we ALWAYS render at least one frame → the glass is visible
 *   on desktop AND mobile, even under prefers-reduced-motion / low-power (those
 *   just get a still frame instead of the spin — motion respected, never empty).
 * - Only "no WebGL" or an init error falls back to the static CSS glow.
 */
export default function AperolGlass() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el || !hasWebGL()) return; // static glow fallback stays visible

    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      let THREE;
      try {
        THREE = await import('three');
      } catch (e) {
        return; // import failed → keep fallback glow
      }
      if (cancelled || !mountRef.current) return;

      try {
        const profile = (pairs) => pairs.map(([x, y]) => new THREE.Vector2(x, y));
        const animate = !prefersReducedMotion() && !lowPower();
        const w = el.clientWidth || 320;
        const h = el.clientHeight || 420;

        const renderer = new THREE.WebGLRenderer({ antialias: !lowPower(), alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.setSize(w, h, false);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        const cv = renderer.domElement;
        cv.style.width = '100%';
        cv.style.height = '100%';
        cv.style.display = 'block';
        el.appendChild(cv);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100);
        camera.position.set(0, 2.0, 8.6);
        camera.lookAt(0, 1.85, 0);

        const group = new THREE.Group();
        scene.add(group);

        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0x6b6257, transparent: true, opacity: 0.26, roughness: 0.05,
          metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.04,
          side: THREE.DoubleSide, depthWrite: false,
        });
        const glass = new THREE.Mesh(
          new THREE.LatheGeometry(
            profile([
              [0.0, 0.02], [0.66, 0.02], [0.66, 0.09], [0.3, 0.16], [0.09, 0.3],
              [0.085, 1.0], [0.16, 1.1], [0.46, 1.26], [0.76, 1.62], [0.92, 2.12],
              [0.95, 2.6], [0.93, 2.86], [0.9, 2.86], [0.9, 2.3], [0.74, 1.72],
              [0.44, 1.34], [0.1, 1.12],
            ]),
            64
          ),
          glassMat
        );
        group.add(glass);

        const liquidMat = new THREE.MeshPhysicalMaterial({
          color: 0xf24b00, roughness: 0.2, metalness: 0, clearcoat: 0.8,
          clearcoatRoughness: 0.15, emissive: 0x5a1c00, emissiveIntensity: 0.25,
        });
        const liquid = new THREE.Mesh(
          new THREE.LatheGeometry(
            profile([
              [0.0, 1.16], [0.36, 1.3], [0.66, 1.64], [0.84, 2.1], [0.87, 2.46], [0.0, 2.46],
            ]),
            64
          ),
          liquidMat
        );
        group.add(liquid);

        const iceMat = new THREE.MeshPhysicalMaterial({
          color: 0xcfd8dc, transparent: true, opacity: 0.5, depthWrite: false,
          roughness: 0.25, metalness: 0,
        });
        [
          [-0.3, 2.42, 0.06, 0.44],
          [0.28, 2.52, -0.14, 0.38],
          [0.02, 2.3, -0.22, 0.34],
        ].forEach((c, i) => {
          const cube = new THREE.Mesh(new THREE.BoxGeometry(c[3], c[3], c[3]), iceMat);
          cube.position.set(c[0], c[1], c[2]);
          cube.rotation.set(i * 0.7, i * 1.1, i * 0.4);
          group.add(cube);
        });

        const sliceMat = new THREE.MeshStandardMaterial({
          color: 0xff8a1f, roughness: 0.5, emissive: 0x3a1300,
          emissiveIntensity: 0.4, side: THREE.DoubleSide,
        });
        const slice = new THREE.Mesh(
          new THREE.CylinderGeometry(0.46, 0.46, 0.07, 32, 1, false, 0, Math.PI),
          sliceMat
        );
        slice.position.set(0.72, 2.74, 0.1);
        slice.rotation.set(Math.PI / 2, 0, -0.5);
        group.add(slice);

        scene.add(new THREE.AmbientLight(0xfff6ea, 1.1));
        const key = new THREE.DirectionalLight(0xffffff, 2.2);
        key.position.set(3.5, 6, 5);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xff7a2b, 1.6);
        rim.position.set(-4, 2.5, -3.5);
        scene.add(rim);
        const fill = new THREE.DirectionalLight(0xffd9b0, 1.2);
        fill.position.set(-1.5, -2, 3);
        scene.add(fill);

        // Guarantee at least one visible frame (fixes "empty space on desktop").
        renderer.render(scene, camera);

        let raf = 0;
        let running = true;
        let t = 0;
        const clock = new THREE.Clock();
        const tick = () => {
          raf = requestAnimationFrame(tick);
          if (!running) return;
          t += clock.getDelta();
          group.rotation.y = t * 0.28;
          group.rotation.z = Math.sin(t * 0.5) * 0.04;
          group.position.y = Math.sin(t * 0.7) * 0.1;
          renderer.render(scene, camera);
        };
        if (animate) tick();

        const ro = new ResizeObserver(() => {
          const nw = el.clientWidth || w;
          const nh = el.clientHeight || h;
          renderer.setSize(nw, nh, false);
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          if (!animate) renderer.render(scene, camera); // keep the static frame correct
        });
        ro.observe(el);

        let io = null;
        if (animate) {
          io = new IntersectionObserver(
            (entries) => {
              running = entries[0].isIntersecting;
              if (running) clock.getDelta(); // drop the idle gap so it doesn't jump
            },
            { threshold: 0.02 }
          );
          io.observe(el);
        }

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          if (io) io.disconnect();
          renderer.dispose();
          if (cv.parentNode) cv.parentNode.removeChild(cv);
        };
      } catch (e) {
        return; // any three.js failure → keep the fallback glow
      }
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Static fallback glow — always painted; the canvas (if any) sits on top. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 48%,rgba(255,91,4,.55),rgba(255,91,4,0) 58%)',
          filter: 'blur(8px)',
        }}
      />
      <div ref={mountRef} aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
}
