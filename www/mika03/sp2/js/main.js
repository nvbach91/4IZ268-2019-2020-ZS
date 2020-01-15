
class EmailSender {
  constructor(address, firstName, lastName, id) {
    this.address = address;
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
  }
}

var email = null;
testMessage = (from, to) => {
  return composeMessage(from,to,"Zkušební mail","Příliš žluťoučký kůň úpěl ďábelské ódy");
}

composeMessage = (from, to, subject, message) => {
  return (`From: ${from}\r\nTo: ${to}\r\nContent-Type: text/plain; charset=utf-8\r\nSubject: ${clearDiacritics(subject)}\r\n\r\n${message}`);
}

utf8_to_b64 = (string) => {
  return window.btoa(
    unescape(
      encodeURIComponent(string)
    )
  );
}

encodeMessage = (message) => {
  return utf8_to_b64(message);
}

finalMessageEncode = (encodedMessage) => {
  return encodedMessage.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
clearDiacritics = (string) => {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
sendFunction = (fromId, message) => {
  gapi.client.gmail.users.messages.send({
    'userId': fromId,
    'resource': {
      'raw': message
    }
  }).then(function () {
    alert("Sent!")
  });
}

function send(from, to, subject, message) {
  firstStep = composeMessage(from, to, subject, message);
  secondStep = encodeMessage(firstStep);
  thirdStep = finalMessageEncode(secondStep);
  sendFunction(currentUser.id, thirdStep);
}

var CLIENT_ID = '391363559458-dkfb536ddq3c8tasi2jta1fcfb0vk8sb.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDPnDACeEDpJ-Sk8uBsRbYU7Pbym5bsQuw';

var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

var SCOPES = 'https://www.googleapis.com/auth/gmail.send ' + 'https://www.googleapis.com/auth/gmail.readonly';

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

$("#cid").attr("content", CLIENT_ID);

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(() => {
    // Čekáme na přihlášení, posloucháme změny
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Kontrolujeme zda se uživatel nepřihlásil už dříve
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

    $(authorizeButton).on("click", handleAuthorizeButton);
    $(signoutButton).on("click", handleSignOutButton);
  })
}
var currentUser = null;
// změny v UI podle stavu přihlášení
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    $(authorizeButton).hide();
    $(signoutButton).show();
    $("#Vas_email").show();
    $("#content").show();
    $("#Email_prijemce").show();
    $("#predmet").show();
    $("#odeslat").show();
    $("#Message4NotLoggedIn").hide();
    $(".sprava_uzivatele").removeClass("notLoggedIn");
    currentUser = new EmailSender(gapi.auth2.getAuthInstance().currentUser.Ab.w3.U3, gapi.auth2.getAuthInstance().currentUser.Ab.w3.ofa, gapi.auth2.getAuthInstance().currentUser.Ab.w3.wea, gapi.auth2.getAuthInstance().currentUser.Ab.w3.Eea);
    fillEmail();
  } else {
    $(authorizeButton).show();
    $(signoutButton).hide();
    $("#Vas_email").hide();
    $("#content").hide();
    $("#Email_prijemce").hide();
    $("#predmet").hide();
    $("#odeslat").hide();
    $("#Message4NotLoggedIn").show();
    $(".sprava_uzivatele").addClass("notLoggedIn");
  }
}

function handleAuthorizeButton() {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutButton() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    gapi.auth2.getAuthInstance().isSignedIn.Ab = false;
    auth2.disconnect();
    console.log("logged out");
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
  });
}

function fillEmail() {
  $("#Vas_email").val(currentUser.address);
  $("#Vas_email").attr("disabled", true);
}

class Email {
  constructor(text, sender, recipient, subject) {
    this.text = sanitizelnputst(text);
    this.sender = sanitizelnputst(sender);
    this.recipient = sanitizelnputst(recipient);
    this.subject = clearDiacritics(sanitizelnputst(subject));
    console.log(this.text);
  }
  incorrectContent() {
    return this.text == "";
  }
  incorrectSender() {
    return (
      this.sender == "" ||
      this.sender.split("@").length != 2 ||
      this.sender.split("@")[1].split(".").length != 2
    );
  }
  incorrectRecipient() {
    return (
      this.recipient == "" ||
      this.recipient.split("@").length != 2 ||
      this.recipient.split("@")[1].split(".").length != 2
    );
  }
  incorrectSubject() {
    return this.subject == "";
  }
}

function validate(text, sender, recipient, subject) {
  isOk = true;
  email = new Email(text, sender, recipient, subject);
  if (email.incorrectSender()) {
    $("#Vas_email").attr("style", "background: #be1515");
    isOk = false;
  }
  if (email.incorrectSubject()) {
    $("#predmet").attr("style", "background: #be1515");
    isOk = false;
  }
  if (email.incorrectRecipient()) {
    $("#Email_prijemce").attr("style", "background: #be1515");
    isOk = false;
  }
  if (email.incorrectContent()) {
    $("textarea").attr("style", "background: #be1515");
    isOk = false;
  }
  return isOk;
}
$("#odeslat").click(e => {
  e.preventDefault();
  if(validate(
    $("textarea").val(),
    $("#Vas_email").val(),
    $("#Email_prijemce").val(),
    $("#predmet").val()
  )) {
    send(email.sender, email.recipient, email.subject, email.text);
    $("textarea").val("");
    $("#Email_prijemce").val("");
    $("#predmet").val("");
  }
});

function sanitizelnputst(input) {
  input.replace("<", "&lt;"); /**co vyměňovat, za co vyměňovat */
  input.replace(">", "&gt;");
  input.replace("&", "&amp;");
  input.replace('"', "	&quot;");
  input.replace("'", "&apos;");

  return input;
}
