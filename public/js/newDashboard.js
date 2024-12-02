// newDashboard.js (frontEnd)

const idUsuario = sessionStorage.getItem('ID_USUARIO');
const nomeUsuarioStorage = sessionStorage.getItem('NOME_USUARIO');
const divNomeUsuario = document.getElementById("nomeUsuario");
const divNomeEmpresa = document.querySelector('.nomeEmpresaEletroposto');

divNomeUsuario.innerHTML = `${nomeUsuarioStorage}`;

function carregarDadosUsuario() {
    fetch(`/dashboard/dadosUsuario/${idUsuario}`)
        .then(response => response.json())
        .then(dados => {
            document.getElementById("nomeEmpresa").innerText = dados.nomeEmpresa || "Empresa";
            divNomeEmpresa.innerText = dados.nomeEmpresa || "nomeEmpresa";
            document.getElementById("qtdEletropostos").innerText = `${dados.totalPontos || 0}`;
            ajustarPerfil(dados.totalPontos);
        })
        .catch(erro => console.error("Erro ao carregar dados do usuário:", erro));
}

function carregarBairrosEmPotencial() {
    fetch(`/dashboard/bairros/${idUsuario}`)
        .then(response => response.json())
        .then(bairros => {
            const container = document.querySelector(".saidbar-card-center");
            container.innerHTML = "";

            bairros.forEach(bairro => {
                const card = document.createElement("div");
                card.classList.add("card-bairro");

                card.innerHTML = `
                    <div class="card-bairro-txt">${bairro.bairro}</div>
                    <div class="card-bairro-img">
                        <div id="imgUp"><img src="assets/img/image 58.png" alt=""></div>
                        <div id="imgDown"><img src="assets/img/fast-forward 1.png" alt=""></div>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(erro => console.error("Erro ao carregar bairros em potencial:", erro));
}

function ajustarPerfil(totalPontos) {
    const tipoPerfilDiv = document.querySelector(".tipo-perfil");
    const topLeftTxtDiv = document.querySelector(".top-left-txt");

    if (totalPontos <= 5) {
        tipoPerfilDiv.innerHTML = `Seu perfil está <a style="color: red;">BAIXO</a>`;
        topLeftTxtDiv.innerText = "Seu eletroposto está com poucas unidades para resultados precisos!";
    } else if (totalPontos <= 8) {
        tipoPerfilDiv.innerHTML = `Seu perfil está <a style="color: yellow;">INTERMEDIÁRIO</a>`;
        topLeftTxtDiv.innerText = "Construa eletropostos nos pontos de oportunidade para aumentar seus ganhos e subir seu perfil";
    } else if (totalPontos <= 12) {
        tipoPerfilDiv.innerHTML = `Seu perfil está <a style="color: lightgreen;">BOM</a>`;
        topLeftTxtDiv.innerText = "Você tem unidades suficientes para trazer várias oportunidades e dados com alta precisão!";
    } else {
        tipoPerfilDiv.innerHTML = `Seu perfil está <a style="color: darkgreen;">EXCELENTE</a>`;
        topLeftTxtDiv.innerText = "Seu eletroposto contém diversas unidades por São Paulo e atende a maioria das oportunidades!";
    }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    carregarDadosUsuario();
    carregarBairrosEmPotencial();
});