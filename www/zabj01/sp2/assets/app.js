const App = {};

/* ZÁKLANÍ KONSTANTY */
App.urlObjectProperties = [ 
  ['page','p'], 
  ['section', 's'], 
  ['category', 'c'], 
  ['date', 'd'],  
  ['isbn', 'i'],
  ['title', 't'],
  ['author','a'],
  ['searchQuery','search'],
  ['critic', 'cr']
];
App.key = 'W5WFIwAotc1NKOtKHRZ8KZJftud5wznn';
App.baseApiUrlBooks = 'https://api.nytimes.com/svc/books/v3/';
App.baseApiUrlMovies = 'https://api.nytimes.com/svc/movies/v2/';
App.bookReviewSearchqueryArray = [ ['isbn', 'i'], ['title', 't'], ['author','a'] ];

$(document).ready(() => {

  $('#logo').click( App.prepareURLFromAtribut );
  $('nav #b-o').click( App.prepareURLFromAtribut );
  $('nav #b-r').click( App.prepareURLFromAtribut );
  $('nav #m-c').click( App.prepareURLFromAtribut );
  $('nav #m-r').click( App.prepareURLFromAtribut );

  App.urlHandler( App.getURLParams() );

});

/** OBECNÉ METODY **/

/**
 * Určuje, jaký obsah bude vykreslen podle URL objektu
 */
App.urlHandler = function(url){

  const main = $('main');
  const content = $('#content');
  if(content.length){ content.remove(); }
  main.append('<div id="content"><div class="loader" id="loader"></div></div>');

  if(url.page === 'm'){

    switch(url.section){
      case 'r': 
        document.title = 'Movies Reviews | NYT Books & Movies';
        App.navHandler('m-r');
        App.buildPage_MovieReview(url.searchQuery);
        break;
      case 'c':
        document.title = 'Movies Critics | NYT Books & Movies';
        App.navHandler('m-c');
        App.buildPage_MovieCritics();        
        break;
      case 'l': 
        document.title = 'Movies Critics | NYT Books & Movies'; 
        App.cleanNav();
        App.buildPage_CriticArticles(url.critic);
        break;  
      default:
        document.title = 'Movies Critics | NYT Books & Movies';
        App.navHandler('m-c');
        App.buildPage_MovieCritics();  
        break;  
    }    
 
  } else if(url.page === 'b') {
    
    // book section
    switch(url.section){
      // přehled knižních kategorií
      case 'o':
        document.title = 'Books Best Sellers | NYT Books & Movies';
        App.navHandler('b-o');
        App.buildPage_BookOverview(url.date);
        break;
      // konkrétní knížní kategorie
      case 'c':
        document.title = 'Book Category | NYT Books & Movies';
        App.cleanNav();
        App.buildPage_BookCategory(url.category, url.date);
        break;
      // book review
      case 'r':  
        document.title = 'Books Reviews | NYT Books & Movies';
        App.navHandler('b-r');
        const queryData = App.getQueryType(url.isbn, url.title, url.author);
        App.buildPage_BookReview(queryData[0], queryData[1]);
        break;
      // přehled knižních kategorií
      default:
        document.title = 'Books Best Sellers | NYT Books & Movies';
        App.navHandler('b-o');
        App.buildPage_BookOverview(url.date);
        break;
    }

  } else {

    document.title = 'Books Best Sellers | NYT Books & Movies';
    App.navHandler('b-o');
    App.buildPage_BookOverview(url.date);   

  }

};

/**
 * Změní URL po změně obsahu
 */
App.handleBrowser = function(url){
  const urlString = App.urlToString(url);
  history.pushState('', '', `${window.location.pathname}?${urlString}`);
  App.urlHandler(url);
};

/**
 * Back button v prohlížeči funguje správně
 */
window.onpopstate = function() {
  App.urlHandler( App.getURLParams() );
};

/**
 * Složí URL objekt z parametrů url adresy
 */
App.getURLParams = function(){
  const getParams = new URLSearchParams(window.location.search);
  var url = {};
  for(var i = 0; i < App.urlObjectProperties.length; i++){
    url[ App.urlObjectProperties[i][0] ] = getParams.get( App.urlObjectProperties[i][1] );
  }

  return url;
};

/**
 * Složí URL objekt z atributů elementu
 */
