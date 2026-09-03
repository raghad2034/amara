// ---------- Minimal line icons (stroke uses currentColor via CSS) ----------
const ICONS = {
  dress: `<svg viewBox="0 0 64 64" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 8h16l4 8-6 4v6l10 30H16l10-30v-6l-6-4 4-8z"/><path d="M24 8c0 4 3.5 7 8 7s8-3 8-7"/></svg>`,
  blazer: `<svg viewBox="0 0 64 64" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12l-10 6v34h40V18l-10-6"/><path d="M22 12l10 10 10-10"/><path d="M26 20L20 52M38 20l6 32"/></svg>`,
  trousers: `<svg viewBox="0 0 64 64" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h28l2 44h-10l-6-30-6 30H16l2-44z"/><path d="M18 18h28"/></svg>`,
  blouse: `<svg viewBox="0 0 64 64" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 10l-12 8 6 8 6-4v32h16V22l6 4 6-8-12-8"/><path d="M24 10c0 4.5 3.5 8 8 8s8-3.5 8-8"/></svg>`,
  sweater: `<svg viewBox="0 0 64 64" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12L8 20l6 8 6-5v31h24V23l6 5 6-8-12-8"/><path d="M24 12c0 4.5 3.5 8 8 8s8-3.5 8-8"/></svg>`,
  coat: `<svg viewBox="0 0 64 64" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10l-12 8 5 8 7-5v33M42 10l12 8-5 8-7-5v33"/><path d="M22 10l10 8 10-8"/><path d="M22 54h20"/><path d="M32 18v36"/></svg>`,
  shirt: `<svg viewBox="0 0 64 64" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 10l-14 8 6 9 6-4v31h20V23l6 4 6-9-14-8"/><path d="M24 10l8 6 8-6"/></svg>`,
  chinos: `<svg viewBox="0 0 64 64" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10h24l2 44h-9l-5-28-5 28h-9l2-44z"/><path d="M20 17h24"/></svg>`,
  jacket: `<svg viewBox="0 0 64 64" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14l-9 6 5 8 6-4v30h20V24l6 4 5-8-9-6"/><path d="M20 14l12 9 12-9"/><path d="M24 22l-4 28M40 22l4 28"/></svg>`,
};

// ---------- Product data ----------
const PRODUCTS = {
  women: [
    { name: "Wrap Midi Dress", price: "38 JD", cat: "Dresses", icon: "dress" },
    { name: "Tailored Blazer", price: "52 JD", cat: "Outerwear", icon: "blazer" },
    { name: "Wide-Leg Trousers", price: "34 JD", cat: "Bottoms", icon: "trousers" },
    { name: "Silk Blouse", price: "29 JD", cat: "Tops", icon: "blouse" },
    { name: "Merino Sweater", price: "36 JD", cat: "Knitwear", icon: "sweater" },
    { name: "Belted Trench Coat", price: "65 JD", cat: "Outerwear", icon: "coat" },
  ],
  men: [
    { name: "Oxford Shirt", price: "27 JD", cat: "Tops", icon: "shirt" },
    { name: "Wool Blazer", price: "58 JD", cat: "Outerwear", icon: "blazer" },
    { name: "Tapered Chinos", price: "32 JD", cat: "Bottoms", icon: "chinos" },
    { name: "Overcoat", price: "70 JD", cat: "Outerwear", icon: "coat" },
    { name: "Crewneck Sweater", price: "33 JD", cat: "Knitwear", icon: "sweater" },
    { name: "Denim Jacket", price: "40 JD", cat: "Outerwear", icon: "jacket" },
  ],
};

const HERO_COPY = {
  women: { eyebrow: "Women's edit", title: "Quiet clothes<br/>with good posture.", shop: "The Women's edit" },
  men: { eyebrow: "Men's edit", title: "Fewer pieces,<br/>worn on repeat.", shop: "The Men's edit" },
};

// ---------- State ----------
let state = { gender: "women", category: "All" };
let bagCount = 0;

// ---------- Elements ----------
const body = document.body;
const toggleBtns = document.querySelectorAll(".toggle-btn");
const pill = document.getElementById("togglePill");
const heroEyebrow = document.getElementById("heroEyebrow");
const heroTitle = document.getElementById("heroTitle");
const shopTitle = document.getElementById("shopTitle");
const chipsEl = document.getElementById("chips");
const grid = document.getElementById("productGrid");
const bagCountEl = document.getElementById("bagCount");
const toast = document.getElementById("toast");

// ---------- Render ----------
function renderChips() {
  const cats = ["All", ...new Set(PRODUCTS[state.gender].map((p) => p.cat))];
  chipsEl.innerHTML = "";
  cats.forEach((cat) => {
    const chip = document.createElement("button");
    chip.className = "chip" + (cat === state.category ? " active" : "");
    chip.textContent = cat;
    chip.addEventListener("click", () => {
      state.category = cat;
      renderChips();
      renderGrid();
    });
    chipsEl.appendChild(chip);
  });
}

function renderGrid() {
  const items = PRODUCTS[state.gender].filter(
    (p) => state.category === "All" || p.cat === state.category
  );
  grid.innerHTML = "";
  items.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${i * 0.06}s`;
    card.innerHTML = `
      <div class="product-media">${ICONS[p.icon]}</div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p class="product-cat">${p.cat}</p>
        <div class="product-foot">
          <span class="product-price">${p.price}</span>
          <button class="add-btn">Add to bag</button>
        </div>
      </div>
    `;
    card.querySelector(".add-btn").addEventListener("click", (e) => {
      bagCount += 1;
      bagCountEl.textContent = bagCount;
      const btn = e.currentTarget;
      btn.textContent = "Added";
      btn.classList.add("added");
      setTimeout(() => { btn.textContent = "Add to bag"; btn.classList.remove("added"); }, 1200);
      showToast(`${p.name} added to your bag`);
    });
    grid.appendChild(card);
  });
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2000);
}

function applyGender(gender) {
  state.gender = gender;
  state.category = "All";
  body.classList.toggle("theme-men", gender === "men");

  toggleBtns.forEach((btn) => {
    const active = btn.dataset.gender === gender;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active);
  });
  pill.style.transform = gender === "men" ? "translateX(84px)" : "translateX(0)";

  const copy = HERO_COPY[gender];
  heroEyebrow.textContent = copy.eyebrow;
  heroTitle.innerHTML = copy.title;
  shopTitle.textContent = copy.shop;

  renderChips();
  renderGrid();
}

toggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => applyGender(btn.dataset.gender));
});

// ---------- Init ----------
applyGender("women");
