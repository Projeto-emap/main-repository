const btnContinuar = document.getElementById('continuar');
const btnVoltar = document.getElementById('voltar');
const btnFinalizar = document.getElementById('finalizar');
const nomeInput = document.getElementById('nome');
const cepInput = document.getElementById('cep');
const cidadeInput = document.getElementById('cidade');
const ruaInput = document.getElementById('rua');
const numeroRuaInput = document.getElementById('numero');
const estacoesInput = document.getElementById('estacoes');

btnVoltar.addEventListener('click', function () {
    document.getElementById('parte2').style.display = 'none';
    document.getElementById('parte1').style.display = 'block';
});

btnFinalizar.addEventListener('click', finalizar);
btnContinuar.addEventListener('click', continuar);


function index() {
    window.location.href = 'index.html';
}

function perfil() {
    window.location.href = 'perfil.html';
}

function continuar() {
    const nomeEletroposto = nomeInput.value;
    const nomeValido = nomeEletroposto.trim() !== '';
    nome.classList.toggle('input-invalido', !nomeValido);
    nome.classList.toggle('input-valido', nomeValido);

    const cepEletroposto = cepInput.value.replace(/-/g, ''); // Remove traços
    const cepValido = cepEletroposto.length === 8 && /^\d{8}$/.test(cepEletroposto);
    cep.classList.toggle('input-invalido', !cepValido);
    cep.classList.toggle('input-valido', cepValido);

    const cidadeValido = cidadeInput.value.trim() !== '';
    cidade.classList.toggle('input-invalido', !cidadeValido);
    cidade.classList.toggle('input-valido', cidadeValido);

    const ruaValido = ruaInput.value.trim() !== '';
    rua.classList.toggle('input-invalido', !ruaValido);
    rua.classList.toggle('input-valido', ruaValido);

    const numeroRuaValido = numeroRuaInput.value.trim() !== '';
    numero.classList.toggle('input-invalido', !numeroRuaValido);
    numero.classList.toggle('input-valido', numeroRuaValido);

    if (nomeValido && cepValido && cidadeValido) {
        document.getElementById('parte1').style.display = 'none';
        document.getElementById('parte2').style.display = 'block';
    }
}

function validarInputCep(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
    let valorInput = input.value;

    if (valorInput.length > 5) {
        valorInput = valorInput.replace(/^(\d{5})(\d)/, '$1-$2');
    }

    input.value = valorInput;
    if (valorInput.length > 9) {
        input.value = input.value.substring(0, 9);
    }
}

function validarInputCidade(input) {
    input.value = input.value.replace(/[^a-zA-ZÀ-ÿ-\s]/g, '');
}

function validarInputRua(input) {
    input.value = input.value.replace(/[^a-zA-ZÀ-ÿ0-9-\s]/g, '');
}

function validarInputNumeroRua(input) {
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
}

function validarInputEstacoes(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}

function finalizar() {
    const estacoesValido = estacoesInput.value.trim() !== '';
    estacoes.classList.toggle('input-invalido', !estacoesValido);
    estacoes.classList.toggle('input-valido', estacoesValido);

    //colocar a função back-end de cadastro aqui



    if(estacoesValido){
        window.location.href = 'cadastroEletropostoParte1.html';
    }
}