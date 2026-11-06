
// ======================================
// FORMULARIO DE CONTACTO - BEAUTY LINE
// ======================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {

    // Evitar que la página se recargue
    event.preventDefault();

    // Obtener los datos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Comprobar que ningún campo esté vacío
    if (!nombre || !correo || !asunto || !mensaje) {

        formMessage.textContent = "Por favor, completa todos los campos.";
        formMessage.style.color = "#d6a35d";

        return;
    }

    // Mostrar confirmación de validación
    formMessage.textContent =
        "¡Gracias por contactar con BEAUTY LINE! Tu mensaje está listo para ser enviado.";

    formMessage.style.color = "#c9a45b";

    // Limpiar los campos
    contactForm.reset();

});
