var database = require("../database/config")

function cadastrarEletroposto(nome, cep, bairro, rua, numero, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cep, bairro, rua, numero, qtdEstacoes, potenciaDeRecarga, tipoConector, redeDeRecarga)

    var instrucaoSql = `
<<<<<<< HEAD
    INSERT INTO pontoDeRecarga (nome, cep, bairro, rua, numero, qtdEstacoes, tipoConector,
    potenciaDeRecarga, redeDeRecarga, fkUsuario) VALUES ('${nome}', '${cep}', '${bairro}', '${rua}', '${numero}', '${tipoConector}',
     '${potenciaDeRecarga}', '${redeDeRecarga}', '${fkUsuario}');
=======
    INSERT INTO pontoDeRecarga (nome, cep, cidade, rua, numero, qtdEstacoes, tipoConector,
    potenciaDeRecarga, redeDeRecarga) VALUES ('${nome}', '${cep}', '${cidade}', '${rua}', '${numero}', '${tipoConector},
     '${potenciaDeRecarga}, '${redeDeRecarga}');
>>>>>>> ed57a3fb2e53068196b4fccb6602f0151be363cb
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