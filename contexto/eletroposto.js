var express = require("express");
var router = express.Router();

var eletropostoController = require("../controllers/eletropostoController");

router.post("/cadastrarEletroposto", function (req, res) {
    eletropostoController.cadastrarEletroposto(req, res);
});

router.delete("/deletarEletroposto/:idPontoDeRecarga", (req, res) => {
    eletropostoController.deletarEletroposto(req, res);
});

// Rota GET corrigida para aceitar idUsuario como parâmetro
router.get("/pegarEletroposto/:idUsuario", (req, res) => {
    eletropostoController.pegarEletroposto(req, res);
});

// Rota GET para pesquisar eletropostos por nome

router.get("/pegarInfoUnidade/:idUnidade", (req, res) => {
    eletropostoController.pegarInfoUnidade(req, res);
});

router.put("/atualizarEletroposto/:idUnidade", function (req, res) {
    eletropostoController.atualizarEletroposto(req, res);
});

module.exports = router;