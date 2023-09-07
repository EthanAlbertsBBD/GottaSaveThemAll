const imageUrl = 'https://d1kldfsghb88ai.cloudfront.net/';
let showPokemonCard = false;

showCard();

const card_items_reference = {
  hp: "pokemon-hp",
  art: "pokemon-art",
  types: "pokemon-type",
  attack: "pokemon-attack",
  defence: "pokemon-defense",
  speed: "pokemon-speed"
}

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
  fetch(`http://localhost:8080/api/pokemons/random`, {
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


async function getCollection() {  
  Array.from(document.getElementsByClassName("capture-pokemon-button")).forEach(element => {
    element.style.display = 'none';
  });
  const reference_card: HTMLElement | null = document.getElementById('pokemonCard');
  const collection: HTMLElement | null = document.getElementById('collection');

  if (!reference_card || !collection) {
    return;
  }
  reference_card.style.display = 'none';

  const token = localStorage.getItem('gottaSaveThemAllToken');
  const headers = {
    Authorization: 'Bearer ' + token,
  };
  fetch(`http://localhost:8080/api/pokemons/random`, {
    headers: headers,
  })
    .then((resp) => resp.json())
    .then((data) => 
      data.forEach((card) => {
        console.log("HERE", card)
        const copy: HTMLElement = (reference_card.cloneNode(true))
        copy.id = ""
        Array.from(copy.children).forEach((child: Element) => {
          if (child.classList.contains(card_items_reference.art)){
            child.textContent = card.artImage;
            console.log("Art")
          }
          if (child.classList.contains(card_items_reference.hp)){
            child.textContent = "HP: " + card.hp;
          }
          if (child.classList.contains(card_items_reference.attack)){
            child.textContent = "Attack: " + card.attack;
          }
          if (child.classList.contains(card_items_reference.defence)){
            child.textContent = "Defense: " + card.defense;
          }
          if (child.classList.contains(card_items_reference.speed)){
            child.textContent = "Speed: " + card.speed;
          }
          if (child.classList.contains(card_items_reference.types)){
            child.textContent = "Types: " + card.types.join(" ").toUpperCase();
          }
        });
        copy.style.display = 'block'
        collection.appendChild(copy)
      })
    );

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
