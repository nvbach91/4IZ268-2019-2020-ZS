$(document).ready(function(){
  function initClient() {
    var API_KEY = 'AIzaSyCB1MfUxgLUoNbB5xWVnKSJs_jU54Q_qh8';  // TODO: Update placeholder with desired API key.

    var CLIENT_ID = '668577118204-ad2jp2nlb7oujidod8h8qllp1bkphmu6.apps.googleusercontent.com';  // TODO: Update placeholder with desired client ID.

    // TODO: Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/drive.readonly'
    //   'https://www.googleapis.com/auth/spreadsheets'
    //   'https://www.googleapis.com/auth/spreadsheets.readonly'
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

    gapi.client.init({
      'apiKey': API_KEY,
      'clientId': CLIENT_ID,
      'scope': SCOPE,
      'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
      read_data();
    }
  }

  function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }
  function read_data() {
    var params = {
      // The ID of the spreadsheet to retrieve data from.
      spreadsheetId: '1mxvM2GPfjqYO1iQveRQ04aaBs4ySUM0sdRqc2v0vp1w',  // TODO: Update placeholder value.

      // The A1 notation of the values to retrieve.
      range: 'List 1',  // TODO: Update placeholder value.

      // How values should be represented in the output.
      // The default render option is ValueRenderOption.FORMATTED_VALUE.
      //valueRenderOption: '',  // TODO: Update placeholder value.

      // How dates, times, and durations should be represented in the output.
      // This is ignored if value_render_option is
      // FORMATTED_VALUE.
      // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
      //dateTimeRenderOption: '',  // TODO: Update placeholder value.
    };

    var request = gapi.client.sheets.spreadsheets.values.get(params);
    request.then(function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);
      populateSheet(response.result);
    }, function(reason) {
      console.error('error: ' + reason.result.error.message);
    });
  }
read_data();
  function populateSheet(result) {
    for(var row=0; row<8; row++) {
      for(var col=0; col<3; col++) {
      document.getElementById(row+":"+col).value = result.values[row][col];
      }

    }
  }




  var mines,r,c,id,rows,record;
  var rowcount = 0;
  var colcount = 0;
  var time = 0;
  var timer;
  var level;
  var playing = false;
  var rowcols = "";
  var mineCount = 0;
  var win;
  /*
function loadScores(){
  $.ajax({
  url: "api.php?action=get",
  type: "GET",
  success: function(data) {
      $("#score_records").empty();

      data = JSON.parse(data);
      rows = "";
      for(var i = 0; i < data.length; i++){
        record = data[i];
        rows += "<tr><td>"+record.jmeno + "</td><td>"+record.level + "</td><td>"+ record.cas + "</td></tr>";
      }
      $("#score_records").append(rows);

    }
  });
}
loadScores();

function saveScore(){
  $.ajax({
  url: "api.php?action=post",
  type: "POST",
  data:{
    jmeno:$("#player").val(),
    level:rowcount+"x"+colcount,
    cas:time
  },
  success: function(data) {


    }
  });
}

*/





  $("#start").click(function(){
    rowcount = $("#rowcount").val();
    if(!(rowcount>=10)){
      alert("Zadejte alespoň 10 řádků!");
      return;
    }

    colcount = $("#colcount").val();
    if(!(colcount>=10)){
      alert("Zadejte alespoň 10 sloupců!");
      return;
    }

    level = rowcount*colcount*100;
    $("#gameboard").empty();
    playing =true;
    rowcols = "";
    for(var i=0;i<rowcount;i++){
      rowcols+="<tr>";
      for(var j=0;j<colcount;j++){
        rowcols+="<td id='block_"+(i*colcount+j)+ "' class='block'></td>";
      }
      rowcols+="</tr>";
    }
    $("#gameboard").append(rowcols);

    $(".block").click(function(){
      id = $(this).attr("id");
      id = id.substr(6,id.length-6);
      c = id % colcount;
      r = Math.floor(id / colcount);
      checkBlock(r,c,id);
    })

    $(".block").contextmenu(function(e){
      e.preventDefault();
      $(this).toggleClass("flag");
    })

    startGame();

  })


  function startGame(){
    time = 0;
    $("#time").text(time);

    timer = setInterval(function(){
      time++;
      $("#time").text(time);
    }, 1000);

    mines = [];
    for(var i=0;i<rowcount;i++){
      mines[i] = [];
      for(var j=0;j<colcount;j++){
        mines[i][j] = 0;
        if(Math.random()>0.8){
          mines[i][j] = 1;
        /*  $("#block_"+(i*colcount+j)).css({
            "background-color":"red"
          })*/
        }
      }
    }
    console.log(mines);


  }

  function checkBlock(r,c,id) {
    console.log("Radek:"+r+",sloupec:"+c);
    //Check if the end-user clicked on a mine
  if (mines[r][c] == 1) {
    revealMines();

    playing = false;
    animateBomb(50,1);
  }else if(playing) {
    $("#block_"+id).addClass("clicked");
    mines[r][c] = 2;
    mineCount = 0;
    for (var i=Math.max(r-1,0); i<=Math.min(r+1,rowcount-1); i++) {
      for(var j=Math.max(c-1,0); j<=Math.min(c+1,colcount-1); j++) {
        if (mines[i][j]==1) mineCount++;
      }
    }
    $("#block_"+id).text(mineCount);

    switch(mineCount){
      case 1:
        $("#block_"+id).css({"color":"blue"});
        break;

      case 2:
        $("#block_"+id).css({"color":"green"});
        break;

      case 3:
        $("#block_"+id).css({"color":"red"});
        break;

    }
    if (mineCount==0) {
      $("#block_"+id).text("");
      for (var i=Math.max(r-1,0); i<=Math.min(r+1,rowcount-1); i++) {
        for(var j=Math.max(c-1,0); j<=Math.min(c+1,colcount-1); j++) {
          if (!($("#block_"+(i*colcount+j)).hasClass("clicked")))  checkBlock(i,j,i*colcount+j);
        }
      }
    }
    if(checkWin()){
      return;
    }
  }
}

function checkWin(){
  if(playing){
    win = true;
    for(var i=0;i<rowcount;i++){
      for(var j=0;j<colcount;j++){
        if(mines[i][j] == 0){
          win = false;
        }
      }
    }
    if(win){
      playing = false;
      revealMines();
      alert("Gratuluji! Získal jsi " + level/time + " bodů.");
  //    saveScore();
      setTimeout(function(){
    //    loadScores();
      },500)
    }
    return win;
  }
  return false;

}

function revealMines(){
  clearInterval(timer);
  for(var i=0;i<rowcount;i++){
    for(var j=0;j<colcount;j++){
      if(mines[i][j] == 1){
        $("#block_"+(i*colcount+j)).css({
          "background-color":"red"
        })
      }
    }
  }
}

function animateBomb(size,dir){
  var model = $("#model");
  model.css({"width":size+"%","height":size+"%","left":(100-size)/2+"%","top":(100-size)/2+"%",})
  if(dir == 1){
    size+=1;
  }
  if(dir == 2){
    size-=1;
  }
  if(size==100){
    dir = 2;
  }
  if(dir==2 && size == -1){
    return;
  }
  setTimeout(function(){
    animateBomb(size,dir);
  },20)

}











})
