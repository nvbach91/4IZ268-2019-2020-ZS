var hashtagLabelValue = "Your hashtag is: #";
var teamsChosen = 0;
var currentBtnSelected = "";
var hashtagValue = "";
var welcomeText = 'This is a twitter app made as final school work for course 4IZ268, University of Economics, Prague. To be able to use it, you need to login with your twitter account.';
var isMenuDisplayed = true;

/**
 * Handles all team-buttons and creates hashtags.
 */
var addToCurrentHashtag = function () {
    var tappedBtnText = $(this).text();
    // the user can select only two teams, there can not be two same teams in one hashtag
    if (teamsChosen < 2 && currentBtnSelected !== tappedBtnText) {
        hashtagLabelValue += tappedBtnText;
        hashtagValue += tappedBtnText;
        teamsChosen += 1;
        currentBtnSelected = tappedBtnText;
    } else {
        hashtagLabelValue = "Your hashtag is: #" + tappedBtnText;
        App.hashtagValue = tappedBtnText;
        teamsChosen = 1;
        currentBtnSelected = tappedBtnText;
    }
    $('#current-hashtag-value').text(hashtagLabelValue);
}

var clear = function () {
    clearCurrentHashtag();
    $('#tweets').empty();
};

/**
 * Clears all selected and saved values
 */
var clearCurrentHashtag = function () {
    currentBtnSelected = "";
    teamsChosen = 0;
    hashtagLabelValue = "Your hashtag is: #";
    $('#current-hashtag-value').text(hashtagLabelValue);
    hashtagValue = '';
};

/**
 * Shows or hides loader.
 *
 * @param desiredState
 */
var loaderOnOff = function (desiredState) {
    if (desiredState) {
        $('#loader').append('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
    } else {
        $('#loader').empty();
    }
};

var showAndHide = function () {
    if (isMenuDisplayed === true) {
        // hiding menu
        $('.team-buttons').css('display', 'none');
        $('#show-hide').find("i").removeClass("fa-angle-double-up").addClass("fa-angle-double-down");
        $('#tweets').css('margin-top', '12em');
        isMenuDisplayed = false;
    } else {
        // showing menu
        $('.team-buttons').css('display', 'block');
        $('#show-hide').find("i").removeClass("fa-angle-double-down").addClass("fa-angle-double-up");
        $('#tweets').css('margin-top', '18em');
        isMenuDisplayed = true;
    }
}

var init = function () {
    $('#btn-clear').click(clear);
    $('#btn-search').click(search);
    $('#btn-login').click(login);

    $('#btn-bou').click(addToCurrentHashtag);
    $('#btn-ars').click(addToCurrentHashtag);
    $('#btn-ava').click(addToCurrentHashtag);
    $('#btn-brh').click(addToCurrentHashtag);
    $('#btn-bur').click(addToCurrentHashtag);
    $('#btn-che').click(addToCurrentHashtag);
    $('#btn-cry').click(addToCurrentHashtag);
    $('#btn-eve').click(addToCurrentHashtag);
    $('#btn-lei').click(addToCurrentHashtag);
    $('#btn-liv').click(addToCurrentHashtag);
    $('#btn-mci').click(addToCurrentHashtag);
    $('#btn-mun').click(addToCurrentHashtag);
    $('#btn-new').click(addToCurrentHashtag);
    $('#btn-nor').click(addToCurrentHashtag);
    $('#btn-shu').click(addToCurrentHashtag);
    $('#btn-sou').click(addToCurrentHashtag);
    $('#btn-tot').click(addToCurrentHashtag);
    $('#btn-wat').click(addToCurrentHashtag);
    $('#btn-whu').click(addToCurrentHashtag);
    $('#btn-wlv').click(addToCurrentHashtag);

    $('#show-hide').click(showAndHide);
};

$(document).ready(
    function () {
        init()
    }
);