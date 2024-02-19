var connection = require('../conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ProductoModelo = {};

//---------------------------------------------------------------
//obtenemos todos los Productos
ProductoModelo.getProductos = function (callback)
{
    if (connection)
    {

        var sql = "SELECT productos.idProducto, cpro.denominacionCat as categoriaPro, productos.nombreProd, productos.tamanoProd, mpro.denominacionCat as marcaProd, productos.capacidadNuevaOrden, productos.diasEspera FROM productos INNER JOIN catalogouniversal as cpro on productos.categoriaPro = cpro.idCatalogo INNER JOIN catalogouniversal as mpro on productos.marcaProd = mpro.idCatalogo;";
        
        connection.query(sql, function (error, rows) 
        {
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
                //callback(null, JSON.stringify(rows));
            }
        });
    }
}

//---------------------------------------------------------------
//obtenemos un Productos por su id
ProductoModelo.getProducto = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT productos.idProducto, cpro.denominacionCat as categoriaPro, productos.nombreProd, productos.tamanoProd, mpro.denominacionCat as marcaProd, productos.capacidadNuevaOrden, productos.diasEspera"
                +" FROM productos INNER JOIN catalogouniversal as cpro on productos.categoriaPro = cpro.idCatalogo INNER JOIN catalogouniversal as mpro on productos.marcaProd = mpro.idCatalogo"
                +" WHERE productos.idProducto = " 
                + connection.escape(id) + ";";                
                        

        //console.log(id);

        connection.query(sql, function (error, rows)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
                //callback(null, JSON.stringify(rows));
            }
        });
    }
}

//---------------------------------------------------------------
//añadir un nuevo Producto

ProductoModelo.insertProducto = function (ProductoData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO `productos` SET ?";

        connection.query(sql, ProductoData, function (error, result)
        {
           // console.log(" 55 tipo doc " +TipDocData.tipo_documento+"  ini  "+TipDocData.iniciales_tip_doc);
            //se muestra el mensaje correspondiente
            if (error)
            {
                callback(null,{"msg": "Se presento un error"});
                throw error;
            }
            else
            {
                callback(null,{"msg": "Registro Insertado"});
            }
        });
    }
}

//---------------------------------------------------------------
//actualizar un Producto
ProductoModelo.updateProducto = function (ProductoData, callback)
 {

    if (connection)
    { 
        var sql = "UPDATE `productos` SET `categoriaPro` = " + connection.escape(ProductoData.categoriaPro)
                    + ", `nombreProd` = " + connection.escape(ProductoData.nombreProd)
                    + ", `tamanoProd` = " + connection.escape(ProductoData.tamanoProd)
                    + ", `marcaProd` = " + connection.escape(ProductoData.marcaProd)
                    + ", `capacidadNuevaOrden` = " + connection.escape(ProductoData.capacidadNuevaOrden)
                    + ", `diasEspera` = " + connection.escape(ProductoData.diasEspera)
                    + " WHERE  `idProducto`  =  " + connection.escape(ProductoData.idProducto)+";";


        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Registro Actualizado"});
            }
        });
    }
}

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ProductoModelo;

