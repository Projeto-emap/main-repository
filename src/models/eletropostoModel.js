var database = require("../database/config")

function cadastrarEletroposto(nome, cep, cidade, rua, numero, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cep, cidade, rua, numero, qtdEstacoes, potenciaDeRecarga, tipoConector, redeDeRecarga)

    var instrucaoSql = `
    INSERT INTO pontoDeRecarga (nome, cep, cidade, rua, numero, qtdEstacoes, tipoConector,
    potenciaDeRecarga, redeDeRecarga) VALUES ('${nome}', '${cep}', '${cidade}', '${rua}', '${numero}', '${tipoConector},
     '${potenciaDeRecarga}, '${redeDeRecarga}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    var resultado = database.executar(instrucaoSql);
    return resultado;
}

function pegarEletroposto(nome, cep, cidade, rua, numero, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cep, cidade, rua, numero, qtdEstacoes, potenciaDeRecarga, tipoConector, redeDeRecarga)

    var instrucaoSql = `
    SELECT nome, cidade, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga 
    FROM pontoDeRecarga;
    ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    var resultado = database.executar(instrucaoSql);
    return resultado;
}

module.exports = {
    cadastrarEletroposto,
    pegarEletroposto
}