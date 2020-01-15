$( document ).ready(()=>{

    $( 'form').submit (e=>{
        e.preventDefault();
        let searchMovies = $('#search-input').val();
        if(searchMovies){
            
            getMovies(searchMovies);
            
        }else{
            alert("Please provide movie name!")
        }
        

    });

});
getMovies(searchMovies){
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=665dae7eee807e1d7dc79616fafc643a&query='+searchMovies)
        .then((response)=>{
        console.log(response);
        let movies = response.data.results;
        functionlet output = '';
        $.each(movies, (index, movie)=>
        output += `
        <div class="col-md-3">
            <div class="well text-center">
                
                <img src="${ movie.backdrop_path ? 'https://image.tmdb.org/t/p/w300'+ movie.backdrop_path : 'https://via.placeholder.com/300'}">
                <h5>${movie.original_title}</h5>
                <button onclick="movieSelected('${movie.id}')" id="selectedId"  class="button"> View Detals </button>

            </div>
        </div>`
        );
        $('#films-list').html(output)
        });
    }

        
        function movieSelected(id){
   
            sessionStorage.setItem('movieId',id);
              window.location='index.html';
              
              return false;
          }

        function getMovie(){
            let movieId = sessionStorage.getItem('movieId');
        
            axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=665dae7eee807e1d7dc79616fafc643aa&language=en-US')
                .then((response) => {
                    console.log(response);
                    let movie = response.data;
                    let output = `
                    <div class="row well" >
            <div class="col-lg-4 text-center">
                <img src="${movie.poster_path}" class="thumbnail" />
            </div>
            <div class="col-lg-8">
                <h3>${movie.original_title}</h3>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre :</strong> ${movie.genres}</li>
                    <li class="list-group-item"><strong>Country  :</strong> ${movie.production_countries}</li>
                    <li class="list-group-item"><strong>Released :</strong> ${movie.release_date}</li>
                    <li class="list-group-item"><strong>Rated :</strong> ${movie.vote_average}</li>
                    <li class="list-group-item"><strong>Budget :</strong> ${movie.budget}</li>
                    <li class="list-group-item"><strong>Director :</strong> ${movie.director}</li>
                    <li class="list-group-item"><strong>Writter :</strong> ${movie.writer}</li>
                </ul>
            </div>
          </div>
          <div class="row">
            <div class="well ">
               <h3>Plot </h3> 
               ${movie.overview}
               <hr>
               <button  class="btn-back">Back</button>
               <button class="btn-favorite">Add to Favorite</button>
            </div>
          </div>`;
          

          $('#film-information').html(output);
          
          
      })
      .catch((err)=>{
        console.log(err);
    }) 
}
