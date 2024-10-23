function buscarPokemon() {
    const pokemonInput = document.getElementById('pokemon-input').value.trim().toLowerCase();
    if (pokemonInput === "") {
        alert("Por favor, ingresa el nombre o número de un Pokémon.");
        return;
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`; 

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontró el Pokémon');
            }
            return response.json(); // Convertir la respuesta a formato JSON
        })
        .then(data => {
            verPokemon(data); // Llamar a la función para mostrar los datos del Pokémon
        })
        .catch(error => {
            const pokemonInfo = document.getElementById('no-existe');
            pokemonInfo.style.display = 'flex'
            pokemonInfo.innerHTML = `<p>${error.message}</p>`;
        });
}

function verPokemon(pokemon) {
    const pokemonInfo = document.getElementById('pokemon-info');
    pokemonInfo.style.display = 'flex'
    pokemonInfo.innerHTML = `
        <h2>${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <div>
        <p><strong>ID:</strong> ${pokemon.id}</p>
        <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
        <p><strong>Tipo:</strong> ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        </div>
    `;
}