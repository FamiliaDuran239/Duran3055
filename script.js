// 6 elementos de ejemplo (1 serie + 5 películas)
const items = [
  { 
    titulo: "El Encargado T3 E01", 
    img: "img/Encargado.jpg", 
    link: "https://www.dropbox.com/scl/fi/9p2x1kbsc3xlgvawhpiii/ElencargadoT3E1.mp4?rlkey=uvaib3uieqffizznvb4j7i6rf&st=gbs8wq5g&raw=1",
    esSerie: true,
    serieId: "encargado",
    episodio: 1
  },
  { titulo: "Zootopia 2", img: "img/Zotopia2.jpg", link: "https://www.dropbox.com/s/.../peli2.mp4?raw=1", esSerie: false },
  { titulo: "Ip Man - La leyenda", img: "img/Ip man.jpg", link: "https://www.dropbox.com/s/.../peli3.mp4?raw=1", esSerie: false },
  { titulo: "Película 4", img: "img/4.jpg", link: "https://www.dropbox.com/s/.../peli4.mp4?raw=1", esSerie: false },
  { titulo: "Película 5", img: "img/5.jpg", link: "https://www.dropbox.com/s/.../peli5.mp4?raw=1", esSerie: false },
  { titulo: "Película 6", img: "img/6.jpg", link: "https://www.dropbox.com/s/.../peli6.mp4?raw=1", esSerie: false }
];

// Para la serie (puedes agregar más episodios aquí)
const series = {
  encargado: [
    { episodio: 1, titulo: "El Encargado T3 E01", link: items[0].link },
    { episodio: 2, titulo: "El Encargado T3 E02", link: "https://www.dropbox.com/scl/fi/qu3l51o34jrh2ni1h28ws/ElencargadoT3E2.mp4?rlkey=wwame4dfdg0930ibcyp09ug0u&st=qryksy6f&dl=1" },
     { episodio: 3, titulo: "El Encargado T3 E03", link: "https://www.dropbox.com/scl/fi/49psl4o0orhzyc1ocfubw/ElencargadoT3E3.mp4?rlkey=fohcvb0s5r9bh8eifycucbqyv&st=awiqi4gl&dl=1" },
    // agrega más si tienes
  ]
};

const grid = document.getElementById("gridPeliculas");
const player = document.getElementById("player");
const tituloElem = document.getElementById("playerTitulo");
const video = document.getElementById("frameVideo");
const cerrarBtn = document.getElementById("cerrarBtn");
const controlesSerie = document.getElementById("controlesSerie");
const btnVolver = document.getElementById("btnVolver");
const btnSiguiente = document.getElementById("btnSiguiente");

let currentIndex = -1;
let currentSerie = null;

// Crear portadas
items.forEach((item, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<img src="${item.img}" alt="${item.titulo}">`;
  card.onclick = () => abrirReproductor(index);
  grid.appendChild(card);
});

function abrirReproductor(index) {
  currentIndex = index;
  const item = items[index];
  
  tituloElem.textContent = item.titulo;
  
  const source = video.querySelector("source");
  source.src = item.link;
  video.load();
  video.play().catch(() => {});

  if (item.esSerie) {
    currentSerie = series[item.serieId];
    controlesSerie.style.display = "flex";
    actualizarBotonesSerie();
  } else {
    currentSerie = null;
    controlesSerie.style.display = "none";
  }

  player.classList.add("mostrar");
  document.body.style.overflow = "hidden";
}

function actualizarBotonesSerie() {
  btnVolver.disabled = currentIndex <= 0;
  btnSiguiente.disabled = currentIndex >= currentSerie.length - 1;
}

function siguiente() {
  if (!currentSerie || currentIndex >= currentSerie.length - 1) return;
  currentIndex++;
  const ep = currentSerie[currentIndex];
  tituloElem.textContent = ep.titulo;
  const source = video.querySelector("source");
  source.src = ep.link;
  video.load();
  video.play().catch(() => {});
  actualizarBotonesSerie();
}

function volver() {
  if (!currentSerie || currentIndex <= 0) return;
  currentIndex--;
  const ep = currentSerie[currentIndex];
  tituloElem.textContent = ep.titulo;
  const source = video.querySelector("source");
  source.src = ep.link;
  video.load();
  video.play().catch(() => {});
  actualizarBotonesSerie();
}

function cerrar() {
  video.pause();
  const source = video.querySelector("source");
  source.src = "";
  player.classList.remove("mostrar");
  document.body.style.overflow = "";
  currentSerie = null;
  currentIndex = -1;
}

cerrarBtn.onclick = cerrar;
btnSiguiente.onclick = siguiente;
btnVolver.onclick = volver;

window.addEventListener("keydown", e => {
  if (e.key === "Escape") cerrar();
});