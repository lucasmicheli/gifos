/* Elementos del DOM a manipular */

let inputBuscador = document.getElementById('input-buscador');
let bloqueBuscador = document.getElementById('buscador');
let iconBuscar = document.getElementById('buscador-lupa');
let btnBuscar = document.getElementById('buscador-lupa-gris');
let btnCerrarBusqueda = document.getElementById('cerrar-busqueda');
let listaSugerencias = document.getElementById('buscador-sugerencias');

let iconoBusquedaNav = document.getElementById('search-icon-nav');

let resultadosBusquedaGIFOS = document.getElementById('resultados-busqueda');
let btnVerMasResultados = document.getElementById('resultados-vermas');

/* Búsqueda */
let busqueda;
let offsetBusqueda = 0;

/* Modal */
let modalMobile = document.createElement("div");
let modalDesktop = document.createElement("div");

/* Header Search Box */
let headerInputSearch = document.getElementById('search-input-nav');
let headerBtnSearch = document.getElementById('search-icon-nav');

/* Acciones para accionar la búsqueda */
headerBtnSearch.addEventListener('click', buscarGifs);
headerInputSearch.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        buscarGifs();
    }
});

/* RESULTADOS de Búsqueda */
function buscarGifs() {
    let urlBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&offset=${offsetBusqueda}&q=`;
    let strBusqueda = headerInputSearch.value.trim();
    urlBusqueda = urlBusqueda.concat(strBusqueda);

    fetch(urlBusqueda)
        .then(response => response.json())
        .then(content => {
            resultadosBusquedaGIFOS.innerHTML = "";
            /* Hago visibles Título y Resultados de Búsqueda */
            let contenedorResultadosBusqueda = document.getElementById('resultados-busqueda-contenedor');
            contenedorResultadosBusqueda.style.display = "block";
            /* Creo Título */
            let tituloBusqueda = document.getElementById('titulo-busqueda');
            tituloBusqueda.innerHTML = headerInputSearch.value;
            /* Búsqueda sin resultados */
            if (content.data == 0) {
                resultadosBusquedaGIFOS.innerHTML = `
                    <div class="busqueda-error-contenedor">
                    <img src="./assets/icon-busqueda-sin-resultado.svg" alt="Busqueda sin resultado" class="busqueda-error-img">
                    <h3 class="busqueda-error-texto">Intenta con otra búsqueda</h3>
                    </div>
                    `;
                btnVerMasResultados.style.display = "none";
            } else {
                for (let i = 0; i < content.data.length; i++) {
                    traerBusqueda(content.data[i]);
                }
            }
        })
        .catch(error => {
            console.log("Error: " + error)
        })
}

/* Main SEARCH Box - Búsqueda de GIFs */

inputBuscador.addEventListener('keyup', buscadorActivo);

function buscadorActivo() {
    busqueda = inputBuscador.value;
    /* Modificación de estilos -> Buscador pasa a estado ACTIVO */
    bloqueBuscador.classList.remove('buscador');
    bloqueBuscador.classList.add('buscador-activo');
    iconBuscar.style.display = "none";
    btnCerrarBusqueda.style.display = "block";

    /* Traigo SUGERENCIAS de términos desde la API */
    if (busqueda.length >= 1) {
        fetch(`https://api.giphy.com/v1/tags/related/${busqueda}?api_key=${apiKey}&limit=4`)
            .then(response => response.json())
            .then(data => {
                sugerenciasData(data);
            })
            .catch(error => {
                console.error("Error: ", error);
            })
    } else {
        cerrarBoxBusqueda();
    }
}

/* Creo las SUGERENCIAS en el DOM */
function sugerenciasData(data) {
    let sugerencia = data.data;
    listaSugerencias.innerHTML = `
    <li class="sugerencia">
        <img src="./assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="buscador-sugerencia-texto" >${sugerencia[0].name}</p>
    </li>
    <li class="sugerencia">
        <img src="./assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="buscador-sugerencia-texto" >${sugerencia[1].name}</p>
    </li>
    <li class="sugerencia">
        <img src="./assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="buscador-sugerencia-texto" >${sugerencia[2].name}</p>
    </li>
    <li class="sugerencia">
        <img src="./assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="buscador-sugerencia-texto" >${sugerencia[3].name}</p>
    </li>`;
}

/* BÚSQUEDA del término de la lista */
listaSugerencias.addEventListener('click', function (li) {
    inputBuscador.value = li.target.textContent;
    busquedaGifos();
})

/* BÚSQUEDA Cerrada */
btnCerrarBusqueda.addEventListener('click', limpiarBusqueda);

