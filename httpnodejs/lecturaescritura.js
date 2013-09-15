var fs= require('fs');

//leer el archivo y luego escribir

fs.readFile('datos.txt',function (err,dato) {
   if (err) throw err;
   console.log(dato);
   fs.writeFile('datos2.txt',dato,function(error) {
     if (error) throw error;
     console.log('Archivo copiado');
   });
});

console.log('Copiando archivo');
var acumulador = 0;
for (var i=0;i<100000;i++) {
   acumulador+=i;
}
console.log(acumulador);

//El equivalente se realiza con la funcion pipe 
//del modulo stream http://nodejs.org/api/stream.html

var readStream = fs.createReadStream('datos.txt');
var writeStream = fs.createWriteStream('datos3.txt');
readStream.pipe(writeStream);
