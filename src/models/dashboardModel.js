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

function listarPotenciaisBairros(idUsuario) {
    const query = `
        SELECT 
            p.bairro,
            COUNT(*) AS oportunidades,
            e.razaoSocial AS nomeEmpresa,
            SUM(
                CASE 
                    WHEN p.redeDeRecarga = 'lenta' AND p.qtdEstacoes < 12 THEN 1
                    WHEN p.redeDeRecarga = 'media' AND p.qtdEstacoes < 8 THEN 1
                    WHEN p.redeDeRecarga = 'rapida' AND p.qtdEstacoes < 4 THEN 1
                    ELSE 0
                END
            ) AS potencialAtendido
        FROM 
            pontoDeRecarga p
        JOIN 
            usuario u ON p.fkUsuario = u.idUsuario
        JOIN 
            empresa e ON u.fkEmpresa = e.idEmpresa
        WHERE 
            p.fkUsuario = ${idUsuario}
        GROUP BY 
            p.bairro
    `;
    
    // Passando o parâmetro corretamente para a consulta preparada
    return database.executar(query, [idUsuario])
        .then(bairros => {
            const bairrosComPotencialAtendido = bairros.filter(bairro => bairro.potencialAtendido == 0);
            const bairrosComPotencialSobrando = bairros.filter(bairro => bairro.potencialAtendido > 0);
            return {
                bairrosComPotencialAtendido: bairrosComPotencialAtendido.length,
                bairrosComPotencialSobrando: bairrosComPotencialSobrando.length
            };
        });
}

module.exports = {
    listarBairrosEmPotencial,
    obterDadosUsuario,
    listarPotenciaisBairros,
};
