/* Este archivo contiene funciones comunes o compartidas en todas las secciones de la página */

const apiKey = "yEAfkBmMwWgvYffUHjGzbhwPt7rmkkja";

/* Nav-Bar */

//Variables
const navSearch = document.getElementById('nav-search');
const shadow = document.getElementById('header');

//SCROLL 
window.addEventListener('DOMContentLoaded', () =>{
    shadow.classList.remove('shadow');
})
window.addEventListener('scroll', () => {
    const scrollPX = window.scrollY;
     if(scrollPX > 20){
         navSearch.style.visibility = 'visible';
         shadow.classList.add('shadow');
     }else{
        navSearch.style.visibility = 'hidden';
        shadow.classList.remove('shadow');
     }
});