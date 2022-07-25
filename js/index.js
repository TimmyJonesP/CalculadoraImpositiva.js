//Constantes y var
const juegos = [];
let tabla;
let textoTotal;
let textoImpuestos;

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

///Entrada de Objetos
let entry = document.getElementById("entry");
entry.addEventListener("click", registro);
function registro(e) {
    e.preventDefault()
    
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
    ///una tostadita porque queda lindo.
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
///usando el localstorage
function restaurar(){
    let nombre = JSON.parse(localStorage.getItem("nombre"));
    let valor = JSON.parse(localStorage.getItem("valor"))
    let impuestos = JSON.parse(localStorage.getItem("impuestos"))
    let total = JSON.parse(localStorage.getItem("total"))
    historial.innerHTML = "Tu última búsqueda fué: " + nombre +"<br>" + "Indicado en la plataforma: $" +  valor + "<br>" + " Impuestos: $" + impuestos + "<br>" + "TOTAL: $" + total
    console.log(JSON.parse(localStorage.getItem("cloud")))
}

///OPERADORES
function validacion(){
    cookies = localStorage.length
    cookies > 0 ? restaurar() : historial.innerHTML = ""
}

/// Secuencia
function main() {
    inicializarElementos();
    calcularTotales();
    validacion()
}
///inicio de ciclo.
main()
