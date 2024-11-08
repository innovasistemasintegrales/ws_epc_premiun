/* Database */
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCTMPRJcAp6RICj7GfVUJt4gXW8g-VGSc0",
    authDomain: "wa-libro-reclamo-test.firebaseapp.com",
    projectId: "wa-libro-reclamo-test",
    storageBucket: "wa-libro-reclamo-test.appspot.com",
    messagingSenderId: "93275745810",
    appId: "1:93275745810:web:303d2225489fa69bf032cb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function fecha() {
    let fecha_actual = document.querySelector("#fecha");

    const fecha = new Date();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1;
    const anioActual = fecha.getFullYear();

    fecha_actual.innerHTML = "FECHA: " + hoy + "/" + mesActual + "/" + anioActual;

}

function numOrden() {
    const fecha = new Date();
    const anioActual = fecha.getFullYear();

    let orden = document.querySelector("#orden");
    db.collection("reclamos").onSnapshot(collection => {
        //console.log(collection.docs);
        let lista = collection.docs;
        let index;
        index = lista.length + 1 + "-" + anioActual;
        numOrden(index);
        orden.innerHTML = index;
    })

}

/* Registra el reclmo */
function guardarReclamo() {
    //Consumidor
    let orden = document.querySelector("#orden");
    let estado = document.getElementById('estado');
    let rs_nombre = document.querySelector("#rs_nombre");
    let tipo_doc = document.querySelector("#tipo_doc");
    let num_documento = document.querySelector("#num_documento");
    let correo = document.querySelector("#correo");
    let celular = document.querySelector("#celular");
    let departamento = document.querySelector("#departamento");
    let provincia = document.querySelector("#provincia");
    let distrito = document.querySelector("#distrito");
    let direccion = document.querySelector("#direccion");

    //Servicio
    let canal_atencion = document.querySelector("#canal_atencion");
    let lbx_tipo_bien = document.querySelector("#lbx_tipo_bien");
    let desc_producto = document.querySelector("#desc_producto");
    let fecha_atencion = document.querySelector("#fecha_atencion");
    let nombre_bien = document.querySelector("#nombre_bien");
    let precio = document.querySelector("#precio");

    //Reclamo
    let tipo_incidente = document.querySelector("#tipo_incidente");
    let detalles = document.querySelector("#detalles");
    let pedido = document.querySelector("#pedido");

    let expresiones = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let valido = expresiones.test(correo.value);

    let token = Math.random().toString(36).substr(2);

    if (rs_nombre.value != "" && tipo_doc.value != "" && num_documento.value != "" && correo.value != "" && celular.value != "" && departamento.value != "" &&
        provincia.value != "" && distrito.value != "" && direccion.value != "" && canal_atencion.value != "" && lbx_tipo_bien.value != "" && desc_producto.value != "" &&
        fecha_atencion.value != "" && nombre_bien.value != "" && nombre_bien.value != "" && precio.value != "" && tipo_incidente.value != "" && detalles.value != "" &&
        pedido.value != "") {
        if (valido == true) {
            $.ajax({
                method: "POST",
                url: "enviar.php",
                data: {
                    token,
                    orden: orden.textContent,
                    rs_nombre: rs_nombre.value,
                    num_documento: num_documento.value,
                    correo: correo.value,
                    celular: celular.value,
                    departamento: departamento.value,
                    provincia: provincia.value,
                    distrito: distrito.value,
                    direccion: direccion.value,
                    canal_atencion: canal_atencion.value,
                    lbx_tipo_bien: lbx_tipo_bien.value,
                    desc_producto: desc_producto.value,
                    fecha_atencion: fecha_atencion.value,
                    nombre_bien: nombre_bien.value,
                    precio: precio.value,
                    tipo_incidente: tipo_incidente.value,
                    detalles: detalles.value,
                    pedido: pedido.value
                }
            });

            db.collection("reclamos").doc().set({
                token,
                orden: orden.textContent,
                estado: estado.checked,
                rs_nombre: rs_nombre.value,
                tipo_doc: tipo_doc.value,
                num_documento: num_documento.value,
                correo: correo.value,
                celular: celular.value,
                departamento: departamento.value,
                provincia: provincia.value,
                distrito: distrito.value,
                direccion: direccion.value,
                canal_atencion: canal_atencion.value,
                lbx_tipo_bien: lbx_tipo_bien.value,
                desc_producto: desc_producto.value,
                fecha_atencion: fecha_atencion.value,
                nombre_bien: nombre_bien.value,
                precio: precio.value,
                tipo_incidente: tipo_incidente.value,
                detalles: detalles.value,
                pedido: pedido.value
            }).then((msj) => {
                alert("Reclamo enviado correctamente");
                location.reload();

            }).catch((msg) => {
                swal.fire({
                    icon: "error",
                    title: "Error al enviar reclamo"
                });
            });
        } else {
            swal.fire({
                icon: "warning",
                title: "Correo no válido"
            });
        }

    } else {
        swal.fire({
            icon: "warning",
            title: "Por favor, complete todos los campos requeridos"
        });
    }

}

