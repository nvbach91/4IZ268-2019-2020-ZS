var hashtagLabelValue = "Your hashtag is: #";
var teamsChosen = 0;
var currentBtnSelected = "";
var hashtagValue = "";
var teamButtonsDisplayed = true;
var infoBoxDisplayed = false;

/**
 * Handles all team-buttons and creates hashtags.
 */
var addToCurrentHashtag = function () {
    console.log($(this).attr("data-team"));
    var tappedBtnText = $(this).attr("data-team");
    // the user can select only two teams, there can not be two same teams in one hashtag
    if (teamsChosen < 2 && currentBtnSelected !== tappedBtnText) {
        hashtagLabelValue += tappedBtnText;
        hashtagValue += tappedBtnText;
        teamsChosen += 1;
    } else {
        hashtagLabelValue = "Your hashtag is: #" + tappedBtnText;
        hashtagValue = tappedBtnText;
        teamsChosen = 1;
    }
    currentBtnSelected = tappedBtnText;
    $('#current-hashtag-value').text(hashtagLabelValue);
};

/**
 * Handles functionality of 'clear' button.
 */
var clear = function () {
    showTeamButtons();
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
 * @param desiredState
 */
var loaderOnOff = function (desiredState) {
    if (desiredState) {
        $('#loader').append('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
    } else {
        $('#loader').empty();
    }
};

var showTeamButtons = function () {
    // showing menu
    $('.team-buttons').css({'height': 'auto', 'transform': 'scaleY(1)'});
    $('#show-hide-teambuttons').find("i").removeClass("fa-angle-double-down").addClass("fa-angle-double-up");
    $('#tweets').css('margin-top', '18em');
    teamButtonsDisplayed = true;
    $('#show-hide-teambuttons').click(hideTeamButtons);
    $('h2').css('display', 'block');
};

var hideTeamButtons = function () {
    $('.team-buttons').css({'height': '0', 'transform': 'scaleY(0)'});
    $('#show-hide-teambuttons').find("i").removeClass("fa-angle-double-up").addClass("fa-angle-double-down");
    $('#tweets').css('margin-top', '12em');
    teamButtonsDisplayed = false;
    $('#show-hide-teambuttons').click(showTeamButtons);
    $('h2').css('display', 'none');
};

var showInfobox = function () {
    $('#infobox').css({'height': 'auto', 'transform': 'scaleY(1)'});
    $('#menu').css({'height': '0', 'transform': 'scaleY(0)'});
    $('#show-hide-teambuttons').css('display', 'none');
};

var hideInfoBox = function () {
    $('#infobox').css({'height': '0', 'transform': 'scaleY(0)'});
    $('#menu').css({'height': 'auto', 'transform': 'scaleY(1)'});
    $('#show-hide-teambuttons').css('display', 'block');
};

var showHideInfo = function () {
    if (infoBoxDisplayed) {
        hideInfoBox();
        infoBoxDisplayed = false;
    } else {
        showInfobox();
        infoBoxDisplayed = true;
    }
};

var init = function () {
    $('#btn-login').click(login);
    $('#btn-clear').click(clear);
    $('#btn-search').click(search);
    $('.team-button').click(addToCurrentHashtag);
    $('#show-hide-teambuttons').click(hideTeamButtons);
    $('#show-hide-info').click(showHideInfo);
};

$(document).ready(
        init()
);