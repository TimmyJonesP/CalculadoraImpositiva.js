///Alerta de bienvenida!
alert("Hola, bienvenido a Steamcito. Podes ingresar el valor del juego que queres adquirir y te daremos el precio final contando los impuestos argentinos!" )
/// funcion con variable de nombre
let nombre = prompt("Cómo te llamas?")
function nombr(nombre){
    if (nombre == ""){
        alert("Por favor ingrese su nombre!")
        nombr()
    }
    else{
        edad()
    }
    return nombre
}
///Funcion que se activa si la edad está dentro de la correcta
function steam (){
    let juego = parseFloat(prompt("Bien " + nombre + ", ingrese el valor del juego igual que se vé publicado en la plataforma ó página web."))
    const IVA = (juego * 0.65);
    let valor = juego + IVA;
    
    alert(nombre + " el valor que se verá reflejado en la tarjeta contando los impuestos estatales es de $" + valor + " totales!")
    another()
}

///funcion que verifica edad mediante if y en caso de estar en la correspondiente dará con la funcion anterior.
function edad(){
    let years = parseInt(prompt("Que edad tenés " + nombre +  "? Ingresa número."))
    if (years >= 120 ){
        alert("Estás muy viejo :(")
    } 
    
    else if (years < 18){
        alert("Todavía sos muy joven")
    }
    
    else if (years > 18){
        alert(nombre + ", calculemos el coste total de tu juego.")
        steam()
    }

    else{
        alert("Por favor " + nombre + " ingrese su edad para poder continuar")
        edad()
    }
}
///función de si quiere sacar los impuestos de otro juego
function another(){
    let otro = prompt("Desea calcular el coste de otro juego ó aplicación?\n si \n no")
    if (otro == "si"){
        steam()
    }
    else if (otro == "Si"){
        steam()
    }
    else if (otro == "SI"){
        steam()
    }
    else if (otro == "no"){
        alert("Gracias por utilizar nuestra plataforma para verificar el precio del producto!")
    }
    else if (otro == "No"){
        alert("Gracias por utilizar nuestra plataforma para verificar el precio del producto!")
    }
    else if (otro == "NO"){
        alert("Gracias por utilizar nuestra plataforma para verificar el precio del producto!")
    }
    else{
        alert("Debe confirmar con Si ó No")
        another()
    }
    
}
/// Llamado al inicio de ciclo!
nombr()