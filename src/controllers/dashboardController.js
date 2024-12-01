// dashboardController.js

var dashboardModel = require("../models/dashboardModel");

function listarBairros(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("idUsuario undefined!");
    }

    dashboardModel.listarBairros(idUsuario)
        .then(function (resultado) {
            if (resultado.length >= 1) {
                res.status(200).json(resultado);
            } else {
                res.status(404).json({ message: "Nenhum resultado encontrado!" });
            }
        })
        .catch(function (erro) {
            console.log("Houve um erro ao buscar bairros!" + erro.sqlMenssage);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterNomeEmpresa(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("idUsuario undefined!");
    }

    dashboardModel.obterNomeEmpresa(idUsuario)
        .then(function (resultado) {
            if (resultado) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).json({ message: "Empresa não encontrada!" });
            }
        })
        .catch(function (erro) {
            console.log("Erro ao buscar nome da empresa:" + erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarDadosBairro(req, res) {
    var bairro = req.params.bairro;

    if (bairro == undefined) {
        res.status(400).send("Bairro undefined!");
    }

    dashboardModel.listarDadosBairro(bairro)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao buscar dados do bairro:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarBairros,
    obterNomeEmpresa,
    listarDadosBairro,
};
