//Constantes y var
const productos = [];
let tabla;
let textoImpuestos;
let textoTotal;

/// funcion con variable de nombre
let neim = prompt("Cómo te llamas?")
function nombr(neim){
    
    if (neim == "" || neim === null){
        alert("Por favor ingrese su nombre!")
		neim = prompt("Ingrese nombre")
        nombr()
    }

    else{
        edad()
    }

    return neim
}

///funcion que verifica edad mediante if y en caso de estar en la correspondiente dará con la funcion anterior.
function edad(){
    let years = parseInt(prompt("Que edad tenés " + neim +  "? Ingresa número."))
    if (years >= 120 ){
        alert("Estás muy viejo :(")
        edad()
    } 
    
    else if (years < 18){
        alert("Todavía sos muy joven")
        edad()
    }
    
    else if (years > 18){
        alert(neim + ", calculemos el coste total de tus juegos.")
        registrarProductos()

    }
    
    else{
        alert("Por favor " + neim + " ingrese su edad para poder continuar")
        edad()
    }
}

///OBJETO
class Producto {
    constructor(nombre, valor, impuestos, total) {
        this.nombre = nombre.toUpperCase();
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

///Entrada de Objetos mediante prompt
function registrarProductos() {
    let numeroProductos = parseInt(prompt("Cuantos juegos quiere calcular?"));
    for (let index = 0; index < numeroProductos; index++) {
        let nombre = prompt("Ingrese el nombre del juego para poder identificarlo en la tabla");
        if(nombre == null || nombre === ""){
            alert("Ingrese nombre por favor!")
            nombre = prompt("Ingrese el nombre del juego para poder identificarlo en la tabla")
        }
        
        let valor = parseFloat(prompt("Ingrese el precio que indica steam"));
        if(valor === null || valor === 0 || valor === NaN || valor === "0"){
            alert("Ingrese valor por favor!")
            valor = parseFloat(prompt("Ingrese el precio que indica steam"))
        }


        let impuestos = valor * 0.65;
        let total = valor + impuestos;

        let juegoARegistrar = new Producto(
            nombre,
            valor,
            impuestos,
            total
    );
    productos.push(juegoARegistrar);
  }
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
}

///Totales para visualización del usuario
function calcularTotales() {
    let totalImpuestos = 0;
    let totalTotal = 0;
  
    totalImpuestos = productos.reduce(
      (acumulador, item) => acumulador + item.calcularImpuestos(),
      0
    );
  
    totalTotal = productos.reduce(
      (acumulador, item) => acumulador + item.calcularTotal(),
      0
    );
  
    textoImpuestos.innerText = totalImpuestos;
    textoTotal.innerText = totalTotal;
  
}

/// Secuencia
function main() {
    nombr();
    inicializarElementos();
    agregarProductosTabla();
    calcularTotales()
}
///inicio de ciclo.
main();
