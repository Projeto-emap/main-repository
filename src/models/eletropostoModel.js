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

function pegarEletroposto(idUsuario){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cep, cidade, rua, numero, qtdEstacoes, potenciaDeRecarga, tipoConector, redeDeRecarga)

    var instrucaoSql = `
    SELECT idPontoDeRecarga, nome, cidade, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga 
    FROM pontoDeRecarga WHERE fkUsuario = ${idUsuario};
    ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    var resultado = database.executar(instrucaoSql);
    return resultado;
}

function deletarEletroposto(idPontoDeRecarga) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", idUsuario);

    var instrucaoSql = `
        DELETE FROM pontoDeRecarga WHERE idPontoDeRecarga = '${idPontoDeRecarga}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function atualizarEletroposto(idPontoDeRecarga, nome, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar(): ",idUsuario, nome, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga);

    var instrucaoSql = `
        UPDATE pontoDeRecarga 
        SET nome = '${nome}',
         qtdEstacoes = '${qtdEstacoes}',
         tipoConector = '${tipoConector}',
         potenciaDeRecarga = '${potenciaDeRecarga}',
         redeDeRecarga = '${redeDeRecarga}' 
         WHERE idPontoDeRecarga = ${idPontoDeRecarga};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEletroposto,
    pegarEletroposto,
    deletarEletroposto,
    atualizarEletroposto
}