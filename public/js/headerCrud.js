const nomeUsuario = document.querySelector('#usuario');
nomeUsuario.innerHTML = sessionStorage.getItem("NOME_USUARIO");