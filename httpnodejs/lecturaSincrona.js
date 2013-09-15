//manejo sincrono de archivos
//Documentacion en http://nodejs.org/api/fs.html
var fs = require('fs');

var contenido = 
fs.readFileSync('D:/webprogram/cib800ago2013/nodescripts/lecturasincrona.js');

console.log(contenido);
console.log('fin de lectura');
var acumulador = 0;
for (var i=0;i<100000;i++) {
   acumulador++;
}
console.log(acumulador);