App.prepareURLFromAtribut = function(e) {

  var url = {};
  for(var i = 0; i < App.urlObjectProperties.length; i++){
    url[ App.urlObjectProperties[i][0] ] = $(this).attr('data-'+ App.urlObjectProperties[i][1]) === undefined ? null : $(this).attr('data-'+ App.urlObjectProperties[i][1]);
  }
  e.preventDefault();

  App.handleBrowser(url);

};

/**
 * Složí z URL objektu string pro url adresu
 */
App.urlToString = function(url){

  var urlString = '';
  for(var i = 0; i < App.urlObjectProperties.length; i ++){

    if(url[ App.urlObjectProperties[i][0] ] != null){

      if(i != 0){
        urlString += '&';
      }
      urlString += `${App.urlObjectProperties[i][1]}=${url[ App.urlObjectProperties[i][0] ]}`;

    }
  }
    
  return urlString;
};

/**
 * Složí z pole URL objekt
 */
App.prepareURLFromArray = function(array){

  var url = {};
  for(var i = 0; i < App.urlObjectProperties.length; i++){
    url[ App.urlObjectProperties[i][0] ] = array[i];
  }
  App.handleBrowser(url);
}

/**
 * Zvýraznění aktuální stránky v navigaci
 */
App.navHandler = function(elementId){

  App.cleanNav();

  const navElement = $(`nav #${elementId}`);
  if(navElement.length > 0){
    navElement.addClass('on');
  }

};

/**
 * Odebere ze všech elementů navigace třídu on
 */
App.cleanNav = function(){
  $(`nav #b-o`).removeClass('on');
  $(`nav #b-r`).removeClass('on');
  $(`nav #m-c`).removeClass('on');
  $(`nav #m-r`).removeClass('on');
}

/**
 * Vrátí informaci o typy dotazu pro vyhledávání knihy
 * 
 */
App.getQueryType = function(isbn, title, author){

  var queryValue = '';
  var queryBy; // 0 (== isbn), 1 (== title), 2 (==author)

  if(isbn != null){

    queryValue = isbn;
    queryBy = 0;

  } else if(title != null){

    queryValue = title;
    queryBy = 1;

  } else if(author != null){

    queryValue = author;
    queryBy = 2;

  } else {

    queryBy = false;

  }

  const data = [ queryValue, queryBy ];

  return data;

}  

/**  Books Best Sellers PAGE **/

/**
 * Základní metoda pro Books Best Sellers PAGE
 */
App.buildPage_BookOverview = function(){

  const requestURL = `${App.baseApiUrlBooks}lists/names.json?api-key=${App.key}`;
  const content = $('#content');

  if(sessionStorage.getItem(requestURL) === null){

    $.getJSON(requestURL).done(function (listNames) {

      sessionStorage.setItem(requestURL, JSON.stringify(listNames));
      App.displayBookCategories(listNames, 0, listNames.num_results);

    }).fail(function () {

      content.append('<div class="error"><p>Sorry, Books Best Sellers could not be loaded.</p></div>');

    }).always(function (){

      $('#loader').remove();

    });

  } else {

    $('#loader').remove();
    const listNamesFromS = JSON.parse(sessionStorage.getItem(requestURL));
    App.displayBookCategories(listNamesFromS, 0, listNamesFromS.num_results);

  }  

};

/**
 * Vykreslení jednotlivé knižní kategorie
 */
App.displayBookCategories = function(listNames, start, stopPoint){

  const content = $('#content');
  var stop = false; 
  if(start > (stopPoint - 5)){

  } else {
    
    const list = $('<ul id="list"></ul>');
    content.append(list);

    var listElements = '';
    for(var i = start; i < (start + 5); i++){
      listElements += `<li id="category-${i}" data-p="b" data-s="c" data-c="${listNames.results[i].list_name_encoded}">${listNames.results[i].display_name}</li>`;

      if(i === (stopPoint - 1)){ break; stop = true; }
    }

    list.append(listElements);

    for(var k = start; k < (start + 5); k++){
      $(`#category-${k}`).click ( App.prepareURLFromAtribut );
    }

    if(stop === false){
      
      list.append('<li class="load-button"><button>Load more</button></li>');
      const loadButton = $('ul#list li.load-button button');
      loadButton.click(function(){

        if($('ul#list li.load-button').length){ $('ul#list li.load-button').remove(); }
        App.displayBookCategories(listNames, start + 5, stopPoint);  
        window.scrollTo(0, document.body.scrollHeight); 

      });

    }
  
  }
}; 

