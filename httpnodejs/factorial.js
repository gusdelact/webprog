function factorial(numero) 
{
   var acumulador = 1;
   for (var i=1;i<=numero;i++) {
     acumulador = acumulador * i;
   }
   return acumulador;
}

var resultado = factorial(5);
console.log(resultado);
var fact = factorial;
resultado = fact(5);
console.log(resultado);
var fibo = function (numero) {
  var a0=1;
  var a1=1;
  var resultado;
  if (numero == 1 || numero == 2 )  {
    resultado = 1;
  } else if ( numero >= 3) {
     for (var i=1;i<=(numero -2);i++ ) {
	   resultado = a0 + a1 ;
       a0 = a1;
       a1 = resultado;	   
	 }
  } else {
    resultado = 0;
  }
  return resultado;
} 
var fibo3= fibo(3);
console.log(fibo3);
var fibonacci = fibo;
var fibo5=fibonacci(5);
console.log(fibo5);
var print= console.log;
print(fibonacci(6));