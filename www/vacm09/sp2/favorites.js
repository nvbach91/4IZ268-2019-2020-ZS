$(document).ready(function () {
    console.log('%cFAVORITES READY', 'color: green');

    let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
    if (!favoriteMovies || favoriteMovies.length === 0) {
        $(".favorites").html('<h3>Nemáte žádné filmy ve svém seznamu</h3>');
    }
    getMovieDetails(favoriteMovies);
});

function getMovieDetails(imdbIDs) {
    imdbIDs.forEach(imdbID => {
        $.ajax({
            method: 'GET',
            url: `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${imdbID}`,
            headers: {
                "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
                "x-rapidapi-key": "7748b8612dmshb9e15461a0f369fp1cded3jsn2e8b7d882a7c"
            },
            success: response => {
                if (!response) {
                    alert('Detail filmu nebyl nalezen');
                    return;
                }
                $(".favorites").append(buildDetailHTML(response));
            },
            error: () => {
                console.log('Chyba při spojení se serverem');
            }
        });
    });
}

function buildDetailHTML(movie) {
    let html = "";
    let actors = movie.cast.map(cast => cast.actor).join(', ');
    html +=
        `<div class='movieDetailItem'>
            <h2>${movie.title} (${movie.year})</h2>
            <img width="150px" src="${movie.poster}" alt="Movie poster image">
            <h3>Délka filmu: ${movie.length}</h3>
            <h3>Hodnotilo lidí: ${movie.rating_votes}</h3>
            <h3>Hodnocení: ${movie.rating}</h3>
            <p>${movie.plot}</p>
            <br>
            <b>Hrají: </b>${actors}
        </div>`;

    return html;
}