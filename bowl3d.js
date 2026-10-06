import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const canvas = document.getElementById("bowlCanvas");

if (canvas) {
  initializeBowl();
}

function initializeBowl() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
  } catch (error) {
    console.error("Three.js kausivaadet ei saanud käivitada.", error);
    return;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(3.1, 2.45, 4.6);
  camera.lookAt(0, 0.18, 0);

  scene.add(new THREE.HemisphereLight(0xfff1d5, 0x65452f, 2.1));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(-3, 5, 4);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffd29a, 0.8);
  fillLight.position.set(3, 2, -4);
  scene.add(fillLight);

  const bowl = new THREE.Group();
  bowl.position.y = -0.52;
  bowl.scale.setScalar(1.82);
  scene.add(bowl);

  const profile = [
    new THREE.Vector2(0, 0.22),
    new THREE.Vector2(0.38, 0.22),
    new THREE.Vector2(0.68, 0.32),
    new THREE.Vector2(0.88, 0.55),
    new THREE.Vector2(0.98, 0.92),
    new THREE.Vector2(1.03, 1.07),
    new THREE.Vector2(1.09, 1.08),
    new THREE.Vector2(1.03, 0.96),
    new THREE.Vector2(0.93, 0.62),
    new THREE.Vector2(0.74, 0.37),
    new THREE.Vector2(0.4, 0.27),
    new THREE.Vector2(0, 0.27),
  ];
  const bowlMaterial = new THREE.MeshStandardMaterial({
    color: 0x9c5937,
    roughness: 0.82,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const body = new THREE.Mesh(new THREE.LatheGeometry(profile, 12), bowlMaterial);
  bowl.add(body);

  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(1.06, 0.055, 4, 12),
    new THREE.MeshStandardMaterial({
      color: 0xc17c4a,
      roughness: 0.72,
      flatShading: true,
    }),
  );
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.06;
  bowl.add(rim);

  const foot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.44, 0.12, 10),
    new THREE.MeshStandardMaterial({
      color: 0x704027,
      roughness: 0.9,
      flatShading: true,
    }),
  );
  foot.position.y = 0.16;
  bowl.add(foot);

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(bounds.width, bounds.height, false);
    camera.aspect = bounds.width / bounds.height;
    camera.updateProjectionMatrix();
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  let previousTime = 0;
  function animate(time) {
    requestAnimationFrame(animate);
    if (!canvas.clientWidth || !canvas.clientHeight) return;

    const delta = previousTime
      ? Math.min((time - previousTime) / 1000, 0.05)
      : 0;
    previousTime = time;
    bowl.rotation.y += delta * 0.28;
    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
}
