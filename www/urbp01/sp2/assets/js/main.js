// ÚVODNÍ STRÁNKA A NAVIGACE

var showView = document.querySelector("a[id=a-view]");

showView.onclick = function () {
    document.getElementById("d-view").style.display = "inline";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("d-update").style.display = "none";
    document.getElementById("d-edit").style.display = "none";
    document.getElementById("signin-button").style.display = "none";
};

var showEdit = document.querySelector("a[id=a-edit]");

showEdit.onclick = function () {
    document.getElementById("d-edit").style.display = "inline";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("d-update").style.display = "none";
    document.getElementById("d-view").style.display = "none";
    document.getElementById("signin-button").style.display = "inline";
};

var showUpdate = document.querySelector("a[id=a-update]");

showUpdate.onclick = function () {
    document.getElementById("d-edit").style.display = "none";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("d-update").style.display = "inline";
    document.getElementById("d-view").style.display = "none";
    document.getElementById("signin-button").style.display = "inline";
    searchOptions();
};

var showNavMenu = document.querySelector("button[id=nav-menu]");

showNavMenu.onclick = function () {
    document.getElementById("d-intro").style.display = "inline";
    document.getElementById("d-view").style.display = "none";
    document.getElementById("d-edit").style.display = "none";
    document.getElementById("d-update").style.display = "none";
    document.getElementById("signin-button").style.display = "none";
};

var showNavView = document.querySelector("button[id=nav-view]");

showNavView.onclick = function () {
    document.getElementById("d-view").style.display = "inline";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("d-edit").style.display = "none";
    document.getElementById("d-update").style.display = "none";
    document.getElementById("signin-button").style.display = "none";
};

var showNavUpdate = document.querySelector("button[id=nav-update]");

showNavUpdate.onclick = function () {
    document.getElementById("d-update").style.display = "inline";
    document.getElementById("d-view").style.display = "none";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("d-edit").style.display = "none";
    document.getElementById("signin-button").style.display = "inline";
    searchOptions();
};

var showNavEdit = document.querySelector("button[id=nav-edit]");

showNavEdit.onclick = function () {
    document.getElementById("d-edit").style.display = "inline";
    document.getElementById("d-view").style.display = "none";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("d-update").style.display = "none";
    document.getElementById("signin-button").style.display = "inline";
};

var signInButton = document.querySelector("button[id=signin-button]");

signInButton.onclick = function () {
    handleSignInClick();
};

var signOutButton = document.querySelector("button[id=signout-button]");

signOutButton.onclick = function () {
    handleSignOutClick();
};

// ZOBRAZENÍ DAT

function makeApiCallRead() {

    return gapi.client.sheets.spreadsheets.values.get({
        "spreadsheetId": "13rt5Sgq0puS-a5t_zWdL-QrJZnplbV9aMSATLh_0CPI",
        "range": "Evidence",
        "valueRenderOption": "UNFORMATTED_VALUE"
    })
        .then(function (response) {
            var search = document.getElementById('s-name').value;
            var result = response.result;
            var numRows = result.values ? result.values.length : 0;
            var view = document.getElementById('out-content');

            for (i = 1; i < numRows; i++) {
                if (result.values[i][0] == search) {

                    var pName = document.createElement('p');
                    pName.innerText = result.values[i][0];
                    pName.setAttribute('class', 'pName')
                    var pDate = document.createElement('p');
                    pDate.innerText = result.values[i][1] + ' - ID: ' + i;
                    pDate.setAttribute('class', 'pDate')
                    var pTheme = document.createElement('p');
                    pTheme.innerText = result.values[i][2];
                    pTheme.setAttribute('class', 'pTheme')
                    var pDescription = document.createElement('p');
                    pDescription.innerText = result.values[i][3];
                    pDescription.setAttribute('class', 'pDescription')
                    var hr = document.createElement('hr');
                    hr.setAttribute('class', 'hr')

                    view.appendChild(pName);
                    view.appendChild(pDate);
                    view.appendChild(pTheme);
                    view.appendChild(pDescription);
                    view.appendChild(hr);
                }
            }
        },
            function (err) { console.error("Execute error", err); });
};


