//obtenemos el modelo TipDocModel con toda la funcionalidad
var ProductoModelo = require('../modelos/ProductoModelo');
var express = require('express');
var router = express.Router();

//creamos el ruteo de la clase
module.exports = function ()
{

    //---------------------------------------------------------------
    //Muestra el método CRUL Listar que muestra todos los tipos de documentos
    router.get("/", function (req, res)
    {
        
        ProductoModelo.getProductos(function (error, data){
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
            ProductoModelo.getProducto(id, function (error, data)
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
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {

        var ProductoData =
            {
                idProducto: null,
                categoriaPro: req.body.categoriaPro,
                nombreProd: req.body.nombreProd,
                tamanoProd: req.body.tamanoProd,
                marcaProd: req.body.marcaProd,
                capacidadNuevaOrden: req.body.capacidadNuevaOrden,
                diasEspera: req.body.diasEspera
            };


        //usamos la funcion para insertar
        ProductoModelo.insertProducto(ProductoData, function (error, data)
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

        var ProductoData =
            {
                idProducto: req.body.idProducto,
                categoriaPro: req.body.categoriaPro,
                nombreProd: req.body.nombreProd,
                tamanoProd: req.body.tamanoProd,
                marcaProd: req.body.marcaProd,
                capacidadNuevaOrden: req.body.capacidadNuevaOrden,
                diasEspera: req.body.diasEspera
            };


        //usamos la funcion para actualizar
        ProductoModelo.updateProducto(ProductoData, function (error, data)
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
