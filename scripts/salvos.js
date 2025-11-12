const urlAPI = `http://localhost:8123/`;
const urlCover = "https://covers.openlibrary.org/b/id/";
const idUsuario = localStorage.getItem("idUsuario");
const div_livros = document.querySelector(".container-livros");
const statusPagina = document.body.dataset.status;
let todos_livros = '';

window.addEventListener("pageshow", function (event) {
    if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        location.reload();
    }
});
function getLivros(){

    fetch(`${urlAPI}usuario_livro/todos?id=${idUsuario}&statusLivro=${statusPagina}`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            
            todos_livros = response;
            let i=0;
            response.forEach(objLivro => {
               
                div_livros.insertAdjacentHTML("afterbegin", `

                    <div class="livro_salvo">
                        <img class="book_item_image" data-index="${i}" src="${urlCover}${objLivro.livro.idCapa}-M.jpg">
                    </div>
                    `)
                    i++;
            });
            addEventListeners();
        })
        
        
        
        

}

function addEventListeners(){
    allBookImgs = document.querySelectorAll(".book_item_image");
    allBookImgs.forEach(book => {
        console.log(book);
        book.addEventListener("click", function(){
            let indexLivro = book.getAttribute("data-index");
            localStorage.setItem("livro_escolhido", JSON.stringify({
                "key" : todos_livros[indexLivro].livro.keyLivro,
                "title" : todos_livros[indexLivro].livro.titulo,
                "author_name" : todos_livros[indexLivro].livro.autor,
                "publisher": todos_livros[indexLivro].livro.editora,
                "anoLancamento" : todos_livros[indexLivro].livro.first_publish_year,
                "cover_i" : todos_livros[indexLivro].livro.idCapa
            }));
            window.location.href = 'sobre.html';
        })
    })
}

getLivros();
