<?php
  ob_start();
  include "en-us.php";

?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=no">
    <link rel="stylesheet" href="css/login.css">
    <title>STUDOBLOG - Přihlášení</title>
    <link href= 'https://fonts.googleapis.com/css?family=Product+Sans' rel='stylesheet' />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  </head>
  <body>
    <form class="content-form" method="post">
      <div class="studoblog-capture">
        STUDOBLOG
      </div>
      <div class="left-side">
        <div class="logo-container">
          <img class="logo" src="img/vse.png" alt="">
        </div>
        <div class="inputs-container">
          <div class="login-label">
            PŘIHLÁŠENÍ
          </div>
          <div class="field-container">
            <div class="field-label">
              Email
            </div>
            <input type="text" name="username" id="username" placeholder=""
            <?php
              echo "value='";
              if (isset($_COOKIE["cook_name"])) {
                echo htmlspecialchars($_COOKIE["cook_name"],ENT_QUOTES, 'UTF-8');
              }
              else {
                if(isset($_POST["username"])) {
                  echo htmlspecialchars($_POST["username"], ENT_QUOTES, 'UTF-8');
                }
              }
              echo "'";
            ?>>
          </div>
          <div class="field-container" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
            <div class="field-label">
              Heslo
            </div>
            <div class="show-password-container" onclick="showPasswordClick();">
              <!-- <div class="show-password-icon"> -->
                <img src="img/view-1.svg" alt="" class="show-password-icon">
              <!-- </div> -->
              <div class="show-password-label">
                Show
              </div>
            </div>
            <input type="password" name="password" placeholder="" id="password"
            <?php
              echo "value='";
              if (isset($_COOKIE["cook_password"])) {
                echo htmlspecialchars($_COOKIE["cook_password"],ENT_QUOTES, 'UTF-8');
              }
              else {
                if(isset($_POST["password"])) {
                  echo htmlspecialchars($_POST["password"], ENT_QUOTES, 'UTF-8');
                }
              }
              echo "'";
            ?>>
          </div>
          <div class="choose-checkbox" checked="false" onclick="chooseCheckboxClick(this); allBranchesChoosenClick(this)">
            <div class="choose-checkbox-tick"></div>
            <div class="choose-checkbox-title">
              Remember me
            </div>
          </div>
          <div class="submit-container">
            <input type="submit" name="submt" value="Log in" class="submt" onmousedown = "btnOnMouseDown(this)">
            <input type="submit" name="snsubmit" value=" " class="snbtn" title="Log in with social network account" style="display:none;">
          </div>

          <?php
            echo "<div style='text-align:center; padding-top: 10px;'><label class='oznameni-lbl' style= 'margin-top: 20px; color: red;'>";
            $zprava = "";
            if (isset($_POST["submt"])){
              if (
                (empty($_POST["username"]))||
                (empty($_POST["password"])))
              {
                $zprava = $capt_wrong_username_or_password_signin;
              }
              else {
                include "loginprocess.php";
              }
              echo $zprava;
            }
            echo "</label></div>";
          ?>
        </div>
      </div>

    </form>

  </body>
  <script type="text/javascript">

    function btnOnMouseDown(object){
      // object.style = "background-image:linear-gradient(to bottom left, #155292,#4677b5);";
    }

    function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    function showPasswordClick(){
      if(document.getElementById("password").type == "password"){
        document.getElementById("password").type = "text";
        document.getElementById("password").parentNode.getElementsByClassName("show-password-container")[0].getElementsByClassName("show-password-label")[0].innerHTML = "Hide";
      }
      else if(document.getElementById("password").type == "text"){
        document.getElementById("password").type = "password";
        document.getElementById("password").parentNode.getElementsByClassName("show-password-container")[0].getElementsByClassName("show-password-label")[0].innerHTML = "Show";
      }
    }

    function chooseCheckboxClick(object){
			if(object.getAttribute("checked") == "false"){
				object.setAttribute("checked", "true");
				object.getElementsByClassName("choose-checkbox-tick")[0].innerHTML = "✓";
				object.getElementsByClassName("choose-checkbox-tick")[0].style.color = "#FFF";
				object.getElementsByClassName("choose-checkbox-tick")[0].style.background = "#3794FC";
				object.getElementsByClassName("choose-checkbox-tick")[0].style.border = "1px #FFF solid";
			}
			else if(object.getAttribute("checked") == "true"){
				object.setAttribute("checked", "false");
				object.getElementsByClassName("choose-checkbox-tick")[0].innerHTML = "";
				object.getElementsByClassName("choose-checkbox-tick")[0].style.color = "#FFF";
				object.getElementsByClassName("choose-checkbox-tick")[0].style.background = "#3794FC";
				object.getElementsByClassName("choose-checkbox-tick")[0].style.border = "1px #FFF solid";
			}
		}

    var key = 1;

    var arr = [
      (new Image()).src=("url(img/facebook_logo.png)"),
      (new Image()).src=("url(img/twitter_logo.png)"),
      (new Image()).src=("url(img/linkedin_logo.png)"),
      (new Image()).src=("url(img/google_plus_logo.png)")
    ];

    function randomLogoLoad(){
      // document.title = "OK";

      // document.title="OK";
      // key=2;
      var x = document.getElementsByClassName("snbtn");
      // var rndint = getRndInteger(0, arr.length-1);
      x[0].style.backgroundImage = arr[key];
      x[0].style.backgroundRepeat = "no-repeat";
      x[0].style.backgroundSize = "cover";

      if (key<arr.length-1){
        key++;
      }
      else{
        key=0;
      }
    }

    setInterval(randomLogoLoad, 2500);

  </script>
</html>
