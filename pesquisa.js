const botao_pesquisa = document.getElementById("botao-pesquisa");
const section_resultados = document.getElementById("resultados");

botao_pesquisa.addEventListener("click", function(){
    section_resultados.innerHTML = "";
    pesquisar_livro();
});

async function pesquisar_livro(){

    let url = "https://openlibrary.org/search.json";
    const campo_pesquisa = document.getElementById("pesquisa-livro");

    await fetch(`${url}?q=${campo_pesquisa.value}`)
        .then(response => response.json())
        .then(response => {
            let array_livros = response.docs;

            console.log(array_livros);

            array_livros.forEach(livro => {
                let i=0;
                
                i++;

                if (i==20)
                    return;

                section_resultados.innerHTML += `
                <div> 
                <p>${livro.title}</p>
                <p>${livro.author_name}</p>
                <p>${livro.first_publish_year}</p>
                <p>${livro.cover_i}</p>
                <img src="https://covers.openlibrary.org/b/olid/${livro.cover_edition_key}-M.jpg"/>
                </div>
                <br>
                `

            });
        });


}

