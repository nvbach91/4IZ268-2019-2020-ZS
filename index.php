
<?php

	session_start();
	include "db.php";
  include "db_api.php";

	// Localization'
	// include "loc/en-us.php";
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>STUDOBLOG - Hlavní stránka</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel='icon' href='img/favicon.ico' type='image/x-icon'/>
    <link href= 'https://fonts.googleapis.com/css?family=Product+Sans' rel='stylesheet' />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  </head>
  <body>
    <div class="menubar">
      <div class="menubar-header">
        <img src="img/vse.png" alt="" class="menubar-icon" onclick="toMain()">
        <div class="menubar-capture">
          STUDOBLOG
        </div>
      </div>
      <div class="menubar-but">
        <?php
        if(!isset($_SESSION["user_id"])){
          ?>
          <a class="menubar-login" href="login.php">
            Přihlasit se
          </a>
          <a class="menubar-signup" href="signup.php">
            Zaregistrovat se
          </a>
          <?php
        }
        else {
          ?>
          <div class="menubar-avatar" onclick="openLogoutMenu()">
            <?php echo substr(ucfirst(getUser($_SESSION["user_id"])["first_name"]), 0, 1).substr(ucfirst(getUser($_SESSION["user_id"])["last_name"]), 0, 1); ?>
          </div>
					<div class="logout-menu" id="logout-menu" data-open="false" onclick="logout()">
						Log out
					</div>
          <?php
        }
         ?>
      </div>
    </div>
    <div class="content">
      <div class="new-blog-container">
        <?php
        if(isset($_SESSION["user_id"])){
          ?>
          <div class="new-blog" onclick="openBlogEditor()">
            + NOVÝ BLOG
          </div>
          <?php
        }
         ?>
      </div>
      <?php
        $blogs = array_reverse(getAllBlogs());
        foreach ($blogs as $row) {
          ?>
          <div class="blog-card" data-blogid=<?php echo $row["id"]; ?>>
            <div class="blog-card-header">
              <div class="blog-author">
                <?php echo $row["author"]."&nbsp;&nbsp;".explode("-",explode(" ", $row["date_of_publishing"])[0])[2].".".explode("-",explode(" ", $row["date_of_publishing"])[0])[1].".".explode("-",explode(" ", $row["date_of_publishing"])[0])[0]."&nbsp;&nbsp;".explode(" ", $row["date_of_publishing"])[1]; ?>
              </div>
              <div class="blog-location">
                <img src="img/map_mark.png" alt="" class="blog-location-mark">
                <div class="blog-location-text">
                  <?php echo $row["location"]; ?>
                </div>
                <?php
                  if(isset($_SESSION["user_id"])){
                    ?>
                    <div class="edit-blog" onclick="editBlog(this.parentNode.parentNode.parentNode.getAttribute('data-blogid'))">
                      Upravit
                    </div>
                    <div class="remove-blog" onclick="deleteBlog(this.parentNode.parentNode.parentNode.getAttribute('data-blogid'))">
                      Odstranit
                    </div>
                    <?php
                  }
                ?>
              </div>
            </div>
            <div class="blog-content-header">
              <?php echo $row["title"]; ?>
            </div>
            <div class="blog-content" data-content-short="<?php echo substr($row["content"], 0, 100)." ..."; ?>" data-content-full="<?php echo $row["content"]; ?>">
              <?php echo ((strlen($row["content"])>100)?(substr($row["content"], 0, 100)." ..."):(substr($row["content"], 0, 100))); ?>
            </div>
            <div class="blog-footer">
							<div class="blog-more" onclick="moreless(this)" data-dropped="false">
							<?php
								if(strlen($row["content"])>100){
									?>Vice<?php
								}
							?>
              </div>
              <div class="blog-soc">
                <img src="img/twitter_logo.png" class="blog-soc-item" alt="" onclick="tweetTweet(this.parentNode.parentNode.parentNode.getElementsByClassName('blog-content')[0], <?php echo $_SESSION["user_id"]; ?>)">
                <img src="img/facebook_logo.png" class="blog-soc-item-fb" alt="" onclick="FBPost(this.parentNode.parentNode.parentNode.getElementsByClassName('blog-content')[0])">
              </div>
            </div>
          </div>
          <?php
        }
      ?>
    </div>
    <div class="add-blog-modal" id="add-blog-modal" data-onedit="false" data-blogid="">
      <div class="add-blog-modal-content-container" onclick="closeBlogModal()">
        <div class="add-blog-modal-content" onclick="event.stopPropagation()">
          <div class="add-blog-close" onclick="closeBlogModal()">
            &times;
          </div>
          <div class="add-blog-header">
            Nový blog
          </div>
          <div class="add-blog-title-label">
            NÁDPIS
          </div>
          <textarea id="nadpis" class="add-blog-title" rows='1' data-min-rows='1' contenteditable="true"  onkeyup="resizeTextarea(this);" oninput="textAreaOnInput(this, event);" onfocus="textAreaOnInput(this, event)" onblur="textAreaOnBlur(this)" onmousedown="textAreaOnInput(this, event)"></textarea>
          <div class="add-blog-title-label">
            OBSAH
          </div>
          <textarea id="obsah" class="add-blog-obsah" rows='1' data-min-rows='1' contenteditable="true"  onkeyup="resizeTextarea(this);" oninput="textAreaOnInput(this, event);" onfocus="textAreaOnInput(this, event)" onblur="textAreaOnBlur(this)" onmousedown="textAreaOnInput(this, event)"></textarea>
          <div class="publish-button-container">
            <div class="publish-button" onclick="saveBlog(<?php echo $_SESSION["user_id"]; ?>)">
              Zveřejnit
            </div>
          </div>
        </div>
      </div>
    </div>
    <script type="text/javascript" src="js/main.js"></script>
  </body>
</html>
