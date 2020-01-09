
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
  window.location.href = "index.php";
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


// window.fbAsyncInit = function() {
//   FB.init({
//     appId      : '2510981755831391',
//     cookie     : true,
//     xfbml      : true,
//     version    : '{api-version}'
//   });
//
//   FB.AppEvents.logPageView();
//
// };

// (function(d, s, id){
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) {return;}
//    js = d.createElement(s); js.id = id;
//    js.src = "https://connect.facebook.net/en_US/sdk.js";
//    fjs.parentNode.insertBefore(js, fjs);
//  }(document, 'script', 'facebook-jssdk'));

function init(){
  history.pushState({page: 1}, "title 1", "?page=1")
}

addEventListener('DOMContentLoaded', init);
