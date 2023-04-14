let productosAgregadosCarrito = localStorage.getItem("productos-carrito")

const carritoVacio = document.querySelector("#carrito-vacio")
const carritoProductos = document.querySelector("#carrito-productos")
const carritoAccion = document.querySelector("#carrito-accion")
const carritoComprado = document.querySelector("#carrito-comprado")
const carritoVaciar = document.querySelector("#carrito-accion-vaciar")
const carritoTotal = document.querySelector("#total")
let carritoEliminar = document.querySelectorAll(".producto__btn")

function pasarProductosCarrito() {

    productosAgregadosCarrito = JSON.parse(productosAgregadosCarrito)

    if (productosAgregadosCarrito && productosAgregadosCarrito.length > 0) {

        carritoVacio.classList.add("disabled")
        carritoProductos.classList.remove("disabled")
        carritoAccion.classList.remove("disabled")
        carritoComprado.classList.add("disabled")
    
        productosAgregadosCarrito.forEach(producto => {
            const div = document.createElement("div")
            div.classList.add("producto")
            div.innerHTML = `
                <div class="container contenedor__carrito">
                    <img class="carrito__producto__imagen" src="${producto.imagen}" alt="${producto.titulo}">
                        
                            <div class="carrito__producto__titulo">
                                <p>Título</p>
                                <h3>${producto.titulo}</h3>
                            </div>
                            <div class="carrito__producto__cantidad">
                                <p>Cantidad</p>
                                <p>${producto.cantidad}</p>
                            </div>
                            <div class="carrito__producto__precio">
                                <p>Precio</p>
                                <p>${producto.precio}</p>
                            </div>
                            <div class="carrito__producto__subtotal">
                                <p>Subtotal</p>
                                <p>${producto.precio * producto.cantidad}</p>
                            </div>
                        
                    <button class="producto__btn | CLASES DE BOOTSTRAP ---> btn btn-danger mt-2" id="${producto.id}">Eliminar del carrito</button>
                </div>
            `
            carritoProductos.append(div)
        })

    } else {
        carritoVacio.classList.remove("disabled")
        carritoProductos.classList.add("disabled")
        carritoAccion.classList.add("disabled")
        carritoComprado.classList.add("disabled")
    }
}

pasarProductosCarrito()
carritoEliminarBotones()
actualizarTotal()

function carritoEliminarBotones() {
    carritoEliminar = document.querySelectorAll(".producto__btn");

    carritoEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    });
}

function eliminarDelCarrito(evt){
    const idBoton = evt.currentTarget.id
    const indexFind = productosAgregadosCarrito.findIndex(producto => producto.id === idBoton)

    Swal.fire({
        title: '¿Estás seguro de que quieres eliminar este producto?',
        icon: 'question',
        allowOutsideClick: false,
        confirmButtonText: 'Si, eliminar',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.isConfirmed) {
           
            productosAgregadosCarrito.splice(indexFind, 1)
            localStorage.setItem("productos-carrito", JSON.stringify(productosAgregadosCarrito))
            
            const productoAEliminar = document.querySelector(`#${idBoton}`).closest('.producto')
            productoAEliminar.remove()
            
            Swal.fire(
                'Tu producto ha sido eliminado del carrito',
                `Haz click <a href="../index.html">aquí</a> para ir al inicio.`,
                'success'
            )
        }
    })
}

carritoVaciar.addEventListener('click', vaciarCarrito)

function vaciarCarrito(){

    productosAgregadosCarrito.length = 0
    localStorage.setItem("productos-carrito", JSON.stringify(productosAgregadosCarrito))

}

function actualizarTotal() {
    const totalCalculado = productosAgregadosCarrito.reduce((suma, producto) => suma + (producto.precio * producto.cantidad), 0) 
    total.innerText = `Total: $${totalCalculado}`
}