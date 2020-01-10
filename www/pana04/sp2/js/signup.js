function signup(username, password, co_password, first, last){
  // window.alert("oK");
  var formdata = new FormData();
  formdata.append("operation_type", "signup");
  formdata.append("username", username);
  formdata.append("password", password);
  formdata.append("co_password", co_password);
  formdata.append("first", first);
  formdata.append("last", last);
  $.ajax({
    url: "ajax_blogs.php",
    type: "POST",
    contentType: false,
    processData:false,
    async: false,
    data: formdata,
    success: function(response){
      // window.alert(response);
      $(document.getElementById("signup-modal")).fadeOut();
      $(document.getElementById("login-modal")).fadeIn();
    }
  });
}

function init(){
  document.getElementsByClassName("submit")[0].setAttribute("onclick", "signup(document.getElementById('username').value,document.getElementById('password').value,document.getElementById('confirm_password').value,document.getElementById('first_name').value,document.getElementById('last_name').value)");
}

addEventListener('DOMContentLoaded', init);
