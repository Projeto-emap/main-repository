function index() {
    window.location.href = "index.html"
}

function perfil() {
    window.location.href = 'perfil.html';
}

function voltar() {
    window.location.href="cadastroEletropostoParte2.html"
    }

function editarInformacoes() {
document.querySelectorAll('input, select').forEach(element => {
    element.removeAttribute('disabled'); 
});

document.querySelector('#btnEditar').style.display = 'none';
document.querySelector('#btnFinalizar').style.display = 'block';
}

function finalizarEdicao() {
document.querySelectorAll('input, select').forEach(element => {
    element.setAttribute('disabled', true); 
});

document.querySelector('#btnEditar').style.display = 'block';
document.querySelector('#btnFinalizar').style.display = 'none';
}

document.querySelectorAll('input, select').forEach(element => {
element.setAttribute('disabled', true);
});