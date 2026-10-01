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
    return `${FOOD_ASSET_ROOT}/${item.image}`;
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
        name: "Soda",
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

const dailyTasks = window.DAILY_TASKS || {};

function shuffleItems(items) {
  return items
    .map((item) => ({ item, sort: Math.random() }))
    .sort((left, right) => left.sort - right.sort)
    .map(({ item }) => item);
}

function applyFoodDatabase() {
  const database = window.FOOD_DATABASE || {};

  LEVELS.forEach((level) => {
    const sourceItems = database[level.id];
    if (!sourceItems || sourceItems.length === 0) return;

    const healthy = shuffleItems(
      sourceItems.filter((item) => item.healthy === true),
    );
    const unhealthy = shuffleItems(
      sourceItems.filter((item) => item.healthy === false),
    );
    const selected = [
      ...healthy.slice(0, Math.min(3, healthy.length)),
      ...unhealthy.slice(0, Math.min(3, unhealthy.length)),
    ];
    const selectedIds = new Set(selected.map((item) => item.id));
    const remaining = shuffleItems(
      sourceItems.filter((item) => !selectedIds.has(item.id)),
    );

    level.items = shuffleItems([...selected, ...remaining])
      .slice(0, Math.min(8, sourceItems.length))
      .map((item) => ({
        ...item,
        icon: "",
        tag: item.tag,
        type:
          item.healthy === true
            ? "healthy"
            : item.healthy === false
              ? "unhealthy"
              : "neutral",
        sugar: item.points < 0 ? Math.abs(item.points) / 3 : 0,
        protein: item.healthy === true ? 3 : 0,
        energy: Math.max(1, Math.round((item.points + 15) / 6)),
        description: item.tag,
      }));
  });
}

applyFoodDatabase();

const SCENARIO_VARIANTS = [
  [
    "Kell on 07:30! Täna ootab sind ees 3-tunnine matemaatikaeksam. Et pea püsiks terav ja kõht ei hakkaks poole eksami ajal valjult korisema, vajad hommikusööki, mis annab pikaajalist energiat. Pane taldrikule sobivad asjad!",
    "Kell on 13:00. Rasked tunnid on seljataga, aga ees ootab veel füüsika praktikum ja meeskonnatöö. Keha vajab akude laadimiseks täisväärtuslikku eineid. Kasuta taldrikureeglit, et kõht saaks täis, aga ei tekiks rasket 'toidukoomat'!",
    "Kell on 16:30! Sul algab tunni aja pärast kossutrenn ja kesta tuleb terve tund aega järjest. Vajad vahepala, mis annab kiirelt kättesaadavat energiat, kuid ei jää kõhtu raskelt seisma. Mida valid?",
    "Kell on 19:30. Tegus päev on seljataga, trenn tehtud ja eksam sooritatud! Keha vajab toitaineid lihaste taastumiseks ning ettevalmistust rahuliku une jaoks. Pane kokku tasakaalustatud õhtusöök.",
  ],
  [
    "Kell on 07:15! Täna on kooli spordipäev. Vajad hommikusööki, mis annab pikalt energiat ega tee kõhtu raskeks. Mida paned taldrikule?",
    "Kell on 12:30! Spordipäev on läbi ja ees ootab kontrolltöö. Keha ja aju vajavad uut kütust. Pane kokku tasakaalustatud lõuna!",
    "Kell on 16:00! Suundud huviringi või trenni. Vajad kerget vahepala fookuse ja energia hoidmiseks. Mida valid?",
    "Kell on 19:30! Päev on läbi ja aeg on taastuda. Valmista kerge õhtusöök, et tagada hea uni. Mida sööd?",
  ],
  [
    "Kell on 07:30! Täna on koolis tihe projektipäev ja suur esitlus. Vajad hommikusööki, mis hoiab pea selge ja meele erksana. Mida paned taldrikule?",
    "Kell on 12:45! Esitlus läks hästi, aga ees ootab veel mitu tundi rühmatööd. Keha vajab uut energiat. Mida valid lõunaks?",
    "Kell on 16:15! Kool on läbi ja lähed sõpradega õue rattaga sõitma. Vajad kerget vahepala, mis annab kiiret energiat. Mida võtad?",
    "Kell on 19:30! Pikk ja aktiivne päev on seljataga. Valmista toitav, kuid kergelt seeditav õhtusöök hea une tagamiseks. Mida sööd?",
  ],
  [
    "Kell on 07:30! Täna lähete klassiga pikale loodusmatkale. Vajad toitvat hommikusööki, mis annab pika põhitagavara. Mida paned taldrikule?",
    "Kell on 13:00! Olete läbinud mitu kilomeetrit ja aeg on piknikuks. Keha vajab uut jõudu matka jätkamiseks. Mida võtad seljakotist?",
    "Kell on 16:30! Matk on seljataga ja sõidate bussiga kodu poole. Vajad kerget vahepala, et õhtusöögini vastu pidada. Mida näksid?",
    "Kell on 19:30! Oled jõudnud koju ja jalad on väsinud. Keha vajab toitaineid lihaste taastumiseks ja heaks uneks. Mida sööd õhtuks?",
  ],
  [
    "Kell on 07:30! Täna on koolis suur etendus ja sa astud lavale. Vajad hommikusööki, mis rahustab närve, annab energiat ega tee kõhtu raskeks. Mida paned taldrikule?",
    "Kell on 12:30! Peaproov läks hästi ja lavale minekuni on veel paar tundi. Vajad stabiilset kütust, et fookus ei kaoks. Mida sööd lõunaks?",
    "Kell on 16:30! Etendus algab kohe ja lavanärv on sees. Vajad kerget vahepala, mis annab kiire särtsu, kuid ei jää kõhtu kripeldama. Mida võtad?",
    "Kell on 19:30! Etendus oli tohutu edu ja aplaus oli võimas! Nüüd on aeg keha täramiseks ja rahulikuks taastumiseks. Mida sööd õhtuks?",
  ],
];

