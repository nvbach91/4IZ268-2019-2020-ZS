//načtení herního pole
var board= new Array();
var score=0;
var hasConflicted =new Array();

var startx=0;
var starty=0;
var endx=0;
var endy=0;

//první spuštění hry
$(document).ready(function () {
   prepareNew();
    newgame();
});

function prepareNew(){
    if(documentWidth>500){
        gridContainerWidth=500;
        cellSpace=20;
        cellSideLength=100;
    }

//vygenerování prvních dvou čísel
function newgame() {
    init();
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for(var i=0; i<4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#box-cell-"+ i +"-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }
    for(var i=0; i<4; i++) {
        board[i]=new Array();
        hasConflicted[i]=new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j]=0;
            hasConflicted[i][j]=false;
        }
    }
    updateBoardView();
    score=0;
}

//funkce na aktualizaci skóre v levé části obrazovky
function updateScore(score){
    $("#score").text(score);
}
