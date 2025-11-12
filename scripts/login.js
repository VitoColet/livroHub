const linkCadastro = document.querySelector("#link-cadastro");
const titulo = document.querySelector("#titulo-form");
const formLogin = document.querySelector("#form-login");
const formCadastro = document.querySelector("#form-cadastro");
const alternar = document.querySelector("#alternar");
let modoCadastro = false;

linkCadastro.addEventListener("click", () => {
    modoCadastro = !modoCadastro;
    if (modoCadastro) {
        formLogin.classList.add("hidden");
        formCadastro.classList.remove("hidden");
        titulo.textContent = "Cadastrar";
        alternar.innerHTML = 'Já tem conta? <span id="link-cadastro">Entrar</span>';
    } else {
        formLogin.classList.remove("hidden");
        formCadastro.classList.add("hidden");
        titulo.textContent = "Entrar";
        alternar.innerHTML = 'Não tem conta? <span id="link-cadastro">Cadastre-se</span>';
    }
    document.querySelector("#link-cadastro").addEventListener("click", () => linkCadastro.click());
});

formLogin.addEventListener("submit", function(){
    event.preventDefault();

    const email = formLogin.querySelector('input[type="email"]').value;
    const senha = formLogin.querySelector('input[type="password"]').value;

    fetch(`http://localhost:8123/usuarios?email=${email}`)
        .then(response => response.json())
        .then(response => {
            if(response.senha === senha){
                localStorage.setItem("idUsuario", response.id);
                window.location.href = "pesquisa.html";
            }
            else{
                alert("email ou senha incorretos.");
            }
        })


})

formCadastro.addEventListener("submit", async function(){
    event.preventDefault();

    const nome = formCadastro.querySelector('input[type="text"]').value;
    const email = formCadastro.querySelector('input[type="email"]').value;
    const senha = formCadastro.querySelector('input[type="password"]').value;
    const dataNascimento = formCadastro.querySelector('input[type="date"]').value;

    const dados = { nome, email, senha, dataNascimento };

    await fetch("http://localhost:8123/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
})