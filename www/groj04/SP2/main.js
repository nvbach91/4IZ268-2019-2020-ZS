class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  displayNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  whichOperation(operation) {
    if (!this.currentOperand) return;
    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "x^y":
        computation = Math.pow(prev, current);
        break;
      default:
        return;
    }
    localStorage.setItem(
      "processing",
      `${this.previousOperand} ${this.operation} ${this.currentOperand}`
    );

    console.log(localStorage.getItem("processing"));

    localStorage.setItem("result", computation);
    console.log(localStorage.getItem("result"));

    var processHistory = document.createElement("LI");
    var history = document.createElement("LI");
    history.innerText = localStorage.getItem("result");
    processHistory.innerText = localStorage.getItem("processing");
    document.querySelector("#history").prepend(processHistory);
    document.querySelector("#history").prepend(history);
    localStorage.removeItem("result");
    localStorage.removeItem("processing");

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
}

const numberButtons = document.querySelectorAll("#numButton");
const operationButtons = document.querySelectorAll("#opButton");
const equalsButton = document.querySelector("#eqButton");
const deleteButton = document.querySelector("#delButton");
const allClearButton = document.querySelector("#all-clear");
const previousOperandTextElement = document.querySelector("#prev-opButton");
const currentOperandTextElement = document.querySelector("#cur-opButton");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.displayNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.whichOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", button => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", button => {
  calculator.delete();
  calculator.updateDisplay();
});

const App = {};
// Client ID and API key from the Developer Console
App.CLIENT_ID =
  "811896952216-mhq4lvetepolp6koaa0flbv99bb0f2g6.apps.googleusercontent.com";
App.API_KEY = "AIzaSyDjg8j6AF95YVY7cviGNGxyWtErNSZIIEE";
App.spreadsheetId = "1OZwvAfh0q0hQkCwh34iVBBW24mnMyJh5OuEMXYbu8vg";

// Array of API discovery doc URLs for APIs used by the quickstart
App.DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4"
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
// https://developers.google.com/identity/protocols/googlescopes
App.SCOPES = "https://www.googleapis.com/auth/spreadsheets";

/**
 *  On load, called to load the auth2 library and API client library.
 */
App.handleClientLoad = () => {
  gapi.load("client:auth2", App.initClient);
};

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
App.initClient = () => {
  gapi.client
    .init({
      apiKey: App.API_KEY,
      clientId: App.CLIENT_ID,
      discoveryDocs: App.DISCOVERY_DOCS,
      scope: App.SCOPES
    })
    .then(
      () => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(App.updateSigninStatus);

        // Handle the initial sign-in state.
        App.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        App.authorizeButton.click(App.handleAuthClick);
        App.signoutButton.click(App.handleSignoutClick);
      },
      error => {
        App.appendPre(JSON.stringify(error, null, 2));
      }
    );
};


/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
App.updateSigninStatus = isSignedIn => {
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
App.handleAuthClick = event => {
  gapi.auth2.getAuthInstance().signIn();
};
/**
 * Get email atemt tha has failed
 */
App.getClientsEmail = isSignedIn => {
  gapi.auth2.getEmail()
  var xe = gapi.auth2.getEmail()
  console.log(xe)
};

/**
 *  Sign out the user upon button click.
 */
App.handleSignoutClick = event => {
  gapi.auth2.getAuthInstance().signOut();
};

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
App.appendPre = message => {
  $("#content").append(message);
};

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
App.listData = () => {
  const tableBody = document.querySelector("#table-body");
  const rows = [];
  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: App.spreadsheetId,
      range: "Sheet1!A1:D101"
    })
    .then(
      response => {
        const range = response.result;
        if (range.values.length > 0) {
          for (i = 0; i < range.values.length; i++) {
            const row = range.values[i];
            rows.push(row);
          }
          tableBody.innerHTML = rows
            .map(
              row =>
                `<tr>${row.map(value => `<td>${value}</td>`).join("")}</tr>`
            )
            .join("");
        } else {
          App.appendPre("No data found.");
        }
      },
      response => {
        App.appendPre("Error: " + response.result.error.message);
      }
    );
};

$(document).ready(() => {
  App.handleClientLoad();
  App.authorizeButton = $("#authorize_button");
  App.signoutButton = $("#signout_button");
  App.signoutButton = $("#signout_button");
  App.addForm = $("#add-form").submit(e => {
    e.preventDefault();
    const data = {};
    App.addForm
      .serializeArray()
      .forEach(({ name, value }) => (data[name] = value));
    gapi.client.sheets.spreadsheets.values
      .append({
        spreadsheetId: App.spreadsheetId,
        range: "Sheet1!A1",
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: {
          values: [[data.id, data.name, data.birth, data.height]]
        }
      })
      .then(response => {
        var result = response.result;
        //console.log(`${result.updates.updatedCells} cells appended.`);
        App.listData();
      });
  });
});
