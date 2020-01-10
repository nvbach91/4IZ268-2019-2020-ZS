function btnOnMouseDown(object){
  // object.style = "background-image:linear-gradient(to bottom left, #155292,#4677b5);";
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function showPasswordClick(){
  if(document.getElementById("password").type == "password"){
    document.getElementById("password").type = "text";
    document.getElementById("password").parentNode.getElementsByClassName("show-password-container")[0].getElementsByClassName("show-password-label")[0].innerHTML = "Hide";
  }
  else if(document.getElementById("password").type == "text"){
    document.getElementById("password").type = "password";
    document.getElementById("password").parentNode.getElementsByClassName("show-password-container")[0].getElementsByClassName("show-password-label")[0].innerHTML = "Show";
  }
}

function chooseCheckboxClick(object){
  if(object.getAttribute("checked") == "false"){
    object.setAttribute("checked", "true");
    object.getElementsByClassName("choose-checkbox-tick")[0].innerHTML = "✓";
    object.getElementsByClassName("choose-checkbox-tick")[0].style.color = "#FFF";
    object.getElementsByClassName("choose-checkbox-tick")[0].style.background = "#3794FC";
    object.getElementsByClassName("choose-checkbox-tick")[0].style.border = "1px #FFF solid";
  }
  else if(object.getAttribute("checked") == "true"){
    object.setAttribute("checked", "false");
    object.getElementsByClassName("choose-checkbox-tick")[0].innerHTML = "";
    object.getElementsByClassName("choose-checkbox-tick")[0].style.color = "#FFF";
    object.getElementsByClassName("choose-checkbox-tick")[0].style.background = "#3794FC";
    object.getElementsByClassName("choose-checkbox-tick")[0].style.border = "1px #FFF solid";
  }
}

function login(username, password){
  var formdata = new FormData();
  formdata.append("username", username);
  formdata.append("password", password);
  if(((username !== null)&&(password !== null))&&((username !== "")&&(password !== ""))){
    $.ajax({
      url:"loginprocess.php",
      type:"POST",
      contentType: false,
      processData: false,
      data: formdata,
      async: false,
      success: function(response){
        if(response === "success"){
          // window.alert(response);
          // window.location.href = "index.html";
          $(document.getElementById("login-modal")).fadeOut();
          for (var i = 0; i < document.getElementById("content").getElementsByClassName("blog-card").length; i++) {
            document.getElementById("content").removeChild(document.getElementById("content").getElementsByClassName("blog-card")[0]);
            i--;
          }
          history.pushState({page: 1}, "title 1", "?page=1");
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
      }
    });
  }
  else {
    document.getElementById("warning-label").style.display = "block";
  }
}

function init(){
  document.getElementsByClassName("show-password-container")[0].setAttribute("onclick", "showPasswordClick()");
  document.getElementsByClassName("submt")[0].setAttribute("onclick", "login(document.getElementById('username').value, document.getElementById('password').value)");
}

addEventListener('DOMContentLoaded', init);
