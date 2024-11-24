// Seleciona o elemento <ul> onde as <li> serão adicionadas
const locationsList = document.getElementById('locations');
const idUsuario = sessionStorage.ID_USUARIO;

// Faz uma requisição ao backend para buscar os eletropostos
fetch(`/pegarEletroposto/${idUsuario}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor.');
        }
        return response.json();
    })
    .then(data => {
        if (data.length === 0) {
            console.log("Nenhum eletroposto encontrado.");
            return;
        }

        // Limpa a lista antes de adicionar novos elementos
        locationsList.innerHTML = '';

        data.forEach(eletroposto => {
            // Criar a estrutura HTML de cada elemento
            const li = document.createElement('li');
            li.classList.add('grupoInformacoes');
            li.setAttribute('data-id', eletroposto.id);  // Atribui o ID da unidade ao <li>

            const span = document.createElement('span');
            span.classList.add('location-name');
            span.textContent = eletroposto.nome;

            const divGroup = document.createElement('div');
            divGroup.classList.add('div_group');

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btnAnalisar');
            btnEditar.textContent = 'Editar';
            btnEditar.onclick = () => editar(eletroposto.idUsuario);

            const btnExcluir = document.createElement('button');
            btnExcluir.classList.add('btnDeletar');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = (e) => excluir(e, eletroposto.id);  // Passa o evento e o id

            divGroup.appendChild(btnEditar);
            divGroup.appendChild(btnExcluir);

            li.appendChild(span);
            li.appendChild(divGroup);

            locationsList.appendChild(li);
        });
    })
    .catch(error => console.error('Erro ao carregar eletropostos:', error));

// Função chamada ao clicar no botão "Excluir"
function excluirUnidade() {
    // Obtém o botão clicado que foi armazenado em 'window.itemExclusao'
    const itemExclusao = window.itemExclusao;

    if (itemExclusao) {
        // Encontra o elemento .grupoInformacoes correspondente ao botão clicado
        const grupoInformacoes = itemExclusao.closest('.grupoInformacoes');

        if (grupoInformacoes) {

            fetch("/usuarios/deletar", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idPontoDeRecargaServer: sessionStorage.getItem('ID_ELETROPOSTO'), // Pegando o ID do eletroposto armazenado no sessionStorage
                })
            }).then(function (resposta) {
                console.log("ESTOU NO THEN da função de deletar login")

                if (resposta.ok) {
                    console.log(resposta)

                    resposta.json().then(json => {
                        console.log(json)
                        console.log(JSON.stringify(json))
                    })
                    dialogo.showModal();
                } else {
                    resposta.json().then(json => {
                        console.log("Houve um erro ao tentar realizar o deletar login!");

                        let errosModal = json.message || "Erro ao realizar o deletar login."
                        pErro.innerHTML = errosModal;
                        dialogoErro.showModal();
                    }).catch(erro => {
                        console.error("Erro ao processar a resposta de erro:", erro);
                        pErro.innerHTML = "Erro desconhecido. Por favor, tente novamente mais tarde.";
                        dialogoErro.showModal();
                    });

                    // Remove o item da lista
                    grupoInformacoes.remove();

                    // Atualiza a contagem de unidades após a remoção
                    atualizarContagem();

                    // Fecha o modal após a exclusão
                    fecharModal();
                }
            })
        }
    }
}

// Função para fechar o modal de confirmação de exclusão
function fecharModal() {
    const modal = document.getElementById('modalConfirmacaoExclusao');
    modal.close();  // Fecha o modal
}

// Função para exibir o modal de confirmação de exclusão
function excluir(button) {
    // Armazena o botão clicado em uma variável global para uso posterior
    window.itemExclusao = button;

    // Abre o modal de confirmação
    const modal = document.getElementById('modalConfirmacaoExclusao');
    modal.showModal();
}

// Função para atualizar a contagem das unidades
function atualizarContagem() {
    const totalUnidades = document.querySelectorAll('.grupoInformacoes').length;
    document.querySelector('.numero').textContent = totalUnidades;

    // Verifica se não há unidades e exibe a mensagem de lista vazia
    const mensagemVazia = document.getElementById('mensagemVazia');
    if (totalUnidades === 0) {
        mensagemVazia.style.display = 'block';
    } else {
        mensagemVazia.style.display = 'none';
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
    window.location.href = 'perfil.html';
}

