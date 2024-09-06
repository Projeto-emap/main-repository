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


