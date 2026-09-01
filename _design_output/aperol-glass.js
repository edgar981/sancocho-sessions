import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const ORANGE = 0xff5b04;

function lowPower() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  if (navigator.deviceMemory && navigator.deviceMemory <= 3) return true;
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 3) return true;
  return false;
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) { return false; }
}

function profile(pairs) { return pairs.map(([x, y]) => new THREE.Vector2(x, y)); }

class AperolGlass extends HTMLElement {
  connectedCallback() {
    if (this._init) return;
    this._init = true;
    this.style.display = 'block';
    this.style.width = '100%';
    this.style.height = '100%';
    this.style.pointerEvents = 'none';

    if (!hasWebGL()) return this.fallback();

    const simple = lowPower();
    const w = this.clientWidth || 320;
    const h = this.clientHeight || 420;

    const renderer = new THREE.WebGLRenderer({ antialias: !simple, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, simple ? 1 : 1.75));
    renderer.setSize(w, h, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    const cv = renderer.domElement;
    cv.style.width = '100%';
    cv.style.height = '100%';
    cv.style.display = 'block';
    this.appendChild(cv);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100);
    camera.position.set(0, 2.0, 8.6);
    camera.lookAt(0, 1.85, 0);

    const group = new THREE.Group();
    group.name = 'AperolSpritz';
    scene.add(group);

    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x6b6257, transparent: true, opacity: 0.26, roughness: 0.05, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.04, side: THREE.DoubleSide, depthWrite: false });
    glassMat.name = 'Glass';

    const glass = new THREE.Mesh(new THREE.LatheGeometry(profile([
      [0.00, 0.02], [0.66, 0.02], [0.66, 0.09], [0.30, 0.16], [0.09, 0.30],
      [0.085, 1.00], [0.16, 1.10], [0.46, 1.26], [0.76, 1.62], [0.92, 2.12],
      [0.95, 2.60], [0.93, 2.86], [0.90, 2.86], [0.90, 2.30], [0.74, 1.72],
      [0.44, 1.34], [0.10, 1.12]
    ]), 64), glassMat);
    glass.name = 'GlassBody';
    group.add(glass);

    const liquidMat = new THREE.MeshPhysicalMaterial({ color: 0xf24b00, roughness: 0.2, metalness: 0, clearcoat: 0.8, clearcoatRoughness: 0.15, emissive: 0x5a1c00, emissiveIntensity: 0.25 });
    liquidMat.name = 'Aperol';
    const liquid = new THREE.Mesh(new THREE.LatheGeometry(profile([
      [0.00, 1.16], [0.36, 1.30], [0.66, 1.64], [0.84, 2.10], [0.87, 2.46], [0.00, 2.46]
    ]), 64), liquidMat);
    liquid.name = 'Liquid';
    group.add(liquid);

    const iceMat = new THREE.MeshPhysicalMaterial({ color: 0xcfd8dc, transparent: true, opacity: 0.5, depthWrite: false, roughness: 0.25, metalness: 0 });
    iceMat.name = 'Ice';
    [[-0.30, 2.42, 0.06, 0.44], [0.28, 2.52, -0.14, 0.38], [0.02, 2.30, -0.22, 0.34]].forEach((c, i) => {
      const cube = new THREE.Mesh(new THREE.BoxGeometry(c[3], c[3], c[3]), iceMat);
      cube.name = 'Ice' + (i + 1);
      cube.position.set(c[0], c[1], c[2]);
      cube.rotation.set(i * 0.7, i * 1.1, i * 0.4);
      group.add(cube);
    });

    const sliceMat = new THREE.MeshStandardMaterial({ color: 0xff8a1f, roughness: 0.5, emissive: 0x3a1300, emissiveIntensity: 0.4, side: THREE.DoubleSide });
    sliceMat.name = 'OrangeSlice';
    const slice = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.07, 32, 1, false, 0, Math.PI), sliceMat);
    slice.name = 'Slice';
    slice.position.set(0.72, 2.74, 0.1);
    slice.rotation.set(Math.PI / 2, 0, -0.5);
    group.add(slice);

    scene.add(new THREE.AmbientLight(0xfff6ea, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(3.5, 6, 5); scene.add(key);
    const rim = new THREE.DirectionalLight(0xff7a2b, 1.6); rim.position.set(-4, 2.5, -3.5); scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffd9b0, 1.2); fill.position.set(-1.5, -2, 3); scene.add(fill);

    let raf = 0, t = 0, running = true;
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
    tick();

    const ro = new ResizeObserver(() => {
      const nw = this.clientWidth || w, nh = this.clientHeight || h;
      renderer.setSize(nw, nh, false);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    });
    ro.observe(this);

    const io = new IntersectionObserver((e) => { running = e[0].isIntersecting; }, { threshold: 0.02 });
    io.observe(this);

    this._cleanup = () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); renderer.dispose(); };
  }

  fallback() {
    const d = document.createElement('div');
    d.style.cssText = 'width:100%;height:100%;background:radial-gradient(circle at 50% 48%,rgba(255,91,4,.55),rgba(255,91,4,0) 58%);filter:blur(8px)';
    this.appendChild(d);
  }

  disconnectedCallback() { if (this._cleanup) this._cleanup(); }
}

if (!customElements.get('aperol-glass')) customElements.define('aperol-glass', AperolGlass);
