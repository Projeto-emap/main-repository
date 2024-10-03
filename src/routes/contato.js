var express = require("express");
var router = express.Router();

var contatoController = require("../controllers/contatoController");

router.post("/cadastrarContato", function (req, res){
    contatoController.cadastrarContato(req, res);
})

module.exports = router;