/* eslint-disable import/extensions */
import {
  mapearListadoPokemones,
  mapearEstadisticarPokemon,
} from './pokemon.js';

export async function buscarPokemones(offset = 0, limite = 20) {
  return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limite}`)
    .then((respuesta) => respuesta.json())
    .then((DatosPokemones) => {
      const pokemones = mapearListadoPokemones(DatosPokemones);

      return pokemones;
    });
}

export function buscarPokemon(pokemon) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((respuesta) => respuesta.json())
    .then((DatosPokemon) => {
      const estadisticasPokemon = mapearEstadisticarPokemon(DatosPokemon);

      return estadisticasPokemon;
    });
}
