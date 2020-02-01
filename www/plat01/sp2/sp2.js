var favouriteBooks = [];
const App = {};

App.init = () => {
    App.bookNameInput = $('#book-name');
    App.picker = $('#picker');
    App.bookList = $('#book-list');
    App.bookListLabel = $('#book-list-label');
    App.searchButton = $('#search-button');
    App.clearPickerButton = $('#clearPicker-button');
    App.clearFavouriteButton = $('#clearFavourite-button');
    App.showBooksButton = $('#show-books');
    
    App.spinerBody = $('#spiner-body');
};

function showBooklist() {

    const spinner = $('<div class="spinner"></div>');
    $('#spiner-body').prepend(spinner);

    //make empty
    if (favouriteBooks.length) {
        App.bookList.empty();
        for (let i = 0; i < favouriteBooks.length; i++) {

            let book = favouriteBooks[i];
            //put book into booklist
            const book_item = $('<li>');
            book_item.html('TITLE: <b>' + book.title + '</b>, AUTHOR: <b>' + book.author_name + '</b>');
            App.bookList.append(book_item);

        }

        App.bookListLabel.hide();
        App.clearFavouriteButton.show();
       
    }
        
    
}

function pickerItemExist(keyword) {

    //Check existing books
    const existingBooks = App.picker.children();
    for (let j = 0; j < existingBooks.length; j++) {
        const existingBook = existingBooks.eq(j);
        const existingBookName = existingBook.attr('data-name');
        if (existingBookName === keyword) {
            return true;
        }
    }
    return false;

}


function createPickerItem(book) {
   
    let item = $('<li class="picker-item">');
    let bookKey = book.title.replace(/ /g, '')
    item.attr('data-name', bookKey);
    item.html('<b>' + book.title + '</b>');


    let button = $('<button>');
    button.text('Info');
    button.click(() => {
        infoBtnHandler(book);
    });
    button.appendTo(item);

    let button2 = $('<button>');
    button2.text('Add To Favourite');
    button2.click(() => {
        addToFavouriteBtnHandler(book);
    });
    button2.appendTo(item);
    
    return item;

   
}


function fillPicker(data) {

    

    for (let i = 0; i < data.docs.length; i++) {
        //console.log(resp.docs);

        // vytvořit i-tou knížku k vybrání
        let book = data.docs[i];
        if (pickerItemExist(book.title)) {
            console.log("Book ", book.title, " is already in the picker...");
            continue;
        }
        let item = createPickerItem(book);
        item.appendTo(App.picker);

        App.picker.appendTo('body');
        
    }

    
}

//Function that is called when Searched button is clicked
//asks server to get data
//fills the picker
function searchBtnHandler() {

    

    let keyword = App.bookNameInput.val();
    keyword = keyword.toLowerCase().trim();
    if (!keyword) {
        return alert('Please enter a valid book or author name');
    }
    console.log("Keyword typed: ", keyword);

    

    var searchMode = $('#bb').val();
    if (searchMode === 'title'){
        
    const spinner = $('<div class="spinner"></div>');
    $('#spiner-body').prepend(spinner);
    
        $.get(`http://openlibrary.org/search.json?title=${keyword}/`).done((resp) => {
            console.log(resp);
            fillPicker(resp);
            spinner.remove();
        });
    }
    else if (searchMode === 'author')

    $.get(`http://openlibrary.org/search.json?author=${keyword}/`).done((resp) => {
        console.info(resp);
        fillPicker(resp);
        spinner.remove();
    });
    
   
}

//Function that is called when Clear Searched button is clicked
//clears all searched books
function clearPickerBtnHandler() {

    App.picker.empty();
}

//Function that is called when Clear Favourite button is clicked
//clears all saved favourite books
function clearFavouriteBtnHandler() {

    favouriteBooks = [];
    $.cookie('booklist', '');
    App.bookList.empty();
    App.bookListLabel.show();
    App.clearFavouriteButton.hide();

}

//Function that is called when Info button is clicked
//replaces row in picker and shows more info
function infoBtnHandler(book) {

    console.log(book);

    let bookKey = book.title.replace(/ /g, '');
    let bookItem = $('.picker-item[data-name=' + bookKey + ']')[0];
    let string = 'TITLE: ' + book.title;
    string += '\nAUTHOR: ' + (book.author_name) ? book.autor_name : '';
    string += '\nYEAR: ' + (book.first_publish_year) ? book.first_publish_year : '';
    if (book.isbn) {
        string += '\nISBN: ' + book.isbn[0];
    }
    if (book.subject) {
        string += '\nKEYWORD: ' + book.subject[0];
    }
    $(bookItem).html(string);

    const hideInfoButton = $('<button>');
    hideInfoButton.text('Hide');

    hideInfoButton.click(() => {
        //restore old item
        $(bookItem).html('').append(createPickerItem(book).get());
    });
    $(bookItem).append(hideInfoButton);
}

//Function that is called when Add To Favourite button is clicked
function addToFavouriteBtnHandler(book) {

    if (favouriteBooks.includes(book)) {
        alert("Book has already been saved to Favourites...");
    }
    else {
        //push into local storage
        favouriteBooks.push(book);

        showBooklist();

        //save cookie cookie
        $.cookie('booklist', JSON.stringify(favouriteBooks), { path: '/' });

        alert("Book was saved to Favourites...");
    }

}


$(document).ready(() => {

    App.init();

    App.searchButton.click(() => {
        searchBtnHandler();
    });

    App.clearPickerButton.click(() => {
        clearPickerBtnHandler();
    });

    App.clearFavouriteButton.click(() => {
        clearFavouriteBtnHandler();
    });

    //load saved books in cookies
    $.cookie.raw = true;
    $.cookie('name', 'value', { path: '/' });
    let localStorageTemp = $.cookie('booklist');

    if (localStorageTemp) {
        favouriteBooks = JSON.parse(localStorageTemp);
        showBooklist();
    }
    else {
        App.clearFavouriteButton.hide();
    }
    console.info("Application Inited");


   

   /* let favouriteBooks_serialized = JSON.stringify(fovouriteBooks)

   letStorage.setItem("favouriteBooks", favouriteBooks_serialized)

    let favouriteBooks_deserialized = localStory.getItem("favouriteBooks")*/













   /*
   function addToFavoriteBooks(keyword){
       let bookList = JSON.parse(localStorage.getItem("favoriteBooks"));
       bookList.push();
       localStorage.setItem("favoriteBooks", JSON.stringify(bookList));
   }
   
   function removeFromFavorites(){
       let bookList = JSON.parse(localStorage.getItem("favoriteBooks"));
       bookList.splice();
       localStorage.setItem("favoriteBooks", JSON.stringify(bookList));
   }
   
   function isInFavorites() {
    let bookList = JSON.parse(localStorage.getItem("favoriteBooks"));
    return bookList.includes();
}
   
   
   
   
   
   */
});



/*1- spinner
2 - local storage
3- podmínka na vyhledávání - autor/title
4- předělat rendrování knih v cyklu

var searchMode = ('').val();
if (searModde === ¨title'){

}else if (searchMode === 'author')*/
