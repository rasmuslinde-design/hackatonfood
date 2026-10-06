const STORAGE_KEY = "foodPyramidGameProgress";

const FOOD_ASSET_ROOT = "Food pyramid/Line";
const FOOD_IMAGES = {
  oats: "Cereal and bread/Porridge 1.png",
  egg: "Eggs and Dairy/Egg 1.png",
  banana: "Fruits/Banana.png",
  yogurt: "Eggs and Dairy/Yogurt 1.png",
  toast: "Cereal and bread/Black bread 1.png",
  juice: "Fast food/Energy drink.png",
  chicken: "Fish and meat/Chicken.png",
  salad: "Vegetables/Cabbage.png",
  rice: "Cereal and bread/Cereal.png",
  soda: "Fast food/Cola.png",
  beans: "Vegetables/Peas.png",
  apple: "Fruits/Apple.png",
  quinoa: "Cereal and bread/Cereal 1.png",
  fish: "Fish and meat/Fish fillet.png",
  cake: "Sweets/Cake.png",
  veg: "Vegetables/Broccoli.png",
  potato: "Vegetables/potato.png",
  nuts: "Cereal and bread/Cereal.png",
  cottage: "Eggs and Dairy/Cheese 1.png",
  granola: "Cereal and bread/Cereal 1.png",
  chocolate: "Sweets/Chocolate.png",
  berries: "Fruits/Blueberries.png",
  smoothie: "Fast food/Energy drink.png",
  proteinShake: "Eggs and Dairy/Milk 1.png",
};
function getFoodImage(item) {
  if (item.image) {
    return item.image.includes("/")
      ? `${FOOD_ASSET_ROOT}/${item.image}`
      : item.image;
  }
  const imagePath = FOOD_IMAGES[item.id];
  return imagePath ? `${FOOD_ASSET_ROOT}/${imagePath}` : "";
}

const LEVELS = [
  {
    id: 1,
    label: "Korrus 1",
    name: "Hommik & Eksam",
    objective:
      "Lisa kaussi tasakaalustatud hommikusöök – aeglane süsivesik + valk.",
    prompt:
      "Sul on pikk koolipäev ees, valmista endale sellele vastav toidukord.",
    requiredTags: ["slow-carb", "protein"],
    maxSugar: 2,
    items: [
      {
        id: "oats",
        name: "Kaerahelbed",
        icon: "🥣",
        tag: "Aeglane süsivesik",
        type: "slow-carb",
        sugar: 1,
        protein: 1,
        energy: 2,
        description: "Püsiv energia ja rahuldav mõju.",
      },
      {
        id: "egg",
        name: "Munad",
        icon: "🍳",
        tag: "Valgud",
        type: "protein",
        sugar: 0,
        protein: 3,
        energy: 2,
        description: "Kvaliteetne valguallikas ja küllastav.",
      },
      {
        id: "banana",
        name: "Banaan",
        icon: "🍌",
        tag: "Kiire suhkur",
        type: "sugar",
        sugar: 3,
        protein: 0,
        energy: 2,
        description: "Kiire energia, kuid liiga magus üksinda.",
      },
      {
        id: "yogurt",
        name: "Jogurt",
        icon: "🥛",
        tag: "Valgud",
        type: "protein",
        sugar: 1,
        protein: 2,
        energy: 1,
        description: "Tasakaalustatud ja kerge valik.",
      },
      {
        id: "toast",
        name: "Röstsai",
        icon: "🍞",
        tag: "Aeglane süsivesik",
        type: "slow-carb",
        sugar: 1,
        protein: 1,
        energy: 2,
        description: "Mõõdukas ja stabiilne valik.",
      },
      {
        id: "juice",
        name: "Mahla",
        icon: "🧃",
        tag: "Kiire suhkur",
        type: "sugar",
        sugar: 4,
        protein: 0,
        energy: 2,
        description: "Magus ja kiiresti imenduv.",
      },
    ],
  },
  {
    id: 2,
    label: "Korrus 2",
    name: "Taldrikureegel",
    objective:
      "Lõunalaual peaks olema valk, taimsed osad ja mõõdukas süsivesik.",
    prompt: "Lõunatund on käes ja sa vajad energiat, et jaksada edasi liikuda.",
    requiredTags: ["protein", "veg"],
    maxSugar: 2,
    items: [
      {
        id: "chicken",
        name: "Kana",
        icon: "🍗",
        tag: "Valgud",
        type: "protein",
        sugar: 0,
        protein: 4,
        energy: 3,
        description: "Hea valguallikas.",
      },
      {
        id: "salad",
        name: "Salat",
        icon: "🥗",
        tag: "Taimne",
        type: "veg",
        sugar: 0,
        protein: 1,
        energy: 1,
        description: "Kiudained ja vitamiinid.",
      },
      {
        id: "rice",
        name: "Riis",
        icon: "🍚",
        tag: "Aeglane süsivesik",
        type: "slow-carb",
        sugar: 1,
        protein: 1,
        energy: 2,
        description: "Püsiv ja tasakaalustatud energia.",
      },
      {
        id: "soda",
        name: "Limonaad",
        icon: "🥤",
        tag: "Kiire suhkur",
        type: "sugar",
        sugar: 5,
        protein: 0,
        energy: 2,
        description: "Kõrge suhkrusisaldus ja kiire langus.",
      },
      {
        id: "beans",
        name: "Ube",
        icon: "🫘",
        tag: "Valgud",
        type: "protein",
        sugar: 1,
        protein: 3,
        energy: 2,
        description: "Rahuldav ja väga kasulik valguallikas.",
      },
      {
        id: "apple",
        name: "Õun",
        icon: "🍏",
        tag: "Taimne",
        type: "veg",
        sugar: 2,
        protein: 0,
        energy: 1,
        description: "Mõõdukas magusus ja kiudained.",
      },
    ],
  },
  {
    id: 3,
    label: "Korrus 3",
    name: "Trennijärgne",
    objective: "Pärast trenni tuleb kiire taastumine ja valgu toetus.",
    prompt: "Treening on läbi, nüüd tuleb keha taasenergiseerida ja taastada.",
    requiredTags: ["protein", "slow-carb"],
    maxSugar: 1,
    items: [
      {
        id: "quinoa",
        name: "Kinoa",
        icon: "🌾",
        tag: "Aeglane süsivesik",
        type: "slow-carb",
        sugar: 1,
        protein: 2,
        energy: 2,
        description: "Sobib taastumiseks ja kestvaks energiaks.",
      },
      {
        id: "fish",
        name: "Kala",
        icon: "🐟",
        tag: "Valgud",
        type: "protein",
        sugar: 0,
        protein: 4,
        energy: 3,
        description: "Kvaliteetne valk ja rasvhapped.",
      },
      {
        id: "cake",
        name: "Kook",
        icon: "🍰",
        tag: "Kiire suhkur",
        type: "sugar",
        sugar: 5,
        protein: 0,
        energy: 3,
        description: "Maitsev, kuid liiga magus.",
      },
      {
        id: "veg",
        name: "Köögivili",
        icon: "🥦",
        tag: "Taimne",
        type: "veg",
        sugar: 1,
        protein: 1,
        energy: 1,
        description: "Tervislik ja vähekaloriline.",
      },
      {
        id: "potato",
        name: "Kartul",
        icon: "🥔",
        tag: "Aeglane süsivesik",
        type: "slow-carb",
        sugar: 1,
        protein: 1,
        energy: 2,
        description: "Rahuldav ja stabiilne valik.",
      },
      {
        id: "nuts",
        name: "Pähklid",
        icon: "🥜",
        tag: "Valgud",
        type: "protein",
        sugar: 0,
        protein: 3,
        energy: 2,
        description: "Tervislikud rasvad ja valk.",
      },
    ],
  },
  {
    id: 4,
    label: "Korrus 4",
    name: "Maiustused",
    objective: "Lõpptase: vähe maiustusi ja rohkem tasakaalu.",
    prompt:
      "Nüüd on aeg valida üks mõistlik ja hästi tasakaalustatud lõpptulemus.",
    requiredTags: ["protein"],
    maxSugar: 1,
    items: [
      {
        id: "cottage",
        name: "Kodujuust",
        icon: "🥛",
        tag: "Valgud",
        type: "protein",
        sugar: 1,
        protein: 3,
        energy: 2,
        description: "Valgud ja madal suhkrusisaldus.",
      },
      {
        id: "granola",
        name: "Granola",
        icon: "🥣",
        tag: "Aeglane süsivesik",
        type: "slow-carb",
        sugar: 2,
        protein: 1,
        energy: 2,
        description: "Kestvamad energiavarud.",
      },
      {
        id: "chocolate",
        name: "Šokolaad",
        icon: "🍫",
        tag: "Kiire suhkur",
        type: "sugar",
        sugar: 5,
        protein: 0,
        energy: 3,
        description: "Maitsev, kuid üli magus.",
      },
      {
        id: "berries",
        name: "Marjad",
        icon: "🫐",
        tag: "Taimne",
        type: "veg",
        sugar: 1,
        protein: 0,
        energy: 1,
        description: "Hea vitamiinide ja kiudainete allikas.",
      },
      {
        id: "smoothie",
        name: "Smuuti",
        icon: "🍹",
        tag: "Kiire suhkur",
        type: "sugar",
        sugar: 4,
        protein: 0,
        energy: 2,
        description: "Kiire energia, kuid ei ole tasakaalustatud.",
      },
      {
        id: "proteinShake",
        name: "Proteiinijook",
        icon: "🥤",
        tag: "Valgud",
        type: "protein",
        sugar: 0,
        protein: 4,
        energy: 2,
        description: "Hea valgu taastamine.",
      },
    ],
  },
];

