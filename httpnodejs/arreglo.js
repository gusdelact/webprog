var arreglo= [1,2,3,4];
for ( var valor in arreglo) {
 console.log(valor);
}
function sumar(arr) {
  var acumulador = 0;
  for (var i=0;i<arr.length;i++) {
   acumulador += arr[i];
  }
  return acumulador;
}
function promedio(arr) {
 var acumulador = 0;
 var promedio=0;
 if (arr.length>=1) { 
  for (var i=0;i<arr.length;i++) {
   acumulador += arr[i];
  }
  promedio = acumulador / arr.length;
 } 
 return promedio;
}
console.log(sumar(arreglo));
var otroArreglo = new Array();
otroArreglo[0]=4;otroArreglo[1]=3;
otroArreglo[2]=2;otroArreglo[3]=1;
console.log(sumar(otroArreglo));

var arregloFunciones= [sumar, promedio];
console.log(arregloFunciones[0](otroArreglo));
console.log(arregloFunciones[1](otroArreglo));