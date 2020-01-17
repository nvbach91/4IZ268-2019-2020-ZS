const App = {};

var get = {
    async: true,
    crossDomain: true,
    method: 'GET',
    url: 'https://mycompanydb-704c.restdb.io/rest/department',
    headers: {
        'cache-control': 'no-cache',
        'x-apikey': '5deb8ea54658275ac9dc240a',
        'content-type': 'application/json'
    }
};

var post = {
    async: true,
    crossDomain: true,
    url: "https://mycompanydb-704c.restdb.io/rest/employee",
    method: "POST",
    headers: {
        "content-type": "application/json",
        "x-apikey": "5deb8ea54658275ac9dc240a",
        "cache-control": "no-cache"
    },
    "processData": false,
    "data": "data"
};

let employeeHTML = '';
let departmentHTML = '';
let count;

let clickedEmployee;

let todoHTML = '';
let todoHTMLData = '';

let doneTasks = '';
let notDoneTasks = '';

let inputFirstname = '';
let inputSurname = '';
let inputSalary = '';
let inputDepartment = '';
let inputID_Department = '';

let inputCode = '';
let inputDescription = '';
let inputRelevancy = '';
let inputDone = '';

let urlHash = '';
let checkIncomeDepartmentFromUrl = false;

let href = '';

//obhajoba
let allDepartmentsWithDuplicites = [];
let spinnerDiv = `<div class="loader"></div>`;
let spinnerDiv2 = `<div class="loader2"></div>`;


$(document).ready(() => {



    if (location.hash === "") {
        loadCoreFunction();
        ajaxDepartmentFunction();
        ajaxHomePageFunction();
        $(App.departmentList).change(function () {
            departmentChangeFunction();
        });
        insertButtonFunction();
    } else {
        urlHash = location.hash.split("#")[1];
        urlHash = urlHash.replace("%20", " ");
        if (urlHash === "IT" || urlHash === "Marketing" || urlHash === "Public relations" || urlHash === "Finance") {
            departmentHTML = `<option>${urlHash}</option>`;
            loadCoreFunction();
            ajaxDepartmentFunction();
            ajaxHomePageFunction();
            $(App.departmentList).change(function () {
                departmentChangeFunction();
            });
            insertButtonFunction();
            checkIncomeDepartmentFromUrl = true;
        } else {
            $.ajax(get,
                get.url = 'https://mycompanydb-704c.restdb.io/rest/employee'
            ).done((resp) => {
                clickedEmployee = location.hash.split("#")[1];
                todoFunction(resp);
            });
        }
    }
});


/*** Funkce, která načte "statické" jádro úvdní html stránky ***/
function loadCoreFunction() {
    $('.container').empty();
    employeeHTML = '';
    employeeHTML =
        `<form>
            <div class="page-header">
                <h1>Databáze zaměstnanců</h1>
            </div>

            <div class="form-group for-spinner">
                <label for="exampleFormControlSelect1">Filtr:</label>
                <select class="form-control" id="exampleFormControlSelect1" placeholder="Default input">
                </select>
            </div>

            <h2>Seznam zaměstnanců</h2>
            <div id="list">
                <div class="row">
                    <div class="col-sm-3">
                        <h3>Jméno</h3>
                    </div>
                    <div class="col-sm-3">
                        <h3>Příjmení</h3>
                    </div>
                    <div class="col-sm-3">
                        <h3>Plat</h3>
                    </div>
                    <div class="col-sm-3">
                        <h3>Počet úkolů</h3>
                    </div>
                </div>
            </div>

            <h2 class="h2-new-employee">Nový zaměstnanec</h2>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="">Jméno a Příjmení</span>
                </div>
                <input type="text" class="form-control" id="input-firstname">
                <input type="text" class="form-control" id="input-surname">
            </div>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Plat</span>
                </div>
                <input type="number" class="form-control" id="input-salary" aria-label="Default" aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Oddělení</label>
                </div>
                <select class="custom-select" id="inputGroupSelect01">
                    <option selected>---</option>
                </select>
            </div>

            <button type="button" class="btn btn-dark" id="btn-insert">Přidej zaměstnance</button>
        </form>`
    $('.container').append(employeeHTML);


    App.employeeList = $('#list');
    App.departmentList = $('#exampleFormControlSelect1');
    App.departmentList2 = $('#inputGroupSelect01');
    App.backButton = $('#btn-back');
    App.insertButton = $('#btn-insert');

}


