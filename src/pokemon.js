/* eslint-disable import/extensions */
import {
  ListadoPokemones,
} from './listadopokemones.js';

import {
  EstadisticasPokemon,
} from './estadisticasPokemon.js';

export function mapearListadoPokemones(datosAPI) {
  const {
    count: total,
    next: siguienteURL,
    previous: anteriorURL,
    results: resultados,
  } = datosAPI;

  return new ListadoPokemones(
    total,
    siguienteURL,
    anteriorURL,
    resultados.map((pokemon) => pokemon.name),
  );
}

export function mapearEstadisticarPokemon(datosAPI) {
  const {
    abilities: habilidades,
    sprites: fotos,
    stats: estadisticas,
    types: tipos,
  } = datosAPI;

  return new EstadisticasPokemon(
    habilidades.map((habilidad) => habilidad.ability.name),
    fotos,
    estadisticas.map((estadistica) => estadistica.base_stat),
    tipos.map((tipo) => tipo.type.name),
  );
}
