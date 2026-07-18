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
  } else {
    grid.innerHTML = filtered.map(cardTemplate).join('');
  }
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

    grid.addEventListener('click', e => {
      const btn = e.target.closest('.btn-sm');
      const card = e.target.closest('.product-card');
      if (btn && card) {
        e.preventDefault();
        const id = Number(card.dataset.id);
        const product = allProducts.find(p => p.id === id);
        addToCart(product, 'M');
        showToast(product.name + ' added to cart!');
      } else if (card) {
        window.location.href = 'product.html?id=' + card.dataset.id;
      }
    });
  });
