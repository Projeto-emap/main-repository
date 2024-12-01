function index() {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function () {

    const nomeUsuarioMain = document.querySelector("#usuarioMain");
    const nomeUsuarioEditar = document.querySelector("#usuarioEditar");
    const telefoneUsuarioEditar = document.querySelector("#telefoneEditar");
    const emailUsuarioEditar = document.querySelector("#emailEditar");

    const deletarConta = document.querySelector('#confirm-delete');
    const inputEmail = document.querySelector('.inputEmail');
    const inputNome = document.querySelector('.inputNome');
    const inputTelefone = document.querySelector('.inputTelefone');

    const buttonSalvar = document.getElementById('buttonSalvar');
    const buttonEditar = document.getElementById('buttonEditar');
    const buttonCancelar = document.getElementById('buttonCancelar');
    const buttonExcluir = document.getElementById('buttonExcluir');
    const buttonCancelarExcluir = document.getElementById('buttonCancelarExcluir');
    const buttonConfirmarExcluir = document.getElementById('buttonConfirmarExcluir');

    let idUsuario = sessionStorage.getItem('ID_USUARIO');


    fetch(`/usuarios/carregarInfo/${idUsuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((resposta) => {
            if (resposta.ok) {
                if (resposta.headers.get("content-type")?.includes("application/json")) {
                    return resposta.json();
                } else {
                    return resposta.text().then(text => {
                        throw new Error(text);
                    });
                }
            } else {
                return resposta.json().then(json => {
                    throw new Error(json.message || "Erro ao carregar informações do usuário.");
                });
            }
        })
        .then((json) => {
            console.log("Dados recebidos:", json);

            // Armazena os valores apenas após o retorno
            sessionStorage.setItem('NOME_USUARIO', json.nome);
            localStorage.setItem("TELEFONE_USUARIO", json.numeroCelular);
            localStorage.setItem("EMAIL_USUARIO", json.email);

            // Atualiza os elementos DOM
            nomeUsuarioMain.innerHTML = json.nome;
            nomeUsuarioEditar.value = json.nome;
            telefoneUsuarioEditar.value = formatarTelefone(json.numeroCelular);
            emailUsuarioEditar.value = json.email;
        })
        .catch((erro) => {
            console.error("Erro ao carregar informações do usuário:", erro.message);
        });

    if (nomeUsuarioMain) nomeUsuarioMain.innerHTML = sessionStorage.getItem("NOME_USUARIO");
    if (nomeUsuarioEditar) nomeUsuarioEditar.value = sessionStorage.getItem("NOME_USUARIO");
    if (telefoneUsuarioEditar) telefoneUsuarioEditar.value = localStorage.getItem("TELEFONE_USUARIO");
    if (emailUsuarioEditar) emailUsuarioEditar.value = localStorage.getItem("EMAIL_USUARIO");

    function confirmDelete() {
        document.getElementById('confirm-delete').style.display = 'flex';
        document.querySelector('.cancel-button').style.display = 'block';
        document.querySelector('.confirm-button').style.display = 'block';
        document.querySelector('.delete-account').style.display = 'none';
    }

    function cancelDelete() {
        document.querySelector('.delete-account').style.display = 'block';
        document.getElementById('confirm-delete').style.display = 'none';
        document.querySelector('.cancel-button').style.display = 'none';
        document.querySelector('.confirm-button').style.display = 'none';
    }

    function deletarContaUsuario() {
        deletarConta.showModal();
    }


    function closeModal() {
        deletarConta.close();
    }

    function deletar() {
        const idUsuario = sessionStorage.getItem('ID_USUARIO');
    
        if (!idUsuario) {
            console.error("ID_USUARIO não encontrado no sessionStorage.");
            window.location.href = 'login.html';
            return;
        }
    
        fetch(`/usuarios/deletar/${idUsuario}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuarioServer: idUsuario,
            })
        })
        .then(function (resposta) {
            console.log("ESTOU NO THEN da função de deletar login");
    
            // Chama resposta.json() uma única vez
            return resposta.json().then(json => {
                if (resposta.ok) {
                    // Processamento para resposta de sucesso
                    console.log("Deleção bem-sucedida:", json);
    
                    // Limpeza do armazenamento
                    sessionStorage.removeItem('ID_USUARIO');
                    sessionStorage.removeItem('NOME_USUARIO');
                    localStorage.removeItem('TELEFONE_USUARIO');
                    localStorage.removeItem("EMAIL_USUARIO");
    
                    index(); // Redireciona para 'index.html'
                } else {
                    // Processamento para resposta de erro
                    console.log("Houve um erro ao tentar realizar o deletar login!", json.message);
                }
            });
        })
        .catch(function (erro) {
            // Tratamento de erros de rede ou outros erros inesperados
            console.error("Erro na requisição de deletar:", erro);
        });
    }


    function editarInformacoes() {
        document.querySelector('.buttonEditar').style.display = 'none';
        document.querySelector('.buttonSalvar').style.display = 'block';
        document.querySelector('.buttonCancelar').style.display = 'block';

        toggleInputReadonly();

        inputEmail.style.color = 'black';
        inputNome.style.color = 'black';
        inputTelefone.style.color = 'black';
    }

    async function salvarInformacoes() {
        try {
            // Recupera os valores dos inputs
            const nomeAtualizado = inputNome.value.trim();
            const emailAtualizado = inputEmail.value.trim();
            const telefoneAtualizado = inputTelefone.value.trim();
            const idUsuario = sessionStorage.getItem('ID_USUARIO');

            // Validações
            const erros = [];

            // Validação do nome
            if (nomeAtualizado.length === 0) {
                erros.push("O nome não pode estar vazio.");
            } else if (nomeAtualizado.length > 45) {
                erros.push("O nome não pode exceder 45 caracteres.");
            }

            // Validação do email
            if (emailAtualizado.length === 0) {
                erros.push("O email não pode estar vazio.");
            } else if (emailAtualizado.length > 100) {
                erros.push("O email não pode exceder 100 caracteres.");
            } else if (!validateEmail(emailAtualizado)) {
                erros.push("O email não é válido.");
            }

            // Validação do telefone
            if (!validatePhone(telefoneAtualizado)) {
                erros.push("O telefone não é válido. Deve seguir o formato (XX) XXXXX-XXXX.");
            }

            if (erros.length > 0) {
                alert(erros.join("\n"));
                return;
            }

            // Verifica se o ID do usuário está disponível
            if (!idUsuario) {
                console.error("ID_USUARIO não encontrado no sessionStorage.");
                window.location.href = 'login.html'; // Redirecione para a página de login
                return;
            }

            // Prepara os dados a serem enviados
            const dadosAtualizacao = {
                idUsuarioServer: idUsuario,
                nomeServer: nomeAtualizado,
                emailServer: emailAtualizado,
                telefoneServer: telefoneAtualizado
            };

            // Faz a requisição PUT para atualizar as informações do usuário
            const resposta = await fetch(`/usuarios/atualizar/${idUsuario}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosAtualizacao)
            });

            // Verifica se a resposta do servidor é JSON
            const contentType = resposta.headers.get("content-type");
            let json = null;

            if (contentType && contentType.includes("application/json")) {
                json = await resposta.json();
            } else {
                const texto = await resposta.text();
                throw new Error(`Resposta inesperada do servidor: ${texto}`);
            }

            if (resposta.ok) {
                console.log("Perfil atualizado com sucesso:", json);
                window.location.href = 'perfil.html'; // Atualiza a página de perfil
            } else {
                // O servidor retornou um erro
                console.error("Erro ao atualizar perfil:", json.message);
                alert(`Erro ao atualizar perfil: ${json.message}`);
            }

        } catch (erro) {
            console.error("Erro ao salvar informações:", erro);
            alert("Ocorreu um erro ao salvar as informações. Por favor, tente novamente.");
        }
    }

    function cancelarInformacoes() {
        // Implementar o sessionStorage:
        inputNome.value = sessionStorage.getItem('NOME_USUARIO');
        inputTelefone.value = localStorage.getItem('TELEFONE_USUARIO');
        inputEmail.value = localStorage.getItem('EMAIL_USUARIO')

        document.querySelector('.buttonEditar').style.display = 'block';
        document.querySelector('.buttonSalvar').style.display = 'none';
        document.querySelector('.buttonCancelar').style.display = 'none';

        toggleInputReadonly();

        inputEmail.style.color = 'gray';
        inputNome.style.color = 'gray';
        inputTelefone.style.color = 'gray';
    }

    function toggleInputReadonly() {
        inputEmail.toggleAttribute('readonly');
        inputNome.toggleAttribute('readonly');
        inputTelefone.toggleAttribute('readonly');
    }

    // Função para aplicar máscara de telefone
    function mascaraTelefone(event) {
        let input = event.target;
        let digits = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito

        if (digits.length > 11) { // Limita a 11 dígitos (incluindo DDD)
            digits = digits.substring(0, 11);
        }

        let telefoneFormatado = '';

        // Adiciona o prefixo com parênteses
        if (digits.length > 0) {
            telefoneFormatado += '(' + digits.substring(0, 2);
        }
        if (digits.length > 1) {
            telefoneFormatado += ') ';
        }
    
        // Adiciona o número principal
        if (digits.length > 2) {
            telefoneFormatado += digits.substring(2, Math.min(7, digits.length));
        }
    
        // Adiciona o traço e a parte final do número
        if (digits.length > 7) {
            telefoneFormatado += '-' + digits.substring(7, 11);
        }
    
        // Retorna ao número do parêntese se todos os outros dígitos forem apagados
        if (digits.length <= 2) {
            telefoneFormatado = '(' + digits.substring(0, digits.length);
        }

        if(telefoneFormatado == '(') {
            telefoneFormatado = "";
        }
        input.value = telefoneFormatado;
        telefoneAtualizado = digits;
    }

    // Função para validar email
    function validateEmail(email) {
        // Verifica se contém "@" e pelo menos um "."
        const arroba = email.indexOf('@');
        const ponto = email.lastIndexOf('.');
        return arroba > 0 && ponto > arroba + 1 && ponto < email.length - 1;
    }

    // Função para validar telefone
    function validatePhone(phone) {
        // Expressão regular para formato (XX) XXXXX-XXXX
        const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
        return regex.test(phone);
    }

    // Adiciona o evento de input para aplicar a máscara no telefone
    inputTelefone.addEventListener('input', mascaraTelefone);

    buttonSalvar.addEventListener('click', salvarInformacoes);
    buttonCancelar.addEventListener('click', cancelarInformacoes);
    buttonEditar.addEventListener('click', editarInformacoes);
    buttonExcluir.addEventListener('click', confirmDelete);
    buttonCancelarExcluir.addEventListener('click', cancelDelete);
    buttonConfirmarExcluir.addEventListener('click', deletar);

    function formatarTelefone(numero) {
        // Converte o número para string, caso ainda não seja
        let numStr = numero.toString();
    
        // Remove quaisquer caracteres não numéricos (se houver)
        numStr = numStr.replace(/\D/g, '');
    
        // Verifica se o número possui exatamente 11 dígitos
        if (numStr.length !== 11) {
            console.error("Número de telefone inválido. Deve conter exatamente 11 dígitos.");
            return numero; // Retorna o número original sem formatação
        }
    
        // Aplica a formatação
        const ddd = numStr.slice(0, 2);
        const parte1 = numStr.slice(2, 7);
        const parte2 = numStr.slice(7, 11);
    
        return `(${ddd}) ${parte1}-${parte2}`;
    }

});