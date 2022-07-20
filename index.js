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
    
    localStorage.clear
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
    localStorage.setItem("nombre", JSON.stringify(nombre))
    localStorage.setItem("valor", JSON.stringify(valor))
    localStorage.setItem("impuestos", JSON.stringify(impuestos))
    localStorage.setItem("total", JSON.stringify(total))
    localStorage.setItem("cloud", JSON.stringify(juegos))
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
    historial.innerHTML ="Tu última búsqueda fué: " + nombre +"<br>" + "Indicado en la plataforma: $" +  valor + "<br>" + " Impuestos: $" + impuestos + "<br>" + "TOTAL: $" + total
    console.log(JSON.parse(localStorage.getItem("cloud")))
}

///OPERADORES
function validacion(){
    cookies = localStorage.length
    cookies > 0 ? restaurar() : null
}

/// Secuencia
function main() {
    inicializarElementos();
    calcularTotales();
    validacion()
}
///inicio de ciclo.
main()
