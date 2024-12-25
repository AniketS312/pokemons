const pokemonList = document.getElementById('pokemon-list');
const pokemonData =fetch("./src/pokemon.json")
.then(response => response.json())
.then(data => inputFetchedData(data))
.catch(error => console.error('Error:', error));



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


function addImage(pokemon) {
    const image = document.createElement('img');
    image.classList.add('aspect-[14/13]', 'w-full', 'object-cover');
    image.src = pokemon.front_default;
    image.alt = pokemon.name;
    return image;
}



function addLink(pokemon) {
    const link = document.createElement('a');
    link.classList.add('mt-6', 'text-lg/8', 'font-semibold', 'tracking-tight', 'text-white', 'text-center', 'capitalize', 'block');
    link.innerText = pokemon.name;
    link.target = '_blank';
    link.href = `https://pokemon.fandom.com/wiki/${pokemon.name}`;
    return link;
}

// function addType(pokemon) {
//     const type = document.createElement('a');
//     type.attributes
//     type.classList.add('text-base/7', 'text-gray-300');
//     type.innerText = "Link";
//     return type;
// }

// function addName(pokemon) {
//     const name = document.createElement('h3');
//     name.classList.add('mt-6', 'text-lg/8', 'font-semibold', 'tracking-tight', 'text-white', 'text-center');
//     name.innerText = pokemon.name;
//     return name;
// }