/*** Funkce, která načte data z databáze a "vykreslí" data na úvodní stránku ***/
function ajaxHomePageFunction() {

    App.employeeList.append(spinnerDiv);

    $.ajax(get,
        get.url = 'https://mycompanydb-704c.restdb.io/rest/employee'
    ).done((resp) => {

        App.employeesFromDB = resp;
        employeeHTML = '';

        resp.forEach(element => {
            loadDataFunction(element);
        });
        $('.loader').remove();
        App.employeeList.append(employeeHTML);

        $('.surname-button').click(function () {
            // console.log($(this)[0].innerText);
            clickedEmployee = $(this)[0].innerText;
            todoFunction(resp);
        });
    });
}


/*** Funkce, která načte oddělení z databáze ***/
function ajaxDepartmentFunction() {

    $(".for-spinner").append(spinnerDiv2);

    $.ajax(get,
        get.url = 'https://mycompanydb-704c.restdb.io/rest/employee'
    ).done((resp3) => {
        resp3.forEach(element => {
            allDepartmentsWithDuplicites.push(element.department[0].name);
        });
        console.log(allDepartmentsWithDuplicites.length);
    });


    $.ajax(get,
        get.url = 'https://mycompanydb-704c.restdb.io/rest/department'
    ).done((resp2) => {
        let howManyEmployees = 0;
        departmentHTML += `<option>Všechna oddělení (počet zaměstnanců = ${allDepartmentsWithDuplicites.length})</option>`;
        resp2.forEach(element2 => {
            howManyEmployees = 0;
            allDepartmentsWithDuplicites.forEach(element => {
                if (element === element2.name) {
                    howManyEmployees++;
                }
            });

            if (urlHash !== element2.name) {
                departmentHTML +=
                    `<option value="${element2.name}">${element2.name} (počet zaměstnanců = ${howManyEmployees})</option>`;
            }
        });
        $('.loader2').remove();

        App.departmentList.append(departmentHTML);
        App.departmentList2.append(departmentHTML);
    });
}

/*** Funkce, která obstarává přenačtení sránky dle zvoleného oddělení - FILTR ***/
function departmentChangeFunction() {
    checkIncomeDepartmentFromUrl = false;
    employeeHTML = '';

    App.employeesFromDB.forEach(element => {
        if (element.department[0].name === App.departmentList.val() || App.departmentList.val() === `Všechna oddělení (počet zaměstnanců = ${allDepartmentsWithDuplicites.length})`) {
            loadDataFunction(element);
        }
    });
    $('.content-of-list').remove();
    App.employeeList.append(employeeHTML);

    $('.surname-button').click(function () {
        clickedEmployee = $(this)[0].innerText;
        todoFunction(App.employeesFromDB);
    });

    //změna URL dle zvoleného oddělení
    href = location.href;
    if (App.departmentList.val() !== `Všechna oddělení (počet zaměstnanců = ${allDepartmentsWithDuplicites.length}`) {
        if (location.hash === "") {
            href = location.href + "#" + App.departmentList.val();
            history.pushState(null, null, href);
        } else {
            href = href.split("#");
            href = href[0];
            href += "#" + App.departmentList.val();
            history.pushState(null, null, href);
        }
    } else {
        href = href.split("#");
        console.log(href);
        href = href[0];
        history.pushState(null, null, href);
        console.log("tady");
    }
}

/*** Funkce, která obstarává tlačítko "Přidej zaměstnance" ***/
function insertButtonFunction() {
    $(App.insertButton).click(function () {

        inputFirstname = $('#input-firstname')[0].value;
        inputSurname = $('#input-surname')[0].value;
        inputSalary = $('#input-salary')[0].value;
        inputDepartment = App.departmentList2.val();

        App.employeesFromDB.forEach(element => {
            //vybrání správného oddělení kvůli získání _id
            if (element.department[0].name === App.departmentList2.val()) {
                inputID_Department = element.department[0]._id;
                // console.log(element.department[0]._id);
            };
        });

        var jsondata = {
            "firstname": inputFirstname,
            "surname": inputSurname,
            "salary": inputSalary,
            "department": [{
                "_id": inputID_Department,
                "name": inputDepartment
            }],
            "task": []
        };

        $.ajax(post, post.data = JSON.stringify(jsondata)).done(function (response) {
            console.log(response);
            location.reload();
        });
    });
}



