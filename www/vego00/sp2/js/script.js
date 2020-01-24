$(document).ready(() => {

    $('#search-form').submit(e => {
        console.log($('#search-input').val());
        e.preventDefault();
        let searchMovies = $('#search-input').val();
        if (searchMovies) {

            getMovies(searchMovies);

        } else {
            alert("Please provide movie name!")
        }
    });

    $('.button-fav').click(e => {
        getFavorite();
    })
});
var filmList = $('#films-list');

function getMovies(searchMovies) {
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=665dae7eee807e1d7dc79616fafc643a&query=' + searchMovies)
        .then((response) => {
            console.log(response);
            let movies = response.data.results;
            let output = '';
            $.each(movies, (index, movie) =>
                output += `
        <div class="col-md-3">
            <div class="well text-center">
                
                <img src="${ movie.backdrop_path ? 'https://image.tmdb.org/t/p/w300' + movie.backdrop_path : 'https://via.placeholder.com/300'}" alt="Movie Foto">
                <h5>${movie.original_title}</h5>
                <button data-movie-id="${movie.id}" id="selectedId"  class="button"> View Detals </button>

            </div>
        </div>`
            );
            filmList.html(output);
            filmList.find('button').click(function () {
                var movieID = $(this).data('movie-id');
                movieSelected(movieID);
            });

        });
};


function movieSelected(id) {

    sessionStorage.setItem('movieId', id);
    window.location = 'index.html';

    return false;
}
var filmInformation = $('#film-information');
function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=665dae7eee807e1d7dc79616fafc643a')
        .then((response) => {
            console.log(response);
            let movie = response.data;
            let output = `
                    <div class="row well-2" >
            <div class="col-lg-4 text-center">
                <img src="${'https://image.tmdb.org/t/p/w300' + movie.poster_path}" class="thumbnail" alt="Movie Foto"/>
            </div>
            <div class="col-lg-8">
                <h3>${movie.original_title}</h3>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre :</strong>${movie.genres.map((genre) => { return genre.name })}</span></li>
                    <li class="list-group-item"><strong>Country  :</strong> ${movie.production_countries.map((production_countrie) => { return production_countrie.name })}</li>
                    <li class="list-group-item"><strong>Released :</strong> ${movie.release_date}</li>
                    <li class="list-group-item"><strong>Rated :</strong> ${movie.vote_average * 10 + "%"}</li>
                    <li class="list-group-item"><strong>Budget :</strong> ${movie.budget + '$'}</li>
                </ul>
            </div>
            </div>
          <div class="row-1">
            <div class="well-1">
               <h3>Plot </h3> 
               ${movie.overview}
               <hr>
               <button id="back" class="btn-back">Back</button>
               <button id="addToFavorite" class="btn-favorite">Add to Favorite</button>
            </div>
          </div>`;


            filmInformation.html(output);
            $('#hide').addClass('hide');
            $("#back").click(() => {
                filmInformation.addClass('hide');
                $('#hide').addClass('visible');
                getMovies(searchMovies);
            });
            $('#addToFavorite').click(() => {
                let movieArray = localStorage.getItem('movie') ? JSON.parse(localStorage.getItem('movie')) : []

                movieArray.push(movieId)
                localStorage.setItem('movie', JSON.stringify(movieArray))
                console.log("Movie was add to favorite!");
            });
        })
        .catch((err) => {
            console.log(err);
        })
}
var favoriteList = $('#favorite-list');
var favoriteTitle = $('#favorite-title');

function getFavorite() {
    let favoriteMovie = localStorage.getItem('movie') ? JSON.parse(localStorage.getItem('movie')) : [];
    console.log(favoriteMovie);
    $.each(favoriteMovie, (index, movie) => {
        console.log(movie);
        axios.get('https://api.themoviedb.org/3/movie/' + movie + '?api_key=de2a8e617cf9090db24a3afcf55dac94&language=en-US')
            .then((response) => {
                console.log(response);
                let favMov = response;

                let output = `<h1>Favorite Movies</h1>`;
                let output2 = '';

                output2 += `
                <div class="favorite-box" id="movie-${favMov.data.id}">
                    <div class="favorite-box-info" >
                        <img src="https://image.tmdb.org/t/p/w300${favMov.data.poster_path}" class="favorite-photo" alt="Movie Foto">
                        <h2>${favMov.data.title}</h2>
                        <br>
                        <span>${favMov.data.overview}</span>
                        <br>
                        <br>
                        <button data-movie-id ="${favMov.data.id}" class="button-remove">Remove from Favorite</button>
                        <button class="button-back"> Back to search </button>
                    </div>
                </div>
                `;
                favoriteTitle.html(output);
                favoriteList.append(output2);
                favoriteList.find('.button-remove').click(function () {
                    var movID = $(this).data('movie-id');
                    remove(movID);
                });
                $('#hide').addClass('hide');
                $(".button-back").click(() => {
                    favoriteList.addClass('hide');
                    favoriteTitle.addClass('hide');
                    /*$('#hide').addClass('visible');*/
                });
            });
    });
}
function remove(id) {
    sessionStorage.setItem('favoriteMovie', id);

    let movieArray = localStorage.getItem('movie') ? JSON.parse(localStorage.getItem('movie')) : []
    let movieID = sessionStorage.getItem('favoriteMovie');

    let movieIDIndex = movieArray.indexOf(movieID);

    movieArray.splice(movieIDIndex, 1)
    localStorage.setItem('movie', JSON.stringify(movieArray));

    $('#movie-' + movieID).remove()
}
