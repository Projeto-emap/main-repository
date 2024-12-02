var express = require("express");
var router = express.Router();

var eletropostoController = require("../controllers/eletropostoController");

router.post("/cadastrarEletroposto", function (req, res) {
    eletropostoController.cadastrarEletroposto(req, res);
});

router.get("/pegarEletroposto", function (req, res) {
    eletropostoController.pegarEletroposto(req, res);
});

module.exports = router;