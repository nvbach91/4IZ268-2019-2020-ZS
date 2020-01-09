//hlavní část scriptu
//načtení herního pole
var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

//první spuštění hry
$(document).ready(function () {
   prepareNew();
    newgame();
});

function prepareNew() {
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }
}

//vygenerování prvních dvou čísel
function newgame() {
    init();
    generateOneNumber();
    generateOneNumber();
    updateScore(0);
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-"+ i +"-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    updateBoardView();
    score = 0;
}

function updateBoardView() {
    $(".number-cell").remove();
    for(var i = 0 ;i < 4;i++) {
        for (var j = 0; j < 4; j++) {
           $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $("#number-cell-"+ i +"-" + j);

            if(board[i][j] == 0) {
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+cellSideLength*0.5);
                theNumberCell.css('left',getPosLeft(i,j)+cellSideLength*0.5);
                theNumberCell.text("");
            }
            else {
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.6*cellSideLength+'px');
}

function generateOneNumber() {
        if(noSpace(board)) {
        return false;
        }
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    var times = 0;
    while (times < 50){
        if (board[randx][randy] == 0)
            break;
        var randx=parseInt(Math.floor(Math.random()*4));
        var randy=parseInt(Math.floor(Math.random()*4));
        times++;
    }
    if(times == 50) {
         for(var i = 0; i < 4; i++) {
             for(var j = 0; j < 4; j++) {
                 if(board[i][j] == 0) {
                     randx=i;
                     randy=j;
                 }
             }
         }
    }
    var randNumber=Math.random()<0.5? 2 : 4;
    board[randx][randy] = randNumber;
    showNumber(randx,randy,randNumber);
    return true;
}


//funkce, zajišťující posouvání políček v hracím poli
$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37:  //doleva
            event.preventDefault();
            if(moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 38:  //nahoru
            event.preventDefault();
            if(moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 39:  //doprava
            event.preventDefault();
            if(moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 40:   //dolů
            event.preventDefault();
            if(moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        default:
            break;
    }
});

//tato část skriptu zobrazuje číselná políčka v gridu
function showNumber(i,j,randNumber) {
    var numberCell=$("#number-cell-"+ i +"-" + j);
    numberCell.css('background-color',getNumberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    numberCell.text(randNumber);

//tato část funkce umožňuje správné zobrazení nově vygenerovaného políčka s číslem
    numberCell.animate( {
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    }, 50);
}


//funkce umožňující pohyb políček s čísly a jejich animaci
function showMoveAnimation(fromx,fromy,tox,toy) {
    var numberCell=$("#number-cell-"+fromx+"-"+fromy);
    numberCell.animate( {
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    }, 200);
}

//funkce na aktualizaci skóre v levé části obrazovky
function updateScore(score) {
    $("#score").text(score);
}
