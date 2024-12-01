// cadastroEletropostoParte1.js

// Seleciona o elemento <ul> onde as <li> serão adicionadas
const locationsList = document.getElementById("locations");
const idUsuario = sessionStorage.ID_USUARIO;

// Faz uma requisição ao backend para buscar os eletropostos
if (!idUsuario) {
  console.error("ID_USUARIO não encontrado no sessionStorage.");
} else {
  // Faz uma requisição ao backend para buscar os pontos de recarga
  fetch(`/eletroposto/pegarEletroposto/${idUsuario}`)
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error("Erro na resposta do servidor.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Dados recebidos:", data);

      // Verifica se 'data' é um array
      if (!Array.isArray(data)) {
        console.error("Esperava-se um array, mas recebeu:", typeof data, data);
        // Opcional: Exiba uma mensagem de erro para o usuário
        pErro.innerHTML = "Dados recebidos estão em um formato inválido.";
        dialogoErro.showModal();
        return;
      }

      if (data.length === 0) {
        console.log("Nenhum ponto de recarga encontrado.");
        return;
      }

      // Limpa a lista antes de adicionar novos elementos
      locationsList.innerHTML = "";

      data.forEach((ponto) => {
        // Criar a estrutura HTML de cada elemento
        const li = document.createElement("li");
        li.classList.add("grupoInformacoes");
        li.setAttribute("data-id", ponto.idPontoDeRecarga); // Atribui o ID do ponto ao <li>

        const span = document.createElement("span");
        span.classList.add("location-name");
        span.textContent = ponto.nome;

        const divGroup = document.createElement("div");
        divGroup.classList.add("div_group");

        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btnAnalisar");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = () => editar(ponto.idPontoDeRecarga);

        const btnExcluir = document.createElement("button");
        btnExcluir.classList.add("btnDeletar");
        btnExcluir.textContent = "Excluir";
        btnExcluir.onclick = () => excluir(btnExcluir, ponto.idPontoDeRecarga); // Passa o evento e o id

        divGroup.appendChild(btnEditar);
        divGroup.appendChild(btnExcluir);

        li.appendChild(span);
        li.appendChild(divGroup);

        locationsList.appendChild(li);
      });
    })
    .catch((error) =>
      console.error("Erro ao carregar pontos de recarga:", error)
    );
}

// Função chamada ao clicar no botão "Excluir"
// Função chamada ao confirmar a exclusão no modal
function excluirUnidade() {
  const itemExclusao = window.itemExclusao;
  const idExclusao = window.idExclusao

  if (itemExclusao) {
    const grupoInformacoes = itemExclusao.closest(".grupoInformacoes");

    if (grupoInformacoes) {
      fetch(`/eletroposto/deletarEletroposto/${idExclusao}`, {
        // Alterado para o endpoint correto
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idPontoDeRecarga: window.idExclusao, // Alterado para a chave correta
        }),
      })
        .then(function (resposta) {
          console.log("ESTOU NO THEN da função de deletar login");

          // Verifica se a resposta é JSON antes de parsear
          const contentType = resposta.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return resposta.json().then((json) => {
              return { ok: resposta.ok, json };
            });
          } else {
            return resposta.text().then((text) => {
              throw new Error(text);
            });
          }
        })
        .then(function ({ ok, json }) {
          if (ok) {
            // Caso a resposta seja bem-sucedida (status 2xx)
            console.log(json);
            console.log(JSON.stringify(json));

            fecharModal()
            window.location.reload(true)
          } else {
            // Caso a resposta contenha um erro (status não 2xx)
            console.log("Houve um erro ao tentar deletar o ponto de recarga!");

            let errosModal =
              json.message || "Erro ao deletar o ponto de recarga.";


            // Remove o item da lista
            grupoInformacoes.remove();

            // Atualiza a contagem de unidades após a remoção
            atualizarContagem();

            // Fecha o modal após a exclusão
            fecharModal();
          }
        })
        .catch(function (erro) {
          // Captura erros de rede ou outros erros inesperados
          console.error("Erro ao tentar deletar o ponto de recarga:", erro);    
            erro.message ||
            "Erro desconhecido. Por favor, tente novamente mais tarde.";
        });
    }
  }
}

// Função para fechar o modal de confirmação de exclusão
function fecharModal() {
  const modal = document.getElementById("modalConfirmacaoExclusao");
  modal.close(); // Fecha o modal
}

// Função para exibir o modal de confirmação de exclusão
function excluir(button, idPontoDeRecarga) {
  window.itemExclusao = button;
  window.idExclusao = idPontoDeRecarga; // Armazena o ID para uso na exclusão

  // Abre o modal de confirmação
  const modal = document.getElementById("modalConfirmacaoExclusao");
  modal.showModal();
}

// Função para atualizar a contagem das unidades
function atualizarContagem() {
  const totalUnidades = document.querySelectorAll(".grupoInformacoes").length;
  document.querySelector(".numero").textContent = totalUnidades;

  // Verifica se não há unidades e exibe a mensagem de lista vazia
  const mensagemVazia = document.getElementById("mensagemVazia");
  if (totalUnidades === 0) {
    mensagemVazia.style.display = "block";
  } else {
    mensagemVazia.style.display = "none";
  }
}

function editar(id) {
  window.location.href = `editarUnidades.html?id=${id}`;
}

function voltar() {
  window.location.href = "gerenciarEletroposto.html";
}

function index() {
  window.location.href = "index.html";
}

function perfil() {
  window.location.href = "perfil.html";
}
