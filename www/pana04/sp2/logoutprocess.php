<?php
  // if($_POST["logoutbtn"]){
    unset($_SESSION["user_id"]);
    session_start();
    session_unset();
    session_destroy();
    header("location:login.html");
    exit();
  // }

?>
