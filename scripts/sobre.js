let livro = localStorage.getItem("livro_escolhido");
livro = JSON.parse(livro);
const url = "https://openlibrary.org/books/";
const urlCover = "https://covers.openlibrary.org/b/id/";
const urlAPI = "http://localhost:8123/";
const idUsuario = localStorage.getItem("idUsuario");
const container = document.querySelector("div.container-sobre");
const containerImgLivros = document.querySelector(".container-img-livro");
const containerInfoTexto = document.querySelector(".info-texto");
const botaoReview = document.getElementById("botao-review");
const campo_texto = document.getElementById("review-texto");
const campo_titulo = document.getElementById("titulo-review");
const notaLivro = document.getElementById("nota-review");
const dadosJson = JSON.stringify({
                    keyLivro: livro.key,
                    titulo: livro.title,
                    autor: livro.author_name[0],
                    editora: livro.publisher[0],
                    anoLancamento: livro.first_publish_year,
                    idCapa: livro.cover_i,
                    apiOrigem: "PL"
                });

// https://covers.openlibrary.org/b/id/12547191-L.jpg
// response.authors[0].author.key

console.log(idUsuario);

window.addEventListener("pageshow", function (event) {
    if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        location.reload();
    }
});



botaoReview.addEventListener("click", function(){

    if (!verificar_review_vazia()){

        const botaoLidos = document.querySelector(".botao-status");
        
        if (botaoLidos.classList.contains("ativo") == false){
            botaoLidos.click();
        }
        
        fetch(`http://localhost:8123/avaliacoes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "usuarioId": idUsuario,
                "keyLivro" : livro.key,
                "tituloAvaliacao" : campo_titulo.value,
                "textoAvaliacao" : campo_texto.value,
                "notaLivro" : notaLivro.value
            })
        });
    }
    else{
        alert("Preencha todos os campos da Avaliação.");
    }
    })
    
function verificar_review_vazia(){
    

    return (campo_texto.value.trim() === '' || campo_titulo.value.trim() === '' || notaLivro.value === '');
   
}

function verificar_existe_review(){

    fetch(`http://localhost:8123/avaliacoes?id_usuario=${idUsuario}&keyLivro=${livro.key}`)
        .then(response => response.json())
        .then(response => {
            campo_titulo.value = response.tituloAvaliacao;
            campo_texto.value = response.textoAvaliacao;
            notaLivro.value = response.notaLivro;
        })

}

async function verificar_livro_adicionado(){
    let statusBotaoLidos = false;
    let statusBotaoParaLer = false;
    let botoesAdd = document.querySelectorAll(".botao-status");


    await fetch(`${urlAPI}usuario_livro/status?keyLivro=${livro.key}&id_usuario=${idUsuario}&status=LIDO`)
        .then(response => response.json())
        .then(response => {
            console.log(response.existe);

            statusBotaoLidos = response.existe;

            if (statusBotaoLidos == true){
                ativarBotao(botoesAdd[0], 'LIDO');
            }

    })

    await fetch(`${urlAPI}usuario_livro/status?keyLivro=${livro.key}&id_usuario=${idUsuario}&status=PARA_LER`)
        .then(response => response.json())
        .then(response => {
            console.log(response.existe);

            statusBotaoParaLer = response.existe;

            if (statusBotaoParaLer == true){
                ativarBotao(botoesAdd[1], 'PARA_LER');
            }
        })
    ;

}

function carregar_infos() {
    
    console.log(livro)

    containerImgLivros.insertAdjacentHTML("afterbegin", `
        <img src="${urlCover}${livro.cover_i}-L.jpg">
        `)
    containerInfoTexto.insertAdjacentHTML("afterbegin", `
            <div class="card-titulo">
                <h1>${livro.title}</h1>
                <div class="autor-editora">
                    <h2>De:${livro.author_name}</h2>
                    <h2>Editora:${livro.publisher}</h2>
                </div>
                
            </div>
            <hr>

        `)

}

document.querySelectorAll(".botao-status").forEach(botao => {
    botao.addEventListener("click", async function(){
        const estaAtivo = botao.dataset.ativo === 'true';
        const status = botao.dataset.status;

        if (estaAtivo){
            botao.classList.remove("ativo");
            botao.dataset.ativo = 'false';
            botao.textContent = textoAdd(status);

            deleteLivroUsuario(status);
        }
        else{
            ativarBotao(botao,status);


            await fetch(`${urlAPI}livros`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: dadosJson
            })

            postLivroUsuario(status);

        }
    });
});

function ativarBotao(botao, status){
    botao.classList.add("ativo");
    botao.dataset.ativo = 'true';
    botao.textContent = textoRemv(status);
}

function textoAdd(status){
    switch(status){
        case "PARA_LER": return 'Adicionar em Para Ler';
        case "LIDO": return 'Adicionar em Lidos'
    }
}

function textoRemv(status){
    switch(status){
        case "PARA_LER": return "Remover de Para Ler";
        case "LIDO": return "Remover de Lidos"
    }
}

async function postLivroUsuario(status){
    switch(status){
        case "PARA_LER": {
            await  fetch(`${urlAPI}usuario_livro`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    keyLivro:livro.key,
                    id_usuario:idUsuario,
                    status:'PARA_LER'
                })
        })
        console.log(livro.key);
        break;
        }
        case "LIDO": {
            
             fetch(`${urlAPI}usuario_livro`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    keyLivro:livro.key,
                    id_usuario:idUsuario,
                    status:'LIDO'
                })
        })
        console.log(livro.key);
        break;
        }
    }

}

function deleteLivroUsuario(status){
    switch(status){
        case "PARA_LER" : {
            fetch(`${urlAPI}usuario_livro`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    keyLivro:livro.key,
                    status:'PARA_LER',
                    id_usuario:idUsuario
                })
            })
            break;
        }
        
        case "LIDO" : {
            fetch(`${urlAPI}usuario_livro`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    keyLivro:livro.key,
                    status:'LIDO',
                    id_usuario:idUsuario
                })
            })

            fetch(`${urlAPI}avaliacoes?id_usuario=${idUsuario}&keyLivro=${livro.key}`, {
                method: "DELETE"
            })
                .then(response => {
                    if (response.ok){
                        console.log("Avaliacao apagada");
                    }
                })
                
            break;
        }
    }
}

verificar_livro_adicionado();
verificar_existe_review();
carregar_infos();