function voltar() {
    window.location.href = "gerenciarEletroposto.html";
}

function index() {
    window.location.href = "index.html";
}

function perfil() {
    window.location.href = 'perfil.html';
}

function editar() {
    window.location.href = 'editarUnidades.html';
}

function excluir(button) {
    const grupoInformacoes = button.closest('.grupoInformacoes');
    grupoInformacoes.remove();
    
    atualizarContagem();
}

function atualizarContagem() {
    const totalUnidades = document.querySelectorAll('.grupoInformacoes').length;
    document.querySelector('.numero').textContent = totalUnidades;

    const mensagemVazia = document.getElementById('mensagemVazia');
    if (totalUnidades === 0) {
        mensagemVazia.style.display = 'block'; 
    } else {
        mensagemVazia.style.display = 'none';
    }
}