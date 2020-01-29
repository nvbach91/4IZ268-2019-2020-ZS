//0. Setting variables
var openForm = $('#open-form');
var formHeader = $('#form-header');
var formBody = $('#form-body');
var form = $('#form');
var myFavList = $('#my-favorite-list');
var reset = $('#reset');
var cover = $('<div>').attr('id', 'whole-page');
var documentBody = $(document.body);
var resultBox;
var openedForm = false;

//1. Open form
var createForm = function () {
    openForm.text('Hide form');
    formHeader.removeClass('closed');
    form.removeClass('closed');
    openedForm = true;
};


//2. Close form
var hideForm = function () {
    if (resultBox !== undefined) {
        resultBox.remove();
        resultBox = undefined;
    }
    openForm.text('Expand the form');
    formHeader.addClass('closed');
    form.addClass('closed');
    reset.trigger('click');
    openedForm = false;
};


//3. Open and close form
openForm.click(function (ev) { 
    ev.preventDefault();
    if (openedForm) {
        hideForm();
    } else {
        createForm();
    }
});


//3. Submit form
form.submit(function (ev) {
    ev.preventDefault();
    createLoader();

    
    var question = $('#searched-text').val().trim().replace(/ /g, '+');
    var way = $('input:checked', '#form').val();
    var maxResult = $('#number-input').val();
    var dataUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + way + ':"' + question + '"&langRestrict=cs&printType=books&maxResults=' + maxResult;

    
    $.getJSON(dataUrl).done(function (response) { 
        if (openedForm) {
            if (resultBox !== undefined) {
                resultBox.remove();
            }
            resultBox = $('<div>').attr('id', 'result-box');
            if (response.totalItems === 0) {
                var result = $('<div>').addClass('result-line').text('No book found.');
                resultBox.append(result); 
            } else {
                for (var i = 0; i < response.items.length; i++) {
                    resultBox.append(addToResults(response.items[i]));
                }
            }
        }
        formBody.append(resultBox);
        cover.empty(); 
        cover.remove();
    });
});


//4. Check if book exists
var bookExists = function (id) {
    var existingBooks = $('.id');
    for (var i = 0; i < existingBooks.length; i++) {
        var book = existingBooks.get(i);
        if (id === book.innerHTML) {
            return true;
        }
    }
    return false;
};


//5. Adding found books to results
var addToResults = function (item) {
    var author = '';
    if (!item.volumeInfo.authors) {
        author = 'Unknown author';
    } else {
        var authors = item.volumeInfo.authors;
        if (authors.length === 1) {
            author = authors[0];
        } else {
            author = authors[0];
            for (var i = 1; i < authors.length; i++) {
                author += ', ' + authors[i];
            }
        }
    }
    var resultLine = $('<div>').addClass('result-line');
    var imageUrl;
    if (!item.volumeInfo.imageLinks) {
        imageUrl = 'https://img.icons8.com/plasticine/2x/book.png';
    } else {
        imageUrl = item.volumeInfo.imageLinks.smallThumbnail;
    }
    var image = $('<img>').addClass('image').attr('src', imageUrl);
    var result = $('<div>').addClass('result').html(author.toUpperCase() + ':<br>' + item.volumeInfo.title);

    var addButton = $('<div>').addClass('add-button').text('Add');
    if (bookExists(item.id)) {
        addButton.addClass('add-existing');
    }
    addButton.click(function () {
        addToFavList(item, author, imageUrl, 0);
        addButton.addClass('add-existing');
    });
    resultLine.append(image).append(result).append(addButton).append('<hr>');
    return resultLine;
};



