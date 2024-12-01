// dashboardModel.js


var database = require("../database/config");

function listarBairros(idUsuario) {
    const instrucaoSql = `
        SELECT DISTINCT nome 
        FROM pontoDeRecarga
        WHERE fkUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    listarBairros
};