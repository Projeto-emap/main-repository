function index(){
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function () {
    const inputEmail = document.querySelector('.inputEmail');
    const inputNome = document.querySelector('.inputNome');
    const inputTelefone = document.querySelector('.inputTelefone');

    const buttonSalvar = document.getElementById('buttonSalvar');
    const buttonEditar = document.getElementById('buttonEditar');
    const buttonCancelar = document.getElementById('buttonCancelar');
    const buttonExcluir = document.getElementById('buttonExcluir');
    const buttonCancelarExcluir = document.getElementById('buttonCancelarExcluir');
    const buttonConfirmarExcluir =  document.getElementById('buttonConfirmarExcluir');

    function confirmDelete() {
        document.getElementById('confirm-delete').style.display = 'flex';
        document.querySelector('.cancel-button').style.display = 'block';
        document.querySelector('.confirm-button').style.display = 'block';
        document.querySelector('.delete-account').style.display = 'none';

        modal.showModal();
    }

    function cancelDelete() {
        document.querySelector('.delete-account').style.display = 'block';
        document.getElementById('confirm-delete').style.display = 'none';
        document.querySelector('.cancel-button').style.display = 'none';
        document.querySelector('.confirm-button').style.display = 'none';

        modal.close();
    }

    function deletar() {
        // Aqui adicionar o DELETE no backend
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

    function salvarInformacoes() {

        //Aqui tem que criar um UPDATE no back-end nas informações Nome, Email e Telefone do representante


        document.querySelector('.buttonEditar').style.display = 'block';
        document.querySelector('.buttonSalvar').style.display = 'none';
        document.querySelector('.buttonCancelar').style.display = 'none';

        toggleInputReadonly();

        inputEmail.style.color = 'gray';
        inputNome.style.color = 'gray';
        inputTelefone.style.color = 'gray';
    }

    function cancelarInformacoes() {
        // Criar aqui função backend para NÃO alterar os dados no banco de dados, apenas pegar novamente e atribur nas variáveis:
        //inputEmail.value = ;
        //inputNome.value = ;
        //inputTelefone.value = ;

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

    buttonSalvar.addEventListener('click', salvarInformacoes);
    buttonCancelar.addEventListener('click', cancelarInformacoes);
    buttonEditar.addEventListener('click', editarInformacoes);
    buttonExcluir.addEventListener('click', confirmDelete);
    buttonCancelarExcluir.addEventListener('click', cancelDelete);
    buttonConfirmarExcluir.addEventListener('click', deletar);

});

