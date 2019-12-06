const App = {};
$(document).ready(() => {
    //$.get('');
    App.userList = $('#user-list');
    const spinner = $('<div class="spinner"></div>')
    App.userList.append(spinner);
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/users',
        method: 'GET',
    }).done((users) => {
        let usersHTML = '';
        users.forEach((user) => {
            usersHTML += `
                <li class="user">
                    <div>${user.name}</div>
                    <div><a href="mailto:${user.email}">${user.email}</a></div>
                </li>
            `;
        });
        App.userList.append(usersHTML);
    }).always(() => {
        spinner.remove();
    });
});