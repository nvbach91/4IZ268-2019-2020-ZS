const App = {};


App.init = () => {
    App.ajaxReq = null;
    App.displayList = $('#display-list');
    App.title = $('title');
    App.allArmiesArray = new Array();
    App.weaponsArray = new Array();
    App.tacticsArray = new Array();
    App.unitsArray = new Array();
    App.armyArray = new Array();
    App.armyRestID = '';
    App.Warnings = new Array();
    App.isLoadingDone = false;
    App.unitArmyBuilderNumber = 0;
    App.settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://killteam-12dc.restdb.io/rest/units",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "5df23c92bf46220df655da5b",
            "cache-control": "no-cache"
        }
    };
    App.settingsDelete = {
        "async": true,
        "crossDomain": true,
        "url": `https://killteam-12dc.restdb.io/rest/armies/`,
        "method": "DELETE",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "5df23c92bf46220df655da5b",
            "cache-control": "no-cache"
        }
    }
};

//var stateUrl = '';

$(document).ready(() => {
    App.init();



    if (App.getUrlIds()[0] == null && App.getUrlIds()[1] == null) {
        var stateObj = { foo: "bar" };
        history.replaceState(stateObj, "page 2", `?menu=home`);
    }

    if (window.localStorage.getItem('allArmiesArrayLocal') == null || window.localStorage.getItem('weaponsArrayLocal') == null || window.localStorage.getItem('tacticsArrayLocal') == null || window.localStorage.getItem('unitsArrayLocal') == null) {
        App.getContent();
    } else {
        App.isLoadingDone = true;
        App.timeToUpdate();
    }

    $('#home').click(function () {
        if (App.armyArray != '') {

            Swal.fire({
                title: 'You have unsaved army.',
                text: "Going away will delete your army. Are you sure you want to delete?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    App.unitArmyBuilderNumber = 0;
                    App.armyArray = [];
                    App.armyRestID = '';
                    var stateObj = { foo: "bar" };
                    history.replaceState(stateObj, "page 2", `?menu=home`);
                    App.paramStateSolve();
                }

            });
        } else {
            var stateObj = { foo: "bar" };
            history.replaceState(stateObj, "page 2", `?menu=home`);
            App.paramStateSolve();
        }
    })

    $('nav div').click(function () {
        const urlParams = App.getUrlIds();
        var stateObj = { foo: "bar" };

        if (urlParams[1] == null || urlParams[1] == 'builder' || urlParams[1] == 'home') {
            history.replaceState(stateObj, "page 2", `?race=${this.id}&menu=description`);//změna záznamu aktuálního stavu v historii  
            $('#builder').css("background-color", "");
        } else {
            history.replaceState(stateObj, "page 2", `?race=${this.id}&menu=${urlParams[1]}`);//změna záznamu aktuálního stavu v historii            
        }
        App.paramStateSolve();
    })

    $('aside div').click(function () {
        const urlParams = App.getUrlIds();

        if (urlParams[0] != null) {
            var stateObj = { foo: "bar" };
            history.replaceState(stateObj, "page 2", `?race=${urlParams[0]}&menu=${this.id}`);//změna záznamu aktuálního stavu v historii         
            App.paramStateSolve();
        } else {
            Swal.fire('Select faction first');
        }
    })

    $('#builder').click(function () {
        if (App.armyArray != '') {

            Swal.fire({
                title: 'You have unsaved army.',
                text: "Going away will delete your army. Are you sure you want to delete?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    App.unitArmyBuilderNumber = 0;
                    App.armyArray = [];
                    App.armyRestID = '';
                    var stateObj = { foo: "bar" };
                    history.replaceState(stateObj, "page 2", `?menu=${this.id}`);//změna záznamu aktuálního stavu v historii         
                    App.paramStateSolve();

                }

            });



            // if (confirm('You have unsaved army. Going away will delete your army. Are you sure you want to delete?')) {
            //     App.unitArmyBuilderNumber = 0;
            //     App.armyArray = [];
            //     App.armyRestID = '';
            //     var stateObj = { foo: "bar" };
            //     history.replaceState(stateObj, "page 2", `?menu=${this.id}`);//změna záznamu aktuálního stavu v historii         
            //     App.paramStateSolve();

            // } else {

            // }
        } else {

            var stateObj = { foo: "bar" };
            history.replaceState(stateObj, "page 2", `?menu=${this.id}`);//změna záznamu aktuálního stavu v historii         
            App.paramStateSolve();
        }
    })
});

