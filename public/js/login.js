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
            dialogo.showModal();
        }
        else {
            let errosModal = "";
            if (inputEmail.value == '') {
                errosModal += "Por favor, insira o seu email.<br>";
            } else if (!validacaoEmail) {
                errosModal += "O email inserido não está cadastrado.<br>";       // Atualizar aqui quando tiver acesso ao banco de dados
            }else if (inputSenha.value == '') {
                errosModal += "Por favor, insira a sua senha.<br>";
            } else if (!validacaoSenha) {
                errosModal += "A senha inserida não está correta!<br>";              // Atualizar aqui quando tiver acesso ao banco de dados
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