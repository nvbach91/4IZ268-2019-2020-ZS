
/**
 * Searches for Tweets based on @hashtagValue.
 * Basic Twitter search API provides only tweets younger than 7(?) days.
 */
var search = function () {
    let queryURL = 'https://api.twitter.com/1.1/search/tweets.json?q=%23' + hashtagValue;
    if(isUserLogedIn) {
        console.log('searching for ' + hashtagValue)
        userLoggedIn.get(queryURL)
            .done(function (result) {
                console.log(result.statuses.length);
                $('.tweets').css('visibility', 'visible');
                $('.tweets').append('<p>Number of tweets found: </p>' + result.statuses.length);
            })
            .fail (function (err) {
                console.log(err);
            });
    } else {ff
        alert('You must be logged in!');
    }
};