var viewButton = document.querySelector("button[id=b-view]");

viewButton.onclick = function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCallRead();
        document.getElementById("out-view").style.display = "inline";
        document.getElementById("in-view").style.display = "none";
    }
};

resetButton = document.querySelector("button[id=b-reset]");

resetButton.onclick = function () {
    document.getElementById("d-view").style.display = "inline";
    document.getElementById("out-view").style.display = "none";
    document.getElementById("in-view").style.display = "inline";
    document.getElementById('out-content').innerHTML = "";
};

//ZAPSÁNÍ DAT

function makeApiCallWrite() {

    var form = document.querySelector('form');
    var nameInput = form.elements.namedItem('name').value;
    var dateInput = form.elements.namedItem('date').value;
    var themeInput = form.elements.namedItem('theme').value;
    var descriptionInput = form.elements.namedItem('description').value;

    return gapi.client.sheets.spreadsheets.values.append({
        "spreadsheetId": "13rt5Sgq0puS-a5t_zWdL-QrJZnplbV9aMSATLh_0CPI",
        "range": "Evidence",
        "insertDataOption": "INSERT_ROWS",
        "valueInputOption": "RAW",
        "resource": {
            "values": [
                [
                    nameInput,
                    dateInput,
                    themeInput,
                    descriptionInput
                ]
            ]
        }
    })
        .then(function (response) {
            alert('Jméno: ' + nameInput + '\nDatum: ' + dateInput + '\nTéma: ' + themeInput + '\nPopis: ' + descriptionInput + '\nHodnoty byly uloženy.');
        },
            function (err) {
                console.error(alert('Hodnoty nebyly zapsány.'), err);
            });
};

var editButton = document.querySelector("button[id=b-edit]");

editButton.onclick = function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCallWrite();
        document.getElementById('edit-name').value = "";
        document.getElementById('edit-date').value = "";
        document.getElementById('edit-theme').value = "";
        document.getElementById('edit-description').value = "";
    }
};

//ÚPRAVA DAT

function makeApiCallUpdate() {

    var updateIDinput = document.getElementById('update-id').value;
    var updateNameInput = document.getElementById('update-name').value;
    var updateDateInput = document.getElementById('update-date').value;
    var updateThemeInput = document.getElementById('update-theme').value;
    var updateDescriptionInput = document.getElementById('update-description').value;

    return gapi.client.sheets.spreadsheets.values.batchUpdate({
        "spreadsheetId": "13rt5Sgq0puS-a5t_zWdL-QrJZnplbV9aMSATLh_0CPI",
        "resource": {
            "valueInputOption": "RAW",
            "data": [
                {
                    "majorDimension": "ROWS",
                    "range": "Evidence!" + 'A' + (updateIDinput++) + ':D' + (updateIDinput++),
                    "values": [
                        [
                            updateNameInput,
                            updateDateInput,
                            updateThemeInput,
                            updateDescriptionInput
                        ]
                    ]
                }
            ]
        }
    })
        .then(function (response) {
            alert('Jméno: ' + updateNameInput + '\nDatum: ' + updateDateInput + '\nTéma: ' + updateThemeInput + '\nPopis: ' + updateDescriptionInput + '\nHodnoty byly aktualizovány u záznamu s ID: ' + updateIDinput + ".");
        },
            function (err) {
                console.error("Execute error", err);
                alert('Hodnoty nebyly aktualizovány.');
            });

};

function searchID() {

    return gapi.client.sheets.spreadsheets.values.get({
        "spreadsheetId": "13rt5Sgq0puS-a5t_zWdL-QrJZnplbV9aMSATLh_0CPI",
        "range": "Evidence",
        "valueRenderOption": "UNFORMATTED_VALUE"
    })
        .then(function (response) {

            var updateID = document.getElementById('update-id').value;
            var result = response.result;
            var numRows = result.values ? result.values.length : 0;
            var updateNameInput = document.getElementById('update-name');
            var updateDateInput = document.getElementById('update-date');
            var updateThemeInput = document.getElementById('update-theme');
            var updateDescriptionInput = document.getElementById('update-description');

            for (i = 1; i < numRows; i++) {
                if (i == updateID) {
                    updateNameInput.value = result.values[i][0];
                    updateDateInput.value = result.values[i][1];
                    updateThemeInput.value = result.values[i][2];
                    updateDescriptionInput.value = result.values[i][3];
                }
            }
        },
            function (err) { console.error("Execute error", err); });
};

