var connection = require('../conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var UniversalModelo = {};

//---------------------------------------------------------------
//obtenemos todos los Catalogos Universales
UniversalModelo.getUniversales = function (callback)
{
    if (connection)
    {

        var sql = "SELECT `idCatalogo`, `denominacionCat`, `catalogoCat`, `llaveForanea` FROM `catalogouniversal` ;";
        
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
//obtenemos un tipo de Catalogo Universal
UniversalModelo.getUniversalTipo = function (tip, callback)
{
    if (connection)
    {
        var sql = "SELECT 	`idCatalogo`, "
		            +" `denominacionCat`, "
                    +" `catalogoCat`, "
                    +"`llaveForanea` "
                +" FROM `catalogouniversal`"
                +" WHERE `llaveforanea`  =  " 
                + connection.escape(tip) + ";";                
                        

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
//---------------------------------------------------------------
//obtenemos un Catalogo Universal por su id
UniversalModelo.getUniversal = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT 	`idCatalogo`, "
		            +" `denominacionCat`, "
                    +" `catalogoCat`, "
                    +"`llaveForanea` "
                +" FROM `catalogouniversal`"
                +" WHERE `idCatalogo`  = " 
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
//añadir un nuevo Catalogo Universal

UniversalModelo.insertUniversal = function (UniversalData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO `catalogouniversal` SET ?";

        connection.query(sql, UniversalData, function (error, result)
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
//actualizar un Catalogo Universal
UniversalModelo.updateUniversal = function (UniversalData, callback)
 {

    if (connection)
    {
        var sql = "UPDATE `catalogouniversal` SET `denominacionCat` = " + connection.escape(UniversalData.denominacionCat)
                    + ", `catalogoCat` = " + connection.escape(UniversalData.catalogoCat)
                    + ", `llaveForanea` = " + connection.escape(UniversalData.llaveForanea)
                    + " WHERE  `idCatalogo`  =  " + connection.escape(UniversalData.idCatalogo)+";";


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
module.exports = UniversalModelo;

