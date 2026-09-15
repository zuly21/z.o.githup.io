// ========================================================
// ESTADO Y SELECTORES
// ========================================================
let cartItemsCount = 0;

const cartCountElement = document.getElementById("cartCount");
const toastElement = document.getElementById("toast");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartBtn = document.getElementById("cartBtn");

// ========================================================
// FUNCIÓN DE NOTIFICACIONES (TOAST)
// ========================================================
function showNotification(message, type = "success") {
  toastElement.textContent = message;
  toastElement.className = `toast toast-${type}`;
  toastElement.hidden = false;

  // Ocultar automáticamente después de 2.8 segundos
  setTimeout(() => {
    toastElement.hidden = true;
  }, 2800);
}

// ========================================================
// FILTRADO DE PRODUCTOS POR CATEGORÍA
// ========================================================
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Actualizar botón activo
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedCategory = button.getAttribute("data-category");

    // Filtrar tarjetas con animación simple
    productCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");
      if (selectedCategory === "all" || cardCategory === selectedCategory) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ========================================================
// AGREGAR AL CARRITO CON RETROALIMENTACIÓN PSICOLÓGICA
// ========================================================
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productName = event.target.getAttribute("data-name");

    // Incrementar contador
    cartItemsCount++;
    cartCountElement.textContent = cartItemsCount;

    // Feedback verde de éxito inmediato
    showNotification(`¡Añadido! "${productName}" al carrito.`, "success");
  });
});

// Click en el botón del carrito en el header
cartBtn.addEventListener("click", () => {
  if (cartItemsCount === 0) {
    showNotification("Tu carrito está vacío. Elige un producto para empezar.", "error");
  } else {
    showNotification(`Tienes ${cartItemsCount} producto(s) listo(s) para pagar.`, "success");
  }
});
function calcularTotal() {
    let total = 0;
    document.querySelectorAll('.producto').forEach(producto => {
      const precio = parseFloat(producto.querySelector('.precio').dataset.precio);
      const cantidad = parseInt(producto.querySelector('.cantidad').value);
      total += precio * cantidad;
    });
    document.getElementById('total').textContent = total.toFixed(2);
  }

  // Calcular al cargar la página
  calcularTotal();

  // Recalcular cuando cambie la cantidad
  document.querySelectorAll('.cantidad').forEach(input => {
    input.addEventListener('input', calcularTotal);
  });

  let carrito = [];

// Abrir y cerrar carrito
document.getElementById('boton-carrito').addEventListener('click', () => {
  document.getElementById('carrito').classList.toggle('mostrar');
});

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
}

// Actualizar vista y total
function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalElemento = document.getElementById('total');
  lista.innerHTML = '';
  let total = 0;

  carrito.forEach((producto, indice) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${producto.nombre} - $${producto.precio}
      <button onclick="eliminarDelCarrito(${indice})">✕</button>
    `;
    lista.appendChild(li);
    total += parseFloat(producto.precio);
  });

  totalElemento.textContent = total.toFixed(2);
}

// Eliminar un producto
function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  actualizarCarrito();
}

// Vaciar todo el carrito
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}