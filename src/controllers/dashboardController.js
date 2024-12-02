// ../src/controllers/dashboardController.js

var dashboardModel = require("../models/dashboardModel");

function listarBairrosEmPotencial(req, res) {
    var idUsuario = req.params.idUsuario;

    dashboardModel.listarBairrosEmPotencial(idUsuario)
        .then((resultado) => {
            if (resultado.length === 0) {
                return res.status(404).json({ mensagem: "Nenhum bairro em potencial encontrado." });
            }
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            res.status(500).json({ mensagem: "Erro ao listar bairros em potencial.", erro });
        });
}

function obterDadosUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    dashboardModel.obterDadosUsuario(idUsuario)
        .then((resultado) => {
            if (!resultado[0]) {
                return res.status(404).json({ mensagem: "Usuário não encontrado." });
            }
            res.status(200).json(resultado[0]);
        })
        .catch((erro) => {
            res.status(500).json({ mensagem: "Erro ao obter dados do usuário.", erro });
        });
}


module.exports = {
    listarBairrosEmPotencial,
    obterDadosUsuario,
};