/* CLEAR del input y reset de estilos */
function limpiarBusqueda() {
    inputBuscador.value = "";
    inputBuscador.placeholder = "Busca GIFOS y más";
    bloqueBuscador.classList.add('buscador');
    bloqueBuscador.classList.remove('buscador-activo');
    iconBuscar.style.display = "block";
    btnCerrarBusqueda.style.display = "none";
}

/* Acciones para accionar la búsqueda */
btnBuscar.addEventListener('click', busquedaGifos);
inputBuscador.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        busquedaGifos();
    }
});

/* RESULTADOS de Búsqueda */
function busquedaGifos() {
    let urlBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&offset=${offsetBusqueda}&q=`;
    let strBusqueda = inputBuscador.value.trim();
    urlBusqueda = urlBusqueda.concat(strBusqueda);

    fetch(urlBusqueda)
        .then(response => response.json())
        .then(content => {
            resultadosBusquedaGIFOS.innerHTML = "";
            /* Hago visibles Título y Resultados de Búsqueda */
            let contenedorResultadosBusqueda = document.getElementById('resultados-busqueda-contenedor');
            contenedorResultadosBusqueda.style.display = "block";
            /* Creo Título */
            let tituloBusqueda = document.getElementById('titulo-busqueda');
            tituloBusqueda.innerHTML = inputBuscador.value;
            /* Búsqueda sin resultados */
            if (content.data == 0) {
                resultadosBusquedaGIFOS.innerHTML = `
                    <div class="busqueda-error-contenedor">
                    <img src="./assets/icon-busqueda-sin-resultado.svg" alt="Busqueda sin resultado" class="busqueda-error-img">
                    <h3 class="busqueda-error-texto">Intenta con otra búsqueda</h3>
                    </div>
                    `;
                btnVerMasResultados.style.display = "none";
            } else {
                for (let i = 0; i < content.data.length; i++) {
                    traerBusqueda(content.data[i]);
                }
            }
        })
        .catch(error => {
            console.log("error busqueda" + error)
        })
    cerrarBoxBusqueda();
}


function traerBusqueda(content) {
    resultadosBusquedaGIFOS.innerHTML += `
        <div class="resultados-gif-box" onclick="maxGifMobile('${content.images.downsized.url}', '${content.id}', '${content.slug}', '${content.username}', '${content.title}')">
        <div class="gif-acciones-resultados">
            <div class="iconos-acciones-gif">
                <button class="iconos-acciones-box favorito" onclick="agregarFavoritoBusqueda('${content.id}')">
                    <img src="./assets/icon-fav-hover.svg" alt="icon-favorito" id="icon-fav-${content.id}">
                </button>
                <button class="iconos-acciones-box download" onclick="descargarGif('${content.images.downsized.url}', '${content.slug}')">
                    <img src="./assets/icon-download.svg" alt="icon-download">
                </button>
                <button class="iconos-acciones-box max" onclick="maxGifDesktop('${content.images.downsized.url}', '${content.id}', '${content.slug}', '${content.username}', '${content.title}')">
                    <img src="./assets/icon-max.svg" alt="icon-max">
                </button>
            </div>
            <div class="textos-descripcion-gif-resultados">
                <p class="user-gif-resultados">${content.username}</p>
                <p class="titulo-gif-resultados">${content.title}</p>
            </div>
        </div>
        <img src="${content.images.downsized.url}" alt="${content.id}" class="resultados-gif" >
    </div>
    `;
}

/* Reset de estilos del Search Box */
function cerrarBoxBusqueda() {
    bloqueBuscador.classList.add('buscador');
    bloqueBuscador.classList.remove('buscador-activo');
    iconBuscar.style.display = "block";
    btnCerrarBusqueda.style.display = "none";
}

/* VER MÁS Button */
btnVerMasResultados.addEventListener('click', verMasResultados);

function verMasResultados() {
    offsetBusqueda = offsetBusqueda + 12;
    busquedaGifosVerMas();
}

// !! TRATAR DE REUTILIZAR LA FUNCIÓN DE CREACIÓN DE ARRIBA
function busquedaGifosVerMas() {
    event.preventDefault();
    let urlBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=12&offset=${offsetBusqueda}&q=`;
    let strBusqueda = inputBuscador.value.trim();
    urlBusqueda = urlBusqueda.concat(strBusqueda);

    fetch(urlBusqueda)
        .then(response => response.json())
        .then(content => {
            let contenedorResultadosBusqueda = document.getElementById('resultados-busqueda-contenedor');
            contenedorResultadosBusqueda.style.display = "block";

            let tituloBusqueda = document.getElementById('titulo-busqueda');
            tituloBusqueda.innerHTML = inputBuscador.value;

            if (content.data == 0) {
                resultadosBusquedaGIFOS.innerHTML = `
                        <div class="busqueda-error-contenedor">
                        <img src="./assets/icon-busqueda-sin-resultado.svg" alt="Busqueda sin resultado" class="busqueda-error-img">
                        <h3 class="busqueda-error-texto">Intenta con otra búsqueda</h3>
                        </div>
                    `;
                btnVerMasResultados.style.display = "none";
            } else {
                for (let i = 0; i < content.data.length; i++) {
                    traerBusqueda(content.data[i]);
                }
            }
        })
        .catch(error => {
            console.log("Error 'Ver Más': " + error)
        })
}

