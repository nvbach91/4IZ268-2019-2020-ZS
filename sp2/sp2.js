const App = {};

App.init = () => {
    App.bookNameInput = $('#book-name');
    App.bookList = $('#book-list');
    App.submitButton = $('#submit-button');
};




$(document).ready(() => {
    App.init();
    App.submitButton.click(() => {
        let bookName = App.bookNameInput.val();
        bookName = bookName.toLowerCase().trim();
        if (!bookName) {
            return alert('Please enter a valid book name');
        }

        const existingBooks = App.bookList.children();
        for (let j = 0; j < existingBooks.length; j++) {
            const existingBook = existingBooks.eq(j);
            const existingBookName = existingBook.attr('data-name');
            if (existingBookName === bookName) {
                alert('this book ' + bookName + ' already exists');
                return false;
            }
        }
        $.get(`http://openlibrary.org/search.json?title=${bookName}/`).done((resp) => {


            // vytvořit picker
            const picker = $('<ul>');

            for (let i = 0; i < resp.docs.length; i++) {
                //console.log(resp.docs);

                // vytvořit i-tou knížku k vybrání
                const item = $('<li>');

                const book = resp.docs[i];

                item.text(book.title)

                const button = $('<button>');
                button.text('Add');
                button.click(() => {
                    App.createBook('NÁZEV: ' + book.title + ', AUTOR: ' + book.author_name + ', ISBN: ' + book.isbn)
                    picker.remove()
                    App.bookList.appendTo('body')
                });
                button.appendTo(item);

                item.appendTo(picker)

                picker.appendTo('body');
            }
        })
        App.createBook = (bookName) => {

            const book = $('<li>');
            book.attr('data-name', bookName);
            book.text(bookName);
            App.bookList.append(book);

            const bookDeleteButton = $('<button>');
            bookDeleteButton.text('Remove');

            bookDeleteButton.click(() => {
                book.remove();
            });
            book.append(bookDeleteButton);
        }
    })


});
