
// =====================================
// BEAUTY LINE - CATÁLOGO DE PRODUCTOS
// =====================================

const productosBeauty = [
    "Amber.jpg",
    "Berry Blush.jpg",
    "Berry Dew.jpg",
    "Black Edge.jpg",
    "Black Volumize.jpg",
    "Bronze Dew.jpg",
    "Cherry Blossom.jpg",
    "Cherry Glow.jpg",
    "City Lights.jpg",
    "Cocoa Line.jpg",
    "Coral Kiss.jpg",
    "Coral Shine.jpg",
    "crema-hidratante.jpg",
    "crema2.jpg",
    "Essential Brushes.jpg",
    "Golden Hour.jpg",
    "Honey Warmth.jpg",
    "labial1.jpg",
    "Natural Matte.jpg",
    "Nude Whisper.jpg",
    "Peachy Pink.jpg",
    "Pink Romance.jpg",
    "Pure Radiance.jpg",
    "Raspberry.jpg",
    "Ruby.jpg",
    "serum.jpg",
    "Smooth Application.jpg",
    "Soft Rose.jpg",
    "Sweet Blush.jpg",
    "Velvet Wine.jpg",
    "Warm Brown.jpg",
    "Warm Mocha.jpg"
];

const catalogo = document.getElementById("lista-productos");

if (catalogo) {
    productosBeauty.forEach(archivo => {
        const nombre = archivo.replace(/\.[^/.]+$/, "");

        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta-producto";

        const imagenContenedor = document.createElement("div");
        imagenContenedor.className = "producto-imagen";

        const imagen = document.createElement("img");
        imagen.src = "img/productos/" + archivo;
        imagen.alt = nombre;
        imagen.loading = "lazy";

        imagen.addEventListener("error", () => {
            imagen.alt = "Imagen no disponible: " + nombre;
        });

        imagenContenedor.appendChild(imagen);

        const informacion = document.createElement("div");
        informacion.className = "producto-info";

        const titulo = document.createElement("h3");
        titulo.textContent = nombre;

        const enlace = document.createElement("a");
        const mensaje = `Hola, BEAUTY LINE. Quisiera consultar por el producto ${nombre}.`;

        enlace.href =
            "https://wa.me/59171716971?text=" +
            encodeURIComponent(mensaje);

        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";
        enlace.className = "boton-agregar";
        enlace.textContent = "CONSULTAR";

        informacion.append(titulo, enlace);
        tarjeta.append(imagenContenedor, informacion);
        catalogo.appendChild(tarjeta);
    });
}
