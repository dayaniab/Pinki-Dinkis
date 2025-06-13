// Referencias
const grid = document.getElementById('grid-productos');
const btnVerEventos = document.getElementById('ver-eventos');
const formPrecio = document.getElementById('formulario-precio');
const galeria = document.getElementById('galeria-precios');
const formDatos = document.getElementById('formulario-datos');
const confirmacion = document.getElementById('confirmacion');
const btnSi = document.getElementById('btn-si');
const btnNo = document.getElementById('btn-no');
const formReserva = document.getElementById('form-reserva');
const formAgendar = document.getElementById('form-agendar');
const mensajeNo = document.getElementById('mensaje-no');

// Lista de productos con precios independientes
const productos = [
  {
    nombre: "Animador@ Infantil",
    imagen: "https://i.imgur.com/5pc5QzK.jpeg",
    precios: [
      "https://i.imgur.com/CTfmji2.jpeg",
      "https://i.imgur.com/yFosOMa.jpeg",
      "https://via.placeholder.com/150/FFB6C1?text=Animador3",
      "https://via.placeholder.com/150/FFB6C1?text=Animador4",
      "https://via.placeholder.com/150/FFB6C1?text=Animador5"
    ]
  },
  {
    nombre: "PINTA CARITAS",
    imagen: "https://i.imgur.com/VFUwbCP.jpeg",
    precios: [
      "https://i.imgur.com/FPaPgLW.jpeg",
      "https://via.placeholder.com/150/90EE90?text=Pinta2",
      "https://via.placeholder.com/150/90EE90?text=Pinta3",
      "https://via.placeholder.com/150/90EE90?text=Pinta4",
      "https://via.placeholder.com/150/90EE90?text=Pinta5"
    ]
  },
  {
    nombre: "PERSONAJES",
    imagen: "https://i.imgur.com/Zrr9ok2.jpeg",
    precios: [
      "https://via.placeholder.com/150/FFD700?text=Personaje1",
      "https://via.placeholder.com/150/FFD700?text=Personaje2",
      "https://via.placeholder.com/150/FFD700?text=Personaje3",
      "https://via.placeholder.com/150/FFD700?text=Personaje4",
      "https://via.placeholder.com/150/FFD700?text=Personaje5"
    ]
  }
];

let productoSeleccionado = null;

function mostrarProductos() {
  const seccion = document.getElementById('productos');
  const grid = document.getElementById('grid-productos');

  if (seccion.style.display === 'none' || seccion.style.display === '') {
    seccion.style.display = 'block';

    if (grid.children.length === 0) {
      productos.forEach((prod, index) => {
        const card = document.createElement('div');
        card.className = 'producto';
        card.innerHTML = `
          <img src="${prod.imagen}" alt="${prod.nombre}">
          <h4>${prod.nombre}</h4>
          <button onclick="mostrarFormulario(${index})">Precio</button>
        `;
        grid.appendChild(card);
      });
    }
  } else {
    seccion.style.display = 'none';
  }
}

btnVerEventos.addEventListener('click', mostrarProductos);

window.mostrarFormulario = (index) => {
  productoSeleccionado = index;
  formPrecio.style.display = 'block';
  galeria.style.display = 'none';
  confirmacion.style.display = 'none';
  mensajeNo.style.display = 'none';
};

formDatos.addEventListener('submit', (e) => {
  e.preventDefault();
  formPrecio.style.display = 'none';
  galeria.style.display = 'block';

  const galeriaContainer = document.querySelector('.galeria .imagenes');
  galeriaContainer.innerHTML = '';

  const imagenes = productos[productoSeleccionado].precios;
  imagenes.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => seleccionarImagen(url));
    galeriaContainer.appendChild(img);
  });
});

function seleccionarImagen(url) {
  galeria.style.display = 'none';
  confirmacion.style.display = 'block';
  localStorage.setItem('imagenSeleccionada', url);
}

btnSi.addEventListener('click', () => {
  confirmacion.style.display = 'none';
  formReserva.style.display = 'block';
});

btnNo.addEventListener('click', () => {
  confirmacion.style.display = 'none';
  mensajeNo.style.display = 'block';
});

formAgendar.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre-cliente').value;
  const fecha = document.getElementById('fecha-cliente').value;
  const telefono = document.getElementById('telefono-cliente').value;

  const reserva = {
    nombre,
    fecha,
    telefono,
    imagenSeleccionada: localStorage.getItem('imagenSeleccionada') || null
  };

  const reservas = JSON.parse(localStorage.getItem('eventosAgendados')) || [];
  reservas.push(reserva);
  localStorage.setItem('eventosAgendados', JSON.stringify(reservas));

  formAgendar.reset();

  document.getElementById('form-reserva').style.display = 'none';
  document.getElementById('formulario-precio').style.display = 'none';
  document.getElementById('galeria-precios').style.display = 'none';
  document.getElementById('confirmacion').style.display = 'none';
  document.getElementById('mensaje-no').style.display = 'none';

  alert(`¡Gracias ${nombre}! Tu evento para el ${fecha} ha sido agendado. Te llamaremos al ${telefono}.`);

  const mensajeFinal = document.getElementById('mensaje-final');
  if (mensajeFinal) {
    mensajeFinal.style.display = 'block';
    setTimeout(() => {
      mensajeFinal.style.display = 'none';
    }, 6000);
  }

  localStorage.removeItem('imagenSeleccionada');
});

function mostrarReservas() {
  const contenedor = document.getElementById('lista-reservas');
  const reservas = JSON.parse(localStorage.getItem('eventosAgendados')) || [];

  if (reservas.length === 0) {
    contenedor.innerHTML = "<p>No hay eventos agendados aún.</p>";
    return;
  }

  contenedor.innerHTML = '<h3>Eventos Agendados</h3>';

  reservas.forEach((res, index) => {
    const div = document.createElement('div');
    div.style.marginBottom = "20px";

    div.innerHTML = `
      <strong>Evento ${index + 1}</strong><br>
      Nombre: ${res.nombre}<br>
      Fecha: ${res.fecha}<br>
      Teléfono: ${res.telefono}<br>
      ${res.imagenSeleccionada ? `<img src="${res.imagenSeleccionada}" width="100"><br>` : ''}
      <button onclick="borrarReserva(${index})" style="margin-top:10px; background-color:red; color:white; border:none; padding:5px 10px; border-radius:5px;">🗑️ Borrar</button>
      <hr>
    `;

    contenedor.appendChild(div);
  });
}

function borrarReserva(index) {
  const reservas = JSON.parse(localStorage.getItem('eventosAgendados')) || [];
  reservas.splice(index, 1);
  localStorage.setItem('eventosAgendados', JSON.stringify(reservas));
  mostrarReservas();
}