/**  KONEC Books Best Sellers PAGE **/

/**  Books Best Sellers > Category PAGE **/

/**
 * Základní metoda pro Books Best Sellers > Category PAGE
 */
App.buildPage_BookCategory = function(category, date){

  if(date == null){ date = 'current'; }

  const requestURL = `${App.baseApiUrlBooks}lists/${date}/${category}.json?api-key=${App.key}`;
  const content = $('#content');
  
  if(sessionStorage.getItem(requestURL) === null){

    $.getJSON(requestURL).done(function (category) {

      sessionStorage.setItem(requestURL, JSON.stringify(category));
      App.displayBooksInCategory(category, date);

    }).fail(function () {

      content.append('<div class="error"><p>Sorry, books in the category could not be loaded.</p></div>');

    }).always(function() {

      $('#loader').remove();

    });

  } else {

    $('#loader').remove();
    const categoryFromS = JSON.parse(sessionStorage.getItem(requestURL));
    App.displayBooksInCategory(categoryFromS, date);

  }

};

/**
 * Vykreslí knihy v dané kategorii
 */
App.displayBooksInCategory = function(category, date){

  const content = $('#content');

  var dateText = '';
  if(date === null){
    dateText = 'Current date';
  } else {
    if(date === 'current'){
      dateText = 'Current date';
    } else {
      dateText = date;
    }  
  }

  document.title = `${category.results.display_name} | NYT Books & Movies`;

  const topSection = 
  `<div class="breadcrumbs">
    <div class="link" data-p="b" data-s="o" id="breadcrumbs-home">Books Best Sellers</div>
    <div class="arrow">&gt;</div>
    <div>${category.results.display_name}</div>
  </div>
  <div class="title">
    <div class="headline">
      <h1>${category.results.display_name}</h1>
    </div>
    <div class="date-input">
      <input type="text" placeholder="Select date" id="datepicker" value="${dateText}" />
    </div>
  </div>`;

  content.append(topSection);

  $( "#datepicker" ).datepicker({
    dateFormat: "yy-mm-dd",
    minDate: new Date(2010, 1, 1),
    maxDate: "-1d",
    onSelect: function(dateValue) {
      var url = App.getURLParams();
      url.date = dateValue;
      App.handleBrowser(url);
    }
  });

  $('#breadcrumbs-home').click( App.prepareURLFromAtribut );

  if(category.num_results > 0){

    content.append('<div class="books"></div>');
    var booksContainers = '';
    var exists;

    for(var i = 0; i < category.results.books.length; i++){

      booksContainers += 
      `<div class="book">
        <div class="book-image">
         <img src="${category.results.books[i].book_image}" />
        </div>
        <h3>${category.results.books[i].title}</h3>
        <p class="author">by ${category.results.books[i].author}</p>
        <p class="description">${category.results.books[i].description}</p>`;
  
      exists = true;
      
      try {
        category.results.books[i].isbns[0].isbn10;
      }
      catch(catchCode) {
        exists = false;  
      }

      if(exists){
        booksContainers += `
        <div class="review-button">
          <button id="review-book-${category.results.books[i].isbns[0].isbn10}" class="secondary" data-p="b" data-s="r" data-i="${category.results.books[i].isbns[0].isbn10}">Find reviews</button>
        </div>`;                 
      }

      booksContainers += `
      </div>`;

    }

    $('.books').append(booksContainers);

    for(var k = 0; k < category.results.books.length; k++){

      exists = true;

      try {
        category.results.books[k].isbns[0].isbn10;
      }
      catch(catchCode) {
        exists = false;  
      }

      if(exists){
        $(`#review-book-${category.results.books[k].isbns[0].isbn10}`).click( App.prepareURLFromAtribut );
      } 

    }

  } else {
    content.append('<div class="error"><p>Sorry, no books in the category.</p></div>');
  }  
  
};

/**  KONEC Books Best Sellers > Category PAGE **/

/**  Books Reviews PAGE **/

/**
 * Základní metoda pro Books Reviews PAGE
 */
