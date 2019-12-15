const App = {};
const MY_KEY = 'RGAPI-2650f44c-afca-472c-afea-49cb47ffd017';


$(document).ready(() => {

    App.init();

    App.button.click(() => {
        const playerNameValue = App.nameInput.val();
        if (!playerNameValue) {
            return alert('Please enter a pokemon name');
        }

        App.playerList.detach();

        $.ajax({
            method: 'GET',
            url: `https://cors-anywhere.herokuapp.com/https://eun1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${playerNameValue}?api_key=${MY_KEY}`,
        }).done((resp) => {
            var playerID = resp.puuid;
            const player = $(`<div><h2>${playerNameValue} (${resp.summonerLevel})</h2><ul id="${playerNameValue}"></ul></div>`);
            App.playerList.append(player);
            console.log(playerID);
            $.ajax({
                method: 'GET',
                url: `https://cors-anywhere.herokuapp.com/https://europe.api.riotgames.com/tft/match/v1/matches/by-puuid/${playerID}/ids?count=10&api_key=${MY_KEY}`,
            }).done((resp) => {
                var games = resp;
                console.log(games);
                const gameList = $(`#${playerNameValue}`);
                games.forEach(game => {
                    const match = $(`<li>Game id - ${game}</li>`);
                    gameList.append(match);
                    $.ajax({
                        method: 'GET',
                        url: `https://cors-anywhere.herokuapp.com/https://europe.api.riotgames.com/tft/match/v1/matches/${game}?api_key=${MY_KEY}`,
                    }).done((resp) => {
                        console.log(resp);
                    })
                });
            });
        });

            App.playerList.appendTo('main');

    });



});

App.init = () => {
    // initialize app
    // start scripting
    App.nameInput = $('#player-name-input');
    App.button = $('#submit-button');
    App.playerList = $('#users');

};