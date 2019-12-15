
<?php

	session_start();
	// if(!isset($_SESSION["user_id"])){
	// 	header('Location: login.php');
	// 	die();
	// }
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
        <img src="img/vse.png" alt="" class="menubar-icon">
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
          <div class="menubar-avatar">
            <?php echo substr(ucfirst(getUser($_SESSION["user_id"])["first_name"]), 0, 1).substr(ucfirst(getUser($_SESSION["user_id"])["last_name"]), 0, 1); ?>
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
          <div class="new-blog" onclick="openBlodEditor()">
            + NOVÝ BLOG
          </div>
          <?php
        }
         ?>
      </div>
      <?php
        $blogs = getAllBlogs();
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
            <div class="blog-content">
              <?php echo $row["content"]; ?>
            </div>
            <div class="blog-footer">
              <div class="blog-more">
                Více
              </div>
              <div class="blog-soc">
                <img src="img/twitter_logo.png" class="blog-soc-item" alt="">
                <img src="img/facebook_logo.png" class="blog-soc-item" alt="">
              </div>
            </div>
          </div>
          <?php
        }
      ?>
    </div>
    <div class="add-blog-modal" id="add-blog-modal" data-onedit="false" data-blogid="">
      <div class="add-blog-modal-content-container">
        <div class="add-blog-modal-content">
          <div class="add-blog-close">
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
            <div class="publish-button" onclick="saveBlog()">
              Zveřejnit
            </div>
          </div>
        </div>
      </div>
    </div>
    <script type="text/javascript">
    function openBlodEditor(){
      $(document.getElementById("add-blog-modal")).fadeIn();
    }

    function textAreaOnInput(object, e){
  		// window.alert()
  		// window.alert(object.parentNode.id);
  		for (var i = 0; i < object.parentNode.parentNode.getElementsByClassName("branch-box").length; i++) {
  			// border: 1px solid #eaf0f7; box-shadow: 0 5px 20px -10px rgba(0,0,0,0.40);
  			if(object.parentNode.parentNode.getElementsByClassName("branch-box")[i].parentNode.id == "branch_estabilished"){
  				// window.alert("OK");
  				object.parentNode.parentNode.getElementsByClassName("branch-box")[i].style.border="1px solid #eaf0f7";
  				object.parentNode.parentNode.getElementsByClassName("branch-box")[i].style.boxShadow = "0 5px 20px -10px rgba(0,0,0,0.40)";
  			}
  			else{
  				object.parentNode.parentNode.getElementsByClassName("branch-box")[i].style.border="1px #FFF solid";
  				object.parentNode.parentNode.getElementsByClassName("branch-box")[i].style.boxShadow = "2px 2px 20px -10px rgba(0,0,0,0.10)";
  			}

  		}
      object.style.border="1px #3794fc20 solid";
  		object.style.borderRadius = "4px";
      object.style.boxShadow = "2px 2px 20px -10px  #3794fc60";
  		e = e || window.event;
  		var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
  		var charStr = String.fromCharCode(charCode);
  		if (/\d/.test(charStr)) {
  				return false;
  		}
  		var isHourField = ((object.getAttribute("type")=="hour")?(true):(false));
  		var isMinuteField = ((object.getAttribute("type")=="minute")?(true):(false));

  		if(isMinuteField){
  			if(parseInt(object.value)>59){
  				object.value = 59;
  				e.preventDefault();
  			}
  		}
  		if(isHourField){
  			if(parseInt(object.value)>23){
  				object.value = 23;
  				object.parentNode.getElementsByTagName("textarea")[1].value = 59;
  				e.preventDefault();
  			}
  		}
  		if((parseInt(object.value)>0)&&(object.value[0]=="0")){
  			object.value = object.value.substr(1, object.value.length-1);
  		}
  		object.value = (object.parentNode.id == "branch_address")?(object.value):(object.value.replace("000", "00"));
    }

    function textAreaOnBlur(object){
  		if(object.parentNode.id != "branch_estabilished"){
  			object.style.border="1px #DDD solid";
  	    object.style.boxShadow = "2px 2px 20px -10px rgba(0,0,0,0.10)";
  			if(object.parentNode.getElementsByClassName("branch-box-placeholder").length != 0){
  				if(object.value == ""){
  					$(object.parentNode.getElementsByClassName("branch-box-placeholder")[0]).animate({
  						top: "2px",
  						opacity: 0.6,
  						"font-size": "20px",
  					}, 150)
  				}
  			}
  		}
    }

    function textAreaOnMouseMove(object){
      object.style.border="1px #3794fc20 solid";
      object.style.boxShadow = "2px 2px 20px -10px #3794fc60";
    }

    function textAreaOnMouseOut(object){
      object.style.border="1px #FFF solid";
      object.style.boxShadow = "2px 2px 20px -10px rgba(0,0,0,0.10)";
    }

    function editBlog(id){
      var formdata = new FormData();
      formdata.append("operation_type", "retrieval");
      formdata.append("subject_type", "blog");
      formdata.append("blog_id", id);
      $(document.getElementById("add-blog-modal")).fadeIn();
      document.getElementById("add-blog-modal").setAttribute("data-onedit", "true");
      document.getElementById("add-blog-modal").setAttribute("data-blogid", id);
      $.ajax({
        url:"ajax_blogs.php",
        type: "POST",
        contentType: false,
        processData: false,
        async: false,
        data: formdata,
        success: function(response){
          var returnedData = JSON.parse(response);
          document.getElementById("nadpis").value = returnedData.title;
          document.getElementById("obsah").value = returnedData.content;
        }
      });
      formdata.delete("operation_type");
      formdata.delete("subject_type");
      formdata.delete("blog_id");
      formdata = null; delete formdata;
    }

    function deleteBlog(id){
      var formdata = new FormData();
      formdata.append("operation_type", "removal");
      formdata.append("subject_type", "blog");
      formdata.append("blog_id", id);
      $.ajax({
        url: "ajax_blogs.php",
        type: "POST",
        contentType: false,
        processData: false,
        async: false,
        data: formdata,
        success: function(response){
          // window.alert(response);
        }
      });
      formdata.delete("operation_type");
      formdata.delete("subject_type");
      formdata.delete("blog_id");
      formdata = null; delete formdata;
      self.location = location;
    }

    function saveBlog(){
      // window.alert("OK");
      var nadpis = ((document.getElementById("nadpis").value == "")?("-"):(document.getElementById("nadpis").value));
      var obsah = ((document.getElementById("obsah").value == "")?("-"):(document.getElementById("obsah").value));
      var author = "";
      var formdata = new FormData();
      formdata.append("operation_type", "retrieval");
      formdata.append("subject_type", "user");
      formdata.append("user_id", <?php echo $_SESSION["user_id"]; ?>);
      // window.alert(formdata.get("user_id"));
      $.ajax({
        url: "ajax_blogs.php",
        type: "POST",
        contentType: false,
        processData: false,
        async: false,
        data: formdata,
        success: function(response){
          // window.alert(response);
          var returnedData = JSON.parse(response);
          author = returnedData.first_name+" "+returnedData.last_name;
        }
      });
      formdata.delete("operation_type");
      formdata.delete("subject_type");
      formdata.delete("user_id");
      formdata = null; delete formdata;
      var date = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
      var loc = "";
      $.ajax({
        url: 'http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,currency,isp,org,as,query',
        type: "POST",
        async: false,
        contentType: false,
        processData: false,
        success: function (response) {
            // window.alert(JSON.stringify(response));
  					let geolocation_as = response.as.toString();
  					let geolocation_city = response.city.toString();
  					let geolocation_country = response.country.toString();
  					let geolocation_countryCode = response.countryCode.toString();
  					let geolocation_isp = response.isp.toString();
  					let geolocation_latitude = response.lat.toString();
  					let geolocation_longitude = response.lon.toString();
  					let geolocation_org = response.org.toString();
  					let geolocation_query = response.query.toString();
  					let geolocation_region = response.region.toString();
  					let geolocation_regionName = response.regionName.toString();
  					let geolocation_status = response.status.toString();
  					let geolocation_timezone = response.timezone.toString();
  					let geolocation_currency = response.currency.toString();
  					let geolocation_zip = response.zip.toString();
  					loc = geolocation_city + ", "	+ geolocation_country;
        },
      });
      var formdata = new FormData();
      formdata.append("operation_type", ((document.getElementById("add-blog-modal").getAttribute("data-onedit") == "true")?("update"):("addition")));
      formdata.append("subject_type", "blog");
      formdata.append("blog_title", nadpis);
      formdata.append("blog_content", obsah);
      formdata.append("blog_author", author);
      formdata.append("blog_date_of_publishing", date);
      formdata.append("blog_location", loc);
      if (document.getElementById("add-blog-modal").getAttribute("data-onedit") == "true") {
        formdata.append("blog_id", document.getElementById("add-blog-modal").getAttribute("data-blogid"));
      }
      $.ajax({
        url: "ajax_blogs.php",
        type: "POST",
        contentType: false,
        processData: false,
        async: false,
        data: formdata,
        success: function(response){
          // window.alert(response);
        }
      });
      formdata.delete("operation_type");
      formdata.delete("subject_type");
      formdata.delete("blog_title");
      formdata.delete("blog_content");
      formdata.delete("blog_author");
      formdata.delete("blog_date_of_publishing");
      formdata.delete("blog_location");
      formdata = null; delete formdata;
      self.location = location;
    }
    </script>
  </body>
</html>
