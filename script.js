/* ---------- Menu data ---------- */
const items = [
  { n: "Appam & Stew",            c: "Mains",    p: 280, d: "Lacy rice pancakes with vegetable coconut stew." },
  { n: "Karimeen Pollichathu",    c: "Mains",    p: 540, d: "Pearl spot fish wrapped in banana leaf, grilled with spices." },
  { n: "Malabar Chicken Biryani", c: "Mains",    p: 360, d: "Fragrant kaima rice layered with slow-cooked chicken." },
  { n: "Kerala Beef Fry",         c: "Mains",    p: 420, d: "Pepper-roasted with curry leaves and coconut slivers." },
  { n: "Paneer Peralan",          c: "Veg",      p: 320, d: "Paneer tossed in a dry coconut-pepper masala." },
  { n: "Veg Moilee",              c: "Veg",      p: 290, d: "Seasonal vegetables in a mild turmeric coconut milk gravy." },
  { n: "Banana Flower Cutlet",    c: "Starters", p: 190, d: "Crisp patties with a tamarind-mint dip." },
  { n: "Prawn Roast",             c: "Starters", p: 380, d: "Prawns in caramelised onion and black pepper masala." },
  { n: "Elaneer Payasam",         c: "Desserts", p: 160, d: "Tender coconut pudding, chilled." },
  { n: "Jaggery Ice Cream",       c: "Desserts", p: 140, d: "House-made with palm jaggery and roasted cashew." },
  { n: "Spiced Buttermilk",       c: "Drinks",   p: 70,  d: "Sambaram with ginger, green chilli and curry leaf." },
  { n: "Fresh Lime Soda",         c: "Drinks",   p: 90,  d: "Sweet, salted or mixed." }
];

const cats = ["All", ...new Set(items.map(i => i.c))];

let cur = "All";
let order = [];

const tabs = document.getElementById("tabs");
const grid = document.getElementById("menuGrid");
const cart = document.getElementById("cart");

/* ---------- Render menu ---------- */
function render() {
  tabs.innerHTML = "";

  cats.forEach(c => {
    const b = document.createElement("button");
    b.textContent = c;
    b.setAttribute("aria-pressed", c === cur);
    b.onclick = () => {
      cur = c;
      render();
    };
    tabs.appendChild(b);
  });

  grid.innerHTML = "";

  items
    .filter(i => cur === "All" || i.c === cur)
    .forEach(i => {
      const d = document.createElement("article");
      d.className = "item";
      d.innerHTML = `
        <div class="row">
          <h3>${i.n}</h3>
          <span class="price">₹${i.p}</span>
        </div>
        <p>${i.d}</p>`;

      const b = document.createElement("button");
      b.textContent = "Add";
      b.onclick = () => add(i);

      d.appendChild(b);
      grid.appendChild(d);
    });
}

/* ---------- Order list ---------- */
function add(i) {
  order.push(i);

  const total = order.reduce((sum, x) => sum + x.p, 0);
  const label = order.length > 1 ? "items" : "item";

  cart.style.display = "block";
  cart.textContent = `${order.length} ${label} · ₹${total}`;
}

render();

/* ---------- Reservation form ---------- */
const g = document.getElementById("guests");

for (let i = 1; i <= 10; i++) {
  g.add(new Option(i + (i > 1 ? " guests" : " guest"), i));
}
g.value = 2;

const date = document.getElementById("date");
date.min = new Date().toISOString().split("T")[0];

document.getElementById("resForm").addEventListener("submit", e => {
  e.preventDefault();

  const m = document.getElementById("msg");
  const n = name.value.trim();
  const p = phone.value.trim();

  if (!n || !/^[+\d\s-]{8,15}$/.test(p) || !date.value) {
    m.className = "err";
    m.textContent = "Enter your name, a valid phone number and a date.";
    return;
  }

  m.className = "ok";
  m.textContent = `Thanks ${n}! Request received for ${g.value} on ${date.value} at ${time.value}. We’ll call to confirm.`;

  e.target.reset();
  g.value = 2;
});

/* ---------- Dark mode toggle ---------- */
const root = document.documentElement;
const tb = document.getElementById("theme");

tb.onclick = () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;

  root.dataset.theme = dark ? "light" : "dark";
  tb.textContent = dark ? "☾" : "☀";
};