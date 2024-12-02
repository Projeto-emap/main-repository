// dashboardModel.js

var database = require("../database/config");

function listarBairrosEmPotencial(idUsuario) {
    const query = `
SELECT 
    p.bairro,
    COUNT(*) AS oportunidades,
    e.razaoSocial AS nomeEmpresa
FROM 
    pontoDeRecarga p
JOIN 
    usuario u ON p.fkUsuario = u.idUsuario
JOIN 
    empresa e ON u.fkEmpresa = e.idEmpresa
WHERE 
    p.fkUsuario = ${idUsuario}
    AND (
        (p.redeDeRecarga = 'lenta' AND p.qtdEstacoes < 12) OR
        (p.redeDeRecarga = 'média' AND p.qtdEstacoes < 8) OR
        (p.redeDeRecarga = 'rápida' AND p.qtdEstacoes < 4)
    )
GROUP BY 
    p.bairro  -- Agrupa por bairro
ORDER BY 
    oportunidades DESC;
    `;
    return database.executar(query);
}

function obterDadosUsuario(idUsuario) {
    const query = `
        SELECT 
            e.razaoSocial AS nomeEmpresa, 
            COUNT(p.idPontoDeRecarga) AS totalPontos
        FROM usuario u
        LEFT JOIN empresa e ON u.fkEmpresa = e.idEmpresa
        LEFT JOIN pontoDeRecarga p ON p.fkUsuario = u.idUsuario
        WHERE u.idUsuario = ${idUsuario};
    `;
    return database.executar(query);
}

module.exports = {
    listarBairrosEmPotencial,
    obterDadosUsuario,
};
