$(function() {
    console.log( "ready!" );

    $( ".js-searchButton" ).click(function() {
        const API_KEY = "b1bcd06d";

        const name = $(".js-name").val();
        const year = $(".js-year").val();
        const type = $(".js-type").val();
        
        if(name === "") {
            alert("Zadej název!");
            return;
        }

        const params = {
            apiKey: API_KEY,
            s: name,   
        };

        console.log(year.length);

        if(year.length > 0) {
            params.year = year;
        }

        if(type.length > 0) {
            params.type = type;
        }
        $.ajax({
            method: "GET",
            url: "http://www.omdbapi.com/",
            data: params
            
        }).done(function(data) {
            console.log(data);
            
            if(data.Response === "False") {
                $(".js-results").append("<div>Žádné výsledky!</div>")
                return;
            }
            
            data.Search.forEach(function(item){
                $(".js-results").append("<div data-id='"+ item.imdbID +"'>" + "<img src='"+ item.Poster + "' alt='"+ item.Title +"'>" + item.Title + item.Year + item.Type + "</div>")

            });

        }).fail(function(jqXHR, textStatus) {
            alert("Chyba při spojení se serverem: " + textStatus);
        });
    });

}); 

