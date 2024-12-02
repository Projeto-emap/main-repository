const btnContinuar = document.getElementById('continuar');
const btnVoltar = document.getElementById('voltar');
const btnFinalizar = document.getElementById('finalizar');
const btnRealizado = document.getElementById('realizado');
const nomeInput = document.getElementById('nome');
const cepInput = document.getElementById('cep');
const bairroInput = document.getElementById('bairro');
const ruaInput = document.getElementById('rua');
const numeroRuaInput = document.getElementById('numero');
const estacoesInput = document.getElementById('estacoes');
const conectoresSelect = document.getElementById('conectores');
const potenciaSelect = document.getElementById('potencia');
const velocidadeSelect = document.getElementById('velocidade');
const fkUsuario = sessionStorage.getItem('idUsuario');

btnVoltar.addEventListener('click', function () {
    document.getElementById('parte2').style.display = 'none';
    document.getElementById('parte1').style.display = 'block';
});

btnFinalizar.addEventListener('click', finalizar);
btnContinuar.addEventListener('click', continuar);
btnRealizado.addEventListener('click', cadastroRealizado);


function index() {
    window.location.href = 'index.html';
}

function perfil() {
    window.location.href = 'perfil.html';
}

async function continuar() {
    const nomeEletroposto = nomeInput.value;
    const nomeValido = nomeEletroposto.trim() !== '';
    const cepEletroposto = cepInput.value.replace(/-/g, '').trim(); // Remove traços
    let cepValido = cepEletroposto.length === 8 && /^\d{8}$/.test(cepEletroposto);
    const bairroValido = bairroInput.value.trim() !== '';
    const ruaValido = ruaInput.value.trim() !== '';
    const numeroRuaValido = numeroRuaInput.value.trim() !== '';

    if (nomeValido && cepValido && bairroValido) {
        document.getElementById('parte1').style.display = 'none';
        document.getElementById('parte2').style.display = 'block';
    } else {
        let errosModal = "";
        if (nomeInput.value == '') {
            errosModal += "Insira o nome da unidade.<br/>";
        }
        if (cepInput.value == '') {
            errosModal += "Insira o CEP da unidade.<br/>";
        } else if (cepEletroposto.length != 8) {
            errosModal += "Verifique os dígitos do CEP.<br/>"
        } else {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepEletroposto}/json/`);
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }

                const data = await response.json();

                if (!("erro" in data)) {
                    console.log('Dados do CEP:', data);
                } else {
                    errosModal += "CEP não encontrado.<br/>";
                    cepValido = false;
                }
            } catch (error) {
                console.error('Erro:', error);
                errosModal += "Ocorreu um erro ao buscar o CEP.<br/>";
            }
        }
        if (bairroInput.value == '') {
            errosModal += "Insira a bairro dessa unidade.<br/>";
        } else if (!bairroValido) {
            errosModal += "A bairro inserida não é válida!<br/>";
        }
        if (ruaInput.value == '') {
            errosModal += "Insira o nome da rua dessa unidade.<br/>";
        } else if (!ruaValido) {
            errosModal += "A rua inserida não é válida!<br/>";
        }
        if (numeroRuaInput.value == '') {
            errosModal += "Insira o numero da rua dessa unidade.";
        } else if (!numeroRuaValido) {
            errosModal += "O numero da rua inserido não é válido!";
        }
        nome.classList.toggle('input-invalido', !nomeValido);
        nome.classList.toggle('input-valido', nomeValido);
        cep.classList.toggle('input-invalido', !cepValido);
        cep.classList.toggle('input-valido', cepValido);
        bairro.classList.toggle('input-invalido', !bairroValido);
        bairro.classList.toggle('input-valido', bairroValido);
        rua.classList.toggle('input-invalido', !ruaValido);
        rua.classList.toggle('input-valido', ruaValido);
        numero.classList.toggle('input-invalido', !numeroRuaValido);
        numero.classList.toggle('input-valido', numeroRuaValido);

        pCadastro.innerHTML = errosModal;
        dialogoCadastroUnidade.showModal();
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

function validarInputBairro(input) {
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

function erro() {
    dialogoCadastroUnidade.close();
}
 
function finalizar() {
    const estacoesValido = estacoesInput.value.trim() !== '';
    const cepEletroposto = cepInput.value.replace(/-/g, '').trim(); // Removendo os traços do CEP
    let qtdEstacoes = Number(estacoesInput.value);
    estacoesInput.classList.toggle('input-invalido', !estacoesValido);
    estacoesInput.classList.toggle('input-valido', estacoesValido);

    const conectoresValido = conectoresSelect.value !== '#';
    let tipoConector = conectoresSelect.value;
    conectoresSelect.classList.toggle('input-invalido', !conectoresValido);
    conectoresSelect.classList.toggle('input-valido', conectoresValido);

    const potenciaValido = potenciaSelect.value !== '#';
    let potenciaDeRecarga = Number(potenciaSelect.value);
    potenciaSelect.classList.toggle('input-invalido', !potenciaValido);
    potenciaSelect.classList.toggle('input-valido', potenciaValido);

    const velocidadeValido = velocidadeSelect.value !== '#';
    let redeDeRecarga = velocidadeSelect.value;
    velocidadeSelect.classList.toggle('input-invalido', !velocidadeValido);
    velocidadeSelect.classList.toggle('input-valido', velocidadeValido);

    let errosModal = "";
    if (estacoesInput.value == '') {
        errosModal += "Insira a quantidade de estações.<br/>";
    } else if (!estacoesValido) {
        errosModal += "A quantidade de estações é inválida!<br/>";
    }
    if (!conectoresValido) {
        errosModal += "Selecione um conector.<br/>";
    }
    if (!potenciaValido) {
        errosModal += "Selecione uma potência.<br/>";
    }
    if (!velocidadeValido) {
        errosModal += "Selecione uma velocidade.<br/>";
    }
    pCadastro.innerHTML = errosModal;
    dialogoCadastroUnidade.showModal();

    if (estacoesValido && conectoresValido && potenciaValido && velocidadeValido) {
        console.log({
            nomeServer: nomeInput.value,
            cepServer: cepEletroposto, // Usando a variável corrigida
            bairroServer: bairroInput.value,
            ruaServer: ruaInput.value,
            numeroServer: numeroRuaInput.value,
            qtdEstacoesServer: qtdEstacoes,
            tipoConectorServer: tipoConector,
            potenciaDeRecargaServer: potenciaDeRecarga,
            redeDeRecargaServer: redeDeRecarga,
            fkUsuarioServer: sessionStorage.getItem('ID_USUARIO')
        });

        fetch("/eletroposto/cadastrarEletroposto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nomeInput.value,
                cepServer: cepEletroposto,  // Usando a variável corretamente
                bairroServer: bairroInput.value,
                ruaServer: ruaInput.value,
                numeroServer: numeroRuaInput.value,
                qtdEstacoesServer: qtdEstacoes,
                tipoConectorServer: tipoConector,
                potenciaDeRecargaServer: potenciaDeRecarga,
                redeDeRecargaServer: redeDeRecarga,
                fkUsuarioServer: sessionStorage.getItem('ID_USUARIO')
            })
        })
        .then(function (resposta) {
            if (resposta.ok) {
                const dialogo = document.querySelector('.dialogo');
                dialogo.showModal();
            } else {
                const dialogoCadastroUnidade = document.querySelector('.dialogoCadastroUnidade');
                dialogoCadastroUnidade.showModal();
            }
        })
        .catch(function (erro) {
            console.error(`#ERRO: ${erro.message}`);
            alert(erro.message);
        });
    }
}


function cadastroRealizado() {
    window.location.href = 'gerenciarEletropostoParte1.html';
}