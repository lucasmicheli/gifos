/* Dark Mode */

let body = document.getElementById('body');
let url = window.location.pathname;

let darkModeStorage = localStorage.getItem("darkMode");
let darkModeBtn = document.getElementById('menu-modo');
darkModeBtn.addEventListener('click', cambiarModo);

let darkModeActivado = () => {
    body.classList.add('body-dark');
    darkModeBtn.innerHTML = "Modo Diurno";

    cambiarLogos();
    cambiarCrearGifo();


    if (url === "/index.html" || url === "/gifos/index.html") {
        cambiarBusqueda();
    }

    if (url === "/creargifo.html" || url === "/gifos/creargifo.html") {
        cambiarCamaras();
    }

    localStorage.setItem("darkMode", "activado");
}

let darkModeDesactivado = () => {
    body.classList.remove('body-dark');
    darkModeBtn.innerHTML = "Modo Nocturno";

    cambiarLogos();
    cambiarCrearGifo();
    cambiarBusquedaNav()

    if (url === "/index.html" || url === "/gifos/index.html") {
        cambiarBusqueda();
    }

    if (url === "/creargifo.html" || url === "/gifos/creargifo.html") {
        cambiarCamaras();
    }

    localStorage.setItem("darkMode", null);
}

if (darkModeStorage === "activado") {
    darkModeActivado();
}

function cambiarModo() {
    darkModeStorage = localStorage.getItem("darkMode");

    if (darkModeStorage !== "activado") {
        darkModeActivado();
    } else {
        darkModeDesactivado();
    }
}

function cambiarLogos() {
    let logoMobile = document.getElementById('logo');
    let logoDesktop = document.getElementById('logo-desktop');

    if (darkModeBtn.innerHTML == 'Modo Nocturno') {
        logoDesktop.setAttribute("src", "./assets/logo-desktop.svg");
        logoMobile.setAttribute("src", "./assets/logo-mobile.svg");
    } else {
        logoDesktop.setAttribute("src", "./assets/logo-desktop-modo-noc.svg");
        logoMobile.setAttribute("src", "./assets/logo-mobile-modo-noc.svg");
    }
}

function cambiarCrearGifo() {
    let iconoCrearGifo = document.querySelector('.mas-violeta');
    let iconoCrearGifoHover = document.querySelector('.mas-blanco');

    if (darkModeBtn.innerHTML == 'Modo Nocturno') {
        iconoCrearGifo.setAttribute("src", "./assets/button-crear-gifo.svg");
        iconoCrearGifoHover.setAttribute("src", "./assets/button-crear-gifo-hover.svg");
    } else {
        iconoCrearGifo.setAttribute("src", "./assets/button-crear-gifo-hover.svg");
        iconoCrearGifoHover.setAttribute("src", "./assets/button-crear-gifo-dark.svg");
    }
}

function cambiarBusqueda() {
    if (darkModeBtn.innerHTML == 'Modo Nocturno') {
        iconBuscar.setAttribute("src", "./assets/icon-search.svg");
        iconoBusquedaNav.setAttribute("src", "./assets/icon-search.svg");
        btnCerrarBusqueda.setAttribute("src", "./assets/button-close.svg");
    } else {
        iconBuscar.setAttribute("src", "./assets/icon-search-mod-noc.svg");
        iconoBusquedaNav.setAttribute("src", "./assets/icon-search-mod-noc.svg");
        btnCerrarBusqueda.setAttribute("src", "./assets/button-close-modo-noc.svg");
    }
}

function cambiarCamaras() {
    let camara = document.getElementById('camara');
    let pelicula = document.getElementById('pelicula');

    if (darkModeBtn.innerHTML == 'Modo Nocturno') {
        camara.setAttribute("src", "./assets/camara.svg");
        pelicula.setAttribute("src", "./assets/pelicula.svg");
    } else {
        camara.setAttribute("src", "./assets/camara-modo-noc.svg");
        pelicula.setAttribute("src", "./assets/pelicula-modo-noc.svg");
    }
}