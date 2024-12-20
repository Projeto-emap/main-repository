var database = require("../database/config")

function logar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(cnpj, nomeEmpresa, estado, cep, nome, cpf, email, celular, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", cnpj, nomeEmpresa, estado, cep, nome, cpf, email, celular, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO empresa (razaoSocial, cnpj, estado, cep) VALUES ('${nomeEmpresa}', '${cnpj}', '${estado}', '${cep}');
        `;
    var instrucaoSql2 = `
    INSERT INTO usuario (nome, cpf, email, numeroCelular, senha) VALUES ('${nome}', '${cpf}', '${email}', '${celular}', '${senha}');    
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    console.log("Executando a instrução SQL: \n" + instrucaoSql2);

    var resultado = Promise.all([database.executar(instrucaoSql), database.executar(instrucaoSql2)])
    return resultado;
}

function deletar(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", idUsuario);

    var instrucaoSql = `
        DELETE FROM usuario WHERE idUsuario = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function atualizar(idUsuario, nome, email, celular) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar(): ", idUsuario, nome, email, celular);

    var instrucaoSql = `
        UPDATE usuario 
        SET nome = '${nome}', email = '${email}', numeroCelular = '${celular}' 
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function carregarInfo(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar(): ", idUsuario);

    var instrucaoSql = `
        SELECT idUsuario, nome, email, numeroCelular FROM usuario WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    logar,
    cadastrar,
    atualizar,
    deletar,
    carregarInfo
};