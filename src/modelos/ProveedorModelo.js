var connection = require('../conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var ProveedorModelo = {};

//---------------------------------------------------------------
//obtenemos todos los Proveedores
ProveedorModelo.getProveedores = function (callback)
{
    if (connection)
    {

        //var sql = "SELECT `idProveedor`, `tipoDocumentoPro`, `documentoPro`, `pNombre`, `sNombre`, `pApellido`, `sApellido`, `nombreContacto`, `ciudadProv`, `tipoProveedor` FROM `proveedores` ;";
        var sql = "SELECT proveedores.idProveedor, tdoc.denominacionCat as tipoDocumentoPro, proveedores.documentoPro, proveedores.pNombre, proveedores.sNombre, proveedores.pApellido, proveedores.sApellido, proveedores.nombreContacto, tci.denominacionCat as ciudadProv, tpro.denominacionCat as tipoProveedor FROM proveedores INNER JOIN catalogouniversal as tdoc on proveedores.tipoDocumentoPro = tdoc.idCatalogo INNER JOIN catalogouniversal as tci on proveedores.ciudadProv = tci.idCatalogo INNER JOIN catalogouniversal as tpro on proveedores.tipoProveedor = tpro.idCatalogo;";
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
//obtenemos un Proveedor por su id
ProveedorModelo.getProveedor = function (id, callback)
{
    if (connection)
    {
        var sql = "SELECT proveedores.idProveedor, tdoc.denominacionCat as tipoDocumentoPro, proveedores.documentoPro, proveedores.pNombre, proveedores.sNombre, proveedores.pApellido, proveedores.sApellido, proveedores.nombreContacto, tci.denominacionCat as ciudadProv, tpro.denominacionCat as tipoProveedor"
                +" FROM proveedores INNER JOIN catalogouniversal as tdoc on proveedores.tipoDocumentoPro = tdoc.idCatalogo INNER JOIN catalogouniversal as tci on proveedores.ciudadProv = tci.idCatalogo INNER JOIN catalogouniversal as tpro on proveedores.tipoProveedor = tpro.idCatalogo"
                +" WHERE proveedores.idProveedor  = " 
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
//añadir un nuevo Proveedor

ProveedorModelo.insertProveedor = function (ProveedorData, callback)
{
    if (connection)
    {
        var sql = "INSERT INTO `proveedores` SET ?";

        connection.query(sql, ProveedorData, function (error, result)
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
//actualizar un Proveedor
ProveedorModelo.updateProveedor = function (ProveedorData, callback)
 {

    if (connection)
    {
        var sql = "UPDATE `proveedores` SET `tipoDocumentoPro` = " + connection.escape(ProveedorData.tipoDocumentoPro)
                    + ", `documentoPro` = " + connection.escape(ProveedorData.documentoPro)
                    + ", `pNombre` = " + connection.escape(ProveedorData.pNombre)
                    + ", `sNombre` = " + connection.escape(ProveedorData.sNombre)
                    + ", `pApellido` = " + connection.escape(ProveedorData.pApellido)
                    + ", `sApellido` = " + connection.escape(ProveedorData.sApellido)
                    + ", `nombreContacto` = " + connection.escape(ProveedorData.nombreContacto)
                    + ", `ciudadProv` = " + connection.escape(ProveedorData.ciudadProv)
                    + ", `tipoProveedor` = " + connection.escape(ProveedorData.tipoProveedor)
                    + " WHERE  `idProveedor`  =  " + connection.escape(ProveedorData.idProveedor)+";";


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
module.exports = ProveedorModelo;

