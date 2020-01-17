const GLOBALS = { // definujeme globální konstanu do níž budeme ukládat globální proměnné
  email: null, // Připravujeme si proměnnou email do které budeme ukládat email k odeslání
  currentUser: null, // Připravuje globální proměnou currentUser do níž budeme ukládat uživatele po přihlášení
  CLIENT_ID: '631879115548-s5kka655adveq9mbt4atjfq87gptdfba.apps.googleusercontent.com', // Definuje náš projekt na serverech googlu
  API_KEY: 'AIzaSyBcxLfYjgXCNmUSR8BtbAvo5Y23p_ZePng', // Klíč potřebný k udělení práv naší aplikaci.
  DISCOVERY_DOCS: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"], // Soubory potřebné pro API
  SCOPES: 'https://www.googleapis.com/auth/gmail.send ' + 'https://www.googleapis.com/auth/gmail.readonly', // Definice vyžadovaných práv pro naši aplikaci
  buttons: {
    authorizeButton: document.getElementById('authorize_button'), // Vybíráme tlačítko "Přihlásit se"
    signoutButton: document.getElementById('signout_button'),// vybíráme tlačítko "Odhlásit se"
    sendButton: document.getElementById('odeslat'),// vybíráme tlačítko "Odeslat"
  },
  otherElements: {
    senderEmail: $("#Vas_email"), // Vybíráme pole pro email odesílatele
    emailContent: $("#content"), // Vybíráme pole pro obsah emailu
    receiverEmail: $("#Email_prijemce"), // Vybíráme pole pro email příjemce
    subjectContent: $("#predmet"), // Vybíráme pole pro předmět emailu
    loginMessage: $("#Message4NotLoggedIn"), // Vybíráme nadpis zobrazující se nepřihlášeným uživatelům
    userAdministration: $(".sprava_uzivatele") // Vybíráme div v němž je uložena správa uživatele
  }
}
/**
 * Třída emailsender usnadňuje čtení dat aktuálního uživatele
 */
class EmailSender {
  /**
   * @param {String} address - emailová adresa uživatele 
   * @param {String} firstName - Křestní jméno uživatele
   * @param {String} lastName - Příjmení uživatele
   * @param {Integer} id - ID uživatele na serveru googlu
   * 
   * Přiřazujeme hodnoty
   */
  constructor(address, firstName, lastName, id) {
    this.address = address;
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
  }
}

/**
 * @param {String} from - Emailová adresa odesílatele
 * @param {String} to - Emailová adresa příjemce
 * 
 * @returns zkušební email z parametrů funkce composeMessage()
 */
testMessage = (from, to) => {
  return composeMessage(from, to, "Zkušební mail", "Příliš žluťoučký kůň úpěl ďábelské ódy");
}

/**
 * @param {String} from - Emailová adresa odesílatele
 * @param {String} to - Emailová adresa příjemce
 * @param {String} subject - Předmět emailu
 * @param {String} message - Obsah emailu
 * 
 * @returns String emailu k přeložení do Base64
 */
composeMessage = (from, to, subject, message) => {
  return (`From: ${from}\r\nTo: ${to}\r\nSubject: ${subject}\r\n\r\n${message}`);
}

/**
 * @param {String} string - Jakýkoli string, který chceme přeložit do Base64
 * 
 * @returns Náš string přeložený do Base64
 */
utf8_to_b64 = (string) => {
  return window.btoa( // window.btoa() je metoda která překládá znaky sady Latin1 do Base64
    unescape( // unescape() Spočítá a vrací String, který má přeložené znaky neodpovídající jednotné sadě znaků do té sady znaků - tohle děláme jen pro jistovu aby vše bylo v pořádku. Zbavení nedefinovaných znaků. 
      encodeURIComponent(string) // Pro správné zobrazování diakritiky
    )
  );
}

/**
 * @param {String} message - Zpráva k zakódování
 * 
 * @returns Zprávu zakódovanou do Base64 v původním neformátovaném tvaru 
 */
encodeMessage = (message) => {
  return utf8_to_b64(message);
}
/**
 * @param {String} encodedMessage - Zpráva v Base64 k vyčistění od přebytečných znaků
 * 
 * @returns Zprávu zakódovanou do Base64 v čistém formátovaném tvaru.
 */
