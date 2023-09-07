let showPokemonCard = false;

showCard();

function showCard() {
  const pokemonCard = document.getElementById('pokemonCard');

  if (pokemonCard) {
    if (!showPokemonCard) {
      pokemonCard.style.display = 'none';
    } else {
      pokemonCard.style.display = 'block';
    }
  }
}

async function getPokemon() {
  const token = localStorage.getItem('gottaSaveThemAllToken');
  const pokemonData = {
    id: 683,
    name: 'Aromatisse',
    abilities: 'HealerAroma Veil',
    hp: '101',
    attack: '72',
    defense: '72',
    speedAttack: '99',
    speedDefense: '89',
    speed: '29',
    types: ['fairy'],
    artImage: 'images/art/683.png',
    iconImage: 'images/icons/683.png',
  };

  if (!showPokemonCard) {
    showPokemonCard = true;
    showCard();
  }
}

function setUpPokemonCard() {}
