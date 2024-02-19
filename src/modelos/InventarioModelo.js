var connection = require('../conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var InventarioModelo = {};

//---------------------------------------------------------------
//obtenemos todos los Inventarios
InventarioModelo.getInventarios = function (callback)
{
    if (connection)
    {

        var sql = "SELECT inventarios.idInventario"
        +", bodegas.ubicacion as idBodega"
        +", compras.fechaCompra as idCompra"
        +", productos.nombreProd as idProducto"
        +", inventarios.existencias"
        +", inventarios.fechaVencimiento"
        +", inventarios.precio" 
        +" FROM inventarios"
        +" INNER JOIN bodegas on inventarios.idBodega = bodegas.idBodega"
        +" INNER JOIN compras on inventarios.idCompra = compras.idCompra"
        +" INNER JOIN productos on inventarios.idProducto = productos.idProducto;";
        
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
//obtenemos un Inventario por su id
InventarioModelo.getInventario = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT inventarios.idInventario"
                +", bodegas.ubicacion as idBodega"
                +", compras.fechaCompra as idCompra"
                +", productos.nombreProd as idProducto"
                +", inventarios.existencias"
                +", inventarios.fechaVencimiento"
                +", inventarios.precio"
                +" FROM inventarios"
                +" INNER JOIN bodegas on inventarios.idBodega = bodegas.idBodega"
                +" INNER JOIN compras on inventarios.idCompra = compras.idCompra"
                +" INNER JOIN productos on inventarios.idProducto = productos.idProducto"
                +" WHERE inventarios.idInventario  = " 
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
//añadir un nuevo Inventario

InventarioModelo.insertInventario = function (InventarioData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO `inventarios` SET ?";

        connection.query(sql, InventarioData, function (error, result)
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
InventarioModelo.informe2 = function (InformesData, callback)
 {
    
    if (connection)
    { 
        var sql = "SELECT inv.idInventario, bodegas.ubicacion as idBodega, inv.idCompra, productos.nombreProd as idProducto, inv.existencias, inv.fechaVencimiento, inv.precio"
                +" FROM inventarios as inv INNER JOIN bodegas ON inv.idBodega = bodegas.idBodega"
                +" INNER JOIN productos ON inv.idProducto = productos.idProducto"
                +" WHERE bodegas.idBodega = "+ connection.escape(InformesData.idBod)
                +" AND inv.existencias ="+ connection.escape(InformesData.ex)
                +" AND inv.fechaVencimiento BETWEEN "+ connection.escape(InformesData.fecha1)             
                +" AND "+ connection.escape(InformesData.fecha2) + " ;";


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
//actualizar un Inventario
InventarioModelo.updateInventario = function (InventarioData, callback)
 {

    if (connection)
    {
        var sql = "UPDATE `inventarios` SET `idBodega` = " + connection.escape(InventarioData.idBodega)
                    + ", `idCompra` = " + connection.escape(InventarioData.idCompra)
                    + ", `idProducto` = " + connection.escape(InventarioData.idProducto)
                    + ", `existencias` = " + connection.escape(InventarioData.existencias)
                    + ", `fechaVencimiento` = " + connection.escape(InventarioData.fechaVencimiento)
                    + ", `precio` = " + connection.escape(InventarioData.precio)
                    + " WHERE  `idInventario`  =  " + connection.escape(InventarioData.idInventario)+";";


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
module.exports = InventarioModelo;

