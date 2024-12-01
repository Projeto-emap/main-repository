// dashboardModel.js

var database = require("../database/config");

function listarBairros(idUsuario) {
    var instrucaoSql = `
        SELECT DISTINCT bairro
        FROM pontoDeRecarga
        WHERE fkUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function obterNomeEmpresa(idUsuario) {
    var instrucaoSql = `
        SELECT e.razaoSocial AS nome
        FROM usuario u
        JOIN empresa e ON u.fkEmpresa = e.idEmpresa
        WHERE u.idUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function listarDadosBairro(bairro) {
    var instrucaoSql = `
        SELECT qtdCarros, dataEmplacamento
        FROM carrosEmplacados ce
        JOIN pontoDeRecarga pr ON ce.fkPontoDeRecarga = pr.idPontoDeRecarga
        WHERE pr.bairro = '${bairro}';
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    listarBairros,
    obterNomeEmpresa,
    listarDadosBairro,
};

