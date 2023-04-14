/* FETCH */

let productos = []

fetch("./js/productos.json")
    .then(respuesta => respuesta.json())
    .then(datos => {
        productos = datos
        pasarProductos(productos)
    })
    .catch((error) => {
        console.log(error)
    })


/* VARIABLES */

const contenedorProductos = document.querySelector("#contenedor-productos")
// const productoBtn = document.querySelectorAll(".producto__btn")
const btnAll = document.querySelectorAll(".btn")
let btnAgregar = document.querySelectorAll(".producto__btn")

/* FUNCION PARA TRAER PRODUCTOS DEL HTML MEDIANTE DOM */

function pasarProductos(){
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("col-3", "producto", "card", "m-3");
        div.innerHTML = `
            <img src="${producto.imagen}" class="img__index card-img-top" alt="${producto.titulo}">
            <div class="card-body">
                <h5 class="card-title">${producto.titulo}</h5>
                <p class="card-text">Precio: <strong>$${producto.precio}</strong></p>
                <button class="producto__btn btn btn-success" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
        contenedorProductos.append(div);

        btnAgregarNuevo();
    });
}

/* FUNCION PARA AGREGAR CUANDO SE APRIETA EL BOTON */ 

function btnAgregarNuevo() {
    btnAgregar = document.querySelectorAll(".producto__btn")

    btnAgregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito)
    });
}

/* FUNCION PARA AGREGAR PRODUCTOS AL CARRITO */

let productosAgregadosCarrito
let productosAgregadosCarritoLocalStorage = localStorage.getItem("productos-carrito")

if (productosAgregadosCarritoLocalStorage) {
  productosAgregadosCarrito = JSON.parse(productosAgregadosCarritoLocalStorage)
} else {
    productosAgregadosCarrito = []
    //    localStorage.setItem("productos-carrito", JSON.stringify(productosAgregadosCarrito))
}


function agregarCarrito(evt){

    const btnId = evt.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === btnId)

    if (productosAgregadosCarrito.some(producto => producto.id === btnId)){
        const contador = productosAgregadosCarrito.findIndex(producto => producto.id === btnId)
        productosAgregadosCarrito[contador].cantidad +=1
    } else {
        productoAgregado.cantidad = 1
        productosAgregadosCarrito.push(productoAgregado)
    }
    
    localStorage.setItem("productos-carrito", JSON.stringify(productosAgregadosCarrito))
}

