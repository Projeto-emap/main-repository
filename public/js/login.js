//Função do olho

function verSenha() {
    const senhaInput = document.getElementById('senha');
    const olho = document.querySelector('.olhoSenha img');

    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        olho.src = 'assets/img/visivel.png';
    } else {
        senhaInput.type = 'password';
        olho.src = 'assets/img/invisivel.png';
    }
}

function cadastro() {
    window.location.href = "cadastro.html"
}


// Validação dos campos


document.addEventListener('DOMContentLoaded', function () {
    const btnLogar = document.querySelector(".btnEntrar");

    btnLogar.addEventListener('click', function (event) {
        event.preventDefault();

        const inputEmail = document.getElementById("email");
        const inputSenha = document.getElementById("senha");

        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();

        const validacaoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        inputEmail.classList.toggle('input-invalido', !validacaoEmail);
        inputEmail.classList.toggle('input-valido', validacaoEmail);

        const validacaoSenha = senha != '';
        inputSenha.classList.toggle('input-invalido', !validacaoSenha);
        inputSenha.classList.toggle('input-valido', validacaoSenha);
        const dialogo = document.getElementById('dialogo');
        const dialogoErro = document.getElementById('dialogoErro');

        if (validacaoEmail && validacaoSenha) {
            fetch("/usuarios/logar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    emailServer: email,
                    senhaServer: senha
                })
            })
                .then(function (resposta) {
                    console.log("ESTOU NO THEN da função de login!");

                    if (resposta.ok) {
                        // Processa a resposta JSON uma única vez
                        return resposta.json();
                    } else {
                        // Se não for OK, processa o erro e lança um novo erro para o catch
                        return resposta.json().then(json => {
                            throw new Error(json.message || "Erro ao realizar o login.");
                        });
                    }
                })
                .then(function (json) {
                    console.log("Login realizado com sucesso:", json);

                    // Armazena os dados no sessionStorage
                    sessionStorage.setItem('ID_USUARIO', json.idUsuario);
                    sessionStorage.setItem('NOME_USUARIO', json.nome);

                    console.log("Dados armazenados no sessionStorage:");
                    console.log("NOME_USUARIO:", sessionStorage.getItem('NOME_USUARIO'));
                    console.log("ID_USUARIO:", sessionStorage.getItem('ID_USUARIO'));

                    // Exibe o diálogo de sucesso
                    dialogo.showModal();
                })
                .catch(function (erro) {
                    console.error("Erro durante o login:", erro.message);
                    pErro.innerHTML = erro.message || "Erro desconhecido. Por favor, tente novamente mais tarde.";
                    dialogoErro.showModal();
                });
        } else {
            let errosModal = "";
            if (inputEmail.value == '') {
                errosModal += "Por favor, insira o seu email.<br>";
                // } else if (!validacaoEmail) {
                //     errosModal += "O email inserido não está cadastrado.<br>";       // Atualizar aqui quando tiver acesso ao banco de dados
            } else if (inputSenha.value == '') {
                errosModal += "Por favor, insira a sua senha.<br>";
                // } else if (!validacaoSenha) {
                //     errosModal += "A senha inserida não está correta!<br>";              // Atualizar aqui quando tiver acesso ao banco de dados
            }

            pErro.innerHTML = errosModal;
            dialogoErro.showModal();
        }
    })
})

function index() {
    window.location.href = "index.html"
}

function login() {
    dialogoErro.close();
}

function gerenciar() {
    window.location.href = 'dashboard.html';
}