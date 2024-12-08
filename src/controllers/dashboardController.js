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

function listarPotenciaisBairros(req, res) {
    const idUsuario = req.params.idUsuario;  // Pega o ID do usuário da URL
    dashboardModel.listarPotenciaisBairros(idUsuario)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error("Erro ao listar bairros: ", error);
            res.status(500).json({ message: 'Erro ao buscar bairros com potenciais' });
        });
}

function obterEmplacamentos(req, res) {
    const periodo = req.params.periodo; // 'mensal', 'trimestral', ou 'semestral'

    dashboardModel.obterEmplacamentos(periodo)
        .then((resultado) => {
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            res.status(500).json({ mensagem: "Erro ao obter dados de emplacamentos.", erro });
        });
}

module.exports = {
    listarBairrosEmPotencial,
    obterDadosUsuario,
    listarPotenciaisBairros,
    obterEmplacamentos
};
