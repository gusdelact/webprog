var fs = require('fs');

//generar datos
var buffer = new Array();
var letra='a';
for (var i=0;i<100000;i++) {
  buffer[i]=letra;
}

fs.writeFile('datos.txt',  buffer, function(error) {
   if (error) throw  error;
   console.log('Archivo guardado');
});
console.log('Empezando escritura de archivo');
var acumulador = 0;
for (var i=0;i<100000;i++) {
   acumulador+=i;
}
console.log(acumulador);
