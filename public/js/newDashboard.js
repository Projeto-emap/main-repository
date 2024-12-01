// newDashboard.js (frontEnd)
    document.addEventListener("DOMContentLoaded", function () {
        const idUsuario = sessionStorage.getItem("ID_USUARIO");
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
    
        // Fetch para listar bairros
        fetch(`/dashboard/listarBairros/${idUsuario}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error("Erro ao buscar bairros.");
                }
            })
            .then((bairros) => {
                const container = document.querySelector(".saidbar-card-center");
                bairros.forEach((bairro) => {
                    const divBairro = document.createElement("div");
                    divBairro.classList.add("card-bairro");
                    divBairro.innerHTML = `
                        <div class="card-bairro-txt">${bairro.bairro}</div>
                        <div class="card-bairro-img">
                            <div id="imgUp"><img src="assets/img/image 58.png" alt=""></div>
                            <div id="imgDown"><img src="assets/img/fast-forward 1.png" alt=""></div>
                        </div>
                    `;
                    divBairro.addEventListener("click", () => {
                        graficoBairro.innerText = bairro.bairro;
                        carregarDadosBairro(bairro.bairro);
                    });
                    container.appendChild(divBairro);
                });
            })
            .catch((erro) => {
                console.error("Erro na requisição:", erro);
            });
    
        // Função para carregar dados do bairro no gráfico
        function carregarDadosBairro(bairro) {
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
    });
    