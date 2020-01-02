var isResultDisplayed = false;

var placeContent = function (status) {
    $('.after-search').append('<div class="tweet">' +
        '<div class="tweet-metadata">' +
        status.created_at +
        " By " +
        '<a href="https://twitter.com/' + status.user.screen_name + '"' +
        '>' + status.user.name +
        '</a>' +
        '</div>' +
        '<div class="tweet-text">' +
        status.full_text +
        '</div>');
};

// TODO feature - include / exclude retweets
// TODO feature idea - get most retweeted stats
// TODO feature - chose number of tweets searched

/**
 * Searches for Tweets based on @hashtagValue.
 * Basic Twitter search API provides only tweets younger than 7 days.
 */
var search = function () {
    var queryURL = 'https://api.twitter.com/1.1/search/tweets.json?q=%23' + hashtagValue + ' -filter:retweets' + '&count=100&tweet_mode=extended&;'
    if (isUserLogedIn) {
        if (isResultDisplayed) {
            $('#tweets').empty();
        }
        loaderOnOff(true);
        console.log('searching for ' + hashtagValue);
        userLoggedIn.get(queryURL)
            .done(function (result) {
                console.log(result);
                loaderOnOff(false);
                if (result.statuses.length === 0) {
                    alert('No tweets were found. Try another hashtag!');
                    clear();
                } else {
                    isResultDisplayed = true;
                    hideTeamButtons();
                    $('.after-search').css('visibility', 'visible');
                    result.statuses.forEach(function (status) {
                        placeContent(status);
                    });
                }

            })
            .fail(function (err) {
                loaderOnOff(false);
                console.log(err);
                alert(err);
            });
    } else {
        alert('You must be logged in!');
    }
};