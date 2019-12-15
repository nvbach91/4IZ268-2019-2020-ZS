var searchForm = $('#searchForm');
var searchText = $('#searchText');
var apiUrl = '';
var apiKey = '';
var books = $('#books');
var book = $('#book');

$(document).ready(function () {
    $(searchForm).on('submit', function (e) {
        let searchTextVal = $(searchText).val();
        getBooks(searchTextVal);
        e.preventDefault();
    });
});

function getBooks(searchTextVal) {
    
            if (booksNotFound === "False") {
                output = `
                <div class="container">
                    <div class="well text-center">
                        Žádná kniha nebo autor nebyl nalezen! Zkúste prosím znovu...
                    </div>
                </div>
                `;
            } else {
                $.each(booksFound, function (index, book) {
                    }
                    

        }
        .catch(function (err) {  //v prípade nejakého error
            console.log(err);
        });
}

function getBook() {

                <div class="row" >
                    <div class="col-md-4">
                        <img src="${bookPoster}" class="thumbnail" alt="Poster knih">
                    </div>
                    <div class="col-md-8">
                        <h2>${bookData.Title}</h2>
                            <ul class="list-group">
                                <li class="list-group-item">Žánr: ${bookData.Genre}</li>
                                <li class="list-group-item">Vydaní: ${bookData.Released}</li>
                                <li class="list-group-item">Autor: ${bookData.Writer}</li>
                                <li class="list-group-item">Název: ${bookData.Title}</li>
                            </ul>
                    </div>
                </div> 
        .catch(function (err) { 
            console.log(err);
        }

}