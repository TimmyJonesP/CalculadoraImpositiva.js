//Constantes y var
const productos = [];
let tabla;
let textoTotal;
let textoImpuestos;
///OBJETO
class Producto {
    constructor(nombre, valor, impuestos, total) {
        this.nombre = nombre;
        this.valor = valor;
        this.impuestos = impuestos;
        this.total = total;
    }
    ///Totales reducidos
    calcularImpuestos = () => this.impuestos;
    calcularTotal = () => this.total;
}

///Entrada a Tabla
function inicializarElementos() {
    tabla = document.getElementById("tabla-productos");
    textoImpuestos = document.querySelector("#totalImpuestos span");
    textoTotal = document.querySelector("#totalTotal span");
}

///Agregar objetos a la tabla.
function agregarProductosTabla() {
    productos.forEach((producto) => {
        let filaTabla = document.createElement("tr");
        filaTabla.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.valor}</td>
        <td>${producto.impuestos}</td>
        <td>${producto.total}</td>`;
        tabla.tBodies[0].append(filaTabla);
    });
    calcularTotales()
}
///funcion para limpiar la tabla e imprimir bien el array
function limpiarTabla() {
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}
///Totales para visualización del usuario
function calcularTotales() {
    let totalImpuestos = 0;
    let totalTotal = 0;

    totalImpuestos = productos.reduce(
        (acumulador, item) => acumulador + item.calcularImpuestos(), 0
    );

    totalTotal = productos.reduce(
        (acumulador, item) => acumulador + item.calcularTotal(), 0
    );

    textoImpuestos.innerText = totalImpuestos;
    textoTotal.innerText = totalTotal;
}
///Entrada de Objetos
let entry = document.getElementById("entry");
entry.addEventListener("click", registro);
function registro(e) {
    e.preventDefault()

    let nombre = document.getElementById("name").value;
    let valor = parseInt(document.getElementById("precio").value);
    let impuestos = valor * 0.65;
    let total = valor + impuestos;

    let juegoARegistrar = new Producto(
        nombre,
        valor,
        impuestos,
        total
    );
    productos.push(juegoARegistrar);
    limpiarTabla()
    agregarProductosTabla()
}
/// Secuencia
function main() {
    inicializarElementos();
    calcularTotales()
}
///inicio de ciclo.
main()