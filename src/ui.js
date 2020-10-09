/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
import { buscarPokemon } from './API-pokedex.js';

export function mostrarCantidadPokemones(cantidadTotalPokemones) {
  document.querySelector('#cantidad-de-pokemones').textContent = `Hay ${cantidadTotalPokemones} pokemones disponibles!`;
}

export async function mostrarListaPokemones(pokemones, callBackSeleccionado) {
  const lista = document.querySelector('#lista-pokemones');
  lista.innerHTML = '';
  pokemones.forEach((pokemon) => {
    const $pokemon = document.createElement('a');
    $pokemon.className = 'list-group-item list-group-item-action';
    $pokemon.textContent = pokemon;
    $pokemon.onclick = () => {
      callBackSeleccionado(pokemon);
      mostrarBotonesCarousel();
      const $pokemonActivo = document.querySelector('#lista-pokemones .active');
      if ($pokemonActivo) {
        $pokemonActivo.classList.remove('active');
      }
      $pokemon.classList.add('active');
    };

    lista.appendChild($pokemon);
  });
}

function mostrarBotonesCarousel() {
  document.querySelectorAll('.oculto').forEach((elemento) => {
    elemento.classList.remove('oculto');
  });
}

export async function mostrarDatosPokemon(pokemon) {
  const estadisticasPokemon = await buscarPokemon(pokemon);

  document.querySelector('#nombre-pokemon').textContent = pokemon;

  mostrarFotosPokemon(estadisticasPokemon.fotos);
  mostrarTipoPokemon(estadisticasPokemon.tipos);
  mostrarEstadisticasPokemon(estadisticasPokemon.estadisticas);
  mostrarHabilidadesPokemon(estadisticasPokemon.habilidades);
}

function mostrarFotosPokemon(fotosPokemon) {
  document.querySelector('#imagen-frente-pokemon').src = fotosPokemon.front_default;
  document.querySelector('#imagen-trasera-pokemon').src = fotosPokemon.back_default;
}

function mostrarTipoPokemon(tiposPokemon) {
  const $tipos = document.querySelector('#tipos');
  $tipos.innerHTML = 'Tipo: ';

  tiposPokemon.forEach((tipoPokemon) => {
    const tipo = document.createElement('button');
    tipo.className = `btn ${tipoPokemon} btn-sm`;
    tipo.textContent = tipoPokemon;

    $tipos.appendChild(tipo);
  });
}

function mostrarEstadisticasPokemon(estadisticas) {
  const vida = estadisticas[0];
  const ataque = estadisticas[1];
  const defensa = estadisticas[2];
  const velocidad = estadisticas[5];

  document.querySelector('#vida').textContent = vida;
  document.querySelector('#ataque').textContent = ataque;
  document.querySelector('#defensa').textContent = defensa;
  document.querySelector('#velocidad').textContent = velocidad;
}

function mostrarHabilidadesPokemon(habilidades) {
  const $habilidades = document.querySelector('#habilidades');
  $habilidades.innerHTML = '';

  habilidades.forEach((habildad) => {
    const $habilidad = document.createElement('button');
    $habilidad.className = 'btn btn-warning btn-sm';
    $habilidad.textContent = habildad;

    $habilidades.appendChild($habilidad);
  });
}
