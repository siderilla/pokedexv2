export default class PokeService {

    static POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/'
	// costruttore di classe per limit e offset
    constructor(limit = 20, offset = 0) {
        this.limit = limit;
        this.offset = offset;
    }
	// metodo per fetchare i dati pokemon + impaginazione
    getPokemonData() {
        const url = PokeService.POKEMON_URL + '?limit=' + this.limit + '&offset=' + this.offset;
        console.log(url);
        return fetch(url)
        .then(res => res.json())
        .then(data => {
            const requests = [];
			// dettagli di ciascun pokemon
            for (const pokemon of data.results) {
                const pokeUrl = pokemon.url; // url + id
                console.log(pokeUrl);
                const request = fetch(pokeUrl) // salvo in request
                .then(res => res.json())
                .then(data => data) // i dati dentro pokeurl
                .catch(err => console.error(err))
                requests.push(request); // li pusho in requests come array
            }

            return Promise.all(requests); // risolvo la promessa
        
        })
        .catch(err => console.error(err));
    }
	// metodo per fetchare il pokemon con id
    getPokemonById(id) {
        const url = PokeService.POKEMON_URL + id;
        return fetch(url)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.error(err));
    }

    nextPage() {
        this.offset += this.limit;
    }

    previousPage() {
        if (this.offset > 0) {
            this.offset -= this.limit;
        }
    }
}
// funzione per il bottone homepage adatto a tutte le altre pagine ausiliarie
export function goBack() {
    window.location.href = 'index.html';
}