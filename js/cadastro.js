// Input olhos


const divRepresentante = document.querySelector('.containerRepresentanteEmpresa');
const divEmpresa = document.querySelector('#Empresa');
const divSenha = document.querySelector('.divSenha');
const btnContinuar1 = document.getElementById('btnContinuar1');
const btnContinuar2 = document.getElementById('btnContinuar2');
const btnCriar = document.getElementById('btnCriar');

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

function verSenhaConfirmacao() {
    const senhaInput = document.getElementById('senhaConfirmacao');
    const olhoConfirmacao = document.querySelector('.olhoSenhaConfirmacao img');

    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        olhoConfirmacao.src = 'img/visivel.png';
    } else {
        senhaInput.type = 'password';
        olhoConfirmacao.src = 'img/invisivel.png';
    }
}


// Validação Empresa


document.addEventListener('DOMContentLoaded', function () {
    const cnpjInput = document.getElementById('CNPJ');
    const nomeInput = document.getElementById('nomeSocial');
    const estadoInput = document.getElementById('estado');
    const cepInput = document.getElementById('cep');
    const btnContinuar = document.getElementById('btnContinuar1');

    function validarCampos1() {

        const cnpj = cnpjInput.value.replace(/[.\-/]/g, ''); // Remove pontos, barras e traços
        const cnpjValido = cnpj.length === 14 && /^\d{14}$/.test(cnpj);
        cnpjInput.classList.toggle('input-invalido', !cnpjValido);
        cnpjInput.classList.toggle('input-valido', cnpjValido);

        const nomeValido = nomeInput.value.trim() !== '';
        nomeInput.classList.toggle('input-invalido', !nomeValido);
        nomeInput.classList.toggle('input-valido', nomeValido);

        const estadoValido = estadoInput.value.trim() !== '';
        estadoInput.classList.toggle('input-invalido', !estadoValido);
        estadoInput.classList.toggle('input-valido', estadoValido);

        const cep = cepInput.value.replace(/-/g, ''); // Remove traços
        const cepValido = cep.length === 8 && /^\d{8}$/.test(cep);
        cepInput.classList.toggle('input-invalido', !cepValido);
        cepInput.classList.toggle('input-valido', cepValido);

        return cnpjValido && nomeValido && estadoValido && cepValido;
    }

    btnContinuar.addEventListener('click', function (event) {
        event.preventDefault();

        if (validarCampos1()) {
            passo2();
        } else {
            alert("Erro: verifique todos os campos");
        }
    });
});

function passo2() {
    passo.innerHTML = `Passo 2/3`;
    btnContinuar1.style.display = 'none';
    divEmpresa.style.display = 'none';
    btnContinuar2.style.display = 'block';
    divRepresentante.style.display = 'block';
}


// Validação representante


document.addEventListener('DOMContentLoaded', function () {
    const nomeInput = document.getElementById('nome');
    const cpfInput = document.getElementById('CPF');
    const emailInput = document.getElementById('email');
    const celularInput = document.getElementById('celular');
    const btnContinuar = document.getElementById('btnContinuar2');

    function validarCampos2() {
        const nomeValido = /^[A-Za-z\s]+$/.test(nomeInput.value.trim());
        nomeInput.classList.toggle('input-invalido', !nomeValido);
        nomeInput.classList.toggle('input-valido', nomeValido);

        const cpf = cpfInput.value.replace(/[.\-]/g, ''); // Remove pontos e hífens
        const cpfValido = cpf.length === 11 && /^\d{11}$/.test(cpf);
        cpfInput.classList.toggle('input-invalido', !cpfValido);
        cpfInput.classList.toggle('input-valido', cpfValido);

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
        emailInput.classList.toggle('input-invalido', !emailValido);
        emailInput.classList.toggle('input-valido', emailValido);

        const celular = celularInput.value.replace(/[\(\)\-]/g, '');
        const celularEsterilizado = celular.replaceAll(" ", "");
        const celularValido = celularEsterilizado.length === 11 && /^\d{11}$/.test(celularEsterilizado);
        celularInput.classList.toggle('input-invalido', !celularValido);
        celularInput.classList.toggle('input-valido', celularValido);

        return nomeValido && cpfValido && emailValido && celularValido;
    }

    btnContinuar.addEventListener('click', function (event) {
        event.preventDefault();

        if (validarCampos2()) {
            passo3();
        } else {
            alert("Erro: verifique todos os campos");
        }
    });
});

function passo3() {
    passo.innerHTML = `Passo 3/3`;
    btnContinuar2.style.display = 'none';
    divRepresentante.style.display = 'none';
    btnCriar.style.display = 'block';
    divSenha.style.display = 'block';
}


// Validação senha


document.addEventListener('DOMContentLoaded', function () {
    const senhaInput = document.getElementById('senha');
    const senhaConfirmacaoInput = document.getElementById('senhaConfirmacao');
    const criterios = document.querySelectorAll('.criterios li');
    const [criterioComprimento, criterioMaiuscula, criterioMinuscula, criterioNumero, criterioCoincidir] = criterios;
    const btnCriar = document.getElementById('btnCriar');

    function validarSenha() {
        const senha = senhaInput.value;
        const confirmacao = senhaConfirmacaoInput.value;

        criterioComprimento.style.color = senha.length >= 6 ? 'green' : 'red';
        criterioMaiuscula.style.color = /[A-Z]/.test(senha) ? 'green' : 'red';
        criterioMinuscula.style.color = /[a-z]/.test(senha) ? 'green' : 'red';
        criterioNumero.style.color = /[0-9]/.test(senha) ? 'green' : 'red';
        criterioCoincidir.style.color = senha === confirmacao ? 'green' : 'red';
    }

    senhaInput.addEventListener('input', validarSenha);
    senhaConfirmacaoInput.addEventListener('input', validarSenha);

    btnCriar.addEventListener('click', function (event) {
        event.preventDefault();

        const senha = senhaInput.value;
        const confirmacao = senhaConfirmacaoInput.value;

        const senhaValida =
            senha.length >= 6 &&
            /[A-Z]/.test(senha) &&
            /[a-z]/.test(senha) &&
            /[0-9]/.test(senha);
        const senhaConfirmacaoValida = senha === confirmacao;

        senhaInput.classList.toggle('input-invalido', !senhaValida);
        senhaInput.classList.toggle('input-valido', senhaValida);
        senhaConfirmacaoInput.classList.toggle('input-invalido', !senhaConfirmacaoValida);
        senhaConfirmacaoInput.classList.toggle('input-valido', senhaConfirmacaoValida);

        if (senhaValida && senhaConfirmacaoValida) {
            alert("Todas as informações estão corretas!");
        }
    });
});