
/*----------------------------------SIGNING--------------------------------------------------------- */

function signOut() {
  firebase.auth().signOut();
}

function toggleSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      document.getElementById('quickstart-sign-in').disabled = false;
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }
  document.getElementById('quickstart-sign-in').disabled = true;
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  // Create user with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END createwithemail]
}

/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  // [START sendemailverification]
  firebase.auth().currentUser.sendEmailVerification().then(function () {
    // Email Verification sent!
    // [START_EXCLUDE]
    alert('Email Verification Sent!');
    // [END_EXCLUDE]
  });
  // [END sendemailverification]
}

function sendPasswordReset() {
  var email = document.getElementById('email').value;
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function () {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Password Reset Email Sent!');
    // [END_EXCLUDE]
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END sendpasswordemail];
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function (user) {
    // [START_EXCLUDE silent]
    document.getElementById('quickstart-verify-email').disabled = true;
    // [END_EXCLUDE]
    if (user) {
      /*----------------------------------------------- User is signed in.----------------------------------------------------*/
      window.email = user.email;
      window.emailVerified = user.emailVerified;
      window.uid = user.uid;

      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      document.getElementById('quickstart-account-details').style.display = 'none';
      if (!emailVerified) {
        document.getElementById('quickstart-verify-email').disabled = false;
      }

      // [END_EXCLUDE]
    } else {

      /*----------------------------------------------- User is signed out.----------------------------------------------------*/

      // [START_EXCLUDE]
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-sign-in').textContent = 'Sign in';
      document.getElementById('quickstart-account-details').textContent = 'null';
      document.getElementById('quickstart-account-details').style.display = 'none';
      // [END_EXCLUDE]


    }
    // [START_EXCLUDE silent]
    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]

    if (user) {
      document.getElementById('sign-in-page').style.display = "none";
      document.getElementById('main-page').style.display = "initial";

      return firebase.database().ref('users/' + uid + '/courses').
        once('value', gotData, errData);

      document.getElementById('quickstart-user-details-container').style.display = "none";
    } else {
      document.getElementById('sign-in-page').style.display = 'initial';
      document.getElementById('main-page').style.display = "none";
    }

  });
  // [END authstatelistener]

  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
  document.getElementById('sign-out-btn').addEventListener('click', signOut, false);
  document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
  document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
  document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}

window.onload = function () {
  initApp();
};

/*----------------------------------FILLING TABLES OF COURSES------------------------------------------------- */
/*-----------------------------------------WITH FORM--------------------------------------------------------- */
document.getElementById("update-btn").onclick = courseUpdate;

var curr_table = null;
// Next primary key for adding a new course
var _nextId = 1;
// primary key of course currently editing
var _activeId = 0;

function courseUpdate() {
  if ($("#course-id").val() != null &&
    $("#course-id").val() != '') {
    if ($("#update-btn").text() == "Update") {
      courseUpdateInTable(_activeId);
    }
    else {
      // Add course to Table
      courseAddToTable();
      // Clear form fields
      formClear();
      // Focus to course name field
      $("#course-id").focus();
    }
  }
}

function courseAddToTable() {
  // Checking if <tbody> exists, add one if not
  if ($("#table-" + $("#mandatority").val() + " tbody").length == 0) {
    $("#table-" + $("#mandatority").val()).append("<tbody></tbody>");
  }

  // Append course to the table
  $("#table-" + $("#mandatority").val() + " tbody").append(
    courseBuildTableRow(_nextId));
  // Increment next ID to use
  _nextId += 1;
}

function courseDisplay(ctl) {
  _row = $(ctl).parents("tr");
  curr_table = $(ctl).closest('table').attr('id');
  curr_table = curr_table.slice(6);
  var cols = _row.children("td");
  window.OldIdVar = $(cols[1]).text();

  _activeId = $($(cols[0]).children("button")[0]).data("id");

  $("#mandatority").val(curr_table);
  $("#course-id").val($(cols[1]).text());
  $("#name").val($(cols[2]).text());
  $("#ects").val($(cols[3]).text());
  $("#semester").val($(cols[4]).text());
  // Change Update Button Text
  $("#update-btn").text("Update");
}

function courseUpdateInTable(id) {
  var courseId = OldIdVar;

  var course = {
    courseName: $("#name").val(),
    ects: $("#ects").val(),
    mandatority: $("#mandatority").val(),
    recSemester: $("#semester").val(),
  };

  var updates = {};
  updates['users/' + uid + '/courses/' + courseId] = course;
  firebase.database().ref().update(updates);
  firebase.database().ref('users/' + uid + '/courses/' + courseId).remove();


  var row =
    $("#table-" + $("#mandatority").val() + " button[data-id='" + id + "']").parents("tr")[0];
  // Add changed course to table
  $(row).after(courseBuildTableRow(id));
  // Remove original course
  $(row).remove();
  // Clear form fields
  formClear();
  // Change Update Button Text
  $("#update-btn").text("Add");
}

function courseDelete(ctl) {
  var result = confirm("Wanna delete??");
  if (result) {
    var row = $(ctl).parents("tr");
    var cols = row.children("td");
    var courseId = $(cols[1]).text();
    firebase.database().ref('users/' + uid + '/courses/' + courseId).remove();
    $(ctl).parents("tr").remove();
  }
}

function formClear() {
  $("#mandatority").val("");
  $("#course-id").val("");
  $("#name").val("");
  $("#ects").val("");
  $("#semester").val("");
}

function courseBuildTableRow(id) {

  //Insert course to the firebase database

  var courseId = $("#course-id").val();
  var mandatority = $("#mandatority").val();
  var name = $("#name").val();
  var ects = $("#ects").val();
  var semester = $("#semester").val();

  addCourseToDatabase(courseId, mandatority, name, ects, semester);
  return firebase.database().ref('users/' + uid + '/courses').
    on('value', gotData, errData);
}

/*----------------------------ADDING DATA IN STUDY PLAN---------------------------------------------------*/
document.getElementById("add-plan-btn").onclick = addToPlan;

function addToPlan() {
  var courseId = $("#course-id-plan").val();
  courseId = courseId.match(/.+(?=\-)/);
  var actualSemester = $("#actual-sem").val();
  firebase.database().ref('users/' + uid + '/courses/' + courseId).update({
    actualSemester: actualSemester
  });
  return firebase.database().ref('users/' + uid + '/courses').
    on('value', gotData, errData);
}

function delFromPlan(ctl) {
  var row = $(ctl).parents("tr");
  var cols = row.children("td");
  var courseId = $(cols[0]).text();
  firebase.database()
    .ref('users/' + uid + '/courses/' + courseId + '/actualSemester').remove();
  $(ctl).parents("tr").remove();
}

/*-------------------------------CHART DATA--------------------------------------------*/