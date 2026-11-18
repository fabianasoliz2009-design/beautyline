
/* =====================================
   BEAUTY LINE - FUNCIONES DE LA TIENDA
   ===================================== */

// IMPORTANTE:
// Reemplaza este número por tu WhatsApp.
// Usa el código del país y el número, solo números.
// Bolivia: 591 + número de teléfono.
// Ejemplo ficticio: 59170000000
const WHATSAPP = "59171716971";

const productos = [
    { id: 1, nombre: "Amber", categoria: "rostro", imagen: "img/productos/Amber.jpg" },
    { id: 2, nombre: "Berry Blush", categoria: "rostro", imagen: "img/productos/Berry Blush.jpg" },
    { id: 3, nombre: "Berry Dew", categoria: "rostro", imagen: "img/productos/Berry Dew.jpg" },
    { id: 4, nombre: "Black Edge", categoria: "ojos", imagen: "img/productos/Black Edge.jpg" },
    { id: 5, nombre: "Black Volumize", categoria: "ojos", imagen: "img/productos/Black Volumize.jpg" },
    { id: 6, nombre: "Bronze Dew", categoria: "rostro", imagen: "img/productos/Bronze Dew.jpg" },
    { id: 7, nombre: "Cherry Blossom", categoria: "rostro", imagen: "img/productos/Cherry Blossom.jpg" },
    { id: 8, nombre: "Cherry Glow", categoria: "labios", imagen: "img/productos/Cherry Glow.jpg" },
    { id: 9, nombre: "City Lights", categoria: "ojos", imagen: "img/productos/City Lights.jpg" },
    { id: 10, nombre: "Cocoa Line", categoria: "labios", imagen: "img/productos/Cocoa Line.jpg" },
    { id: 11, nombre: "Coral Kiss", categoria: "labios", imagen: "img/productos/Coral Kiss.jpg" },
    { id: 12, nombre: "Coral Shine", categoria: "labios", imagen: "img/productos/Coral Shine.jpg" },
    { id: 13, nombre: "Crema Hidratante", categoria: "cuidado", imagen: "img/productos/crema-hidratante.jpg" },
    { id: 14, nombre: "Crema 2", categoria: "cuidado", imagen: "img/productos/crema2.jpg" },
    { id: 15, nombre: "Essential Brushes", categoria: "rostro", imagen: "img/productos/Essential Brushes.jpg" },
    { id: 16, nombre: "Golden Hour", categoria: "ojos", imagen: "img/productos/Golden Hour.jpg" },
    { id: 17, nombre: "Honey Warmth", categoria: "rostro", imagen: "img/productos/Honey Warmth.jpg" },
    { id: 18, nombre: "Labial 1", categoria: "labios", imagen: "img/productos/labial1.jpg" },
    { id: 19, nombre: "Natural Matte", categoria: "rostro", imagen: "img/productos/Natural Matte.jpg" },
    { id: 20, nombre: "Nude Whisper", categoria: "labios", imagen: "img/productos/Nude Whisper.jpg" },
    { id: 21, nombre: "Peachy Pink", categoria: "rostro", imagen: "img/productos/Peachy Pink.jpg" },
    { id: 22, nombre: "Pink Romance", categoria: "labios", imagen: "img/productos/Pink Romance.jpg" },
    { id: 23, nombre: "Pure Radiance", categoria: "rostro", imagen: "img/productos/Pure Radiance.jpg" },
    { id: 24, nombre: "Raspberry", categoria: "labios", imagen: "img/productos/Raspberry.jpg" },
    { id: 25, nombre: "Ruby", categoria: "labios", imagen: "img/productos/Ruby.jpg" },
    { id: 26, nombre: "Serum", categoria: "cuidado", imagen: "img/productos/serum.jpg" },
    { id: 27, nombre: "Smooth Application", categoria: "rostro", imagen: "img/productos/Smooth Application.jpg" },
    { id: 28, nombre: "Soft Rose", categoria: "labios", imagen: "img/productos/Soft Rose.jpg" },
    { id: 29, nombre: "Sweet Blush", categoria: "rostro", imagen: "img/productos/Sweet Blush.jpg" },
    { id: 30, nombre: "Velvet Wine", categoria: "labios", imagen: "img/productos/Velvet Wine.jpg" },
    { id: 31, nombre: "Warm Brown", categoria: "ojos", imagen: "img/productos/Warm Brown.jpg" },
    { id: 32, nombre: "Warm Mocha", categoria: "rostro", imagen: "img/productos/Warm Mocha.jpg" }
];

