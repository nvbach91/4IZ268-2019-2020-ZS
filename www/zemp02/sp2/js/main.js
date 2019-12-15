/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */
var selected = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createRow(rowNumber) {
    let row = document.createElement('div');
    row.classList.add('gamerow');
    for (let i = 1; i <= 8; i++) {
        row.appendChild(createSquare(rowNumber, i));
    }
    document.getElementById('gameboard').appendChild(row);
}

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

function createSquare(rowNumber, squareNumber) {
    let square = document.createElement('div');
    let id = (rowNumber).toString() + '-' + (squareNumber).toString();
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
    square.addEventListener('click', async function () {
        if ((square.classList.contains('gamecell') && (square.hasChildNodes()))) {
            square.classList.add('selected');
            if (selected.length > 0) {
                selected.forEach(element => {
                    element.classList.remove('selected');
                });
                selected = [];
            }
            selected.push(square);
            selectBasicMove(square);
        } else {
            selected.forEach(element => {
                element.classList.remove('selected');
            });

        }
    });
    return square;


}

function selectBasicMove(square) {
    let row = parseInt(square.id.substr(0, 1), 10);
    let column = parseInt(square.id.substr(2, 1), 10);
    if (square.firstChild.classList.contains('black-player')) {
        if (row > 1) {
            rowCheck = row - 1;
            if (column > 1) {
                let idLeft = rowCheck.toString() + '-' + (column - 1).toString();
                let squareLeft = document.getElementById(idLeft);
                if (squareLeft.firstChild === null) {
                    squareLeft.classList.add('selected');
                    selected.push(squareLeft);
                }
            }
            if (column < 8) {
                let idRight = rowCheck.toString() + '-' + (column + 1).toString();
                let squareRight = document.getElementById(idRight);
                if (squareRight.firstChild === null) {
                    squareRight.classList.add('selected');
                    selected.push(squareRight);
                }
            }
        }
    } else if (square.firstChild.classList.contains('white-player')) {
        if (row < 8) {
            rowCheck = row + 1;
            if (column > 1) {
                let idLeft = rowCheck.toString() + '-' + (column - 1).toString();
                let squareLeft = document.getElementById(idLeft);
                if (squareLeft.firstChild === null) {
                    squareLeft.classList.add('selected');
                    selected.push(squareLeft);
                }
            }
            if (column < 8) {
                let idRight = rowCheck.toString() + '-' + (column + 1).toString();
                let squareRight = document.getElementById(idRight);
                if (squareRight.firstChild === null) {
                    squareRight.classList.add('selected');
                    selected.push(squareLeft);
                }
            }
        }
    }

}

for (let i = 1; i <= 8; i++) {
    createRow(i);
}