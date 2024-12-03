// ROUTER dashboard.js
var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listarBairros/:idUsuario", dashboardController.listarBairros);
router.get("/empresa/:idUsuario", dashboardController.obterNomeEmpresa);
router.get("/dadosBairro/:bairro", dashboardController.listarDadosBairro);

module.exports = router;