// El carrito empieza vacío.
// En esta primera versión se conserva mientras la página
// permanezca abierta, pero no utiliza una base de datos.
let carrito = [];

// Formato de precios bolivianos.
function formatoPrecio(precio) {
    return "Bs " + precio.toLocaleString("es-BO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/* =====================================
   MOSTRAR PRODUCTOS
   ===================================== */


function mostrarProductos(categoria = "todos") {
    const contenedor = document.getElementById("lista-productos");

    if (!contenedor) return;

    const filtrados = categoria === "todos"
        ? productos
        : productos.filter(producto =>
            producto.categoria === categoria
        );

    contenedor.replaceChildren();

    filtrados.forEach(producto => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-producto";

        const imagenContenedor = document.createElement("div");
        imagenContenedor.className = "producto-imagen";

        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        imagen.loading = "lazy";

        imagen.addEventListener("error", () => {
            imagen.style.display = "none";
        });

        imagenContenedor.appendChild(imagen);

        const informacion = document.createElement("div");
        informacion.className = "producto-info";

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const boton = document.createElement("button");
        boton.className = "boton-agregar";
        boton.textContent = "CONSULTAR POR WHATSAPP";

        boton.addEventListener("click", () => {
            const mensaje =
                `Hola, BEAUTY LINE. Quisiera consultar por el producto ${producto.nombre}.`;

            abrirWhatsApp(mensaje);
        });

        informacion.append(nombre, boton);
        tarjeta.append(imagenContenedor, informacion);
        contenedor.appendChild(tarjeta);
    });
}


/* =====================================
   FILTROS DE CATEGORÍAS
   ===================================== */

document.querySelectorAll(".filtro").forEach(boton => {
    boton.addEventListener("click", () => {
        document.querySelectorAll(".filtro").forEach(item => {
            item.classList.remove("activo");
        });

        boton.classList.add("activo");
        mostrarProductos(boton.dataset.categoria);
    });
});

/* =====================================
   CARRITO DE COMPRAS
   ===================================== */

function agregarAlCarrito(id) {
    const producto = productos.find(item => item.id === id);

    if (!producto) return;

    const existente = carrito.find(item => item.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

function cambiarCantidad(id, cambio) {
    const item = carrito.find(producto => producto.id === id);

    if (!item) return;

    item.cantidad += cambio;

    if (item.cantidad <= 0) {
        carrito = carrito.filter(producto => producto.id !== id);
    }

    actualizarCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    actualizarCarrito();
}

function actualizarCarrito() {
    const contador = document.getElementById("contador-carrito");
    const contenido = document.getElementById("contenido-carrito");
    const totalElemento = document.getElementById("total-carrito");

    const cantidadTotal = carrito.reduce(
        (suma, item) => suma + item.cantidad, 0
    );

    const total = carrito.reduce(
        (suma, item) => suma + item.precio * item.cantidad, 0
    );

    contador.textContent = cantidadTotal;
    contenido.replaceChildren();

    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.className = "carrito-vacio";
        mensaje.textContent = "Tu bolsa está vacía. ¡Descubre nuestros productos!";
        contenido.appendChild(mensaje);
    }

    carrito.forEach(item => {
        const fila = document.createElement("article");
        fila.className = "item-carrito";

        const informacion = document.createElement("div");

        const nombre = document.createElement("h3");
        nombre.textContent = item.nombre;

        const precio = document.createElement("p");
        precio.textContent = formatoPrecio(item.precio * item.cantidad);

        const controles = document.createElement("div");
        controles.className = "cantidad-controles";

        const menos = document.createElement("button");
        menos.textContent = "−";
        menos.setAttribute("aria-label", "Reducir cantidad");
        menos.addEventListener("click", () => cambiarCantidad(item.id, -1));

        const cantidad = document.createElement("span");
        cantidad.textContent = item.cantidad;

        const mas = document.createElement("button");
        mas.textContent = "+";
        mas.setAttribute("aria-label", "Aumentar cantidad");
        mas.addEventListener("click", () => cambiarCantidad(item.id, 1));

        controles.append(menos, cantidad, mas);
        informacion.append(nombre, precio, controles);

        const quitar = document.createElement("button");
        quitar.className = "quitar-producto";
        quitar.textContent = "Eliminar";
        quitar.addEventListener("click", () => eliminarDelCarrito(item.id));

        fila.append(informacion, quitar);
        contenido.appendChild(fila);
    });

    totalElemento.textContent = formatoPrecio(total);
}

/* Abrir y cerrar la bolsa */

const fondoModal = document.getElementById("fondo-modal");

function abrirCarrito() {
    fondoModal.hidden = false;
    document.body.classList.add("modal-abierto");
    document.getElementById("cerrar-carrito").focus();
}

function cerrarCarrito() {
    fondoModal.hidden = true;
    document.body.classList.remove("modal-abierto");
    document.getElementById("abrir-carrito").focus();
}

document.getElementById("abrir-carrito").addEventListener(
    "click", abrirCarrito
);

document.getElementById("cerrar-carrito").addEventListener(
    "click", cerrarCarrito
);

fondoModal.addEventListener("click", evento => {
    if (evento.target === fondoModal) cerrarCarrito();
});

document.addEventListener("keydown", evento => {
    if (evento.key === "Escape" && !fondoModal.hidden) {
        cerrarCarrito();
    }
});

/* =====================================
   PREPARAR PEDIDO POR WHATSAPP
   ===================================== */

function abrirWhatsApp(mensaje) {
    if (WHATSAPP === "59170000000") {
        alert(
            "Primero configura tu número real de WhatsApp " +
            "en el archivo js/main.js."
        );
        return;
    }

    const numeroValido = /^\d{8,15}$/.test(WHATSAPP);

    if (!numeroValido) {
        alert("Revisa el número de WhatsApp configurado.");
        return;
    }

    const url = "https://wa.me/" + WHATSAPP +
        "?text=" + encodeURIComponent(mensaje);

    window.open(url, "_blank", "noopener,noreferrer");
}

document.getElementById("finalizar-compra").addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("Añade al menos un producto antes de consultar tu pedido.");
        return;
    }

    const lineas = carrito.map(item =>
        `- ${item.nombre} x ${item.cantidad}: ` +
        formatoPrecio(item.precio * item.cantidad)
    );

    const total = carrito.reduce(
        (suma, item) => suma + item.precio * item.cantidad, 0
    );

    const mensaje = [
        "Hola, BEAUTY LINE. Quiero consultar este pedido:",
        "",
        ...lineas,
        "",
        "Subtotal: " + formatoPrecio(total),
        "Quisiera conocer la disponibilidad, el costo de envío y los métodos de pago."
    ].join("\n");

    abrirWhatsApp(mensaje);
});

