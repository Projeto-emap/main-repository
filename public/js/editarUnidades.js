const btnEditar = document.getElementById('btnEditar');
const btnFinalizar = document.getElementById('btnFinalizar');
const nomeInput = document.getElementById('nome');
const numeroEstacoesInput = document.getElementById('numeroEstacoes');
const conectoresSelect = document.getElementById('tipoConectores');
const potenciaSelect = document.getElementById('potenciaDisponivel');
const velocidadeSelect = document.getElementById('velocidadeCarregamento');
const dialogoCadastroUnidade = document.getElementById('dialogoCadastroUnidade'); // Modal para exibir erros
const pCadastro = document.getElementById('pCadastro'); // Elemento para mensagens de erro

function index() {
    window.location.href = "index.html";
}

function perfil() {
    window.location.href = 'perfil.html';
}

function voltar() {
    window.location.href = "cadastroEletropostoParte2.html";
}

function editarInformacoes() {
    document.querySelectorAll('input, select').forEach(element => {
        element.removeAttribute('disabled');
    });

    btnEditar.style.display = 'none';
    btnFinalizar.style.display = 'block';
}

function finalizarEdicao() {
    const erros = [];

    // Obtendo referências aos elementos de input
    const nomeInput = document.getElementById('nome');
    const numeroEstacoesInput = document.getElementById('numeroEstacoes');
    const conectoresSelect = document.getElementById('tipoConectores');
    const potenciaSelect = document.getElementById('potenciaDisponivel');
    const velocidadeSelect = document.getElementById('velocidadeCarregamento');

    const nomeValido = validarInputNomeRepresentante(nomeInput);
    if (!nomeValido) {
        erros.push("Insira um nome válido para a unidade.");
    } 

    const numeroEstacoesValido = validarNumeroEstacoes(numeroEstacoesInput);
    if (!numeroEstacoesValido) {
        erros.push("Insira um número de estações de carregamento válido.");
        numeroEstacoesInput.classList.toggle('input-invalido');
    } 

    const conectoresValido = validarSelecionar(conectoresSelect);
    if (!conectoresValido) {
        erros.push("Selecione um tipo de conector.");
        conectoresSelect.classList.toggle('input-invalido');
    } 

    const potenciaValido = validarSelecionar(potenciaSelect);
    if (!potenciaValido) {
        erros.push("Selecione uma potência disponível.");
        potenciaSelect.classList.toggle('input-invalido');
    }

    const velocidadeValido = validarSelecionar(velocidadeSelect);
    if (!velocidadeValido) {
        erros.push("Selecione uma velocidade de carregamento.");
        velocidadeSelect.classList.toggle('input-invalido');
    } 
    nomeInput.classList.toggle('input-invalido', !nomeValido);
    nomeInput.classList.toggle('input-valido', nomeValido);

    numeroEstacoesInput.classList.toggle('input-valido', numeroEstacoesValido);
    numeroEstacoesInput.classList.toggle('input-invalido', !numeroEstacoesValido);

    conectoresSelect.classList.toggle('input-valido', conectoresValido);
    conectoresSelect.classList.toggle('input-invalido', !conectoresValido);

    potenciaSelect.classList.toggle('input-valido', potenciaValido);
    potenciaSelect.classList.toggle('input-invalido', !potenciaValido);

    velocidadeSelect.classList.toggle('input-valido', velocidadeValido);
    velocidadeSelect.classList.toggle('input-invalido', !velocidadeValido);

    if (erros.length > 0) {
        pCadastro.innerHTML = erros.join("<br/>");
        dialogoCadastroUnidade.showModal();
    } else {
        document.querySelectorAll('input, select').forEach(element => {
            element.setAttribute('disabled', true);
            element.style.borderColor = '';
        });

        btnEditar.style.display = 'block';
        btnFinalizar.style.display = 'none';
        dialogo.showModal();
    }
}


function validarInputNomeRepresentante(input) {
    const nome = input.value.trim();
    if (nome.length === 0 || nome.length > 100) {
        input.style.borderColor = 'red';
        return false;
    } else {
        input.style.borderColor = '';
        return true;
    }
}

function validarNumeroEstacoes() {
    const valor = parseInt(numeroEstacoesInput.value);
    if (isNaN(valor) || valor < 0) {
        numeroEstacoesInput.style.borderColor = 'red';
        return false;
    } else {
        numeroEstacoesInput.style.borderColor = '';
        return true;
    }
}

function validarSelecionar(select) {
    if (select.value === '#' || select.value === '') {
        select.style.borderColor = 'red';
        return false;
    } else {
        select.style.borderColor = '';
        return true;
    }
}

// Desabilitar os campos no carregamento da página
document.querySelectorAll('input, select').forEach(element => {
    element.setAttribute('disabled', true);
});