var updateIDButton = document.querySelector("button[id=b-update-ID]");

updateIDButton.onclick = function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        document.getElementById("out-update").style.display = "inline";
        document.getElementById("in-update").style.display = "none";
        searchID();
    }
};

resetIDButton = document.querySelector("button[id=b-reset-update]");

resetIDButton.onclick = function () {
    document.getElementById("out-update").style.display = "none";
    document.getElementById("in-update").style.display = "inline";
    document.getElementById('update-name').value = "";
    document.getElementById('update-date').value = "";
    document.getElementById('update-theme').value = "";
    document.getElementById('update-description').value = "";
};

var updateButton = document.querySelector("button[id=b-update]");

updateButton.onclick = function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCallUpdate();
    }
};


function searchOptions() {

    return gapi.client.sheets.spreadsheets.values.get({
        "spreadsheetId": "13rt5Sgq0puS-a5t_zWdL-QrJZnplbV9aMSATLh_0CPI",
        "range": "Evidence",
        "valueRenderOption": "UNFORMATTED_VALUE"
    })
        .then(function (response) {

            var result = response.result;
            var numRows = result.values ? result.values.length : 0;
            var options = document.getElementById('options');
            for (i = 1; i < numRows; i++) {

                var option = document.createElement('option');
                option.innerText = result.values[i][0]+' '+result.values[i][1]+' '+result.values[i][2];

                options.appendChild(option);

            }
        },
            function (err) { console.error("Execute error", err); });
};

function searchSelects() {

    return gapi.client.sheets.spreadsheets.values.get({
        "spreadsheetId": "13rt5Sgq0puS-a5t_zWdL-QrJZnplbV9aMSATLh_0CPI",
        "range": "Evidence",
        "valueRenderOption": "UNFORMATTED_VALUE"
    })
        .then(function (response) {
            var updateNameInput = document.getElementById('update-name');
            var updateDateInput = document.getElementById('update-date');
            var updateThemeInput = document.getElementById('update-theme');
            var updateDescriptionInput = document.getElementById('update-description');
            var selectedOptions = document.getElementById('options').value;
            var result = response.result;
            var numRows = result.values ? result.values.length : 0;

            for (i = 1; i < numRows; i++) {
                if ((result.values[i][0]+' '+result.values[i][1]+' '+result.values[i][2]) == selectedOptions) {
                            updateNameInput.value = result.values[i][0];
                            updateDateInput.value = result.values[i][1];
                            updateThemeInput.value = result.values[i][2];
                            updateDescriptionInput.value = result.values[i][3];
                }
            }
        },
            function (err) { console.error("Execute error", err); });
};

var updateOptionsButton = document.querySelector("button[id=b-update-options]");

updateOptionsButton.onclick = function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        document.getElementById("out-update").style.display = "inline";
        document.getElementById("in-update").style.display = "none";
        searchSelects();
    }
};

//OVĚŘENÍ KLIENTA

function initClient() {
    var API_KEY = 'AIzaSyA1LNivmetAX6frH0E-6Qg6W1bYq21-ELU';

    var CLIENT_ID = '45964242771-e1f0k8ljmkgm7cn3q0komcn9iath1b6a.apps.googleusercontent.com';

    var SCOPE = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets';

    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
};

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
};

function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        document.getElementById("signin-button").style.backgroundColor = "green";
        document.getElementById("signout-button").style.display = "inline";
    }
    else {
        document.getElementById("signin-button").style.backgroundColor = "red";
        document.getElementById("signout-button").style.display = "none";
    }
};

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
};

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
};