/* =====================================
   FORMULARIO DE CONTACTO
   ===================================== */

document.getElementById("formulario-contacto").addEventListener(
    "submit", evento => {
        evento.preventDefault();

        const formulario = evento.currentTarget;

        if (!formulario.reportValidity()) return;

        const datos = new FormData(formulario);

        const nombre = datos.get("nombre").trim();
        const correo = datos.get("correo").trim();
        const asunto = datos.get("asunto");
        const mensajeUsuario = datos.get("mensaje").trim();

        const mensaje = [
            "Hola, BEAUTY LINE.",
            "",
            "Nombre: " + nombre,
            "Correo: " + correo,
            "Consulta: " + asunto,
            "Mensaje: " + mensajeUsuario
        ].join("\n");

        if (WHATSAPP === "59170000000") {
            document.getElementById("estado-contacto").textContent =
                "Formulario validado. Configura tu WhatsApp en main.js " +
                "para enviar la consulta. El mensaje todavía no se ha enviado.";
            return;
        }

        document.getElementById("estado-contacto").textContent =
            "Se abrirá WhatsApp para que revises y envíes tu consulta.";

        abrirWhatsApp(mensaje);
    }
);

/* =====================================
   MENÚ PARA CELULARES
   ===================================== */

const botonMenu = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

botonMenu.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    botonMenu.setAttribute("aria-expanded", String(abierto));
});

menu.querySelectorAll("a").forEach(enlace => {
    enlace.addEventListener("click", () => {
        menu.classList.remove("abierto");
        botonMenu.setAttribute("aria-expanded", "false");
    });
});

/* AÑO AUTOMÁTICO */

document.getElementById("anio").textContent = new Date().getFullYear();

/* INICIALIZAR LA TIENDA */

mostrarProductos();
actualizarCarrito();