App.timeToUpdate = () => {

    let targetDate = new Date();
    targetDate.setMinutes(targetDate.getMinutes() - 10);

    let dateStr = JSON.parse(window.localStorage.getItem('timestamp'));
    let date = new Date(dateStr);

    //console.log("Stamp " + date);
    //console.log("Target " + targetDate);

    if (date < targetDate) {
        App.getContent();
    } else {
        App.allArmiesArray = JSON.parse(window.localStorage.getItem('allArmiesArrayLocal'));
        App.unitsArray = JSON.parse(window.localStorage.getItem('unitsArrayLocal'));
        App.tacticsArray = JSON.parse(window.localStorage.getItem('tacticsArrayLocal'));
        App.weaponsArray = JSON.parse(window.localStorage.getItem('weaponsArrayLocal'));
        App.paramStateSolve();
    }
};

App.paramStateSolve = () => {
    const urlParams = App.getUrlIds();
    if (urlParams[0] != null) {

        $('nav div').css("background-color", "");
        $('aside div').css("background-color", "");
        $('aside').css("width", "100px");
        $('.main-container').css("padding", "");
        $(`#${urlParams[0]}`).css("background-color", "turquoise");
        $(`#${urlParams[1]}`).css("background-color", "turquoise");

        if (App.isLoadingDone == true) {
            App.displayContent(urlParams[0].toLowerCase().replace('-', ' '), urlParams[1].toLowerCase().replace('-', ' '));
        }

        document.title = `kill team - ${urlParams[0].replace('-', ' ')} - ${urlParams[1].replace('-', ' ')}`;
    } else if (urlParams[1] == 'builder') {
        $('nav div').css("background-color", "");
        $('aside div').css("background-color", "");
        $('nav div').css("pointer-events", "none");
        $('aside div').css("pointer-events", "none");
        $('#home').css("background-color", "");
        $('nav').css("height", "0px");
        $('aside').css("width", "0px");
        $('.main-container').css("padding", "80px");

        $(`#${urlParams[1]}`).css("background-color", "turquoise");

        if (App.isLoadingDone == true) {
            App.displayContent('none', urlParams[1].toLowerCase().replace('-', ' '));
        }

        document.title = `kill team - ${urlParams[1].replace('-', ' ')}`;
    } else if (urlParams[1] == 'home') {
        $('nav div').css("background-color", "");
        $('aside div').css("background-color", "");
        $('nav div').css("pointer-events", "auto");
        $('aside div').css("pointer-events", "auto");
        $('#builder').css("background-color", "");
        $('nav').css("height", "100px");
        $('.main-container').css("padding", "");

        $(`#${urlParams[1]}`).css("background-color", "turquoise");

        if (App.isLoadingDone == true) {
            App.displayContent('none', urlParams[1].toLowerCase().replace('-', ' '));
        }

        document.title = `kill team - ${urlParams[1].replace('-', ' ')}`;
    }
};

App.getContent = () => {

    App.armyArray = [];
    App.armyRestID = '';
    App.displayList.empty();
    const spinner = $('<div class="spinner"></div>');
    App.displayList.append(spinner);

    App.isLoadingDone = false;

    let set = App.settings;

    $.when(
        $.ajax(set, set.url = `https://killteam-12dc.restdb.io/rest/armies?h={"$orderby":%20{"user":%201}}`).done((response) => { App.allArmiesArray = response }),
        $.ajax(set, set.url = `https://killteam-12dc.restdb.io/rest/weapons?h={"$orderby":%20{"name":%201}}`).done((response) => { App.weaponsArray = response }),
        $.ajax(set, set.url = `https://killteam-12dc.restdb.io/rest/units?h={"$orderby":%20{"name":%201}}`).done((response) => { App.unitsArray = response }),
        $.ajax(set, set.url = `https://killteam-12dc.restdb.io/rest/tactics?h={"$orderby":%20{"name":%201}}`).done((response) => { App.tacticsArray = response })
    ).then(function () {
        // alert('all complete');

        if (typeof (Storage) !== "undefined") {
            window.localStorage.setItem('allArmiesArrayLocal', JSON.stringify(App.allArmiesArray));
            window.localStorage.setItem('weaponsArrayLocal', JSON.stringify(App.weaponsArray));
            window.localStorage.setItem('unitsArrayLocal', JSON.stringify(App.unitsArray));
            window.localStorage.setItem('tacticsArrayLocal', JSON.stringify(App.tacticsArray));
            window.localStorage.setItem('timestamp', JSON.stringify(newDate = new Date()));
        } else {
            // No web storage Support.
        }
        App.isLoadingDone = true;
        spinner.remove();
        App.paramStateSolve();
    });

};


