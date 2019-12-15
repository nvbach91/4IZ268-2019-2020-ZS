<?php
  ob_start();
  include "db.php";
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title><?php echo htmlspecialchars("Registrace"); ?></title>
    <link rel="stylesheet" href="css/signup.css">
    <link href= 'https://fonts.googleapis.com/css?family=Product+Sans' rel='stylesheet' />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  </head>
  <body>
    <div class="studoblog-capture">
      STUDOBLOG
    </div>
    <div class="signup-container">
      <!-- <br> -->
      <div class="logo-container">
        <img class="logo" src="img/vse.png" alt="">
      </div>
      <div class="signup-capture">
        <?php echo htmlspecialchars("Registrace"); ?>
      </div>
      <br>
      <form class="" method="post">
        <div class="fields-container">
          <label class="usr_lbl" for="user_name"><?php echo htmlspecialchars("Uživatelské jméno nebo Email"); ?></label>
          <input class="username" type="text" name="user_name" class="user_name" placeholder="petrdvorak@email.cz" value="<?php if (isset($_POST["user_name"])){echo htmlspecialchars($_POST["user_name"],ENT_QUOTES, 'UTF-8');} ?>">

          <label class="pswrd_lbl" for="pass_word"><?php echo htmlspecialchars("Heslo"); ?></label>
          <input class="password"  type="password" name="pass_word" class="pass_word" placeholder="Heslo" value="<?php if (isset($_POST["pass_word"])){echo htmlspecialchars($_POST["pass_word"],ENT_QUOTES, 'UTF-8');} ?>">

          <label class="pswrd_lbl" for="confirm_password"><?php echo htmlspecialchars("Potvrdit heslo"); ?></label>
          <input class="confirm_password"  type="password" name="confirm_password" class="confirm_password" placeholder="Potvrdit heslo" value="<?php if (isset($_POST["confirm_password"])){echo htmlspecialchars($_POST["confirm_password"],ENT_QUOTES, 'UTF-8');} ?>">

          <label class="name_lbl" for="name"><?php echo htmlspecialchars("Jméno"); ?></label>
          <input class="first_name"  type="text" name="name" class="name" placeholder="Petr" value="<?php if (isset($_POST["name"])){echo htmlspecialchars($_POST["name"],ENT_QUOTES, 'UTF-8');} ?>">

          <label class="surname_lbl" for="surname"><?php echo htmlspecialchars("Příjmení"); ?></label>
          <input class="last_name"  type="text" name="surname" class="surname" placeholder=<?php echo htmlspecialchars("Dvořák"); ?> value="<?php if (isset($_POST["surname"])){echo htmlspecialchars($_POST["surname"],ENT_QUOTES, 'UTF-8');} ?>">

        </div>

        <input type="submit" value="Registrovat se" >
        <br>
        <a href="login.php" class="alreadyex"><?php echo htmlspecialchars("Už mám účet"); ?></a>
        <br>

        <?php
          echo "<label class='oznameni'>";
          $zprava = "";
          if (!empty($_POST)){
              if (
                (empty($_POST["user_name"]))||
                (empty($_POST["pass_word"]))||
                (empty($_POST["confirm_password"]))||
                (empty($_POST["name"]))||
                (empty($_POST["surname"])))
                // (empty($_POST["rememberer_check"])))
              {
                $zprava = "Nejsou vyplněná všechna pole.";
              }
              else {
                if ($_POST["pass_word"]!=$_POST["confirm_password"]) {
                  $zprava = "Zadaná hesla nejsou shodná.";
                }
                else {
                  $query18=$db->prepare((("SELECT * FROM users")));
                  $query18->execute();
                  $queryresult18 = $query18-> fetchAll();
                  foreach ($queryresult18 as $row) {
                    $usrnamee = $_POST["user_name"];
                    if($row["username"]==$usrnamee){
                      $zprava = "Uživatel s takovým uživatelským jménem již existuje!";
                      break;
                    }
                    else {
                      include "signupprocess.php";
                    }
                  }
                }
              }
              echo htmlspecialchars($zprava);
          }
          echo "</label>";
        ?>

      </form>
    </div>
  </body>
</html>
