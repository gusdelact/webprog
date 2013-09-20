//segunda version del servidor Web, soporta invocar funciones de
//javascript, asociado a una ruta Web
//Requirir todos los modulos de Node.js
//modulo para dar servicio HTTP y manejar solicitud y respuestas
var http= require('http'); 
//modulo para manipular archivos (tanto leer o escribir)
var fs=   require('fs');
//modulo para indicar el tipo de archivo a transmitir, dada su extension
//instalar con npm install mime
var mime= require('mime');
//modulo permite leer los nombres y valores de una cadena en formato 
//HTTP querystring
var querystring = require('querystring');
//indica que se debe crear un servidor
var server= http.createServer();
//seccion de funciones para manejar las rutas
function rutina01(solicitud,respuesta) 
{
   //buffer para almacenar los datos que llegan de la forma HTML
   var dato='';
   //registrar la retrollamada para obtener los datos de la forma
   solicitud.on('data', 
     function ( buffer) {
      dato += buffer;
      console.log(dato);
     }
   );
   //registrar la retrollamada a realizar cuando ya no hay mas datos
   solicitud.on('end',
    function() {
	    //convertir el buffer de datos a cadena de caracteres
		var texto =dato.toString();
		console.log('entrada de la forma '+texto);
		//el modulo querystring permite interpretar una cadena
		//en formato var1=val1&var2=val2&var3=val3&...&varN=valN
		//y lo convierte a un objeto JScript, donde el objeto tiene
		//como propiedades a var1, var2 hasta varN; y cada propiedad
		//tiene el correspondiente valor que se obtiene de la cadena
		var params=querystring.parse(texto);
		//el objeto params ya se puede indexar por el nombre del campo
		//de la forma HTML
		console.log(params['input_text']);
		//contestar que es correcto y se envia solo texto plano
		respuesta.writeHead(200,{'Content-Type':'text/plain'});
		//se escribe la respuesta como un texto y el valor de input_text
		//en mayusculas
		respuesta.write('Respondiendo solicitud '+
		   params['input_text'].toUpperCase());
		//OJO, nunca olvidar el cerrar la respuesta, con end()
		respuesta.end();
    }
	);
}//rutina01
function rutina02(solicitud,respuesta)  
{
  var dato='';
  solicitud.on('data',
    function(buffer) {
	  dato += buffer;
	}
  );
  solicitud.on('end', 
    function() {
	     respuesta.writeHead(200,{'Content-Type':'text/plain'} );
	     respuesta.write(dato.toString());
         respuesta.end();
     }	
  );
} //rutina02
//objeto de JScript que contiene la cadena de la ruta y su respectiva funcion
//a invocar. Para agregar nuevas rutas que se asocien a funciones, se
//debe editar esta estructura de datos
var rutas = {
                '/proc_forma01' : rutina01 ,
                '/proc_forma02' : rutina02				
            };
  
//registra que para el evento de solicitud al servidor, utilice la función
//anonima adjunta  
server.on('request', 
   //recibe la peticion del cliente y escribe una respuesta
  function(request, response) {
   
   console.log(request.url+ ' metodo HTTP:' + request.method);
   //verificar si la ruta está asociada con una funcion a ejecutar
   var funcion = rutas[request.url];
   console.log('Mapeo de ruta es ' + funcion);
   //si hay una funcion registrada para el URL requerido
   if ( funcion != null ) {
       //invocar de manera dinamica a la funcion que se debe ejecutar
	   //dicha funcion siempre debe tener como parametro la solicitud (request)
	   //y la respueta (response) a realizar
       funcion(request,response);
   } else {
     //si la URL no esta registrada, se debe entregar contenido estatico
	 //y disponible en el directorio htdocs
	 //indicar la ruta del sistema de archivos donde pueden estar los recursos
       var ruta = 'htdocs' + request.url;
	 //identificar el tipo MIME dada la URL solicitada
	   var tipo= mime.lookup(request.url);
	   //obtener el flujo de lectura del archivo solicitado
	   var entrada=fs.createReadStream(ruta);
	  //indicar que el recurso se entrego bien (codigo 200 HTTP)
     // e indica el tipo de dato a entregar
	   response.writeHead(200,{'Content-Type': tipo } );
	   //en el caso de que se idenfique que la respuesta esta en un pipe
	   //se puede hacer codigo adicional, en este caso solo se imprime 
	   //a pantalla
	   response.on('pipe', function(fuente) {
		  console.log('Leyendo del pipe ');
	   });
       //leer de manera asincrona el flujo de entrada (asociado al archivo)
	   //y su contenido volcarlo al flujo de HTTP response
	   entrada.pipe(response);
	   //en caso de que la lectura del flujo de entrada tenga error, indicar
	   //al cliente con error 404. Aun no es lo mejor para manejar
	   //que el archivo no existe
	   entrada.on('error',function() {
		 response.statusCode=404;
		 response.end();	 
      });
   } //if
  }//function
 );
console.log('Servidor en puerto 8888');
//queda escuchando en el puerto TCP 8888
server.listen(8888);
