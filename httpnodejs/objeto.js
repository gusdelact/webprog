function Gato(nombre) {
  this.nombre = nombre;
}
var gato = new Gato("silvestre");
console.log(gato.nombre);
var gato2 = new Gato("benito");
console.log(gato2.nombre);

var objeto = new Object();
objeto.cadena = ' hola';
objeto.entero = 1;
objeto.real = 3.14159;
objeto.print = function () {
   console.log ( " cadena :"+ this.cadena);
   console.log ( " entero :"+ this.entero);
   console.log ( " entero :"+ this.real);
}
objeto.print();
console.log(objeto['real']);