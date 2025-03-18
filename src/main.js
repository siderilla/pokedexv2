import PokeService from "./services/poke-service.js";

const pService = new PokeService();
pService.getPokemonData().then(data => render(data));


function next() {
  pService.nextPage();
  pService.getPokemonData().then(data => render(data));
}
window.next = next;

function previous() {
  pService.previousPage();
  pService.getPokemonData().then(data => render(data));
}

window.previous = previous;


function render(data) {
  const mainContainer = document.querySelector('#main-container');
  mainContainer.innerHTML = '';

for (const pokemon of data) {
  const pokeLink = document.createElement('a');
  const img = document.createElement('img');
  img.src = pokemon.sprites.front_default;

  pokeLink.appendChild(img);

  const node = document.createTextNode(pokemon.name);
  pokeLink.appendChild(node);

  mainContainer.appendChild(pokeLink);
}

  

// console.log(data);

}

