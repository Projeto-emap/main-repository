// dashboard.js
var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listarBairros/:idUsuario", dashboardController.listarBairros);

module.exports = router;