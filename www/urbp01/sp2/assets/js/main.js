// ÚVODNÍ STRÁNKA A NAVIGACE

var showView = document.querySelector("a[id=a-view]");

showView.onclick = function () {
    document.getElementById("d-view").style.display = "inline";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("nav").style.display = "inline";
};

var showEdit = document.querySelector("a[id=a-edit]");

showEdit.onclick = function () {
    document.getElementById("d-edit").style.display = "inline";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("nav").style.display = "inline";
};

var showNavMenu = document.querySelector("button[id=nav-menu]");

showNavMenu.onclick = function () {
    document.getElementById("d-intro").style.display = "inline";
    document.getElementById("d-view").style.display = "none";
    document.getElementById("d-edit").style.display = "none";
    document.getElementById("nav").style.display = "none";
};

var showNavView = document.querySelector("button[id=nav-view]");

showNavView.onclick = function () {
    document.getElementById("d-view").style.display = "inline";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("d-edit").style.display = "none";
    document.getElementById("nav").style.display = "inline";
};

var showNavEdit = document.querySelector("button[id=nav-edit]");

showNavEdit.onclick = function () {
    document.getElementById("d-edit").style.display = "inline";
    document.getElementById("d-view").style.display = "none";
    document.getElementById("d-intro").style.display = "none";
    document.getElementById("nav").style.display = "inline";
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
                    pDate.innerText = result.values[i][1];
                    pDate.style.fontSize = "11px";
                    var pTheme = document.createElement('p');
                    pTheme.innerText = result.values[i][2];
                    pTheme.style.textDecoration = "underline";
                    var pDescription = document.createElement('p');
                    pDescription.innerText = result.values[i][3];

                    view.appendChild(pName);
                    view.appendChild(pDate);
                    view.appendChild(pTheme);
                    view.appendChild(pDescription);
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

showResetButton = document.querySelector("button[id=b-reset]");

showResetButton.onclick = function () {
    document.getElementById("d-view").style.display = "inline";
    document.getElementById("out-view").style.display = "none";
    document.getElementById("in-view").style.display = "inline";
    document.getElementById('out-content').innerHTML = "";
}

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
            alert('Hodnoty ' + nameInput + ' ' + dateInput + ' ' + themeInput + ' ' + descriptionInput + ' byly vloženy do tabulky.');
        },
            function (err) { console.error("Execute error", err); });
};

var showEditButton = document.querySelector("button[id=b-edit]");

showEditButton.onclick = function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCallWrite();
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
    document.getElementById("signin-button").style.backgroundColor = "red";
};
