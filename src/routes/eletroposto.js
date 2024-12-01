var express = require("express");
var router = express.Router();

var eletropostoController = require("../controllers/eletropostoController");

router.post("/cadastrarEletroposto", function (req, res) {
    eletropostoController.cadastrarEletroposto(req, res);
});

router.put("/atualizarEletroposto", function (req, res) {
    eletropostoController.atualizarEletroposto(req, res);
});

router.delete("/deletarEletroposto/:idPontoDeRecarga", (req, res) => {
    eletropostoController.deletarEletroposto(req, res);
});

// Rota GET corrigida para aceitar idUsuario como parâmetro
router.get("/pegarEletroposto/:idUsuario", (req, res) => {
    eletropostoController.pegarEletroposto(req, res);
});

module.exports = router;