App.displayContent = (faction, database) => {
    App.displayList.empty();
    if (database != 'description') {
        let htmlString = "";

        if (database == 'builder') {
            htmlString += `<div class="army-select-box">`;

            for (let i = 0; i < App.allArmiesArray.length; i++) {
                htmlString += `
                <div class="army-display-selector" id="${App.allArmiesArray[i]._id}">                
                    <div style="background-color:${App.allArmiesArray[i].army.colour}">ID: ${App.allArmiesArray[i]._id}</div>
                    <div>Name: ${App.allArmiesArray[i].army.name}</div>
                    <div>Faction: ${App.allArmiesArray[i].army.faction}</div>                
                    <button id="delete-army-button${App.allArmiesArray[i]._id}">Delete</button>
                </div>`;
            }

            htmlString += `<div class="army-add">+</div></div>`;

        }

        if (database == 'addArmy') {
            htmlString += App.constructArmyHTML();
            //App.unitAdd = $('.add-unit');
        }

        if (database == 'tactics') {
            let arrayFiltered = App.tacticsArray.filter(x => x.faction === faction);
            for (let i = 0; i < arrayFiltered.length; i++) {
                htmlString += `
                    <div class="pi-row">
                        <span>Name: ${arrayFiltered[i].name}</span>
                    </div>
                    <div class="pi-row">
                        <span>${arrayFiltered[i].description}</span>
                    </div><br>`;
            }
        }

        if (database == 'units') {

            let blacklist = new Array()

            let arrayFiltered = App.unitsArray.filter(x => x.faction === faction);

            for (let i = 0; i < arrayFiltered.length; i++) {


                let found = blacklist.find(element => element === arrayFiltered[i].name);
                if (found == null) {

                    if (arrayFiltered[i].grouping[0] != 0) {

                        let results = arrayFiltered.filter(x => x.grouping != null);
                        results = results.filter(x => x.grouping[0] === arrayFiltered[i].grouping[0]);
                        arrayFiltered = arrayFiltered.filter((x) => !results.includes(x));
                        results.sort((a, b) => parseFloat(a.grouping[1]) - parseFloat(b.grouping[1]));

                        htmlString += App.constructUnitHTML(results[0], 'top');

                        for (let i = 0; i < results.length; i++) {
                            blacklist.push(results[i].name);
                            htmlString += App.constructUnitHTML(results[i], 'mid');
                        }
                        htmlString += App.constructUnitHTML(results[0], 'bot');

                        arrayFiltered = arrayFiltered.concat(results);
                        arrayFiltered.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

                    } else {
                        htmlString += App.constructUnitHTML(arrayFiltered[i], 'top');
                        htmlString += App.constructUnitHTML(arrayFiltered[i], 'mid');
                        htmlString += App.constructUnitHTML(arrayFiltered[i], 'bot');
                    }
                }
            }
        }

        if (database == 'weapons') {
            let arrayFiltered = App.weaponsArray.filter(x => x.faction === faction);

            htmlString = `
            <div class="unit-card">
                <div>
                    <h2>Weapons</h2>
                </div>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Range</th>
                        <th>Type</th>
                        <th>S</th>
                        <th>AP</th>
                        <th>D</th>
                        <th>Abilities</th>
                        <th>Value</th>                    
                    </tr>`;

            for (let i = 0; i < arrayFiltered.length; i++) {
                if (arrayFiltered[i].compound[0] != 0) {
                    htmlString += App.constructWeaponHTML(arrayFiltered[i], 'mid', i, false);
                    htmlString += App.constructWeaponHTML(arrayFiltered[i].compound, 'mid', i, false);
                } else {
                    htmlString += App.constructWeaponHTML(arrayFiltered[i], 'mid', i, true);
                }
            }
            htmlString += `</table></div>`;
        }

        App.displayList.append(htmlString);

        if (database == 'builder') {
            $('.army-add').click(function () {
                App.displayContent('none', 'addArmy');

            })

            $('.army-display-selector').click(function () {

                App.armyArray = App.allArmiesArray.find(({ _id }) => _id === this.id).army;
                App.armyRestID = this.id;
                App.displayContent('none', 'addArmy');


            })

            $('.army-display-selector button').click(function (e) {
                e.stopPropagation();

                Swal.fire({
                    title: 'Are you sure?',
                    text: "Do you really want to delete this army?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {

                    if (result.value) {
                        let thisButtonId = this.id.replace("delete-army-button", "");

                        $(`#${thisButtonId}`).remove();

                        $.when(
                            $.ajax(App.settingsDelete, App.settingsDelete.url = `https://killteam-12dc.restdb.io/rest/armies/${thisButtonId}`).done((response1) => { })
                        ).then(function () {


                            Swal.fire('Deleted');
                            App.getContent();
                        });
                    }
                });

                // if (confirm('Do you really want to delete this army?')) {

                //     let thisButtonId = this.id.replace("delete-army-button", "");

                //     $(`#${thisButtonId}`).remove();

                //     $.when(
                //         $.ajax(App.settingsDelete, App.settingsDelete.url = `https://killteam-12dc.restdb.io/rest/armies/${thisButtonId}`).done((response1) => { })
                //     ).then(function () {


                //         Swal.fire('Deleted');
                //         App.getContent();
                //     });
                // }
            })
        }

        if (database == 'addArmy') {

            App.armyName = $('#army-name');
            App.armySelect = $('#army-select');
            App.colourSelect = $('#army-colour');

            let htmlString = '';
            let factionsForDropdown = new Set(App.unitsArray.map(x => x.faction));
            factionsForDropdown = Array.from(factionsForDropdown);

            if (App.armyArray != '') {

                App.armyName.val(App.armyArray.name);
                App.armySelect.val(App.armyArray.faction);
                App.colourSelect.val(App.armyArray.colour);
                htmlString += `<option value="${App.armyArray.faction}">${App.armyArray.faction}</option>`;
                App.armySelect.append(htmlString);
                for (let i = 0; i < App.armyArray.units.length; i++) {

                    App.unitArmyAdder(false, App.armyArray.units[i]);

                }
            } else {
                App.armyArray = {
                    "name": App.armyName.val(),
                    "faction": App.armySelect.val(),
                    "colour": App.colourSelect.val(),
                    "units": [
                    ]
                };
                for (let i = 0; i < factionsForDropdown.length; i++) {
                    htmlString += `<option value="${factionsForDropdown[i]}">${factionsForDropdown[i]}</option>`;
                }
                App.armySelect.append(htmlString);
            }

            App.armyName.blur(App.fixInputValue).blur(function () {
                let t = $(this);       
                App.armyArray.name = t.val();

                // if (App.armyName.val().trim() !== '') {
                //     App.armyArray.name = App.armyName.val().trim();
                //     App.armyName.val(App.armyName.val().trim());
                // } else {
                //     Swal.fire('Name is empty');
                // }

            });

            App.colourSelect.change(function () {

                App.armyArray.colour = App.colourSelect.val();
            });

            let previous;

            App.armyArray.name = App.armyName.val();
            App.armyArray.faction = App.armySelect.val();

            $('#army-select').on('focus', function () {
                // Store the current value on focus and on change
                previous = $('option:selected', this).index();


            }).change(function () {

                if (App.armyArray.units.length > 0) {

                    Swal.fire({
                        title: 'You have unsaved army.',
                        text: "Changing faction will delete all units. Do you want to delete all units?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {

                        if (result.value) {
                            $('.unit-box').remove();

                            App.armyArray.faction = App.armySelect.val();
                            App.armyArray.units = [];
                            App.unitArmyBuilderNumber = 0;
                        } else {
                            this.selectedIndex = previous;
                        }
                    });


                    // if (confirm('You have unsaved army. Changing faction will delete all units. Do you want to delete all units?')) {

                    //     $('.unit-box').remove();

                    //     App.armyArray.faction = App.armySelect.val();
                    //     App.armyArray.units = [];
                    //     App.unitArmyBuilderNumber = 0;

                    // } else {
                    //     this.selectedIndex = previous;
                    // }
                } else {

                    App.armyArray.faction = App.armySelect.val();
                }

            });

            $('#army-saver').click(function () {

                if (App.armyArray.units.length == 0) {
                    Swal.fire('You have no units in your army');
                } else {

                    for (let o = 0; o < App.armyArray.units.length; o++) {
                        App.armyArray.units[o].id = o;
                    }
                    App.unitArmyBuilderNumber = 0;

                    var jsondata = { "user": "xyz", "army": App.armyArray };

                    if (App.armyRestID != '') {

                        var settingsSave = {
                            "async": true,
                            "crossDomain": true,
                            "url": `https://killteam-12dc.restdb.io/rest/armies/${App.armyRestID}`,
                            "method": "PUT",
                            "headers": {
                                "content-type": "application/json",
                                "x-apikey": "5df23c92bf46220df655da5b",
                                "cache-control": "no-cache"
                            },
                            "processData": false,
                            "data": JSON.stringify(jsondata)
                        }

                    } else {

                        var settingsSave = {
                            "async": true,
                            "crossDomain": true,
                            "url": "https://killteam-12dc.restdb.io/rest/armies",
                            "method": "POST",
                            "headers": {
                                "content-type": "application/json",
                                "x-apikey": "5df23c92bf46220df655da5b",
                                "cache-control": "no-cache"
                            },
                            "processData": false,
                            "data": JSON.stringify(jsondata)
                        }

                    }

                    $(this).prop('disabled', true);

                    $.when(
                        $.ajax(settingsSave).done((response1) => { App.armyRestID = response1._id; })
                    ).then(function () {
                        // alert('all complete');

                        $('#army-saver').prop('disabled', false);
                        Swal.fire('Saved');
                        App.getContent();

                    });
                }
            })

            $('.add-unit').click(function () {
                App.unitArmyAdder(true);
            })
        }

    } else {
        htmlString = `
            <div class="pi-row">
                <span>${faction}</span>                              
            </div><br>`;
        App.displayList.append(htmlString);
    }
};

