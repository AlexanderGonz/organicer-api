

const http = require('http');

http.createServer( (request, res) => {

  res.writeHead(200, { 'Content-Type': 'application/json' });

  let salida = {
    nombre: 'Alexander',
    edad: 32,
    url: request.url
  }

    res.write(JSON.stringify(salida))
  // res.write('Hello World, This Is Me (8)')
  res.end();

})
.listen(4000);

console.log('Escuchando en el puerto 4000');