/* Limpiar tabla */
function limpiarTabla() {
    document.querySelector("#tabla_reclamo");
    $("#tabla_reclamo").empty();
}

/* Lista el reclamo */
function listarReclamo() {
    let tabla_reclamo = document.querySelector("#tabla_reclamo");
    let color_estado;

    db.collection("reclamos").orderBy("orden", "desc").onSnapshot(collection => {
        array = collection.docs;
        /* var arrayOrdenar = [];
        for (let i = 0; i < array.length; i++) {
            arrayOrdenar[i] = array[i].data();
        }
        
        arrayOrdenar.sort(function(a,b){
            return b.orden - a.orden;
        }); */

        for (let index = 0; index < array.length; index++) {
            let objeto = array[index].data();

            var fecha1 = new Date(objeto.fecha_atencion);
            var fecha2 = new Date();
            const f_Formateada1 = Date.UTC(fecha1.getFullYear(), fecha1.getMonth(), fecha1.getDate());
            const f_Formateada2 = Date.UTC(fecha2.getFullYear(), fecha2.getMonth(), fecha2.getDate());
            let day = (24 * 60 * 60 * 1000);
            let diferencia = ((f_Formateada2 - f_Formateada1) / day);

            if (objeto.estado == true) {
                color_estado = "#00AA00";
            } else if (diferencia < 11) {
                color_estado = "#00AA00";
            } else if (diferencia < 21) {
                color_estado = "#FFC300";
            } else if (diferencia < 26) {
                color_estado = "#FF5733";
            } else {
                color_estado = "#C70039";
            }
            tabla_reclamo.innerHTML = tabla_reclamo.innerHTML + vistaReclamo(index, objeto, color_estado, diferencia);
        }

    })
}

