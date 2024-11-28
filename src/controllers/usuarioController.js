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
            .then(function (resultadoLogar) {
                if (resultadoLogar.length == 1) {
                    res.status(200).json({
                        idUsuario: resultadoLogar[0].idUsuario,
                        nome: resultadoLogar[0].nome
                    });
                } else if (resultadoLogar.length == 0) {
                    res.status(404).json({ message: "Email e/ou senha inválido(s)!" })
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }).catch(function (erro) {
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function atualizar(req, res) {
    var idUsuario = req.params.idUsuario;
    var email = req.body.emailServer;
    var nome = req.body.nomeServer;
    var celular = req.body.telefoneServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Sua nome está indefinida!");
    } else if (telefone == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.atualizar(idUsuario, email, nome, celular)
            .then(
                function (resultadoUpdate) {
                    console.log(`\nResultados encontrados: ${resultadoUpdate.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoUpdate)}`); // transforma JSON em String

                    if (resultadoUpdate.length == 1) {
                        console.log(resultadoUpdate);
                        res.status(200).send("update realizado com sucesso!");
                    } else if (resultadoUpdate.length == 0) {
                        res.status(404).json({ message: "alguma informação errada (update)" })
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o update! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function deletar(req, res) {

    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
    usuarioModel.deletar(idUsuario)
        .then(
            function (resultadoDelete) {
                console.log(`\nResultados encontrados: ${resultadoDelete.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoDelete)}`); // transforma JSON em String

                if (resultadoDelete.length == 1) {
                    console.log(resultadoDelete);
                    res.status(200).send("delete realizado com sucesso!");
                } else if (resultadoDelete.length == 0) {
                    res.status(404).json({ message: "alguma informação errada (delete)" })
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o delete! Erro: ", erro.sqlMessage);
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
    } else if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nomeEmpresa está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (celular == undefined) {
        res.status(400).send("Seu celular está undefined!");
    } else if (senha == undefined) {
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

function carregarInfo(req, res) {
    var idUsuario = req.params.idUsuario;

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        usuarioModel.carregarInfo(idUsuario)
        .then(function (resultadoLogar) {
            if (resultadoLogar.length == 1) {
                res.status(200).json({
                    nome: resultadoLogar[0].nome,
                    numeroCelular: resultadoLogar[0].numeroCelular,
                    email: resultadoLogar[0].email
                });
            } else if (resultadoLogar.length == 0) {
                res.status(404).json({ message: "Email e/ou senha inválido(s)!" })
            } else {
                res.status(403).send("Mais de um usuário com o mesmo login e senha!");
            }
        }).catch(function (erro) {
            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}
}

module.exports = {
    logar,
    cadastrar,
    atualizar,
    deletar,
    carregarInfo
}