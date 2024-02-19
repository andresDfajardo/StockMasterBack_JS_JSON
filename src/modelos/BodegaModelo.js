var connection = require('../conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var BodegaModelo = {};

//---------------------------------------------------------------
//obtenemos todos las Bodegas
BodegaModelo.getBodegas = function (callback)
{
    if (connection)
    {

        var sql = "SELECT `idBodega`, `ubicacion`, `capacidadMax`, `encargado` FROM `bodegas` ;";
        
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
//obtenemos una Bodega por su id
BodegaModelo.getBodega = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT `idBodega`, "
		            +" `ubicacion`, "
                    +" `capacidadMax`, "
                    +"`encargado` "
                +" FROM `bodegas`"
                +" WHERE `idBodega`  = " 
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
//añadir una nueva Bodega

BodegaModelo.insertBodega = function (BodegaData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO `bodegas` SET ?";

        connection.query(sql, BodegaData, function (error, result)
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
//actualizar una bodega
BodegaModelo.updateBodega = function (BodegaData, callback)
 {

    if (connection)
    { 
        var sql = "UPDATE `bodegas` SET `ubicacion` = " + connection.escape(BodegaData.ubicacion)
                    + ", `capacidadMax` = " + connection.escape(BodegaData.capacidadMax)
                    + ", `encargado` = " + connection.escape(BodegaData.encargado)
                    + " WHERE  `idBodega`  =  " + connection.escape(BodegaData.idBodega)+";";


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
module.exports = BodegaModelo;

