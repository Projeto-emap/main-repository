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
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var celular = req.body.telefoneServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (celular == undefined) {
        res.status(400).send("Seu celular está undefined!");
    } else {
        usuarioModel.atualizar(idUsuario, nome, email, celular)
            .then(function (resultadoUpdate) {
                console.log(`\nResultados encontrados: ${resultadoUpdate.affectedRows}`);
                if (resultadoUpdate.affectedRows > 0) {
                    res.status(200).send("Update realizado com sucesso!");
                } else {
                    res.status(404).json({ message: "Nenhum usuário encontrado para atualização." });
                }
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function deletar(req, res) {
    const idUsuario = req.params.idUsuario;

    // Validação do idUsuario
    if (idUsuario === undefined || isNaN(Number(idUsuario))) {
        return res.status(400).json({ message: "Seu idUsuario está undefined ou é inválido!" });
    }

    // Chamar a função deletar do modelo
    usuarioModel.deletar(idUsuario)
        .then(function (resultadoDelete) {
            console.log(`\nResultados encontrados: ${resultadoDelete.affectedRows}`);

            if (resultadoDelete.affectedRows > 0) {
                // Enviar resposta de sucesso em formato JSON
                return res.status(200).json({ message: "Delete realizado com sucesso!" });
            } else {
                // Mensagem de erro se nenhum usuário foi encontrado
                return res.status(404).json({ message: "Nenhum usuário encontrado para deletar." });
            }
        })
        .catch(function (erro) {
            console.log(erro);
            // Enviar erro interno do servidor em formato JSON
            return res.status(500).json({ message: erro.sqlMessage || "Erro interno do servidor." });
        });
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
        return res.status(400).json({ message: "Seu idUsuario está undefined!" });
    }

    usuarioModel.carregarInfo(idUsuario)
        .then(function (resultadoLogar) {
            if (resultadoLogar.length == 1) {
                res.status(200).json({
                    nome: resultadoLogar[0].nome,
                    numeroCelular: resultadoLogar[0].numeroCelular,
                    email: resultadoLogar[0].email,
                });
            } else if (resultadoLogar.length == 0) {
                res.status(404).json({ message: "Usuário não encontrado." });
            } else {
                res.status(403).json({ message: "Mais de um usuário com o mesmo ID encontrado!" });
            }
        })
        .catch(function (erro) {
            console.log("\nHouve um erro ao carregar informações do usuário! Erro: ", erro.sqlMessage);
            res.status(500).json({ message: erro.sqlMessage || "Erro interno do servidor." });
        });
}

module.exports = {
    logar,
    cadastrar,
    atualizar,
    deletar,
    carregarInfo
}