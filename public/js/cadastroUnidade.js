document.getElementById('continuar').addEventListener('click', function() {
    document.getElementById('parte1').style.display = 'none';
    document.getElementById('parte2').style.display = 'block';
});

document.getElementById('voltar').addEventListener('click', function() {
    document.getElementById('parte2').style.display = 'none';
    document.getElementById('parte1').style.display = 'block';
});

document.getElementById('finalizar').addEventListener('click', finalizar);
document.getElementById('continuar').addEventListener('click', continuar);

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
    
}