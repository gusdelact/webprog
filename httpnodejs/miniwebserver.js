var http= require('http');
var fs=   require('fs');
var mime= require('mime');
var server= http.createServer();

server.on('request', function(request, response) {
   console.log(request.url+ ' metodo HTTP:' + request.method);
   var ruta = 'htdocs' + request.url;
   var tipo= mime.lookup(request.url);
   var entrada=fs.createReadStream(ruta);
   response.writeHead(200,{'Content-Type': tipo } );
   response.on('pipe', function(fuente) {
      console.log('Leyendo del pipe ');
   });

   entrada.pipe(response);
   entrada.on('error',function() {
     response.statusCode=404;
     response.end();	 
   });
});
console.log('Servidor en puerto 8888');
server.listen(8888);
