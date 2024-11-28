var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/logar", function (req, res) {
    usuarioController.logar(req, res);
});

router.delete("/deletar", function (req, res) {
    usuarioController.deletar(req, res);
});

router.put("/atualizar", function (req, res) {
    usuarioController.atualizar(req, res);
});

router.get("/carregarInfo", function (req, res) {
    usuarioController.carregarInfo(req, res);
})


module.exports = router;