/**
 * Checkers
 */
var selected = [];
var moving = [];
var takingPiece;
var whiteTurn = true;
var whitePieces = 12;
var blackPieces = 12;
var pieceCanTake = false;
var numberOfMoves = 0;
var blackPiecesList = [];
var whitePiecesList = [];

const App = {};
App.CLIENT_ID = '888004420820-cthdnvhrad25035o935t9i0fkehf5o4o.apps.googleusercontent.com';
App.API_KEY = 'AIzaSyDdoS8pim5pOfbVBhcDa8iT_gbkQXVEx1Y';
App.spreadsheetId = '1YO2N96vX3H0mTJqrtsZQGUp-VHsObaC2TQoyj5_5ka8';
App.SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
App.DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

App.handleClientLoad = () => {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: App.API_KEY,
            clientId: App.CLIENT_ID,
            discoveryDocs: App.DISCOVERY_DOCS,
            scope: App.SCOPES
        }).then(() => {
            // manipulate the DOM to notify users that they have logged in successfully

            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().signIn();
            gapi.auth2.getAuthInstance().isSignedIn.listen(App.updateSigninStatus);

            // Handle the initial sign-in state.
            App.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

            // you can now start making Google Sheets API calls to retrieve data from a spreadsheet
        }, (error) => {
            // if there is any error, notify the users
            console.log(JSON.stringify(error, null, 2));
        });

    });
};


/**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
App.updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
        console.log('signed in');
    } else {
    }
}

App.writeData = () => {
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: App.spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: [
                [blackPieces, whitePieces, numberOfMoves] // this is a row
            ]
        }
    }).then((response) => {
        var result = response.result;
        console.log(`${result.updates.updatedCells} cells appended.`);
        // refresh the table to verify the newly appended data
    });
}

/**
 * function to clear board for testing purposes
 */
function clearBoardPieces() {
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            let checkSquare = document.getElementById(i + '-' + j);
            if (checkSquare.firstChild !== null) {
                checkSquare.firstChild.remove();
            }

        }

    }
}

function clearBoard() {
    for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 8; j++) {
            let checkSquare = document.getElementById(i + '-' + j);

            checkSquare.remove();


        }

    }
}

/**
 * Function for clearing selected class.
 */
function clearSelected() {
    selected.forEach(element => {
        if (element.classList.contains('selected')) {
            element.classList.remove('selected');
        }
    });
    selected = [];
}

/**
 * Function creating rows of cells and squares on gameboard.
 * @param {int} rowNumber number deciding row position in gameboard.
 */
function createRow(rowNumber) {
    let row = document.createElement('div');
    row.classList.add('gamerow');
    for (let i = 1; i <= 8; i++) {
        row.appendChild(createSquare(rowNumber, i));
    }
    document.getElementById('gameboard').appendChild(row);
}

/**
 * Function to create checker pieces on given board cell.
 * @param {string} type Decides what color created piece will have.
 * @param {Object} square Determines on what cell piece will be created.
 */
function createChecker(type, square) {
    let checker = document.createElement('div');
    checker.classList.add('checker')


    if (type === 'white') {
        checker.classList.add('white-player')
        whitePiecesList.push(square);
    } else if (type === 'black') {
        checker.classList.add('black-player')
        blackPiecesList.push(square);
    } else {
        console.log('ERROR - Incorrect player type.')
    }
    square.appendChild(checker);
}

/**
 * Function to create checker pieces on given board cell.
 * @param {string} type Decides what color created piece will have.
 * @param {Object} square Determines on what cell piece will be created.
 */
function createQueen(type, square) {
    let queen = document.createElement('div');
    queen.classList.add('queen');


    if (type === 'white') {
        queen.classList.add('white-player');
        whitePiecesList.push(square);
    } else if (type === 'black') {
        queen.classList.add('black-player');
        blackPiecesList.push(square);
    } else {
        console.log('ERROR - Incorrect player type.');
    }
    square.appendChild(queen);
}

/**
 * Function creating cells on gameboard
 * @param {int} rowNumber y position on gameboard.
 * @param {int} squareNumber x position on gameboard.
 */
