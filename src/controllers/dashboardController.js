// dashboardController.js

var dashboardModel = require("../models/dashboardModel");

function listarBairros(req, res) {
    var idUsuario = req.params.idUsuario;
    

    dashboardModel.listarBairros(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}

module.exports = {
    listarBairros
};