const container = document.getElementById('cart-container');

function renderCart() {
  const cart = getCart();
  updateCartCount();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is empty.</p>
        <a href="shop.html">Browse scrubs &rarr;</a>
      </div>`;
    return;
  }

  const itemsHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
      <div class="cart-item-swatch" style="background-color:${item.colorHex}"></div>
      <div>
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-meta">${item.color} &middot; Size: ${item.size}</p>
      </div>
      <div class="cart-item-controls">
        <div class="qty-controls">
          <button class="qty-dec">&#8722;</button>
          <span>${item.qty}</span>
          <button class="qty-inc">+</button>
        </div>
        <p class="item-price">$${(item.price * item.qty).toFixed(2)}</p>
        <button class="remove-btn">Remove</button>
      </div>
    </div>`).join('');

  container.innerHTML = itemsHTML + `
    <div class="cart-summary">
      <p class="cart-total">Total: $${cartTotal().toFixed(2)}</p>
      <a href="contact.html" class="btn">Checkout</a>
    </div>`;

  document.querySelectorAll('.cart-item').forEach(row => {
    const id = Number(row.dataset.id);
    const size = row.dataset.size;

    row.querySelector('.qty-inc').addEventListener('click', () => {
      const item = getCart().find(i => i.id === id && i.size === size);
      if (item) { updateQty(id, size, item.qty + 1); renderCart(); }
    });

    row.querySelector('.qty-dec').addEventListener('click', () => {
      const item = getCart().find(i => i.id === id && i.size === size);
      if (item) {
        if (item.qty <= 1) { removeFromCart(id, size); } else { updateQty(id, size, item.qty - 1); }
        renderCart();
      }
    });

    row.querySelector('.remove-btn').addEventListener('click', () => {
      removeFromCart(id, size);
      renderCart();
    });
  });
}

renderCart();
