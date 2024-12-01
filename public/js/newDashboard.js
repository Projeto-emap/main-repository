// newDashboard.js (frontEnd)

const idUsuario = sessionStorage.getItem("ID_USUARIO");
const nomeUsuario = sessionStorage.getItem("NOME_USUARIO");


document.addEventListener("DOMContentLoaded", function () {
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
                    <div class="card-bairro-txt">${bairro.nome}</div>
                    <div class="card-bairro-img">
                        <div id="imgUp"><img src="assets/img/image 58.png" alt=""></div>
                        <div id="imgDown"><img src="assets/img/fast-forward 1.png" alt=""></div>
                    </div>
                `;
                container.appendChild(divBairro);
            });
        })
        .catch((erro) => {
            console.error("Erro na requisição:", erro);
        });
});
