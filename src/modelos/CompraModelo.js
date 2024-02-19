var connection = require('../conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var CompraModelo = {};

//---------------------------------------------------------------
//obtenemos todos las Compras
CompraModelo.getCompras = function (callback)
{
    if (connection)
    {

        var sql = "SELECT compras.idCompra"
                +", proveedores.pNombre as idProveedor"
                +", compras.fechaCompra"
                +", compras.lote"
                +", compras.fechaEntrega"
                +" FROM compras"
                +" INNER JOIN proveedores on compras.idProveedor = proveedores.idProveedor;";
        
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
//obtenemos una Compra por su id
CompraModelo.getCompra = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT compras.idCompra"
                +", proveedores.pNombre as idProveedor"
                +", compras.fechaCompra"
                +", compras.lote"
                +", compras.fechaEntrega"
                +" FROM compras"
                +" INNER JOIN proveedores on compras.idProveedor = proveedores.idProveedor"
                +" WHERE compras.idCompra = " 
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
//obtenemos el informe 1

CompraModelo.informe1 = function (InformepData, callback)
 {
    
    if (connection)
    { 
        var sql = "SELECT compras.idCompra, pr.pNombre as idProveedor, compras.fechaCompra, compras.lote, compras.fechaEntrega"
                +" FROM compras INNER JOIN proveedores as pr ON compras.idProveedor = pr.idProveedor"
                +" WHERE compras.idProveedor = "+ connection.escape(InformepData.id)
                +" AND compras.fechaEntrega BETWEEN "+ connection.escape(InformepData.fecha1)             
                +" AND "+ connection.escape(InformepData.fecha2) + " ;";


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
//añadir una nueva Compra

CompraModelo.insertCompra = function (CompraData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO `compras` SET ?";

        connection.query(sql, CompraData, function (error, result)
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
//actualizar una compra
CompraModelo.updateCompra = function (CompraData, callback)
 {
    
    if (connection)
    { 
        var sql = "UPDATE `compras` SET `idProveedor` = " + connection.escape(CompraData.idProveedor)
                    + ", `fechaCompra` = " + connection.escape(CompraData.fechaCompra)
                    + ", `lote` = " + connection.escape(CompraData.lote)
                    + ", `fechaEntrega` = " + connection.escape(CompraData.fechaEntrega)
                    + " WHERE  `idCompra`  =  " + connection.escape(CompraData.idCompra)+";";


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
module.exports = CompraModelo;

