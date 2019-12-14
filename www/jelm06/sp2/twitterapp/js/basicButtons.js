

let hashtagLabelValue = "Your hashtag is: #";
let teamsChosen = 0;
let currentBtnSelected = "";
var hashtagValue = "";


/**
 * Handles all team-buttons and creates hashtags.
 */
function addToCurrentHashtag() {
    let tappedBtnText = $(this).text();
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

/**
 * Clears all selected and saved values
 */
function clearCurrentHashtag() {
    currentBtnSelected = "";
    teamsChosen = 0;
    hashtagLabelValue = "Your hashtag is: #";
    $('#current-hashtag-value').text(hashtagLabelValue);
}

App.init = function () {
    $('#btn-clear').click(clearCurrentHashtag);
    $('#btn-search').click(search);
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
};

$(document).ready(
    function () {
        App.init()
    }
);