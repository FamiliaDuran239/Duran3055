// script.js

// Películas sueltas (sin episodios)
const peliculasSueltas = [
  { tipo: "pelicula", titulo: "Clásico 2", img: "img/Zotopia2.jpg", link: "https://mega.nz/embed/ID2#CLAVE2" },
  { tipo: "pelicula", titulo: "Clásico 3", img: "img/3.jpg", link: "https://mega.nz/embed/ID3#CLAVE3" },
  { tipo: "pelicula", titulo: "Clásico 4", img: "img/4.jpg", link: "https://mega.nz/embed/ID4#CLAVE4" },
  { tipo: "pelicula", titulo: "Clásico 5", img: "img/5.jpg", link: "https://mega.nz/embed/ID5#CLAVE5" },
  { tipo: "pelicula", titulo: "Clásico 6", img: "img/6.jpg", link: "https://mega.nz/embed/ID6#CLAVE6" },
  { tipo: "pelicula", titulo: "Clásico 7", img: "img/7.jpg", link: "https://mega.nz/embed/ID7#CLAVE7" },
  { tipo: "pelicula", titulo: "Clásico 8", img: "img/8.jpg", link: "https://mega.nz/embed/ID8#CLAVE8" },
  { tipo: "pelicula", titulo: "Clásico 9", img: "img/9.jpg", link: "https://mega.nz/embed/ID9#CLAVE9" },
  { tipo: "pelicula", titulo: "Clásico 10", img: "img/10.jpg", link: "https://mega.nz/embed/ID10#CLAVE10" }
];

// Series (por ahora solo "El Encargado")
const series = {
  // Dentro de const series = { ... }
"El Encargado": [
  { 
    episodio: 1, 
    titulo: "El Encargado - T3 E01", 
    img: "img/Encargado.jpg", 
    link: "https://www.dropbox.com/scl/fi/9p2x1kbsc3xlgvawhpiii/ElencargadoT3E1.mp4?rlkey=uvaib3uieqffizznvb4j7i6rf&st=gbs8wq5g&raw=1"
  },
  // Para episodios 2, 3, etc., haz lo mismo: cambia &dl=0 por &raw=1 en sus links compartidos
  { 
    episodio: 2, 
    titulo: "El Encargado - T3 E02", 
    img: "img/Encargado.jpg", 
    link: "https://www.dropbox.com/scl/fi/OTRO_ID/ElencargadoT3E2.mp4?rlkey=OTRO_RLKEY&st=OTRO_ST&raw=1"
  },
  // ... más episodios
]
};

// Portadas que se muestran en la grilla (primera de cada serie + películas sueltas)
const portadasGrilla = [
  series["El Encargado"][0],   // El Encargado empieza en el episodio 1
  ...peliculasSueltas
];

const grid         = document.getElementById("gridPeliculas");
const player       = document.getElementById("player");
const frame        = document.getElementById("frameVideo");
const titulo       = document.getElementById("playerTitulo");
const cerrarBtn    = document.getElementById("cerrarBtn");
const btnVolver    = document.getElementById("btnVolver");
const btnSiguiente = document.getElementById("btnSiguiente");

let itemActual    = null;     // el objeto que se está reproduciendo
let listaActual   = null;     // array de episodios (solo si es serie)
let indiceEnLista = -1;

// Crear las tarjetas en la grilla
portadasGrilla.forEach((item, idx) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<img src="${item.img}" alt="${item.titulo}">`;
  card.onclick = () => abrirItem(item);
  grid.appendChild(card);
});

function abrirItem(item) {
  itemActual = item;

  // Si es película suelta
  if (item.tipo === "pelicula") {
    listaActual = null;
    indiceEnLista = -1;
    titulo.textContent = item.titulo;
    frame.src = item.link;
    player.style.display = "flex";
    actualizarBotones();
    return;
  }

  // Si es serie (por ahora solo El Encargado)
  const nombreSerie = "El Encargado";
  listaActual = series[nombreSerie];
  
  // Buscamos el índice del episodio actual
  indiceEnLista = listaActual.findIndex(ep => ep.link === item.link);
  if (indiceEnLista === -1) indiceEnLista = 0; // por seguridad

  cargarEpisodio(indiceEnLista);
}

function cargarEpisodio(indice) {
  if (!listaActual || indice < 0 || indice >= listaActual.length) return;

  const ep = listaActual[indice];
  titulo.textContent = ep.titulo;
  frame.src = ep.link;
  player.style.display = "flex";
  indiceEnLista = indice;
  actualizarBotones();
}

function siguiente() {
  if (!listaActual) return; // no es serie → no hace nada

  if (indiceEnLista < listaActual.length - 1) {
    cargarEpisodio(indiceEnLista + 1);
  }
}

function volver() {
  if (!listaActual) return;

  if (indiceEnLista > 0) {
    cargarEpisodio(indiceEnLista - 1);
  }
}

function actualizarBotones() {
  if (!listaActual) {
    // Película suelta → botones desactivados
    btnVolver.disabled = true;
    btnSiguiente.disabled = true;
    btnVolver.style.opacity = "0.4";
    btnSiguiente.style.opacity = "0.4";
    return;
  }

  // Serie → activar/desactivar según posición
  btnVolver.disabled    = indiceEnLista <= 0;
  btnSiguiente.disabled = indiceEnLista >= listaActual.length - 1;
  
  btnVolver.style.opacity    = btnVolver.disabled ? "0.4" : "1";
  btnSiguiente.style.opacity = btnSiguiente.disabled ? "0.4" : "1";
}

// Eventos
cerrarBtn.onclick = () => {
  frame.src = "";
  player.style.display = "none";
  itemActual = null;
  listaActual = null;
  indiceEnLista = -1;
};

btnSiguiente.onclick = siguiente;
btnVolver.onclick    = volver;

// Cerrar con tecla ESC
window.addEventListener("keydown", e => {
  if (e.key === "Escape" && player.style.display === "flex") {
    cerrarBtn.click();
  }

});