App.buildPage_BookReview = function(queryValue, queryBy){

  const content = $('#content');
  const topSection = `
    <div class="search-section">
      <h1>Find a book review</h1>
      <div class="search-form">
        <div class="input">
          <input type="text" placeholder="Enter text.." value="${queryValue}" />
        </div>
        <div class="select">  
          <select>
            <option value="null">Search by</option>
            <option value="t" id="t">By book title</option>
            <option value="a" id="a">By author</option>
            <option value="i" id="i">By ISBN</option>
          </select>
        </div>
        <div class="button">
          <button>Search</button>
        </div>
      </div>`; 
  content.append(topSection);

  if(queryBy !== false){

    $('.search-section .search-form .select select').val(App.bookReviewSearchqueryArray[queryBy][1]);
 
  }   
  
  $('#loader').remove();
  
  $('.search-section .search-form .button button').click(function(e){

    App.handleBookSearch(e);

  });

  $('.search-section .search-form .input input').on('keyup', function(e) {
    if (e.keyCode === 13) {

      App.handleBookSearch(e);

    }
  });  

  if(queryBy !== false){

    content.append('<div class="loader" id="loader"></div>');
    App.getBookReview(queryValue, queryBy);

  }

};

/**
 * Fetchne data pro vyhledávání knižních recenzí
 */
App.getBookReview = function(queryValue, queryBy){

  if( $('.reviews').length){ $('.reviews').remove(); }
  const reviews = $('<div class="reviews"></div>');
  $('#content').append(reviews);

  if(queryBy !== false){

    const requestURL = `${App.baseApiUrlBooks}reviews.json?${App.bookReviewSearchqueryArray[queryBy][0]}=${queryValue}&api-key=${App.key}`;

    if(sessionStorage.getItem(requestURL) === null){
      $.getJSON(requestURL).done(function (review) {
      
        sessionStorage.setItem(requestURL, JSON.stringify(review));
        App.printBookReviews(review);
    
      }).fail(function () {
    
        reviews.append( $(`<div class="error"><p>Sorry, book reviews could not be loaded.</p></div>"`) );
    
      }).always(function (){
        $('#loader').remove();
      });

    } else {

      $('#loader').remove();
      const reviewFromS = JSON.parse(sessionStorage.getItem(requestURL));
      App.printBookReviews(reviewFromS);

    }  

  } else {

    reviews.append( $(`<div class="error"><p>Enter text...</p></div>"`) );

  }  

}

/**
 * Vypíše recenze pro danou knihu
 */
App.printBookReviews = function(review){

  const reviews = $('.reviews');

  if(review.num_results > 0){

    var reviewsContainer = '';
    for(var i = 0; i < review.num_results; i++){

      reviewsContainer += 
        `<div class="review">
          <h3>${review.results[i].book_title}</h3>
          <p class="author">by ${review.results[i].book_author}</p>
          <p class="description">${review.results[i].summary}</p>
          <a href="${review.results[i].url}" target="_blank">See review from ${review.results[i].byline}</a> 
        </div>`;        

    }
    reviews.append(reviewsContainer);

  } else {

    reviews.append( $(`<div class="error"><p>Sorry, no book reviews found.</p></div>"`) );

  }
};

/**
 * Event funkce pro akci vyhledávání recenzí knih 
 */
App.handleBookSearch = function(e){

  if( $('.reviews').length){ $('.reviews').remove(); }
  const reviews = $('<div class="reviews"></div>');
  $('#content').append(reviews);

  e.preventDefault;
  const inputValue = $('.search-section .search-form .input input').val();
  
  if( inputValue == ''){

    reviews.append('<div class="error"><p>Enter text...</p></div>');
  
  } else {

    const optionValue = $('.search-section .search-form .select select').children('option:selected').val();
    if(optionValue === 'null'){

      reviews.append('<div class="error"><p>Choose search by.</p></div>');

    } else {

      /* p, s, c, d, i, t, a, search, critic */
      var urlArray;
      switch(optionValue){
        case 't':
          urlArray = ['b', 'r', null, null, null, inputValue, null, null, null ];
          App.prepareURLFromArray( urlArray );
          break;
        case 'i':
          urlArray = ['b', 'r', null, null, inputValue, null, null, null, null ];
          App.prepareURLFromArray( urlArray ); 
          break;
        case 'a':
          urlArray = ['b', 'r', null, null, null, null, inputValue, null, null ];
          App.prepareURLFromArray( urlArray );    
          break;         
      } 
      
    }

  }  

};

