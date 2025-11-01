
const url = "https://openlibrary.org/books/"

// https://covers.openlibrary.org/b/id/12547191-L.jpg
// response.authors[0].author.key

async function teste() {
    let book_key = localStorage.getItem("livro_key");
    
    await fetch(`https://openlibrary.org/works/${book_key}.json`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            document.body.innerHTML = `
            <h1>${response.title}</h1>
            <img src="https://covers.openlibrary.org/b/id/${response.covers}-L.jpg">
            `
        });
}

teste();