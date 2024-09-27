// Input olhos


const divRepresentante = document.querySelector('.containerRepresentanteEmpresa');
const divEmpresa = document.querySelector('#Empresa');
const divSenha = document.querySelector('.divSenha');
const btnContinuar1 = document.getElementById('btnContinuar1');
const btnVoltarContinuar2 = document.getElementById('btnVoltarContinuar2');
const btnContinuar2 = document.getElementById('btnContinuar2');
const btnVoltarCriar = document.getElementById('btnVoltarCriar');
const btnCriar = document.getElementById('btnCriar');
const dialogoCadastro = document.getElementById('dialogoCadastro');

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


// Passo 1


function passo1(){
    passo.innerHTML = `Passo 1/3`;
    btnContinuar2.style.display = 'none';
    divRepresentante.style.display = 'none';
    btnVoltarContinuar2.style.display = 'none';
    btnContinuar1.style.display = 'block';
    divEmpresa.style.display = 'block';
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

        const nomeEmpresa = nomeInput.value;
        const nomeValido = nomeEmpresa.trim() !== '';
        nomeInput.classList.toggle('input-invalido', !nomeValido);
        nomeInput.classList.toggle('input-valido', nomeValido);

        const estado = estadoInput.value;
        const estadoValido = estado.trim() !== '';
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
            const cnpjInput = document.getElementById('CNPJ');
            const nomeInput = document.getElementById('nomeSocial');
            const estadoInput = document.getElementById('estado');
            const cepInput = document.getElementById('cep');
            const cnpj = cnpjInput.value.replace(/[.\-/]/g, '');
            const cnpjValido = cnpj.length === 14 && /^\d{14}$/.test(cnpj);
            const nomeValido = nomeInput.value.trim() !== '';
            const estadoValido = estadoInput.value.trim() !== '';
            const cep = cepInput.value.replace(/-/g, '');
            const cepValido = cep.length === 8 && /^\d{8}$/.test(cep);

            let errosModal = "";
            if (cnpjInput.value == '') {
                errosModal += "Por favor, insira o CNPJ.<br/>";
            } else if (!cnpjValido) {
                errosModal += "O CNPJ inserido não é válido!<br/>";
            }
            if (nomeInput.value == '') {
                errosModal += "Por favor, insira o nome social.<br/>";
            } else if (!nomeValido) {
                errosModal += "O nome social inserido não é válido!<br/>";
            }
            if (estadoInput.value == '') {
                errosModal += "Por favor, insira o estado.<br/>";
            } else if (!estadoValido) {
                errosModal += "O estado inserido não é válido!<br/>";
            }
            if (cepInput.value == '') {
                errosModal += "Por favor, insira o CEP.";
            } else if (!cepValido) {
                errosModal += "O CEP inserido não é válido!";
            }
            pCadastro.innerHTML = errosModal;
            dialogoCadastro.showModal();
        }
    });
});

function passo2() {
    passo.innerHTML = `Passo 2/3`;
    btnContinuar1.style.display = 'none';
    divEmpresa.style.display = 'none';
    btnCriar.style.display = 'none';
    divSenha.style.display = 'none';
    btnVoltarCriar.style.display = 'none';
    btnContinuar2.style.display = 'block';
    divRepresentante.style.display = 'block';
    btnVoltarContinuar2.style.display = 'block';
}


// Validação representante


document.addEventListener('DOMContentLoaded', function () {
    const nomeInput = document.getElementById('nome');
    const cpfInput = document.getElementById('CPF');
    const emailInput = document.getElementById('email');
    const celularInput = document.getElementById('celular');
    const btnContinuar = document.getElementById('btnContinuar2');

    function validarCampos2() {
        const nome = nomeInput.value;
        const nomeValido = /^[A-Za-z\s]+$/.test(nome.trim());
        nomeInput.classList.toggle('input-invalido', !nomeValido);
        nomeInput.classList.toggle('input-valido', nomeValido);

        const cpf = cpfInput.value.replace(/[.\-]/g, ''); // Remove pontos e hífens
        const cpfValido = cpf.length === 11 && /^\d{11}$/.test(cpf);
        cpfInput.classList.toggle('input-invalido', !cpfValido);
        cpfInput.classList.toggle('input-valido', cpfValido);

        const email = emailInput.value;
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
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
            const nomeInput = document.getElementById('nome');
            const cpfInput = document.getElementById('CPF');
            const emailInput = document.getElementById('email');
            const celularInput = document.getElementById('celular');
            const nomeValido = /^[A-Za-z\s]+$/.test(nomeInput.value.trim());
            const cpf = cpfInput.value.replace(/[.\-]/g, '');
            const cpfValido = cpf.length === 11 && /^\d{11}$/.test(cpf);
            const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
            const celular = celularInput.value.replace(/[\(\)\-]/g, '');
            const celularEsterilizado = celular.replaceAll(" ", "");
            const celularValido = celularEsterilizado.length === 11 && /^\d{11}$/.test(celularEsterilizado);

            let errosModal = "";
            if (nomeInput.value == '') {
                errosModal += "Por favor, insira o seu nome.<br/>";
            } else if (!nomeValido) {
                errosModal += "O nome inserido não é válido!<br/>";
            }
            if (cpfInput.value == '') {
                errosModal += "Por favor, insira o seu CPF.<br/>";
            } else if (!cpfValido) {
                errosModal += "O CPF inserido não é válido!<br/>";
            }
            if (emailInput.value == '') {
                errosModal += "Por favor, insira o seu email para contato.<br/>";
            } else if (!emailValido) {
                errosModal += "O email inserido não é válido!<br/>";
            }
            if (celularInput.value == '') {
                errosModal += "Por favor, insira o seu número de celular para contato.";
            } else if (!celularValido) {
                errosModal += "O número de celular inserido não é válido!";
            }
            pCadastro.innerHTML = errosModal;
            dialogoCadastro.showModal();
        }
    });
});

