//Contador do textarea


const textarea = document.getElementById('mensagem');
        const contador = document.getElementById('contador');

        textarea.addEventListener('input', function() {
            const caracteresDigitados = textarea.value.length;
            const limiteCaracteres = textarea.getAttribute('maxlength');
            contador.textContent = `${caracteresDigitados}/${limiteCaracteres}`;
        });


// Função do botão


document.addEventListener('DOMContentLoaded', function () {
    const btnEnviarMensagem = document.querySelector(".btnEnviar");

    btnEnviarMensagem.addEventListener('click', function(event) {
        event.preventDefault();

        const inputNome = document.getElementById('nome');
        const inputEmail = document.getElementById('email');
        const inputMensagem = document.getElementById('mensagem');
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

        if(validacaoEmail && validacaoNome && validacaoMensagem){
            dialogo.showModal();
        } else {
           dialogoErro.showModal();
        }
    })
})

function contato(){
    window.location.href="contato.html"
}

function fecharModal(){
    dialogoErro.close();
}