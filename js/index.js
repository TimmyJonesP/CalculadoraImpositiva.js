//Constantes y var
const juegos = [];
let tabla;
let textoTotal;
let textoImpuestos;
/// Tostadas de inputs
function toastyError(){
    Toastify({
        text: "Debe rellenar ambos datos correctamente para poder visualizar los costos.",
        className: "warning",
        gravity: "bottom",
        position: "right",
        style: {
          background: "rgba(253,29,29,1) 51%",
        }
      }).showToast();
}
///Entrada a Tabla
function inicializarElementos() {
    tabla = document.getElementById("tabla-productos");
    textoImpuestos = document.querySelector("#totalImpuestos span");
    textoTotal = document.querySelector("#totalTotal span");
    historial = document.getElementById("historial")
}

///OBJETO
class Producto {
    constructor(nombre, valor, impuestos, total) {
        this.nombre = nombre;
        this.valor = valor;
        this.impuestos = impuestos;
        this.total = total;
    }
    ///Totales comprimidos BIG TEXT
    calcularImpuestos = () => this.impuestos;
    calcularTotal = () => this.total;
}

///funcion para limpiar la tabla e imprimir bien el array
function limpiarTabla() {
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}

///Operador con validación hacia el localstorage.
function validacion(){
    cookies = localStorage.length
    cookies > 0 ? restaurar() : historial.innerHTML = ""
}

///Agregar objetos a la tabla.
function agregarProductosTabla() {
    juegos.forEach((juego) => {
        let filaTabla = document.createElement("tr");
        filaTabla.innerHTML = `
        <td>${juego.nombre}</td>
        <td>${juego.valor}</td>
        <td>${juego.impuestos}</td>
        <td>${juego.total}</td>`;
        tabla.tBodies[0].append(filaTabla);
    });
    calcularTotales()
}

///Evento de click para tomar los inputs.
let entry = document.getElementById("entry");
entry.addEventListener("click", validacionForm);

///Valida que estén los datos correspondientes para que no se cargue un objeto vacío
function validacionForm(e){
    e.preventDefault()
    
    let nombre = document.getElementById("name").value;
    let valor = parseInt(document.getElementById("precio").value);
    if (nombre == "" || isNaN(valor)){
        toastyError()
    }
    else{
        registro()
    }
}
///Si pasa la validación se ejecuta el registro del objeto dentro del array y del local storage
function registro() {

    localStorage.clear()
    let nombre = document.getElementById("name").value;
    let valor = parseInt(document.getElementById("precio").value);
    let impuestos = valor * 0.75;
    let total = valor + impuestos;
    let juegoARegistrar = new Producto(
        nombre,
        valor,
        impuestos,
        total
    );
    juegos.push(juegoARegistrar);
    limpiarTabla();
    agregarProductosTabla();
    ///guardado en local
    localStorage.setItem("nombre", JSON.stringify(nombre))
    localStorage.setItem("valor", JSON.stringify(valor))
    localStorage.setItem("impuestos", JSON.stringify(impuestos))
    localStorage.setItem("total", JSON.stringify(total))
    localStorage.setItem("cloud", JSON.stringify(juegos))
    // toast
    Toastify({
        text: "Se ha almacenado el último juego y se ha aplicado a la tabla.",
        className: "info",
        gravity: "bottom",
        position: "right",
        style: {
          background: "linear-gradient(to left,#49a09d,#5f2c82)",
        }
      }).showToast();
}

///botón de eliminar
let limpiar = document.getElementById("cleanse");
limpiar.addEventListener("click", limpio);

//función llamada
function limpio(e){
    e.preventDefault()
    ///Limpio localstorage y la clase producto.
    localStorage.clear()
        while(juegos.length > 0)
    juegos.pop();
    ///while con pop para eliminar del último al primero, similar al ejecutado en la próxima función.
    limpiarTabla()
    ///para que los números queden en 0.
    calcularTotales()
    ///para vaciar el historial si se cumple la condición.
    validacion()
    ///una toast para confirmar y dar feedback.
    Toastify({
        text: "Se han eliminado todos los datos y restablecido la página.",
        className: "info",
        gravity: "bottom",
        position: "right",
        style: {
          background: "linear-gradient(90deg, rgba(190,127,163,1) 0%, rgba(253,29,29,1) 51%, rgba(252,176,69,1) 100%)",
        }
      }).showToast();
}

///Totales para visualización del usuario
function calcularTotales() {
    let totalImpuestos = 0;
    let totalTotal = 0;

    totalImpuestos = juegos.reduce(
        (acumulador, item) => acumulador + item.calcularImpuestos(), 0
    );

    totalTotal = juegos.reduce(
        (acumulador, item) => acumulador + item.calcularTotal(), 0
    );

    textoImpuestos.innerText = totalImpuestos;
    textoTotal.innerText = totalTotal;
}

///Enviando datos del localstorage mediante DOM sobre la última busqueda
function restaurar(){
    let nombre = JSON.parse(localStorage.getItem("nombre"));
    let valor = JSON.parse(localStorage.getItem("valor"))
    let impuestos = JSON.parse(localStorage.getItem("impuestos"))
    let total = JSON.parse(localStorage.getItem("total"))
    historial.innerHTML = "Tu última búsqueda fué: " + nombre +"<br>" + "Indicado en la plataforma: $" +  valor + "<br>" + " Impuestos: $" + impuestos + "<br>" + "TOTAL: $" + total
}
///Toma los objetos del array del JSON para aplicarlos dentro de la página.
async function usoJson(){
    let cartas = document.getElementById("json")
    let response;
    let data;

    try{
        response = await fetch("../json/juegos.json");
        data = await response.json();
    } catch (error){
        console.log(error)
    }
    data.forEach((jogo)=> {
        let card = document.createElement("div")
        card.innerHTML = `
        <div class="card m-5" style="width: 18rem;">
        <img class="card-img-top  w-100" src="${jogo.imagen}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${jogo.nombre}</h5>
          <p class="card-text">$${jogo.precio}</p>
          <p class="card-text text-danger">$${jogo.precioReal}</p>
        </div>
      </div>`;
      cartas.append(card)
    })
}

/// Secuencia
function main() {
    inicializarElementos();
    calcularTotales();
    validacion();
    usoJson()
}
///inicio de ciclo.
main()