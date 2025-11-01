const botao_pesquisa = document.getElementById("botao-pesquisa");
const opcao_pesquisa = document.getElementById("opcao-pesquisa");
const section_resultados = document.getElementById("resultados");
const campo_pesquisa = document.getElementById("pesquisa-livro");
const url = "https://openlibrary.org/search.json";


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
                    <p>${livro.title}</p>
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
            let book_key = document.getElementById(`key${item_number_atual}`).innerText;
            book_key = book_key.substring(book_key.lastIndexOf("/")+1);
            localStorage.setItem("livro_key", book_key);
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

    await fetch(`${url}${url_tipo_pesquisa}${campo_pesquisa.value}&fields=key,title,author_name,publisher,cover_edition_key,cover_i,first_publish_year`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            section_resultados.innerHTML = "";
            mostrar_livros(response.docs);
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
