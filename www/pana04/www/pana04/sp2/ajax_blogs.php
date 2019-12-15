<?php

include "db_api.php";

if(isset($_POST["operation_type"])){
  if($_POST["operation_type"] == "addition"){
    if(isset($_POST["subject_type"])){
      if($_POST["subject_type"] == "blog"){
        if((isset($_POST["blog_title"]))&&
        (isset($_POST["blog_content"]))&&
        (isset($_POST["blog_author"]))&&
        (isset($_POST["blog_date_of_publishing"]))&&
        (isset($_POST["blog_location"]))){
          addBlog($_POST["blog_title"],$_POST["blog_content"],$_POST["blog_author"],$_POST["blog_date_of_publishing"],$_POST["blog_location"]);
        }
      }
    }
  }
  else if($_POST["operation_type"] == "retrieval"){
    if(isset($_POST["subject_type"])){
      if($_POST["subject_type"] == "blog"){
        if(isset($_POST["blog_id"])){
          echo json_encode(getBlog($_POST["blog_id"]));
          // echo "OK";
        }
      }
      else if($_POST["subject_type"] == "all_blogs"){
        echo json_encode(getAllBlogs());
      }
      else if($_POST["subject_type"] == "blogs_by_author"){
        if(isset($_POST["blog_author"])){
          echo json_encode(getBlogsByAuthor($_POST["blog_author"]));
        }
      }
      else if($_POST["subject_type"] == "user"){
        if(isset($_POST["user_id"])){
          echo json_encode(getUser($_POST["user_id"]));
          // echo JSON_encode(getOK());
          // echo "OK";
        }
      }
    }
  }
  else if($_POST["operation_type"] == "update"){
    if(isset($_POST["subject_type"])){
      if($_POST["subject_type"] == "blog"){
        if((isset($_POST["blog_title"]))&&
        (isset($_POST["blog_content"]))&&
        (isset($_POST["blog_author"]))&&
        (isset($_POST["blog_id"]))&&
        (isset($_POST["blog_date_of_publishing"]))&&
        (isset($_POST["blog_location"]))){
          updateBlog($_POST["blog_id"], $_POST["blog_title"],$_POST["blog_content"],$_POST["blog_author"],$_POST["blog_date_of_publishing"],$_POST["blog_location"]);
        }
      }
    }
  }
  else if($_POST["operation_type"] == "removal"){
    if(isset($_POST["subject_type"])){
      if($_POST["subject_type"] == "blog"){
        if(isset($_POST["blog_id"])){
          removeBlog($_POST["blog_id"]);
        }
      }
    }
  }
}

?>
