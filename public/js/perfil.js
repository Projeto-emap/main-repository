function index() {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function () {

    const nomeUsuarioMain = document.querySelector("#usuarioMain");
    const nomeUsuarioEditar = document.querySelector("#usuarioEditar");
    const telefoneUsuarioEditar = document.querySelector("#telefoneEditar");
    const emailUsuarioEditar = document.querySelector("#emailEditar");

    const deletarConta = document.querySelector('#confirm-delete');
    const inputEmail = document.querySelector('.inputEmail');
    const inputNome = document.querySelector('.inputNome');
    const inputTelefone = document.querySelector('.inputTelefone');

    const buttonSalvar = document.getElementById('buttonSalvar');
    const buttonEditar = document.getElementById('buttonEditar');
    const buttonCancelar = document.getElementById('buttonCancelar');
    const buttonExcluir = document.getElementById('buttonExcluir');
    const buttonCancelarExcluir = document.getElementById('buttonCancelarExcluir');
    const buttonConfirmarExcluir = document.getElementById('buttonConfirmarExcluir');


    fetch("/usuarios/carregarInfo", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (resposta) {
            console.log("ESTOU NO THEN da função de carregarInfo!");

            if (resposta.ok) {
                return resposta.json();
            } else {
                return resposta.json().then(json => {
                    throw new Error(json.message || "Erro ao realizar o login.");
                });
            }
        })
        .then(function (json) {
            console.log("CarregarInfo realizado com sucesso:", json);

            sessionStorage.setItem('NOME_USUARIO', json.nome);
            localStorage.setItem("TELEFONE_USUARIO", json.numeroCelular);
            localStorage.setItem("EMAIL_USUARIO", json.email);

            console.log("Dados armazenados no sessionStorage:");
            console.log("NOME_USUARIO:", sessionStorage.getItem('NOME_USUARIO'));

            

        })
        .catch(function (erro) {
            console.error("Erro durante o login:", erro.message);
        });

        nomeUsuarioMain.innerHTML = sessionStorage.getItem("NOME_USUARIO");
        nomeUsuarioEditar.value = sessionStorage.getItem("NOME_USUARIO");
        telefoneUsuarioEditar.value = localStorage.getItem("TELEFONE_USUARIO");
        emailUsuarioEditar.value = localStorage.getItem("EMAIL_USUARIO");



    function confirmDelete() {
        document.getElementById('confirm-delete').style.display = 'flex';
        document.querySelector('.cancel-button').style.display = 'block';
        document.querySelector('.confirm-button').style.display = 'block';
        document.querySelector('.delete-account').style.display = 'none';
    }

    function cancelDelete() {
        document.querySelector('.delete-account').style.display = 'block';
        document.getElementById('confirm-delete').style.display = 'none';
        document.querySelector('.cancel-button').style.display = 'none';
        document.querySelector('.confirm-button').style.display = 'none';
    }

    function deletarContaUsuario() {
        deletarConta.showModal();
    }


    function closeModal() {
        deletarConta.close();
    }

    function deletar() {
        fetch("/usuarios/deletar", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuarioServer: sessionStorage.getItem('ID_USUARIO'), // Pegando o ID do usuário armazenado no sessionStorage
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN da função de deletar login")

            if (resposta.ok) {
                console.log(resposta)

                resposta.json().then(json => {
                    console.log(json)
                    console.log(JSON.stringify(json))
                })
            } else {
                resposta.json().then(json => {
                    console.log("Houve um erro ao tentar realizar o deletar login!");
                }).catch(erro => {
                    console.error("Erro ao processar a resposta de erro:", erro);
                });
            }
        })
    }


    function editarInformacoes() {
        document.querySelector('.buttonEditar').style.display = 'none';
        document.querySelector('.buttonSalvar').style.display = 'block';
        document.querySelector('.buttonCancelar').style.display = 'block';

        toggleInputReadonly();

        inputEmail.style.color = 'black';
        inputNome.style.color = 'black';
        inputTelefone.style.color = 'black';

    }

    function salvarInformacoes() {

        nomeAtualizado = inputNome.value;
        emailAtualizado = inputEmail.value;
        telefoneAtualizado = inputTelefone.value;

        document.querySelector('.buttonEditar').style.display = 'block';
        document.querySelector('.buttonSalvar').style.display = 'none';
        document.querySelector('.buttonCancelar').style.display = 'none';

        toggleInputReadonly();

        inputEmail.style.color = 'gray';
        inputNome.style.color = 'gray';
        inputTelefone.style.color = 'gray';

        fetch("/usuarios/atualizar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuarioServer: sessionStorage.getItem('ID_USUARIO'), // Pegando o ID do usuário armazenado no sessionStorage
                nomeServer: nomeAtualizado,
                emailServer: emailAtualizado,
                telefoneServer: telefoneAtualizado
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN da função de atualização do perfil!")

            if (resposta.ok) {
                console.log(resposta)

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    alert("Perfil atualizado com sucesso!");
                    window.location.href = 'perfil.html';
                });
            } else {
                resposta.json().then(json => {
                    console.log("Houve um erro ao tentar atualizar o perfil!");

                }).catch(erro => {
                    console.error("Erro ao processar a resposta de erro:", erro);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
            alert("Erro ao tentar atualizar o perfil. Por favor, tente novamente.");
        });
    }


    function cancelarInformacoes() {
        // Implementar o sessionStorage:
        inputEmail.value = sessionStorage.getItem('EMAIL_USUARIO')
        inputNome.value = sessionStorage.getItem('NOME_USUARIO');
        inputTelefone.value = sessionStorage.getItem('TELEFONE_USUARIO');

        document.querySelector('.buttonEditar').style.display = 'block';
        document.querySelector('.buttonSalvar').style.display = 'none';
        document.querySelector('.buttonCancelar').style.display = 'none';

        document.querySelector('.buttonEditar').style.display = 'block';
        document.querySelector('.buttonSalvar').style.display = 'none';
        document.querySelector('.buttonCancelar').style.display = 'none';

        toggleInputReadonly();

        inputEmail.style.color = 'gray';
        inputNome.style.color = 'gray';
        inputTelefone.style.color = 'gray';
    }

    function toggleInputReadonly() {
        inputEmail.toggleAttribute('readonly');
        inputNome.toggleAttribute('readonly');
        inputTelefone.toggleAttribute('readonly');

    }

    buttonSalvar.addEventListener('click', salvarInformacoes);
    buttonCancelar.addEventListener('click', cancelarInformacoes);
    buttonEditar.addEventListener('click', editarInformacoes);
    buttonExcluir.addEventListener('click', confirmDelete);
    buttonCancelarExcluir.addEventListener('click', cancelDelete);
    buttonConfirmarExcluir.addEventListener('click', deletar);

});

