<?php
  include "promenne.php";
  // $db = new PDO($host, $uzjmeno, $hslo);
  // $db = new PDO('mysql:host=127.0.0.1;dbname=pana04; charset=utf8', 'pana04', '>gg3k{s*%hiVbUr/*~');
  include "db.php";
  // $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $firstname = stripslashes($_POST['name']);
  $lastname = stripslashes($_POST['surname']);
  $usrname = stripslashes($_POST['user_name']);
  $psswrd = stripslashes($_POST['pass_word']);
  if (!empty($_POST["rememberer_check"])){
    $ischecked = 1;
  }
  else{
    $ischecked = 0;
  }
  // $ident = hash('sha256', $firstname).hash('sha256', $lastname).hash('sha256', $usrname).hash('sha256', $psswrd);
  $db->exec("INSERT INTO users(username, password, first_name, last_name) VALUES ('$usrname', '$psswrd', '$firstname', '$lastname')");
  if($psswrd == $_POST['pass_word']){
    header('Location: signupsuccess.php');
    ob_end_flush();
    exit();
  }
?>
