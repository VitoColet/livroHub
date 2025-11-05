const CADASTRO = 1;
const LOGIN = 0;
const botao_login = document.getElementById("botao-login");

let opcao_entrada = LOGIN;

botao_login.addEventListener("click",async function() {
    let email = document.getElementById("email-usuario").value;
    let senha = document.getElementById("senha-usuario").value;

    try{
        await fetch(`http://localhost:8123/usuarios/email/${email}`)
            .then(response => response.json())
            .then(response => {
                if (response.senha === senha){
                    console.log("Usuário existe e senha base")
                }
        })
    }

})

