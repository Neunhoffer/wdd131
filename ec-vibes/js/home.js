const grid = document.getElementById('featured-grid');

fetch('./data/products.json')
  .then(res => res.json())
  .then(products => {
    const featured = products.filter(p => p.featured);
    grid.innerHTML = featured.map(cardTemplate).join('');

    // add click events to each card now that they're on the page
    const cards = grid.querySelectorAll('.product-card');
    cards.forEach(card => {
      const id = Number(card.dataset.id);
      const product = featured.find(p => p.id === id);

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
  });