/*** Funkce, která naplní obsah úvodní stránky - seznam zaměstnanců. ***/
function loadDataFunction(element) {
    count = 0;
    element.task.forEach(() => {
        count++;
    });

    if (checkIncomeDepartmentFromUrl) {
        if (element.department[0].name === urlHash) {
            employeeHTML +=
                `<div class="row content-of-list">
                <div class="col-sm-3">
                    <p>${element.firstname}</p>
                </div>
                <div class="col-sm-3">
                    <p class="surname-button">${element.surname}</p>
                </div>
                <div class="col-sm-3">
                    <p>${element.salary} Kč</p>
                </div>
                <div class="col-sm-3">
                    <p>${count}</p>
                </div>
            </div>`;
        }
    } else {
        employeeHTML +=
            `<div class="row content-of-list">
            <div class="col-sm-3">
                <p>${element.firstname}</p>
            </div>
            <div class="col-sm-3">
                <p class="surname-button">${element.surname}</p>
            </div>
            <div class="col-sm-3">
                <p>${element.salary} Kč</p>
            </div>
            <div class="col-sm-3">
                <p>${count}</p>
            </div>
        </div>`;
    }


}

/*** Funkce, která se spustí při kliknutí na příjmení zaměstnance a zobrazí seznam jeho úkolů. ***/
function todoFunction(resp) {
    $('.container').empty();

    resp.forEach(element => {
        todoHTML = '';
        if (element.surname === clickedEmployee) {
            todoHTML =
                `<form>
                    <button type="button" class="btn btn-dark" id="btn-back">Zpět na domovskou stránku</button>
                    <h1 class="todolist">Seznam úkolů</h1>
                    <h2 class="name-surname">${element.firstname} ${element.surname}</h2>
                    <h3 class="name-department">(Oddělení: ${element.department[0].name})</h3>

                    <h2>Seznam nezpracovaných úkolů</h2>
                    <div id="todo-tasks">
                        <div class="row">
                            <div class="col-sm-1">
                                <h3>Kód</h3>
                            </div>
                            <div class="col-sm-3">
                                <h3>Závažnost</h3>
                            </div>
                            <div class="col-sm-2">
                                <h3>Hotovo</h3>
                            </div>
                            <div class="col-sm-6">
                                <h3>Popis</h3>
                            </div>
                        </div>
                    </div> 
                    
                    <h2 id=h2-done>Hotové úkoly</h2>
                    <div id="done-tasks">
                        <div class="row">
                            <div class="col-sm-1">
                                <h3>Kód</h3>
                            </div>
                            <div class="col-sm-3">
                                <h3>Závažnost</h3>
                            </div>
                            <div class="col-sm-2">
                                <h3>Hotovo</h3>
                            </div>
                            <div class="col-sm-6">
                                <h3>Popis</h3>
                            </div>
                        </div>
                    </div>

                    <h2 id=h2-new>Nový úkol</h2>
                    <div class="new-task">
                    <!-- Code -->
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Kód</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Default"
                        aria-describedby="inputGroup-sizing-default" id="inputCode">
                    </div>
                    <!-- Description -->
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Popis</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Default"
                        aria-describedby="inputGroup-sizing-default" id="inputDescription">
                    </div>
                    <!-- Radio buttons - relevancy -->
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">Závažnost</span>
                    </div>
                    <div class="form-check  my-radio-button">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                        value="option1" checked>
                        <label class="form-check-label" for="exampleRadios1">
                            low
                        </label>
                    </div>
                    <div class="form-check  my-radio-button">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                        value="option2">
                        <label class="form-check-label" for="exampleRadios2">
                            medium
                        </label>
                    </div>
                    <div class="form-check my-radio-button">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3"
                        value="option3">
                        <label class="form-check-label" for="exampleRadios3">
                            high
                        </label>
                    </div>
                    <!-- Chesckbox - done -->
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">Stav</span>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input my-checkbox" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                                Hotovo
                            </label>
                        </div>
                        <button type="button" class="btn btn-dark" id="insertTaskButton">Přidej úkol</button>
                    </div>
                    
                </form>`

            $('.container').append(todoHTML);

            todoHTMLData = '';
            doneTasks = '';
            notDoneTasks = '';
            for (let i = 0; i < element.task.length; i++) {
                // console.log(element.task[i].description);
                todoHTMLData =
                    `<div class="row">
                            <div class="col-sm-1">
                                <div>${element.task[i].code}</div>
                            </div>
                            <div class="col-sm-3">
                                <div>${element.task[i].relevancy}</div>
                            </div>
                            <div class="col-sm-2">
                                <div>${element.task[i].done}</div>
                            </div>
                            <div class="col-sm-6">
                                <div>${element.task[i].description}</div>
                            </div>
                        </div>
                        `
                if (element.task[i].done === true) {
                    doneTasks += todoHTMLData;
                }
                else {
                    notDoneTasks += todoHTMLData;
                }
            }
            $('#todo-tasks').append(notDoneTasks);
            $('#done-tasks').append(doneTasks);

            //přidání hashe
            if (location.hash === "") {
                href = location.href + "#" + element.surname;
                history.pushState(null, null, href);
            } else {
                href = href.split("#");
                href = href[0];
                href += "#" + element.surname;
                history.pushState(null, null, href);
            }

            //přidávací tlačítko
            $('#insertTaskButton').click(function () {

                // alert("No a tohle bohužel nefunguje :(");

                //výběr označené varianty radio buttonu
                for (let i = 0; i < $('.my-radio-button').length; i++) {
                    if ($('.my-radio-button')[i].firstElementChild.checked === true) {
                        let radio = $('.my-radio-button')[i].lastElementChild.innerText;
                        inputRelevancy = radio;
                    }
                }

                inputCode = $('#inputCode')[0].value;
                inputDescription = $('#inputDescription')[0].value;
                inputDone = $('.my-checkbox')[0].checked;

                // console.log(inputCode);
                // console.log(inputDescription);
                // console.log(inputRelevancy);
                // console.log(inputDone);

                var jsondata = {
                    "code": inputCode,
                    "description": inputDescription,
                    "relevancy": inputRelevancy,
                    "done": inputDone
                };

                $.ajax(post,
                    post.data = JSON.stringify(jsondata),
                    post.url = "https://mycompanydb-704c.restdb.io/rest/task"
                ).done(function (response) {
                    // console.log(response);

                    var jsondata2 = [{
                        "_id": response._id,
                        "code": inputCode,
                        "description": inputDescription,
                        "relevancy": inputRelevancy,
                        "done": inputDone
                    }];

                    var task = jsondata2.concat(element.task);

                    jsondata2 = { taskK };

                    var patch = {
                        "async": true,
                        "crossDomain": true,
                        "url": `https://mycompanydb-704c.restdb.io/rest/employee/${element._id}`,
                        "method": "PATCH",
                        "headers": {
                            "content-type": "application/json",
                            "x-apikey": "5deb8ea54658275ac9dc240a",
                            "cache-control": "no-cache"
                        },
                        "processData": false,
                        "data": JSON.stringify(jsondata2)
                    }

                    $.ajax(patch).done(function (response) {
                        console.log(response.task);
                        let arrayLength = response.task.length;
                        console.log(response.task[arrayLength - 1]);

                        newTaskHTML =
                            `<div class="row">
                            <div class="col-sm-1">
                                <div>${response.task[0].code}</div>
                            </div>
                            <div class="col-sm-3">
                                <div>${response.task[0].relevancy}</div>
                            </div>
                            <div class="col-sm-2">
                                <div>${response.task[0].done}</div>
                            </div>
                            <div class="col-sm-6">
                                <div>${response.task[0].description}</div>
                            </div>
                        </div>
                        `
                        if (response.task[0].done === true) {
                            $('#done-tasks').append(newTaskHTML);
                        }
                        else {
                            $('#todo-tasks').append(newTaskHTML);
                        }

                    });

                    /*** NEFUNKČNÍ VAIANTA S PUSH ***/
                    // var jsondata2 = {
                    //     "$push": {
                    //         "task": {
                    //             "_id": response._id,
                    //             "code": inputCode,
                    //             "description": inputDescription,
                    //             "relevancy": inputRelevancy,
                    //             "done": inputDone
                    //         }
                    //     }
                    // };

                    // var put = {
                    //     "async": true,
                    //     "crossDomain": true,
                    //     "url": `https://mycompanydb-704c.restdb.io/rest/employee/${element._id}`,
                    //     "method": "PUT",
                    //     "headers": {
                    //         "content-type": "application/json",
                    //         "x-apikey": "5deb8ea54658275ac9dc240a",
                    //         "cache-control": "no-cache"
                    //     },
                    //     "processData": false,
                    //     "data": JSON.stringify(jsondata2)
                    // }

                    // $.ajax(put).done(function (response) {
                    //     console.log(response);
                    // });

                }).fail(function (resp) {
                    if (resp.status === 0) {
                        alert('Nejste připojeni k internetu');
                    } else {
                        alert(resp.responseJSON.message);
                    }
                });
            });
        }
    });



    // history.pushState('todo', null, 'todo.html');
    $('#btn-back').click(function () {
        href = location.href.split("#");
        href = href[0];
        history.pushState(null, null, href);

        //opět načtení první stránky
        loadCoreFunction();
        urlHash = '';
        departmentHTML = '';
        employeeHTML = '';
        ajaxDepartmentFunction()
        ajaxHomePageFunction();
        App.employeeList.append(employeeHTML);
        $(App.departmentList).change(function () {
            departmentChangeFunction();
        });
        insertButtonFunction();
    });
}