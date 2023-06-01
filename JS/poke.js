const pokemonName = document.querySelector('.pokemonName');
const pokemonID = document.querySelector('.pokemonID');
const imgPokemon = document.querySelector('.imgPokemon');

const form = document.querySelector('.form');
const buscar = document.querySelector('#pesquisaNome');




const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

const typeColors  = Object.keys(colors);

console.log(colors)

//Adciona evento keyup no input com ID "quantidade"
var quantidade = document.getElementById ('quantidade');
quantidade.addEventListener('keyup',()=>{
    renderPokemon(quantidade.value)
})



    //funçao asincrona que retorna a API 
const fetchpokemos = async (pokemon)=>{
    const ApiResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
    const data = await ApiResponse.json();
    return data;
}

//Busca os dados da funçao Fetchpokemons 
//E no possibilita exibir exibir esse dados na tela

const renderPokemon = async (pokemon)=>{
    const data = await fetchpokemos(pokemon);
    const pokemoBoxes = document.querySelector(".pokemon-boxes");
    pokemoBoxes.innerHTML =`
            <div class="pokemon-box">
                <img class="imgPokemon" src="`+data.sprites.front_default+`">
                <p class="pokemonID">#`+data.id+`</p>
                <p class="pokemonName">`+data.name.toUpperCase()+`</p>
                <small l class="type">Type:`+data.types[0].type.name+`</small>
            </div>`

}

//pesquisa Pokemons pelo nome ou ID
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(buscar.value);
    buscar.value = ''
  });



//BUSCA POKEMON PELO NUMERO Q O USUSARIO ESQUECREVEU
// EX: PEGAPOKEMON == 10 ENTÃO IRAO APRAECER OS 10 PRIMEIROS POKEMONS DA LISTA

//PEGA O NUMERO QUE O USUARIO ESCREVEU

var quantidade = document.getElementById ('quantidade');
quantidade.addEventListener('keyup', ()=>{
    pegapokemons(quantidade.value);
});

pegapokemons(12);
function pegapokemons(quantidade){
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+quantidade)
    .then(response => response.json())
    .then(allpokemon => {
    
        var  pokemons = [];

        allpokemon.results.map((val)=>{
          
            fetch(val.url)
            .then(response => response.json())
            .then(pokemonsingle => {
                /*console.log(pokemonsingle)*/
                pokemons.push({nome:val.name, imagem:pokemonsingle.sprites.front_default, id:pokemonsingle.id, tipe:pokemonsingle.types[0].type.name});
            
             
                if(pokemons.length == quantidade){

                    var pokemoBoxes = document.querySelector(".pokemon-boxes");
                    pokemoBoxes.innerHTML = ""; 
                    
                    pokemons.map(function(val){
                    pokemoBoxes.innerHTML += `
                    <div class="pokemon-box">
                        <img src="`+val.imagem+`">
                        <p>#`+val.id+`</p>
                        <p>`+val.nome+`</p>
                        <small class="type">Type:`+val.tipe+`</small>
                    </div>`   

                    })


                }
            })
        })
        

    })
}