// zbavení přebytečných znaků
finalMessageEncode = (encodedMessage) => {
  return (
    encodedMessage // zpráva
      .replace(/\+/g, '-') // vyměňujeme znak + za -
      .replace(/\//g, '_') // vyměňujeme znak / za _
      .replace(/=+$/, '') // mažeme znaky = a $
  )
}

/**
 * @param {String} string - String z něhož chceme odstranit diakritiku
 * 
 * @returns String bez diakritiky
 */
clearDiacritics = (string) => {
  return string
    .normalize("NFD") // převádí znaky nedefinové v unicode na znaky, které unicode zná
    .replace(/[\u0300-\u036f]/g, ""); // odstranění diakritiky ze znaků
}
/**
 * @param {Integer} fromId - id uživatele který odesílá zprávu
 * @param {String} message - Base64 zakódovaná zpráva k odeslání
 * 
 * Odešle request na servery googlu, aby odeslali zprávu specifikovanou parametrem message
 */
sendFunction = (fromId, message) => {
  gapi.client.gmail.users.messages.send({ // API metoda pro odesílání zpráv vrací slib 
    'userId': fromId,
    'resource': {
      'raw': message
    }
  }).then(function () { // then() - metoda slibu, která se provede po jeho splnění
    alert("Sent!") // Upozorníme, že email se odeslal
  });
}
/**
 * 
 * @param {String} from - Emailová adresa odesílatele
 * @param {String} to - Emailová adresa příjemce
 * @param {String} subject - Předmět emailu
 * @param {String} message - Obsah emailu
 */
function send(from, to, subject, message) {
  let firstStep = composeMessage(from, to, subject, message); // složíme zprávu
  let secondStep = encodeMessage(firstStep); // zakódujeme do syrového stavu
  let thirdStep = finalMessageEncode(secondStep); // vyčistíme zakódování
  sendFunction(GLOBALS.currentUser.id, thirdStep); // odešleme email na API
}
$("#cid").attr("content", GLOBALS.CLIENT_ID); // "Přidáváme odkaz na naši aplikaci do meta dat"

/**
 * Spouští aplikaci
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}
/**
 * Spouštíme aplikaci na serverech googlu
 */
function initClient() {
  gapi.client.init({ // metoda na API která spouští aplikaci. Vrací slib
    apiKey: GLOBALS.API_KEY,
    clientId: GLOBALS.CLIENT_ID,
    discoveryDocs: GLOBALS.DISCOVERY_DOCS,
    scope: GLOBALS.SCOPES
  }).then(() => { // Po splnění slibu provedeme
    // Čekáme na přihlášení, posloucháme změny
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Kontrolujeme zda se uživatel nepřihlásil už dříve
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

    // Přidáváme čekání na kliknutí na tlačítka přihlásit se a odhlásit se
    $(GLOBALS.buttons.authorizeButton).click(handleAuthorizeButton);
    $(GLOBALS.buttons.signoutButton).click(handleSignOutButton);
  })
}

// změny v UI podle stavu přihlášení
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) { // Kontrola zda je uživatel přihlášen
    // Co se má stát když se uživatel přihlásil.

    /*
        Metoda hide() nastavuje na vybraném elementu styl display na hodnotu "none";
        Metoda show() nastavuje na vybraném elementu styl display na hodnotu "block";
    */

    $(GLOBALS.buttons.authorizeButton).hide();
    $(GLOBALS.buttons.signoutButton).show();
    $(GLOBALS.buttons.sendButton).show();
    GLOBALS.otherElements.loginMessage.hide();
    GLOBALS.otherElements.senderEmail.show();
    GLOBALS.otherElements.receiverEmail.show();
    GLOBALS.otherElements.subjectContent.show();
    GLOBALS.otherElements.emailContent.show();
    GLOBALS.otherElements.userAdministration.removeClass("notLoggedIn"); // Metoda removeClass() odebírá třídu z elementu
    GLOBALS.currentUser = new EmailSender( // Do globální proměné currentUser ukládáme objekt třídy Email sender s vlastnostmi
      gapi.auth2.getAuthInstance().currentUser.Ab.w3.U3, // Emailová adresa přihlášeného uživatele
      gapi.auth2.getAuthInstance().currentUser.Ab.w3.ofa, // Křestní jméno přihlášeného uživatele
      gapi.auth2.getAuthInstance().currentUser.Ab.w3.wea, // Příjmení přihlášeného uživatele
      gapi.auth2.getAuthInstance().currentUser.Ab.w3.Eea // Google ID přihlášeného uživatele
    );
    fillEmail(); // Vyplňujeme a vypínáme pole pro zadávání emailu
  } else { // Co se má stát když uživatel není přihlášen či se odhlásil
    $(GLOBALS.buttons.authorizeButton).show();
    $(GLOBALS.buttons.signoutButton).hide();
    $(GLOBALS.buttons.sendButton).hide();
    GLOBALS.otherElements.loginMessage.show();
    GLOBALS.otherElements.senderEmail.hide();
    GLOBALS.otherElements.receiverEmail.hide();
    GLOBALS.otherElements.subjectContent.hide();
    GLOBALS.otherElements.emailContent.hide();
    GLOBALS.otherElements.userAdministration.addClass("notLoggedIn"); // Metoda addClass přidává třídu na element v DOM
  }
}
/**
 * Metoda která se stará o stisknutí tlačítka "Přihlásit se"
 */
function handleAuthorizeButton() {
  gapi.auth2.getAuthInstance().signIn(); // Funkce API která spouští přihlašovací sekvenci
}

/**
 * Metoda která se stará o stisknutí tlačítka "Odhlásit se"
 */