function shuffleItems(items) {
  return items
    .map((item) => ({ item, sort: Math.random() }))
    .sort((left, right) => left.sort - right.sort)
    .map(({ item }) => item);
}

const VALID_FOOD_FLAVORS = new Set(["savory", "sweet", "neutral"]);
const VALID_FOOD_TYPES = new Set(["carb", "protein", "produce", "junk"]);
const LEGACY_FOOD_TYPES = {
  "slow-carb": "carb",
  veg: "produce",
  sugar: "junk",
};

function normalizeFoodType(type) {
  if (VALID_FOOD_TYPES.has(type)) return type;
  return Object.prototype.hasOwnProperty.call(LEGACY_FOOD_TYPES, type)
    ? LEGACY_FOOD_TYPES[type]
    : "junk";
}

function isFoodAvailableForLevel(item, levelId) {
  const mealTypes = Array.isArray(item.mealType) ? item.mealType : ["any"];
  const name = String(item.name || "").toLowerCase();
  const image = String(item.image || "").toLowerCase();
  const breakfastOnly =
    /kaerahelbepuder|hommikusöögihelbed/.test(name) ||
    /(?:^|\/)(?:porridge|cereal)(?:\s+\d+)?\.png$/.test(image);

  if (levelId !== 1 && breakfastOnly) return false;
  if (mealTypes.includes("any")) return true;
  if (levelId === 1) return mealTypes.includes("breakfast");
  if (levelId === 2) {
    return mealTypes.some((type) =>
      ["main_meal", "lunch", "dinner"].includes(type),
    );
  }
  if (levelId === 3) {
    return mealTypes.some((type) =>
      ["main_meal", "dinner", "post-workout"].includes(type),
    );
  }
  return true;
}

