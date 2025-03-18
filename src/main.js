import PokeService from "./services/poke-service.js";

const pService = new PokeService();

// fetch e rendering dei dati
pService.getPokemonData().then(data => render(data));

// Fetch and render Pokémon types in the navbar
fetch('https://pokeapi.co/api/v2/type')
  .then(res => res.json())
  .then(data => renderTypes(data.results))
  .catch(err => console.error(err));

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

// render dei dati con queryselector nel maincontainer
function render(data) {
  const mainContainer = document.querySelector('#main-container');
  // pulisco la pagina ad ogni aggiornamento
  mainContainer.innerHTML = '';

  // per ogni data di pokemon
  for (const pokemon of data) {
    const pokeLink = document.createElement('a'); // salvo la creazione di un nuovo elemento link
    pokeLink.href = `detail.html?id=${pokemon.id}`; // a cui aggancio detail.html + id...
    
    const img = document.createElement('img'); // elemento immagine
    img.src = pokemon.sprites.front_default; // accedo agli sprites nell'oggetto
    pokeLink.appendChild(img);

    const node = document.createTextNode(pokemon.name);
    pokeLink.appendChild(node);

    mainContainer.appendChild(pokeLink);
  }
}

// Render Pokémon types in the navbar
function renderTypes(types) {
  const nav = document.querySelector('nav');
  types.forEach(type => {
    const button = document.createElement('a');
    button.textContent = type.name;
    button.href = `type.html?type=${type.name}`;
    button.classList.add('type-button'); // Add class for styling
    nav.appendChild(button);
  });

  // Add a button to show all Pokémon
  const allButton = document.createElement('a');
  allButton.textContent = 'All';
  allButton.href = 'index.html';
  allButton.classList.add('type-button'); // Add class for styling
  nav.appendChild(allButton);
}

// filtra per tipo
function filterByType(type) {
    if (type === 'all') {
        pService.getPokemonData().then(data => render(data));
    } else {
        pService.getPokemonData().then(data => {
            const filteredData = data.filter(pokemon => 
                pokemon.types.some(t => t.type.name === type) // dovrei essere nel nome type annidato nell'array dell'oggetto
            );
            render(filteredData);
        }).catch(err => console.error(err));
    }
}

window.filterByType = filterByType;