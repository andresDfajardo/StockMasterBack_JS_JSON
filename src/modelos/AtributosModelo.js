var connection = require('../conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var AtributosModelo = {};

//---------------------------------------------------------------
//obtenemos todos los Atributos Multivariados
AtributosModelo.getAtributos = function (callback)
{
    if (connection)
    {

        var sql = "SELECT atributosmultivariados.idAtributoMultivariado"
        +", prov.pNombre as idProveedor"
        +", ctipo.denominacionCat as idTipo"
        +", atributosmultivariados.valorAtributoMultivariado"
        +" FROM atributosmultivariados"
        +" INNER JOIN catalogouniversal as ctipo on atributosmultivariados.idTipo = ctipo.idCatalogo"
        +" INNER JOIN proveedores as prov on atributosmultivariados.idProveedor = prov.idProveedor;";
        
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
//obtenemos un Atributo Multivariado por su id
AtributosModelo.getAtributo = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT atributosmultivariados.idAtributoMultivariado"
                +", prov.pNombre as idProveedor"
                +", ctipo.denominacionCat as idTipo"
                +", atributosmultivariados.valorAtributoMultivariado"
                +" FROM atributosmultivariados"
                +" INNER JOIN catalogouniversal as ctipo on atributosmultivariados.idTipo = ctipo.idCatalogo"
                +" INNER JOIN proveedores as prov on atributosmultivariados.idProveedor = prov.idProveedor"
                +" WHERE atributosmultivariados.idAtributoMultivariado = " 
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
//añadir un nuevo Atributo Multivariado

AtributosModelo.insertAtributo = function (AtributoData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO `atributosmultivariados` SET ?";

        connection.query(sql, AtributoData, function (error, result)
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
//actualizar un Atributo Multivariado
AtributosModelo.updateAtributo = function (AtributoData, callback)
 {
    
    if (connection)
    { 
        var sql = "UPDATE `atributosmultivariados` SET `idProveedor` = " + connection.escape(AtributoData.idProveedor)
                    + ", `idTipo` = " + connection.escape(AtributoData.idTipo)
                    + ", `valorAtributoMultivariado` = " + connection.escape(AtributoData.valorAtributoMultivariado)
                    + " WHERE  `idAtributoMultivariado`  =  " + connection.escape(AtributoData.idAtributoMultivariado)+";";


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
module.exports = AtributosModelo;