function vistaReclamo(index, objeto, color_estado, diferencia) {
    let template = `
    <tr>
        <td class="">${objeto.orden}</td>
        <td class="">${objeto.fecha_atencion}</td>
        <td class="">${objeto.rs_nombre}</td>
        <td class="">${objeto.num_documento}</td>
        <td class="">${objeto.correo}</td>
        <td class="">${objeto.tipo_incidente}</td>
        <td class="d-flex">
        <span id="color_estado" class="px-2 pt-1 rounded text-light row justify-content-center" style="background:${color_estado};">${diferencia}</span>  
        <div class="form-check form-switch ms-3 mt-1">
            <input class="form-check-input" type="checkbox" id="estado" ${objeto.estado ? "checked" : null} disabled>
        </div>    
        <span class="btn btn-sm btn-primary" onclick="verModal(${index})" data-bs-toggle="modal" data-bs-target="#listaModal"><i class="bi bi-search"></i></span>
            
        </td>
    </tr>
    `
    return template;
}
/* Buscar para ver en modal  */
function verModal(index) {
    let contenido_modal = document.querySelector("#contenido_modal");
    $("#contenido_modal").empty();
    db.collection("reclamos").orderBy("orden", "desc").onSnapshot(collection => {

        array = collection.docs;

        for (let i = 0; i < array.length; i++) {
            if (i == index) {
                let id_objeto = array[i].id;
                let objeto = array[i].data();
                contenido_modal.innerHTML = contenido_modal.innerHTML + listarModal(id_objeto, objeto);

                let estado = objeto.estado
                estadoCheck(estado);
            }
        }
    });
}
function listarModal(id_objeto, objeto) {
    let template = `
<div class="container ">
    <span id="id_objeto" visivility: hidden>${id_objeto}</span>
    <h5>Orden N°: <span>${objeto.orden}</span></h5>
    <h4 class="fw-bold">DATOS DEL CONSUMIDOR</h4>
    <label for="" class="fw-bold">Nombres/RS</label>
    <input type="text" value="${objeto.rs_nombre}" class="form-control" disabled></input>
    <label for="" class="fw-bold">N° Documento</label>
    <input type="text" value="${objeto.num_documento}" class="form-control" disabled></input>
    <label for="" class="fw-bold">Correo electrónico</label>
    <input type="text" value="${objeto.correo}" class="form-control" disabled></input>
    <label for="" class="fw-bold">N° Celular</label>
    <input type="text" value="${objeto.celular}" class="form-control" disabled></input>
    <label for="" class="fw-bold">Departamento</label>
    <input type="text" value="${objeto.departamento}" class="form-control" disabled></input>
    <label for="" class="fw-bold">Provincia</label>
    <input type="text" value="${objeto.provincia}" class="form-control" disabled></input>
    <label for="" class="fw-bold">Distrito</label>
    <input type="text" value="${objeto.distrito}" class="form-control" disabled></input>
    <label for="" class="fw-bold">Dirección</label>
    <input type="text" value="${objeto.direccion}" class="form-control" disabled></input>
    <br>
    <h4 class="fw-bold">DETALLES PRODUCTO/SERVICIO</h4>
    <label for="" class="fw-bold">Canal de atención</label>
    <input type="text" value="${objeto.canal_atencion}" class="form-control" disabled></input>
    <label for="" class="fw-bold">Tipo de bien</label>
    <input type="text" value="${objeto.lbx_tipo_bien}" class="form-control" disabled></input>
    <label for="" class="fw-bold">Desc. producto/Servicio</label>
    <input type="text" value="${objeto.desc_producto}" class="form-control" disabled></input>
    <label for="" class="fw-bold">Fecha de reclamo/queja</label>
    <input type="text" value="${objeto.fecha_atencion}" class="form-control" disabled></input>
    <br>
    <h4 class="fw-bold">DETALLES DE RECLAMACIÓN</h4>
    <label for="" class="fw-bold">Tipo de incidente</label>
    <input type="text" value="${objeto.tipo_incidente}" class="form-control" disabled></input>
    <label for="" class="fw-bold">Detalles reclamo/queja</label>
    <textarea type="text" placeholder="" class="form-control" disabled>${objeto.detalles}</textarea>
    <label for="" class="fw-bold">Pedido del consumidor</label>
    <textarea type="text" class="form-control" disabled>${objeto.pedido}</textarea>
    <div class="form-check form-switch" visivility: hidden>
        <input class="form-check-input" type="checkbox" id="estado" ${objeto.estado ? "checked" : null}>
        <label class="form-check-label" for="estado">Estado de atención</label>
    </div>
</div>
    `
    return template;

}

/* Editar estado de atención */
function estadoCheck(estado) {
    let estado_atencion = document.querySelector("#estado_atencion");
    estado_atencion.checked = estado;
}

function editarReclamo() {
    let id_objeto = document.querySelector("#id_objeto");
    let estado_atencion = document.querySelector("#estado_atencion");

    let objeto = {
        estado: estado_atencion.checked
    }

    db.collection("reclamos").doc(id_objeto.textContent).update(objeto).then(msj => {
        swal.fire({
            icon: "success",
            title: "Reclamo atendido"
        });
    }).catch(msg => {
        swal.fire({
            icon: "error",
            title: "Estado de reclamo no se puede guardar"
        });
        alert()
    });
    document.querySelector("#tabla_reclamo");
    $('#tabla_reclamo').empty();
}

function limpiarLogin() {
    let usuario = document.querySelector("#usuario_login");
    let password = document.querySelector("#password_login");
    usuario.value = "";
    password.value = "";
}
/* FUNCIONES LOGIN */
function login() {
    let usuario = document.querySelector("#usuario_login").value;
    let password = document.querySelector("#password_login").value;

    db.collection("usuarios").onSnapshot(collection => {
        array = collection.docs;
        for (let i = 0; i < array.length; i++) {
            let objeto = array[i].data();

            if (usuario == "" || password == "") {
                swal.fire({
                    icon: "warning",
                    title: "Por favor ingrese sus credenciales"
                });
            } else if (objeto.usuario == usuario && objeto.password == password) {
                limpiarLogin();
                window.location.href = "../admin.html"
            } else {
                swal.fire({
                    icon: "error",
                    title: "Credenciales incorrectos"
                });
            }
        }
    });

}

/* Extraccion de año */
function year() {

}


