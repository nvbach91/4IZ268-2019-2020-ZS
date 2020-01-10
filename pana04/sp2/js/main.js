
function openBlogEditor(){
  $(document.getElementById("add-blog-modal")).fadeIn();
}

function textAreaOnInput(object, e){
  for (var i = 0; i < object.parentNode.parentNode.getElementsByClassName("branch-box").length; i++) {
    if(object.parentNode.parentNode.getElementsByClassName("branch-box")[i].parentNode.id == "branch_estabilished"){
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

$(document)
  .ajaxStart(function () {
    console.log("show");
    document.getElementById("spinner").style.display = "block";
  });
$(document)
  .ajaxComplete(function () {
    console.log("hide");
    document.getElementById("spinner").style.display = "none";
  });

function deleteBlog(id){
  var formdata = new FormData();
  // formdata.append("operation_type", "removal");
  // formdata.append("subject_type", "blog");
  // formdata.append("blog_id", id);
  // formdata.append({
  //   "operation_type":"removal",
  //   "subject_type":"blog",
  //   "blog_id":id
  // });
  $.ajax({
    url: "ajax_blogs.php",
    type: "POST",
    // contentType: false,
    // processData: false,
    // async: false,
    data: {
      "operation_type":"removal",
      "subject_type":"blog",
      "blog_id":id
    }
  }).done(function(){
    console.log("deleted");
  });
  formdata.delete("operation_type");
  formdata.delete("subject_type");
  formdata.delete("blog_id");
  formdata = null; delete formdata;
  for (var i = 0; i < document.getElementById("content").getElementsByClassName("blog-card").length; i++) {
    if(document.getElementById("content").getElementsByClassName("blog-card")[i].getAttribute("data-blogid") == id){
      document.getElementById("content").getElementsByClassName("blog-card")[i].style.display = "none";
    }
  }
}

function saveBlog(userid){
  var nadpis = ((document.getElementById("nadpis").value == "")?("-"):(document.getElementById("nadpis").value));
  var obsah = ((document.getElementById("obsah").value == "")?("-"):(document.getElementById("obsah").value));
  var author = "";
  var formdata = new FormData();
  formdata.append("operation_type", "retrieval");
  formdata.append("subject_type", "user");
  formdata.append("user_id", userid);
  $.ajax({
    url: "ajax_blogs.php",
    type: "POST",
    contentType: false,
    processData: false,
    async: false,
    data: formdata,
    success: function(response){
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
      $(document.getElementById("add-blog-modal")).fadeOut();
      for (var i = 0; i < document.getElementById("content").getElementsByClassName("blog-card").length; i++) {
        document.getElementById("content").removeChild(document.getElementById("content").getElementsByClassName("blog-card")[0]);
        i--;
      }
      var allblogs = loadAllBlogs().reverse();
      var userid = getSessionId();
      if(userid === null){// if user is not logged in
        document.getElementById("menubar-but").innerHTML =
          '<a class="menubar-login" onclick="openLoginModal();">'+
            'Přihlasit se'+
          '</a>'+
          '<a class="menubar-signup" href="openSignupModal();">'+
            'Zaregistrovat se'+
          '</a>';
      }
      else {
        document.getElementById("menubar-but").innerHTML =
          '<div class="menubar-avatar" onclick="openLogoutMenu()">'+
            getUser(userid).first_name.substring(0,1).toUpperCase()+getUser(userid).last_name.substring(0,1).toUpperCase()+
          '</div>'+
          '<div class="logout-menu" id="logout-menu" data-open="false" onclick="logout()">'+
            'Log out'+
          '</div>';
        document.getElementById("content").getElementsByClassName("new-blog-container")[0].innerHTML =
          '<div class="new-blog" onclick="openBlogEditor()">'+
            '+ NOVÝ BLOG'+
          '</div>';
        document.getElementById("add-blog-modal").getElementsByClassName("publish-button")[0].setAttribute("onclick", "saveBlog('"+userid+"')");
      }

      //blogs loading
      for (var i = 0; i < allblogs.length; i++) {
        var node = document.createElement("div");
        node.className = "blog-card";
        node.setAttribute("data-blogid", allblogs[i].id);
        node.innerHTML=
          '<div class="blog-card-header">'+
            '<div class="blog-author">'+
              allblogs[i].author+"&nbsp;&nbsp;"+allblogs[i].date_of_publishing.split(" ")[0].split("-")[2]+"."+allblogs[i].date_of_publishing.split(" ")[0].split("-")[1]+"."+allblogs[i].date_of_publishing.split(" ")[0].split("-")[0]+" "+allblogs[i].date_of_publishing.split(" ")[1]+
            '</div>'+
            '<div class="blog-location">'+
              '<img src="img/map_mark.png" alt="" class="blog-location-mark">'+
              '<div class="blog-location-text">'+
                allblogs[i].location+
              '</div>'+
                ((userid != null)?(
                  '<div class="edit-blog">'+
                    'Upravit'+
                  '</div>'+
                  '<div class="remove-blog">'+
                    'Odstranit'+
                  '</div>'
                ):(""))+
            '</div>'+
          '</div>'+
          '<div class="blog-content-header">'+
            allblogs[i].title+
          '</div>'+
          '<div class="blog-content" data-content-short="'+allblogs[i].content.substring(0, 100)+'" data-content-full="'+allblogs[i].content+'">'+
            ((allblogs[i].content.length > 100)?(allblogs[i].content.substring(0, 100)+" ..."):(allblogs[i].content))+
          '</div>'+
          '<div class="blog-footer">'+
            '<div class="blog-more" onclick="moreless(this)" data-dropped="false">'+
            ((allblogs[i].content.length > 100)?("Více"):(""))+
            '</div>'+
            '<div class="blog-soc">'+
              '<img src="img/twitter_logo.png" class="blog-soc-item" alt="">'+
              '<img src="img/facebook_logo.png" class="blog-soc-item-fb" alt="" onclick="FBPost(this.parentNode.parentNode.parentNode.getElementsByClassName(blog-content)[0])">'+
            '</div>'+
          '</div>';

          try {
            node.getElementsByClassName("edit-blog")[0].setAttribute("onclick", "editBlog(this.parentNode.parentNode.parentNode.getAttribute('data-blogid'))");
          } catch (e) {}
          try {
            node.getElementsByClassName("remove-blog")[0].setAttribute("onclick", "deleteBlog(this.parentNode.parentNode.parentNode.getAttribute('data-blogid'))");
          } catch (e) {}
          try {
            node.getElementsByClassName("blog-soc-item")[0].setAttribute("onclick", "tweetTweet(this.parentNode.parentNode.parentNode.getElementsByClassName('blog-content')[0], "+userid+")");
          } catch (e) {}
          document.getElementById("content").appendChild(node);
          document.getElementById("menubar-icon").setAttribute("onclick", "toMain()");
          document.getElementById("add-blog-modal").getElementsByClassName("add-blog-modal-content-container")[0].setAttribute("onclick", "closeBlogModal()");
          document.getElementById("add-blog-modal").getElementsByClassName("add-blog-modal-content")[0].setAttribute("onclick", "event.stopPropagation()");
          document.getElementById("add-blog-modal").getElementsByClassName("add-blog-close")[0].setAttribute("onclick", "closeBlogModal()");
        }
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
  // self.location = location;

}

function tweetTweet(object, userid){
  try {
    var author = "";
    var formdata = new FormData();
    formdata.append("operation_type", "retrieval");
    formdata.append("subject_type", "user");
    formdata.append("user_id", userid);
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
    var url = "https://twitter.com/intent/tweet";
    var text = object.innerHTML.trim().substring(0, 100)+((object.innerHTML.trim().length>100)?("... More: http://sblog.brandars.eu"):(""));
    var hashtags = "Studoblog,VŠE,4IZ268";
    var via = author;
    window.open(url+"?text="+text+";hashtags="+hashtags+";via="+via,"", "width=500,height=300");
  } catch (e) {}
}

function postToWallUsingFBUi(){
  // window.open("https://www.facebook.com/dialog/feed?app_id=2510981755831391&display=popup&link=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https://developers.facebook.com/tools/explorer");
  // FB.api('/me/accounts', function (apiresponse) {
  //             console.log(apiresponse);
  //             var data = {
  //                 message: "mymessage",
  //                 //display: 'iframe',
  //                 caption: "caption",
  //                 picture: 'www.bla.com/image.jpg',
  //                 link: 'www.facebook.com',
  //                 name: "name",
  //                 description: "description",
  //                 to: 2510981755831391,
  //                 from: 2510981755831391,
  //                 access_token: apiresponse.data[0].access_token
  //             };
  //
  //             FB.api('/**APP IP**/feed', 'post', data, function () {
  //                 console.log(arguments);
  //             });
  //         });
}

function FBPost(object){
  postToWallUsingFBUi();
}

function getUser(id){
  var formdata = new FormData();
  formdata.append("operation_type", "retrieval");
  formdata.append("subject_type", "user");
  formdata.append("user_id", id);
  var result = null;
  $.ajax({
    url: "ajax_blogs.php",
    type: "POST",
    contentType: false,
    processData: false,
    async: false,
    data: formdata,
    success: function(response){
      result = JSON.parse(response);
    }
  });
  formdata.delete("operation_type");
  formdata.delete("subject_type");
  formdata = null; delete formdata;
  return result;
}

function getSessionId(){
  var formdata = new FormData();
  formdata.append("operation_type", "retrieval");
  formdata.append("subject_type", "session_id");
  var result = null;
  $.ajax({
    url: "ajax_blogs.php",
    type: "POST",
    contentType: false,
    processData: false,
    async: false,
    data: formdata,
    success: function(response){
      result = JSON.parse(response);
    }
  });
  formdata.delete("operation_type");
  formdata.delete("subject_type");
  formdata = null; delete formdata;
  return result;
}

function loadAllBlogs(){
  var formdata = new FormData();
  formdata.append("operation_type", "retrieval");
  formdata.append("subject_type", "all_blogs");
  var result = null;
  $.ajax({
    url: "ajax_blogs.php",
    type: "POST",
    contentType: false,
    processData: false,
    async: false,
    data: formdata,
    success: function(response){
      result = JSON.parse(response);
    }
  });
  formdata.delete("operation_type");
  formdata.delete("subject_type");
  formdata = null; delete formdata;
  return result;
}

{// textareas automatic resize logic

	function resizeTextarea (object) {
		var a = object;
		a.style.height = 'auto';
		a.style.height = a.scrollHeight+'px';
	}

	function textAreaOnInput(object){
		object.style.borderBottom="1px #3794FC solid";
	}

	function textAreaOnBlur(object){
		object.style.borderBottom="1px #DDD solid";
	}

	function textAreaOnMouseMove(object){
		object.style.borderBottom="1px #BBB solid";
	}

	function textAreaOnMouseOut(object){
		object.style.borderBottom="1px #FFFFFF00 solid";
	}
}

function openLogoutMenu(){
  if(document.getElementById("logout-menu").getAttribute("data-open") == "false"){
    document.getElementById("logout-menu").style.display = "block";
    document.getElementById("logout-menu").setAttribute("data-open", "true");
  }
  else if(document.getElementById("logout-menu").getAttribute("data-open") == "true"){
    document.getElementById("logout-menu").style.display = "none";
    document.getElementById("logout-menu").setAttribute("data-open", "false");
  }
}

function toMain(){
  window.location.href = "index.html";
}

function moreless(object){
  if(object.getAttribute("data-dropped") == "false"){
    var blogcontent = object.parentNode.parentNode.getElementsByClassName("blog-content")[0];
    blogcontent.innerHTML = blogcontent.getAttribute("data-content-full");
    object.innerHTML = "Méně";
    object.setAttribute("data-dropped", "true");
  }
  else if(object.getAttribute("data-dropped") == "true"){
    var blogcontent = object.parentNode.parentNode.getElementsByClassName("blog-content")[0];
    blogcontent.innerHTML = blogcontent.getAttribute("data-content-short");
    object.innerHTML = "Více";
    object.setAttribute("data-dropped", "false");
  }
}

function logout(){
  $.ajax({
    url:"logoutprocess.php",
    contentType: false,
    processData: false
  });
  self.location = location;
}

function closeBlogModal(){
  $(document.getElementById("add-blog-modal")).fadeOut(function(){self.location = location});
}

function openLoginModal(){
  $(document.getElementById("login-modal")).fadeIn();
}

function openSignupModal(){
  $(document.getElementById("signup-modal")).fadeIn();
}

function init(){
  history.pushState({page: 1}, "title 1", "?page=1");
  var allblogs = loadAllBlogs().reverse();
  var userid = getSessionId();
  if(userid === null){// if user is not logged in
    document.getElementById("menubar-but").innerHTML =
      '<a class="menubar-login" onclick="openLoginModal();">'+
        'Přihlasit se'+
      '</a>'+
      '<a class="menubar-signup" onclick="openSignupModal();">'+
        'Zaregistrovat se'+
      '</a>';
  }
  else {
    document.getElementById("menubar-but").innerHTML =
      '<div class="menubar-avatar" onclick="openLogoutMenu()">'+
        getUser(userid).first_name.substring(0,1).toUpperCase()+getUser(userid).last_name.substring(0,1).toUpperCase()+
      '</div>'+
      '<div class="logout-menu" id="logout-menu" data-open="false" onclick="logout()">'+
        'Log out'+
      '</div>';
    document.getElementById("content").getElementsByClassName("new-blog-container")[0].innerHTML =
      '<div class="new-blog" onclick="openBlogEditor()">'+
        '+ NOVÝ BLOG'+
      '</div>';
    document.getElementById("add-blog-modal").getElementsByClassName("publish-button")[0].setAttribute("onclick", "saveBlog('"+userid+"')");
  }

  //blogs loading
  for (var i = 0; i < allblogs.length; i++) {
    var node = document.createElement("div");
    node.className = "blog-card";
    node.setAttribute("data-blogid", allblogs[i].id);
    node.innerHTML=
      '<div class="blog-card-header">'+
        '<div class="blog-author">'+
          allblogs[i].author+"&nbsp;&nbsp;"+allblogs[i].date_of_publishing.split(" ")[0].split("-")[2]+"."+allblogs[i].date_of_publishing.split(" ")[0].split("-")[1]+"."+allblogs[i].date_of_publishing.split(" ")[0].split("-")[0]+" "+allblogs[i].date_of_publishing.split(" ")[1]+
        '</div>'+
        '<div class="blog-location">'+
          '<img src="img/map_mark.png" alt="" class="blog-location-mark">'+
          '<div class="blog-location-text">'+
            allblogs[i].location+
          '</div>'+
            ((userid != null)?(
              '<div class="edit-blog">'+
                'Upravit'+
              '</div>'+
              '<div class="remove-blog">'+
                'Odstranit'+
              '</div>'
            ):(""))+
        '</div>'+
      '</div>'+
      '<div class="blog-content-header">'+
        allblogs[i].title+
      '</div>'+
      '<div class="blog-content" data-content-short="'+allblogs[i].content.substring(0, 100)+'" data-content-full="'+allblogs[i].content+'">'+
        ((allblogs[i].content.length > 100)?(allblogs[i].content.substring(0, 100)+" ..."):(allblogs[i].content))+
      '</div>'+
      '<div class="blog-footer">'+
        '<div class="blog-more" onclick="moreless(this)" data-dropped="false">'+
        ((allblogs[i].content.length > 100)?("Více"):(""))+
        '</div>'+
        '<div class="blog-soc">'+
          '<img src="img/twitter_logo.png" class="blog-soc-item" alt="">'+
          '<img src="img/facebook_logo.png" class="blog-soc-item-fb" alt="" onclick="FBPost(this.parentNode.parentNode.parentNode.getElementsByClassName(blog-content)[0])">'+
        '</div>'+
      '</div>';

      try {
        node.getElementsByClassName("edit-blog")[0].setAttribute("onclick", "editBlog(this.parentNode.parentNode.parentNode.getAttribute('data-blogid'))");
      } catch (e) {}
      try {
        node.getElementsByClassName("remove-blog")[0].setAttribute("onclick", "deleteBlog(this.parentNode.parentNode.parentNode.getAttribute('data-blogid'))");
      } catch (e) {}
      try {
        node.getElementsByClassName("blog-soc-item")[0].setAttribute("onclick", "tweetTweet(this.parentNode.parentNode.parentNode.getElementsByClassName('blog-content')[0], "+userid+")");
      } catch (e) {}
      document.getElementById("content").appendChild(node);
      document.getElementById("menubar-icon").setAttribute("onclick", "toMain()");
      document.getElementById("add-blog-modal").getElementsByClassName("add-blog-modal-content-container")[0].setAttribute("onclick", "closeBlogModal()");
      document.getElementById("add-blog-modal").getElementsByClassName("add-blog-modal-content")[0].setAttribute("onclick", "event.stopPropagation()");
      document.getElementById("add-blog-modal").getElementsByClassName("add-blog-close")[0].setAttribute("onclick", "closeBlogModal()");
  }

}

addEventListener('DOMContentLoaded', init);
