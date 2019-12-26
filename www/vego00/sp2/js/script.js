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
