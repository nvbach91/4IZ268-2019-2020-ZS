const App = {};

App.init = () => {
    App.result = $('#open-section');
};

$(document).ready(() => {
    App.init();

    $.ajax({
        method: 'GET',
        url: 'https://henl01-2446.restdb.io/rest/mojeukoly',
        headers: { 
            'x-apikey': '5def9e59bf46220df655d944'
        }
    }).done((resp) => {
        let tasksHTML = '';
        console.log(`Response done`);
        resp.forEach(task => {
            tasksHTML += `<div class="task">${task.Text}</div>`
        });
        App.result.append(tasksHTML);
    }).fail((resp) => {
        console.log(`Response fail = ${resp}`);
    });

})

