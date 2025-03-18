import PokeService, { goBack } from "./services/poke-service.js";

const pService = new PokeService();

const queryParams = new URLSearchParams(window.location.search);
const pokemonId = queryParams.get('id');

pService.getPokemonById(pokemonId).then(pokemon => {
  if (pokemon) {
    const sprite = pokemon.sprites.front_default;

    const spriteElement = document.createElement('img');
    spriteElement.src = sprite;
    spriteElement.alt = pokemon.name;
    document.getElementById('sprite-pokemon-container').appendChild(spriteElement);
    
    document.getElementById('poke-name').textContent = pokemon.name;
  } else {
    console.error('Pokemon not found');
  }
}).catch(err => console.error(err));

window.goBack = goBack;

// getPokemonId() {
// 	fetch(POKEMON_URL)
// 	.then(res => res.json())
// 	.then(data => {
// 		10277 totali
// 	})
// }