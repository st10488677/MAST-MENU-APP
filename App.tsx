// script.ts
type Role = "customer" | "chef" | null;

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: "Starters" | "Main Course" | "Desserts" | "Mains" | string;
  price: number;
  image?: string; // filename or url
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

const qs = <T extends HTMLElement>(sel: string) => document.querySelector(sel) as T | null;
const qsa = (sel: string) => Array.from(document.querySelectorAll(sel));

/* --- DOM --- */
const loginScreen = qs<HTMLElement>("#loginScreen")!;
const homeScreen = qs<HTMLElement>("#homeScreen")!;
const menuScreen = qs<HTMLElement>("#menuScreen")!;
const cartScreen = qs<HTMLElement>("#cartScreen")!;
const addItemModal = qs<HTMLElement>("#addItemModal")!;
const resetModal = qs<HTMLElement>("#resetModal")!;
const toastEl = qs<HTMLElement>("#toast")!;

/* inputs and buttons */
const customerLogin = qs<HTMLButtonElement>("#customerLogin")!;
const chefLogin = qs<HTMLButtonElement>("#chefLogin")!;
const toMenu = qs<HTMLButtonElement>("#toMenu")!;
const toCart = qs<HTMLButtonElement>("#toCart")!;
const backFromHome = qs<HTMLButtonElement>("#backFromHome")!;
const menuToCart = qs<HTMLButtonElement>("#menuToCart")!;
const backFromMenu = qs<HTMLButtonElement>("#backFromMenu")!;
const backFromCart = qs<HTMLButtonElement>("#backFromCart")!;
const openAddItem = qs<HTMLButtonElement>("#openAddItem")!;
const saveItemBtn = qs<HTMLButtonElement>("#saveItem")!;
const cancelAddBtn = qs<HTMLButtonElement>("#cancelAdd")!;
const menuList = qs<HTMLElement>("#menuList")!;
const cartItemsDiv = qs<HTMLElement>("#cartItems")!;
const cartTotalEl = qs<HTMLElement>("#cartTotal")!;
const confirmReset = qs<HTMLButtonElement>("#confirmReset")!;
const cancelReset = qs<HTMLButtonElement>("#cancelReset")!;
const toReset = qs<HTMLButtonElement>("#toReset")!;
const checkoutBtn = qs<HTMLButtonElement>("#checkoutBtn")!;

/* add form fields */
const itemNameInput = qs<HTMLInputElement>("#itemName")!;
const itemDescInput = qs<HTMLTextAreaElement>("#itemDesc")!;
const itemCourseInput = qs<HTMLSelectElement>("#itemCourse")!;
const itemPriceInput = qs<HTMLInputElement>("#itemPrice")!;
const itemImageInput = qs<HTMLInputElement>("#itemImage")!;

/* categories */
const catBtns = qsa(".cat-btn") as HTMLElement[];

/* state */
let currentRole: Role = null;
let menu: MenuItem[] = [];
let cart: CartItem[] = [];

const STORAGE_MENU = "menu_v1";
const STORAGE_CART = "cart_v1";

/* helpers */
function uid() { return Math.random().toString(36).slice(2, 9); }
function show(el: HTMLElement) { el.classList.remove("hidden"); }
function hide(el: HTMLElement) { el.classList.add("hidden"); }
function showSection(section: HTMLElement) {
  [loginScreen, homeScreen, menuScreen, cartScreen].forEach(s => hide(s));
  show(section);
}

/* toast */
let toastTimer: number | null = null;
function toast(msg: string, ms = 1500) {
  toastEl.textContent = msg;
  show(toastEl);
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => hide(toastEl), ms);
}