/**  KONEC Books Reviews PAGE **/

/** Movies Critics PAGE **/

/**
 * Základní metoda pro Movies Critics PAGE
 */
App.buildPage_MovieCritics = function(){

  const requestURL = `${App.baseApiUrlMovies}/critics/all.json?api-key=${App.key}`;
  const content = $('#content');

  if(sessionStorage.getItem(requestURL) === null){

    $.getJSON(requestURL).done(function (critics) {

      sessionStorage.setItem(requestURL, JSON.stringify(critics));
      App.displayMovieCritics(critics, 0, critics.num_results);

    }).fail(function () {

      content.append('<div class="error"><p>Sorry, movies critics could not be loaded.</p></div>');

    }).always(function (){

      $('#loader').remove();

    });

  } else {

    $('#loader').remove();
    const criticsFromS = JSON.parse(sessionStorage.getItem(requestURL));
    App.displayMovieCritics(criticsFromS, 0, criticsFromS.num_results);

  }  

};

/**
 * Vypíše jednotlivé kritiky
 */
App.displayMovieCritics = function(listCritics, start, stopPoint){

  const content = $('#content');
  var stop = false; 
  if(start > (stopPoint - 5)){

  } else {
    
    const list = $('<ul id="list"></ul>');
    content.append(list);

    var listElements = '';
    for(var i = start; i < (start + 5); i++){
      listElements += `<li id="critic-${i}" data-p="m" data-s="l" data-cr="${listCritics.results[i].display_name}">${listCritics.results[i].display_name}</li>`;

      if(i === (stopPoint - 1)){ break; stop = true; }
    }

    list.append(listElements);

    for(var k = start; k < (start + 5); k++){
      $(`#critic-${k}`).click ( App.prepareURLFromAtribut );
    }

    if(stop === false){
      
      list.append('<li class="load-button"><button>Load more</button></li>');
      const loadButton = $('ul#list li.load-button button');
      loadButton.click(function(){

        if($('ul#list li.load-button').length){ $('ul#list li.load-button').remove(); }
        App.displayMovieCritics(listCritics, start + 5, stopPoint);  
        window.scrollTo(0, document.body.scrollHeight); 

      });

    }
  
  }
}; 

/** KONEC Movies Critics PAGE **/

/** Movies Critics > Critic PAGE **/

/**
 * Základní metoda pro Movies Critics > Critic PAGE
 */
App.buildPage_CriticArticles = function(critic){

  if(critic === ''){

    const urlArray = ['m', 'c', null, null, null, null, null, null, null];
    App.prepareURLFromArray( urlArray );

  } else {

    const requestURL = `${App.baseApiUrlMovies}reviews/search.json?reviewer=${critic}&api-key=${App.key}`;
    const content = $('#content');
    
    if(sessionStorage.getItem(requestURL) === null){

      $.getJSON(requestURL).done(function (criticArticles) {
        
        sessionStorage.setItem(requestURL, JSON.stringify(criticArticles));
        sessionStorage.setItem('critic'+requestURL, critic);
        App.displayMovieCriticsArticles(criticArticles, critic);
        

      }).fail(function () {

        content.append('<div class="error"><p>Sorry, moviews reviews could not be loaded.</p></div>');

      }).always(function() {

        $('#loader').remove();

      });

    } else {

      $('#loader').remove();
      const criticArticlesFromS = JSON.parse(sessionStorage.getItem(requestURL));
      App.displayMovieCriticsArticles(criticArticlesFromS, sessionStorage.getItem('critic'+requestURL));

    }

  }

};

/**
 * Vykreslí recenze daného kritika
 */
