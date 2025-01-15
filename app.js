const pokemonList = document.getElementById('pokemon-list');

// Working fetch from local file ----------------------------------------------
// const backupData = fetch("./src/pokemon.json")
// .then(response => response.json())
// .then(data => inputFetchedData(data))
// .catch(error => console.error('Error:', error));


// Inputs fetched data into the DOM -------------------------------------------
function inputFetchedData(data) {
    data.forEach(pokemon => {
        const listItem = document.createElement('li');
        listItem.appendChild(addImage(pokemon));
        listItem.appendChild(addLink(pokemon));
        // listItem.appendChild(addType(pokemon)); // Uncomment if needed
        pokemonList.appendChild(listItem);
    });
    pokemonList.style.paddingBottom = '5rem';
}

// add pokemon IMG inputFetchedData PT1 ------------------------------------------------
function addImage(pokemon) {
    const image = document.createElement('img');
    image.classList.add('aspect-[14/13]', 'w-full', 'object-cover');
    image.src = pokemon.front_default;
    image.alt = pokemon.name;
    return image;
}


// add pokemon LINK inputFetchedData PT2 ------------------------------------------------
function addLink(pokemon) {
    const link = document.createElement('a');
    link.classList.add('mt-6', 'text-lg/8', 'font-semibold', 'tracking-tight', 'text-white', 'text-center', 'capitalize', 'block');
    link.innerText = pokemon.name;
    link.target = '_blank';
    link.href = `https://pokemon.fandom.com/wiki/${pokemon.name}`;
    return link;
}


// Fetchs data from JSONBin.io ------------------------------------------------
async function getJSONBin() {
    const url = 'https://api.jsonbin.io/v3/b/677c9ed5e41b4d34e4710c65';
    const headers = {
        "X-Access-Key": "$2a$10$BrpvJ5jwEvoRMRVWxcvUD.tBfRzfOWPKVubo6s7N3MZUiz3/MQaIq",
        "Content-Type": "application/json"
    };

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
    .then(data => inputFetchedData(data.record))
    .catch(error => console.error('Error:', error));
}

getJSONBin();