function createSquare(rowNumber, squareNumber) {
    let square = document.createElement('div');
    let id = squareNumber.toString() + '-' + rowNumber.toString();
    square.id = id;
    square.classList.add('square')
    if ((rowNumber + squareNumber) % 2 === 1) {
        square.classList.add('gamecell');
        if (rowNumber > 0 && rowNumber <= 3) {
            createChecker('white', square);
        } else if (rowNumber > 5 && rowNumber <= 8) {
            createChecker('black', square);
        }


    }
    square.addEventListener('click', function () {
        if (takingPiece != null) {

            if (square.classList.contains('selected') && square !== takingPiece) {
                doBasicMove(square);
                takingPiece = null;
            } else {
                return square;
            }
        } else if ((square.classList.contains('gamecell') && (square.hasChildNodes()))) {
            if (selected.length > 0) {
                clearSelected();
                if (selected[0] === square) {
                    moving = [];
                    return square;
                }
                moving = [];

            }
            if (square.firstChild.classList.contains('black-player')) {
                var pieceIsBlack = true;
            } else if (square.firstChild.classList.contains('white-player')) {
                var pieceIsBlack = false;
            }
            if ((!pieceIsBlack && whiteTurn) || (pieceIsBlack && !whiteTurn)) {
                square.classList.add('selected');
                moving.push(square.firstChild);
                selected.push(square);
                if (square.firstChild.classList.contains('checker')) {
                    showBasicMove(square, pieceIsBlack, false);
                } else if (square.firstChild.classList.contains('queen')) {
                    showQueenMove(square, pieceIsBlack, false);
                }
            }
        } else if (square.classList.contains('selected')) {
            doBasicMove(square);
        } else {
            clearSelected();
            moving = [];
        }
    });
    return square;


}

/**
 * Function to get coordinates of chosen gamecell around coordinates decided by input values.
 * @param {int} row - Row coordinate.
 * @param {int} column - Column coordinate.
 * @param {boolean} checkLeft - Deciding which side(horizontally) of square should be checked.
 * @param {boolean} checkUp  - Deciding which side(vertically) of square should be checked.
 */
function getSurroundingSquare(row, column, checkLeft, checkUp) {
    checkLeft ? column-- : column++;
    checkUp ? row-- : row++;
    let id = column.toString() + '-' + row.toString();
    return document.getElementById(id);
}

/**
 * Function to get coordinates of chosen gamecell around square decided by input values.
 * @param {object} square - Square around which you look.
 * @param {boolean} checkLeft - Deciding which side(horizontally) of square should be checked.
 * @param {boolean} checkUp  - Deciding which side(vertically) of square should be checked.
 */
function getSurroundingSquareBySquare(square, checkLeft, checkUp) {
    let column = parseInt(square.id.substr(0, 1), 10);
    let row = parseInt(square.id.substr(2, 1), 10);
    checkLeft ? column-- : column++;
    checkUp ? row-- : row++;
    let id = column.toString() + '-' + row.toString();
    return document.getElementById(id);
}

/**
 * Function selecting viable moves.
 * @param {object} sideSquare - Square to check.
 * @param {boolean} pieceIsBlack - Boolean deciding type of moving piece.
 * @param {boolean} afterTaking - Boolean deciding if check is done before or after taking check.
 * @param {boolean} isBehind - Boolean deciding if check is on square next checking piece or behind a piece.
 * @returns {boolean} - returns true if the color of piece is opposite, false in any other situation.
 */
function selectCorrectMoves(sideSquare, pieceIsBlack, afterTaking, isBehind) {

    if (!sideSquare.firstChild) {
        if (!afterTaking || afterTaking && isBehind) {
            sideSquare.classList.add('selected');
            selected.push(sideSquare);
            if (afterTaking) {
                pieceCanTake = true;
            }
        }
    } else if (sideSquare.firstChild.classList.contains('white-player') && pieceIsBlack) {
        return true;
    } else if (sideSquare.firstChild.classList.contains('black-player') && !pieceIsBlack) {
        return true;
    }
    return false
}