function generateLevelFoods(levelId = null) {
  const database = window.FOOD_DATABASE || {};

  const normalizeItems = (items, sourceLevelId) =>
    items
      .map((sourceItem, index) => {
        const item =
          sourceItem && typeof sourceItem === "object" ? sourceItem : {};
        const points = Number(item.points);
        return {
          ...item,
          id: item.id || `level-${sourceLevelId}-food-${index}`,
          name:
            typeof item.name === "string" && item.name.trim()
              ? item.name
              : `Toiduaine ${index + 1}`,
          flavor: VALID_FOOD_FLAVORS.has(item.flavor)
            ? item.flavor
            : "neutral",
          type: normalizeFoodType(item.type),
          points: Number.isFinite(points) ? points : 0,
        };
      })
      .filter((item) => item.selectable !== false);
  const allHealthyFallbackItems = Object.entries(database).flatMap(
    ([sourceLevelId, items]) =>
      Array.isArray(items)
        ? normalizeItems(items, sourceLevelId)
            .filter((item) => item.type !== "junk" && item.healthy === true)
            .map((item) => ({
              ...item,
              id: `fallback-${sourceLevelId}-${item.id}`,
            }))
        : [],
  );

  LEVELS.forEach((level) => {
    if (levelId !== null && level.id !== Number(levelId)) return;
    const databaseItems = database[level.id];
    const sourceItems =
      Array.isArray(databaseItems) && databaseItems.length
        ? databaseItems
        : Array.isArray(level.items)
          ? level.items
          : [];
    const normalizedItems = normalizeItems(sourceItems, level.id).filter(
      (item) => isFoodAvailableForLevel(item, level.id),
    );
    const healthyFallbackItems = allHealthyFallbackItems.filter((item) =>
      isFoodAvailableForLevel(item, level.id),
    );
    const targetCounts =
      level.id === 1
        ? { carb: 3, protein: 2, produce: 2, junk: 1 }
        : level.id === 2 || level.id === 3
          ? { carb: 3, protein: 3, produce: 1, junk: 1 }
          : { carb: 2, protein: 2, produce: 2, junk: 1 };
    const selected = [];
    const selectedIds = new Set();
    const selectedNames = new Set();
    const flavorCount = (flavor) =>
      selected.filter((item) => item.flavor === flavor).length;
    const groupCount = (type) =>
      selected.filter((item) => item.type === type).length;
    const addRandomItem = (candidates) => {
      const available = shuffleItems(candidates).filter(
        (item) =>
          !selectedIds.has(item.id) &&
          !selectedNames.has(item.name.toLowerCase()),
      );
      if (!available.length || selected.length >= 8) return false;

      const nonNeutral = available.filter(
        (item) => item.flavor === "savory" || item.flavor === "sweet",
      );
      const underFlavorTarget = nonNeutral.filter(
        (item) => flavorCount(item.flavor) < 3,
      );
      const neutral = available.filter((item) => item.flavor === "neutral");
      const balancedCandidates = underFlavorTarget.length
        ? underFlavorTarget.filter(
            (item) =>
              flavorCount(item.flavor) ===
              Math.min(...underFlavorTarget.map((food) => flavorCount(food.flavor))),
          )
        : neutral.length && flavorCount("neutral") < 2
          ? neutral
          : available;
      const item = shuffleItems(balancedCandidates)[0];
      selected.push(item);
      selectedIds.add(item.id);
      selectedNames.add(item.name.toLowerCase());
      return true;
    };

    const addFromType = (type) => {
      if (groupCount(type) >= 3) return false;
      if (addRandomItem(normalizedItems.filter((item) => item.type === type))) {
        return true;
      }
      return (
        type !== "junk" &&
        addRandomItem(
          healthyFallbackItems.filter((item) => item.type === type),
        )
      );
    };

    Object.entries(targetCounts).forEach(([type, target]) => {
      while (groupCount(type) < target && selected.length < 8) {
        if (!addFromType(type)) break;
      }
    });

    const weightedTypes =
      level.id === 2 || level.id === 3
        ? ["carb", "protein", "carb", "protein", "produce"]
        : ["carb", "protein", "produce"];
    while (selected.length < 8) {
      if (!weightedTypes.some((type) => addFromType(type))) break;
    }

    level.items = shuffleItems(selected).map((item) => ({
      ...item,
      icon: "",
      sugar: item.points < 0 ? Math.abs(item.points) / 3 : 0,
      protein: item.healthy === true ? 3 : 0,
      energy: Math.max(1, Math.round((item.points + 15) / 6)),
      tag: item.tag || "",
      description: item.tag || item.description || "",
    }));
  });
}

generateLevelFoods();

function assignRescuedFoods(levelId = null) {
  LEVELS.forEach((level) => {
    if (levelId !== null && level.id !== Number(levelId)) return;
    const eligibleItems = level.items.filter((item) => item.type !== "junk");
    const rescueCount = eligibleItems.length
      ? Math.min(eligibleItems.length, 1 + Math.floor(Math.random() * 2))
      : 0;
    const rescuedIds = new Set(
      shuffleItems(eligibleItems)
        .slice(0, rescueCount)
        .map((item) => item.id),
    );
    level.items = level.items.map((item) => ({
      ...item,
      isRescued: rescuedIds.has(item.id),
    }));
  });
}

assignRescuedFoods();

const state = {
  selectedLevel: 1,
  unlockedLevel: 1,
  currentLevel: 1,
  highScore: 0,
  bowlItems: [],
  dragState: null,
  lastResultPassed: false,
  levelScores: [],
  levelResults: [],
  ingredientPage: 0,
};

const elements = {
  homeView: document.getElementById("homeView"),
  gameView: document.getElementById("gameView"),
  pyramid: document.getElementById("pyramid"),
  startGameBtn: document.getElementById("startGameBtn"),
  highScoreValue: document.getElementById("highScoreValue"),
  currentLevelLabel: document.getElementById("currentLevelLabel"),
  objectiveText: document.getElementById("objectiveText"),
  ingredientShelf: document.getElementById("ingredientShelf"),
  bowl: document.getElementById("bowl"),
  bowlItems: document.getElementById("bowlItems"),
  toast: document.getElementById("toast"),
  levelPromptInline: document.getElementById("levelPromptInline"),
  confirmHomeModal: document.getElementById("confirmHomeModal"),
  creditsModal: document.getElementById("creditsModal"),
  hintModal: document.getElementById("hintModal"),
  hintText: document.getElementById("hintText"),
  infoModal: document.getElementById("infoModal"),
  infoTitle: document.getElementById("infoTitle"),
  infoContent: document.getElementById("infoContent"),
  resultModal: document.getElementById("resultModal"),
  resultTitle: document.getElementById("resultTitle"),
  resultText: document.getElementById("resultText"),
};

function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    state.unlockedLevel = 1;
    state.selectedLevel = 1;
    state.highScore = 0;
    return;
  }

  try {
    const data = JSON.parse(raw);
    state.unlockedLevel = Math.min(
      Number(data.unlockedLevel) || 1,
      LEVELS.length,
    );
    state.selectedLevel = Math.min(
      Number(data.selectedLevel) || 1,
      state.unlockedLevel,
    );
    state.highScore = Number(data.highScore) || 0;
  } catch (error) {
    state.unlockedLevel = 1;
    state.selectedLevel = 1;
    state.highScore = 0;
  }
}

function saveProgress() {
  const payload = {
    unlockedLevel: state.unlockedLevel,
    selectedLevel: state.selectedLevel,
    highScore: state.highScore,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 2200);
}

function updateHighScoreDisplay() {
  elements.highScoreValue.textContent = String(state.highScore);
}

function toggleHighScoreVisibility(show) {
  const scoreBox = document.querySelector(".score-box");
  if (!scoreBox) return;
  scoreBox.classList.toggle("hidden", !show);
}

function switchView(viewName) {
  const isHome = viewName === "home";
  elements.homeView.classList.toggle("hidden", !isHome);
  elements.gameView.classList.toggle("hidden", isHome);
  window.homePyramid3D?.setActive(isHome);
  window.dispatchEvent(
    new CustomEvent("home-pyramid-visibility", {
      detail: { active: isHome },
    }),
  );
}

