import PokeService, { goBack } from "./services/poke-service.js";

const pService = new PokeService();

// Fetch and render Pokémon types in the navbar
fetch('https://pokeapi.co/api/v2/type')
  .then(res => res.json())
  .then(data => renderTypes(data.results))
  .catch(err => console.error(err));

// Get the type from the query parameters
const queryParams = new URLSearchParams(window.location.search);
const type = queryParams.get('type');

// Fetch and filter Pokémon by type
filterByType(type);

function filterByType(type) {
    if (type === 'all') {
        pService.getPokemonData().then(data => render(data));
    } else {
        pService.getPokemonData().then(data => {
            const filteredData = data.filter(pokemon => 
                pokemon.types.some(t => t.type.name === type)
            );
            render(filteredData);
        }).catch(err => console.error(err));
    }
}

function render(data) {
    const typeContainer = document.querySelector('#type-container');
    typeContainer.innerHTML = '';

    for (const pokemon of data) {
        const pokeLink = document.createElement('a');
        pokeLink.href = `detail.html?id=${pokemon.id}`;
        
        const img = document.createElement('img');
        img.src = pokemon.sprites.front_default;
        pokeLink.appendChild(img);

        const node = document.createTextNode(pokemon.name);
        pokeLink.appendChild(node);

        typeContainer.appendChild(pokeLink);
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

window.goBack = goBack;