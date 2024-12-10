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

    // Inserir a empresa na tabela
    var instrucaoSql = `
        INSERT INTO empresa (razaoSocial, cnpj, estado, cep) 
        VALUES ('${nomeEmpresa}', '${cnpj}', '${estado}', '${cep}');
    `;

    // Executa a instrução SQL para inserir a empresa
    return new Promise(function (resolve, reject) {
        // Executar a inserção da empresa
        database.executar(instrucaoSql).then(function (resultadoEmpresa) {
            // O id da empresa será o insertId da consulta anterior
            var idEmpresa = resultadoEmpresa.insertId;

            // Inserir o usuário na tabela, usando o idEmpresa
            var instrucaoSql2 = `
                INSERT INTO usuario (nome, cpf, email, numeroCelular, senha, fkEmpresa) 
                VALUES ('${nome}', '${cpf}', '${email}', '${celular}', '${senha}', '${idEmpresa}');
            `;
            
            // Executa a inserção do usuário
            database.executar(instrucaoSql2).then(function (resultadoUsuario) {
                console.log("Usuário inserido com sucesso!");
                resolve(resultadoUsuario);  // Resolve a Promise com o resultado da inserção do usuário
            }).catch(function (erro) {
                reject(erro);  // Caso haja erro na inserção do usuário
            });
        }).catch(function (erro) {
            reject(erro);  // Caso haja erro na inserção da empresa
        });
    });
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