<?php
  include "promenne.php";
  session_start();
  $username_log = $_POST["username"];
  $password_log = $_POST["password"];


  $username_log = stripslashes($username_log);
  $password_log = stripslashes($password_log);

  include "db.php";

  $usrid = "";
  $user = "";
  $pass = "";
  $user_first_name = "";
  $user_last_name = "";

  $sql = 'SELECT * FROM Users WHERE username = :usr   AND password =  :psw ';
  $query = $db->prepare($sql);
  $query -> execute(array(":usr"=>$username_log, ":psw"=>$password_log));
  $queryresult = $query -> fetchAll();
  if(count($queryresult) == 0){
    $sql = 'SELECT * FROM Subordinates WHERE username = :usr   AND password =  :psw ';
    $query = $db->prepare($sql);
    $query -> execute(array(":usr"=>$username_log, ":psw"=>$password_log));
    $queryresult = $query -> fetchAll();
  }
  foreach ($queryresult as $row) {
    $user = $row["username"];
    $pass = $row["password"];
    $usrid = $row["id"];
    // echo $username_log.$password_log;

    // $user_first_name = $row["jmeno"];
    // $user_last_name = $row["prijmeni"];
  }

  // $result = $resultPDO->fetchAll();
  // print_r($result);

  if($user==$username_log && $pass==$password_log){
    $_SESSION['user_id'] = $usrid;
    $_SESSION['user_nm'] = $user;
    $_SESSION['user_ps'] = $pass;
    $_SESSION['user_first'] = $user_first_name;
    $_SESSION['user_last'] = $user_last_name;
    if (!(empty($_POST["rememberer"]))){
      setcookie("cook_name", $username_log, time()+3600);
      setcookie("cook_password", $password_log, time()+3600);
    }
    header('Location: index.php');
    exit();
  }
  else{
    $zprava = "";
    // $zprava = "Nesprávné uživatelské jméno nebo heslo.";
  }
  ?>