function getLevelById(levelId) {
  return LEVELS.find((level) => level.id === Number(levelId)) || LEVELS[0];
}

function updateStartButtonState() {
  const unlocked = state.selectedLevel <= state.unlockedLevel;
  elements.startGameBtn.disabled = !unlocked;
}

function renderHomePyramid() {
  elements.pyramid.innerHTML = "";

  LEVELS.slice()
    .reverse()
    .forEach((level) => {
      const isUnlocked = level.id <= state.unlockedLevel;
      const isSelected = level.id === state.selectedLevel;
      const names = {
        1: "Teraviljad",
        2: "Köögiviljad ja puuviljad",
        3: "Valgud ja piimatooted",
        4: "Maiustused ja rasvad",
      };

      const button = document.createElement("button");
      button.type = "button";
      button.className = `pyramid-level-button ${isSelected ? "selected" : ""} ${!isUnlocked ? "locked" : ""}`;
      button.dataset.level = String(level.id);
      button.textContent = `${level.label} · ${names[level.id]}`;
      button.setAttribute("aria-disabled", String(!isUnlocked));
      button.setAttribute("aria-pressed", String(isSelected));
      if (!isUnlocked) {
        button.title = "See tase on veel lukus.";
      }

      button.addEventListener("click", () => {
        selectHomeLevel(level.id);
      });

      button.addEventListener("mouseenter", () => {
        window.dispatchEvent(
          new CustomEvent("home-pyramid-hover", {
            detail: { level: level.id },
          }),
        );
      });
      button.addEventListener("mouseleave", () => {
        window.dispatchEvent(
          new CustomEvent("home-pyramid-hover", { detail: { level: null } }),
        );
      });

      elements.pyramid.appendChild(button);
    });

  updateStartButtonState();
  window.homePyramid3D?.setState({
    selectedLevel: state.selectedLevel,
    unlockedLevel: state.unlockedLevel,
  });
  window.dispatchEvent(
    new CustomEvent("home-pyramid-state", {
      detail: {
        selectedLevel: state.selectedLevel,
        unlockedLevel: state.unlockedLevel,
      },
    }),
  );
}

function selectHomeLevel(levelId) {
  const level = getLevelById(levelId);
  if (level.id > state.unlockedLevel) {
    showToast("See tase on veel lukus.");
    return;
  }

  state.selectedLevel = level.id;
  renderHomePyramid();
}

function startGame() {
  if (state.selectedLevel > state.unlockedLevel) {
    showToast("Vali avatud tase.");
    return;
  }

  if (state.selectedLevel === 1) {
    state.levelResults = [];
  }
  generateLevelFoods(state.selectedLevel);
  assignRescuedFoods(state.selectedLevel);
  state.currentLevel = state.selectedLevel;
  state.bowlItems = [];
  renderGameLevel();
  switchView("game");
  requestAnimationFrame(updateIngredientNavigation);
}

function renderGameLevel(resetIngredients = true) {
  const level = getLevelById(state.currentLevel);
  elements.currentLevelLabel.textContent = level.label;
  elements.objectiveText.textContent = level.objective;
  elements.levelPromptInline.textContent = level.prompt || level.objective;
  document.getElementById("submitMealBtn").textContent = "Sega & Söö";

  elements.ingredientShelf.innerHTML = "";
  elements.ingredientShelf.scrollLeft = 0;
  if (resetIngredients) {
    state.ingredientPage = 0;
  }
  document.getElementById("prevIngredientsBtn").classList.remove("is-visible");
  document.getElementById("nextIngredientsBtn").classList.remove("is-visible");
  const pageStart = state.ingredientPage * 4;
  const visibleItems = level.items.slice(pageStart, pageStart + 4);
  for (let rowIndex = 0; rowIndex < visibleItems.length; rowIndex += 2) {
    const row = document.createElement("div");
    row.className = "food-row";
    row.setAttribute("role", "group");
    row.setAttribute("aria-label", `Toiduainete rida ${rowIndex / 2 + 1}`);

    visibleItems.slice(rowIndex, rowIndex + 2).forEach((item) => {
      const card = document.createElement("div");
      card.className = "ingredient-card food-card";
      card.dataset.itemId = item.id;
      card.setAttribute("aria-label", `${item.name} toiduaine${item.isRescued ? ", päästetud toit" : ""}`);
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");

      const infoButton = document.createElement("button");
      infoButton.type = "button";
      infoButton.className = "info-btn";
      infoButton.textContent = "i";
      infoButton.setAttribute("aria-label", `Info ${item.name}`);
      infoButton.addEventListener("click", (event) => {
        event.stopPropagation();
        openInfoModal(item);
      });

      card.innerHTML = `
        <div class="card-icon" aria-hidden="true">
          <img class="food-image" src="${getFoodImage(item)}" alt="" />
        </div>
        <div class="card-meta">
          <span class="card-name">${item.name}</span>
          <span class="card-tag">${item.tag}</span>
        </div>
      `;

      if (item.isRescued) {
        const rescuedBadge = document.createElement("span");
        rescuedBadge.className = "rescued-food-badge";
        rescuedBadge.textContent = "♻️ Päästetud toit!";
        rescuedBadge.title =
          "Päästetud toit! Selle ära söömine hoiab ära toiduraiskamise ja annab lisapunkte.";
        rescuedBadge.setAttribute("aria-label", rescuedBadge.title);
        card.appendChild(rescuedBadge);
      }
      card.appendChild(infoButton);
      card.appendChild(infoButton);
      card.addEventListener("keydown", (event) => {
        if (event.target !== card || !["Enter", " "].includes(event.key)) {
          return;
        }
        event.preventDefault();
        addItemToBowl(item.id);
      });
      card.addEventListener("pointerdown", (event) =>
        beginDrag(event, item.id),
      );
      row.appendChild(card);
    });

    elements.ingredientShelf.appendChild(row);
  }

  updateIngredientNavigation();
  renderBowlItems();
}

function updateIngredientNavigation() {
  const shelf = elements.ingredientShelf;
  const previousButton = document.getElementById("prevIngredientsBtn");
  const nextButton = document.getElementById("nextIngredientsBtn");
  if (!shelf || !previousButton || !nextButton) return;
  if (!shelf.clientWidth) {
    previousButton.classList.remove("is-visible");
    nextButton.classList.remove("is-visible");
    previousButton.disabled = true;
    nextButton.disabled = true;
    return;
  }

  const level = getLevelById(state.currentLevel);
  const pageCount = Math.max(0, Math.ceil(level.items.length / 4) - 1);
  state.ingredientPage = Math.max(
    0,
    Math.min(state.ingredientPage, pageCount),
  );
  const canScrollLeft = state.ingredientPage > 0;
  const canScrollRight = state.ingredientPage < pageCount;
  previousButton.classList.toggle("is-visible", canScrollLeft);
  nextButton.classList.toggle("is-visible", canScrollRight);
  previousButton.disabled = !canScrollLeft;
  nextButton.disabled = !canScrollRight;
  previousButton.setAttribute("aria-hidden", String(!canScrollLeft));
  nextButton.setAttribute("aria-hidden", String(!canScrollRight));
}

