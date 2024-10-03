contatoModel = require("../models/contatoModel");
function cadastrarContato(req, res) {

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var mensagem = req.body.mensagemServer;


    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (mensagem == undefined) {
        res.status(400).send("Sua mensagem está undefined");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        contatoModel.cadastrarContato(nome, email, mensagem)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrarContato
}