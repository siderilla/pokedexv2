export default class PokeService {

    static POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon/'

    constructor(limit = 20, offset = 0) {
        this.limit = limit;
        this.offset = offset;
    }

    getPokemonData() {
        const url = PokeService.POKEMON_URL + '?limit=' + this.limit + '&offset=' + this.offset;
        console.log(url);
        return fetch(url)
        .then(res => res.json())
        .then(data => {
            const requests = [];

            for (const pokemon of data.results) {
                const pokeUrl = pokemon.url;
                console.log(pokeUrl);
                const request = fetch(pokeUrl)
                .then(res => res.json())
                .then(data => data)
                .catch(err => console.error(err))
                requests.push(request);
            }

            return Promise.all(requests);
        
        })
        .catch(err => console.error(err));
    }

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