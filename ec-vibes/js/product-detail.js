const params = new URLSearchParams(window.location.search);
const id = Number(params.get('id'));
const container = document.getElementById('product-container');

let selectedSize = null;

fetch('./data/products.json')
  .then(res => res.json())
  .then(products => {
    const product = products.find(p => p.id === id);

    if (!product) {
      container.innerHTML = '<p style="padding:2rem;color:var(--muted)">Product not found. <a href="shop.html">Back to shop</a></p>';
      return;
    }

    document.title = product.name + ' – EC Vibes';

    container.innerHTML = `
      <div class="product-detail">
        <div class="detail-img">
          <img src="${product.image}" alt="${product.name}">
          <span class="color-chip" style="background-color:${product.colorHex}">${product.color}</span>
        </div>
        <div class="detail-info">
          <p class="category-tag">${product.category}</p>
          <h1>${product.name}</h1>
          <p class="detail-price">$${product.price}.00</p>
          <p class="detail-description">${product.description}</p>
          <span class="size-label">Select Size</span>
          <div class="size-options">
            ${product.sizes.map(s => `<button class="size-btn" data-size="${s}">${s}</button>`).join('')}
          </div>
          <button class="add-to-cart-btn" id="add-btn">Add to Cart</button>
        </div>
      </div>`;

    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedSize = btn.dataset.size;
      });
    });

    document.getElementById('add-btn').addEventListener('click', () => {
      if (!selectedSize) {
        showToast('Please select a size first.');
        return;
      }
      addToCart(product, selectedSize);
      showToast(product.name + ' (' + selectedSize + ') added to cart!');
    });
  });