/* local storage load/save */
function loadMenu() {
  const raw = localStorage.getItem(STORAGE_MENU);
  if (raw) {
    try { menu = JSON.parse(raw) as MenuItem[]; return; } catch {}
  }
  // default items
  menu = [
    { id: uid(), name: "Crumbed Mushrooms", description: "Crumbed mushrooms with garlic sauce", course: "Starters", price: 70, image: "crumbed_mushrooms.jpg" },
    { id: uid(), name: "Samoosas", description: "Crispy pastry with spiced filling", course: "Starters", price: 40, image: "samoosas.jpg" },
    { id: uid(), name: "Buffalo Wings", description: "Spicy buffalo wings", course: "Starters", price: 70, image: "buffalo_wings.jpg" },
    { id: uid(), name: "Steak with Mushroom Sauce", description: "Grilled steak with mushroom sauce", course: "Main Course", price: 160, image: "steak.jpg" },
    { id: uid(), name: "Butter Chicken", description: "Classic butter chicken with rice", course: "Main Course", price: 120, image: "butter_chicken.jpg" },
    { id: uid(), name: "Lasagna", description: "Baked lasagna with cheese", course: "Main Course", price: 95, image: "lasagna.jpg" },
    { id: uid(), name: "Ice Cream", description: "Scoop of vanilla ice cream", course: "Desserts", price: 35, image: "ice_cream.jpg" },
    { id: uid(), name: "Brownies", description: "Chocolate brownies", course: "Desserts", price: 30, image: "brownies.jpg" },
    { id: uid(), name: "Red Velvet Cake", description: "Red velvet slice", course: "Desserts", price: 40, image: "red_velvet.jpg" }
  ];
  saveMenu();
}

function saveMenu() {
  localStorage.setItem(STORAGE_MENU, JSON.stringify(menu));
}

function loadCart() {
  const raw = localStorage.getItem(STORAGE_CART);
  if (raw) {
    try { cart = JSON.parse(raw) as CartItem[]; } catch { cart = []; }
  } else cart = [];
}

function saveCart() {
  localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
}

/* render menu items */
function renderMenu(filter: string | null = null) {
  menuList.innerHTML = "";
  const filtered = menu.filter(mi => !filter || filter === "All" || mi.course.toLowerCase().includes(filter.toLowerCase()) || mi.course === filter);
  filtered.forEach(mi => {
    const row = document.createElement("div");
    row.className = "menu-item";

    const img = document.createElement("img");
    img.className = "menu-thumb";
    // try images/filename else placeholder
    const src = mi.image ? mi.image : "";
    img.src = src && (src.startsWith("http") ? src : `images/${src}`) || "images/placeholder.png";
    img.onerror = () => { (img as HTMLImageElement).src = "images/placeholder.png"; };

    const body = document.createElement("div");
    body.className = "menu-body";

    const h = document.createElement("h3");
    h.textContent = mi.name;

    const p = document.createElement("p");
    p.textContent = mi.description;

    const meta = document.createElement("div");
    meta.className = "menu-meta";

    const price = document.createElement("div");
    price.style.fontWeight = "700";
    price.textContent = `R${mi.price}`;

    const addBtn = document.createElement("button");
    addBtn.className = "small-btn small-add";
    addBtn.textContent = "Add to Cart";
    addBtn.onclick = () => { addToCart(mi); };

    const removeBtn = document.createElement("button");
    removeBtn.className = "small-btn small-rem";
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      // only chef sees remove button; but we show it conditionally below
      deleteMenuItem(mi.id);
    };

    meta.appendChild(price);
    meta.appendChild(addBtn);
    // only show remove for chef
    if (currentRole === "chef") meta.appendChild(removeBtn);

    body.appendChild(h);
    body.appendChild(p);
    body.appendChild(meta);

    row.appendChild(img);
    row.appendChild(body);

    menuList.appendChild(row);
  });
}

/* render cart */
function renderCart() {
  cartItemsDiv.innerHTML = "";
  if (!cart.length) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalEl.textContent = "Total: R0";
    return;
  }
  cart.forEach(ci => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `<div>${ci.name} x${ci.qty}</div><div>R${ci.price * ci.qty} <button style="margin-left:10px" data-remove="${ci.id}">Remove</button></div>`;
    const btn = row.querySelector("button") as HTMLButtonElement;
    btn.onclick = () => {
      removeOneFromCart(ci.id);
    };
    cartItemsDiv.appendChild(row);
  });
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  cartTotalEl.textContent = `Total: R${total}`;
}

