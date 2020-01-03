var App = App || {};
App.hashtagLabelValue = "Your hashtag is: #";
App.teamsChosen = 0;
App.currentBtnSelected = "";
App.hashtagValue = "";
App.teamButtonsDisplayed = true;
App.infoBoxDisplayed = false;
App.loaderHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
App.loader = $('#loader');
App.showHideTeamButtons = $('#show-hide-teambuttons');
App.menu = $('#menu');
App.tweets = $('#tweets');
App.infobox = $('#infobox');
App.teamButtons = $('.team-buttons');
App.currentHashtagValue = $('#current-hashtag-value');
App.disabledButton = '';
App.userLoggedIn = false;
App.isUserLogedIn = false;
App.isResultDisplayed = false;

App.placeContent = function (status) {

    var statusSplit = status.full_text.split(' ');

    $('.after-search').append('<div class="tweet">' +
        '<div class="tweet-metadata">' +
        moment(status.created_at).format('MMMM Do YYYY, h:mm:ss a') +
        " By " +
        '<a href="https://twitter.com/' + status.user.screen_name + '"' +
        '>' + status.user.name +
        '</a>' +
        '</div>' +
        '<div class="tweet-text">' +
        statusSplit.map(function (value) {
            if (value.startsWith('http')) {
                // '<a href="' + value + '">' + value + '</a>'
                return `<a href="${value}" target="_blank">${value}</a>`;
            } else if (value.startsWith('#')) {
                return `<a href="https://twitter.com/search?q=%23${value.slice(1)}" target="_blank">${value}</a>`;
            } else {
                return value;
            }
        }).join(' ') +
        '</div>');
};

// TODO feature - include / exclude retweets
// TODO feature idea - get most retweeted stats
// TODO feature - chose number of tweets searched

/**
 * Searches for Tweets based on @hashtagValue.
 * Basic Twitter search API provides only tweets younger than 7 days.
 */
App.search = function () {
    var queryURL = 'https://api.twitter.com/1.1/search/tweets.json?q=%23' + App.hashtagValue + ' -filter:retweets' + '&count=100&tweet_mode=extended&;'
    if (App.isUserLogedIn) {
        if (App.isResultDisplayed) {
            $('#tweets').empty();
        }
        App.loaderOnOff(true);
        console.log('searching for ' + App.hashtagValue);
        App.userLoggedIn.get(queryURL)
            .done(function (result) {
                console.log(result);
                App.loaderOnOff(false);
                if (result.statuses.length === 0) {
                    alert('No tweets were found. Try another hashtag!');
                    App.clear();
                } else {
                    $('#current-hashtag-value').append(' Found: ' + result.statuses.length);
                    App.isResultDisplayed = true;
                    App.hideTeamButtons();
                    $('.after-search').css('visibility', 'visible');
                    result.statuses.forEach(function (status) {
                        App.placeContent(status);
                    });
                }
            })
            .fail(function (err) {
                App.loaderOnOff(false);
                console.log(err);
                alert(err);
            });
    } else {
        alert('You must be logged in!');
    }
};

/**
 * Handles user's login to twitter to get OAuth token for API requests.
 */
App.login = function () {
    App.loaderOnOff(true);
    OAuth.initialize('RqDiAoEGjM7O8Eno938FoMuHTmk');
    OAuth.popup('twitter')
        .done(function (result) {
            console.log(result.me);
            result.me().then(function (result1) {
                console.log(result1);
                $('#user-logged-in').html('Logged as: ' + result1.alias);
            });
            App.loaderOnOff(false);
            App.isUserLogedIn = true;
            App.userLoggedIn = result;
            $('#btn-login').unbind('click').html('LOGOUT').click(App.logout);
            $('.before-login').css('display', 'none');
            $('.after-login').css({'display': 'block', 'visibility': 'visible'});
            $('.action-buttons').css('display', 'inline-block');
            $(':header').css({'background-color': 'white', 'color': '#00acee'});
        })
        .fail(function (err) {
            App.loaderOnOff(false);
            alert("Unknown error: login failed.");
            console.log(err);
        });
};