const activeScenarioVariant =
  SCENARIO_VARIANTS[Math.floor(Math.random() * SCENARIO_VARIANTS.length)];

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

      const button = document.createElement("button");
      button.type = "button";
      button.className = `level-layer ${isSelected ? "selected" : ""} ${!isUnlocked ? "locked" : ""}`;
      button.dataset.level = String(level.id);
      button.textContent = level.label;
      button.disabled = !isUnlocked;

      button.addEventListener("click", () => {
        if (!isUnlocked) {
          showToast("See tase on veel lukus.");
          return;
        }
        state.selectedLevel = level.id;
        renderHomePyramid();
        updateStartButtonState();
      });

      elements.pyramid.appendChild(button);
    });

  updateStartButtonState();
}

function startGame() {
  if (state.selectedLevel > state.unlockedLevel) {
    showToast("Vali avatud tase.");
    return;
  }

  state.currentLevel = state.selectedLevel;
  state.bowlItems = [];
  renderGameLevel();
  switchView("game");
  requestAnimationFrame(updateIngredientNavigation);
}

function renderGameLevel(resetIngredients = true) {
  const level = getLevelById(state.currentLevel);
  const dailyTask = dailyTasks[level.id];
  elements.currentLevelLabel.textContent = level.label;
  elements.objectiveText.textContent = dailyTask
    ? dailyTask.title
    : level.objective;
  elements.levelPromptInline.innerHTML = dailyTask
    ? `<strong>${dailyTask.title}</strong><br>${dailyTask.task}`
    : activeScenarioVariant[state.currentLevel - 1] ||
      level.prompt ||
      level.objective;
  document.getElementById("submitMealBtn").textContent = "Sega & Söö";

  elements.ingredientShelf.innerHTML = "";
  elements.ingredientShelf.scrollLeft = 0;
  if (resetIngredients) {
    state.ingredientPage = 0;
  }
  document.getElementById("prevIngredientsBtn").classList.remove("is-visible");
  document.getElementById("nextIngredientsBtn").classList.remove("is-visible");
  const pageStart = state.ingredientPage * 4;
  level.items.slice(pageStart, pageStart + 4).forEach((item) => {
    const card = document.createElement("div");
    card.className = "ingredient-card food-card";
    card.dataset.itemId = item.id;
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `${item.name} toiduaine`);

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

    card.appendChild(infoButton);
    card.addEventListener("pointerdown", (event) => beginDrag(event, item.id));
    elements.ingredientShelf.appendChild(card);
  });

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
    return;
  }

  const level = getLevelById(state.currentLevel);
  const pageCount = Math.max(0, Math.ceil(level.items.length / 4) - 1);
  state.ingredientPage = Math.min(state.ingredientPage, pageCount);
  const canScrollLeft = state.ingredientPage > 0;
  const canScrollRight = state.ingredientPage < pageCount;
  previousButton.classList.toggle("is-visible", canScrollLeft);
  nextButton.classList.toggle("is-visible", canScrollRight);
}

function beginDrag(event, itemId) {
  if (event.pointerType === "mouse" && event.button !== 0) {
    return;
  }

  if (state.dragState) {
    cleanupDragState();
  }

  const item = getLevelById(state.currentLevel).items.find(
    (entry) => entry.id === itemId,
  );
  if (!item) return;

  const ghost = document.createElement("div");
  ghost.className = "drag-ghost";
  ghost.innerHTML = `
    <img class="drag-food-image" src="${getFoodImage(item)}" alt="" aria-hidden="true" />
  `;
  document.body.appendChild(ghost);

  state.dragState = {
    itemId,
    ghost,
    active: true,
    placed: false,
  };

  const move = (moveEvent) => {
    if (!state.dragState || !state.dragState.active) return;
    ghost.style.left = `${moveEvent.clientX}px`;
    ghost.style.top = `${moveEvent.clientY}px`;
  };

  const finish = (endEvent) => {
    if (!state.dragState) return;

    const bowlRect = elements.bowl.getBoundingClientRect();
    const insideBowl =
      endEvent.clientX >= bowlRect.left &&
      endEvent.clientX <= bowlRect.right &&
      endEvent.clientY >= bowlRect.top &&
      endEvent.clientY <= bowlRect.bottom;

    if (insideBowl && !state.dragState.placed) {
      state.dragState.placed = true;
      addItemToBowl(itemId);
    }

    cleanupDragState();
    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerup", finish);
  };

  ghost.style.left = `${event.clientX}px`;
  ghost.style.top = `${event.clientY}px`;

  document.addEventListener("pointermove", move);
  document.addEventListener("pointerup", finish);
}

