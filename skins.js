/*
 * Panda kaardid: skinide kataloog, kollektsiooni modal ja GAMBA! kirstu rulett.
 * Avalik liides on `window.PandaCards`; app.js kasutab sellest ainult
 * `setGambaAvailable` ja `preload`.
 */
(() => {
  "use strict";

  const STORAGE_KEYS = {
    unlocked: "unlockedSkins",
    active: "activeSkin",
  };
  const SKIN_ROOT = "skinid";
  const CHEST_IMAGE = "Pixel Art Treasure Chest.png";

  const RARITIES = [
    { id: "common", label: "Tavaline", folder: "common", dropRate: 65 },
    { id: "rare", label: "Haruldane", folder: "rare", dropRate: 22 },
    {
      id: "super-rare",
      label: "Üliharuldane",
      folder: "super rare",
      dropRate: 10,
    },
    {
      id: "ultra-rare",
      label: "Legendaarne",
      folder: "ultra rare",
      dropRate: 3,
    },
  ];
  const RARITY_BY_ID = Object.fromEntries(
    RARITIES.map((rarity) => [rarity.id, rarity]),
  );

  // Failinimed on täpselt need, mis skinid/ kaustades asuvad (laiendid erinevad).
  const SKIN_FILES = {
    common: [
      "Blue Cap Panda.jpg",
      "Chef Hat Panda.jpg",
      "Cool Glasses Panda.jpg",
      "Fitness Panda.jpg",
      "Red Shirt Panda.jpg",
      "Sailor Panda.jpg",
    ],
    rare: [
      "Academic Graduate Panda.jpg",
      "Construction Worker Panda.jpg",
      "Cyber Gamer Panda.jpg",
      "Detective Panda.jpg",
      "Doctor Panda.jpg",
      "Winter Snowsuit Panda.jpg",
    ],
    "super-rare": [
      "Arcane Wizard Panda.png",
      "Full Astronaut Panda.jpg",
      "Royal King Panda.png",
      "Shadow Ninja Panda.png",
      "Viking Warrior Panda.jpg",
    ],
    "ultra-rare": [
      "Broccoli Superhero Panda.png",
      "Cosmic Rainbow Aura Panda.png",
      "Kuldne 67 Meme Panda.png",
    ],
  };

  // Skini id on panda nimi (failinimi ilma laiendita), nt "Blue Cap Panda".
  const SKINS = Object.freeze(
    RARITIES.flatMap((rarity) =>
      SKIN_FILES[rarity.id].map((file) => {
        const name = file.replace(/\.[^.]+$/, "");
        return Object.freeze({
          id: name,
          name,
          rarity: rarity.id,
          src: encodeURI(`${SKIN_ROOT}/${rarity.folder}/${file}`),
        });
      }),
    ),
  );
  const SKIN_BY_ID = new Map(SKINS.map((skin) => [skin.id, skin]));

  const REEL_LENGTH = 64;
  const REEL_WINNER_INDEX = 6;
  const SPIN_DURATION = 6500;
  const REDUCED_SPIN_DURATION = 1400;
  // Algab väga kiiresti ja aeglustub sujuvalt (ease-out) täpselt seismajäämiseni.
  const SPIN_EASING = "cubic-bezier(0.2, 0.8, 0.25, 1)";
  const SPIN_GRACE = 1500;
  const PRELOAD_TIMEOUT = 12000;

  const SILHOUETTE_SIZE = 192;
  // Piksel loetakse siluetti kuuluvaks, kui mõni värvikanal on sellest tumedam.
  const INK_THRESHOLD = 222;

  const state = {
    unlocked: [],
    active: "",
    gachaPhase: "idle", // idle | loading | spinning | revealed
    gachaRun: 0,
    gachaWinner: null,
  };

  const $ = (id) => document.getElementById(id);
  const els = {
    skinsBtn: $("skinsBtn"),
    skinsModal: $("skinsModal"),
    skinsGrid: $("skinsGrid"),
    skinsProgress: $("skinsProgress"),
    skinsStatus: $("skinsStatus"),
    gambaBtn: $("gambaBtn"),
    gambaHint: $("gambaHint"),
    pandaAvatar: $("pandaAvatar"),
    pandaAvatarImg: $("pandaAvatarImg"),
    gachaModal: $("gachaModal"),
    gachaCloseBtn: $("gachaCloseBtn"),
    gachaRates: $("gachaRates"),
    reelWindow: $("reelWindow"),
    reelStrip: $("reelStrip"),
    gachaChest: $("gachaChest"),
    gachaFlash: $("gachaFlash"),
    gachaStatus: $("gachaStatus"),
    gachaResult: $("gachaResult"),
    gachaBanner: $("gachaBanner"),
    gachaWonName: $("gachaWonName"),
    gachaWonRarity: $("gachaWonRarity"),
    gachaActions: $("gachaActions"),
    gachaEquipBtn: $("gachaEquipBtn"),
    gachaCollectionBtn: $("gachaCollectionBtn"),
    gachaDoneBtn: $("gachaDoneBtn"),
  };
  const skinsScroll = els.skinsModal?.querySelector(".skins-scroll") || null;

  /* ---------- Salvestus ---------- */

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      // Salvestus pole saadaval (nt privaatne režiim): jätkame ainult mälus.
    }
  }

  // Aktsepteerib nii id-d kui ka pildi teed (nt "skinid/common/Blue Cap Panda.jpg").
  function toSkinId(value) {
    if (typeof value !== "string") return "";
    let id = value.trim();
    if (SKIN_BY_ID.has(id)) return id;
    try {
      id = decodeURIComponent(id);
    } catch (error) {
      // Jätame väärtuse muutmata.
    }
    id = id.split("/").pop().replace(/\.[^.]+$/, "");
    return SKIN_BY_ID.has(id) ? id : "";
  }

  function loadState() {
    let stored = [];
    try {
      const parsed = JSON.parse(readStorage(STORAGE_KEYS.unlocked) || "[]");
      if (Array.isArray(parsed)) stored = parsed;
    } catch (error) {
      stored = [];
    }
    state.unlocked = [...new Set(stored.map(toSkinId).filter(Boolean))];

    const active = toSkinId(readStorage(STORAGE_KEYS.active) || "");
    state.active = state.unlocked.includes(active) ? active : "";
  }

  function emitChange(type, skinId) {
    window.dispatchEvent(
      new CustomEvent("panda-skins-change", {
        detail: {
          type,
          skin: skinId,
          unlocked: [...state.unlocked],
          active: state.active,
        },
      }),
    );
  }

  function unlockSkin(id) {
    const skinId = toSkinId(id);
    if (!skinId || state.unlocked.includes(skinId)) return false;
    state.unlocked.push(skinId);
    writeStorage(STORAGE_KEYS.unlocked, JSON.stringify(state.unlocked));
    refreshUi();
    emitChange("unlock", skinId);
    return true;
  }

  function setActiveSkin(id) {
    const skinId = toSkinId(id);
    if (!skinId || !state.unlocked.includes(skinId)) return false;
    if (state.active === skinId) return true;
    state.active = skinId;
    writeStorage(STORAGE_KEYS.active, skinId);
    refreshUi();
    emitChange("active", skinId);
    return true;
  }

  /* ---------- Võidu tõenäosused ---------- */

  function rollRarity(random = Math.random) {
    const total = RARITIES.reduce((sum, rarity) => sum + rarity.dropRate, 0);
    let roll = random() * total;
    for (const rarity of RARITIES) {
      if (roll < rarity.dropRate) return rarity.id;
      roll -= rarity.dropRate;
    }
    return RARITIES[0].id;
  }

  function pickSkin(rarityId, random = Math.random) {
    const pool = SKINS.filter((skin) => skin.rarity === rarityId);
    return pool[Math.floor(random() * pool.length)];
  }

  function rollSkin(random = Math.random) {
    return pickSkin(rollRarity(random), random);
  }

  /* ---------- Modali abifunktsioonid ---------- */

  const lastFocus = new WeakMap();

  function openModal(modal, focusTarget) {
    lastFocus.set(modal, document.activeElement);
    modal.classList.remove("hidden");
    focusTarget?.focus({ preventScroll: true });
  }

  function closeModal(modal) {
    modal.classList.add("hidden");
    const previous = lastFocus.get(modal);
    lastFocus.delete(modal);
    if (previous?.isConnected && !previous.hidden) {
      previous.focus({ preventScroll: true });
    }
  }

  const isOpen = (modal) => !modal.classList.contains("hidden");

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Pilti ei saanud laadida: ${src}`));
      image.src = src;
    });
  }

  const preloadCache = new Map();

  function preloadImage(src) {
    if (!preloadCache.has(src)) {
      preloadCache.set(
        src,
        loadImage(src)
          .then((image) => image.decode?.().catch(() => {}))
          .then(() => true)
          .catch(() => false),
      );
    }
    return preloadCache.get(src);
  }

  function preload() {
    const sources = [encodeURI(CHEST_IMAGE), ...SKINS.map((skin) => skin.src)];
    return Promise.all(sources.map(preloadImage));
  }

  function createImageFallback() {
    const fallback = document.createElement("span");
    fallback.className = "skin-fallback";
    fallback.textContent = "🐼";
    return fallback;
  }

  /* ---------- Siluetid lukustatud kaartidele ---------- */

  // Skinide pildid on läbipaistmatu valge taustaga, seega pelk
  // `filter: brightness(0)` annaks musta ruudu. Siluett tekib nii, et taust
  // leitakse servadest alates ja ülejäänud kuju värvitakse mustaks. Kui see
  // ei õnnestu, jääb alles lihtne `brightness(0)` mask.
  function paintSilhouette(frame) {
    const { data, width: size, height } = frame;
    const total = size * height;
    const ink = new Uint8Array(total);

    for (let p = 0; p < total; p += 1) {
      const i = p * 4;
      const alpha = data[i + 3];
      if (alpha < 24) {
        ink[p] = 0;
      } else if (alpha < 250) {
        ink[p] = 1;
      } else {
        ink[p] =
          Math.min(data[i], data[i + 1], data[i + 2]) < INK_THRESHOLD ? 1 : 0;
      }
    }

    // Paksendame joont ühe piksli võrra, et kitsad vahed ei laseks taustal
    // kuju sisse lekkida.
    const wall = new Uint8Array(total);
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const p = y * size + x;
        wall[p] =
          ink[p] ||
          (x > 0 && ink[p - 1]) ||
          (x < size - 1 && ink[p + 1]) ||
          (y > 0 && ink[p - size]) ||
          (y < height - 1 && ink[p + size])
            ? 1
            : 0;
      }
    }

    const outside = new Uint8Array(total);
    const stack = new Int32Array(total);
    let top = 0;
    const seed = (p) => {
      if (wall[p] || outside[p]) return;
      outside[p] = 1;
      stack[top] = p;
      top += 1;
    };
    for (let i = 0; i < size; i += 1) seed(i);
    for (let i = 0; i < size; i += 1) seed((height - 1) * size + i);
    for (let i = 0; i < height; i += 1) seed(i * size);
    for (let i = 0; i < height; i += 1) seed(i * size + size - 1);
    while (top > 0) {
      top -= 1;
      const p = stack[top];
      const x = p % size;
      if (x > 0) seed(p - 1);
      if (x < size - 1) seed(p + 1);
      if (p >= size) seed(p - size);
      if (p < total - size) seed(p + size);
    }

    for (let p = 0; p < total; p += 1) {
      const i = p * 4;
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = outside[p] ? 0 : 255;
    }
  }

  const silhouettes = new Map();

  function getSilhouette(skin) {
    if (!silhouettes.has(skin.id)) {
      silhouettes.set(
        skin.id,
        loadImage(skin.src)
          .then(async (image) => {
            // Dekodeerime pildi enne joonistamist, et põhilõim ei peaks seda tegema.
            await image.decode?.().catch(() => {});
            const canvas = document.createElement("canvas");
            canvas.width = SILHOUETTE_SIZE;
            canvas.height = SILHOUETTE_SIZE;
            const context = canvas.getContext("2d", {
              willReadFrequently: true,
            });
            const scale = Math.min(
              SILHOUETTE_SIZE / image.naturalWidth,
              SILHOUETTE_SIZE / image.naturalHeight,
            );
            const width = image.naturalWidth * scale;
            const height = image.naturalHeight * scale;
            context.imageSmoothingQuality = "high";
            context.drawImage(
              image,
              (SILHOUETTE_SIZE - width) / 2,
              (SILHOUETTE_SIZE - height) / 2,
              width,
              height,
            );
            const frame = context.getImageData(
              0,
              0,
              SILHOUETTE_SIZE,
              SILHOUETTE_SIZE,
            );
            paintSilhouette(frame);
            context.putImageData(frame, 0, 0);
            return canvas.toDataURL("image/png");
          })
          .catch(() => null),
      );
    }
    return silhouettes.get(skin.id);
  }

  /* ---------- Panda kaardid (kollektsioon) ---------- */

  const cards = new Map();

  function buildCollection() {
    if (cards.size || !els.skinsGrid) return;

    const fragment = document.createDocumentFragment();
    SKINS.forEach((skin) => {
      const rarity = RARITY_BY_ID[skin.rarity];

      const card = document.createElement("button");
      card.type = "button";
      card.className = `skin-card rarity-${rarity.id}`;
      card.dataset.skinId = skin.id;
      card.dataset.silhouette = "pending";

      const chip = document.createElement("span");
      chip.className = "skin-chip";
      chip.textContent = rarity.label;

      const portrait = document.createElement("span");
      portrait.className = "skin-portrait";
      const image = document.createElement("img");
      image.className = "skin-img";
      image.src = skin.src;
      image.alt = "";
      image.decoding = "async";
      image.draggable = false;
      image.addEventListener("error", () => {
        image.replaceWith(createImageFallback());
      });
      portrait.append(image);

      const name = document.createElement("span");
      name.className = "skin-name";
      const stateLabel = document.createElement("span");
      stateLabel.className = "skin-state";

      card.append(chip, portrait, name, stateLabel);
      fragment.append(card);
      cards.set(skin.id, { card, image, name, stateLabel });
    });
    els.skinsGrid.replaceChildren(fragment);
  }

  function setSkinsStatus(message) {
    if (els.skinsStatus) els.skinsStatus.textContent = message;
  }

  function defaultSkinsStatus() {
    const active = SKIN_BY_ID.get(state.active);
    if (active) return `Aktiivne tegelane: ${active.name}`;
    return state.unlocked.length
      ? "Vali lahti lukustatud kaart, et see oma tegelaseks teha."
      : "Kõik kaardid on lukus. Lõpeta mäng ja ava kirst GAMBA! nupuga.";
  }

  function updateCollection() {
    if (!cards.size) return;
    const unlocked = new Set(state.unlocked);

    cards.forEach((ref, id) => {
      const skin = SKIN_BY_ID.get(id);
      const rarity = RARITY_BY_ID[skin.rarity];
      const isUnlocked = unlocked.has(id);
      const isActive = state.active === id;

      ref.card.classList.toggle("is-locked", !isUnlocked);
      ref.card.classList.toggle("is-unlocked", isUnlocked);
      ref.card.classList.toggle("is-active", isActive);
      ref.card.setAttribute("aria-disabled", String(!isUnlocked));
      if (isUnlocked) {
        ref.card.setAttribute("aria-pressed", String(isActive));
      } else {
        ref.card.removeAttribute("aria-pressed");
      }
      ref.card.setAttribute(
        "aria-label",
        isUnlocked
          ? `${skin.name}, ${rarity.label}${isActive ? ", aktiivne" : ""}`
          : `Lukustatud kaart, ${rarity.label}`,
      );
      ref.image.alt = isUnlocked ? skin.name : "";
      ref.name.textContent = isUnlocked ? skin.name : "???";
      ref.stateLabel.textContent = isActive
        ? "✓ AKTIIVNE"
        : isUnlocked
          ? "VALI"
          : "LUKUS";
    });

    if (els.skinsProgress) {
      els.skinsProgress.textContent = `Kogutud: ${unlocked.size} / ${SKINS.length}`;
    }
  }

  function applySilhouettes() {
    SKINS.forEach((skin) => {
      const ref = cards.get(skin.id);
      if (!ref || state.unlocked.includes(skin.id)) return;
      if (ref.card.dataset.silhouette !== "pending") return;

      getSilhouette(skin).then((url) => {
        if (url) {
          ref.card.style.setProperty("--silhouette", `url("${url}")`);
          ref.card.dataset.silhouette = "ready";
        } else {
          ref.card.dataset.silhouette = "failed";
        }
      });
    });
  }

  function openCollection() {
    if (!els.skinsModal) return;
    buildCollection();
    updateCollection();
    setSkinsStatus(defaultSkinsStatus());
    openModal(els.skinsModal, els.skinsModal.querySelector(".skins-close"));
    if (skinsScroll) skinsScroll.scrollTop = 0;
    applySilhouettes();
  }

  function closeCollection() {
    if (els.skinsModal && isOpen(els.skinsModal)) closeModal(els.skinsModal);
  }

  function onCardClick(event) {
    const card = event.target.closest(".skin-card");
    if (!card) return;
    const skin = SKIN_BY_ID.get(card.dataset.skinId);
    if (!skin) return;

    if (!state.unlocked.includes(skin.id)) {
      setSkinsStatus("🔒 Lukus: võida see kaart mängu lõpus GAMBA! kirstust.");
      card.classList.remove("is-denied");
      void card.offsetWidth;
      card.classList.add("is-denied");
      return;
    }

    setActiveSkin(skin.id);
    setSkinsStatus(defaultSkinsStatus());
  }

  /* ---------- GAMBA! kirst ja rulett ---------- */

  const prefersReducedMotion = () =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

  const nextFrame = () =>
    new Promise((resolve) => requestAnimationFrame(() => resolve()));

  function setGambaAvailable(available, { locked = false, hint = "" } = {}) {
    if (els.gambaBtn) {
      els.gambaBtn.hidden = !available;
      els.gambaBtn.disabled = Boolean(available && locked);
    }
    if (els.gambaHint) {
      els.gambaHint.textContent = available ? hint : "";
      els.gambaHint.hidden = !available || !hint;
    }
  }

  function renderRates() {
    if (!els.gachaRates) return;
    els.gachaRates.replaceChildren(
      ...RARITIES.map((rarity) => {
        const item = document.createElement("li");
        item.className = `rarity-${rarity.id}`;
        item.textContent = `${rarity.label} ${rarity.dropRate}%`;
        return item;
      }),
    );
  }

  // Rulli täidetakse samade tõenäosustega nagu loosimine, kuid iga haruldus
  // on rullis vähemalt korra näha.
  function buildReelSequence(winner) {
    const sequence = Array.from({ length: REEL_LENGTH }, () => rollSkin());
    const firstFreeSlot = REEL_WINNER_INDEX + 6;
    const lastFreeSlot = REEL_LENGTH - 12;
    const usedSlots = new Set();

    RARITIES.forEach((rarity) => {
      const present = sequence.some(
        (skin, index) =>
          index !== REEL_WINNER_INDEX && skin.rarity === rarity.id,
      );
      if (present) return;
      let slot;
      do {
        slot =
          firstFreeSlot +
          Math.floor(Math.random() * (lastFreeSlot - firstFreeSlot + 1));
      } while (usedSlots.has(slot));
      usedSlots.add(slot);
      sequence[slot] = pickSkin(rarity.id);
    });

    sequence[REEL_WINNER_INDEX] = winner;
    return sequence;
  }

  function renderReel(sequence) {
    const fragment = document.createDocumentFragment();
    sequence.forEach((skin) => {
      const item = document.createElement("div");
      item.className = `reel-item rarity-${skin.rarity}`;
      item.dataset.skinId = skin.id;
      const image = document.createElement("img");
      image.src = skin.src;
      image.alt = "";
      image.decoding = "async";
      image.draggable = false;
      image.addEventListener("error", () => {
        image.replaceWith(createImageFallback());
      });
      item.append(image);
      fragment.append(item);
    });
    els.reelStrip.replaceChildren(fragment);
  }

  function measureReel() {
    const [first, second] = els.reelStrip.children;
    return {
      step: second.offsetLeft - first.offsetLeft,
      itemWidth: first.offsetWidth,
      windowWidth: els.reelWindow.clientWidth,
    };
  }

  // translateX väärtus, mille juures valitud rulli element on markeri all.
  const reelOffset = (index, { step, itemWidth, windowWidth }) =>
    windowWidth / 2 - itemWidth / 2 - index * step;

  // Rulett liigub vasakult paremale: algab rulli lõpu poolt ja peatub võitja peal.
  async function spinReel() {
    const metrics = measureReel();
    const viewHalf = Math.ceil(metrics.windowWidth / 2 / metrics.step);
    const startIndex = REEL_LENGTH - 1 - (viewHalf + 2);
    const startX = reelOffset(startIndex, metrics);
    const endX = reelOffset(REEL_WINNER_INDEX, metrics);

    els.reelStrip.style.transform = `translateX(${startX}px)`;
    if (typeof els.reelStrip.animate === "function") {
      const duration = prefersReducedMotion()
        ? REDUCED_SPIN_DURATION
        : SPIN_DURATION;
      const animation = els.reelStrip.animate(
        [
          { transform: `translateX(${startX}px)` },
          { transform: `translateX(${endX}px)` },
        ],
        { duration, easing: SPIN_EASING, fill: "forwards" },
      );
      // Ajapiir tagab, et aken ei jää kunagi pooleli, kui animatsioon katkeb.
      await Promise.race([
        animation.finished.catch(() => {}),
        new Promise((resolve) => setTimeout(resolve, duration + SPIN_GRACE)),
      ]);
      animation.cancel();
    }
    els.reelStrip.style.transform = `translateX(${endX}px)`;
  }

  function alignReelToWinner() {
    if (state.gachaPhase !== "revealed" || !els.reelStrip.children.length) {
      return;
    }
    els.reelStrip.style.transform = `translateX(${reelOffset(
      REEL_WINNER_INDEX,
      measureReel(),
    )}px)`;
  }

  function resetGachaUi() {
    els.reelStrip.getAnimations?.().forEach((animation) => animation.cancel());
    els.reelStrip.replaceChildren();
    els.reelStrip.style.transform = "";
    els.reelWindow.classList.remove("is-finished");
    els.gachaChest.classList.remove("is-shaking", "is-opened");
    els.gachaFlash.classList.remove("is-flashing");
    els.gachaStatus.classList.remove("sr-only");
    els.gachaStatus.textContent = "";
    els.gachaResult.hidden = true;
    els.gachaActions.classList.add("is-pending");
    els.gachaCloseBtn.disabled = false;
    RARITIES.forEach((rarity) => {
      els.gachaModal.classList.remove(`rarity-${rarity.id}`);
    });
    state.gachaWinner = null;
  }

  function updateEquipButton() {
    const winner = state.gachaWinner;
    if (!winner || !els.gachaEquipBtn) return;
    const isActive = state.active === winner.id;
    els.gachaEquipBtn.disabled = isActive;
    els.gachaEquipBtn.textContent = isActive
      ? "✓ Aktiivne tegelane"
      : "Kasuta tegelasena";
  }

  function revealWinner(winner, isNew) {
    const rarity = RARITY_BY_ID[winner.rarity];
    state.gachaPhase = "revealed";
    state.gachaWinner = winner;
    alignReelToWinner();
    unlockSkin(winner.id);
    setGambaAvailable(false);

    els.reelStrip.children[REEL_WINNER_INDEX]?.classList.add("is-winner");
    els.reelWindow.classList.add("is-finished");
    els.gachaModal.classList.add(`rarity-${winner.rarity}`);
    els.gachaChest.classList.remove("is-shaking");
    els.gachaChest.classList.add("is-opened");
    els.gachaFlash.classList.remove("is-flashing");
    void els.gachaFlash.offsetWidth;
    els.gachaFlash.classList.add("is-flashing");

    els.gachaBanner.textContent = isNew
      ? "UUS KAART LAHTI LUKUSTATUD!"
      : "SEE KAART ON SUL JUBA OLEMAS!";
    els.gachaBanner.classList.toggle("is-new", isNew);
    els.gachaWonName.textContent = winner.name;
    els.gachaWonRarity.textContent = rarity.label;
    els.gachaResult.hidden = false;
    els.gachaActions.classList.remove("is-pending");

    // Ekraanilugeja saab teate olekurealt, nähtavalt näidatakse tulemuse plokki.
    els.gachaStatus.textContent = `${isNew ? "Uus kaart lahti lukustatud" : "Kaart on sul juba olemas"}: ${winner.name} (${rarity.label}).`;
    els.gachaStatus.classList.add("sr-only");

    els.gachaCloseBtn.disabled = false;
    updateEquipButton();
    els.gachaEquipBtn.focus({ preventScroll: true });
  }

  async function openGacha() {
    if (!els.gachaModal) return;
    if (state.gachaPhase === "loading" || state.gachaPhase === "spinning") {
      return;
    }

    state.gachaRun += 1;
    const runId = state.gachaRun;
    resetGachaUi();
    state.gachaPhase = "loading";
    els.gachaStatus.textContent = "Laen kirstu…";
    openModal(els.gachaModal, els.gachaCloseBtn);

    try {
      await Promise.race([
        preload(),
        new Promise((resolve) => setTimeout(resolve, PRELOAD_TIMEOUT)),
      ]);
      if (runId !== state.gachaRun) return;

      const winner = rollSkin();
      const isNew = !state.unlocked.includes(winner.id);
      renderReel(buildReelSequence(winner));
      state.gachaPhase = "spinning";
      els.gachaCloseBtn.disabled = true;
      els.gachaChest.classList.add("is-shaking");
      els.gachaStatus.textContent = "Kirst avaneb…";
      await nextFrame();

      await spinReel();
      if (runId !== state.gachaRun) return;
      revealWinner(winner, isNew);
    } catch (error) {
      if (runId !== state.gachaRun) return;
      state.gachaPhase = "idle";
      els.gachaCloseBtn.disabled = false;
      els.gachaChest.classList.remove("is-shaking");
      els.gachaStatus.textContent =
        "Kirstu avamine ebaõnnestus. Sulge aken ja proovi uuesti.";
    }
  }

  function closeGacha() {
    if (!els.gachaModal || !isOpen(els.gachaModal)) return;
    if (state.gachaPhase === "spinning") return;

    state.gachaRun += 1;
    state.gachaPhase = "idle";
    closeModal(els.gachaModal);
    resetGachaUi();
    // Kui avaja nupp on peidus (GAMBA! on kasutatud), liigub fookus tulemuse akna nupule.
    const active = document.activeElement;
    if (!active || active === document.body || els.gachaModal.contains(active)) {
      $("closeResultBtn")?.focus({ preventScroll: true });
    }
  }

  /* ---------- Ühine värskendus ja sündmused ---------- */

  // Uuel mängijal näidatakse algpandat; seda ei lukustata lahti.
  const DEFAULT_AVATAR = "Blue Cap Panda";

  function updateAvatar() {
    if (!els.pandaAvatarImg) return;
    const skin = SKIN_BY_ID.get(state.active) || SKIN_BY_ID.get(DEFAULT_AVATAR);
    els.pandaAvatarImg.src = skin.src;
    els.pandaAvatar.dataset.rarity = skin.rarity;
  }

  function refreshUi() {
    updateAvatar();
    updateCollection();
    setSkinsStatus(defaultSkinsStatus());
    updateEquipButton();
  }

  function bindEvents() {
    els.skinsBtn?.addEventListener("click", openCollection);
    els.skinsGrid?.addEventListener("click", onCardClick);
    els.skinsGrid?.addEventListener("animationend", (event) => {
      event.target.classList?.remove("is-denied");
    });
    els.skinsModal
      ?.querySelector(".skins-close")
      ?.addEventListener("click", closeCollection);
    els.skinsModal?.addEventListener("click", (event) => {
      if (event.target === els.skinsModal) closeCollection();
    });

    els.gambaBtn?.addEventListener("click", openGacha);
    els.gachaCloseBtn?.addEventListener("click", closeGacha);
    els.gachaDoneBtn?.addEventListener("click", closeGacha);
    els.gachaModal?.addEventListener("click", (event) => {
      if (event.target === els.gachaModal) closeGacha();
    });
    els.gachaEquipBtn?.addEventListener("click", () => {
      if (state.gachaWinner) setActiveSkin(state.gachaWinner.id);
    });
    els.gachaCollectionBtn?.addEventListener("click", openCollection);

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (els.skinsModal && isOpen(els.skinsModal)) {
        closeCollection();
      } else if (els.gachaModal && isOpen(els.gachaModal)) {
        closeGacha();
      }
    });
    window.addEventListener("resize", alignReelToWinner);
  }

  function init() {
    loadState();
    renderRates();
    updateAvatar();
    bindEvents();
    setGambaAvailable(false);
  }

  init();

  window.PandaCards = Object.freeze({
    skins: SKINS,
    rarities: RARITIES,
    storageKeys: STORAGE_KEYS,
    getUnlockedSkins: () => [...state.unlocked],
    getActiveSkin: () => state.active,
    getActiveSkinData: () => SKIN_BY_ID.get(state.active) || null,
    unlockSkin,
    setActiveSkin,
    rollSkin,
    openCollection,
    closeCollection,
    openGacha,
    setGambaAvailable,
    preload,
  });
})();
