const App = {};

var settings = {
    async: true,
    crossDomain: true,
    headers: {
        "content-type": "application/json",
        "x-apikey": "5def9e59bf46220df655d944",
        "cache-control": "no-cache"
    },
    processData: false
};

App.init = () => {
    App.sections = $('.sections');
    App.exportSections = $('.dropdown-menu');
};

$(document).ready(() => {
    App.init();
    const spinner = $('<div class="spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>');

    /** Nastavení pro přesouvání úkolů. */
    var options = {
        group: 'tasks',
        animation: 150,
        /** Event spuštěný po přesunutí úkolu do jiného listu. Updatuje sekci u přesunutého úkolu. */
        onAdd: function(event) {
            // console.log(event.item.innerText);
            // console.log(event.from.parentNode.id);
            // console.log(event.to.parentNode.id);

            var itemName = event.item.innerText;
            var parentFromID = event.from.parentNode.id;
            var sectionFromID = parentFromID.substr(parentFromID.length - 1);
            var parentToID = event.to.parentNode.id;
            var sectionToID = parentToID.substr(parentToID.length - 1);
            console.log(itemName);
            console.log(sectionFromID);
            console.log(sectionToID);

            /** Získat generické ID pro přesouvaný úkol. */
            $.ajax(settings,
                settings.method = 'GET',
                settings.url = `https://henl01-2446.restdb.io/rest/ukoly?q={"Section":${sectionFromID},"Text":"${itemName}"}`
            ).done((resp) => {
                console.log(resp);
                var taskDefaultID = resp[0]._id;
            
                newTaskSection = {"Section": sectionToID, "Nazev": itemName};
                console.log(newTaskSection);

                /** Update atributu "Section" u přesunutého úkolu. */
                $.ajax(settings,
                    settings.method = 'PUT',
                    settings.url = `https://henl01-2446.restdb.io/rest/ukoly/${taskDefaultID}`,
                    settings.data = JSON.stringify(newTaskSection)
                ).done(function (response) {
                    console.log(response);
                });
            });
        }
    };

    /** Přejmenování celé stránky kliknutím na nadpis. */
    $('h1').click(function() {
        var name = $('h1')[0].innerText;
        vex.dialog.prompt({
            className: 'vex-theme-default',
            message: 'Zadejte název',
            input: `<input name="taskName" type="text" class="vex-dialog-prompt-input" placeholder="Název" value="${name}" required>`,
            callback: function (value) {
                console.log(value);
                if (value !== false) {
                    $('h1')[0].innerText = value;
                }
            }
        });
    });

    let sectionsHTML = '';
    let exportSectionsHTML = '';

    App.sections.append(spinner);

    /** Získání a načtení všech sekcí z databáze. */
    $.ajax(settings,
        settings.method = 'GET',
        settings.url = 'https://henl01-2446.restdb.io/rest/sekce?sort=ID')
    .done((resp) => {
        spinner.remove();
        console.log("resp");
        console.log(resp);
        console.log(resp.length);
        var classes;
        var counter = 0;
        /** Vytvoření jednotlivých sekcí. */
        resp.forEach(section => {
            counter++;
            if (counter < 4) {
                classes = 'col-sm-3 section';
            } else {
                classes = 'col-sm-3 section deletable';
            }
            sectionsHTML += 
            `<div class="${classes}" id="section-${section.ID}">
                <div class="section-name">
                    <h2>${section.Nazev}</h2>
                    <i class="fa fa-edit"></i>
                    <i class="fa fa-trash"></i>
                </div>
                <hr>
                <button class="btn btn-primary new-task-create">Nový úkol</button>
                <div id="tasks" class="list-group"></div>
            </div>`
            exportSectionsHTML += `<li><a href="#" id="${section.Nazev}">${section.Nazev}</a></li>`;
        });
        if(resp.length < 4) {
            sectionsHTML += 
            `<div class="col-sm-3 new-section" id="new-section">
                <button class="btn btn-primary new-section-create">Nová sekce</button>
            </div>`
        }
        /** Přidání vytvořených sekcí do HTML. */
        App.exportSections.append(exportSectionsHTML);
        App.sections.append(sectionsHTML);

        /** Místa pro ukládání úkolů do jednotlivých sekcí. */
        App.section1 = $('#section-1 #tasks');
        App.section2 = $('#section-2 #tasks');
        App.section3 = $('#section-3 #tasks');
        App.section4 = $('#section-4 #tasks');

        App.sections.append(spinner);

        /** Získání a načtení všech úkolů z databáze. */
        $.ajax(settings,
            settings.method = 'GET',
            settings.url = 'https://henl01-2446.restdb.io/rest/ukoly?sort=Text')
        .done((resp) => {
            spinner.remove();
            console.log("Tasks");
            console.log(resp);
            resp.forEach(task => {
                let taskHTML = 
                `<div class="task list-group-item">
                    ${task.Text}
                    <i class="fa fa-trash"></i>
                </div>`;
                App.appendToSection(taskHTML, task.Section);
            });

            /** Odstranění vybraného úkolu. */
            $(document).on('click', '.section .task .fa-trash', function(){
                console.log("Smaž");

                const task = $(this).parent();
                const taskName = task[0].innerText;
                console.log(taskName);

                let taskDefaultID;

                vex.dialog.confirm({
                    className: 'vex-theme-default',
                    message: 'Opravdu chcete úkol smazat?',
                    callback: function (value) {
                        console.log(value);
                        if (value === true) {
                            /** Odstraní úkol ze stránky. */
                            task.remove();
                            App.sections.append(spinner);
                            /** Získá generické ID úkolu, který bude smazán. */
                            $.ajax(settings,
                                settings.method = 'GET',
                                settings.url = `https://henl01-2446.restdb.io/rest/ukoly?q={"Text":"${taskName}"}`
                                ).done((resp) => {
                                    taskDefaultID = resp[0]._id;
                                    console.log(taskDefaultID);

                                    /** Odstranění úkolu z databáze. */
                                    $.ajax(settings,
                                        settings.method = 'DELETE',
                                        settings.url = `https://henl01-2446.restdb.io/rest/ukoly/${taskDefaultID}`
                                    ).done(function (response) {
                                        spinner.remove();
                                        console.log(response);
                                    });
                            });
                        }
                    }
                });
            });

            /** Vytvoření draggable a sortable seznamů pro přesouvání úkolů. */
            console.log(App.section4);
            Sortable.create(App.section1[0], options);
            Sortable.create(App.section2[0], options);
            Sortable.create(App.section3[0], options);
            if (App.section4.length !== 0) {
                Sortable.create(App.section4[0], options);
            }

            console.log(App.section1[0]);
            console.log(App.section2.parent()[0].innerText);
            console.log(App.section3.parent()[0].innerText);
            // console.log(App.section4.parent()[0].innerText);
            // App.arraySection1 = new Array();
            $.ajax(settings,
                settings.method = 'GET',
                settings.url = 'https://henl01-2446.restdb.io/rest/ukoly?sort=Text')
            .done((resp) => {
                console.log(resp);
                var dataSection1 = new Array();
                var arraySection1 = resp.filter(task => {task.Section === 1});
                console.log(arraySection1);
                var arraySection2 = resp.filter(task => {task.Section === 2});
                var arraySection3 = resp.filter(task => {task.Section === 3});
                var arraySection4 = resp.filter(task => {task.Section === 4});
                arraySection1.forEach(task => {
                    dataSection1.push(task.Text);
                });
                console.log(dataSection1);
            });
            
            // console.log(arraySection1);

        });
    
        /** Vytvoření a přidání nového úkolu. */
        $(document).on('click', '.new-task-create', function() {
            /** Získání sekce, kde se nový úkol vytváří. */
            const parentId = $(document.activeElement).parent().attr('id');
            console.log($(document.activeElement)[0]);
            console.log(parentId);
            const sectionID = parentId.substr(parentId.length - 1);

            vex.dialog.prompt({
                className: 'vex-theme-default',
                message: 'Zadejte název úkolu',
                input: '<input name="taskName" type="text" class="vex-dialog-prompt-input" placeholder="Název úkolu" required>',
                callback: function (value) {
                    console.log(value);
                    if (value !== false) {
                        /** Vytvoření a přidání úkolu do stránky. */
                        let taskHTML = 
                        `<div class="task">
                            ${value}
                            <i class="fa fa-trash"></i>
                        </div>`;
                        App.appendToSection(taskHTML, parseInt(sectionID));
                        
                        App.sections.append(spinner);
                        /** Uložení nového úkolu do databáze. */
                        const newTask = {"Section": sectionID, "Text": value};
                        console.log(newTask);
                        
                        $.ajax(settings,
                            settings.method = 'POST',
                            settings.url = 'https://henl01-2446.restdb.io/rest/ukoly',
                            settings.data = JSON.stringify(newTask)
                        ).done(function (response) {
                            spinner.remove();
                            console.log(response);
                        });
                    }
                }
            });
        });

        /** Vytvoření a přidání nové sekce. */
        $(document).on('click', '.new-section-create', function () {
            vex.dialog.prompt({
                className: 'vex-theme-default',
                message: 'Zadejte název sekce',
                input: '<input name="taskName" type="text" class="vex-dialog-prompt-input" placeholder="Název sekce" required>',
                callback: function (value) {
                    console.log(value);
                    if (value !== false) {
                        /** Vytvoření a přidání sekce do stránky a do tlačítka na export. */
                        sectionsHTML = 
                            `<div class="col-sm-3 section deletable" id="section-4">
                                <div class="section-name">
                                    <h2>${value}</h2>
                                    <i class="fa fa-edit"></i>
                                    <i class="fa fa-trash"></i>
                                </div>
                                <hr>
                                <button class="btn btn-primary new-task-create">Nový úkol</button>
                                <div class="tasks"></div>
                            </div>`;
                        exportSectionsHTML = `<li><a href="#" id="${value}">${value}</a></li>`;

                        $('.new-section').remove();
                        App.exportSections.append(exportSectionsHTML);
                        App.sections.append(sectionsHTML);
                        App.section4 = $('#section-4');
                        Sortable.create(App.section4[0], options);

                        App.sections.append(spinner);
                        /** Uložení nové sekce do databáze. */
                        const newSection = {"ID": 4, "Nazev": value};
                        console.log(newSection);
                        
                        $.ajax(settings,
                            settings.method = 'POST',
                            settings.url = 'https://henl01-2446.restdb.io/rest/sekce',
                            settings.data = JSON.stringify(newSection)
                        ).done(function (response) {
                            spinner.remove();
                            console.log(response);
                        });
                    }
                }
            });
        });

        /** Přejmenování existující sekce. */
        $(document).on('click', '.section-name .fa-edit', function(){
            /** Získání původního názvu. */
            const section = $(this).siblings();
            const sectionName = section[0].innerText;
            console.log(sectionName);

            let sectionDefaultID;
            let sectionMyID;

            vex.dialog.prompt({
                className: 'vex-theme-default',
                message: 'Zadejte nový název sekce',
                input: '<input name="sectionName" type="text" class="vex-dialog-prompt-input" placeholder="Název sekce" required>',
                callback: function (value) {
                    console.log(value);
                    if (value !== false) {
                        App.sections.append(spinner);
                        /** Přejmenování sekce na stránce a získání generického ID z databáze. */
                        section[0].innerText = value;
                        $.ajax(settings,
                            settings.method = 'GET',
                            settings.url = `https://henl01-2446.restdb.io/rest/sekce?q={"Nazev":"${sectionName}"}`
                        ).done((resp) => {
                            sectionDefaultID = resp[0]._id;
                            sectionMyID = resp[0].ID;

                            /** Update atributu "Nazev" u přejmenované sekce. */
                            newSectionName = {"ID": sectionMyID, "Nazev": value};

                            $.ajax(settings,
                                settings.method = 'PUT',
                                settings.url = `https://henl01-2446.restdb.io/rest/sekce/${sectionDefaultID}`,
                                settings.data = JSON.stringify(newSectionName)
                            ).done(function (response) {
                                spinner.remove();
                                console.log(response);
                            });

                            /** Update názvu sekce v tlačítku na export. */
                            $(`#${sectionName}`)[0].innerText = value;
                        });
                    }
                }
            });
        });

        /** Odstranění přidané sekce. */
        $(document).on('click', '.section-name .fa-trash', function(){
            /** Získání ID dané sekce. */
            const section = $(this).parent();
            console.log(section);
            const sectionName = section[0].innerText;
            console.log(sectionName);
            const parentID = $(this).parent().parent().attr('id');
            const sectionID = $(this).parent().parent().attr('id').substr(parentID.length - 1);
            console.log(sectionID);

            let sectionDefaultID;

            vex.dialog.confirm({
                className: 'vex-theme-default',
                message: 'Opravdu chcete sekci smazat? Budou smazány všechny úkoly v této sekci.',
                callback: function (value) {
                    console.log(value);
                    if (value === true) {
                        /** Odstranění sekce ze stránky a z tlačítka pro export. */
                        section.parent().remove();
                        $(`#${sectionName}`).remove();
                        /** Vytvoření tlačítka pro přidání nové sekce. */
                        sectionsHTML = 
                            `<div class="col-sm-3 new-section" id="new-section">
                                <button class="btn btn-primary new-section-create">Nová sekce</button>
                            </div>`
                        App.sections.append(sectionsHTML);

                        App.sections.append(spinner);
                        /** Získá generické ID pro sekci, která bude smazaná. */
                        $.ajax(settings,
                            settings.method = 'GET',
                            settings.url = `https://henl01-2446.restdb.io/rest/sekce?q={"Nazev":"${sectionName}"}`
                        ).done((resp) => {
                            sectionDefaultID = resp[0]._id;
                            console.log(sectionDefaultID);

                            /** Odstraní danou sekci z databáze. */
                            $.ajax(settings,
                                settings.method = 'DELETE',
                                settings.url = `https://henl01-2446.restdb.io/rest/sekce/${sectionDefaultID}`
                            ).done(function (response) {
                                console.log(response);
                            });

                            /** Získá všechny úkoly, které byly ve smazané sekci a odstraní je. */
                            $.ajax(settings,
                                settings.method = 'GET',
                                settings.url = `https://henl01-2446.restdb.io/rest/ukoly?q={"Section":${sectionID}}`
                            ).done((resp) => {
                                console.log(resp);
                                var tasks = new Array();
                                resp.forEach(task => {
                                    tasks.push(task._id);
                                });
                                console.log(tasks);

                                tasks.forEach(task => {
                                    console.log(task);
                                    $.ajax(settings,
                                        settings.method = 'DELETE',
                                        settings.url = `https://henl01-2446.restdb.io/rest/ukoly/${task}`
                                    ).done(function (response) {
                                        spinner.remove();
                                        console.log(response);
                                    });
                                });
                            });
                        });
                    }
                }
            });
        });
    });


    $(".export-all").click(function() {
        var data = [
            ['Sekce1', 'Sekce2', 'Sekce3'],
            ['name2', 'city2', 'more info'],
            ['name2', 'city2', 'more info'],
            ['name2', 'city2', 'more info'],
            ['name2', 'city2', 'more info']
        ];
        
        // Building the CSV from the Data two-dimensional array
        // Each column is separated by ";" and new line "\n" for next row
        var csvContent = '';
        data.forEach(function(infoArray, index) {
        dataString = infoArray.join(';');
        csvContent += index < data.length ? dataString + '\n' : dataString;
        });
        
        // The download function takes a CSV string, the filename and mimeType as parameters
        // Scroll/look down at the bottom of this snippet to see how download is called
        var download = function(content, fileName, mimeType) {
        var a = document.createElement('a');
        mimeType = mimeType || 'application/octet-stream';
        
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(new Blob([content], {
            type: mimeType
            }), fileName);
        } else if (URL && 'download' in a) { 
            a.href = URL.createObjectURL(new Blob([content], {
            type: mimeType
            }));
            a.setAttribute('download', fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            location.href = 'data:application/octet-stream,' + encodeURIComponent(content);
        }
        }
        
        download(csvContent, 'export.csv', 'text/csv;encoding:utf-8');
    });
});

/** Funkce pro přidávání úkolů do dané sekce. */
App.appendToSection = (task, sec) => {
    switch (sec) {
        case 1: 
            App.section1.append(task);
            break;
        case 2:
            App.section2.append(task);
            break;
        case 3:
            App.section3.append(task);
            break;
        case 4:
            App.section4.append(task);
            break;
        default:
            break;
    };
};