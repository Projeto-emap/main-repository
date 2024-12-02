var eletropostoModel = require("../models/eletropostoModel");

function cadastrarEletroposto(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    // var nome = req.body.nomeServer; 
    // var cpf = req.body.cpfServer;
    // var email = req.body.emailServer;
    // var numeroCelular = req.body.numeroCelularServer;
    // var senha = req.body.senhaServer;

    var nome = req.body.nomeServer;
    var cep = req.body.cepServer;
    var bairro = req.body.bairroServer;
    var rua = req.body.ruaServer;
    var numero = req.body.numeroServer;
    var qtdEstacoes = req.body.qtdEstacoesServer;
    var tipoConector = req.body.tipoConectorServer;
    var potenciaDeRecarga = req.body.potenciaDeRecargaServer;
<<<<<<< HEAD
    var redeDeRecarga = req.body.redeDeRecargaServer;
    var fkUsuario = req.body.fkUsuarioServer;
=======
    var redeDeRecarga = req.body.senhaServer;

>>>>>>> ed57a3fb2e53068196b4fccb6602f0151be363cb

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (rua == undefined) {
        res.status(400).send("Seu rua está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else if (qtdEstacoes == undefined) {
        res.status(400).send("Seu qtdEstacoes está undefined!");
    } else if (tipoConector == undefined) {
        res.status(400).send("Seu tipoConector está undefined!");
    } else if (potenciaDeRecarga == undefined) {
        res.status(400).send("Seu potenciaDeRecarga está undefined!");
    } else if (redeDeRecarga == undefined) {
        res.status(400).send("Sua redeDeRecarga está undefined");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
<<<<<<< HEAD
        eletropostoModel.cadastrarEletroposto(nome, cep, bairro, rua, numero, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga, fkUsuario)
=======
        eletropostoModel.cadastrarEletroposto(nome, cep, cidade, rua, numero, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga)
>>>>>>> ed57a3fb2e53068196b4fccb6602f0151be363cb
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

function pegarEletroposto(req, res) {
    var cidade = req.body.cidadeServer;
    var qtdEstacoes = req.body.qtdEstacoesServer;
    var nomeUnidade = req.body.nomeUnidadeServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        eletropostoModel.pegarEletroposto(email, senha)
            .then(
                function (resultadoLogar) {
                    console.log(`\nResultados encontrados: ${resultadoLogar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoLogar)}`); // transforma JSON em String

                    if (resultadoLogar.length == 1) {
                        console.log(resultadoLogar);
                        res.status(200).send("Login realizado com sucesso!");
                    } else if (resultadoLogar.length == 0) {
                        res.status(404).json({message: "Email e/ou senha inválido(s)!"})
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

module.exports = {
    cadastrarEletroposto,
    pegarEletroposto
}