/**
 * Function that is used to check behind certain square.
 * @param {Object} square - Square around which we check.
 * @param {boolean} checkLeft - Side(horizontally) that should be checked.
 * @param {boolean} checkUp  - Side(vertically) that should be checked.
 * @param {boolean} pieceIsBlack - Boolean deciding what color a piece is.
 * @param {boolean} afterTaking - Boolean deciding if check is done before or after taking check.
 */
function checkBehind(square, checkLeft, checkUp) {
    let sideColumn = parseInt(square.id.substr(0, 1), 10);
    let sideRow = parseInt(square.id.substr(2, 1), 10);
    let behindSquare = getSurroundingSquare(sideRow, sideColumn, checkLeft, checkUp)
    if (!behindSquare.firstChild) {
        behindSquare.classList.add('selected');
        selected.push(behindSquare);
        pieceCanTake = true;
        return true;
    } else {
        return false;
    }

}

/**
 * Function to check all moves of a basic checker piece.
 * @param {Object} square Object around which you are checking possible moves.
 * @param {boolean} pieceIsBlack - Boolean deciding what color a piece is.
 * @param {boolean} afterTaking - Boolean deciding if check is done before or after taking check.
 */
function showBasicMove(square, pieceIsBlack, afterTaking) {
    let column = parseInt(square.id.substr(0, 1), 10);
    let row = parseInt(square.id.substr(2, 1), 10);
    selected.push(square);
    let takeCheck = false;
    if (pieceIsBlack) {
        if (row > 1) {
            /**
             * Checks for move left and behind.
             */
            if (column > 1) {
                /**Gets square to check. */
                let sideSquare = getSurroundingSquare(row, column, true, true);
                /** Checks if it is a piece it can take. */
                let pieceCheck = selectCorrectMoves(sideSquare, true, afterTaking, false)
                /** Checks if space behind piece exists and is empty. */
                if (pieceCheck && row > 2 && column > 2) {
                    if (checkBehind(sideSquare, true, true, pieceIsBlack, afterTaking)) {
                        takeCheck = true;
                    }
                }
            }
            /**
             * Checks for move right and behind.
             */
            if (column < 8) {
                let sideSquare = getSurroundingSquare(row, column, false, true);
                let pieceCheck = selectCorrectMoves(sideSquare, true, afterTaking, false)
                if (pieceCheck && row > 2 && column < 7) {
                    if (checkBehind(sideSquare, false, true, pieceIsBlack, afterTaking)) {
                        takeCheck = true;
                    }
                }
            }
        }
    } else if (!pieceIsBlack) {
        if (row < 8) {
            /**
             * Checks for move left and behind.
             */
            if (column > 1) {
                let sideSquare = getSurroundingSquare(row, column, true, false);
                let pieceCheck = selectCorrectMoves(sideSquare, false, afterTaking, false)
                if (pieceCheck && row < 7 && column > 2) {
                    if (checkBehind(sideSquare, true, false, pieceIsBlack, afterTaking)) {
                        takeCheck = true;
                    }
                }
            }
            /**
             * Checks for move right and behind.
             */
            if (column < 8) {
                let sideSquare = getSurroundingSquare(row, column, false, false);
                let pieceCheck = selectCorrectMoves(sideSquare, false, afterTaking, false)
                if (pieceCheck && row < 7 && column < 7) {
                    if (checkBehind(sideSquare, false, false, pieceIsBlack, afterTaking)) {
                        takeCheck = true;
                    }
                }
            }
        }
    }
    if (!takeCheck) {
        takingPiece = null;
        pieceCanTake = false;
    }

}

/**
 * Function that checks for line of empty gamecells diagonally.
 * @param {object} startingSquare - Square from where a line should start.
 * @param {boolean} checkLeft - Side(horizontally) that should be checked.
 * @param {boolean} checkUp  - Side(vertically) that should be checked.
 */
