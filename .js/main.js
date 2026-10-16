
/* =====================================
   BEAUTY LINE - FUNCIONES DE LA TIENDA
   ===================================== */

// IMPORTANTE:
// Reemplaza este número por tu WhatsApp.
// Usa el código del país y el número, solo números.
// Bolivia: 591 + número de teléfono.
// Ejemplo ficticio: 59170000000
const WHATSAPP = "59170000000";

// Productos de demostración.
// Los precios son ejemplos en bolivianos (Bs).
const productos = [
    {
        id: 1,
        nombre: "Base Natural Skin",
        categoria: "rostro",
        precio: 95,
        descripcion: "Base de maquillaje con varios tonos disponibles.",
        imagen: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80",
        etiqueta: "FAVORITO"
    },
    {
        id: 2,
        nombre: "Labial Velvet",
        categoria: "labios",
        precio: 45,
        descripcion: "Color elegante para complementar tu estilo.",
        imagen: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=80",
        etiqueta: "DESTACADO"
    },
    {
        id: 3,
        nombre: "Paleta Golden Glow",
        categoria: "ojos",
        precio: 120,
        descripcion: "Tonos neutros y luminosos para tus looks.",
        imagen: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80",
        etiqueta: "COLECCIÓN"
    },
    {
        id: 4,
        nombre: "Rubor Nude",
        categoria: "rostro",
        precio: 55,
        descripcion: "Un toque de color para completar tu maquillaje.",
        imagen: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80",
        etiqueta: "NUEVO"
    },
    {
        id: 5,
        nombre: "Gloss Brillante",
        categoria: "labios",
        precio: 35,
        descripcion: "Brillo labial para un acabado luminoso.",
        imagen: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=700&q=80",
        etiqueta: "FAVORITO"
    },
    {
        id: 6,
        nombre: "Máscara de Pestañas",
        categoria: "ojos",
        precio: 60,
        descripcion: "Un básico para completar tu mirada.",
        imagen: "https://images.unsplash.com/photo-1631214540242-6a7c7f1e0b31?auto=format&fit=crop&w=700&q=80",
        etiqueta: "ESENCIAL"
    },
    {
        id: 7,
        nombre: "Agua Micelar",
        categoria: "cuidado",
        precio: 50,
        descripcion: "Producto de limpieza facial para tu rutina.",
        imagen: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80",
        etiqueta: "CUIDADO"
    },
    {
        id: 8,
        nombre: "Crema Hidratante",
        categoria: "cuidado",
        precio: 75,
        descripcion: "Hidratación para acompañar tu rutina facial.",
        imagen: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=80",
        etiqueta: "ESENCIAL"
    }
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

        // Si una fotografía falla, se oculta sin romper la tarjeta.
        imagen.addEventListener("error", () => {
            imagen.style.display = "none";
        });

        const etiqueta = document.createElement("span");
        etiqueta.className = "etiqueta-producto";
        etiqueta.textContent = producto.etiqueta;

        imagenContenedor.append(imagen, etiqueta);

        const informacion = document.createElement("div");
        informacion.className = "producto-info";

        const nombre = document.createElement("h3");
        nombre.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.className = "producto-descripcion";
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("p");
        precio.className = "producto-precio";
        precio.textContent = formatoPrecio(producto.precio);

        const boton = document.createElement("button");
        boton.className = "boton-agregar";
        boton.textContent = "AÑADIR A MI BOLSA";
        boton.addEventListener("click", () => agregarAlCarrito(producto.id));

        informacion.append(nombre, descripcion, precio, boton);
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