App.unitArmyAdder = (isNew, values) => {
    let htmlString = '';

    if (App.armyName.val().trim() != '') {

        htmlString = `
        <div class="unit-box" id="unit${App.unitArmyBuilderNumber}">
            <div class="unit-box-header">
            <div class="unit-box-settings">
                <div>Name:
                    <input placeholder="Name" class="unit-name-input" id="unit-name-input${App.unitArmyBuilderNumber}">                
                </div>
            <div>Unit:        
                <select class="unit-select-individual" id="unit-select${App.unitArmyBuilderNumber}">`;

        let armyUnitList = App.unitsArray.filter(x => x.faction === $('#army-select').val());

        for (let o = 0; o < armyUnitList.length; o++) {
            htmlString += `<option value="${armyUnitList[o].name}">${armyUnitList[o].name}</option>`;
        }

        htmlString += `
                    </select>  
                </div>
                
                <div>Specialism: 
                    <select class="specialism-select-individual" id="specialism-select${App.unitArmyBuilderNumber}"></select>
                </div>
                <div>Weapon combination: 
                    <select class="weapon-select-individual" id="weapon-select${App.unitArmyBuilderNumber}"></select>
                </div>    
                </div>
                <div class="unit-box-info">
                
                    <div>
                        <span>Points:</span>
                        <span id="unit-point-count${App.unitArmyBuilderNumber}">0</span>                    
                    </div>
                    <button class="delete-unit-button" id="delete-unit${App.unitArmyBuilderNumber}">delete</button>
                </div>            
            </div>
            
            <table id="unit-table${App.unitArmyBuilderNumber}">
                <tr>
                    <th>Name</th>
                    <th>M</th>
                    <th>WS</th>
                    <th>BS</th>
                    <th>S</th>
                    <th>T</th>
                    <th>W</th>
                    <th>A</th>
                    <th>Ld</th>
                    <th>Sv</th>
                    <th>Max</th>                    
                    <th>Value</th>
                </tr>
            </table>
            <table id="unit-weapon-table${App.unitArmyBuilderNumber}"
                <tr>
                    <th>Name</th>
                    <th>Range</th>
                    <th>Type</th>
                    <th>S</th>
                    <th>AP</th>
                    <th>D</th>
                    <th>Abilities</th>
                    <th>Value</th>
                </tr>
            </table>                        
        </div>`;

        $(htmlString).insertBefore('.add-unit');

        if (isNew == false) {
            App.fillIndividualUnitRow(App.unitArmyBuilderNumber, values);
        } else {

            App.armyArray.name = App.armyName.val();
            App.armyArray.faction = App.armySelect.val();

            App.fillIndividualUnitRow(App.unitArmyBuilderNumber);
        }

        App.fillIndividualWeaponRow(App.unitArmyBuilderNumber);

        $('.unit-select-individual').change(function () {
            let thisSelectId = this.id.replace("unit-select", "");

            App.fillIndividualUnitRow(thisSelectId);
            App.fillIndividualWeaponRow(thisSelectId);
            App.solveArmyArrayUnits(thisSelectId, "unit", this.value);
        })

        $('.weapon-select-individual').change(function () {
            let thisSelectId = this.id.replace("weapon-select", "");
            App.fillIndividualWeaponRow(thisSelectId);
            App.solveArmyArrayUnits(thisSelectId, "weapon", this.value);
        })

        $('.specialism-select-individual').change(function () {
            let thisSelectId = this.id.replace("specialism-select", "");
            App.solveArmyArrayUnits(thisSelectId, "specialist", this.value);
        })

        $('.delete-unit-button').click(function () {
            let thisSelectId = this.id.replace("delete-unit", "");
            $(`#unit${thisSelectId}`).remove();
            App.solveArmyArrayUnits(thisSelectId, "delete");
            App.solveArmyPoints();
        })

        $(`.unit-name-input`).blur(App.fixInputValue).blur(function () {            
            let t = $(this);

            let thisSelectId = t.attr("id").replace("unit-name-input", "");
            App.solveArmyArrayUnits(thisSelectId, "name", t.val());
        });

        ++App.unitArmyBuilderNumber;

    } else {
        Swal.fire('Choose some name first');
    }
}

