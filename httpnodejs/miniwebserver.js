//segunda version del servidor Web, soporta invocar funciones de
//javascript, asociado a una ruta Web
var http= require('http');
var fs=   require('fs');
var mime= require('mime');
var querystring = require('querystring');
var server= http.createServer();
//seccion de funciones para manejar las rutas
function rutina01(solicitud,respuesta) {
   var dato='';
   solicitud.on('data', function ( buffer) {
      dato += buffer;
      console.log(dato);
   });
   solicitud.on('end',function() {
    var texto =dato.toString();
	console.log('entrada de la forma '+texto);
	var params=querystring.parse(texto);
	console.log(params['input_text']);
    respuesta.writeHead(200,{'Content-Type':'text/plain'});
    respuesta.write('Respondiendo solicitud '+
	   params['input_text'].toUpperCase());
    respuesta.end();
    });
}
var rutas = {
                '/proc_forma01' : rutina01           
            };
  
server.on('request', function(request, response) {
   
   console.log(request.url+ ' metodo HTTP:' + request.method);
   var ruta = 'htdocs' + request.url;
   var funcion = rutas[request.url];
   console.log('Mapeo de ruta es ' + funcion);
   if ( funcion != null ) {
       funcion(request,response);
   } else {
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
   } //if
});
console.log('Servidor en puerto 8888');
server.listen(8888);