function changeIngredientPage(direction) {
  const level = getLevelById(state.currentLevel);
  const lastPage = Math.max(0, Math.ceil(level.items.length / 4) - 1);
  state.ingredientPage = Math.max(
    0,
    Math.min(state.ingredientPage + direction, lastPage),
  );
  renderGameLevel(false);
}

function beginDrag(event, itemId) {
  if (event.target.closest(".info-btn")) return;
  if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) {
    return;
  }

  cleanupDragState();
  event.preventDefault();
  state.dragState = {
    itemId,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    active: false,
    card: event.currentTarget,
    ghost: null,
  };
  document.addEventListener("pointermove", moveDrag);
  document.addEventListener("pointerup", finishDrag);
  document.addEventListener("pointercancel", cancelDrag);
}

function moveDrag(event) {
  const drag = state.dragState;
  if (!drag || event.pointerId !== drag.pointerId) return;

  if (
    !drag.active &&
    Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < 8
  ) {
    return;
  }

  if (!drag.active) {
    drag.active = true;
    drag.card.classList.add("is-dragging");
    const item = getLevelById(state.currentLevel).items.find(
      (entry) => entry.id === drag.itemId,
    );
    if (item) {
      drag.ghost = document.createElement("div");
      drag.ghost.className = "drag-ghost";
      drag.ghost.innerHTML = `
        <img class="drag-food-image" src="${getFoodImage(item)}" alt="" aria-hidden="true" />
      `;
      document.body.appendChild(drag.ghost);
    }
  }

  if (drag.ghost) {
    drag.ghost.style.left = `${event.clientX}px`;
    drag.ghost.style.top = `${event.clientY}px`;
  }

  const bowl = elements.bowl.getBoundingClientRect();
  const overBowl =
    event.clientX >= bowl.left &&
    event.clientX <= bowl.right &&
    event.clientY >= bowl.top &&
    event.clientY <= bowl.bottom;
  elements.bowl.classList.toggle("is-drop-target", overBowl);
  event.preventDefault();
}

function finishDrag(event) {
  const drag = state.dragState;
  if (!drag || event.pointerId !== drag.pointerId) return;

  const bowl = elements.bowl.getBoundingClientRect();
  const droppedOnBowl =
    drag.active &&
    event.clientX >= bowl.left &&
    event.clientX <= bowl.right &&
    event.clientY >= bowl.top &&
    event.clientY <= bowl.bottom;
  const itemId = drag.itemId;
  cleanupDragState();
  if (droppedOnBowl) addItemToBowl(itemId);
}

function cancelDrag(event) {
  if (state.dragState?.pointerId === event.pointerId) {
    cleanupDragState();
  }
}

function cleanupDragState() {
  const drag = state.dragState;
  if (!drag) return;

  document.removeEventListener("pointermove", moveDrag);
  document.removeEventListener("pointerup", finishDrag);
  document.removeEventListener("pointercancel", cancelDrag);
  drag.card.classList.remove("is-dragging");
  drag.ghost?.remove();
  elements.bowl.classList.remove("is-drop-target");
  state.dragState = null;
}

function addItemToBowl(itemId) {
  const item = getLevelById(state.currentLevel).items.find(
    (entry) => entry.id === itemId,
  );
  if (!item) return;
  if (state.bowlItems.includes(itemId)) {
    showToast("See toiduaine on juba kausis.");
    return;
  }
  if (state.bowlItems.length >= 3) {
    showToast("Kaussi mahub korraga kuni 3 toiduainet.");
    return;
  }

  state.bowlItems.push(itemId);
  renderBowlItems();
}

function removeItemFromBowl(itemId) {
  state.bowlItems = state.bowlItems.filter((id) => id !== itemId);
  renderBowlItems();
}

function renderBowlItems() {
  elements.bowlItems.innerHTML = "";

  if (state.bowlItems.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Lisa toiduaine";
    elements.bowlItems.appendChild(empty);
    return;
  }

  const level = getLevelById(state.currentLevel);
  state.bowlItems.forEach((itemId) => {
    const item = level.items.find((entry) => entry.id === itemId);
    if (!item) return;

    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "bowl-item";
    pill.setAttribute("aria-label", `Eemalda ${item.name} kausist`);
    pill.innerHTML = `
      <img class="bowl-food-image" src="${getFoodImage(item)}" alt="" />
      <span>${item.name}</span>
      <span aria-hidden="true">×</span>
    `;
    pill.addEventListener("click", () => removeItemFromBowl(itemId));
    elements.bowlItems.appendChild(pill);
  });
}

