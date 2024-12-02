// ../src/routes/dashboard.js
var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/bairros/:idUsuario", dashboardController.listarBairrosEmPotencial);
router.get("/dadosUsuario/:idUsuario", dashboardController.obterDadosUsuario);

module.exports = router;

