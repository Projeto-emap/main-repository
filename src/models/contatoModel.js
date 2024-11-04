var database = require("../database/config")

function cadastrarContato(nome, email, mensagem){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, mensagem)

    var instrucaoSql = `
    INSERT INTO mensagem (nome, email, mensagem) VALUES ('${nome}', '${email}', '${mensagem}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    var resultado = database.executar(instrucaoSql);
    return resultado;
}

module.exports = {
    cadastrarContato
}