function evaluateMeal() {
  const level = getLevelById(state.currentLevel);
  if (state.bowlItems.length === 0) {
    showToast("Lisa enne valmistamist vähemalt üks toiduaine.");
    return;
  }

  const selectedItems = level.items.filter((item) =>
    state.bowlItems.includes(item.id),
  );
  if (selectedItems.length === 0) {
    showToast("See valik ei sobi.");
    return;
  }

  const totals = selectedItems.reduce(
    (acc, item) => {
      acc.sugar += item.sugar || 0;
      acc.protein += item.protein || 0;
      acc.energy += item.energy || 0;
      acc.slowCarb += item.type === "slow-carb" ? 1 : 0;
      acc.veg += item.type === "veg" ? 1 : 0;
      acc.proteinItems += item.type === "protein" ? 1 : 0;
      return acc;
    },
    { sugar: 0, protein: 0, energy: 0, slowCarb: 0, veg: 0, proteinItems: 0 },
  );

  const hasRequiredTags = level.requiredTags.every((tag) => {
    if (tag === "protein") return totals.proteinItems > 0 || totals.protein > 0;
    if (tag === "slow-carb") return totals.slowCarb > 0;
    if (tag === "veg") return totals.veg > 0;
    return true;
  });

  const passed = hasRequiredTags && totals.sugar <= level.maxSugar;
  const score = Math.max(
    50,
    Math.round(
      totals.protein * 18 +
        totals.slowCarb * 22 +
        totals.veg * 10 +
        (level.maxSugar - totals.sugar) * 18 +
        totals.energy * 9,
    ),
  );

  if (passed) {
    state.lastResultPassed = true;
    state.levelScores[state.currentLevel - 1] = score;
    state.highScore = Math.max(state.highScore, score);
    state.unlockedLevel = Math.min(
      Math.max(state.unlockedLevel, state.currentLevel + 1),
      LEVELS.length,
    );
    state.selectedLevel = Math.min(state.currentLevel + 1, state.unlockedLevel);
    saveProgress();
    updateHighScoreDisplay();
    renderHomePyramid();

    if (state.currentLevel >= LEVELS.length) {
      const finalSummary = buildFinalSummary();
      toggleHighScoreVisibility(true);
      elements.resultTitle.textContent = "Mäng läbi!";
      elements.resultText.innerHTML = finalSummary;
      document.getElementById("closeResultBtn").textContent =
        "Tagasi avalehele";
    } else {
      elements.resultTitle.textContent = "Tasakaalustatud valik!";
      elements.resultText.innerHTML = `Sinu skoor: <strong>${score}</strong>. Tase ${state.currentLevel} on läbitud. Järgmine samm: lisa järgmises tasemes rohkem <strong>valku</strong> ja hoia <strong>suhkrud</strong> alla.<br><br>Vihje: proovi tasakaalustada näiteks <strong>aeglane süsivesik + valk</strong> ja väheima magususega toidud.`;
      document.getElementById("closeResultBtn").textContent =
        `Ava Korrus ${state.selectedLevel}`;
    }

    elements.resultModal.classList.remove("hidden");
    return;
  }

  state.lastResultPassed = true;
  state.levelScores[state.currentLevel - 1] = score;
  state.highScore = Math.max(state.highScore, score);
  state.unlockedLevel = Math.min(
    Math.max(state.unlockedLevel, state.currentLevel + 1),
    LEVELS.length,
  );
  state.selectedLevel = Math.min(state.currentLevel + 1, state.unlockedLevel);
  saveProgress();
  updateHighScoreDisplay();

  if (state.currentLevel >= LEVELS.length) {
    toggleHighScoreVisibility(true);
    elements.resultTitle.textContent = "Mäng läbi!";
    elements.resultText.innerHTML = `${buildFinalSummary()}<br><br><strong>Tagasiside:</strong> see valik ei täitnud veel kõiki selle taseme eesmärke. Edaspidi vali kindlasti ${level.requiredTags.map((tag) => `<strong>${tag === "slow-carb" ? "aeglane süsivesik" : tag === "protein" ? "valguallikas" : "taimne toit"}</strong>`).join(" ja ")} ning hoia suhkrud alla ${level.maxSugar} ühiku.`;
    document.getElementById("closeResultBtn").textContent = "Tagasi avalehele";
  } else {
    elements.resultTitle.textContent = "Tase lõpetatud – vaata tagasisidet";
    elements.resultText.innerHTML = `Sinu skoor: <strong>${score}</strong>.<br><br>Sa saad edasi liikuda, kuid järgmises tasemes proovi paremini:<br>• lisa ${level.requiredTags.map((tag) => `<strong>${tag === "slow-carb" ? "aeglane süsivesik" : tag === "protein" ? "valguallikas" : "taimne toit"}</strong>`).join(" ja ")}<br>• hoia suhkrud alla <strong>${level.maxSugar}</strong> ühiku.`;
    document.getElementById("closeResultBtn").textContent =
      `Ava Korrus ${state.selectedLevel}`;
  }
  elements.resultModal.classList.remove("hidden");
}

function getMealGrade(score) {
  if (score >= 90) return "A";
  if (score >= 50) return "B";
  return "C";
}

function getMealFeedback(grade) {
  if (grade === "A") return "Tegelane on täis energiat, laud on puhas!";
  if (grade === "B") return "Kõht on täis, aga energia kõigub!";
  return "Tegelane väsis kiiresti!";
}

function getFoodWasteTip(levelId) {
  const tips = {
    1: "Kaval viis: kasuta eelmise päeva leiba krutoonides või röstsaias, et toit ei läheks raisku.",
    2: "Kaval viis: kasuta küpseid puuvilju smuutis, et vältida nende prügikasti viskamist!",
    3: "Kaval viis: kasuta üle jäänud muna, kala või juustu järgmise toidukorra omletis või salatis.",
    4: "Kaval viis: jaga maiustused portsjoniteks ja hoia ülejäänu hilisemaks suupisteks.",
  };
  return tips[levelId] || tips[1];
}

function getFoodScore(item) {
  const points = Number(item.points || 0);
  if (!item.isRescued) return points;
  return (points < 0 ? Math.abs(points) : points) + 10;
}

function selectedFoodMarkup(items) {
  return items
    .map(
      (item) => `
        <div class="feedback-food">
          <img src="${getFoodImage(item)}" alt="" />
          <div>
            <strong>${item.name}</strong>
            <span>${item.tag}</span>
            <span class="feedback-impact ${getFoodScore(item) >= 0 ? "positive" : "negative"}">${getFoodScore(item) > 0 ? "+" : ""}${getFoodScore(item)} mõju</span>
            ${item.isRescued ? '<span class="rescued-food-badge" title="Päästetud toit! Selle ära söömine hoiab ära toiduraiskamise ja annab lisapunkte.">♻️ Päästetud toit!</span>' : ""}
          </div>
        </div>`,
    )
    .join("");
}

