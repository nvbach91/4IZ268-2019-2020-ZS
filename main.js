const App = {};
// Client ID and API key from the Developer Console
App.CLIENT_ID = '10277759528-irjvrpqq8pqvld7g25j0iv7rvfr9t8mq.apps.googleusercontent.com';
App.API_KEY = 'AIzaSyCIW6av5O8oWkt-8arbMJYSzWOWVjkV800';
App.spreadsheetId = '1DGR_mgcYHBXkCxY_2i46DbyKVb1qD4P-byrcRE1L5q4';

// Array of API discovery doc URLs for APIs used by the quickstart
App.DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
// https://developers.google.com/identity/protocols/googlescopes
App.SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

/** 
*  On load, called to load the auth2 library and API client library.
*/
App.handleClientLoad = () => {
  gapi.load('client:auth2', App.initClient);
};

/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/
App.initClient = () => {
  gapi.client.init({
    apiKey: App.API_KEY,
    clientId: App.CLIENT_ID,
    discoveryDocs: App.DISCOVERY_DOCS,
    scope: App.SCOPES
  }).then(() => {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(App.updateSigninStatus);

    // Handle the initial sign-in state.
    App.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    App.authorizeButton.click(App.handleAuthClick);
    App.signoutButton.click(App.handleSignoutClick);
  }, (error) => {
    App.appendPre(JSON.stringify(error, null, 2));
  });
};

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
App.updateSigninStatus = (isSignedIn) => {
  if (isSignedIn) {
    App.authorizeButton.hide();
    App.signoutButton.show();
    App.listData();
  } else {
    App.authorizeButton.show();
    App.signoutButton.hide();
  }
};

/**
*  Sign in the user upon button click.
*/
App.handleAuthClick = (event) => {
  gapi.auth2.getAuthInstance().signIn();
};

/**
*  Sign out the user upon button click.
*/
App.handleSignoutClick = (event) => {
  gapi.auth2.getAuthInstance().signOut();
};

/**
* Append a pre element to the body containing the given message
* as its text node. Used to display the results of the API call.
*
* @param {string} message Text to be placed in pre element.
*/
App.appendPre = (message) => {
  $('#content').append(message);
};

/**
* Print the names and majors of students in a sample spreadsheet:
* https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
*/
App.listData = () => {
  const tableBody = document.querySelector('#table-body');
  const rows = [];
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: App.spreadsheetId,
    range: 'Sheet1!A1:D101',
  }).then((response) => {
    const range = response.result;
    if (range.values.length > 0) {
      for (i = 0; i < range.values.length; i++) {
        const row = range.values[i];
        var personName = row [0];
        var date = row [1];
        var now =  new Date().getTime();
        var birthDate = new Date(row [1]);
        var distance = birthDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        row.push(',' +  days + ' ' +  "days" + ' ' + "remain");
        rows.push(row);
      }
      
      tableBody.innerHTML = rows.map((row) => `<tr>${row.map((value) => `<td>${value}</td>`).join('')}</tr>`).join('');
    } else {
      App.appendPre('No data found.');
    }
  }, (response) => {
    App.appendPre('Error: ' + response.result.error.message);
  });
};

$(document).ready(() => {
  App.handleClientLoad();
  App.authorizeButton = $('#authorize_button');
  App.signoutButton = $('#signout_button');
  App.signoutButton = $('#signout_button');
  App.addForm = $('#add-form').submit((e) => {
    e.preventDefault();
    const data = {};
    App.addForm.serializeArray().forEach(({ name, value }) => data[name] = value);
    gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: App.spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [
          [data.name, data.birth,]
        ]
      }
    }).then((response) => {
      var result = response.result;
      //console.log(`${result.updates.updatedCells} cells appended.`);
      App.listData();
    });
    
    var countDownDate = document.getElementById("myInput2").value;
    console.log(countDownDate);
    var now = new Date().getTime();
    var birthDate = new Date(countDownDate);
    var distance = birthDate - now;
    console.log(distance);
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    console.log(days);
  });

});