/* cart operations */
function addToCart(mi: MenuItem) {
  const existing = cart.find(c => c.id === mi.id);
  if (existing) existing.qty += 1;
  else cart.push({ id: mi.id, name: mi.name, price: mi.price, qty: 1 });
  saveCart();
  toast(`${mi.name} added to cart`);
  renderCart();
}

function removeOneFromCart(itemId: string) {
  const idx = cart.findIndex(c => c.id === itemId);
  if (idx === -1) return;
  if (cart[idx].qty > 1) cart[idx].qty -= 1;
  else cart.splice(idx, 1);
  saveCart();
  renderCart();
}

/* menu editing (chef) */
function openAddModal() {
  itemNameInput.value = "";
  itemDescInput.value = "";
  itemCourseInput.value = "Starters";
  itemPriceInput.value = "";
  itemImageInput.value = "";
  show(addItemModal);
}
function closeAddModal() { hide(addItemModal); }

function saveMenuItem() {
  const name = itemNameInput.value.trim();
  const desc = itemDescInput.value.trim();
  const course = itemCourseInput.value.trim();
  const price = Number(itemPriceInput.value);
  const image = itemImageInput.value.trim();

  if (!name || !desc || !price || isNaN(price)) {
    toast("Please fill all fields and a valid price");
    return;
  }
  const mi: MenuItem = { id: uid(), name, description: desc, course, price, image };
  menu.unshift(mi);
  saveMenu();
  renderMenu();
  closeAddModal();
  toast("Menu item added");
}

function deleteMenuItem(id: string) {
  const idx = menu.findIndex(m => m.id === id);
  if (idx === -1) return;
  if (!confirm("Delete this menu item?")) return;
  menu.splice(idx, 1);
  saveMenu();
  renderMenu();
  toast("Item deleted");
}

/* reset cart flow */
function openResetModal() { show(resetModal); }
function closeResetModal() { hide(resetModal); }
function confirmResetCart() {
  cart = [];
  saveCart();
  renderCart();
  closeResetModal();
  toast("Cart reset");
}

/* events wiring */
function wireEvents() {
  customerLogin.onclick = () => {
    currentRole = "customer";
    enterHome();
  };
  chefLogin.onclick = () => {
    currentRole = "chef";
    enterHome();
  };

  toMenu.onclick = () => { showSection(menuScreen); refreshMenuForRole(); };
  toCart.onclick = () => { showSection(cartScreen); renderCart(); };
  backFromHome.onclick = () => { showSection(loginScreen); currentRole = null; };
  menuToCart.onclick = () => { showSection(cartScreen); renderCart(); };
  backFromMenu.onclick = () => { showSection(homeScreen); };
  backFromCart.onclick = () => { showSection(homeScreen); };
  openAddItem.onclick = openAddModal;
  cancelAddBtn.onclick = closeAddModal;
  saveItemBtn.onclick = saveMenuItem;
  toReset.onclick = openResetModal;
  confirmReset.onclick = confirmResetCart;
  cancelReset.onclick = closeResetModal;
  checkoutBtn.onclick = () => { if (!cart.length) { toast("Cart empty"); return; } alert("Checkout — demo only"); };

  // category filter
  catBtns.forEach(cb => {
    cb.addEventListener("click", () => {
      const c = (cb as HTMLElement).getAttribute("data-cat") || "All";
      renderMenu(c === "Main Course" ? "Main Course" : c);
    });
  });
}

/* called when chef or customer logs in */
function enterHome() {
  showSection(homeScreen);
  // show add item only for chef
  if (currentRole === "chef") show(openAddItem);
  else hide(openAddItem);
}

/* updates UI based on role and loads data */
function refreshMenuForRole() {
  // make remove buttons visible only for chef (render will check currentRole)
  renderMenu();
}

/* init */
function init() {
  loadMenu();
  loadCart();
  wireEvents();
  // start at login screen
  showSection(loginScreen);
}
init();
