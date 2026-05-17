const menuBtn = document.querySelector('#menu-btn');
const mainNav = document.querySelector('#main-nav');
const modal = document.querySelector('#modal');
const modalImg = document.querySelector('#modal-img');
const modalClose = document.querySelector('#modal-close');

menuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});

function openModal(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt;
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    modalImg.src = '';
}

document.querySelector('.gallery').addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        openModal(e.target.src, e.target.alt);
    }
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
