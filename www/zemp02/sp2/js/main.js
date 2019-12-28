/**
 * Checkers
 */
var selected = [];
var moving = [];
var whiteTurn = true;
var whitePieces = 12;
var blackPieces = 12;


/**
 * Function for clearing selected class.
 */
function clearSelected() {
    selected.forEach(element => {
        element.classList.remove('selected');
    });
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
    } else if (type === 'black') {
        checker.classList.add('black-player')
    } else {
        console.log('ERROR - Incorrect player type.')
    }
    square.appendChild(checker);
}

/**
 * Function creating cells on gameboard
 * @param {int} rowNumber y position on gameboard.
 * @param {int} squareNumber x position on gameboard.
 */
function createSquare(rowNumber, squareNumber) {
    let square = document.createElement('div');
    let id = (squareNumber).toString() + '-' + (rowNumber).toString();
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
        if ((square.classList.contains('gamecell') && (square.hasChildNodes()))) {
            if (selected.length > 0) {
                clearSelected();
                if (selected[0] === square) {
                    selected = [];
                    moving = [];
                    return square;
                }
                selected = [];
                moving = [];

            }
            if((square.firstChild.classList.contains('white-player')&&whiteTurn)||(square.firstChild.classList.contains('black-player')&&! whiteTurn)){
            square.classList.add('selected');
            moving.push(square.firstChild);
            selected.push(square);
            showBasicMove(square);}
        } else if (square.classList.contains('selected')) {
            doBasicMove(square);
            clearSelected();
            selected = [];
        } else {
            clearSelected();
            selected = [];
            moving=[];
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
 * Function selecting viable moves.
 * @param {Object} sideSquare - Square to check.
 * @param {boolean} pieceIsBlack - Boolean deciding type of moving piece.
 */
function SelectCorrectMoves(sideSquare, pieceIsBlack) {

    if (sideSquare.firstChild === null) {
        sideSquare.classList.add('selected');
        selected.push(sideSquare);
    } else if (sideSquare.firstChild.classList.contains('white-player') && pieceIsBlack) {
        return true;
    } else if (sideSquare.firstChild.classList.contains('black-player') && !pieceIsBlack) {
        return true;
    }
    return false
}

/**
 * Function to check all moves of a basic checker piece.
 * @param {Object} square Object around which you are checking possible moves.
 */
function showBasicMove(square) {
    let column = parseInt(square.id.substr(0, 1), 10);
    let row = parseInt(square.id.substr(2, 1), 10);
    selected.push(square);
    if (square.firstChild.classList.contains('black-player')) {
        if (row > 1) {
            if (column > 1) {
                let sideSquare = getSurroundingSquare(row, column, true, true);
                let pieceCheck = SelectCorrectMoves(sideSquare, true)
                if (pieceCheck && row > 2 && column > 2) {
                    let sideColumn = parseInt(sideSquare.id.substr(0, 1), 10);
                    let sideRow = parseInt(sideSquare.id.substr(2, 1), 10);
                    let behindSquare = getSurroundingSquare(sideRow, sideColumn, true, true)
                    SelectCorrectMoves(behindSquare, true);
                }
            }
            if (column < 8) {
                let sideSquare = getSurroundingSquare(row, column, false, true);
                let pieceCheck = SelectCorrectMoves(sideSquare, true)
                if (pieceCheck && row > 2 && column < 7) {
                    let sideColumn = parseInt(sideSquare.id.substr(0, 1), 10);
                    let sideRow = parseInt(sideSquare.id.substr(2, 1), 10);
                    let behindSquare = getSurroundingSquare(sideRow, sideColumn, false, true)
                    SelectCorrectMoves(behindSquare, true);
                }
            }
        }
    } else if (square.firstChild.classList.contains('white-player')) {
        if (row < 8) {
            if (column > 1) {
                let sideSquare = getSurroundingSquare(row, column, true, false);
                let pieceCheck = SelectCorrectMoves(sideSquare, false)
                if (pieceCheck && row < 7 && column > 2) {
                    let sideColumn = parseInt(sideSquare.id.substr(0, 1), 10);
                    let sideRow = parseInt(sideSquare.id.substr(2, 1), 10);
                    let behindSquare = getSurroundingSquare(sideRow, sideColumn, true, false)
                    SelectCorrectMoves(behindSquare, false);
                }
            }
            if (column < 8) {
                let sideSquare = getSurroundingSquare(row, column, false, false);
                let pieceCheck = SelectCorrectMoves(sideSquare, false)
                if (pieceCheck && row < 7 && column < 7) {
                    let sideColumn = parseInt(sideSquare.id.substr(0, 1), 10);
                    let sideRow = parseInt(sideSquare.id.substr(2, 1), 10);
                    let behindSquare = getSurroundingSquare(sideRow, sideColumn, false, false)
                    SelectCorrectMoves(behindSquare, false);
                }
            }
        }
    }

}

/**
 * Function that is taking care of basic moves of pawns. Also removes pieces when taken.
 * @param {Object} square - Destination square of chosen Piece.
 */
function doBasicMove(square) {
    let gamePiece = moving[0];
    let fromSquare = gamePiece.parentNode;
    square.appendChild(gamePiece);
    moving = [];

    let fromColumn = parseInt(fromSquare.id.substr(0, 1), 10);
    let fromRow = parseInt(fromSquare.id.substr(2, 1), 10);

    let checkColumn = fromColumn;
    let checkRow = fromRow;

    let toColumn = parseInt(square.id.substr(0, 1), 10);
    let toRow = parseInt(square.id.substr(2, 1), 10);

    while (checkColumn != toColumn && checkRow != toRow) {
        let checkId = checkColumn.toString() + '-' + checkRow.toString();
        let checkPiece = document.getElementById(checkId).firstChild;
        if (checkPiece != null) {
            checkPiece.classList.contains('black-player') ? blackPieces-- : whitePieces--;
            checkPiece.remove()
        }
        (fromColumn > toColumn) ? checkColumn-- : checkColumn++;
        (fromRow > toRow) ? checkRow-- : checkRow++;
    }
    
    whiteTurn?whiteTurn=false:whiteTurn=true;
    clearSelected();
    updateNumber();
    
}

/**
 * Function to update Score of players.
 */
function updateNumber() {
    document.getElementById('blackPieces').innerText = 'Black player pieces: ' + blackPieces;
    document.getElementById('whitePieces').innerText = 'White player pieces: ' + whitePieces;
    let turn = whiteTurn?'White Player':'Black Player';
    document.getElementById('playerTurn').innerText = 'Current turn: ' + turn;
    if(blackPieces===0)alert('Congratulations white player, you won!');
    if(whitePieces===0)alert('Congratulations black player, you won!');

}


for (let i = 1; i <= 8; i++) {
    createRow(i);
}
updateNumber();