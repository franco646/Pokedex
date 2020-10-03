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
