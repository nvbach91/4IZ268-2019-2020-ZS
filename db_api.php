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

function addBlog($title, $content, $author, $date, $location){
  include "db.php";
  $sql = "INSERT INTO blogs (title, content, author, date_of_publishing, location) VALUES(:title, :content, :author, :date_of_publishing, :location)";
  $query = $db->prepare($sql);
  $query->execute(array(":title"=>$title, ":content"=>$content, ":author"=>$author, ":date_of_publishing"=>$date, ":location"=>$location));
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
