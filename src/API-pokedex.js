export function buscarPokemones(pagina) {
  return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pagina}&limit=20`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => respuestaJSON);
}

export function buscarPokemon(pokemon) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((respuesta) => respuesta.json())
    .then((respuestaJSON) => respuestaJSON);
}
