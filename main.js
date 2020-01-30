function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  $(".g-signin2").css("display","none");
  $(".data").css("display","block");
  $("#pic").attr('src',profile.getImageUrl());
  $("#email").text(profile.getEmail());
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    alert("You have been signed out");
    $(".g-signin2").css("display","block");
    $(".data").css("display","none");
  });
}

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var _month = _day * 30;
var timer;

initDate();

document.getElementById('startButton').addEventListener("click", function() {
  document.getElementById('value').innerHTML = document.getElementById("myDate").value;
  var splitValues = document.getElementById("myDate").value.split('-');
  var end = new Date(splitValues[0], splitValues[1] - 1, splitValues[2]);
  clearInterval(timer);
  showRemaining(end);
  timer = setInterval(showRemaining, 1000, end);
});

function showRemaining(end) {
  var now = new Date();
  var distance = end - now;
  if (distance < 0) {
    clearInterval(timer);
    document.getElementById('countdown').innerHTML = 'Paaaarty!';
    return;
  }

  var months = Math.floor(distance / _month);
  var days = Math.floor((distance % _month) / _day);
  var hours = Math.floor((distance % _day) / _hour);
  var minutes = Math.floor((distance % _hour) / _minute);
  var seconds = Math.floor((distance % _minute) / _second);

  document.getElementById('countdown').innerHTML = months + 'months ';
  document.getElementById('countdown').innerHTML += days + 'days ';
  document.getElementById('countdown').innerHTML += hours + 'hrs ';
  document.getElementById('countdown').innerHTML += minutes + 'mins ';
  document.getElementById('countdown').innerHTML += seconds + 'secs';
}

function initDate() {
  var defaultDate = new Date();
  var month;
  if(defaultDate.getMonth() + 1 > 9) {
    month = "" + (defaultDate.getMonth() + 1);
  } else {
    month = '0' + (defaultDate.getMonth() + 1);
  }
  document.getElementById("myDate").value = defaultDate.getFullYear() + '-' + month + '-' + defaultDate.getDate();
}