function showLine(startingSquare, checkLeft, checkUp, afterTaking, isBehind) {
    let cornerColumn;
    let cornerRow;
    (checkLeft) ? cornerColumn = 1 : cornerColumn = 8;
    (checkUp) ? cornerRow = 1 : cornerRow = 8;

    let column = parseInt(startingSquare.id.substr(0, 1), 10);
    let row = parseInt(startingSquare.id.substr(2, 1), 10);
    let checkColumn = column;
    let checkRow = row;
    while (((checkLeft) ? checkColumn > cornerColumn : checkColumn < cornerColumn) && ((checkUp) ? checkRow > cornerRow : checkRow < cornerRow)) {
        let sideSquare = getSurroundingSquare(checkRow, checkColumn, checkLeft, checkUp);
        let sidePiece = sideSquare.firstChild;
        if (sidePiece !== null) {


            return sideSquare;
        }
        sideSquare.classList.add('selected');
        selected.push(sideSquare);
        (checkLeft) ? checkColumn-- : checkColumn++;
        (checkUp) ? checkRow-- : checkRow++;
    }
}

/**
 * Function that clears line of class seelcted
 * @param {object} startingSquare - Square from where a line should start.
 * @param {boolean} checkLeft - Side(horizontally) that should be checked.
 * @param {boolean} checkUp  - Side(vertically) that should be checked.
 */
function clearLine(startingSquare, checkLeft, checkUp) {
    let cornerColumn;
    let cornerRow;
    (checkLeft) ? cornerColumn = 1 : cornerColumn = 8;
    (checkUp) ? cornerRow = 1 : cornerRow = 8;

    let column = parseInt(startingSquare.id.substr(0, 1), 10);
    let row = parseInt(startingSquare.id.substr(2, 1), 10);
    let checkColumn = column;
    let checkRow = row;
    while (((checkLeft) ? checkColumn > cornerColumn : checkColumn < cornerColumn) && ((checkUp) ? checkRow > cornerRow : checkRow < cornerRow)) {
        let sideSquare = getSurroundingSquare(checkRow, checkColumn, checkLeft, checkUp);
        let sidePiece = sideSquare.firstChild;
        if (sidePiece !== null) {
            break;
        }
        sideSquare.classList.remove('selected');
        (checkLeft) ? checkColumn-- : checkColumn++;
        (checkUp) ? checkRow-- : checkRow++;
    }
}

/**
 * Function that is taking care of basic moves of pawns. Also removes pieces when taken.
 * @param {Object} square - Destination square of chosen Piece.
 */
function showQueenMove(square, pieceIsBlack, afterTaking) {
    pieceCanTake = false;
    let checkPiece;
    let checkBehind;
    checkPiece = showLine(square, true, true, afterTaking, false);
    if (checkPiece == undefined && afterTaking) {
        clearLine(square, true, true)

    } else if (checkPiece != null) {
        if (selectCorrectMoves(checkPiece, pieceIsBlack, false, false)) {
            checkBehind = getSurroundingSquareBySquare(checkPiece, true, true);
            if (checkBehind != null) {
                if (checkBehind.firstChild == null) {
                    pieceCanTake = true;
                    showLine(checkPiece, true, true, afterTaking, true);
                } else if (afterTaking) {
                    clearLine(square, true, true)
                    clearLine(checkPiece, true, true);
                }
            }
        } else if (afterTaking) {
            clearLine(square, true, true)

        }
    }
    checkPiece = showLine(square, true, false, afterTaking, false);
    if (checkPiece == undefined && afterTaking) {
        clearLine(square, true, false)

    } else if (checkPiece != null) {
        if (selectCorrectMoves(checkPiece, pieceIsBlack, false, false)) {
            checkBehind = getSurroundingSquareBySquare(checkPiece, true, false);
            if (checkBehind != null) {
                if (checkBehind.firstChild == null) {
                    pieceCanTake = true;
                    showLine(checkPiece, true, false, afterTaking, true);
                } else if (afterTaking) {
                    clearLine(square, true, false)
                    clearLine(checkPiece, true, false);
                }
            }
        } else if (afterTaking) {
            clearLine(square, true, false)

        }
    }
    checkPiece = showLine(square, false, true, afterTaking, false);
    if (checkPiece == undefined && afterTaking) {
        clearLine(square, false, true)

    } else if (checkPiece != null) {
        if (selectCorrectMoves(checkPiece, pieceIsBlack, false, false)) {
            checkBehind = getSurroundingSquareBySquare(checkPiece, false, true);
            if (checkBehind != null) {
                if (checkBehind.firstChild == null) {
                    pieceCanTake = true;
                    showLine(checkPiece, false, true, afterTaking, true);
                } else if (afterTaking) {
                    clearLine(square, false, true)
                    clearLine(checkPiece, false, true);
                }
            }
        } else if (afterTaking) {
            clearLine(square, false, true)

        }
    }
    checkPiece = showLine(square, false, false, false);
    if (checkPiece == undefined && afterTaking) {
        clearLine(square, false, false)

    } else if (checkPiece != null) {
        if (selectCorrectMoves(checkPiece, pieceIsBlack, false, false)) {
            checkBehind = getSurroundingSquareBySquare(checkPiece, false, false);
            if (checkBehind != null) {
                if (checkBehind.firstChild == null) {
                    pieceCanTake = true;
                    showLine(checkPiece, false, false, afterTaking, true);
                } else if (afterTaking) {
                    clearLine(square, false, false)
                    clearLine(checkPiece, false, false);
                }
            }
        } else if (afterTaking) {
            clearLine(square, false, false)

        }
    }
}


