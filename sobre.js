
const url = "https://openlibrary.org/books/";
const urlCover = "https://covers.openlibrary.org/b/id/";
const container = document.querySelector("div.container");

// https://covers.openlibrary.org/b/id/12547191-L.jpg
// response.authors[0].author.key

async function teste() {
    let livro = localStorage.getItem("livro_escolhido");
    livro = JSON.parse(livro);
    console.log(livro)
    container.insertAdjacentHTML("afterbegin", `
        <h1>${livro.title}</h1>
        <img src="${urlCover}${livro.cover_i}-L.jpg">
    
    `)
}

teste();