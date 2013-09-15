ar fs = require('fs');

//llamada asincrona
fs.readFile('D:/webprogram/cib800ago2013/nodescripts/lecturasincrona.js',
  function(error,contenido ){
     if (error) throw error;
	 console.log(contenido);
  });

console.log('Archivo en proceso de lectura');
var acumulador = 0;
for (var i=0;i<100000;i++) {
   acumulador++;
}
console.log(acumulador);
