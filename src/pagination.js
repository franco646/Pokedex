/* eslint-disable import/extensions */
/* eslint-disable prefer-const */
import { buscarPokemones } from './API-pokedex.js';
import { mostrarListaPokemones, mostrarCantidadPokemones, mostrarDatosPokemon } from './ui.js';
/*

export function agregarPaginas(respuestaJSON, actualizarLista) {
  const cantidadDePokemones = respuestaJSON.count;
  const cantidadDePaginas = Number(Math.ceil(cantidadDePokemones / 20));
  const cantidaDePaginasPorFila = Number(Math.floor(cantidadDePaginas / 2));

  for (let i = 1; i <= cantidaDePaginasPorFila + 1; i++) {
    const $pagina = document.createElement('li');
    $pagina.classList.add('page-item');
    $pagina.addEventListener('click', () => {
      const $itemActivo = document.querySelector('.page-item.active');
      if ($itemActivo) {
        $itemActivo.classList.remove('active');
      }
      $pagina.classList.add('active');

      actualizarLista();
    });

    document.querySelector('#paginas-fila-1').appendChild($pagina);

    const $a = document.createElement('a');
    $a.classList.add('page-link');
    $a.href = '#';
    $a.textContent = i;

    $pagina.appendChild($a);
  }

  for (let i = 1; i <= cantidaDePaginasPorFila; i++) {
    const $pagina = document.createElement('li');
    $pagina.classList.add('page-item');
    $pagina.addEventListener('click', () => {
      const $itemActivo = document.querySelector('.page-item.active');
      if ($itemActivo) {
        $itemActivo.classList.remove('active');
      }
      $pagina.classList.add('active');

      actualizarLista();
    });

    document.querySelector('#paginas-fila-2').appendChild($pagina);

    const $a = document.createElement('a');
    $a.classList.add('page-link');
    $a.textContent = i + cantidaDePaginasPorFila;

    $pagina.appendChild($a);
  }
}
*/
function manejarCambioPagina(e, callbackCambiarPagina = () => {}) {
  e.preventDefault();
  const paginaClickeada = e.target;
  const href = paginaClickeada.getAttribute('href');
  if (href === '#') {
    callbackCambiarPagina(Number(paginaClickeada.textContent));
  } else if (href === 'null') {
    return false;
  } else {
    callbackCambiarPagina(href);
  }
  return undefined;
}

function crearItemPaginador(texto, url = '#') {
  const $item = document.createElement('li');
  const $link = document.createElement('a');
  $item.className = 'page-item';
  $link.className = 'page-link';
  $link.href = url;
  $link.textContent = texto;

  $item.appendChild($link);

  return $item;
}

function agregarPaginas(
  totalPokemones,
  paginaActual,
  siguienteURL,
  anteriorURL,
  POKEMONES_POR_PAGINA,
  callbackCambiarPagina = () => {},
) {
  const paginas = document.querySelector('#paginas');
  paginas.innerHTML = '';

  const $cantidadDePaginas = Math.ceil(totalPokemones / POKEMONES_POR_PAGINA);

  const paginaAnterior = crearItemPaginador('Anterior', anteriorURL);
  paginas.appendChild(paginaAnterior);

  for (let i = 1; i <= $cantidadDePaginas; i += 1) {
    const numeroPagina = Number(i);
    const $pagina = crearItemPaginador(numeroPagina);
    if (numeroPagina === Number(paginaActual)) {
      $pagina.classList.add('active');
    }

    paginas.appendChild($pagina);
  }

  paginas.onclick = (e) => {
    manejarCambioPagina(e, callbackCambiarPagina);
  };

  const paginaSiguiente = crearItemPaginador('siguiente', siguienteURL);
  paginas.appendChild(paginaSiguiente);
}

export async function cambiarPagina(pagina) {
  const POKEMONES_POR_PAGINA = 20;
  const limite = POKEMONES_POR_PAGINA;
  let offset;
  let paginaActual;

  if (typeof pagina === 'number') {
    offset = POKEMONES_POR_PAGINA * (pagina - 1);
    paginaActual = pagina;
  } else {
    offset = Number(/offset=([0-9]+)/.exec(pagina)[1]);
    paginaActual = (offset / POKEMONES_POR_PAGINA) + 1;
  }

  const listadoDePokemones = await buscarPokemones(offset, limite);

  mostrarCantidadPokemones(listadoDePokemones.total);
  mostrarListaPokemones(listadoDePokemones.nombresDePokemones, async (pokemon) => {
    mostrarDatosPokemon(pokemon);
  });

  agregarPaginas(
    listadoDePokemones.total,
    paginaActual,
    listadoDePokemones.siguienteURL,
    listadoDePokemones.anteriorURL,
    POKEMONES_POR_PAGINA,
    cambiarPagina,
  );
}
