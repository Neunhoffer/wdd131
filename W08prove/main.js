const character = {
  name: 'Snortleblat',
  class: 'Swamp Beast Diplomat',
  level: 8,
  health: 100,
  image: 'snortleblat.pdf',

  attacked() {
    this.health -= 20;
    if (this.health <= 0) {
      this.health = 0;
      renderCard();
      alert(`${this.name} has died!`);
    } else {
      renderCard();
    }
  },

  levelUp() {
    this.level += 1;
    renderCard();
  }
};

function renderCard() {
  document.querySelector('#characterName').textContent = character.name;
  document.querySelector('#characterClass').textContent = character.class;
  document.querySelector('#characterLevel').textContent = character.level;
  document.querySelector('#characterHealth').textContent = character.health;
  document.querySelector('#characterImg').src = character.image;
}

document.querySelector('#attackedBtn').addEventListener('click', () => {
  character.attacked();
});

document.querySelector('#levelUpBtn').addEventListener('click', () => {
  character.levelUp();
});

renderCard();
