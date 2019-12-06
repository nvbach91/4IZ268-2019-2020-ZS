/*const App = {};
$(document).ready(() => {

    App.userList = $('#users');

    //$.get()
    const spinner = $('<div class="spinner"></div>');
    $(document.body).append(spinner);
    $.ajax({
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/users',
    }).done((users) => {
        let usersHTML = '';
        users.forEach((user) => {
            usersHTML += `<li class="user">
                <div class="name">${user.name}</div>
                <div class="email"><a href="mailto:${user.email}">${user.email}</a></div>
            </li>`;
        });
        App.userList.append(usersHTML);
    }).always(() => {
        spinner.remove();
    });

});*/


const App = {};
$(document).ready(() => {

    App.userList = $('#users');

    //$.get()
    const spinner = $('<div class="spinner"></div>');
    $(document.body).append(spinner);
    $.ajax({
        method: 'GET',
        url: 'https://reqres.in/api/users',
    }).done((resp) => {
        const users = resp.data;
        let usersHTML = '';
        users.forEach((user) => {
            usersHTML += `<li class="user">
                <div class="name">${user.first_name} ${user.last_name}</div>
                <div class="email"><a href="mailto:${user.email}">${user.email}</a></div>
            </li>`;
        });
        App.userList.append(usersHTML);
    }).always(() => {
        spinner.remove();
    });


    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/users',
        data: {
            id: 2000,
            name: 'Dave',
            email: 'dave@gmail.com',
            //...
        },
        method: 'POST'
    }).done((resp) => {
        console.log(resp);
    });
});