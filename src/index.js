/* eslint-disable import/extensions */
import {
  buscarPokemones,
  buscarPokemon,
} from './API-pokedex.js';

import {
  mostrarCantidadDePokemones,
  agregarListaPokemones,
  mostrarDatosPokemon,
  removerPaginaAnterior,
  paginaActiva,
  mostrarEstadisticas,
} from './ui.js';

import {
  agregarPaginas,
} from './pagination.js';

import {
  verificarPokemonSeleccionado,
} from './verificacion.js';

async function actualizarPokemon() {
  const pokemon = await buscarPokemon(verificarPokemonSeleccionado());
  mostrarDatosPokemon(pokemon);
  mostrarEstadisticas(pokemon);
}
async function actualizarPagina() {
  removerPaginaAnterior();
  agregarListaPokemones(await buscarPokemones(paginaActiva()), actualizarPokemon);
}

async function inicializar() {
  console.log("inicializar")
  const listaPokemones = await buscarPokemones();
  mostrarCantidadDePokemones(listaPokemones);
  agregarPaginas(listaPokemones, actualizarPagina);
  agregarListaPokemones(listaPokemones, actualizarPokemon);
}

inicializar();
