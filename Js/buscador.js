const productos = [

    {
        nombre: "Araña Nacional",
        palabras: "arana araña nacional publicidad estructura",
        pagina: "arana-nacional.html"
    },

    {
        nombre: "Roll Up Easy",
        palabras: "roll up easy publicidad banner",
        pagina: "rollup-easy.html"
    },

    {
        nombre: "Backing Trípode",
        palabras: "backing tripode backing trípode publicidad",
        pagina: "backing-tripodes.html"
    },

    {
        nombre: "Pop Man Araña",
        palabras: "pop man araña popman estructura publicidad",
        pagina: "popman-arana.html"
    },

    {
        nombre: "Skyline 5 Paneles",
        palabras: "skyline 5 paneles estructura publicidad",
        pagina: "skyline-paneles.html"
    },

    {
        nombre: "Stand Tubular Onda",
        palabras: "stand tubular onda stand publicidad",
        pagina: "stand-onda.html"
    },

    {
        nombre: "Igloo",
        palabras: "igloo inflable inflables publicidad",
        pagina: "igloo.html"
    },

    {
        nombre: "Banderín Gota",
        palabras: "banderin gota banderín publicidad bandera",
        pagina: "banderin-gota.html"
    },

    {
        nombre: "Base para Interiores",
        palabras: "base interiores base para interiores banderin",
        pagina: "base-interiores.html"
    },

    {
        nombre: "Counter Plástico",
        palabras: "counter plastico plástico counter publicidad",
        pagina: "counter-plastico.html"
    },

    {
        nombre: "Porta Catálogo con Marco",
        palabras: "porta catalogo catálogo revistero marco",
        pagina: "catalogo-marco.html"
    },

    {
        nombre: "Caja de Luz Ultra Delgada para Escritorio",
        palabras: "caja luz caja de luz escritorio ultra delgada",
        pagina: "cajaluz-escritorio.html"
    },

    {
        nombre: "Etiquetas en Vinilo Adhesivo",
        palabras: "etiquetas vinilo adhesivo sticker stickers",
        pagina: "etiquetas-vinilo.html"
    }

];

const inputBuscador = document.getElementById("buscador");
const botonBuscar = document.getElementById("btn-buscar");


// NORMALIZAR TEXTO
function normalizarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


// REALIZAR BÚSQUEDA
function realizarBusqueda() {

    const texto = normalizarTexto(inputBuscador.value.trim());

    // Si está vacío, no hacemos nada
    if (texto === "") {

        return;

    }

    const resultados = productos.filter(producto => {

        const nombre = normalizarTexto(producto.nombre);

        const palabras = normalizarTexto(producto.palabras);

        return nombre.includes(texto) || palabras.includes(texto);

    });


    // Si encontramos un único resultado
    if (resultados.length === 1) {

        window.location.href = resultados[0].pagina;

        return;

    }


    // Si encontramos varios resultados
    if (resultados.length > 1) {

        localStorage.setItem(
            "resultadosBusqueda",
            JSON.stringify(resultados)
        );

        localStorage.setItem(
            "textoBusqueda",
            inputBuscador.value.trim()
        );

        window.location.href = "resultados.html";

        return;

    }


    // Si no encontramos nada
    alert(
        `No encontramos resultados para "${inputBuscador.value.trim()}".`
    );

}


// BOTÓN DE BÚSQUEDA
botonBuscar.addEventListener("click", realizarBusqueda);


// BUSCAR PRESIONANDO ENTER
inputBuscador.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        realizarBusqueda();

    }

});

// MOSTRAR RESULTADOS EN resultados.html

const listaResultados = document.getElementById("lista-resultados");
const tituloResultados = document.getElementById("titulo-resultados");
const cantidadResultados = document.getElementById("cantidad-resultados");

if (listaResultados && tituloResultados) {

    const resultadosGuardados =
        JSON.parse(localStorage.getItem("resultadosBusqueda")) || [];

    const textoBusqueda =
        localStorage.getItem("textoBusqueda") || "";

    tituloResultados.textContent =
        `Resultados para: "${textoBusqueda}"`;

    if (cantidadResultados) {

        cantidadResultados.textContent =
            `${resultadosGuardados.length} producto${resultadosGuardados.length !== 1 ? "s" : ""} encontrado${resultadosGuardados.length !== 1 ? "s" : ""}`;

    }

    resultadosGuardados.forEach(producto => {

        const resultado = document.createElement("div");

        resultado.classList.add("resultado-item");

        resultado.innerHTML = `

            <img 
                src="${producto.imagen}" 
                alt="${producto.nombre}"
                class="resultado-imagen"
            >

            <div class="resultado-info">

                <h2>${producto.nombre}</h2>

                <a 
                    href="${producto.pagina}"
                    class="resultado-boton">
                    Ver producto
                </a>

            </div>

        `;

        listaResultados.appendChild(resultado);

    });

}