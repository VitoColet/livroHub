const botao_pesquisa = document.getElementById("botao-pesquisa");
const opcao_pesquisa = document.getElementById("opcao-pesquisa");
const section_resultados = document.getElementById("resultados");
const campo_pesquisa = document.getElementById("pesquisa-livro");
const url = "https://openlibrary.org/search.json";


botao_pesquisa.addEventListener("click", function(){
    section_resultados.innerHTML = "";
    pesquisar_livros();
});

function mostrar_livros(array_livros){
    let img_number=0;
     array_livros.forEach(livro => {
        let url_imagem = '';    

        console.log(livro.cover_i);
        if (livro.cover_i === undefined)
                url_imagem = "./resources/imagem-gerenica.jpg"
            else
                url_imagem = `https://covers.openlibrary.org/b/olid/${livro.cover_edition_key}-M.jpg`
            
            
            section_resultados.innerHTML += `
            <div class="book-item"> 
                <img src="${url_imagem}" class="book_item_image ${img_number}"/>
                <div class="book_item_info">
                    <p>${livro.title}</p>
                    <p>Por: ${livro.author_name}</p>
                    <p>${livro.first_publish_year}</p>
                </div>
            </div>
            <hr>
            `
            
            img_number;

            });

}

async function pesquisar_livro_titulo(){

    await fetch(`${url}?title=${campo_pesquisa.value}`)
        .then(response => response.json())
        .then(response => {
            mostrar_livros(response.docs);
            console.log(response.docs);
        })
}

async function pesquisar_livro_autor(){

    await fetch(`${url}?author=${campo_pesquisa.value}`)
        .then(response => response.json())
        .then(response => {
            mostrar_livros(response.docs);
        });

}

async function pesquisar_livro_geral(){
    await fetch(`${url}?q=${campo_pesquisa.value}`)
}

function campo_vazio(){
    return campo_pesquisa.value.trim().length === 0;
}

function pesquisar_livros(){
    console.log(campo_vazio());
    if (campo_vazio() === false){
        if (opcao_pesquisa.value === "titulo")
            pesquisar_livro_titulo();                    
        else if (opcao_pesquisa.value === "autor")
            pesquisar_livro_autor();
        else if (opcao_pesquisa.value === "geral"){
            pesquisar_livro_geral();
        }
    }
    else{
        alert("Nada foi inserido no campo de pesquisa.");
    }


}