App.displayMovieCriticsArticles = function(criticArticles, critic){

  const content = $('#content');

  document.title = `${critic} | NYT Books & Movies`;

  const topSection = 
  `<div class="breadcrumbs">
    <div class="link" data-p="m" data-s="c" id="breadcrumbs-home">Movies Critics</div>
    <div class="arrow">&gt;</div>
    <div>${critic}</div>
  </div>
  <div class="title">
    <div class="headline only">
      <h1>${critic}</h1>
    </div>
  </div>`;

  content.append(topSection);  

  $('#breadcrumbs-home').click( App.prepareURLFromAtribut );

  if(criticArticles.num_results > 0){

    content.append('<div class="reviews"></div>');
    var articlesContainer = '';

    for(var i = 0; i < criticArticles.num_results; i++){
      articlesContainer += 
      `
      <div class="review">
        <h3>${criticArticles.results[i].headline}</h3>
        <p class="author">movie ${criticArticles.results[i].display_title}</p>
        <a href="${criticArticles.results[i].link.url}" target="_blank">See review</a> 
      </div>`;  
    }

    $('.reviews').append(articlesContainer);


  } else {
    content.append('<div class="error"><p>Sorry, no moviews reviews found.</p></div>');
  }

};

/** KONEC Movies Critics > Critic PAGE **/

/** Movies reviews PAGE **/

/**
 * Základní metoda pro Movies reviews PAGE
 */
App.buildPage_MovieReview = function(query){

  var queryText = '';
  if(query !== null){ queryText = query; } 

  const content = $('#content');
  content.append(`
   <div class="search-section">
    <h1>Find a movie review</h1>
    <div class="search-form">
      <div class="input next-button">
        <input type="text" placeholder="Enter text..." value="${queryText}" />
      </div>
      <div class="button">
        <button>Search</button>
      </div>  
    </div>
   </div>`);
  $('#loader').remove();

  $('.search-section .search-form .button button').click( function(e){

    App.handleMovieSearch(e);

  });

  $('.search-section .search-form .input.next-button input').on('keyup', function (e) {
    if (e.keyCode === 13) {

      App.handleMovieSearch(e);

    }
  });
  
  if(query != null){

    content.append('<div class="loader" id="loader"></div>');
    App.getMovieReview(query); 

  }  

};

/**
 * Fetchne data pro vyhledávání filmových recenzí
 */
App.getMovieReview = function(query){

  if( $('.reviews').length){ $('.reviews').remove(); }
  const reviews = $('<div class="reviews"></div>');
  $('#content').append(reviews);

  const clearQuery = query.replace(' ', '%20');
  const requestURL = `${App.baseApiUrlMovies}reviews/search.json?query=${clearQuery}&api-key=${App.key}`;

  if(sessionStorage.getItem(requestURL) === null){

    $.getJSON(requestURL).done(function (review) {

      sessionStorage.setItem(requestURL, JSON.stringify(review));
      App.printMovieReviews(review);

    }).fail(function () {
    
      reviews.append( $(`<div class="error"><p>Sorry, movies reviews could not be loaded.</p></div>"`) );

    }).always(function() {

      $('#loader').remove();  

    });  

  } else {

    $('#loader').remove();
    const reviewFromS = JSON.parse(sessionStorage.getItem(requestURL));
    App.printMovieReviews(reviewFromS);

  }  

};

/**
 * Vykreslí recenze pro daný film
 */
App.printMovieReviews = function(review){

  const reviews = $('.reviews');

  var reviewsContainer = '';
  if(review.num_results > 0){

    for(var i = 0; i < review.num_results; i++){

      reviewsContainer += 
      `
      <div class="review">
        <h3>${review.results[i].headline}</h3>
        <p class="author">movie ${review.results[i].display_title}</p>
        <a href="${review.results[i].link.url}" target="_blank">See review from ${review.results[i].byline}</a> 
      </div>`;  
    } 

    reviews.append(reviewsContainer);

  } else {

    reviews.append( $(`<div class="error"><p>Sorry, no movies reviews found.</p></div>"`) );

  }

};

/**
 * Event funkce pro akci vyhledávání recenzí filmů
 */
App.handleMovieSearch = function(e){

  if( $('.reviews').length){ $('.reviews').remove(); }
  const reviews = $('<div class="reviews"></div>');
  $('#content').append(reviews);

  e.preventDefault();
  var searchInput = $('.search-section .search-form .input.next-button input').val();

  if(searchInput === ''){

    reviews.append('<div class="error"><p>Enter text...</p></div>');

  } else {
    /* p, s, c, d, i, t, a, search */
    const urlArray = ['m', 'r', null, null, null, null, null, searchInput, null ];
    App.prepareURLFromArray( urlArray );
  }

};