/* Trending Topics */

let trendingTopicsTexto = document.getElementById('trending-topics');
window.onload = trendingTopics();

function trendingTopics() {
    let url = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;

    return fetch(url)
        .then(resp => resp.json()) 
        .then(content => {
            let topics = content.data;
            trendingTopicsTexto.innerHTML = `<span class="trending-topics-link">${topics[0]}</span>, <span class="trending-topics-link">${topics[1]}</span>, <span class="trending-topics-link">${topics[2]}</span>, <span class="trending-topics-link">${topics[3]}</span>, <span class="trending-topics-link">${topics[4]}</span>`;

            let topicBtn = document.getElementsByClassName('trending-topics-link');
            for (let x = 0; x < topicBtn.length; x++) {
                topicBtn[x].addEventListener('click', function (e) {
                    inputBuscador.value = topics[x];
                    busquedaGifos();
                })
            }
        })
        .catch(err => {
            console.log("Error 'Trending Topics': " + err);
        })
}

/* Favoritear GIF */

function agregarFavoritoBusqueda(gif){
    let iconFav = document.getElementById('icon-fav-' + gif);
    iconFav.setAttribute("src", "./assets/icon-fav-active.svg");
    agregarFavorito(gif);
}

function agregarFavorito(gif) {
    if (favoritosString == null) {
        favoritosArray = [];
    } else {
        favoritosArray = JSON.parse(favoritosString);
    }
    favoritosArray.push(gif);
    favoritosString = JSON.stringify(favoritosArray);
    localStorage.setItem("gifosFavoritos", favoritosString);
}

/* Download GIF */
async function descargarGif(gifImg, gifNombre) {
    let blob = await fetch(gifImg).then(img => img.blob());;
    invokeSaveAsDialog(blob, gifNombre + ".gif"); 
}

/* Maximize GIF on mobile */
function maxGifMobile(img, id, slug, user, title) {
    if (window.matchMedia("(max-width: 1023px)").matches) {
        modalMobile.style.display = "block";
        modalMobile.innerHTML = `
            <button class="modal-btn-close" onclick="cerrarModalMobile()"><img src="./assets/button-close.svg" alt=""></button>
            <img src="${img}" alt="${id}" class="modal-gif">

            <div class="modal-bar">
                <div class="modal-textos">
                    <p class="modal-user">${user}</p>
                    <p class="modal-titulo">${title}</p>
                </div>
                <div>
                    <button class="modal-btn" onclick="agregarFavoritoMaxMobile('${id}')"><img src="./assets/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-max-mob-${id}"></button>
                    <button class="modal-btn" onclick="descargarGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
                </div>
            </div>
            `;
        modalMobile.classList.add("modal-activado");
        document.body.appendChild(modalMobile);
    }
}

function cerrarModalMobile() {
    modalMobile.style.display = "none";
} 

function agregarFavoritoMaxMobile(gif){

    let iconFavMaxMobile = document.getElementById('icon-fav-max-mob-' + gif);
    iconFavMaxMobile.setAttribute("src", "./assets/icon-fav-active.svg");

    agregarFavorito(gif);
}

/* Maximize GIF on Desktop */
function maxGifDesktop(img, id, slug, user, title){
    if (window.matchMedia("(min-width: 1023px)").matches){
        modalDesktop.style.display = "block";
        modalDesktop.innerHTML = `
            <button class="modal-btn-close" onclick="cerrarModalDesktop()"><img src="./assets/button-close.svg" alt=""></button>
            <img src="${img}" alt="${id}" class="modal-gif">

            <div class="modal-bar">
                <div class="modal-textos">
                    <p class="modal-user">${user}</p>
                    <p class="modal-titulo">${title}</p>
                </div>
                <div>
                    <button class="modal-btn" onclick="agregarFavoritoMax('${id}')"><img src="./assets/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-max-${id}"></button>
                    <button class="modal-btn" onclick="descargarGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
                </div>
            </div>
            `;
        modalDesktop.classList.add("modal-activado");
            document.body.appendChild(modalDesktop);
    }
}

function cerrarModalDesktop() {
    modalDesktop.style.display = "none";
} 

function agregarFavoritoMax(gif){

    let iconFavMax = document.getElementById('icon-fav-max-' + gif);
    iconFavMax.setAttribute("src", "./assets/icon-fav-active.svg");

    agregarFavorito(gif);
}