var database = require("../database/config")

function cadastrarEletroposto(nome, cep, bairro, rua, numero, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga, fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cep, bairro, rua, numero, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga, fkUsuario);

    var instrucaoSql = `
    INSERT INTO pontoDeRecarga (nome, cep, bairro, rua, numero, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga, fkUsuario) 
    VALUES ('${nome}', '${cep}', '${bairro}', '${rua}', '${numero}', ${qtdEstacoes}, '${tipoConector}', ${potenciaDeRecarga}, '${redeDeRecarga}', ${fkUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function pegarEletroposto(idUsuario) {
    console.log("Buscando pontos de recarga para o usuário:", idUsuario);

    const instrucaoSql = `
        SELECT 
            idPontoDeRecarga, 
            nome
        FROM pontoDeRecarga 
        WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}
function deletarEletroposto(idPontoDeRecarga) {
    console.log("Function deletar(): ", idPontoDeRecarga);

    var instrucaoSql = `
        DELETE FROM pontoDeRecarga WHERE idPontoDeRecarga = '${idPontoDeRecarga}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function atualizarEletroposto(idUnidade, nome, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar(): ",idUnidade, nome, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga);

    var instrucaoSql = `
        UPDATE pontoDeRecarga 
        SET nome = '${nome}',
         qtdEstacoes = '${qtdEstacoes}',
         tipoConector = '${tipoConector}',
         potenciaDeRecarga = '${potenciaDeRecarga}',
         redeDeRecarga = '${redeDeRecarga}' 
         WHERE idPontoDeRecarga = ${idUnidade};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function pegarInfoUnidade(idUnidade) {
    console.log("ACESSEI O ELETROPOSTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar(): ", idUnidade);

    var instrucaoSql = `
        SELECT nome, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga FROM pontoDeRecarga WHERE idPontoDeRecarga = ${idUnidade};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEletroposto,
    pegarEletroposto,
    deletarEletroposto,
    atualizarEletroposto,
    pegarInfoUnidade
}