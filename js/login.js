//Função do olho

function verSenha() {
    const senhaInput = document.getElementById('senha');
    const olho = document.querySelector('.olhoSenha img');

    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        olho.src = 'img/visivel.png'; 
    } else {
       senhaInput.type = 'password';
        olho.src = 'img/invisivel.png'; 
    }
}

function cadastro(){
    window.location.href="cadastro.html"
}


// Validação dos campos


document.addEventListener('DOMContentLoaded', function(){
    const btnLogar = document.querySelector(".btnEntrar");
    
    btnLogar.addEventListener('click', function(event){
        event.preventDefault();

        const inputEmail = document.getElementById("email");
        const inputSenha = document.getElementById("senha");

        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();

        const validacaoEmail =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        inputEmail.classList.toggle('input-invalido', !validacaoEmail);
        inputEmail.classList.toggle('input-valido', validacaoEmail);

        const validacaoSenha = senha != '';
        inputSenha.classList.toggle('input-invalido', !validacaoSenha);
        inputSenha.classList.toggle('input-valido', validacaoSenha);
        const dialogo = document.getElementById('dialogo');

        if(validacaoEmail && validacaoSenha){
           dialogo.showModal();
        } 
        else {
        alert("Por favor, preencha todos os campos corretamente!")
        }
    })
})

function index(){
    window.location.href="index.html"
}