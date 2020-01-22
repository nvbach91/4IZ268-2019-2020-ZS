(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
// načítá knihovnu od fb
// z FB developer

let checkLoginState;
// zkontoroluji přihlášení (let dynamické, stejně jako přihlášení se může měnit)

$(document).ready(function () {
  window.fbAsyncInit = function () {
    console.log("todo exist fce:", checkLoginState); // vypíše na konzoli přihlášení
    FB.init({
      appId: '464144500938571', //zaregistrovaná aplikace
      cookie: true,
      xfbml: true,
      version: 'v5.0' //přidaná verze
    });
    // z FB developer

    FB.AppEvents.logPageView();
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);        // Returns the login status.
    });
    //získá odpověď od FB s daty pro aktuálního uživatele
    // z FB developer

  };

  function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      // z FB developers
      getUserData();
    } else {                                
      alert('Přihlaš se pomocí FB');
      //když jsem přihlášený, zobrazí se data o přihlášeném uživateli
    }
  }
  // zjištuje jestli je uživatel přihlášený

  checkLoginState = function () {
    FB.getLoginStatus(function (response) {
      console.log(response) 
      statusChangeCallback(response);
    });
  }
  // po přihlášení se volá funkce checkloginstate
  // z FB developer

  function getUserData() {                      
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) { //volá se API FB s parametrem - tady /me == dej mi data o mně
      console.log('Successful login for: ' + response.name);
      //z FB developer
      console.log(response);
      document.querySelector('.fb-name').innerText = response.name; // vložení textu do divu s třídou .fb-name
      $('.fb-img').prepend('<img src="https://graph.facebook.com/' + response.id + '/picture?type= small" alt="FB profile image" />') //vložení tagu img pomocí jquery

      /* pokud uživatel je přihlášený, proji lokální databázi a když je něco uložené, tak projdi pole a vytvoř pro každou uloženou 
      url iframe s tou danou url*/
      localforage.getItem('iframes').then(function (readValue) { //přečti uložené iframy
        console.log('Init read: ', readValue);
        if (readValue !== null) { //když se iframy v local atorage nerozvají nule = něco tam je
          // procházím pole pomocí forEach funkce a pro každou položku vytvořím iframe a vložím do div .fb-iframes
          readValue.forEach(function (url) {
            $('<iframe>', { //vytvoří iframy
              src: url, //odkazuje
              frameborder: 0,
              width: "1000",
              height: "700",
              scrolling: 'no'
            }).appendTo('.fb-iframes'); //kam se mají na stránce vložit
          })
        }
      });
    });
  }

  $('.uloz').click(function () { //při kliknutí na button
    const fbIframeUrl = "https://www.facebook.com/plugins/page.php?href=";
    const fbIframeUrlKonec = "/&tabs=timeline&width=1000&height=700&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=true&appId";
    const value = $('.url').val().trim(); //smazání mezer okolo URL
    if (value === "") { //když uživatel nic nevložil
      alert('Vyplň pole!')
    } else {
      $('<iframe>', { //vytvoří se iframe
        src: fbIframeUrl + value + fbIframeUrlKonec,
        frameborder: 0,
        width: "1000",
        height: "700",
        scrolling: 'no'
      }).appendTo('.fb-iframes'); //kam se vloží na stránce


      // ukládání do lokální databáze IndexedDB pomocí knihovny localforage
      const lsIframes = localforage.getItem('iframes').then(function (readValue) { //co se bude číst
        console.log('Read: ', readValue);
        let iframesArray = readValue;
        if (readValue === null) { //co udělá když je null - nic nezobrazí
          iframesArray = [];
        }

        iframesArray.push(fbIframeUrl + value + fbIframeUrlKonec); // vlož do daného pole uživatelem přidanou url ve formátu facebook iframů

        localforage.setItem('iframes', iframesArray).then(function (savedValue) { // ulož zpět upravené pole do iframes 
          console.log("Saved: ", savedValue); 
        })
      });
    }
  })

});
