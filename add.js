let totalPokemons;
const form = document.querySelector('#submit-pokemon');
const pokemonName = document.querySelector('#name');
    form.addEventListener('submit', (event) => {
        event.preventDefault();       
        checkPokemonListing(pokemonName.value);
    });

    async function checkPokemonListing(name) {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/ `)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => checkDataGiven(data))
        .catch(error => alert("Pokemon not found!"));
    }


async function checkDataGiven(data) {
    if(data.count) {
        alert('Please Type in a pokemon name')
    } else if (data.name) {

        const url = 'https://api.jsonbin.io/v3/b/677c9ed5e41b4d34e4710c65',
        headers = {
            "X-Access-Key": "$2a$10$BrpvJ5jwEvoRMRVWxcvUD.tBfRzfOWPKVubo6s7N3MZUiz3/MQaIq",
            "Content-Type": "application/json"
        },
        dataName = data.name,
        dataId = data.id;
    
        await fetch(url, {
            method: 'GET',
            headers: headers
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => totalPokemons =  data.record)
        .then(data => checkIfPokemonExists(data, dataName, dataId))
        .catch(error => console.error('Error:', error));
    }
}

 function checkIfPokemonExists(data, name, id) {
    const url = 'https://api.jsonbin.io/v3/b/677c9ed5e41b4d34e4710c65',
    headers = {
        "X-Access-Key": "$2a$10$BrpvJ5jwEvoRMRVWxcvUD.tBfRzfOWPKVubo6s7N3MZUiz3/MQaIq",
        "Content-Type": "application/json",
    },
    pokemonAppended = [...totalPokemons, {name: name, url: `https://pokeapi.co/api/v2/pokemon/${id}/`, front_default:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}];

    data.find(pokemon => pokemon.name === name) ? alert('Pokemon already exists!') : postPokemon(url,headers , pokemonAppended);
      
    async function postPokemon(url, headers, pokemonAppended) {
        await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(pokemonAppended)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        }).then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
   
}