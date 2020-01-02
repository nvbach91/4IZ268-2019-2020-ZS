documentWidth=window.screen.availWidth;
gridContainerWidth=0.92*documentWidth;
cellSideLength=0.18*documentWidth;
cellSapce=0.04*documentWidth;

function getPosTop(i , j){
    return cellSapce+i*(cellSapce+cellSideLength);
}

function getPosLeft(i , j){
    return cellSapce+j*(cellSapce+cellSideLength);
}

//vrací barvy políček s čísly
function getNumberBackgroundColor(number){
    switch(number){
        case 2:return"#B6ED13";break;
        case 4:return"#F2FC3D";break;
        case 8:return"#EE64AB";break;
        case 16:return"#E6BF11";break;
        case 32:return"#D366FE";break;
        case 64:return"#FE8401";break;
        case 128:return"#C15E20";break;
        case 256:return"#198B18";break;
        case 512:return"#B83A1D";break;
        case 1024:return"#980A6A";break;
        case 2048:return"#19B36E";break;
        case 4096:return"#00A3B3";break;
        case 8192:return"black";break;
    }
    return "black";
}

//vrací barvy čísel
function getNumberColor(number){
    if(number<=64)
        return "black";
    return "white";
}

function nospace(board){
    for(var i=0; i<4; i++) {
        for (var j=0; j<4; j++) {
            if(board[i][j]==0)
            return false;
        }
    }
    return true;
}

//deklarace "posunovacích" funkcí
function canMoveLeft(board){
    for(var i=0; i<4; i++) {
        for (var j=1; j<4; j++) {
            if(board[i][j]!=0)
                if(board[i][j-1]==0||board[i][j-1]==board[i][j])
                return true;
        }
    }
    return false;
}

function canMoveUp(board){
    for(var i=1; i<4; i++) {
        for (var j=0; j<4; j++) {
            if(board[i][j]!=0)
                if(board[i-1][j]==0||board[i-1][j]==board[i][j])
                    return true;
        }
    }
    return false;
}

function canMoveRight(board){
    for(var i=0; i<4; i++) {
        for (var j=2;j>-1; j--) {
            if(board[i][j]!=0)
                if(board[i][j+1]==0||board[i][j+1]==board[i][j])
                    return true;
        }
    }
    return false;
}

function canMoveDown(board){
    for(var i= 2;i>-1;i--) {
        for (var j = 0; j < 4; j++) {
            if(board[i][j]!=0)
                if(board[i+1][j]==0||board[i+1][j]==board[i][j])
                    return true;
        }
    }
    return false;
}

function noBlockHorizontal(row,col1,col2,board){
    for(var i=col1+1;i<col2;i++){
        if(board[row][i]!=0){
            return false;
        }
    }
    return true;
}

function noBlockVertical(col,row1,row2,board){
    for(var i=row1+1;i<row2;i++){
        if(board[i][col]!=0){
            return false;
        }
    }
    return true;
}

function nomove(board){
    if(canMoveDown(board)||canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)){
        return false;
    }
    return true;
}

//konec hry
function isgameover(){
    if(nospace(board)&& nomove(board)){
        gameover();
    }
}

//popup
function gameover(){
    alertify.alert("GAMEOVER", "Gameover! Try again!");
}

(function() {
    ("#dialog").dialog();
  } );

//tato část scriptu říká, co dělat, když uživatel chce posunout políčka v hracím poli
//doleva
function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    for(var i= 0 ;i<4;i++) {
        for (var j = 1; j < 4; j++) {
            if(board[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(board[i][k]==0&& noBlockHorizontal(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        break;
                    }
                    else if(board[i][k]==board[i][j]&& noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k])
                    {
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        hasConflicted[i][k]=true;
                        score=score+board[i][k];
                        updateScore(score);
                        break;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

//nahoru
function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(var i= 1 ;i<4;i++) {
        for (var j = 0; j < 4; j++) {
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0&& noBlockVertical(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        break;
                    }
                    else if(board[k][j]==board[i][j]&& noBlockVertical(j,k,i,board)&&!hasConflicted[k][j])
                    {
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        hasConflicted[k][j]=true;
                        score=score+board[k][j];
                        updateScore(score);
                        break;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

//vpravo
function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    for(var i= 0 ;i<4;i++) {
        for (var j = 2; j >-1; j--) {
            if(board[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0&& noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        break;
                    }
                    else if(board[i][k]==board[i][j]&& noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k])
                    {
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        hasConflicted[i][k]=true;
                        score=score+board[i][k];
                        updateScore(score);
                        break;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}

//dolů
function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    for(var i=2 ;i>-1;i--) {
        for (var j = 0; j < 4; j++) {
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0&& noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        break;
                    }
                    else if(board[k][j]==board[i][j]&& noBlockVertical(j,i,k,board)&&!hasConflicted[k][j])
                    {
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        hasConflicted[k][j]=true;
                        score=score+board[k][j];
                        updateScore(score);
                        break;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
