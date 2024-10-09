    document.addEventListener('DOMContentLoaded', function () {
        const downloadIcon = document.getElementById('download-icon');
        const uploadIcon = document.getElementById('upload-icon');
        const fileInput = document.getElementById('file-input');
        const modalSuccess = document.getElementById('modal-success');
        const modalError = document.getElementById('modal-error');

        // Função para download da planilha modelo
        downloadIcon.addEventListener('click', function () {
            console.log('Download iniciado.');
            const link = document.createElement('a');
            link.href = '../documents/planilha-modelo.xlsx'; // Defina o caminho correto do arquivo
            link.download = 'planilha-modelo.xlsx';
            link.click();
            console.log('Download concluído.');
        });

        // Função para redirecionar para o download da planilha modelo
        // downloadIcon.addEventListener('click', function () {
        //     console.log('Redirecionando para o download da planilha.');
        //     window.location.href = '../documents/planilha-modelo.xlsx'; // Caminho correto do arquivo
        // });
        

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