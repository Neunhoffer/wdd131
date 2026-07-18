const CART_KEY = 'ec-vibes-cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product, size) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id && i.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      color: product.color,
      colorHex: product.colorHex,
      size: size,
      qty: 1
    });
  }
  saveCart(cart);
  updateCartCount();
}

function removeFromCart(id, size) {
  const filtered = getCart().filter(i => !(i.id === id && i.size === size));
  saveCart(filtered);
  updateCartCount();
}

function updateQty(id, size, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id && i.size === size);
  if (item) item.qty = qty;
  saveCart(cart);
  updateCartCount();
}

function cartTotal() {
  const cart = getCart();
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].qty;
  }
  return total;
}

function updateCartCount() {
  const cart = getCart();
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    count += cart[i].qty;
  }
  const el = document.getElementById('cart-count');
  if (el) el.textContent = count;
}

function cardTemplate(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="card-img">
        <img src="${product.image}" alt="${product.name}">
        <span class="color-chip" style="background-color:${product.colorHex}">${product.color}</span>
      </div>
      <div class="card-body">
        <p class="card-category">${product.category}</p>
        <h3 class="card-name">${product.name}</h3>
        <div class="card-footer">
          <span class="card-price">$${product.price}.00</span>
          <button class="btn-sm">Add to Cart</button>
        </div>
      </div>
    </div>`;
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

updateCartCount();
