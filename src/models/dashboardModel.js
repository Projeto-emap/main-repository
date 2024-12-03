// dashboardModel.js

var database = require("../database/config");

function listarBairros(idUsuario) {
    var instrucaoSql = `
        SELECT DISTINCT pr.bairro
        FROM pontoDeRecarga pr
        WHERE pr.fkUsuario = ${idUsuario}
          AND (
            (pr.redeDeRecarga = 'lenta' AND 
             (SELECT COUNT(*) FROM pontoDeRecarga WHERE bairro = pr.bairro) < 10)
            OR
            (pr.redeDeRecarga = 'média' AND 
             (SELECT COUNT(*) FROM pontoDeRecarga WHERE bairro = pr.bairro) < 7)
            OR
            (pr.redeDeRecarga = 'rápida' AND 
             (SELECT COUNT(*) FROM pontoDeRecarga WHERE bairro = pr.bairro) < 3)
          );
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