/**
 * Function to clear after piece move.
 * @param {int} fromX - From which X the piece moved.
 * @param {int} fromY - From which Y the piece moved.
 * @param {int} toX - To which X the piece is moving.
 * @param {int} toY - To which Y the piece is moving.
 * @returns {boolean} - Whether any piece was removed during clearing
 */
function clearDiagonal(fromX, fromY, toX, toY) {
    let checkX = fromX;
    let checkY = fromY;
    while (checkX !== toX && checkY !== toY) {

        let checkId = checkX.toString() + '-' + checkY.toString();
        let checkSquare = document.getElementById(checkId);
        let checkPiece = checkSquare.firstChild;
        
        if (checkPiece !== null) {
            let pieceIsBlack = checkPiece.classList.contains('black-player')
            pieceIsBlack ? blackPieces-- : whitePieces--;
            let pieceType = pieceIsBlack ? blackPiecesList : whitePiecesList;
            checkPiece.remove()
            return true;
        }
        (fromX > toX) ? checkX-- : checkX++;
        (fromY > toY) ? checkY-- : checkY++;
    }
    return false;
}

/**
 * 
 * @param {*} array - array from which to remove the item
 * @param {*} item - item to remove
 */
function removeItem(array, item) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
            array.splice(i, 1);
        }
    }
}

/**
 * Function for moving pawns.
 * @param {Object} square Square where piece should move.
 */
function doBasicMove(square) {
    numberOfMoves++;
    clearSelected();
    let gamePiece = moving[0];
    let fromSquare = gamePiece.parentNode;

    let pieceIsBlack = gamePiece.classList.contains('black-player');
    let pieceList =  pieceIsBlack? blackPiecesList : whitePiecesList;
    square.appendChild(gamePiece);

    pieceList.push(square);
    pieceIsBlack? blackPiecesList : whitePiecesList = pieceList 


    let fromColumn = parseInt(fromSquare.id.substr(0, 1), 10);
    let fromRow = parseInt(fromSquare.id.substr(2, 1), 10);

    let toColumn = parseInt(square.id.substr(0, 1), 10);
    let toRow = parseInt(square.id.substr(2, 1), 10);

    let pieceCheck = clearDiagonal(fromColumn, fromRow, toColumn, toRow);
    if (pieceCheck && gamePiece.classList.contains('checker')) {
        square.classList.add('selected');
        selected.push(square);
        takingPiece = square;
        showBasicMove(square, square.firstChild.classList.contains('black-player'), true);
    } else if (pieceCheck && gamePiece.classList.contains('queen')) {
        square.classList.add('selected');
        selected.push(square);
        takingPiece = square;
        showQueenMove(square, square.firstChild.classList.contains('black-player'), true);
    }
    if (toRow === 1 && square.firstChild.classList.contains('black-player') && square.firstChild.classList.contains('checker')) {
        square.firstChild.remove();
        createQueen('black', square)
        takingPiece = null;
    }
    if (toRow === 8 && square.firstChild.classList.contains('white-player') && square.firstChild.classList.contains('checker')) {
        square.firstChild.remove();
        createQueen('white', square)
        takingPiece = null;
    }
    if (!pieceCanTake && takingPiece != null) {
        takingPiece = null;
    }

    if (!takingPiece) {
        moving = [];
        clearSelected();
        whiteTurn ? whiteTurn = false : whiteTurn = true;
    }
    updateNumber();

}