App.fixInputValue = function () {
    let t = $(this);
    if (t.val().trim() !== '') {

        t.val(t.val().trim());       
    } else {
        Swal.fire('Name is empty');
        t.val("");     
    }
};

App.solveArmyArrayUnits = (unitid, type, value) => {
    let unitInArray = App.armyArray.units.find(({ id }) => id == parseInt(unitid))

    if (unitInArray == null) {
        switch (type) {
            case "unit":
                App.armyArray.units.push({ "id": parseInt(unitid), "name": "none", "unit": value, "weapons": "none", "spec": "none" });
                break;
            case "weapon":
                App.armyArray.units.push({ "id": parseInt(unitid), "name": "none", "unit": "none", "weapons": value, "spec": "none" });
                break;
            case "specialist":
                App.armyArray.units.push({ "id": parseInt(unitid), "name": "none", "unit": "none", "weapons": "none", "spec": value });
                break;
            case "name":
                App.armyArray.units.push({ "id": parseInt(unitid), "name": value, "unit": "none", "weapons": "none", "spec": "none" });
                break;
        }
    } else {
        switch (type) {
            case "delete":
                App.armyArray.units.splice(App.armyArray.units.indexOf(unitInArray), 1);
                break;
            case "unit":
                unitInArray.unit = value;
                break;
            case "weapon":
                unitInArray.weapons = value;
                break;
            case "specialist":
                unitInArray.spec = value;
                break;
            case "name":
                unitInArray.name = value;
                break;
        }
    }
}

