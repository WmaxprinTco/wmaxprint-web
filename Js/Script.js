/*----------WMAXPRINT SCRIPT.JS---------*/

/* HEADER AL HACER SCROLL */

const header=document.querySelector(".top-header");

if (header){

window.addEventListener("scroll",() => {

    /* SOLO COMPUTADOR */

    if(window.innerWidth > 768){

        if(window.scrollY > 50){

            header.style.padding="18px 70px";
            header.style.background="#0b2239";
            header.style.boxShadow="0 8px 20px rgba(0, 0, 0, .25)";

        }else{

            header.style.padding="18px 70px";
            header.style.background="#0B2239";
            header.style.boxShadow="none";

        }

    }

});

}

/*SCROLL SUAVE*/

document.querySelectorAll('a[href^="#"]'). forEach(anchor => {

    anchor.addEventListener("click", function(e){

        const destino=document.querySelector(this.getAttribute("href"));

        if(destino){

        e.preventDefault();

        destino.scrollIntoView({

            behavior:"smooth"
            
        });
      }
    });
});

/*CARRUSEL*/

/*---------- CARRUSEL ----------*/

const carrusel = document.querySelector(".carrusel-contenedor");

const siguiente = document.querySelector(".next");

const anterior = document.querySelector(".prev");


if (carrusel && siguiente && anterior) {

    siguiente.addEventListener("click", () => {

        const anchoImagen = carrusel.querySelector("img").offsetWidth;

        carrusel.scrollBy({

            left: anchoImagen + 20,

            behavior: "smooth"

        });

    });


    anterior.addEventListener("click", () => {

        const anchoImagen = carrusel.querySelector("img").offsetWidth;

        carrusel.scrollBy({

            left: -(anchoImagen + 20),

            behavior: "smooth"

        });

    });

}


/*MENU ACTIVO*/

const enlacesMenu = document.querySelectorAll(".menu a");

let paginaActual = window.location.pathname.split("/").pop();

if (paginaActual === "") {
    paginaActual = "index.html";
}

enlacesMenu.forEach(enlace => {

    const enlacePagina = enlace.getAttribute("href");

    if (enlacePagina === paginaActual) {

        enlace.classList.add("active");

    }

});

/*---------- MENU HAMBURGUESA PARA CELULAR ----------*/

const menus = document.querySelectorAll(".menus-servicios-movil .menu");

if (menus.length > 0) {

    /* Crear botón */

    const botonMenu = document.createElement("button");

    botonMenu.classList.add("boton-menu-movil");

    botonMenu.innerHTML = `
        <span class="icono-hamburguesa">☰</span>
        <span>Conoce nuestros servicios</span>
    `;


    /* Poner botón dentro del HEADER */

    const headerMovil = document.querySelector(".top-header");

    if (headerMovil) {

        headerMovil.appendChild(botonMenu);

    }


    /* Abrir y cerrar menú */

    botonMenu.addEventListener("click", () => {

        document.body.classList.toggle("menus-movil-abiertos");


        if (document.body.classList.contains("menus-movil-abiertos")) {

            botonMenu.querySelector(".icono-hamburguesa").textContent = "✕";

            botonMenu.querySelector("span:last-child").textContent =
                "Cerrar servicios";

        } else {

            botonMenu.querySelector(".icono-hamburguesa").textContent = "☰";

            botonMenu.querySelector("span:last-child").textContent =
                "Conoce nuestros servicios";

        }

    });


    /* Abrir categorías */

    document.querySelectorAll(".menus-servicios-movil .menu .dropdown > a").forEach(enlace => {

        enlace.addEventListener("click", function(e) {

            if (window.innerWidth <= 768) {

                e.preventDefault();

                const padre = this.parentElement;

                padre.classList.toggle("submenu-abierto");

            }

        });

    });

}

/* =====================================================
   SLIDER PRINCIPAL — INICIO
   ===================================================== */

const sliderHero = document.querySelector(".slider-hero");

if (sliderHero) {

    const slidesHero = sliderHero.querySelectorAll(".slide");
    const flechaAnteriorHero = sliderHero.querySelector(".slider-flecha.anterior");
    const flechaSiguienteHero = sliderHero.querySelector(".slider-flecha.siguiente");
    const indicadoresHero = sliderHero.querySelectorAll(".indicador");

    let slideHeroActual = 0;


    function cambiarSlideHero(numero) {

        slidesHero.forEach((slide, index) => {

            slide.classList.toggle(
                "activo",
                index === numero
            );

        });


        indicadoresHero.forEach((indicador, index) => {

            indicador.classList.toggle(
                "activo",
                index === numero
            );

        });


        slideHeroActual = numero;

    }


    function avanzarSlideHero() {

        let nuevoSlide = slideHeroActual + 1;

        if (nuevoSlide >= slidesHero.length) {
            nuevoSlide = 0;
        }

        cambiarSlideHero(nuevoSlide);

    }


    function retrocederSlideHero() {

        let nuevoSlide = slideHeroActual - 1;

        if (nuevoSlide < 0) {
            nuevoSlide = slidesHero.length - 1;
        }

        cambiarSlideHero(nuevoSlide);

    }


    /* FLECHA SIGUIENTE */

    if (flechaSiguienteHero) {

        flechaSiguienteHero.addEventListener(
            "click",
            avanzarSlideHero
        );

    }


    /* FLECHA ANTERIOR */

    if (flechaAnteriorHero) {

        flechaAnteriorHero.addEventListener(
            "click",
            retrocederSlideHero
        );

    }


    /* INDICADORES */

    indicadoresHero.forEach((indicador, index) => {

        indicador.addEventListener("click", () => {

            cambiarSlideHero(index);

        });

    });


    /* CAMBIO AUTOMÁTICO */

    if (slidesHero.length > 1) {

        setInterval(() => {

            avanzarSlideHero();

        }, 3500);

    }

}