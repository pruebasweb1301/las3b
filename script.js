document.addEventListener('DOMContentLoaded', () => {
    const agregarCarritoButtons = document.querySelectorAll('.agregar-carrito');
    const listaCarrito = document.querySelector('.lista-carrito');
    const vaciarCarritoButton = document.querySelector('.vaciar-carrito');

    agregarCarritoButtons.forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });

    listaCarrito.addEventListener('click', eliminarDelCarrito);

    vaciarCarritoButton.addEventListener('click', vaciarCarrito);

    function agregarAlCarrito(event) {
        const button = event.target;
        const producto = button.parentElement;
        const nombre = producto.querySelector('h3').textContent;
        const precio = producto.querySelector('.precio').textContent;
        
        agregarProductoAlCarrito(nombre, precio);
    }

    function agregarProductoAlCarrito(nombre, precio) {
        const itemCarrito = document.createElement('li');
        itemCarrito.innerHTML = `
            <span>${nombre}</span>
            <span>${precio}</span>
            <button class="eliminar-item">X</button>
        `;
        listaCarrito.appendChild(itemCarrito);
        calcularTotal();
    }

    function calcularTotal() {
        let total = 0;
        const precios = document.querySelectorAll('.lista-carrito span:nth-child(2)');

        precios.forEach(precio => {
            total += parseFloat(precio.textContent.replace('Q', ''));
        });

        document.querySelector('.total').textContent = `Total: Q${total.toFixed(2)}`;
    }

    function eliminarDelCarrito(event) {
        if (event.target.classList.contains('eliminar-item')) {
            const botonEliminar = event.target;
            botonEliminar.parentElement.remove();
            calcularTotal();
        }
    }

    function vaciarCarrito() {
        while (listaCarrito.firstChild) {
            listaCarrito.removeChild(listaCarrito.firstChild);
        }
        calcularTotal();
    }
});
