var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function logar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.logar(email, senha)
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

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    // var nome = req.body.nomeServer; 
    // var cpf = req.body.cpfServer;
    // var email = req.body.emailServer;
    // var numeroCelular = req.body.numeroCelularServer;
    // var senha = req.body.senhaServer;

    var cnpj = req.body.cnpjServer; 
    var nomeEmpresa = req.body.nomeEmpresaServer;
    var estado = req.body.estadoServer;
    var cep = req.body.cepServer;
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var celular = req.body.celularServer;
    var senha = req.body.senhaServer;


    // Faça as validações dos valores
    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    }else if(nomeEmpresa == undefined){
        res.status(400).send("Seu nomeEmpresa está undefined!");
    }else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    }else if(cep == undefined){
        res.status(400).send("Seu cep está undefined!");
    }else if(nome == undefined){
        res.status(400).send("Seu nome está undefined!");
    }else if(cpf == undefined){
        res.status(400).send("Seu cpf está undefined!");
    } else if(email == undefined){
        res.status(400).send("Seu email está undefined!");
    }else if(celular == undefined){
        res.status(400).send("Seu celular está undefined!");
    }else if(senha == undefined){
        res.status(400).send("Sua senha está undefined");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(cnpj, nomeEmpresa, estado, cep, nome, cpf, email, celular, senha)
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
    logar,
    cadastrar
}