// newDashboard.js (frontEnd)

document.addEventListener("DOMContentLoaded", function () {
    const idUsuario = sessionStorage.getItem("ID_USUARIO");
    atualizarPerfil(idUsuario);
    const nomeUsuario = sessionStorage.getItem("NOME_USUARIO");

    const divNomeUsuario = document.getElementById("nomeUsuariohtml");
    const divNomeEmpresa = document.getElementById("nomeEmpresa");
    const graficoBairro = document.getElementById("graficoBairro");
    const curveChart = document.getElementById("curve_chart");
    const divDashNomeEmpresa = document.getElementById("nomeEmpresaDash");

    divNomeUsuario.innerHTML = `${nomeUsuario}`;

    // Fetch para obter o nome da empresa
    fetch(`/dashboard/empresa/${idUsuario}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.error("Erro ao buscar empresa.");
            }
        })
        .then((empresa) => {
            if (empresa && empresa.nome) {
                divNomeEmpresa.innerHTML = empresa.nome;
                divDashNomeEmpresa.innerHTML = empresa.nome;
            }
        })
        .catch((erro) => {
            console.error("Erro na requisição de empresa:", erro);
        });

    // Função para carregar dados do bairro no gráfico

        fetch(`/dashboard/dadosBairro/${bairro}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error("Erro ao buscar dados do bairro.");
                }
            })
            .then((dados) => {
                if (dados && dados.length > 0) {
                    const dataChart = [['Anos', 'Emplacamentos']];
                    dados.forEach((item) => {
                        dataChart.push([item.dataEmplacamento, item.qtdCarros]);
                    });

                    const data = google.visualization.arrayToDataTable(dataChart);
                    const options = {
                        title: `Dados de Emplacamentos para ${bairro}`,
                        legend: { position: 'bottom' },
                        backgroundColor: '#333333',
                        titleTextStyle: { color: 'white' },
                        legendTextStyle: { color: 'white' },
                        hAxis: { textStyle: { color: 'white' } },
                        vAxis: { textStyle: { color: 'white' } },
                    };

                    const chart = new google.visualization.LineChart(curveChart);
                    chart.draw(data, options);
                } else {
                    console.error("Nenhum dado encontrado para o bairro.");
                }
            })
            .catch((erro) => {
                console.error("Erro ao carregar dados do bairro:", erro);
            });
    }
)

function atualizarPerfil(idUsuario) {
    fetch(`/dashboard/listarBairros/${idUsuario}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.error("Erro ao buscar bairros.");
            }
        })
        .then((bairros) => {
            const qtdBairros = bairros.length;
            const tipoPerfilDiv = document.querySelector(".tipo-perfil");
            const textoPerfilDiv = document.querySelector(".top-left-txt");

            if (qtdBairros <= 5) {
                tipoPerfilDiv.innerHTML = `Seu nível de perfil está <a style="color: red;">BAIXO</a>`;
                textoPerfilDiv.innerHTML = "Seu eletroposto está com poucas unidades para resultados precisos!";
            } else if (qtdBairros > 5 && qtdBairros <= 8) {
                tipoPerfilDiv.innerHTML = `Seu nível de perfil está <a style="color: yellow;">INTERMEDIÁRIO</a>`;
                textoPerfilDiv.innerHTML = "Adicione mais eletropostos para melhorar ainda mais o resultado!";
            } else if (qtdBairros > 8 && qtdBairros <= 12) {
                tipoPerfilDiv.innerHTML = `Seu nível de perfil está <a style="color: lightgreen;">BOM</a>`;
                textoPerfilDiv.innerHTML = "Você tem unidades suficientes para trazer você várias oportunidades e dados com alta precisão!";
            } else {
                tipoPerfilDiv.innerHTML = `Seu nível de perfil está <a style="color: darkgreen;">EXCELENTE</a>`;
                textoPerfilDiv.innerHTML = "Seu eletroposto contém diversas unidades por São Paulo e atende a maioria das oportunidades!";
            }
        })
        .catch((erro) => {
            console.error("Erro ao atualizar perfil:", erro);
        });
}