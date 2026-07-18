const grid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');

let allProducts = [];
let activeFilter = 'all';

function renderProducts() {
  const keyword = searchInput.value.toLowerCase().trim();
  const filtered = allProducts.filter(p => {
    const matchFilter = activeFilter === 'all' || p.category === activeFilter;
    const matchSearch = keyword === '' ||
      p.name.toLowerCase().includes(keyword) ||
      p.color.toLowerCase().includes(keyword) ||
      p.category.toLowerCase().includes(keyword);
    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<p class="no-results">No scrubs found. Try a different search or filter.</p>';
    return;
  }

  grid.innerHTML = filtered.map(cardTemplate).join('');

  // add click events to each card now that they're on the page
  const cards = grid.querySelectorAll('.product-card');
  cards.forEach(card => {
    const id = Number(card.dataset.id);
    const product = filtered.find(p => p.id === id);

    const addBtn = card.querySelector('.btn-sm');
    addBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(product, 'M');
      showToast(product.name + ' added to cart!');
    });

    card.addEventListener('click', () => {
      window.location.href = 'product.html?id=' + product.id;
    });
  });
}

fetch('./data/products.json')
  .then(res => res.json())
  .then(products => {
    allProducts = products;
    renderProducts();

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        renderProducts();
      });
    });

    searchInput.addEventListener('input', renderProducts);
  });
