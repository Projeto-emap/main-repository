const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputMensagem = document.getElementById('mensagem');

document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('mensagem');
    const contador = document.getElementById('contador');

    textarea.addEventListener('input', function () {
        const caracteresDigitados = textarea.value.length;
        const limiteCaracteres = textarea.getAttribute('maxlength');
        const formatarNumero = (numero) => numero.toString().padStart(3, '0');

        contador.textContent = `${formatarNumero(caracteresDigitados)}/${limiteCaracteres}`;

        if (caracteresDigitados >= limiteCaracteres) {
            contador.style.color = 'red';
            dialogoTexto.showModal();
        } else {
            contador.style.color = 'black';
        }
    });
});


// Função do botão


document.addEventListener('DOMContentLoaded', function () {
    const btnEnviarMensagem = document.querySelector(".btnEnviar");

    btnEnviarMensagem.addEventListener('click', function (event) {
        event.preventDefault();

        const nome = inputNome.value.trim();
        const email = inputEmail.value.trim();
        const mensagem = inputMensagem.value.trim();

        const validacaoNome =
            nome != null &&
            nome !== "" &&
            !/[0-9]/.test(nome);
        inputNome.classList.toggle('input-invalido', !validacaoNome);
        inputNome.classList.toggle('input-valido', validacaoNome);

        const validacaoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        inputEmail.classList.toggle('input-invalido', !validacaoEmail);
        inputEmail.classList.toggle('input-valido', validacaoEmail);

        const validacaoMensagem =
            mensagem != null &&
            mensagem !== "" &&
            mensagem.length <= 500;
        inputMensagem.classList.toggle('input-invalido', !validacaoMensagem);
        inputMensagem.classList.toggle('input-valido', validacaoMensagem);
        const dialogo = document.getElementById('dialogo');

        if (validacaoEmail && validacaoNome && validacaoMensagem) {
            cadastrarContato();
            dialogo.showModal();
        } else {
            let errosModal = "";
            if (inputNome.value == '') {
                errosModal += "Por favor, insira o seu nome.<br>";
            } else if (!validacaoNome) {
                errosModal += "O nome inserido não é válido!<br>";
            }
            if (inputEmail.value == '') {
                errosModal += "Por favor, insira o seu email.<br>";
            } else if (!validacaoEmail) {
                errosModal += "O email inserido não é válido!<br>";
            }
            if (inputMensagem.value == '') {
                errosModal += "Por favor, insira a sua mensagem.";
            } else if (!validacaoMensagem) {
                errosModal += "A mensagem inserida não é válida!";
            }
            pErro.innerHTML = errosModal;
            dialogoErro.showModal();
        }
    })
});

function validarInputNomeRepresentante(input) {
    input.value = input.value.replace(/[^a-zA-ZÀ-ÿ/s]/g, '');
}

function contato() {
    window.location.href = "contato.html"
}

function fecharModal() {
    dialogoErro.close();
}

function cadastrarContato(){
    
    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();
    const mensagem = inputMensagem.value.trim();


    fetch("/contato/cadastrarContato", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            mensagemServer: mensagem

        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                // setTimeout(() => {
                window.location = "login.html";
                // }, "2000");

            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}