//6. Adding book to my favorite list
var addToFavList = function (book, author, url, rating) { 
    var books = JSON.parse(localStorage.getItem('books')); 
    if (books[book.id] === undefined) {
        books[book.id] = JSON.stringify([JSON.stringify(book), 0]); 
        localStorage.removeItem('books');
        localStorage.setItem('books', JSON.stringify(books));
    }

    var imageCell = $('<div>').addClass('list-group-item').append($('<img>').addClass('image').attr('src', url));
    var nameCell = $('<div>').addClass('list-group-item').text(book.volumeInfo.title);
    var authorCell = $('<div>').addClass('list-group-item').text(author);

    var year;
    if (!book.volumeInfo.publishedDate) {
        year = 'Unknown';
    } else {
        year = book.volumeInfo.publishedDate;
    }
    var yearCell = $('<div>').addClass('list-group-item').text(year);

    var category;
    var categories = book.volumeInfo.categories;
    if (!categories) {
        category = 'Not specified';
    } else {
        category = categories[0];
        for (var i = 1; i < categories.length; i++) {
            category += ', ' + categories[i];
        }
    }
    var categoryCell = $('<div>').addClass('list-group-item').text(category);

    var star1 = $('<span>').addClass('star').text('☆').attr('title', 'star-1');
    var star2 = $('<span>').addClass('star').text('☆').attr('title', 'star-2');
    var star3 = $('<span>').addClass('star').text('☆').attr('title', 'star-3');
    var star4 = $('<span>').addClass('star').text('☆').attr('title', 'star-4');
    var star5 = $('<span>').addClass('star').text('☆').attr('title', 'star-5');

    var ratingCell = $('<div>').addClass('list-group-item').addClass('rating').append(star1, star2, star3, star4, star5);
    var previewCell = $('<div>').addClass('list-group-item').addClass('preview').text('Demo');
    var deleteCell = $('<div>').addClass('list-group-item').addClass('delete').text('Remove');
    var idCell = $('<div>').addClass('list-group-item').addClass('id').text(book.id);
    var newLine = $('<div>').addClass('group-line').append(imageCell, nameCell, authorCell, categoryCell, yearCell, ratingCell, previewCell, deleteCell, idCell);
    var listGroup = $('#list-group');
    if (listGroup.hasClass('closed')) {
        listGroup.removeClass('closed');
    }
    myFavList.append(newLine);

    deleteCell.click(function () {
        var booksAfterDelete = JSON.parse(localStorage.getItem('books'));
        delete booksAfterDelete[book.id];
        localStorage.removeItem('books');
        localStorage.setItem('books', JSON.stringify(booksAfterDelete));

        newLine.remove();
        if ($('.id').length === 1) {
            listGroup.addClass('closed');
        }
        $('.result').each(function () {
            if (this.innerHTML === author.toUpperCase() + ':<br>' + book.volumeInfo.title) {
                $(this).next().removeClass('add-existing');
            }
        });
    });

    var preview = "Demo not available.";
    if (book.searchInfo) {
        preview = book.searchInfo.textSnippet;
    }
    previewCell.click(function () {
        showPreview(preview);
    });

    newLine.find('.star').click(function () {
        var star = $(this);
        star.nextAll().removeClass('checked');
        star.prevAll().addClass('checked');
        star.addClass('checked');

        var changedRatingBooks = JSON.parse(localStorage.getItem('books'));
        var changedRating = JSON.parse(changedRatingBooks[book.id]);
        changedRating[1] = parseInt(this.title.substr(5));
        changedRatingBooks[book.id] = JSON.stringify(changedRating);
        localStorage.removeItem('books');
        localStorage.setItem('books', JSON.stringify(changedRatingBooks));
    });

    switch (rating) {
        case 1: star1.trigger('click');
            break;
        case 2: star2.trigger('click');
            break;
        case 3: star3.trigger('click');
            break;
        case 4: star4.trigger('click');
            break;
        case 5: star5.trigger('click');
    }
};



//7. Window with preview
var showPreview = function (text) {
    var closeButton = $('<button>').addClass('close-button').text('X');
    var previewWindow = $('<div>').addClass('prev-window').append(closeButton).append($('<div>').addClass('preview-area').text(text));
    documentBody.append(cover.append(previewWindow));

    closeButton.click(function () {
        cover.empty();
        cover.remove();
    });
};


//8. Creating a loader
var createLoader = function () {
    var loader = $('<div>').addClass('loader').append($('<figure>').addClass('page'));
    documentBody.append(cover.append(loader));
};


//9. Initial page
if (localStorage.books) {
    var storedBooks = JSON.parse(localStorage.getItem('books'));
    var keys = Object.keys(storedBooks);
    for (var i = 0; i < keys.length; i++) {
        var content = JSON.parse(storedBooks[keys[i]]);
        var book = JSON.parse(content[0]);
        var rating = content[1];

        var author = '';
        if (!book.volumeInfo.authors) {
            author = 'Unknown author';
        } else {
            var authors = book.volumeInfo.authors;
            if (authors.length === 1) {
                author = authors[0];
            } else {
                author = authors[0];
                for (var j = 1; j < authors.length; j++) {
                    author += ', ' + authors[j];
                }
            }
        }
        var imageUrl;
        if (!book.volumeInfo.imageLinks) {
            imageUrl = 'https://img.icons8.com/plasticine/2x/book.png';
        } else {
            imageUrl = book.volumeInfo.imageLinks.smallThumbnail;
        }
        addToFavList(book, author, imageUrl, rating);
    }
} else {
    var books = new Object();
    localStorage.setItem('books', JSON.stringify(books));
}
