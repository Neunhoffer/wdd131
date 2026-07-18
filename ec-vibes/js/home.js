const grid = document.getElementById('featured-grid');

fetch('./data/products.json')
  .then(res => res.json())
  .then(products => {
    const featured = products.filter(p => p.featured);
    grid.innerHTML = featured.map(cardTemplate).join('');

    grid.addEventListener('click', e => {
      const btn = e.target.closest('.btn-sm');
      const card = e.target.closest('.product-card');
      if (btn && card) {
        e.preventDefault();
        const id = Number(card.dataset.id);
        const product = products.find(p => p.id === id);
        addToCart(product, 'M');
        showToast(product.name + ' added to cart!');
      } else if (card) {
        window.location.href = 'product.html?id=' + card.dataset.id;
      }
    });
  });
