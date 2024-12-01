const btnEditar = document.getElementById("btnEditar");
const btnFinalizar = document.getElementById("btnFinalizar");
const nomeInput = document.getElementById("nome");
const numeroEstacoesInput = document.getElementById("numeroEstacoes");
const conectoresSelect = document.getElementById("tipoConectores");
const potenciaSelect = document.getElementById("potenciaDisponivel");
const velocidadeSelect = document.getElementById("velocidadeCarregamento");
const nomeUnidade = document.getElementById("h1-Unidade")
const spanIdUnidade = document.getElementById("span-id-Unidade")
const dialogoCadastroUnidade = document.getElementById(
  "dialogoCadastroUnidade"
); // Modal para exibir erros
const pCadastro = document.getElementById("pCadastro"); // Elemento para mensagens de erro
// Obtém o id da unidade da URL
const urlParams = new URLSearchParams(window.location.search);
const idUnidade = urlParams.get("id");

fetch(`/eletroposto/pegarInfoUnidade/${idUnidade}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((resposta) => {
    if (resposta.ok) {
      if (resposta.headers.get("content-type")?.includes("application/json")) {
        return resposta.json();
      } else {
        return resposta.text().then((text) => {
          throw new Error(text);
        });
      }
    } else {
      return resposta.json().then((json) => {
        throw new Error(
          json.message || "Erro ao carregar informações do usuário."
        );
      });
    }
  })
  .then((json) => {
    console.log("Dados recebidos:", json);

     // Preencher os campos do formulário com os dados retornados
     nomeInput.value = json.nome;
     numeroEstacoesInput.value = json.qtdEstacoes;
     conectoresSelect.value = json.tipoConector;
     potenciaSelect.value = json.potenciaDeRecarga;
     velocidadeSelect.value = json.redeDeRecarga;
     nomeUnidade.textContent = json.nome;
     spanIdUnidade.textContent += idUnidade;
  })
  .catch((erro) => {
    console.error("Erro ao carregar informações do usuário:", erro.message);
  });

function index() {
  window.location.href = "index.html";
}

function perfil() {
  window.location.href = "perfil.html";
}

function voltar() {
  window.location.href = "gerenciarEletropostoParte1.html";
}

function editarInformacoes() {
  document.querySelectorAll("input, select").forEach((element) => {
    element.removeAttribute("disabled");
  });

  btnEditar.style.display = "none";
  btnFinalizar.style.display = "block";
}

function finalizarEdicao() {
  const erros = [];

  // Obtendo referências aos elementos de input
  const nomeInput = document.getElementById("nome");
  const numeroEstacoesInput = document.getElementById("numeroEstacoes");
  const conectoresSelect = document.getElementById("tipoConectores");
  const potenciaSelect = document.getElementById("potenciaDisponivel");
  const velocidadeSelect = document.getElementById("velocidadeCarregamento");

  const nomeValido = validarInputNomeRepresentante(nomeInput);
  if (!nomeValido) {
    erros.push("Insira um nome válido para a unidade.");
  }

  const numeroEstacoesValido = validarNumeroEstacoes(numeroEstacoesInput);
  if (!numeroEstacoesValido) {
    erros.push("Insira um número de estações de carregamento válido.");
    numeroEstacoesInput.classList.toggle("input-invalido");
  }

  const conectoresValido = validarSelecionar(conectoresSelect);
  if (!conectoresValido) {
    erros.push("Selecione um tipo de conector.");
    conectoresSelect.classList.toggle("input-invalido");
  }

  const potenciaValido = validarSelecionar(potenciaSelect);
  if (!potenciaValido) {
    erros.push("Selecione uma potência disponível.");
    potenciaSelect.classList.toggle("input-invalido");
  }

  const velocidadeValido = validarSelecionar(velocidadeSelect);
  if (!velocidadeValido) {
    erros.push("Selecione uma velocidade de carregamento.");
    velocidadeSelect.classList.toggle("input-invalido");
  }
  nomeInput.classList.toggle("input-invalido", !nomeValido);
  nomeInput.classList.toggle("input-valido", nomeValido);

  numeroEstacoesInput.classList.toggle("input-valido", numeroEstacoesValido);
  numeroEstacoesInput.classList.toggle("input-invalido", !numeroEstacoesValido);

  conectoresSelect.classList.toggle("input-valido", conectoresValido);
  conectoresSelect.classList.toggle("input-invalido", !conectoresValido);

  potenciaSelect.classList.toggle("input-valido", potenciaValido);
  potenciaSelect.classList.toggle("input-invalido", !potenciaValido);

  velocidadeSelect.classList.toggle("input-valido", velocidadeValido);
  velocidadeSelect.classList.toggle("input-invalido", !velocidadeValido);

  if (erros.length > 0) {
    pCadastro.innerHTML = erros.join("<br/>");
    dialogoCadastroUnidade.showModal();
  } else {
    document.querySelectorAll("input, select").forEach((element) => {
      element.setAttribute("disabled", true);
      element.style.borderColor = "";

      nomeAtualizado = nomeInput.value;
      qtdEstacoesAtualizado = numeroEstacoesInput.value;
      tipoConectorAtualizado = conectoresSelect.value;
      potenciaDeRecargaAtualizado = potenciaSelect.value;
      redeDeRecargaAtualizado = velocidadeSelect.value;

      fetch(`/eletroposto/atualizarEletroposto/${idUnidade}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUnidadeServer: idUnidade,
          nomeServer: nomeAtualizado,
          qtdEstacoesServer: qtdEstacoesAtualizado,
          tipoConectorServer: tipoConectorAtualizado,
          potenciaDeRecargaServer: potenciaDeRecargaAtualizado,
          redeDeRecargaServer: redeDeRecargaAtualizado,
        }),
      })
        .then((resposta) => {
          console.log("ESTOU NO THEN da função de atualização do perfil!");
      
          return resposta.json().then((json) => {
            if (resposta.ok) {
              console.log(json);
              sessionStorage.setItem("ID_ELETROPOSTO", json.idPontoDeRecarga);
              sessionStorage.setItem("NOME_ELETROPOSTO", json.nome);
              sessionStorage.setItem("CONECTOR_ELETROPOSTO", json.conector);
              sessionStorage.setItem("POTENCIA_ELETROPOSTO", json.potencia);
              sessionStorage.setItem("REDE_ELETROPOSTO", json.rede);
      
              alert("Perfil atualizado com sucesso!");
              window.location.href = "perfil.html";
            } else {
              console.error("Erro ao tentar atualizar o perfil:", json);
              alert(
                json.mensagem ||
                  "Houve um erro ao tentar atualizar o perfil. Por favor, tente novamente."
              );
            }
          });
        })
        .catch((erro) => {
          console.error("Erro ao tentar atualizar o perfil:", erro);
          alert(
            "Erro ao tentar atualizar o perfil. Por favor, tente novamente mais tarde."
          );
        });      
    }),
      (btnEditar.style.display = "block");
    btnFinalizar.style.display = "none";
  }
}

function validarInputNomeRepresentante(input) {
  const nome = input.value.trim();
  if (nome.length === 0 || nome.length > 100) {
    input.style.borderColor = "red";
    return false;
  } else {
    input.style.borderColor = "";
    return true;
  }
}

function validarNumeroEstacoes() {
  const valor = parseInt(numeroEstacoesInput.value);
  if (isNaN(valor) || valor < 0) {
    numeroEstacoesInput.style.borderColor = "red";
    return false;
  } else {
    numeroEstacoesInput.style.borderColor = "";
    return true;
  }
}

function validarSelecionar(select) {
  if (select.value === "#" || select.value === "") {
    select.style.borderColor = "red";
    return false;
  } else {
    select.style.borderColor = "";
    return true;
  }
}

// Desabilitar os campos no carregamento da página
document.querySelectorAll("input, select").forEach((element) => {
  element.setAttribute("disabled", true);
});