function cleanupDragState() {
  if (!state.dragState) return;
  if (state.dragState.ghost && state.dragState.ghost.parentNode) {
    state.dragState.ghost.remove();
  }
  state.dragState = null;
}

function addItemToBowl(itemId) {
  const item = getLevelById(state.currentLevel).items.find(
    (entry) => entry.id === itemId,
  );
  if (!item) return;

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

    const pill = document.createElement("div");
    pill.className = "bowl-item";
    pill.innerHTML = `
      <img class="bowl-food-image" src="${getFoodImage(item)}" alt="" />
      <span>${item.name}</span>
    `;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "×";
    removeBtn.setAttribute("aria-label", `Eemalda ${item.name}`);
    removeBtn.addEventListener("click", () => removeItemFromBowl(itemId));

    pill.appendChild(removeBtn);
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
  if (score >= 30) return "A";
  if (score >= 15) return "B";
  return "C";
}

function getMealFeedback(grade) {
  if (grade === "A") return "Tegelane on täis energiat, laud on puhas!";
  if (grade === "B") return "Kõht on täis, aga energia kõigub!";
  return "Tegelane väsis kiiresti!";
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
            <span class="feedback-impact ${item.points >= 0 ? "positive" : "negative"}">${item.points > 0 ? "+" : ""}${item.points} mõju</span>
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
  const percentage = Math.max(
    0,
    Math.min(100, Math.round((totalScore / maximumScore) * 100)),
  );
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
  const focus = Math.round((Math.max(0, totalScore) / maximumScore) * 100);
  const vitamins = Math.round((healthyCount / totalItems) * 100);
  const sugars = Math.max(
    0,
    100 - Math.round((unhealthyCount / totalItems) * 100),
  );
  const rows = results
    .map(
      (result) => `
        <tr>
          <th>${result.title}</th>
          <td>${result.items.map((item) => item.name).join(", ")}</td>
          <td>${result.items.map((item) => item.tag).join(", ")}</td>
          <td>${result.score} p</td>
        </tr>`,
    )
    .join("");

  return `
    <div class="final-summary">
      <p class="final-percentage">${percentage}%</p>
      <div class="progress-list">
        <label>Pikaajaline energia &amp; fookus <strong>${focus}%</strong></label>
        <div class="progress-track"><span style="width: ${focus}%"></span></div>
        <label>Vitamiinid &amp; vedelik <strong>${vitamins}%</strong></label>
        <div class="progress-track"><span style="width: ${vitamins}%"></span></div>
        <label>Lisatud suhkrud &amp; rasvad <strong>${sugars}%</strong></label>
        <div class="progress-track"><span style="width: ${sugars}%"></span></div>
      </div>
      <div class="summary-table-wrap">
        <table class="summary-table">
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

  const score = selectedItems.reduce(
    (sum, item) => sum + Number(item.points || 0),
    0,
  );
  const grade = getMealGrade(score);
  const task = dailyTasks[level.id];
  state.levelResults[state.currentLevel - 1] = {
    title: task ? task.title : level.name,
    items: selectedItems,
    score,
    grade,
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
  elements.resultText.innerHTML = isFinalLevel
    ? buildNewFinalSummary()
    : `<div class="grade-badge grade-${grade.toLowerCase()}">${grade}</div><p class="feedback-message">${getMealFeedback(grade)}</p><p class="feedback-score">Skoor: <strong>${score}</strong></p><div class="feedback-food-list">${selectedFoodMarkup(selectedItems)}</div>`;
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

  document.getElementById("backHomeBtn").addEventListener("click", () => {
    elements.confirmHomeModal.classList.remove("hidden");
  });

  document.getElementById("hintBtn").addEventListener("click", () => {
    const level = getLevelById(state.currentLevel);
    showToast(level.objective);
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

  document
    .getElementById("submitMealBtn")
    .addEventListener("click", evaluateMealV2);
  document
    .getElementById("prevIngredientsBtn")
    .addEventListener("click", () => {
      state.ingredientPage = Math.max(0, state.ingredientPage - 1);
      renderGameLevel(false);
    });
  document
    .getElementById("nextIngredientsBtn")
    .addEventListener("click", () => {
      state.ingredientPage += 1;
      renderGameLevel(false);
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

  elements.bowl.addEventListener("dragover", (event) => event.preventDefault());
  elements.bowl.addEventListener("drop", (event) => {
    event.preventDefault();
    const itemId =
      event.dataTransfer && event.dataTransfer.getData("text/plain");
    if (itemId) {
      addItemToBowl(itemId);
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
