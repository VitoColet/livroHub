
const url = "https://openlibrary.org/books/";
const urlCover = "https://covers.openlibrary.org/b/id/";
const container = document.querySelector("div.container-sobre");

// https://covers.openlibrary.org/b/id/12547191-L.jpg
// response.authors[0].author.key

async function teste() {
    let livro = localStorage.getItem("livro_escolhido");
    livro = JSON.parse(livro);
    console.log(livro)
    container.insertAdjacentHTML("afterbegin", `
        <div class="container-infos">
            
            
            <div class="container-img-livro">
                <img src="${urlCover}${livro.cover_i}-L.jpg">
                <button class="add-button">Adicionar em Lidos</button>
                <button class="add-button">Adicionar em Para Ler</button>
            </div>
            
            <div class="info-texto">
                <h1>${livro.title}</h1>
                <h2>De:${livro.author_name}</h2>
            </div>
        <div>
    `)
}

teste();