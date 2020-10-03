export function mostrarCantidadDePokemones(respuestaJSON) {
  const cantidadDePokemones = respuestaJSON.count;

  document.querySelector('#cantidad-de-pokemones').textContent = `Hay ${cantidadDePokemones} pokemones disponibles!`;

  return cantidadDePokemones;
}

export async function agregarListaPokemones(respuestaJSON, callbackSeleccionado) {
  for (let i = 0; i < 20; i += 1) {
    const nombrePokemon = respuestaJSON.results[i].name;
    const $lista = document.createElement('li');
    $lista.classList.add('list-group-item');
    $lista.textContent = nombrePokemon;
    $lista.addEventListener('click', () => {
      const $itemActivo = document.querySelector('.active');
      if ($itemActivo) {
        $itemActivo.classList.remove('active');
      }
      $lista.classList.add('active');

      callbackSeleccionado();
    });

    document.querySelector('#lista-pokemones').appendChild($lista);
  }
}

export function mostrarDatosPokemon(respuestaJSON) {
  document.querySelector('#nombre-pokemon').textContent = respuestaJSON.name;
  document.querySelector('#imagen-frente-pokemon').src = respuestaJSON.sprites.front_default;
  document.querySelector('#imagen-trasera-pokemon').src = respuestaJSON.sprites.back_default;
}

export function mostrarEstadisticas(pokemon) {
  document.querySelectorAll('.tipo-de-pokemon').forEach((tipoPokemon) => {
    tipoPokemon.remove();
  });
  document.querySelectorAll('.habilidad').forEach((habilidad) => {
    habilidad.remove();
  });

  pokemon.types.forEach((tiposDePokemon) => {
    const tipoPokemon = tiposDePokemon.type.name;

    const $boton = document.createElement('button');
    $boton.classList.add('btn', 'btn-primary', 'btn-sm', 'tipo-de-pokemon');
    $boton.textContent = tipoPokemon;

    document.querySelector('#tipo').appendChild($boton);
  });

  document.querySelector('#vida').textContent = pokemon.stats[0].base_stat;
  document.querySelector('#ataque').textContent = pokemon.stats[1].base_stat;
  document.querySelector('#defensa').textContent = pokemon.stats[2].base_stat;
  document.querySelector('#velocidad').textContent = pokemon.stats[5].base_stat;

  pokemon.abilities.forEach((habilidades) => {
    const habilidad = habilidades.ability.name;

    const $boton = document.createElement('button');
    $boton.classList.add('btn', 'btn-warning', 'habilidad');
    $boton.textContent = habilidad;

    document.querySelector('#habilidades').appendChild($boton);
  });
}

export function removerPaginaAnterior() {
  document.querySelectorAll('#lista-pokemones li').forEach((pokemon) => {
    pokemon.remove();
  });
}

export function paginaActiva() {
  const $paginaActiva = Number(document.querySelector('.page-item.active').textContent);
  const pagina = Number($paginaActiva - 1) * 20;

  return pagina;
}
