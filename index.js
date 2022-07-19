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
        juegos.push(juegoARegistrar);
        limpiarTabla();
        agregarProductosTabla();
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
/// Secuencia
function main() {
    inicializarElementos();
    recuperar()
}
///inicio de ciclo.
main()
function recuperar(){ 
    let nube = JSON.parse(localStorage.getItem("cloud"))
    nombre = nube.nombre
    valor = nube.valor
    impuestos = nube.impuestos
    total = nube.total
    let recuperarData = new Producto(
        nombre,
        valor,
        impuestos,
        total
    )
    juegos.push(recuperarData)
}