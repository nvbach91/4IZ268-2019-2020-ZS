$(document).ready(() => {
    $('#search').on('submit', (m) => {
        const searchText = $('#movie-input').val();
        getMovies(searchText);
        m.preventDefault();
    });
});

// Načtení seznamu s filmy podle hledaného názvu
function getMovies(searchText) {
    $('#favorite').empty();
    $('#favorite-title').empty();
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=de2a8e617cf9090db24a3afcf55dac94&language=en-US&query=' + searchText)
        .then((resp) => {
            console.log(resp);
            let moviesFound = resp.data.results;
            let moviesNotFound = resp.data.total_results;
            let output = '';
            if (moviesNotFound === 0) {
                output = `
                <div class="movie-not-found">
                    <p>
                        Movie not found. Please enter new movie..
                    </p>
                </div>
                <hr>
                `;
            }
            else {
                $.each(moviesFound, (index, movie) => {
                    let poster = movie.poster_path;

                    if (poster == null) {
                        output += `
                            <div class="movie-box">
                                <div class="movie-box-info">
                                    <img src="./assets/images/poster-unavailable.png" alt="Movie-Poster">
                                    <h4>${movie.title}</h4>
                                    <button onclick="movieSelected('${movie.id}')" class="btn btn-primary">Movie Details</button>
                                    <button onclick="addToFavorite('${movie.id}')" id="button-favorite" class="btn btn-primary">Add to Favorite</button>
                                </div>
                            </div>
                        `;
                    }
                    else {
                        output += `
                            <div class="movie-box">
                                <div class="movie-box-info">
                                    <img src="https://image.tmdb.org/t/p/w500${poster}" alt="Movie-Poster">
                                    <h4>${movie.title}</h4>
                                    <button onclick="movieSelected('${movie.id}')" class="btn btn-primary">Movie Details</button>
                                    <button onclick="addToFavorite('${movie.id}')" id="button-favorite" class="btn btn-primary">Add to Favorite</button>
                                </div>
                            </div>
                        `;
                    }
                })
            };
            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

//Načtení ID filmu do session storage
function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'index.html';
    return false;
}

//Vymazání ID filmu ze session storage
function movieUnselected(id) {
    sessionStorage.removeItem('movieId', id);
    window.location = 'index.html';
    return false;
}
function movieIdUnselected(id) {
    sessionStorage.removeItem('movieId', id);
    return false;
}

//Načtení detailních informací k příslušnému filmu
function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=de2a8e617cf9090db24a3afcf55dac94&language=en-US')
        .then((resp) => {
            console.log(resp);
            let movie = resp.data;
            let rate = movie.vote_average * 10 + "%";
            let budget = "$ " + movie.budget.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            let revenue = "$ " + movie.revenue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            let year = movie.release_date.slice(0, 4);
            let output = `
                <hr>
                <h1>Movie Detail</h1>
                <div class="upper-info">
                    <div class="left-info">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="poster" alt="Movie-Poster">
                    </div>
                    <div class="right-info">
                        <div class="detail-title">
                            <h1>
                                ${movie.title} (${year})
                            </h1>
                        </div>
                        <div>
                            <a onclick="addToFavorite('${movie.id}')" href="#">Add to Favorite</a>
                        </div>
                        <br>
                        <div>
                            <strong>Rated</strong>
                            <br>
                            <span>${rate}</span>
                            <br>
                            <strong>Overview</strong>
                            <br>
                            <span>${movie.overview}</span>
                            <br>
                            <strong>Genre</strong>
                            <br>
                            <span id="genres" class="title"></span>
                            <br>
                            <div class="info-row">
                                <strong>Budget</strong>
                                <br>
                                <span>${budget}</span>
                                <br>
                                <strong>Revenue</strong>
                                <br>
                                <span>${revenue}</span>
                                <br>
                                <strong>Runtime</strong>
                                <br>
                                <span>${movie.runtime} min</span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div>
                    <div>
                        <h2>Cast</h2>
                        </div>
                        <div id="fullCast"></div>
                        <div id="cast" class="cast">
                    </div>
                </div>
                <hr>
                <a href="index.html" onclick="movieIdUnselected('${movie.id}')" class="btn btn-default">Go back to search</a>    
                </div>
                `;

            $('#movie').html(output);
            $('#hide').addClass('hide');
        })
        .catch((err) => {
            console.log(err);
        });

    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=de2a8e617cf9090db24a3afcf55dac94&language=en-US')
        .then((resp) => {
            console.log(resp);
            let genre = resp.data.genres;
            let output = '';

            $.each(genre, (index, movie) => {
                output += `${movie.name}, `;
            });

            $('#genres').html(output);
        })
        .catch((err) => {
            console.log(err);
        });

    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=de2a8e617cf9090db24a3afcf55dac94')
        .then((resp) => {
            console.log(resp);
            let cast = resp.data.cast.slice(0, 5);
            let output = '';

            $.each(cast, (index, movie) => {
                profile = movie.profile_path;

                if (profile == null) {
                    output += `
                        <div class="profile-box">
                            <div class="profile-box-info">
                                <img src="./assets/images/profile-unavailable.png" alt="Profile-Photo">
                                <p><strong>${movie.name}</strong></p>
                                <p>${movie.character}</p>
                            </div>
                        </div>
                    `;
                }
                else {
                    output += `
                        <div class="profile-box">
                            <div class="profile-box-info">
                                <img src="https://image.tmdb.org/t/p/w500${movie.profile_path}" class="profile-photo"  alt="Profile-Photo">
                                <p><strong>${movie.name}</strong></p>
                                <p>${movie.character}</p>
                            </div>
                        </div>
                    `;
                }
            });
            output2 = `<a href="#" onclick="showCast()">Show full cast</a>`;

            $('#cast').html(output);
            $('#fullCast').html(output2);
        })
        .catch((err) => {
            console.log(err);
        });
}

//Funkce pro výpis všech herců
function showCast() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=de2a8e617cf9090db24a3afcf55dac94')
        .then((resp) => {
            console.log(resp);
            let cast = resp.data.cast;
            let output = '';

            $.each(cast, (index, movie) => {
                profile = movie.profile_path;

                if (profile == null) {
                    output += `
                        <div class="profile-box">
                            <div class="profile-box-info">
                                <img src="./assets/images/profile-unavailable.png" class="profile-photo" alt="Profile-Photo">
                                <p><strong>${movie.name}</strong></p>
                                <p>${movie.character}</p>
                            </div>
                        </div>
                    `;
                }
                else {
                    output += `
                        <div class="profile-box">
                            <div class="profile-box-info">
                                <img src="https://image.tmdb.org/t/p/w500${movie.profile_path}" class="profile-photo" alt="Profile-Photo">
                                <p><strong>${movie.name}</strong></p>
                                <p>${movie.character}</p>
                            </div>
                        </div>
                    `;
                }
            });
            let output2 = `<a href="#" onclick="hideCast()">Hide full cast</a>`;

            $('#cast').html(output);
            $('#fullCast').html(output2);
        })
        .catch((err) => {
            console.log(err);
        });
}