App.solveWarnings = () => {
    if ($('#main-army-points').text() > 100) {
        // $('#main-army-warnings').append(`<li>Too many points</li>`);

    }
}

App.solveArmyPoints = () => {
    let numItems = $('.unit-box');
    let points = 0;

    for (let o = 0; o < numItems.length; o++) {
        points += parseInt($(`#unit-point-count${numItems[o].id.replace("unit", "")}`).text());
    }

    $('#main-army-points').text(points);

    App.solveWarnings();

}

App.fillIndividualWeaponRow = (boxID) => {

    let modif = $(`#weapon-select${boxID}`).val().split(", ")

    let htmlString = '';

    let weaponPointVal = 0;

    let unitPointsText = $(`#unit-point-count${boxID}`);


    let unitSelectValue = $(`#unit-select${boxID}`).val();

    let specificUnit = App.unitsArray.find(({ name }) => name === unitSelectValue);

    for (let o = 0; o < modif.length; o++) {

        let specificWeapons = App.weaponsArray.find(({ name }) => name === modif[o]);

        htmlString += `
        <tr>
            <th>${specificWeapons.name}</th>
            <th>${specificWeapons.range}</th>
            <th>${specificWeapons.type}</th>
            <th>${specificWeapons.strength}</th>
            <th>${specificWeapons.armourPenetration}</th>
            <th>${specificWeapons.damage}</th>
            <th>${specificWeapons.abilities}</th>
            <th>${specificWeapons.points}</th>                            
        </tr>`;

        weaponPointVal += specificWeapons.points;

    }
    unitPointsText.text(specificUnit.points + weaponPointVal);

    let table = document.getElementById(`unit-weapon-table${boxID}`);

    let number = table.rows.length;

    if (number > 1) {
        for (let o = 0; o < number - 1; o++) {
            table.deleteRow(1);
        }
    }
    $(`#unit-weapon-table${boxID} tbody`).append(htmlString);
    App.solveArmyPoints();
};

