var express = require('express');//guarda express que nosotros intalamos
var bodyParser = require('body-parser'), port = 3000;//rmanejo de cuerpo de la "pagina" y puerto
var http = require('http');//protocolo de intercambio de archivos
var path = require('path');//direccion
var conectado = require('./src/conexion/index');
var universal = require('./src/rutas/UniversalRuta');//ruta
var proveedor = require('./src/rutas/ProveedorRuta');//ruta
var producto = require('./src/rutas/ProductoRuta');//ruta
var atributo = require('./src/rutas/AtributosRuta');//ruta
var compra = require('./src/rutas/CompraRuta');//ruta
var bodega = require('./src/rutas/BodegaRuta');//ruta
var inventario = require('./src/rutas/InventarioRuta');//ruta

var app = express();//recibe un constructor
// todos los entornos

app.set('port', process.env.PORT || port);//metodo para recibir puerto y proceso

app.use(bodyParser.json({type: 'application/json', limit: '10mb'}));//recibe un cuerpo y un objeto json

app.use(bodyParser.urlencoded({extended: false}));//recibe url codificada

app.use(express.static(path.join(__dirname, 'public')));//recibe direccion

//================================================================

app.use(function (req, res, next)

{

// Sitio web al que desea permitir que se conecte

res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

// A que métodos que desea dar permisos

res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// A que encabezados se les va a dar permiso

res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//Establezca en verdadero si necesita que el sitio web incluya cookies en las solicitudes enviadas

//a la API (por ejemplo, en caso de que use sesiones)

res.setHeader('Access-Control-Allow-Credentials', true);

// Pase a la siguiente capa de middleware

next();

});

//============================================================

app.use('/universal', universal());//ruta para el servicio
app.use('/proveedor', proveedor());//ruta para el servicio
app.use('/producto', producto());//ruta para el servicio
app.use('/atributo', atributo());//ruta para el servicio
app.use('/compra', compra());//ruta para el servicio
app.use('/bodega', bodega());//ruta para el servicio
app.use('/inventario', inventario());//ruta para el servicio

http.createServer(app).listen(app.get('port'), function ( )

{

console.log('Servidor Express escuchando por el puerto ' + app.get('port'));

});

module.exports = app;