//Funkce, která schová herce a jich zobrazeno pouze 5
function hideCast() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=de2a8e617cf9090db24a3afcf55dac94')
        .then((resp) => {
            console.log(resp);
            let cast = resp.data.cast.slice(0, 5);
            let output = '';

            $.each(cast, (index, movie) => {
                profile = movie.profile_path;

                if (profile == null) {
                    output += `
                        <div class="profile-box">
                            <div class="profile-box-info">
                                <img src="./assets/images/profile-unavailable.png" alt="Profile-Photo">
                                <p><strong>${movie.name}</strong></p>
                                <p>${movie.character}</p>
                            </div>
                        </div>
                    `;
                }
                else {
                    output += `
                        <div class="profile-box">
                            <div class="profile-box-info">
                                <img src="https://image.tmdb.org/t/p/w500${movie.profile_path}" class="profile-photo" alt="Profile-Photo">
                                <p><strong>${movie.name}</strong></p>
                                <p>${movie.character}</p>
                            </div>
                        </div>
                    `;
                }
            });
            let output2 = `<a href="#" onclick="showCast()">Show full cast</a>`;

            $('#cast').html(output);
            $('#fullCast').html(output2);
        })
        .catch((err) => {
            console.log(err);
        });
}

//Funkce, která načte ID filmu do local storage
function addToFavorite(id) {
    let movieArray = localStorage.getItem('movie') ? JSON.parse(localStorage.getItem('movie')) : []

    movieArray.push(id)
    localStorage.setItem('movie', JSON.stringify(movieArray))
    alert("Movie was add to favorite!");
}

//Funkce, která načte seznam oblíbených filmů
function getFavorite() {
    let favoriteMovie = localStorage.getItem('movie') ? JSON.parse(localStorage.getItem('movie')) : [];
    console.log(favoriteMovie);
    $('#movies').empty();
    $('#favorite').empty();

    $.each(favoriteMovie, (index, movie) => {
        console.log(movie);
        axios.get('https://api.themoviedb.org/3/movie/' + movie + '?api_key=de2a8e617cf9090db24a3afcf55dac94&language=en-US')
            .then((resp) => {
                console.log(resp);
                let favMov = resp;

                let output = '';
                let output2 = `<h1>Favorite Movies</h1>`;

                output += `
                <div class="favorite-box" id="movie-${favMov.data.id}">
                    <div class="favorite-box-info" >
                        <img src="https://image.tmdb.org/t/p/w500${favMov.data.poster_path}" class="favorite-photo">
                        <h2>${favMov.data.title}</h2>
                        <br>
                        <span>${favMov.data.overview}</span>
                        <br>
                        <br>
                        <button onclick="remove(${favMov.data.id})" class="button-remove">Remove from Favorite</button>
                    </div>
                </div>
                `;

                $('#favorite').append(output);
                $('#favorite-title').html(output2);
            })
    });

}

function remove(id) {
    sessionStorage.setItem('favoriteMovie', id);

    let movieArray = localStorage.getItem('movie') ? JSON.parse(localStorage.getItem('movie')) : []
    let movieID = sessionStorage.getItem('favoriteMovie');

            let movieIDIndex = movieArray.indexOf(movieID);

            movieArray.splice(movieIDIndex, 1)
            localStorage.setItem('movie', JSON.stringify(movieArray));
            //getFavorite();
            
            $('#movie-'+ movieID).remove()        
}