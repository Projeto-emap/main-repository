var eletropostoModel = require("../models/eletropostoModel");

function cadastrarEletroposto(req, res) {
    var nome = req.body.nomeServer;
    var cep = req.body.cepServer;
    var cidade = req.body.cidadeServer;
    var rua = req.body.ruaServer;
    var numero = req.body.numeroServer;
    var qtdEstacoes = req.body.qtdEstacoesServer;
    var tipoConector = req.body.tipoConectorServer;
    var potenciaDeRecarga = req.body.potenciaDeRecargaServer;
    var redeDeRecarga = req.body.redeDeRecargaServer;
    var fkUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Seu cidade está undefined!");
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
    } else if (fkUsuario == undefined) {
        res.status(400).send("Sua fkUsuario está undefined");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        eletropostoModel.cadastrarEletroposto(nome, cep, cidade, rua, numero, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga, fkUsuario)
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
    const idUsuario = req.params.idUsuario;

    if (!idUsuario) {
        res.status(400).send("idUsuario não fornecido.");
        return;
    }

    eletropostoModel.pegarEletroposto(idUsuario)
        .then((resultado) => {
            if (Array.isArray(resultado)) {
                res.status(200).json(resultado); // Retorna o array inteiro
            } else {
                // Caso o resultado não seja um array, tratar como erro
                res.status(500).json({ mensagem: "Formato de dados inválido retornado do banco de dados." });
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar pontos de recarga:", erro);
            res.status(500).json({ mensagem: "Erro ao buscar pontos de recarga.", erro: erro.sqlMessage });
        });
}

function atualizarEletroposto(req, res) {
    // var idPontoDeRecarga = req.params.idPontoDeRecarga;
    var idPontoDeRecarga = sessionStorage.getItem('idPontoDeRecarga');
    var nome = req.body.nomeServer;
    var qtdEstacoes = req.body.qtdEstacoesServer;
    var tipoConector = req.body.tipoConectorServer;
    var potenciaDeRecarga = req.body.potenciaDeRecargaServer;
    var redeDeRecarga = req.body.redeDeRecargaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (qtdEstacoes == undefined) {
        res.status(400).send("Sua qtdEstacoes está indefinida!");
    } else if (tipoConector == undefined) {
        res.status(400).send("Sua tipoConector está indefinida!");
    } else if (potenciaDeRecarga == undefined) {
        res.status(400).send("Sua potenciaDeRecarga está indefinida!");
    } else if (redeDeRecarga == undefined) {
        res.status(400).send("Sua redeDeRecarga está indefinida!");
    } else {
        eletropostoModel.atualizarEletroposto(idPontoDeRecarga, nome, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga)
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

function deletarEletroposto(req, res) {
    const idPontoDeRecarga = req.params.idPontoDeRecarga;
   
    if (idPontoDeRecarga == undefined) {
        res.status(400).send("Seu idPontoDeRecarga está undefined!");
    } else {
        eletropostoModel.deletarEletroposto(idPontoDeRecarga)
            .then(function (resultadoDelete) {
                console.log(`\nLinhas afetadas: ${resultadoDelete.affectedRows}`);
                console.log(`Resultado: ${JSON.stringify(resultadoDelete)}`);

                if (resultadoDelete.affectedRows > 0) {
                    res.status(200).json({ message: "Delete realizado com sucesso!" });
                } else {
                    res.status(404).json({ message: "Ponto de recarga não encontrado." });
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o delete! Erro: ", erro.sqlMessage);
                res.status(500).json({ mensagem: erro.sqlMessage });
            });
    }
}

module.exports = {
    cadastrarEletroposto,
    pegarEletroposto,
    atualizarEletroposto,
    deletarEletroposto
}