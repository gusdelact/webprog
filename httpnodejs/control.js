var edad = 18;

if ( edad == 18 ) {
 console.log("Recien eres un mayor de edad");
} else if ( edad < 18) {
 console.log("Menor de edad");
} else if ( edad > 18 ) {
  console.log("Mayor de edad");
} else {
  console.log('caso no identificado');
}

var mensaje = 'hola';
switch (mensaje) 
{
   case 'hola':
     console.log('saludo');
	 break;
   case 'adios':
     console.log('despedida');
	 break;   
   default:
     console.log('otro caso');
	 break;
}
