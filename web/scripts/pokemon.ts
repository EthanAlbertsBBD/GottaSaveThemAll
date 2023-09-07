const imageUrl = 'https://d1kldfsghb88ai.cloudfront.net/';
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
  showPokemonCard = false;
  showCard();
  const token = localStorage.getItem('gottaSaveThemAllToken');
  const headers = {
    Authorization: 'Bearer ' + token,
  };
  fetch(`https://qf78x42ctm.eu-west-1.awsapprunner.com/api/pokemons/random`, {
    headers: headers,
  })
    .then((resp) => resp.json())
    .then((data) => {
      setUpPokemonCard(data);
      if (!showPokemonCard) {
        showPokemonCard = true;
        showCard();
      }
    });
}

function setUpPokemonCard(pokemonData: JSON) {
  const pokemonHp = document.getElementById('pokemonHp');
  const pokemonType = document.getElementById('pokemonType');
  const pokemonAttack = document.getElementById('pokemonAttack');
  const pokemonDefense = document.getElementById('pokemonDefense');
  const pokemonSpeed = document.getElementById('pokemonSpeed');
  const pokemonArt = document.getElementById('pokemonArt');

  if (
    pokemonHp &&
    pokemonType &&
    pokemonAttack &&
    pokemonDefense &&
    pokemonSpeed &&
    pokemonArt
  ) {
    pokemonArt.src = imageUrl + pokemonData['artImage'];
    pokemonHp.textContent = `HP: ${pokemonData['hp']}`;
    pokemonType.textContent = `Type: ${pokemonData['types']}`;
    pokemonAttack.textContent = `Attack: ${pokemonData['attack']}`;
    pokemonDefense.textContent = `Defense: ${pokemonData['defense']}`;
    pokemonSpeed.textContent = `Speed: ${pokemonData['speed']}`;
  }
}
