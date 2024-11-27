var database = require("../database/config")

function logar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, numeroCelular FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(cnpj, nomeEmpresa, estado, cep, nome, cpf, email, celular, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", cnpj, nomeEmpresa, estado, cep);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO empresa (razaoSocial, cnpj) VALUES ('${nomeEmpresa}', '${cnpj}');
        `;
    var instrucaoSql2 = `
    INSERT INTO usuario (nome, cpf, email, senha, numeroCelular) VALUES ('${nome}', '${cpf}', '${email}', '${senha}', '${celular}');    
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

function atualizar(idUsuario, nome, cpf, email, celular, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar(): ", idUsuario, nome, cpf, email, celular, senha);

    var instrucaoSql = `
        UPDATE usuario 
        SET nome = '${nome}', cpf = '${cpf}', email = '${email}', numeroCelular = '${celular}', senha = '${senha}' 
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    logar,
    cadastrar,
    atualizar,
    deletar
};