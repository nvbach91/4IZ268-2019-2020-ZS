$(document).ready(function () {
    console.log('%cREADY', 'color: green');

    let favoriteMovies = localStorage.getItem("favoriteMovies");
    if (!favoriteMovies) {
        localStorage.setItem("favoriteMovies", JSON.stringify([]));
    }

    $("#searchButton").click(function (event) {
        event.preventDefault();

        const name = $(".js-name").val();
        const year = $(".js-year").val();
        const type = $(".js-type").val();

        let params = buildApiParams(name, year, type);

        $(".loading-icon").removeClass("hide");
        $("#searchButton").attr("disabled", true);


        $.ajax({
            method: 'GET',
            url: 'http://www.omdbapi.com/',
            data: params,
            success: response => {
                console.log('RESPONSE FROM API', response);
                if (!response.Search) {
                    alert('Nebyly nalezeny žádné výsledky');
                    return;
                }
                $(".js-results").html("")
                $(".js-results").append(buildResultsHTML(response));
            },
            error: () => {
                console.log('Chyba při spojení se serverem');
            }
        })

        setTimeout(function () {
            $(".loading-icon").addClass("hide");
            $("#searchButton").attr("disabled", false);
        }, 3000)

    });


    $(document).on("click", ".favoriteButton", function () {
        var favoriteImdbID = $(this).val();

        if (!isInFavorites(favoriteImdbID)) {
            addToFavoriteMovies(favoriteImdbID);
            document.getElementById(`favorite-${favoriteImdbID}`).innerHTML = 'Odebrat z oblíbených';
            $.notify(
                "Film byl přidán do oblíbených!", 'success'
                );
        } else {
            removeFromFavorites(favoriteImdbID);
            document.getElementById(`favorite-${favoriteImdbID}`).innerHTML = 'Přidat do oblíbených';
            $.notify('Film byl odebrán z oblíbených', 'error');
        }
    });


    $(document).on("click", ".detailButton", (event) => {
        localStorage.setItem("detailMovieID", event.target.id);
    });
    
    $(document).on("click", ".poster", (event) => {
        console.log("EVENT", event.target.id);
        localStorage.setItem("detailMovieID", event.target.id);
        window.location.replace('./detail.html')
    });

});

function addToFavoriteMovies(imdbID) {
    let movieList = JSON.parse(localStorage.getItem("favoriteMovies"));
    movieList.push(imdbID);
    localStorage.setItem("favoriteMovies", JSON.stringify(movieList));
}

function removeFromFavorites(imdbID) {
    let movieList = JSON.parse(localStorage.getItem("favoriteMovies"));
    movieList.splice(movieList.indexOf(imdbID), 1);
    localStorage.setItem("favoriteMovies", JSON.stringify(movieList));
}

function isInFavorites(imdbId) {
    let movieList = JSON.parse(localStorage.getItem("favoriteMovies"));
    return movieList.includes(imdbId);
}

function buildResultsHTML(res) {
    let html = "";
    res.Search.forEach(movie => {
        let buttonText = "";
        if (isInFavorites(movie.imdbID)) {
            buttonText = "Odebrat z oblibených";
        } else {
            buttonText = "Přidat do oblíbených";
        }
        html +=
            `<div id="${movie.imdbID}" class='movieItem'>
                <h2>${movie.Title} (${movie.Year})</h2>        
                <img id="${movie.imdbID}" class="poster" width='300' src="${movie.Poster === "N/A" ? "notfound.png" : movie.Poster}" alt="Movie image"/>
                <button id="favorite-${movie.imdbID}" class="favoriteButton" value="${movie.imdbID}">${buttonText}</button>
                <a id="${movie.imdbID}" class="detailButton" href="detail.html">Více informací</a>
            </div>`;
    });
    return html;
}


function buildApiParams(name, year, type) {
    let params = {
        apiKey: 'b1bcd06d',
        r: 'json'
    };
    if (name) {
        params.s = name;
    }
    if (year) {
        params.y = year;
    }
    if (type) {
        params.type = type;
    }
    return params;
}