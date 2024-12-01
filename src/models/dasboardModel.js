// dashboardModel.js


var database = require("../database/config");

function listarBairros() {
    const instrucaoSql = `
        SELECT DISTINCT cidade 
        FROM pontoDeRecarga;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    listarBairros
};