function handleSignOutButton() {
  var auth2 = gapi.auth2.getAuthInstance(); // Lokální proměné auth2 přiřazujeme hodnotu API objektu 
  auth2.signOut().then(function () { // na auth2 proběhneme metodu odhlásit se ze serveru
    gapi.auth2.getAuthInstance().isSignedIn.Ab = false; // Nastavujeme lokálně uloženou proměnnou API, která se stará o kontrolu přihlášení uživatele na false
    auth2.disconnect(); // Odebíráme práva pro používání emailové schránky uživatele od naší aplikace
    console.log("logged out"); // Do konzole píšeme, že jsme se odhlásili
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()) // Aktualizujeme UI
  });
}
/**
 * Metoda která vyplní a vypne pole pro email odesílatele
 */
function fillEmail() {
  GLOBALS.otherElements.senderEmail.val(GLOBALS.currentUser.address); // Nastavujeme hodnotu pole na aktuální email uživatele
  GLOBALS.otherElements.senderEmail.attr("disabled", true); // Pole vypneme
}
/**
 * Třída Email ukládá vlastnosti emailu, který se bude odesílat
 */
class Email {
  /**
   * 
   * @param {String} text - Obsah emailu
   * @param {String} sender - Email odesílatele
   * @param {String} recipient - Email příjemce
   * @param {String} subject - Předmět emailu
   */
  constructor(text, sender, recipient, subject) {
    this.text = text;
    this.sender = sender;
    this.recipient = recipient;
    this.subject = clearDiacritics(subject); // mažeme diakritiku, protože se nedaří korektně zakódovat znaky s diakritikou
  }
  /**
   * Kontrola aby obsah nebyl prázdný
   */
  incorrectContent() {
    return this.text === "";
  }
  /**
   * Kontrola aby email odesílatele byl validní email
   */
  incorrectSender() {
    return (
      this.sender === "" ||
      this.sender.split("@").length !== 2 ||
      this.sender.split("@")[1].split(".").length !== 2
    );
  }
  /**
   * Kontrola aby email příjemce byl validní 
   */
  incorrectRecipient() {
    return (
      this.recipient === "" ||
      this.recipient.split("@").length !== 2 ||
      this.recipient.split("@")[1].split(".").length !== 2
    );
  }
  /**
   * Kontrola aby předmět nebyl prázdný
   */
  incorrectSubject() {
    return this.subject === "";
  }
}
/**
 * 
 * @param {String} text - Obsah emailu
 * @param {String} sender - Email odesílatele
 * @param {String} recipient - Email příjemce
 * @param {String} subject - Předmět emailu
 * 
 * @returns {Boolean} - true když jsou všechny vlastnosti v pořádku / false pokud jedna či více v pořádku nejsou 
 */
function validate(text, sender, recipient, subject) {
  let isOk = true; // připravujeme si lokální nestabilní proměnou isOk, v níž budeme kontrolovat zda všechny údaje jsou v pořádku
  GLOBALS.email = new Email(text, sender, recipient, subject); // Globální proměnné email přiřazujeme vlastnosti z parametrů metody
  if (GLOBALS.email.incorrectSender()) { // Kontrola zda email odesílatele je validní
    GLOBALS.otherElements.senderEmail.attr("style", "background: #be1515"); // Pokud není tak měníme pozadí na červené
    isOk = false; // nastavujeme lokální nestabilní proměnou na hodnotu false
  }
  if (GLOBALS.email.incorrectSubject()) { // Kontrola zda předmět je validní
    GLOBALS.otherElements.subjectContent.attr("style", "background: #be1515");
    isOk = false;
  }
  if (GLOBALS.email.incorrectRecipient()) { // Kontrola zda email příjemce je validní
    GLOBALS.otherElements.receiverEmail.attr("style", "background: #be1515");
    isOk = false;
  }
  if (GLOBALS.email.incorrectContent()) { // Kontrola zda email obsah je validní
    GLOBALS.otherElements.emailContent.attr("style", "background: #be1515");
    isOk = false;
  }
  return isOk; // Vracíme proměnou isOk, která nabývá hodnoty true či false
}

$("#odeslat").click(e => { // po stisknutí tlačítka "odeslat" provedeme následující
  e.preventDefault(); // Zabráníme reálnému potvrzení odeslání formuláře (redirect na jinou stránku - aktualizace okna, která by vše zrušila)
  if (validate( // kontrola validity dat
    GLOBALS.otherElements.emailContent.val(), // Vybíráme obsah pole pro obsah emailu
    GLOBALS.otherElements.senderEmail.val(), // Vybíráme obsah pole pro email odesílate
    GLOBALS.otherElements.receiverEmail.val(), // Vybíráme obsah pole pro email příjemce
    GLOBALS.otherElements.subjectContent.val() // Vybíráme obsah pole pro předmět
  )) { // Pokud je vše v pořádku
    send(GLOBALS.email.sender, GLOBALS.email.recipient, GLOBALS.email.subject, GLOBALS.email.text); // Odesíláme email přes metodu Send 
    GLOBALS.otherElements.emailContent.val(""); // Vyprazdňujeme pole pro obsah emailu
    GLOBALS.otherElements.receiverEmail.val(""); // Vyprazdňujeme pole pro email příjemce
    GLOBALS.otherElements.subjectContent.val(""); // Vyprazdňujeme pole pro předmět emailu
  }
});