App.fillIndividualUnitRow = (boxID, nameOverride) => {

    let unitSelectValue = $(`#unit-select${boxID}`).val();

    let htmlString = '';

    if (nameOverride != null) {
        unitSelectValue = nameOverride.unit;
    }

    let specificUnit = App.unitsArray.find(({ name }) => name === unitSelectValue);

    htmlString = `
        <tr>
            <th>${specificUnit.name}</th>
            <th>${specificUnit.move}</th>
            <th>${specificUnit.weaponSkill}</th>
            <th>${specificUnit.ballisticSkill}</th>
            <th>${specificUnit.strength}</th>
            <th>${specificUnit.toughness}</th>
            <th>${specificUnit.wounds}</th>
            <th>${specificUnit.attacks}</th>
            <th>${specificUnit.leadership}</th>
            <th>${specificUnit.save}</th>                            
            <th>${specificUnit.max.toString().replace(100, "inf")}</th>
            <th>${specificUnit.points}</th>                        
        </tr>`;

    let table = document.getElementById(`unit-table${boxID}`);

    if (table.rows.length > 1) {
        table.deleteRow(1);
    }

    $(`#unit-table${boxID} tbody`).append(htmlString);

    htmlString = '';

    for (let o = 0; o < specificUnit.specialists.length; o++) {
        htmlString += `<option value="${specificUnit.specialists[o]}">${specificUnit.specialists[o]}</option>`;
    }

    $(`#specialism-select${boxID}`).empty();
    $(`#specialism-select${boxID}`).append(htmlString);

    htmlString = '';

    for (let o = 0; o < specificUnit.weapons.length; o++) {
        htmlString += `<option value="${specificUnit.weapons[o]}">${specificUnit.weapons[o]}</option>`;
    }

    $(`#weapon-select${boxID}`).empty();
    $(`#weapon-select${boxID}`).append(htmlString);

    $(`#unit-point-count${boxID}`).text(specificUnit.points);

    if (nameOverride != null) {

        $(`#specialism-select${boxID}`).val(nameOverride.spec);
        $(`#weapon-select${boxID}`).val(nameOverride.weapons);

        $(`#unit-name-input${boxID}`).val(nameOverride.name);

    } else {
        $(`#unit-name-input${boxID}`).val(chance.last());
        App.solveArmyArrayUnits(boxID, "unit", specificUnit.name);
        App.solveArmyArrayUnits(boxID, "specialist", specificUnit.specialists[0]);
        App.solveArmyArrayUnits(boxID, "weapon", specificUnit.weapons[0]);
    }
};

