var express = require("express");
var router = express.Router();

var eletropostoController = require("../controllers/eletropostoController");

router.post("/cadastrarEletroposto", function (req, res) {
    eletropostoController.cadastrarEletroposto(req, res);
});

router.get("/pegarEletroposto", function (req, res) {
    eletropostoController.pegarEletroposto(req, res);
});

router.put("/atualizarEletroposto", function (req, res) {
    eletropostoController.atualizarEletroposto(req, res);
});

router.delete("/deletarEletroposto", function (req, res) {
    eletropostoController.deletarEletroposto(req, res);
});

module.exports = router;