$(document).ready(() => {
    $('#search').on('submit', (m) => {
        const searchText = $('#movie-input').val();
        getMovies(searchText);
        m.preventDefault();
    });
});

function getMovies(searchText){
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=de2a8e617cf9090db24a3afcf55dac94&query='+searchText)
        .then((resp) => {
            console.log(resp);
            let movies = resp.data.results;
            let output = '';
            
            $.each(movies, (index, movie) => {
            output += `
                <div class="movie-box">
                    <div class="movie-box-info">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                        <h4>${movie.title}</h4>
                    </div>
                </div>
            `;
            });

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}