App.constructArmyHTML = () => {
    let htmlString = '';

    htmlString += `    
    <div class="army-box">
        <div class="title-box">
            <div>
                <span>Army name:</span>
                <input id="army-name" placeholder="Army name">
            </div>
            <div>
                <span>Faction:</span>
                <select id="army-select"></select>
            </div>
            <div>
                <span>Colour:</span>
                <select id="army-colour">
                    <option>red</option>
                    <option>green</option>
                    <option>blue</option>
                </select>
            </div>
            <div>
                <span>Points:</span>
                <span id="main-army-points">0</span>
            </div>`;

    // <div>
    //     <h4>Warnings:</h4>
    //     <ul id="main-army-warnings">                
    //         <li>None</li>
    //     </ul>
    // </div>
    htmlString += `
            <button id="army-saver">save army</button>
        </div>
        <div class="units-box">            
            <div class="add-unit">+</div>
        </div>
    </div>`;
    return htmlString;
};

App.constructWeaponHTML = (response, where, number, single) => {
    let htmlString = '';

    switch (where) {
        case 'top':
            htmlString = `
                <div class="unit-card">
                    <div>
                        <h2>${response.name}</h2>
                    </div>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Range</th>
                            <th>Type</th>
                            <th>S</th>
                            <th>AP</th>
                            <th>D</th>
                            <th>Abilities</th>
                            <th>Value</th>                    
                        </tr>`;
            break;

        case 'mid':
            if (number % 2 == 0 && single == true) {
                htmlString += `<tr class="even-row single-row">`;
            } else if (number % 2 == 0 && single == false) {
                htmlString += `<tr class="even-row multiple-row">`;
            } else if (single == true) {
                htmlString += `<tr class="odd-row single-row">`;
            } else {
                htmlString += `<tr class="odd-row multiple-row">`;
            }

            htmlString += `
                    <th>${response.name}</th>
                    <th>${response.range}</th>
                    <th>${response.type}</th>
                    <th>${response.strength}</th>
                    <th>${response.armourPenetration}</th>
                    <th>${response.damage}</th>
                    <th>${response.abilities}</th>
                    <th>${response.points}</th>            
                </tr>`;
            break;

        case 'bot':
            htmlString += `</table></div>`;
            break;
    }
    return htmlString;
};

App.constructUnitHTML = (response, where) => {
    let htmlString = '';

    switch (where) {
        case 'top':
            htmlString = `
            <div class="unit-card">
                <div>
                    <h2>${response.name}</h2>
                </div>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>M</th>
                        <th>WS</th>
                        <th>BS</th>
                        <th>S</th>
                        <th>T</th>
                        <th>W</th>
                        <th>A</th>
                        <th>Ld</th>
                        <th>Sv</th>
                        <th>Max</th>                    
                        <th>Value</th>
                        <th>Weapon choice (points if not 0)</th>                    
                    </tr>`;
            break;

        case 'mid':
            htmlString += `
                <tr>
                    <th>${response.name}</th>
                    <th>${response.move}</th>
                    <th>${response.weaponSkill}</th>
                    <th>${response.ballisticSkill}</th>
                    <th>${response.strength}</th>
                    <th>${response.toughness}</th>
                    <th>${response.wounds}</th>
                    <th>${response.attacks}</th>
                    <th>${response.leadership}</th>
                    <th>${response.save}</th>                            
                    <th>${response.max.toString().replace(100, "inf")}</th>
                    <th>${response.points}</th>
                    <th>            
                <select>`;

            for (let o = 0; o < response.weapons.length; o++) {
                let weaponNames = '';
                let modif = response.weapons[o].split(", ");

                for (let o = 0; o < modif.length; o++) {
                    let weaponPoints = App.weaponsArray.find(({ name }) => name === modif[o]).points;

                    if (weaponPoints > 0) {
                        weaponNames += `${modif[o]} (${weaponPoints}), `;
                    } else {
                        weaponNames += `${modif[o]}, `;
                    }

                }
                weaponNames = weaponNames.slice(0, -2);

                htmlString += `<option value="${weaponNames}">${weaponNames}</option>`;
            }

            htmlString += `</select></th></tr>`;
            break;

        case 'bot':
            htmlString += `
                </table>
                <p>keywords: ${response.keywords}</p>
            </div>`;
            break;
    }
    return htmlString;
};

App.getUrlIds = () => {
    const urlID = new URL(window.location.href);
    const urlParams = [
        urlID.searchParams.get("race"),
        urlID.searchParams.get("menu")
    ];
    return urlParams;
};
