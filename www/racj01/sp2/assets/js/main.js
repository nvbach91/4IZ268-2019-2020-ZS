const App = {};

const favorite = $('#players');
var likedPlayers = JSON.parse(localStorage.getItem('favorites'));

$(document).ready(() => {

    App.init();

    printFavorites(likedPlayers);

    const liked = $('#players');
    setFavorites(liked);



    App.button.click(() => {
        const playerNameValue = App.nameInput.val();
        if (!playerNameValue) {
            return alert('Please enter a player name');
        }
        App.currentPlayer = playerNameValue;
        App.playerList.empty();
        print(playerNameValue);
    });

    App.like.click(() => {
        if(!likedPlayers) {
            favorite.empty();
            likedPlayers[0] = App.currentPlayer;
            localStorage.setItem('favorites', JSON.stringify(likedPlayers));
            printFavorites(likedPlayers);
            setFavorites(liked);
        }
        else if(likedPlayers.includes(App.currentPlayer)) {
            alert('Player is already liked');
        }
        else {
            favorite.empty();
            likedPlayers[likedPlayers.length] = App.currentPlayer;
            localStorage.setItem('favorites', JSON.stringify(likedPlayers));
            printFavorites(likedPlayers);
            setFavorites(liked);
        }
    });

    App.dislike.click(() => {
        if(!likedPlayers) {
            return false;
        }
        else if(!likedPlayers.includes(App.currentPlayer)) {
            alert('Player is not liked');
        }
        else {
            favorite.empty();
            likedPlayers.splice(likedPlayers.indexOf(App.currentPlayer), 1 );
            localStorage.setItem('favorites', JSON.stringify(likedPlayers));
            printFavorites(likedPlayers);
            setFavorites(liked);
        }

    });

});

App.init = () => {
    // initialize app
    // start scripting
    App.nameInput = $('#player-name-input');
    App.button = $('#submit-button');
    App.playerList = $('#users');
    App.MY_KEY = 'RGAPI-ed105680-96a5-4633-a959-6e8030633f8d';
    App.urlID = 'https://cors-anywhere.herokuapp.com/https://eun1.api.riotgames.com/tft/';
    App.urlMatch = 'https://cors-anywhere.herokuapp.com/https://europe.api.riotgames.com/tft/match/v1/matches/';
    App.spinner = $('<div class="spinner"></div>');
    App.like = $('#like-button');
    App.dislike = $('#dislike-button')
    App.currentPlayer = '';
};

var print = function (playerNameValue) {
    $.ajax({
        method: 'GET',
        url: `${App.urlID}summoner/v1/summoners/by-name/${playerNameValue}?api_key=${App.MY_KEY}`,
    }).done((resp) => {
        var playerID = resp.puuid;
        const player = $(
        `<div>
            <div class="top-line">
                <h2>${playerNameValue} (${resp.summonerLevel})</h2>
            </div> 
            <div id="${playerNameValue}">
                <div class="header">
                    <div>Placement</div>
                    <div>Level</div>
                    <div>Poslední kolo</div>
                    <div>Poškození</div>
                    <div>Datum</div>
                </div>
            </div>
        </div>`);
        const gameList = $(`#${playerNameValue}`);
        App.playerList.append(player);
        App.playerList.append(App.spinner);
        $.ajax({
            method: 'GET',
            url: `${App.urlMatch}by-puuid/${playerID}/ids?count=10&api_key=${App.MY_KEY}`,
        }).done((resp) => {
            var games = resp;
            const gameList = $(`#${playerNameValue}`);
            games.forEach(game => {
                $.ajax({
                    method: 'GET',
                    url: `${App.urlMatch}${game}?api_key=${App.MY_KEY}`,
                }).done((resp) => {
                    var gameTime = new Date(resp.info.game_datetime);
                    var players = resp.info.participants;
                    players.forEach(player => {
                        if (player.puuid == playerID) {
                            const match = $(`<div class="row">
                                <div>${player.placement}</div>
                                <div>${player.level}</div>
                                <div>${player.last_round}</div>
                                <div>${player.total_damage_to_players}</div>
                                <div>${gameTime.getDate()}.${gameTime.getMonth() + 1}.${gameTime.getFullYear()}</div>
                            </div>`);
                            gameList.append(match);
                        }
                    });
                }).always(() => {
                    App.spinner.remove();
                })
            });
        });
    });

};


var printFavorites = function (likedPlayers) {

    if(!likedPlayers) {
       return false;
    }

    if(likedPlayers.length == 1) {
        const item = $(`<li id="liked">${likedPlayers[0]}</li>`);
        favorite.append(item);
    }
    else if (likedPlayers != null) {
        likedPlayers.forEach(player => {
            const item = $(`<li id="liked">${player}</li>`);
            favorite.append(item);
        });
    }
};

var setFavorites = function (liked) {
    liked.children().click(function() {
        var name = $(this).html();
         if (!name) {
             return alert('Please enter a player name');
         }
         App.currentPlayer = name;
         App.playerList.empty();
         print(name);
     });
}