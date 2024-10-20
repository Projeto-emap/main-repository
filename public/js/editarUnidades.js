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

function validarInputNomeRepresentante(input) {
    const nome = input.value.trim();
    const nomeLabel = document.querySelector('.nomeLabel');

    if (nome.length === 0 || nome.length > 100) {
        nomeLabel.style.color = 'red';
        return false;
    } else {
        nomeLabel.style.color = '';
        return true;
    }
}

function validarNumeroEstacoes() {
    const numeroEstacoes = document.getElementById('numeroEstacoes');
    const valor = parseInt(numeroEstacoes.value);
    
    if (isNaN(valor) || valor < 0) {
        numeroEstacoes.style.borderColor = 'red';
        return false;
    } else {
        numeroEstacoes.style.borderColor = '';
        return true;
    }
}

function validarSelecionar(select) {
    if (select.value === '#') {
        select.style.borderColor = 'red';
        return false;
    } else {
        select.style.borderColor = '';
        return true;
    }
}

function validarFormulario() {
    const nomeValido = validarInputNomeRepresentante(document.getElementById('nome'));
    const numeroEstacoesValido = validarNumeroEstacoes();
    const conectoresValido = validarSelecionar(document.getElementById('tipoConectores'));
    const potenciaValido = validarSelecionar(document.getElementById('potenciaDisponivel'));
    const velocidadeValido = validarSelecionar(document.getElementById('velocidadeCarregamento'));

    return nomeValido && numeroEstacoesValido && conectoresValido && potenciaValido && velocidadeValido;
}
