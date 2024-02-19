//obtenemos el modelo TipDocModel con toda la funcionalidad
var CompraModelo = require('../modelos/CompraModelo');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todos los tipos de documentos
    router.get("/", function (req, res)
    {
        
        CompraModelo.getCompras(function (error, data){
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el tipo de documento solicitado
    router.get("/I/:id", function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id))
        {
            CompraModelo.getCompra(id, function (error, data)
            {
                //si el tipo de documento existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0)
                {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else
                {
                    res.json(404, { "msg": "Registro no Existe" });
                }
            });
        }
        else //si hay algún error
        {
            res.status(500).json({ "msg": "error" });
        }
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el informe 1
    router.get("/N1/:idProveedor/:fechaInicial/:fechaFinal", function (req, res)
    {
        //almacenamos los datos de la petición en un objeto
        var idProveedor = req.params.idProveedor;
        var fechaInicial = req.params.fechaInicial;
        var fechaFinal = req.params.fechaFinal;
        var InformepData =
            {
                id: idProveedor,
                fecha1: fechaInicial,
                fecha2: fechaFinal
            };

        //usamos la funcion para consultar
        CompraModelo.informe1(InformepData, function (error, data)
        {
            //si el tipo de documento existe lo mostramos en formato json
            if (typeof data !== 'undefined' && data.length > 0)
                {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else
                {
                    res.json(404, { "msg": "Registro no Existe" });
                }
        });
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {
        var CompraData =
            {
                idCompra: null,
                idProveedor: req.body.idProveedor,
                fechaCompra: req.body.fechaCompra,
                lote: req.body.lote,
                fechaEntrega: req.body.fechaEntrega
            };


        //usamos la funcion para insertar
        CompraModelo.insertCompra(CompraData, function (error, data)
        {
            //console.log(" 44 tipo doc " +TipDocData.tipo_documento+"  ini  "+TipDocData.iniciales_tip_doc);
            //se muestra el mensaje correspondiente
            if (data)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send({ error: "boo:(" });
            }
        });
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res)
    {
        //almacenamos los datos de la petición en un objeto

        var CompraData =
            {
                idCompra: req.body.idCompra,
                idProveedor: req.body.idProveedor,
                fechaCompra: req.body.fechaCompra,
                lote: req.body.lote,
                fechaEntrega: req.body.fechaEntrega
            };


        //usamos la funcion para actualizar
        CompraModelo.updateCompra(CompraData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data && data.msg)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send({ error: "boo:(" });
            }
        });
    });


    //exportamos el objeto para tenerlo disponible en EL APP
    return router;
}
