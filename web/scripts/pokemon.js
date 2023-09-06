const token = localStorage.getItem('gottaSaveThemAllToken');
let showPokemonCard = false;
let pokemonCard = document.getElementById('pokemonCard');

// let pokemonHp = '50';
// var myVariable = 'Hello, World!';
// var outputElement = document.getElementById('variableOutput');
// outputElement.textContent = myVariable;
showCard();

function showCard() {
  if (!showPokemonCard) {
    pokemonCard.style.display = 'none';
  } else {
    pokemonCard.style.display = 'block';
  }
}

function getPokemon() {
  showPokemonCard = true;
  showCard();
}