function passo3() {
    passo.innerHTML = `Passo 3/3`;
    btnContinuar2.style.display = 'none';
    divRepresentante.style.display = 'none';
    btnVoltarContinuar2.style.display = 'none';
    btnCriar.style.display = 'block';
    divSenha.style.display = 'block';
    btnVoltarCriar.style.display = 'block';
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

        const checkbox = document.querySelector('.custom-checkbox');
        const checkboxValue = document.querySelector('.custom-checkbox').checked;
        const dialogo = document.getElementById('dialogo');

        if (!checkboxValue) {
            checkbox.classList.add('notChecked');
        } else {
            checkbox.classList.remove('notChecked');
        }
        if (senhaValida && senhaConfirmacaoValida && checkboxValue) {
            dialogo.showModal();
        } else {
            let errosModal = "";
            if (!senhaValida) {
                errosModal += "Sua senha não passa nos requisitos, por favor, verifique os critérios.<br/>";
            } else {
                if (!senhaConfirmacaoValida) {
                    errosModal += "As senhas não coincidem.<br/>";
                }
            }
            if (!checkboxValue) {
                errosModal += `Você deve aceitar os termos e condições.`;
            }
            pCadastro.innerHTML = errosModal;
            dialogoCadastro.showModal();
            cadastrar();
        }
    });
});

function login() {
    window.location.href = "login.html"
}

function erro() {
    dialogoCadastro.close();
}


// Preenchimento dos campos (mascara)


function validarInputcnpj(input) {
    input.value = input.value.replace(/[^0-9]/g, '');

    let valorInput = input.value;

    if (valorInput.length > 2) {
        valorInput = valorInput.replace(/^(\d{2})(\d)/, '$1.$2');
    }
    if (valorInput.length > 6) {
        valorInput = valorInput.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if (valorInput.length > 10) {
        valorInput = valorInput.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
    }
    if (valorInput.length > 15) {
        valorInput = valorInput.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
    }
    input.value = valorInput
    console.log(input.value.length);
    if (valorInput.length > 18) {
        input.value = input.value.substring(0, 18);
    }
}

function validarInputNomeRepresentante(input) {
    input.value = input.value.replace(/[^a-zA-ZÀ-ÿ/s]/g, '');
}

function validarInputEstado(input) {
    input.value = input.value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, '');
}

function validarInputcep(input) {
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

function validarInputcpf(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
    let valorInput = input.value;

    if (valorInput.length > 3) {
        valorInput = valorInput.replace(/^(\d{3})(\d)/, '$1.$2');
    }
    if (valorInput.length > 7) {
        valorInput = valorInput.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if (valorInput.length > 10) {
        valorInput = valorInput.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    }

    input.value = valorInput;
    if (valorInput.length > 14) {
        input.value = input.value.substring(0, 14);
    }
}

function validarInputCelular(input) {
    const numeros = input.value.replace(/\D/g, '');
    let valorInput = '';

    if (numeros.length > 0) {
        valorInput = '(' + numeros.substring(0, 2);
    }
    if (numeros.length > 2) {
        valorInput += ') ' + numeros.substring(2, 7);
    }
    if (numeros.length > 7) {
        valorInput += '-' + numeros.substring(7, 11);
    }

    input.value = valorInput;
    if (valorInput.length > 15) {
        input.value = input.value.substring(0, 15);
    }
}

function cadastrar(){
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // crie um atributo que recebe o valor recuperado aqui
          // Agora vá para o arquivo routes/usuario.js 
          cnpjServer: cnpj,
          nomeEmpresaServer: nomeEmpresa,
          estadoServer: estado,
          cepServer: cep,
          
          nomeServer: nome,
          cpfServer: cpf,
          celularServer: celular, 
          
          emailServer: email,
          senhaServer: senha,


     
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
  
          if (resposta.ok) {
  
            setTimeout(() => {
              window.location = "login.html";
            }, "2000");
  
          } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });

}