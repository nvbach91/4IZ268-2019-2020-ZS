// ÚVODNÍ STRÁNKA A NAVIGACE

var showView = document.querySelector("a[id=a-view]");

showView.onclick = function () {
    document.getElementById("d-view").style.display = "inline";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("d-update").style.display = "none";
    document.getElementById("d-edit").style.display = "none";
};

var showEdit = document.querySelector("a[id=a-edit]");

showEdit.onclick = function () {
    document.getElementById("d-edit").style.display = "inline";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("d-update").style.display = "none";
    document.getElementById("d-view").style.display = "none";
};

var showUpdate = document.querySelector("a[id=a-update]");

showUpdate.onclick = function () {
    document.getElementById("d-edit").style.display = "none";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("d-update").style.display = "inline";
    document.getElementById("d-view").style.display = "none";
};

var showNavMenu = document.querySelector("button[id=nav-menu]");

showNavMenu.onclick = function () {
    document.getElementById("d-intro").style.display = "inline";
    document.getElementById("d-view").style.display = "none";
    document.getElementById("d-edit").style.display = "none";
    document.getElementById("d-update").style.display = "none";
};

var showNavView = document.querySelector("button[id=nav-view]");

showNavView.onclick = function () {
    document.getElementById("d-view").style.display = "inline";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("d-edit").style.display = "none";
    document.getElementById("d-update").style.display = "none";
};

var showNavUpdate = document.querySelector("button[id=nav-update]");

showNavUpdate.onclick = function () {
    document.getElementById("d-update").style.display = "inline";
    document.getElementById("d-view").style.display = "none";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("d-edit").style.display = "none";
};

var showNavEdit = document.querySelector("button[id=nav-edit]");

showNavEdit.onclick = function () {
    document.getElementById("d-edit").style.display = "inline";
    document.getElementById("d-view").style.display = "none";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("d-update").style.display = "none";
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
                    pName.style.fontWeight = "bold";
                    var pDate = document.createElement('p');
                    pDate.innerText = result.values[i][1] + ' - A' + (i + 1) + ':D' + (i + 1);
                    pDate.style.fontSize = "11px";
                    var pTheme = document.createElement('p');
                    pTheme.innerText = result.values[i][2];
                    pTheme.style.textDecoration = "underline";
                    var pDescription = document.createElement('p');
                    pDescription.innerText = result.values[i][3];
                    pDescription.style.marginBottom = "40px";
                    pDescription.style.maxWidth = "70%";
                    pDescription.style.marginLeft = "auto";
                    pDescription.style.marginRight = "auto";
                    var hr = document.createElement('hr');
                    hr.style.maxWidth = "70%";

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
            function (err) { console.error("Execute error", err); });
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
                    "range": "Evidence!" + updateIDinput,
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
            function (err) { console.error("Execute error", err); });

};

var updateButton = document.querySelector("button[id=b-update]");

updateButton.onclick = function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCallUpdate();
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
    }
    else {
        document.getElementById("signin-button").style.backgroundColor = "red";
    }
};

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
};

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
};
