import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const canvas = document.getElementById("pyramidCanvas");
const sceneContainer = canvas?.parentElement;
const status = document.getElementById("pyramidStatus");

if (canvas && sceneContainer && status) {
  initializePyramid();
}

function initializePyramid() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
  } catch (error) {
    console.error("Three.js püramiidi WebGL-vaadet ei saanud käivitada.", error);
    status.textContent =
      "3D-vaadet ei saanud käivitada. Vali korrus allolevate nuppudega.";
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(4.5, 3.4, 6.4);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x76563a, 2.1));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
  keyLight.position.set(-3, 6, 5);
  scene.add(keyLight);

  const pyramid = new THREE.Group();
  scene.add(pyramid);

  const floorDefinitions = [
    {
      id: 1,
      color: 0xe5a262,
      bottomRadius: 2.05,
      topRadius: 1.56,
      foods: [
        "Cereal and bread/Porridge 1.png",
        "Cereal and bread/Black bread 1.png",
        "Cereal and bread/Corn 1.png",
      ],
    },
    {
      id: 2,
      color: 0x8bc34a,
      bottomRadius: 1.56,
      topRadius: 1.07,
      foods: [
        "Vegetables/Broccoli.png",
        "Fruits/Apple.png",
        "Vegetables/Carrot.png",
      ],
    },
    {
      id: 3,
      color: 0x4fc3f7,
      bottomRadius: 1.07,
      topRadius: 0.58,
      foods: [
        "Fish and meat/Fish.png",
        "Eggs and Dairy/Egg 1.png",
        "Eggs and Dairy/Cheese 1.png",
      ],
    },
    {
      id: 4,
      color: 0xffd54f,
      bottomRadius: 0.58,
      topRadius: 0.08,
      foods: ["Sweets/Chocolate.png", "Fruits/Cocount.png"],
    },
  ];
  const textureLoader = new THREE.TextureLoader();
  const floorMeshes = new Map();
  const floorShadowMeshes = new Map();
  const floorGroups = new Map();
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const selectedButton = document.querySelector(
    "#pyramid .pyramid-level-button.selected",
  );
  const selectableLevels = [
    ...document.querySelectorAll("#pyramid .pyramid-level-button:not(.locked)"),
  ].map((button) => Number(button.dataset.level));
  let selectedLevel = Number(selectedButton?.dataset.level) || 1;
  let unlockedLevel = Math.max(1, ...selectableLevels);
  let hoveredLevel = null;
  let active = !sceneContainer.closest("#homeView")?.classList.contains("hidden");
  let previousTime = 0;
  let touchGesture = null;
  let suppressSyntheticClickUntil = 0;
  const supportsPointerEvents = "PointerEvent" in window;

  floorDefinitions.forEach((floor, index) => {
    const floorGroup = new THREE.Group();
    floorGroup.position.y = (index - 1.5) * 0.78;
    pyramid.add(floorGroup);
    floorGroups.set(floor.id, floorGroup);

    const geometry = new THREE.CylinderGeometry(
      floor.topRadius,
      floor.bottomRadius,
      0.72,
      4,
    );
    const material = new THREE.MeshStandardMaterial({
      color: floor.color,
      roughness: 1,
      flatShading: true,
      emissive: 0x000000,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = Math.PI / 4;
    mesh.userData.level = floor.id;
    mesh.userData.baseColor = new THREE.Color(floor.color);
    floorGroup.add(mesh);
    floorMeshes.set(floor.id, mesh);

    const shadow = new THREE.Mesh(
      new THREE.CylinderGeometry(
        floor.topRadius * 1.08,
        floor.bottomRadius * 1.08,
        0.09,
        4,
      ),
      new THREE.MeshBasicMaterial({
        color: 0x24180f,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    );
    shadow.rotation.y = Math.PI / 4;
    shadow.position.set(0, -0.39, 0.025);
    floorGroup.add(shadow);
    floorShadowMeshes.set(floor.id, shadow);

    const averageRadius = (floor.bottomRadius + floor.topRadius) / 2;
    const iconSize =
      floor.id === 4 ? 0.17 : Math.min(0.37, averageRadius * 0.4);
    const iconSpacing = iconSize * (floor.foods.length === 2 ? 1.05 : 1.15);
    floor.foods.forEach((food, foodIndex) => {
      const texture = textureLoader.load(
        `Food pyramid/Line/${food}`,
        undefined,
        undefined,
        (error) => {
          console.error(`Toiduikooni ei saanud laadida: ${food}`, error);
        },
      );
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.generateMipmaps = false;

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.1,
        depthWrite: false,
        toneMapped: false,
      });
      const alongFace =
        (foodIndex - (floor.foods.length - 1) / 2) * iconSpacing;
      const faceDistance = averageRadius / Math.SQRT2 + 0.045;
      const facePositions = [
        [alongFace, faceDistance],
        [faceDistance, -alongFace],
        [-alongFace, -faceDistance],
        [-faceDistance, alongFace],
      ];

      facePositions.forEach(([x, z]) => {
        const sprite = new THREE.Sprite(material);
        sprite.position.set(x, 0, z);
        sprite.scale.set(iconSize, iconSize, 1);
        sprite.userData.food = food;
        floorGroup.add(sprite);
      });
    });

    if (index < floorDefinitions.length - 1) {
      const separator = new THREE.Mesh(
        new THREE.CylinderGeometry(
          floor.topRadius + 0.012,
          floor.topRadius + 0.012,
          0.032,
          4,
        ),
        new THREE.MeshStandardMaterial({
          color: 0x5e4533,
          roughness: 1,
          flatShading: true,
        }),
      );
      separator.position.y = 0.35;
      separator.rotation.y = Math.PI / 4;
      floorGroup.add(separator);
    }
  });

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(bounds.width, bounds.height, false);
    camera.aspect = bounds.width / bounds.height;
    camera.updateProjectionMatrix();
  }

  function updateState(event) {
    selectedLevel = event.detail.selectedLevel;
    unlockedLevel = event.detail.unlockedLevel;
    if (hoveredLevel !== null && hoveredLevel > unlockedLevel) {
      hoveredLevel = null;
    }
  }

  function findFloor(event) {
    const bounds = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects([...floorMeshes.values()], false)[0];
    return hit ? hit.object.userData.level : null;
  }

  function setHoveredLevel(level) {
    hoveredLevel = level !== null && level <= unlockedLevel ? level : null;
  }

  function beginTouchGesture(event) {
    if (!event.isPrimary) return;
    touchGesture = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startRotation: pyramid.rotation.y,
      moved: false,
    };
    setHoveredLevel(findFloor(event));
  }

  function moveTouchGesture(event, pointerId = event.pointerId) {
    if (!touchGesture || touchGesture.pointerId !== pointerId) return;
    const deltaX = event.clientX - touchGesture.startX;
    const deltaY = event.clientY - touchGesture.startY;
    if (Math.hypot(deltaX, deltaY) > 12) {
      touchGesture.moved = true;
    }
    if (!touchGesture.moved) return;

    pyramid.rotation.y = touchGesture.startRotation + deltaX * 0.01;
    setHoveredLevel(findFloor(event));
    event.preventDefault?.();
  }

  function endTouchGesture(event) {
    if (!touchGesture || touchGesture.pointerId !== event.pointerId) return;
    const gesture = touchGesture;
    touchGesture = null;
    suppressSyntheticClickUntil = Date.now() + 400;
    if (!gesture.moved) {
      selectLevel(findFloor(event));
    }
    hoveredLevel = null;
  }

  function selectLevel(level) {
    if (level === null) return;
    window.dispatchEvent(
      new CustomEvent("home-pyramid-select", { detail: { level } }),
    );
  }

  canvas.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") {
      moveTouchGesture(event);
      return;
    }
    const level = findFloor(event);
    setHoveredLevel(level);
    canvas.style.cursor =
      level === null ? "grab" : level <= unlockedLevel ? "pointer" : "not-allowed";
  });
  canvas.addEventListener("pointerleave", () => {
    hoveredLevel = null;
    canvas.style.cursor = "grab";
  });
  canvas.addEventListener("click", (event) => {
    if (Date.now() < suppressSyntheticClickUntil) return;
    selectLevel(findFloor(event));
  });
  if (supportsPointerEvents) {
    canvas.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch") beginTouchGesture(event);
    });
    canvas.addEventListener("pointerup", (event) => {
      if (event.pointerType === "touch") endTouchGesture(event);
    });
    canvas.addEventListener("pointercancel", (event) => {
      if (touchGesture?.pointerId === event.pointerId) {
        touchGesture = null;
        hoveredLevel = null;
      }
    });
  } else {
    canvas.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches.length !== 1) {
          touchGesture = null;
          hoveredLevel = null;
          return;
        }
        const touch = event.touches[0];
        touchGesture = {
          startX: touch.clientX,
          startY: touch.clientY,
          startRotation: pyramid.rotation.y,
          moved: false,
        };
        setHoveredLevel(findFloor(touch));
      },
      { passive: true },
    );
    canvas.addEventListener(
      "touchmove",
      (event) => {
        if (!touchGesture || event.touches.length !== 1) return;
        moveTouchGesture(event.touches[0], undefined);
      },
      { passive: false },
    );
    canvas.addEventListener("touchend", (event) => {
      if (!touchGesture) return;
      const gesture = touchGesture;
      touchGesture = null;
      suppressSyntheticClickUntil = Date.now() + 400;
      if (!gesture.moved && event.changedTouches.length) {
        selectLevel(findFloor(event.changedTouches[0]));
      }
      hoveredLevel = null;
    });
    canvas.addEventListener("touchcancel", () => {
      touchGesture = null;
      hoveredLevel = null;
    });
  }
  window.addEventListener("home-pyramid-state", updateState);
  window.addEventListener("home-pyramid-hover", (event) => {
    setHoveredLevel(event.detail.level);
  });
  window.addEventListener("home-pyramid-visibility", (event) => {
    active = event.detail.active;
    previousTime = 0;
  });

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();
  window.homePyramid3D = {
    setState({ selectedLevel: selected, unlockedLevel: unlocked }) {
      selectedLevel = selected;
      unlockedLevel = unlocked;
      setHoveredLevel(hoveredLevel);
    },
    setHoveredLevel,
    setActive(isActive) {
      active = isActive;
      previousTime = 0;
    },
  };

  function animate(time) {
    requestAnimationFrame(animate);
    if (!active) return;

    const delta = previousTime
      ? Math.min((time - previousTime) / 1000, 0.05)
      : 0;
    previousTime = time;
    if (hoveredLevel === null && touchGesture === null) {
      pyramid.rotation.y += delta * 0.32;
    }

    floorDefinitions.forEach(({ id }) => {
      const mesh = floorMeshes.get(id);
      const shadow = floorShadowMeshes.get(id);
      const group = floorGroups.get(id);
      const isHovered = hoveredLevel === id;
      const isSelected = selectedLevel === id;
      const isLocked = id > unlockedLevel;
      group.position.z +=
        ((isHovered ? 0.16 : isSelected ? 0.08 : 0) - group.position.z) *
        Math.min(delta * 12, 1);
      mesh.material.color
        .copy(mesh.userData.baseColor)
        .multiplyScalar(isLocked ? 0.48 : 1);
      mesh.material.emissive.setHex(isHovered ? 0x3a3a3a : isSelected ? 0x171717 : 0);
      shadow.material.opacity = isSelected ? 0.58 : 0;
      mesh.material.opacity = 1;
      mesh.material.transparent = false;
      group.children.forEach((child) => {
        if (child.isSprite) {
          child.material.color.setHex(isLocked ? 0x777777 : 0xffffff);
        }
      });
    });

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
}
