document.addEventListener('DOMContentLoaded', function () {
    const downloadIcon = document.getElementById('download-icon');
    const uploadIcon = document.getElementById('upload-icon');
    const fileInput = document.getElementById('file-input');
    const modalSuccess = document.getElementById('modal-success');
    const modalError = document.getElementById('modal-error');

    // Função para redirecionar para o download da planilha modelo
    downloadIcon.addEventListener('click', function () {
        const link = document.createElement('a');
        link.href = './documents/planilha-modelo-emap.xlsx';
        link.download = 'planilha-modelo.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Exibir a área de upload quando clicar no ícone de upload
    uploadIcon.addEventListener('click', function () {
        console.log('Área de upload aberta.');
        fileInput.click();
    });

    // Ação para o input de arquivo
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            console.log('Arquivo selecionado: ', file.name);
            handleFileUpload(file);
        }
    });

    // Função para tratar o upload do arquivo
    function handleFileUpload(file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const validExtensions = ['xlsx', 'xls', 'csv'];

        // Simular sucesso ou erro no upload
        setTimeout(function () {
            if (validExtensions.includes(fileExtension)) {
                console.log('Upload bem-sucedido.');
                showModal(modalSuccess);
            } else {
                console.log('Erro no upload: Formato de arquivo inválido.');
                showModal(modalError);
            }
        }, 1000); // Simulação de tempo de upload
    }

    // Exibir o modal de sucesso ou erro
    function showModal(modal) {
        modal.style.display = 'block';
        setTimeout(function () {
            modal.style.display = 'none';
        }, 3000); // Modal desaparece após 3 segundos
    }

    // Log para quando o usuário arrasta o arquivo para a área de upload
    document.querySelector('.upload-box').addEventListener('dragover', function (event) {
        event.preventDefault();
        console.log('Arquivo arrastado para a área de upload.');
    });

    // Função para tratar o upload de arquivos arrastados
    document.querySelector('.upload-box').addEventListener('drop', function (event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            console.log('Arquivo arrastado: ', file.name);
            handleFileUpload(file);
        }
    });
});

function fechar() {
    dialogo.close();
    const fileUrl = "../src/database/script-tabelas.sql";

    // Criar um link temporário
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'script-tabelas.sql'; // Nome do arquivo ao ser baixado
    document.body.appendChild(link); // Adiciona o link ao DOM

    // Dispara o clique no link
    link.click();

    // Remove o link do DOM
    document.body.removeChild(link);
}

function index() {
    window.location.href = "index.html";
}

function perfil() {
    window.location.href = 'perfil.html';
}
