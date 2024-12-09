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
        (p.redeDeRecarga = 'lenta' OR p.redeDeRecarga = 'Rede Zletric' OR p.redeDeRecarga = 'Rede Power2Go' OR p.redeDeRecarga = 'Rede Intelbras' AND p.qtdEstacoes < 12) OR
        (p.redeDeRecarga = 'media' OR p.redeDeRecarga = 'Rede WEMOB' OR p.redeDeRecarga = 'Rede Autocharge' AND p.qtdEstacoes < 8) OR
        (p.redeDeRecarga = 'rapida' OR p.redeDeRecarga = 'Rede Tupinambá' OR p.redeDeRecarga = 'Rede Enel X Way' AND p.qtdEstacoes < 4)
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
                    WHEN p.redeDeRecarga = 'lenta' OR p.redeDeRecarga = 'Rede Zletric' OR p.redeDeRecarga = 'Rede Power2Go' OR p.redeDeRecarga = 'Rede Intelbras' AND p.qtdEstacoes < 12 THEN 1
                    WHEN p.redeDeRecarga = 'media' OR p.redeDeRecarga = 'Rede WEMOB' OR p.redeDeRecarga = 'Rede Autocharge' AND p.qtdEstacoes < 8 THEN 1
                    WHEN p.redeDeRecarga = 'rapida' OR p.redeDeRecarga = 'Rede Tupinambá' OR p.redeDeRecarga = 'Rede Enel X Way' AND p.qtdEstacoes < 4 THEN 1
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

function obterEmplacamentos(periodo) {
    let groupBy;
    let selectExtra = '';
    
    const mesMapping = `
        CASE emplacamento.mesEmplacamento
            WHEN 'Janeiro' THEN 1
            WHEN 'Fevereiro' THEN 2
            WHEN 'Março' THEN 3
            WHEN 'Abril' THEN 4
            WHEN 'Maio' THEN 5
            WHEN 'Junho' THEN 6
            WHEN 'Julho' THEN 7
            WHEN 'Agosto' THEN 8
            WHEN 'Setembro' THEN 9
            WHEN 'Outubro' THEN 10
            WHEN 'Novembro' THEN 11
            WHEN 'Dezembro' THEN 12
            ELSE 0
        END
    `;

    switch (periodo) {
        case 'trimestral':
            groupBy = `
                CONCAT(
                    emplacamento.anoEmplacamento, '-', 
                    QUARTER(${mesMapping})
                )
            `;
            selectExtra = `, QUARTER(${mesMapping}) AS trimestre`;
            break;
        case 'semestral':
            groupBy = `
                CONCAT(
                    emplacamento.anoEmplacamento, '-', 
                    IF(${mesMapping} <= 6, 1, 2)
                )
            `;
            selectExtra = `, IF(${mesMapping} <= 6, 1, 2) AS semestre`;
            break;
        default:
            // Mensal é o padrão
            groupBy = `
                CONCAT(
                    emplacamento.anoEmplacamento, '-', 
                    LPAD(${mesMapping}, 2, '0')
                )
            `;
            selectExtra = `, ${mesMapping} AS mes`;
            break;
    }

    const query = `
        SELECT 
            COUNT(emplacamento.idEmplacamento) AS qtdCarros,
            emplacamento.anoEmplacamento,
            emplacamento.mesEmplacamento ${selectExtra}
        FROM 
            emplacamento
        GROUP BY 
            ${groupBy}
        ORDER BY 
            emplacamento.anoEmplacamento, 
            ${periodo === 'trimestral' 
                ? 'trimestre' 
                : (periodo === 'semestral' 
                    ? 'semestre' 
                    : 'mes')}
    `;

    return database.executar(query);
}

module.exports = {
    listarBairrosEmPotencial,
    obterDadosUsuario,
    listarPotenciaisBairros,
    obterEmplacamentos,
};
