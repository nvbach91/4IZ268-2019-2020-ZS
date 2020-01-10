<?php

function getUser($userid){
  include "db.php";
  $sql = "SELECT username, first_name, last_name FROM users WHERE id=:id";
  $query = $db -> prepare($sql);
  $query -> execute(array(":id"=>$userid));
  $queryresult = $query -> fetchAll();
  $resarr = array();
  foreach ($queryresult as $row) {
    $resarr = [
      "username" => $row["username"],
      "first_name" => $row["first_name"],
      "last_name" => $row["last_name"]
    ];
  }
  return $resarr;
}

function signup($username, $password, $co_password, $first, $last){
  if (
    (empty($username))||
    (empty($password))||
    (empty($co_password))||
    (empty($first))||
    (empty($last)))
  {
    $zprava = "Nejsou vyplněná všechna pole.";
  }
  else {
    if ($password!=$co_password) {
      $zprava = "Zadaná hesla nejsou shodná.";
    }
    else {
      // $query18=$db->prepare((("SELECT * FROM users")));
      // $query18->execute();
      // $queryresult18 = $query18-> fetchAll();
      // foreach ($queryresult18 as $row) {
      //   $usrnamee = $username;
      //   if($row["username"]==$usrnamee){
      //     $zprava = "Uživatel s takovým uživatelským jménem již existuje!";
      //     break;
      //   }
      //   else {

          $_POST["name"] = $first;
          $_POST["surname"] = $last;
          $_POST["user_name"] = $username;
          $_POST["pass_word"] = $password;
          // return "puška";
          include "signupprocess.php";
        // }
      // }
    }
  }
  // return "OKb";
}

function addBlog($title, $content, $author, $date, $location){
  include "db.php";
  $sql = "INSERT INTO blogs (title, content, author, date_of_publishing, location) VALUES(:title, :content, :author, :date_of_publishing, :location)";
  $query = $db->prepare($sql);
  $query->execute(array(":title"=>$title, ":content"=>$content, ":author"=>$author, ":date_of_publishing"=>$date, ":location"=>$location));
}

function getSessionId(){
  session_start();
	include "db.php";
  return $_SESSION["user_id"];
}

function getBlog($blogid){
  include "db.php";
  $sql = "SELECT * FROM blogs WHERE id = :id";
  $query = $db->prepare($sql);
  $query -> execute(array(":id"=>$blogid));
  $queryresult = $query -> fetchAll();
  $resarr = array();
  foreach ($queryresult as $row) {
    $resarr = [
      "id"=>$row["id"],
      "title"=>$row["title"],
      "content"=>$row["content"],
      "author"=>$row["author"],
      "date_of_publishing"=>$row["date_of_publishing"],
      "location"=>$row["location"]
    ];
  }
  return $resarr;
}

function getBlogsByAuthor($author){
  include "db.php";
  $sql = "SELECT * FROM blogs WHERE author = :id ORDER BY length(id),id";
  $query = $db->prepare($sql);
  $query -> execute(array(":id"=>$author));
  $queryresult = $query -> fetchAll();
  $resarr = array();
  $resultarr = array();
  foreach ($queryresult as $row) {
    $resarr = [
      "id"=>$row["id"],
      "title"=>$row["title"],
      "content"=>$row["content"],
      "author"=>$row["author"],
      "date_of_publishing"=>$row["date_of_publishing"],
      "location"=>$row["location"]
    ];
    array_push($resultarr, $resarr);
  }
  return ($resultarr);
}

function getAllBlogs(){
  include "db.php";
  $sql = "SELECT * FROM blogs ORDER BY length(id),id";
  $query = $db->prepare($sql);
  $query -> execute();
  $queryresult = $query -> fetchAll();
  $resarr = array();
  $resultarr = array();
  foreach ($queryresult as $row) {
    $resarr = [
      "id"=>$row["id"],
      "title"=>$row["title"],
      "content"=>$row["content"],
      "author"=>$row["author"],
      "date_of_publishing"=>$row["date_of_publishing"],
      "location"=>$row["location"]
    ];
    array_push($resultarr, $resarr);
  }
  return $resultarr;
}

function updateBlog($blogid, $title, $content, $author, $date, $location){
  include "db.php";
  $sql = "UPDATE blogs SET title=:title, content=:content, author=:author, date_of_publishing=:date_of_publishing, location=:location WHERE id=:id";
  $query = $db -> prepare($sql);
  $query->execute(array(":title"=>$title, ":content"=>$content, ":author"=>$author, ":date_of_publishing"=>$date, ":location"=>$location, ":id"=>$blogid));
}

function removeBlog($blogid){
  include "db.php";
  $sql = "DELETE FROM blogs WHERE id=:id";
  $query = $db -> prepare($sql);
  $query->execute(array(":id"=>$blogid));
}

?>