function buildNewFinalSummary() {
  const results = state.levelResults.filter(Boolean);
  const totalScore = results.reduce((sum, result) => sum + result.score, 0);
  const maximumScore = Math.max(
    1,
    results.reduce((sum, result) => sum + result.items.length * 15, 0),
  );
  const percentage = results.length
    ? Math.round(
        results.reduce((sum, result) => sum + result.percentage, 0) /
          results.length,
      )
    : 0;
  const healthyCount = results.reduce(
    (sum, result) =>
      sum + result.items.filter((item) => item.healthy === true).length,
    0,
  );
  const unhealthyCount = results.reduce(
    (sum, result) =>
      sum + result.items.filter((item) => item.healthy === false).length,
    0,
  );
  const totalItems = Math.max(
    1,
    results.reduce((sum, result) => sum + result.items.length, 0),
  );
  const focus = Math.min(
    100,
    Math.round((Math.max(0, totalScore) / maximumScore) * 100),
  );
  const vitamins = Math.round((healthyCount / totalItems) * 100);
  const sugars = Math.max(
    0,
    100 - Math.round((unhealthyCount / totalItems) * 100),
  );
  const rescuedFoodUsed = results.reduce(
    (sum, result) => sum + (result.rescuedFoodUsed || 0),
    0,
  );
  const rescuedFoodAvailable = results.reduce(
    (sum, result) => sum + (result.rescuedFoodAvailable || 0),
    0,
  );
  const foodSustainability = rescuedFoodAvailable
    ? Math.round((rescuedFoodUsed / rescuedFoodAvailable) * 100)
    : 0;
  const foodBalance = Math.round((focus + vitamins + sugars) / 3);
  const rows = results
    .map(
      (result) => `
        <tr>
          <th>${result.title}</th>
          <td>${result.items.map((item) => item.name).join(", ")}</td>
          <td>${result.items.map((item) => item.tag).join(", ")}</td>
          <td>${result.score} p · ${result.percentage}%${result.rescueScoreBonus ? ` <span class="rescue-bonus">(+${result.rescueScoreBonus} päästetud toidu boonus)</span>` : ""}</td>
        </tr>`,
    )
    .join("");

  return `
    <div class="final-summary">
      <p class="final-percentage">${percentage}%</p>
      <p class="final-score-breakdown">Toiduainete tasakaal: <strong>${foodBalance}%</strong> | Korruste sünergia skoor: <strong>${percentage}%</strong></p>
      <p class="final-score-note">Üldine tulemus on korruste sünergia skooride keskmine; edenemisribad näitavad kogu mängu koondnäitajaid.</p>
      <div class="progress-list">
        <label>Pikaajaline energia &amp; fookus <strong>${focus}%</strong></label>
        <div class="progress-track"><span style="width: ${focus}%"></span></div>
        <label>Vitamiinid &amp; vedelik <strong>${vitamins}%</strong></label>
        <div class="progress-track"><span style="width: ${vitamins}%"></span></div>
        <label>Lisatud suhkrud &amp; rasvad <strong>${sugars}%</strong></label>
        <div class="progress-track"><span style="width: ${sugars}%"></span></div>
        <label>Toidu Säästlikkus (%) <strong>${foodSustainability}%</strong></label>
        <div class="progress-track"><span style="width: ${foodSustainability}%"></span></div>
      </div>
      <div class="summary-table-wrap">
        <table class="summary-table">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead><tr><th>Tase</th><th>Valikud</th><th>Toitained</th><th>Mõju</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
}

function evaluateMealV2() {
  const level = getLevelById(state.currentLevel);
  const selectedItems = level.items.filter((item) =>
    state.bowlItems.includes(item.id),
  );
  if (selectedItems.length === 0) {
    showToast("Lisa enne valmistamist vähemalt üks toiduaine.");
    return;
  }

  const count = selectedItems.length;
  const rescuedFoodUsed = selectedItems.filter((item) => item.isRescued).length;
  const rescuedFoodAvailable = level.items.filter(
    (item) => item.isRescued,
  ).length;
  const foodScore = selectedItems.reduce(
    (sum, item) => sum + getFoodScore(item),
    0,
  );
  let score = foodScore;
  const rescueScoreBonus = rescuedFoodUsed * 10;
  const flavors = new Set(selectedItems.map((item) => item.flavor));
  const hasSavoryMainDish = selectedItems.some(
    (item) =>
      item.flavor === "savory" &&
      (item.type === "protein" ||
        item.type === "carb" ||
        item.type === "junk"),
  );
  const hasJunkFood = selectedItems.some((item) => item.type === "junk");
  const flavorMismatch =
    count === 3 && hasSavoryMainDish && hasJunkFood;
  const flavorBonus =
    count === 3 &&
    flavors.size === 1 &&
    (flavors.has("savory") || flavors.has("sweet"))
      ? 15
      : 0;
  const balancedTypes =
    count === 3 &&
    ["carb", "protein", "produce"].every((type) =>
      selectedItems.some((item) => item.type === type),
    );
  const balanceBonus = balancedTypes ? 15 : 0;
  if (flavorMismatch) score -= 15;
  score += flavorBonus + balanceBonus;

  const maxScore = count * 15 + (count === 3 ? 15 : 0);
  const healthyBalancedMeal =
    count === 3 &&
    balancedTypes &&
    !flavorMismatch &&
    selectedItems.every((item) => item.healthy === true);
  if (healthyBalancedMeal) score = Math.max(score, maxScore);

  const portionLimit = count === 1 ? 35 : count === 2 ? 70 : 100;
  const calculatedPercentage = Math.min(
    100,
    Math.round((score / maxScore) * 100),
  );
  const percentage = Math.min(portionLimit, Math.max(0, calculatedPercentage));
  const grade = getMealGrade(percentage);
  state.levelResults[state.currentLevel - 1] = {
    title: level.name,
    items: selectedItems,
    score,
    percentage,
    grade,
    rescuedFoodUsed,
    rescuedFoodAvailable,
    rescueScoreBonus,
    flavorMismatch,
    flavorBonus,
    balanceBonus,
  };
  state.levelScores[state.currentLevel - 1] = score;
  state.lastResultPassed = true;
  state.highScore = Math.max(state.highScore, score);
  state.unlockedLevel = Math.min(
    Math.max(state.unlockedLevel, state.currentLevel + 1),
    LEVELS.length,
  );
  state.selectedLevel = Math.min(state.currentLevel + 1, state.unlockedLevel);
  saveProgress();
  updateHighScoreDisplay();
  renderHomePyramid();

  const isFinalLevel = state.currentLevel >= LEVELS.length;
  elements.resultTitle.textContent = isFinalLevel
    ? "Püramiid Täidetud - Mäng Läbitud! 🏆"
    : `Hinne ${grade}`;
  const rescueBonusMessage = rescueScoreBonus
    ? ` <span class="rescue-bonus">(+${rescueScoreBonus} päästetud toidu boonus)</span>`
    : "";
  const foodWasteTip = `<p class="food-waste-tip">${getFoodWasteTip(level.id)}</p>`;
  const portionHint =
    count < 3
      ? '<p class="portion-hint">Kauss on pooleldi tühi! Lisa täpselt 3 toiduainet, et saavutada 100% tulemus.</p>'
      : "";
  const mealFeedback = [
    flavorMismatch
      ? '<p class="flavor-warning">Soolane ja magus toit ei sobi selles eines hästi kokku! (−15 p)</p>'
      : "",
    flavorBonus
      ? '<p class="synergy-bonus">Maitseline sünergia: +15 punkti.</p>'
      : "",
    balanceBonus
      ? '<p class="synergy-bonus">Toitainete tasakaal: +15 punkti.</p>'
      : "",
  ].join("");
  elements.resultText.innerHTML = isFinalLevel
    ? `${buildNewFinalSummary()}${portionHint}${mealFeedback}${foodWasteTip}`
    : `<div class="grade-badge grade-${grade.toLowerCase()}">${grade}</div><p class="feedback-message">${getMealFeedback(grade)}</p><p class="feedback-score">Tulemus: <strong>${percentage}%</strong> · Skoor: <strong>${score}</strong>${rescueBonusMessage}</p>${portionHint}${mealFeedback}<div class="feedback-food-list">${selectedFoodMarkup(selectedItems)}</div>${foodWasteTip}`;
  document.getElementById("closeResultBtn").textContent = isFinalLevel
    ? "Tagasi avalehele"
    : `Ava ${getLevelById(state.selectedLevel).label}`;
  elements.resultModal.classList.remove("hidden");
}

function buildFinalSummary() {
  const validScores = state.levelScores.filter(
    (score) => typeof score === "number",
  );
  const totalScore = validScores.reduce((sum, score) => sum + score, 0);
  const averageScore = validScores.length
    ? Math.round(totalScore / validScores.length)
    : 0;
  const bestScore = validScores.length ? Math.max(...validScores) : 0;

  const summaryParts = [
    `Sinu lõpptulemus: <strong>${state.highScore}</strong> punkti`,
    `Keskmine skoor tasekohtadega: <strong>${averageScore}</strong>`,
    `Parim tulemus: <strong>${bestScore}</strong>`,
    `Läbitud tasemeid: <strong>${validScores.length}/${LEVELS.length}</strong>`,
  ];

  let advice =
    "Tasakaal on hea. Jätka samal moel – valk, kiudained ja vähem kiireid suhkruid.";
  if (averageScore < 140) {
    advice =
      "Suhkrud olid liiga kõrged või valk jäi väheks. Järgmine kord keskendu aeglastele süsivesikutele ja rohkem valguallikatele.";
  }

  return `${summaryParts.join("<br>")}<br><br>${advice}`;
}

function openInfoModal(item) {
  elements.infoTitle.textContent = item.name;
  elements.infoContent.innerHTML = `
    <p><strong>Kategooria:</strong> ${item.tag}</p>
    <p><strong>Suhkur:</strong> ${item.sugar} ühiku</p>
    <p><strong>Valgud:</strong> ${item.protein} ühiku</p>
    <p><strong>Energia:</strong> ${item.energy} ühiku</p>
    <p><strong>Kirjeldus:</strong> ${item.description}</p>
  `;
  elements.infoModal.classList.remove("hidden");
}

function closeInfoModal() {
  elements.infoModal.classList.add("hidden");
}

function closeResultModal() {
  elements.resultModal.classList.add("hidden");

  if (state.currentLevel >= LEVELS.length && state.lastResultPassed) {
    state.selectedLevel = 1;
    state.unlockedLevel = 1;
    state.currentLevel = 1;
    state.highScore = 0;
    state.levelScores = [];
    state.levelResults = [];
    state.bowlItems = [];
    state.lastResultPassed = false;
    localStorage.removeItem(STORAGE_KEY);
    toggleHighScoreVisibility(false);
    updateHighScoreDisplay();
    renderHomePyramid();
    switchView("home");
    return;
  }

  if (state.lastResultPassed) {
    state.currentLevel = Math.min(state.currentLevel + 1, LEVELS.length);
    state.selectedLevel = state.currentLevel;
    state.unlockedLevel = Math.max(state.unlockedLevel, state.selectedLevel);
    state.bowlItems = [];
    saveProgress();
    renderHomePyramid();
    switchView("home");
    return;
  }

  state.bowlItems = [];
  renderBowlItems();
  saveProgress();
  switchView("home");
}

function returnToHome() {
  state.bowlItems = [];
  elements.confirmHomeModal.classList.add("hidden");
  renderBowlItems();
  switchView("home");
}

function bindEvents() {
  elements.startGameBtn.addEventListener("click", startGame);
  document.getElementById("creditsBtn").addEventListener("click", () => {
    elements.creditsModal.classList.remove("hidden");
  });
  window.addEventListener("home-pyramid-select", (event) => {
    selectHomeLevel(event.detail.level);
  });

  document.getElementById("backHomeBtn").addEventListener("click", () => {
    elements.confirmHomeModal.classList.remove("hidden");
  });

  document.getElementById("hintBtn").addEventListener("click", () => {
    const level = getLevelById(state.currentLevel);
    elements.hintText.textContent = level.objective;
    elements.hintModal.classList.remove("hidden");
  });

  document
    .getElementById("confirmHomeBtn")
    .addEventListener("click", returnToHome);
  document.getElementById("cancelHomeBtn").addEventListener("click", () => {
    elements.confirmHomeModal.classList.add("hidden");
  });
  document.querySelector(".confirm-close").addEventListener("click", () => {
    elements.confirmHomeModal.classList.add("hidden");
  });
  elements.confirmHomeModal.addEventListener("click", (event) => {
    if (event.target === elements.confirmHomeModal) {
      elements.confirmHomeModal.classList.add("hidden");
    }
  });
  elements.hintModal
    .querySelector(".hint-close")
    .addEventListener("click", () => {
      elements.hintModal.classList.add("hidden");
    });
  elements.hintModal.addEventListener("click", (event) => {
    if (event.target === elements.hintModal) {
      elements.hintModal.classList.add("hidden");
    }
  });

  document
    .getElementById("submitMealBtn")
    .addEventListener("click", evaluateMealV2);
  document
    .getElementById("prevIngredientsBtn")
    .addEventListener("click", () => {
      changeIngredientPage(-1);
    });
  document
    .getElementById("nextIngredientsBtn")
    .addEventListener("click", () => {
      changeIngredientPage(1);
    });
  document
    .getElementById("closeResultBtn")
    .addEventListener("click", closeResultModal);
  elements.infoModal
    .querySelector(".close-modal")
    .addEventListener("click", closeInfoModal);
  elements.infoModal.addEventListener("click", (event) => {
    if (event.target === elements.infoModal) {
      closeInfoModal();
    }
  });
  elements.creditsModal
    .querySelector(".credits-close")
    .addEventListener("click", () => {
      elements.creditsModal.classList.add("hidden");
    });
  elements.creditsModal.addEventListener("click", (event) => {
    if (event.target === elements.creditsModal) {
      elements.creditsModal.classList.add("hidden");
    }
  });

}

function init() {
  localStorage.removeItem(STORAGE_KEY);
  loadProgress();
  toggleHighScoreVisibility(false);
  updateHighScoreDisplay();
  renderHomePyramid();
  bindEvents();
  switchView("home");
}

init();
