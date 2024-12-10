// ../src/controllers/dashboardController.js

var dashboardModel = require("../models/dashboardModel");

function listarBairrosEmPotencial(req, res) {
    var idUsuario = req.params.idUsuario;

    dashboardModel.listarBairrosEmPotencial(idUsuario)
        .then((resultado) => {
            if (resultado.length === 0) {
                return res.status(404).json({ mensagem: "Nenhum bairro em potencial encontrado." });
            }
            res.status(200).json(resultado);
        })
        .catch((erro) => {
            res.status(500).json({ mensagem: "Erro ao listar bairros em potencial.", erro });
        });
}

function obterDadosUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    dashboardModel.obterDadosUsuario(idUsuario)
        .then((resultado) => {
            if (!resultado[0]) {
                return res.status(404).json({ mensagem: "Usuário não encontrado." });
            }
            res.status(200).json(resultado[0]);
        })
        .catch((erro) => {
            res.status(500).json({ mensagem: "Erro ao obter dados do usuário.", erro });
        });
}

function listarPotenciaisBairros(req, res) {
    const idUsuario = req.params.idUsuario;  // Pega o ID do usuário da URL
    dashboardModel.listarPotenciaisBairros(idUsuario)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error("Erro ao listar bairros: ", error);
            res.status(500).json({ message: 'Erro ao buscar bairros com potenciais' });
        });
}

function obterEmplacamentos(req, res) {
    dashboardModel.obterEmplacamentos()
        .then(resultados => {
            const dadosGrafico = [['Data', 'Emplacamentos']];
            resultados.forEach((linha, index) => {
                try {
                    // Validação: verifica se a propriedade `mesAno` está presente e é uma string
                    if (!linha.mesAno || typeof linha.mesAno !== 'string') {
                        console.error(`Erro na linha ${index}: propriedade 'mesAno' ausente ou inválida`, linha);
                        return; // Pula para o próximo item do loop
                    }

                    // Validação: verifica se `mesAno` tem o formato esperado (AAAA-MM)
                    if (!/^\d{4}-\d{2}$/.test(linha.mesAno)) {
                        console.error(`Erro na linha ${index}: formato inválido em 'mesAno'`, linha.mesAno);
                        return; // Pula para o próximo item do loop
                    }

                    // Converta a string "mesAno" para o formato Date para o Google Charts
                    const [ano, mes] = linha.mesAno.split('-');
                    const dataFormatada = new Date(ano, mes - 1); // `mes - 1` porque o mês começa em 0

                    // Formatar a data para exibir apenas o mês (abreviado) e o ano
                    const meses = ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
                    const mesNome = meses[dataFormatada.getMonth()];
                    const anoFormatado = dataFormatada.getFullYear();
                    const dataFormatadaStr = `${mesNome} ${anoFormatado}`;  // Formato "MMM yyyy"

                    // Validação e conversão: verifica se `totalCarros` está presente, tenta convertê-lo para número
                    const totalCarros = Number(linha.totalCarros);
                    if (isNaN(totalCarros)) {
                        console.error(`Erro na linha ${index}: 'totalCarros' não pôde ser convertido para número`, linha.totalCarros);
                        return; // Pula para o próximo item do loop
                    }

                    // Adiciona os dados formatados ao gráfico
                    dadosGrafico.push([dataFormatadaStr, totalCarros]);
                } catch (error) {
                    console.error(`Erro inesperado ao processar a linha ${index}:`, linha, error);
                }
            });

            res.status(200).json(dadosGrafico);
        })
        .catch(error => {
            console.error('Erro ao obter emplacamentos:', error);
            res.status(500).json({ mensagem: 'Erro ao obter dados de emplacamentos' });
        });
}



module.exports = {
    listarBairrosEmPotencial,
    obterDadosUsuario,
    listarPotenciaisBairros,
    obterEmplacamentos
};