/**
 * Logs user out.
 */
App.logout = function () {
    App.userLoggedIn = '';
    App.isUserLogedIn = false;
    $('#btn-login').html('LOGIN').click(App.login);
    $('.before-login').css('display', 'block');
    $('.after-login').css({'display': 'none', 'visibility': 'hidden'});
};


/**
 * Handles all team-buttons and creates hashtags.
 */
App.addToCurrentHashtag = function () {
    if (App.teamsChosen < 2) {
        App.disabledButton = $(this);
        App.disabledButton.prop('disabled', true);
        console.log($(this).attr("data-team"));
        var tappedBtnText = $(this).attr("data-team");
        // the user can select only two teams, there can not be two same teams in one hashtag
        App.hashtagLabelValue += tappedBtnText;
        App.hashtagValue += tappedBtnText;
        App.teamsChosen ++;
        App.currentBtnSelected = tappedBtnText;
        App.currentHashtagValue.text(App.hashtagLabelValue);
        console.log('hashtagValue: ' + App.hashtagValue);
    }
};

/**
 * Handles functionality of 'clear' button.
 */
App.clear = function () {
    App.showTeamButtons();
    App.clearCurrentHashtag();
    App.tweets.empty();
    App.teamButtons.children().prop('disabled', false);

};

/**
 * Clears all selected and saved values
 */
App.clearCurrentHashtag = function () {
    App.currentBtnSelected = "";
    App.teamsChosen = 0;
    App.hashtagLabelValue = "Your hashtag is: #";
    App.currentHashtagValue.text(App.hashtagLabelValue);
    App.hashtagValue = '';
};

/**
 * Shows or hides loader.
 * @param desiredState
 */
App.loaderOnOff = function (desiredState) {
    if (desiredState) {
        App.loader.append(App.loaderHTML);
    } else {
        App.loader.empty();
    }
};

App.showTeamButtons = function () {
    // showing menu
    App.teamButtons.css({'height': 'auto', 'transform': 'scaleY(1)'});
    App.showHideTeamButtons.find("i").removeClass("fa-angle-double-down").addClass("fa-angle-double-up");
    App.tweets.css('margin-top', '18em');
    App.teamButtonsDisplayed = true;
    App.showHideTeamButtons.click(App.hideTeamButtons);
    $('h2').css('display', 'block');
};

App.hideTeamButtons = function () {
    App.teamButtons.css({'height': '0', 'transform': 'scaleY(0)'});
    App.showHideTeamButtons.find("i").removeClass("fa-angle-double-up").addClass("fa-angle-double-down");
    App.tweets.css('margin-top', '12em');
    App.teamButtonsDisplayed = false;
    App.showHideTeamButtons.click(App.showTeamButtons);
    $('h2').css('display', 'none');
};

App.showInfobox = function () {
    App.infobox.css({'height': 'auto', 'transform': 'scaleY(1)'});
    App.menu.css({'height': '0', 'transform': 'scaleY(0)'});
    App.showHideTeamButtons.css('display', 'none');
};

App.hideInfoBox = function () {
    App.infobox.css({'height': '0', 'transform': 'scaleY(0)'});
    App.menu.css({'height': 'auto', 'transform': 'scaleY(1)'});
    App.showHideTeamButtons.css('display', 'block');
};

App.showHideInfo = function () {
    if (App.infoBoxDisplayed) {
        App.hideInfoBox();
        App.infoBoxDisplayed = false;
    } else {
        App.showInfobox();
        App.infoBoxDisplayed = true;
    }
};

App.init = function () {
    $('#btn-login').click(App.login);
    $('#btn-clear').click(App.clear);
    $('#btn-search').click(App.search);
    $('.team-button').click(App.addToCurrentHashtag);
    App.showHideTeamButtons.click(App.hideTeamButtons);
    $('#show-hide-info').click(App.showHideInfo);
};

$(document).ready(App.init);