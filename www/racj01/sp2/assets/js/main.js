const App = {};

//const favorite = $('#players');
var likedPlayers = JSON.parse(localStorage.getItem('favorites'));

$(document).ready(() => {

    App.init();

    App.printFavorites(likedPlayers);

    //const liked = $('#players');
    setFavorites(App.liked);



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
        if (!likedPlayers) {
            App.liked.empty();
            likedPlayers[0] = App.currentPlayer;
            localStorage.setItem('favorites', JSON.stringify(likedPlayers));
            App.printFavorites(likedPlayers);
            setFavorites(App.liked);
        }
        else if (likedPlayers.includes(App.currentPlayer)) {
            alert('Player is already liked');
        }
        else {
            App.liked.empty();
            likedPlayers[likedPlayers.length] = App.currentPlayer;
            localStorage.setItem('favorites', JSON.stringify(likedPlayers));
            App.printFavorites(likedPlayers);
            setFavorites(App.liked);
        }
    });

    App.dislike.click(() => {
        if (!likedPlayers) {
            return false;
        }
        else if (!likedPlayers.includes(App.currentPlayer)) {
            alert('Player is not liked');
        }
        else {
            App.liked.empty();
            likedPlayers.splice(likedPlayers.indexOf(App.currentPlayer), 1);
            localStorage.setItem('favorites', JSON.stringify(likedPlayers));
            App.printFavorites(likedPlayers);
            setFavorites(App.liked);
        }

    });

});

App.init = () => {
    // initialize app
    // start scripting
    App.nameInput = $('#player-name-input');
    App.button = $('#submit-button');
    App.playerList = $('#users');
    App.MY_KEY = 'RGAPI-6c11206b-9e66-4953-afbd-8e708bffa4ef';
    App.urlID = 'https://cors-anywhere.herokuapp.com/https://eun1.api.riotgames.com/tft/';
    App.urlMatch = 'https://cors-anywhere.herokuapp.com/https://europe.api.riotgames.com/tft/match/v1/matches/';
    App.spinner = $('<div class="spinner"></div>');
    App.like = $('#like-button');
    App.dislike = $('#dislike-button')
    App.currentPlayer = '';
    App.liked = $('#players');
    App.gameResponses = [];
    App.sortedGameResponses = [];
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
            <div class="header">
                    <div>Placement</div>
                    <div>Level</div>
                    <div>Poslední kolo</div>
                    <div>Poškození</div>
                    <div>Datum</div>
            </div>
            <div id="${playerNameValue}">
            </div>
        </div>`);
        App.playerList.append(player);
        App.playerList.append(App.spinner);
        $.ajax({
            method: 'GET',
            url: `${App.urlMatch}by-puuid/${playerID}/ids?count=10&api_key=${App.MY_KEY}`,
        }).done((resp) => {
            const games = resp;
            const promises = [];
            const gameList = $(`#${playerNameValue}`);
            gameList.detach();
            App.gameResponses = [];
            games.forEach((game) => {
                const promise = $.ajax({
                    method: 'GET',
                    url: `${App.urlMatch}${game}?api_key=${App.MY_KEY}`,
                }).done((resp) => {
                    App.gameResponses.push(resp);
                });
                promises.push(promise);
            });

            $.when(...promises).then((res) => {

                //console.log(App.gameResponses);

                App.sortedGameResponses = App.gameResponses;

                for (var j = 0; j < App.gameResponses.length; j++) {
                    for (var i = 0; i < App.gameResponses.length - 1; i++) {
                        if (App.gameResponses[i].info.game_datetime > App.gameResponses[i + 1].info.game_datetime) {
                            App.sortedGameResponses[i] = App.gameResponses[i];
                        }
                        if (App.sortedGameResponses[i].info.game_datetime < App.gameResponses[i + 1].info.game_datetime) {
                            App.sortedGameResponses[i] = App.gameResponses[i + 1];
                        }
                    }
                }

                //console.log(App.sortedGameResponses);

                App.gameResponses.forEach(gameResponse => {
                    const players = gameResponse.info.participants;
                    const gameTime = new Date(gameResponse.info.game_datetime);

                    players.forEach(player => {
                        if (player.puuid === playerID) {
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
                });

                App.spinner.remove();
                gameList.appendTo(App.playerList.children())

            })

        });
    });

};


App.printFavorites = function (likedPlayers) {

    if (!likedPlayers) {
        return false;
    }

    if (likedPlayers.length === 1) {
        const item = $(`<li id="liked">${likedPlayers[0]}</li>`);
        App.liked.append(item);
    }
    else if (likedPlayers != null) {
        likedPlayers.forEach(player => {
            const item = $(`<li id="liked">${player}</li>`);
            App.liked.append(item);
        });
    }
};

var setFavorites = function (liked) {
    liked.children().click(function () {
        var name = $(this).html();
        if (!name) {
            return alert('Please enter a player name');
        }
        App.currentPlayer = name;
        App.playerList.empty();
        print(name);
    });
}

