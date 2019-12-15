// var db = new db("5deb8ea54658275ac9dc240a", "https://mycompanydb-704c.restdb.io/rest/employee");
// var obj = new db.department(properties);


const App = {};
$(document).ready(() => {

    App.employeeList = $('#list');
    App.departmentList = $('#exampleFormControlSelect1');
    App.departmentList2 = $('#inputGroupSelect01');
    App.backButton = $('#btn-back');
    
    

    let employeeHTML = '';
    let departmentHTML = '';

    // for (let i = 0; i < 3; i++) {
    //     console.log("Hello")
    //     employeeHTML +=
    //         `<div class="row">
    //         <div class="col-sm-3">
    //         <a href="./todolist/index.html"> Lorem ipsum dolor..</a>
    //         </div>
    //         <div class="col-sm-3">
    //             <p>Lorem ipsum dolor..</p>
    //         </div>
    //         <div class="col-sm-3">
    //             <p>Lorem ipsum dolor..</p>
    //         </div>
    //         <div class="col-sm-3">
    //             <p>Lorem</p>
    //         </div>
    //     </div>`;
    // }
    // App.employeeList.append(employeeHTML);

    for (let i = 0; i < 1; i++) {
        console.log("Hello")
        departmentHTML +=
            `<option>Odd1</option>
        <option>Odd2</option>
        <option>Odd3</option>
        <option>Odd4</option>
        <option>Odd5</option>`;
    }
    App.departmentList.append(departmentHTML);
    App.departmentList2.append(departmentHTML);



    // $.get("https://mycompanydb-704c.restdb.io/rest/employee").done((resp) => {
    //     console.log(resp);
    // });

    // var help = $.get("https://mycompanydb-704c.restdb.io/rest/employee/q={\"published\": true}");

    $.ajax({
        method: 'GET',
        url: 'https://mycompanydb-704c.restdb.io/rest/employee',
        headers: {
            'cache-control': 'no-cache',
            'x-apikey': '5deb8ea54658275ac9dc240a',
            'content-type': 'application/json'
        }
    }).done((resp) => {
        // for(let i=0; i<resp.length; i++){
        //     console.log(`Response done = ${resp[i].firstname}`);
        // }
        resp.forEach(element => {
            console.log(`Response done = ${element.firstname}`);  
            console.log(`Response done = ${element.surname}`);  
            console.log(`Response done = ${element.salary}`);  


            // $.ajax({
            //     method: 'GET',
            //     url: `https://mycompanydb-704c.restdb.io/rest/task?q={"firstname": "${element.firstname}"}&h={"$aggregate":["COUNT:"]}`,
            //     headers: {
            //         'cache-control': 'no-cache',
            //         'x-apikey': '5deb8ea54658275ac9dc240a',
            //         'content-type': 'application/json'
            //     }
            // }).done((resp2) => {
            //     console.log(resp2);
            // });



            employeeHTML +=
                `<div class="row">
                    <div class="col-sm-3">
                    <p><a href="./todolist/index.html">${element.firstname}</a></p>
                    </div>
                    <div class="col-sm-3">
                        <p>${element.surname}</p>
                    </div>
                    <div class="col-sm-3">
                        <p>${element.salary}</p>
                    </div>
                    <div class="col-sm-3">
                        <p>...</p>
                    </div>
                </div>`;

            });
            App.employeeList.append(employeeHTML);
    });


    App.backButton.click(() => {
        window.history.back();
    });


});