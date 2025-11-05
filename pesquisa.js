const botao_pesquisa = document.getElementById("botao-pesquisa");
const opcao_pesquisa = document.getElementById("opcao-pesquisa");
const section_resultados = document.getElementById("resultados");
const campo_pesquisa = document.getElementById("pesquisa-livro");
const url = "https://openlibrary.org/search.json";
let todos_livros = [];

botao_pesquisa.addEventListener("click", function(){
    pesquisar_livros();
});

function mostrar_livros(array_livros){
    let item_number=0;
     array_livros.forEach(livro => {
        let url_imagem = '';    

        if (livro.cover_i === undefined)
                url_imagem = "./resources/imagem-gerenica.jpg"
            else
                url_imagem = `https://covers.openlibrary.org/b/olid/${livro.cover_edition_key}-M.jpg`
            
            
            section_resultados.innerHTML += `
            <div class="book-item"> 
                <p id="key${item_number}" hidden>${livro.key}</p>
                <img src="${url_imagem}" class="book_item_image" data-index="${item_number}"/>
                <div class="book_item_info">
                    <p>${livro.title}</h2>
                    <p>Por: ${livro.author_name}</p>
                    <p>${livro.first_publish_year}</p>
                </div>
            </div>
            <hr>
            `

            item_number++;
            
        });
        
}

function adicionar_event_listeners(){

    capas = document.querySelectorAll(".book_item_image");

    capas.forEach(capa => {
        capa.addEventListener("click", function(){
            let item_number_atual = capa.getAttribute("data-index");
            console.log(todos_livros.docs)
            localStorage.setItem("livro_escolhido", JSON.stringify(todos_livros.docs[item_number_atual]));
            window.location.href = "sobre.html";
        })
    })

}

async function pesquisar_livro(){
    
    let url_tipo_pesquisa = ''; 

    if (opcao_pesquisa.value === "titulo"){
        url_tipo_pesquisa = "?title=";
    }
    else if (opcao_pesquisa.value === "autor"){
        url_tipo_pesquisa = "?author=";
    }
    else if (opcao_pesquisa.value === "geral"){
        url_tipo_pesquisa = "?q=";
    }

    await fetch(`${url}${url_tipo_pesquisa}${campo_pesquisa.value}&fields=key,title,author_name,publisher,cover_edition_key,cover_i,first_publish_year,number_of_pages_median`)
        .then(response => response.json())
        .then(response => {
            todos_livros = response;
            section_resultados.innerHTML = "";
            console.log(todos_livros.docs);
            mostrar_livros(todos_livros.docs);
            adicionar_event_listeners();
        });
}

function campo_vazio(){
    return campo_pesquisa.value.trim().length === 0;
}

function pesquisar_livros(){
    if (campo_vazio() === false){
       pesquisar_livro();
    }
    else{
        alert("Nada foi inserido no campo de pesquisa.");
    }

}

/* async function adicionar_para_ler(keyLivro){
    let livroEscolhido;

    await fetch(`https://openlibrary.org${keyLivro}.json`)
        .then(response => response.json())
        .then(response => livroEscolhido = response);

        console.log(livroEscolhido);
        console.log(livroEscolhido.title);

    await fetch(`http://localhost:8123/livros`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({"keyLivro" : "1",
 "titulo" : "Metamorfoses",
 "autor": "Ovidio",
 "editora": "Penguin",
 "anoLancamento": 2023,
  "idCapa" : "MT1",
  "apiOrigem" : "PBL"})
    })
} */