let eventos = [];
let datosGuardados = [];

const evento_nombre = document.querySelector('#evento_nombre');
const evento_fecha = document.querySelector('#evento_fecha');
const boton_add = document.querySelector('#boton_anadir');
const contenedor_eventos = document.querySelector('.contenedor_eventos');
const json = cargarDatos();

try {
    datosGuardados = JSON.parse(json);
} catch (error) {
    datosGuardados = [];
    console.log(error);
}

function primeraMayuscula(input) {
    evento_nombre.value = evento_nombre.value.charAt(0).toUpperCase() + input.value.slice(1);
}
primeraMayuscula(evento_nombre);

eventos = datosGuardados ? [...datosGuardados] : [];
renderizarEvento();

document.querySelector('.formulario').addEventListener('submit', e => {

    e.preventDefault();
    anadirEvento();
});

boton_add.addEventListener('click', (e) => {

    e.preventDefault();
    anadirEvento();

});

function anadirEvento() {

    if (evento_nombre.value == "" || evento_fecha.value == "") {
        return;
    }

    if (diferencia_Fechas(evento_fecha.value) < 0) {
        return;
    }

    const nuevo_evento = {

        id: (Math.random() * 100).toString(36).slice(3),
        nombre_evento: evento_nombre.value,
        fecha: evento_fecha.value
    }

    eventos.unshift(nuevo_evento);
    guardarDatos(JSON.stringify(eventos));
    evento_nombre.value = '';
    evento_fecha.value = null;

    renderizarEvento();
}

function diferencia_Fechas(d) {

    const fecha_futura = new Date(d);
    const precente = new Date();
    const diferencia = fecha_futura.getTime() - precente.getTime();
    const dias = Math.ceil(diferencia / (1000 * 3600 * 24));

    return dias;
}

function renderizarEvento(id) {
    const codigo_html_evento = eventos.map(evento => {

        return `<div class="evento" >
                    <div class="dias">
                        <span class="dias_restantes">${diferencia_Fechas(evento.fecha)}</span>
                        <span class="texto_dias">Días</span>
                    </div>
                    <div class="evento_texto">
                        <span class="nombre">${evento.nombre_evento}</span>
                        <div class="fecha">${evento.fecha}</div>
                        <button class="btn_eliminar_evento" data-id="${evento.id}">Eliminar</button>
                    </div>
                </div>`;
    });

    contenedor_eventos.innerHTML = codigo_html_evento.join('');

    document.querySelectorAll('.btn_eliminar_evento').forEach(btn => {


        btn.addEventListener('click', e => {

            const id = btn.getAttribute('data-id');
            eventos = eventos.filter((evento) => evento.id != id);
            guardarDatos(JSON.stringify(eventos));
            renderizarEvento();
        });
    });
   
    if (eventos.length === 0) {
        contenedor_eventos.classList.add('ocultar');
    }else{
        contenedor_eventos.classList.remove('ocultar');
    }
}

function guardarDatos(datos) {
    localStorage.setItem('items', datos);
}

function cargarDatos() {
    return localStorage.getItem('items');
}