document.addEventListener("DOMContentLoaded", function () {
    // Inicializa el primer slider
    const elemHeader = document.querySelector('.carousel-header');
    if (elemHeader) {
        new Flickity(elemHeader, {
            cellAlign: 'center',
            contain: true,
            wrapAround: true,
            autoPlay: 3000,
            pageDots: false,
            prevNextButtons: false
        });
    }

    // Inicializa el segundo slider
    const elemClientes = document.querySelector('.carousel-clientes');
    if (elemClientes) {
        new Flickity(elemClientes, {
            cellAlign: 'center',
            contain: true,
            wrapAround: true,
            autoPlay: 2500,
            pageDots: false,
            prevNextButtons: false
        });
    }

    // Inicializa el tercer slider
    const elemProveedores = document.querySelector('.carousel-proveedores');
    if (elemClientes) {
        new Flickity(elemProveedores, {
            cellAlign: 'center',
            contain: true,
            wrapAround: true,
            autoPlay: 2500,
            pageDots: false,
            prevNextButtons: false
        });
    }
});


/* Registro de formulario */
function registrarMensaje() {
    let nombreIndex = document.querySelector(".nombre-index");
    let telefonoIndex = document.querySelector(".telefono-index");
    let correoIndex = document.querySelector(".correo-index");
    let ciudadIndex = document.querySelector(".ciudad-index");
    let mensajeIndex = document.querySelector(".mensaje-index");
    let expresiones = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let correoValido = expresiones.test(correoIndex.value);

    if (nombreIndex.value !== "" && telefonoIndex.value !== "" && correoIndex.value !== "" && ciudadIndex.value !== "" && mensajeIndex.value !== "") {
        if (telefonoIndex.value.length == 9) {
            if (correoValido) {
                // Enviar los datos por AJAX
                $.ajax({
                    method: "POST",
                    url: "enviar.php",
                    data: {
                        nombre: nombreIndex.value,
                        telefono: telefonoIndex.value,
                        correo: correoIndex.value,
                        ciudad: ciudadIndex.value,
                        mensaje: mensajeIndex.value
                    },
                    success: function (response) {
                        swal.fire({
                            icon: "success",
                            title: "Mensaje enviado correctamente",
                        });
                        // Limpiar el formulario
                        document.getElementById("contactForm").reset();
                    },
                    error: function () {
                        swal.fire({
                            icon: "error",
                            title: "Error al enviar mensaje",
                        });
                    }
                });

                // Guardar en Firestore
                db.collection("mensajes").doc().set({
                    nombre: nombreIndex.value,
                    telefono: telefonoIndex.value,
                    correo: correoIndex.value,
                    ciudad: ciudadIndex.value,
                    mensaje: mensajeIndex.value,
                    fecha: new Date()
                }).then(() => {
                    mostrarToast("Mensaje guardado en la base de datos", "bg-success", "text-white", "bottom-0 end-0");
                }).catch((error) => {
                    mostrarToast("Error al guardar en la base de datos", "bg-danger",undefined, 8000);
                });

            } else {
                mostrarToast("Correo no válido", "bg-dark", "text-white");
            }
        } else {
            mostrarToast("Ingrese un numero valido", "bg-dark", "text-white");
            console.log(telefonoIndex);
        }
    } else {
        mostrarToast("Todos los campos son obligatorios", "bg-dark", "text-white");
    }

}

function mostrarToast(mensaje, color = "bg-white", textColor = "text-dark", posicion = "top-50 start-50 translate-middle", duracion = 3000, autohide = true) {
    // Crear el contenedor del toast si no existe
    let toastContainer = document.getElementById("dynamicToastContainer");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "dynamicToastContainer";
        toastContainer.className = `toast-container position-fixed p-3 ${posicion}`;
        document.body.appendChild(toastContainer);
    }

    // Crear el elemento del toast
    const toastElement = document.createElement("div");
    toastElement.className = `toast align-items-center ${color}`;
    toastElement.setAttribute("role", "alert");
    toastElement.setAttribute("aria-live", "assertive");
    toastElement.setAttribute("aria-atomic", "true");

    // Añadir el contenido del toast
    toastElement.innerHTML = `
        <div class="d-flex ${textColor}">
            <div class="toast-body">
                ${mensaje}
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    // Agregar el toast al contenedor
    toastContainer.appendChild(toastElement);

    // Inicializar y mostrar el toast con opciones personalizadas
    const toast = new bootstrap.Toast(toastElement, {
        delay: duracion,
        autohide: autohide
    });

    toast.show();

    // Remover el toast del DOM una vez que se oculta
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}