function highlightTurn() {
    let currentPlayer = whiteTurn ? whitePiecesList : blackPiecesList;
    let otherPlayer = whiteTurn ? blackPiecesList : whitePiecesList;

    for(let i=0;i<currentPlayer.length;i++){
        
        if(!currentPlayer[i].firstChild){
            removeItem(currentPlayer, currentPlayer[i]);
            i--;
        }else{
            currentPlayer[i].classList.add('highlight');
        }

    };

    for(let i=0;i<otherPlayer.length;i++){
        otherPlayer[i].classList.remove('highlight');
        if(!otherPlayer[i].firstChild){
            removeItem(otherPlayer, otherPlayer[i]);
            i--;
        }
    }
}

/**
 * Function to update Score of players.
 */
function updateNumber() {
    document.getElementById('blackPieces').innerText = localStorage.getItem('Black player') + ' pieces: ' + blackPieces;
    document.getElementById('whitePieces').innerText = localStorage.getItem('White player') + ' pieces: ' + whitePieces;
    document.getElementById('movesNumber').innerText = 'Moves done: ' + numberOfMoves;
    let turn = whiteTurn ? 'White player' : 'Black player';
    highlightTurn();
    document.getElementById('playerTurn').innerText = 'Current turn: ' + localStorage.getItem(turn);
    if (blackPieces === 0) alert('Congratulations ' + localStorage.getItem('White player') + ', you won!');
    if (whitePieces === 0) alert('Congratulations ' + localStorage.getItem('Black player') + ', you won!');

}

document.getElementById("save").addEventListener('click', function () {
    // the .append method will append a new row to a table whose cell is the specified range
    App.writeData();
});


document.getElementById("stats").onclick = function () {
    let src = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTIdx5eBOfeo5RvVBnFnx9B35AOT6O5rde4EvbsRGTg6c8_GR63kPN2YGlYUUVeBUzGJzDeHF1uO4J/pubhtml?gid=1391870681&amp;single=true&amp;widget=true&amp;headers=false&ssdf=";
    const numGen = Math.floor(Math.random() * 1000000);
    let RNGSRC = src + numGen.toString();
    document.getElementById("excel").src = RNGSRC;
    document.getElementById("statistic").style.display = "block";
}

document.getElementsByClassName("close")[0].onclick = function () {
    document.getElementById("statistic").style.display = "none";
}


window.onclick = function (event) {
    if (event.target == document.getElementById("statistic")) {
        document.getElementById("statistic").style.display = "none";
    }
}

document.getElementById("reset").addEventListener('click', function () {
    selected = [];
    moving = [];
    takingPiece;
    whiteTurn = true;
    whitePieces = 12;
    blackPieces = 12;
    pieceCanTake = false;
    numberOfMoves = 0;
    clearBoard();
    createBoard();
    updateNumber();

});

/**
 * Function for receiving names of players for scoreboard.
 * @param {String} playerType - Insert "White player" for prompt for White Player Name and "Black player" for black player name.
 */
function insertPlayerName(playerType) {
    let person = prompt('Please enter ' + playerType + ' name:', playerType);
    let player = person || playerType;
    localStorage.setItem(playerType, player);
}

function createBoard() {
    for (let i = 1; i <= 8; i++) {
        createRow(i);
    }
}

createBoard();

if (localStorage.getItem("Black player") != null) {
    if (window.confirm("On this computer player names have been already set. Do you want to set new ones?")) {
        localStorage.clear();
        insertPlayerName("Black player");
        insertPlayerName("White player");
        updateNumber();
    } else {
        updateNumber();
    }
} else {
    insertPlayerName("Black player");
    insertPlayerName("White player");
    updateNumber();
}

App.handleClientLoad();


