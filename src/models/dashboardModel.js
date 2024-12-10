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

function obterEmplacamentos() {
    const query = `
SELECT 
    mesAno,
    totalCarros
FROM (
    SELECT 
        CONCAT(anoEmplacamento, '-', 
            CASE 
                WHEN mesEmplacamento = 'janeiro' THEN '01'
                WHEN mesEmplacamento = 'fevereiro' THEN '02'
                WHEN mesEmplacamento = 'março' THEN '03'
                WHEN mesEmplacamento = 'abril' THEN '04'
                WHEN mesEmplacamento = 'maio' THEN '05'
                WHEN mesEmplacamento = 'junho' THEN '06'
                WHEN mesEmplacamento = 'julho' THEN '07'
                WHEN mesEmplacamento = 'agosto' THEN '08'
                WHEN mesEmplacamento = 'setembro' THEN '09'
                WHEN mesEmplacamento = 'outubro' THEN '10'
                WHEN mesEmplacamento = 'novembro' THEN '11'
                WHEN mesEmplacamento = 'dezembro' THEN '12'
            END
        ) AS mesAno,
        SUM(qtdCarros) AS totalCarros
    FROM emplacamento
    GROUP BY 
        anoEmplacamento,
        mesEmplacamento
    ORDER BY 
        anoEmplacamento DESC, 
        FIELD(mesEmplacamento, 
            'janeiro', 'fevereiro', 'março', 'abril', 
            'maio', 'junho', 'julho', 'agosto', 
            'setembro', 'outubro', 'novembro', 'dezembro') DESC
    LIMIT 10
) AS subquery
ORDER BY mesAno ASC;


    `;
    return database.executar(query);
}



module.exports = {
    listarBairrosEmPotencial,
    obterDadosUsuario,
    listarPotenciaisBairros,
    obterEmplacamentos,
};
