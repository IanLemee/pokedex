const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImg = document.querySelector('.pokemon__img')

const pokemonPrev = document.querySelector('.btn-prev')
const pokemonNext = document.querySelector('.btn-next')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
 const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

 if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
 }
};

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if (data) {
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = '';
        searchPokemon = data.id 
    } else {
        pokemonName.innerHTML = 'Not Founded ;-;'
        pokemonNumber.innerHTML = ''
        pokemonImg.src = ''
    }

}



form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
})

pokemonPrev.addEventListener('click', (event) => {
    if (searchPokemon > 1 ) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
})

pokemonNext.addEventListener('click', (event) => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)