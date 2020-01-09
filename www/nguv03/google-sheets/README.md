# How to read and write data with Google Sheets API 4
This article will guide you through the process of creating a web application (HTML, JavaScript) that can communicate with a Google Spreadsheet (Read and Write data)


## Useful links and documentation
- https://developers.google.com/sheets/api
- https://developers.google.com/sheets/api/quickstart/js
- https://console.developers.google.com/
- https://developers.google.com/sheets/api/guides/values
- https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append


## Setup
*Note: You can also follow the QuickStart guide to automatically do the following steps (enable Google Sheets API, Create Consent Screen,Create Client ID, Create API Key)

- Go to https://console.developers.google.com and create a new Project
- Enable Google Sheets API
- Create credentials

![image](https://user-images.githubusercontent.com/20724910/72027206-6d586880-327e-11ea-9602-abf0b221d80a.png)

![image](https://user-images.githubusercontent.com/20724910/72027241-8234fc00-327e-11ea-8de4-07194b43da37.png)

![image](https://user-images.githubusercontent.com/20724910/72027267-9bd64380-327e-11ea-9a9e-e9a370c7f548.png)

- Create Consent screen

![image](https://user-images.githubusercontent.com/20724910/72027437-4d757480-327f-11ea-8073-065016272c7a.png)

![image](https://user-images.githubusercontent.com/20724910/72027475-7990f580-327f-11ea-89bf-23fcc2970146.png)

- Create OAuth 2.0 Client ID and copy it

![image](https://user-images.githubusercontent.com/20724910/72027490-8877a800-327f-11ea-847b-1c611e8c0e94.png)

![image](https://user-images.githubusercontent.com/20724910/72027505-95949700-327f-11ea-9326-5ac3b75b579e.png)

- Create an API key and copy it

![image](https://user-images.githubusercontent.com/20724910/72027576-e4423100-327f-11ea-8ad9-1e675e3a0a1b.png)

![image](https://user-images.githubusercontent.com/20724910/72027606-f91ec480-327f-11ea-98f1-7810d885dc99.png)

## Example applicaton
The following app will allow users to authenticate to your Google API project and read/write data from/to a specific Google Spreadsheet.


- Source code:
  - https://github.com/nvbach91/4IZ268-2019-2020-ZS/tree/master/www/nguv03/google-sheets/

- How to run:
  - Download the folder and open it in VS Code
  - Run file index.html with Live Server plugin in VS Code

- How it works:
  - We'll use GAPI SDK to achieve these functionalities. Import https://apis.google.com/js/api.js to your HTML page.
  - We need the following 4 information to access a public SpreadSheet
    - `App.CLIENT_ID = '377940326267-5t4orjmje65mu9eflp7mpdgp646rke3j.apps.googleusercontent.com';` - You created this during the Setup process
    - `App.API_KEY = 'AIzaSyAY5zq1-HwkZyARqLD7FzSRLrajuR7XGl0';` - You created this during the Setup process
    - `App.spreadsheetId = '1OZwvAfh0q0hQkCwh34iVBBW24mnMyJh5OuEMXYbu8vg';` - This ID is taken from the link to an existing spreadsheet. Go ahead and create a new spreadsheet, make it public for read and write. Copy its ID from its URL.
    - `App.SCOPES = 'https://www.googleapis.com/auth/spreadsheets';` - This is the permissions you need to grant users so they can access your spreadsheet. For orther type of permissions, visit https://developers.google.com/identity/protocols/googlescopes
  - When the page is ready, call `gapi.load('client:auth2', () => { ... });`
  - In this call back, initialize the gapi client. 
```js
gapi.client.init({
  apiKey: App.API_KEY,
  clientId: App.CLIENT_ID,
  discoveryDocs: App.DISCOVERY_DOCS,
  scope: App.SCOPES
}).then(() => {
  // manipulate the DOM to notify users that they have logged in successfully

  // Listen for sign-in state changes.
  gapi.auth2.getAuthInstance().isSignedIn.listen(App.updateSigninStatus);

  // Handle the initial sign-in state.
  App.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

  // you can now start making Google Sheets API calls to retrieve data from a spreadsheet
  App.listData();
}, (error) => {
  // if there is any error, notify the users
  console.log(JSON.stringify(error, null, 2));
});
```
  - This is an example function to fetch data from a spreadsheet and show them on the page
```js
App.listData = () => {
  // select the HTML table for displaying data
  const tableBody = document.querySelector('#table-body');
  const rows = [];
  // call the method to fetch data
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: App.spreadsheetId, // this is the ID of your spreadsheet that contains data
    range: 'Sheet1!A1:D101', // this is the cell range to be fetched from the spreadsheet
  }).then((response) => {
    const range = response.result; // the result contains arrays of data, you'll have to process it
    if (range.values.length > 0) {
      for (i = 0; i < range.values.length; i++) {
        const row = range.values[i];
        rows.push(row);
      }
      // display the rows of data in the table on the page
      tableBody.innerHTML = rows.map((row) => `<tr>${row.map((value) => `<td>${value}</td>`).join('')}</tr>`).join('');
    } else {
        console.log('No data found.');
    }
  }, (response) => {
    console.log('Error: ' + response.result.error.message);
  });
};
```
  - This is an example function that will append a new row to a spreadsheet
```js
// the .append method will append a new row to a table whose cell is the specified range
gapi.client.sheets.spreadsheets.values.append({
  spreadsheetId: App.spreadsheetId,
  range: 'Sheet1!A1',
  valueInputOption: 'RAW',
  insertDataOption: 'INSERT_ROWS',
  resource: {
    values: [
      ['123', 'Dave', '2019-11-19', 175] // this is a row
    ]
  }
}).then((response) => {
  var result = response.result;
  console.log(`${result.updates.updatedCells} cells appended.`);
  // refresh the table to verify the newly appended data
  App.listData();
});
```
  