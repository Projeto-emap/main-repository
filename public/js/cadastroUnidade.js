const btnContinuar = document.getElementById('continuar');
const btnVoltar = document.getElementById('voltar');
const btnFinalizar = document.getElementById('finalizar');

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

function finalizar() {
    //colocar a função back-end de cadastro aqui



    window.location.href = 'cadastroEletropostoParte1.html';
}


function continuar() {
    const nomeEletroposto = nome.value;
    const nomeValido = nomeEletroposto.trim() !== '';
    nome.classList.toggle('input-invalido', !nomeValido);
    nome.classList.toggle('input-valido', nomeValido);


    if (nomeValido) {
        document.getElementById('parte1').style.display = 'none';
        document.getElementById('parte2').style.display = 'block';
    }
}