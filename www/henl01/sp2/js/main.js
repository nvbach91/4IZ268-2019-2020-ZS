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
    App.dataSection1 = new Array();
    App.dataSection2 = new Array();
    App.dataSection3 = new Array();
    App.dataSection4 = new Array();
    App.spinnerDiv = $('.spinner-div');
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
            var itemName = event.item.innerText;
            var parentFromID = event.from.parentNode.id;
            var sectionFromID = parentFromID.substr(parentFromID.length - 1);
            var parentToID = event.to.parentNode.id;
            var sectionToID = parentToID.substr(parentToID.length - 1);
            // console.log(itemName);
            // console.log(sectionFromID);
            // console.log(sectionToID);

            /** Získat generické ID pro přesouvaný úkol. */
            $.ajax(settings,
                settings.method = 'GET',
                settings.url = `https://henl01-2446.restdb.io/rest/ukoly?q={"Section":${sectionFromID},"Text":"${itemName}"}`
            ).done((resp) => {
                // console.log(resp);
                var taskDefaultID = resp[0]._id;
            
                newTaskSection = {"Section": sectionToID, "Nazev": itemName};
                // console.log(newTaskSection);

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
                // console.log(value);
                if (value !== false) {
                    $('h1')[0].innerText = value;
                }
            }
        });
    });

    let sectionsHTML = '';
    let exportSectionsHTML = '';

    App.spinnerDiv.append(spinner);

    /** Získání a načtení všech sekcí z databáze. */
    $.ajax(settings,
        settings.method = 'GET',
        settings.url = 'https://henl01-2446.restdb.io/rest/sekce?sort=ID'
    ).done((resp) => {
        spinner.remove();
        // console.log("resp");
        // console.log(resp);
        // console.log(resp.length);
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
            `<div class="${classes} ${section.Barva}" id="section-${section.ID}">
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
            // console.log("Vytvoření");
            // console.log($(`#section-${section.ID}`));
        });
        // if(resp.length < 4) {
            sectionsHTML += 
            `<div class="col-sm-3 new-section" id="new-section">
                <button class="btn btn-primary new-section-create">Nová sekce</button>
            </div>`
        // }
        /** Přidání vytvořených sekcí do HTML. */
        App.exportSections.append(exportSectionsHTML);
        App.sections.append(sectionsHTML);

        resp.forEach(section => {
            App.nastavBarvu($(`#section-${section.ID}`)[0]);
            // console.log($(`#section-${section.ID}`)[0]);
        });

        /** Místa pro ukládání úkolů do jednotlivých sekcí. */
        App.section1 = $('#section-1 #tasks');
        App.section2 = $('#section-2 #tasks');
        App.section3 = $('#section-3 #tasks');
        App.section4 = $('#section-4 #tasks');

        App.spinnerDiv.append(spinner);

        /** Získání a načtení všech úkolů z databáze. */
        $.ajax(settings,
            settings.method = 'GET',
            settings.url = 'https://henl01-2446.restdb.io/rest/ukoly?sort=Text')
        .done((resp) => {
            spinner.remove();
            // console.log("Tasks");
            // console.log(resp);
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
                // console.log("Smaž");

                const task = $(this).parent();
                const taskName = task[0].innerText;
                // console.log(taskName);

                let taskDefaultID;

                vex.dialog.confirm({
                    className: 'vex-theme-default',
                    message: 'Opravdu chcete úkol smazat?',
                    callback: function (value) {
                        // console.log(value);
                        if (value === true) {
                            /** Odstraní úkol ze stránky. */
                            task.remove();
                            App.spinnerDiv.append(spinner);
                            /** Získá generické ID úkolu, který bude smazán. */
                            $.ajax(settings,
                                settings.method = 'GET',
                                settings.url = `https://henl01-2446.restdb.io/rest/ukoly?q={"Text":"${taskName}"}`
                            ).done((resp) => {
                                    taskDefaultID = resp[0]._id;
                                    // console.log(taskDefaultID);

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
            // console.log(App.section4);
            Sortable.create(App.section1[0], options);
            Sortable.create(App.section2[0], options);
            Sortable.create(App.section3[0], options);
            if (App.section4.length !== 0) {
                Sortable.create(App.section4[0], options);
            }

            /** Export jednotlivých sekcí. */
            /** První sekce */
            $('.dropdown-menu li:nth-child(2) a').click(function(e) {
                const a = document.createElement('a');
                a.download = 'test' + '.xlsx';
                a.href = '#';

                var sectionName = $(this)[0].innerText;
                let headers = [];
                let content = [];
                headers.push(sectionName);

                $('#section-1 .list-group-item').each(function (index) {
                    let row = content[index];
                    if (!row) {
                        content[index] = [];
                    }
                    content[index].push($(this).text().trim());
                });
                // console.log(content);
                a.onclick = function (e) {
                    return ExcellentExport.convert({
                        anchor: this,
                        filename: 'Section1',
                        format: 'xlsx'
                    }, [{
                        name: 'List 1',
                        from: {
                            array: [headers,
                                ...content
                            ]
                        }
                    }]);
                };

                $('body').append(a);
                a.click();
            });

            /** Druhá sekce */
            $('.dropdown-menu li:nth-child(3) a').click(function(e) {
                const a = document.createElement('a');
                a.download = 'test' + '.xlsx';
                a.href = '#';

                var sectionName = $(this)[0].innerText;
                let headers = [];
                let content = [];
                headers.push(sectionName);

                $('#section-2 .list-group-item').each(function (index) {
                    let row = content[index];
                    if (!row) {
                        content[index] = [];
                    }
                    content[index].push($(this).text().trim());
                });
                // console.log(content);
                a.onclick = function (e) {
                    return ExcellentExport.convert({
                        anchor: this,
                        filename: 'Section2',
                        format: 'xlsx'
                    }, [{
                        name: 'List 1',
                        from: {
                            array: [headers,
                                ...content
                            ]
                        }
                    }]);
                };

                $('body').append(a);
                a.click();
            });

            /** Třetí sekce */
            $('.dropdown-menu li:nth-child(4) a').click(function(e) {
                const a = document.createElement('a');
                a.download = 'test' + '.xlsx';
                a.href = '#';

                var sectionName = $(this)[0].innerText;
                let headers = [];
                let content = [];
                headers.push(sectionName);

                $('#section-3 .list-group-item').each(function (index) {
                    let row = content[index];
                    if (!row) {
                        content[index] = [];
                    }
                    content[index].push($(this).text().trim());
                });
                // console.log(content);
                a.onclick = function (e) {
                    return ExcellentExport.convert({
                        anchor: this,
                        filename: 'Section3',
                        format: 'xlsx'
                    }, [{
                        name: 'List 1',
                        from: {
                            array: [headers,
                                ...content
                            ]
                        }
                    }]);
                };

                $('body').append(a);
                a.click();
            });

            /** Čtvrtá sekce */
            $('.dropdown-menu li:nth-child(5) a').click(function(e) {
                const a = document.createElement('a');
                a.download = 'test' + '.xlsx';
                a.href = '#';

                var sectionName = $(this)[0].innerText;
                let headers = [];
                let content = [];
                headers.push(sectionName);

                $('#section-4 .list-group-item').each(function (index) {
                    let row = content[index];
                    if (!row) {
                        content[index] = [];
                    }
                    content[index].push($(this).text().trim());
                });
                // console.log(content);
                a.onclick = function (e) {
                    return ExcellentExport.convert({
                        anchor: this,
                        filename: 'Section4',
                        format: 'xlsx'
                    }, [{
                        name: 'List 1',
                        from: {
                            array: [headers,
                                ...content
                            ]
                        }
                    }]);
                };

                $('body').append(a);
                a.click();
            });
            
        });
    
        /** Vytvoření a přidání nového úkolu. */
        $(document).on('click', '.new-task-create', function() {
            /** Získání sekce, kde se nový úkol vytváří. */
            const parentId = $(document.activeElement).parent().attr('id');
            // console.log($(document.activeElement)[0]);
            // console.log(parentId);
            const sectionID = parentId.substr(parentId.length - 1);

            vex.dialog.prompt({
                className: 'vex-theme-default',
                message: 'Zadejte název úkolu',
                input: '<input name="taskName" type="text" class="vex-dialog-prompt-input" placeholder="Název úkolu" required>',
                callback: function (value) {
                    // console.log(value);
                    if (value !== false) {
                        /** Vytvoření a přidání úkolu do stránky. */
                        let taskHTML = 
                        `<div class="task list-group-item">
                            ${value}
                            <i class="fa fa-trash"></i>
                        </div>`;
                        App.appendToSection(taskHTML, parseInt(sectionID));
                        
                        App.spinnerDiv.append(spinner);
                        /** Uložení nového úkolu do databáze. */
                        const newTask = {"Section": sectionID, "Text": value};
                        // console.log(newTask);
                        
                        $.ajax(settings,
                            settings.method = 'POST',
                            settings.url = 'https://henl01-2446.restdb.io/rest/ukoly',
                            settings.data = JSON.stringify(newTask)
                        ).done(function (response) {
                            spinner.remove();
                            console.log(response);
                        }).fail((resp) => {
                            var mes = resp.responseJSON;
                            console.log(mes);
                            console.log(mes.message);
                        });
                    }
                }
            });
        });

        /** Vytvoření a přidání nové sekce. */
        $(document).on('click', '.new-section-create', function () {
            vex.dialog.open({
                className: 'vex-theme-default',
                message: 'Zadejte název sekce',
                input: [
                    '<input name="name" type="text" class="vex-dialog-prompt-input" placeholder="Název sekce" required>',
                    '<div class="vex-custom-field-wrapper">',
                        '<label for="color">Color</label>',
                        '<select name="color">',
                            '<option name="color" value="red">Červená</option>',
                            '<option name="color" value="green">Zelená</option>',
                            '<option name="color" value="blue">Modrá</option>',
                        '</select>',
                    '</div>'
                ].join(''),
                callback: function (data) {
                    console.log(data.name);
                    console.log(data.color);
                    console.log(counter);
                    counter++;
                    console.log(counter);
                    if (data !== false) {
                        /** Vytvoření a přidání sekce do stránky a do tlačítka na export. */
                        sectionsHTML = 
                            `<div class="col-sm-3 section deletable ${data.color}" id="section-${counter}">
                                <div class="section-name">
                                    <h2>${data.name}</h2>
                                    <i class="fa fa-edit"></i>
                                    <i class="fa fa-trash"></i>
                                </div>
                                <hr>
                                <button class="btn btn-primary new-task-create">Nový úkol</button>
                                <div class="tasks"></div>
                            </div>
                            <div class="col-sm-3 new-section" id="new-section">
                                <button class="btn btn-primary new-section-create">Nová sekce</button>
                            </div>`;
                        exportSectionsHTML = `<li><a href="#" id="${data.name}">${data.name}</a></li>`;

                        $('.new-section').remove();
                        App.exportSections.append(exportSectionsHTML);
                        App.sections.append(sectionsHTML);
                        App.nastavBarvu($(`#section-${counter}`)[0]);
                        App.section4 = $(`#section-${counter}`);
                        App.section5 = $(`#section-${counter}`);
                        App.section6 = $(`#section-${counter}`);
                        App.section7 = $(`#section-${counter}`);
                        App.section8 = $(`#section-${counter}`);
                        Sortable.create(App.section4[0], options);
                        Sortable.create(App.section5[0], options);
                        Sortable.create(App.section6[0], options);
                        Sortable.create(App.section7[0], options);
                        Sortable.create(App.section8[0], options);

                        App.spinnerDiv.append(spinner);
                        /** Uložení nové sekce do databáze. */
                        const newSection = {"ID": counter, "Nazev": data.name, "Barva": data.color};
                        // console.log(newSection);
                        
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
            // console.log(sectionName);

            let sectionDefaultID;
            let sectionMyID;

            vex.dialog.prompt({
                className: 'vex-theme-default',
                message: 'Zadejte nový název sekce',
                input: '<input name="sectionName" type="text" class="vex-dialog-prompt-input" placeholder="Název sekce" required>',
                callback: function (value) {
                    // console.log(value);
                    if (value !== false) {
                        App.spinnerDiv.append(spinner);
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
            // console.log(section);
            const sectionName = section[0].innerText;
            // console.log(sectionName);
            const parentID = $(this).parent().parent().attr('id');
            const sectionID = $(this).parent().parent().attr('id').substr(parentID.length - 1);
            // console.log(sectionID);
            counter--;

            let sectionDefaultID;

            vex.dialog.confirm({
                className: 'vex-theme-default',
                message: 'Opravdu chcete sekci smazat? Budou smazány všechny úkoly v této sekci.',
                callback: function (value) {
                    // console.log(value);
                    if (value === true) {
                        /** Odstranění sekce ze stránky a z tlačítka pro export. */
                        section.parent().remove();
                        $(`#${sectionName}`).remove();
                        /** Vytvoření tlačítka pro přidání nové sekce. */
                        // sectionsHTML = 
                        //     `<div class="col-sm-3 new-section" id="new-section">
                        //         <button class="btn btn-primary new-section-create">Nová sekce</button>
                        //     </div>`
                        // App.sections.append(sectionsHTML);

                        App.spinnerDiv.append(spinner);
                        /** Získá generické ID pro sekci, která bude smazaná. */
                        $.ajax(settings,
                            settings.method = 'GET',
                            settings.url = `https://henl01-2446.restdb.io/rest/sekce?q={"Nazev":"${sectionName}"}`
                        ).done((resp) => {
                            sectionDefaultID = resp[0]._id;
                            // console.log(sectionDefaultID);

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
                                // console.log(resp);
                                var tasks = new Array();
                                resp.forEach(task => {
                                    tasks.push(task._id);
                                });
                                // console.log(tasks);

                                tasks.forEach(task => {
                                    // console.log(task);
                                    $.ajax(settings,
                                        settings.method = 'DELETE',
                                        settings.url = `https://henl01-2446.restdb.io/rest/ukoly/${task}`
                                    ).done(function (response) {
                                        console.log(response);
                                    });
                                });
                                spinner.remove();
                            });
                        });
                    }
                }
            });
        });
    }).fail((resp) => {
        console.log(resp);
    });


    $(".export-all").click(function(e) {
        const a = document.createElement('a');
        a.download = 'test' + '.xlsx';
        a.href = '#';

        let headers = [];
        let content =[[]];
        for (let i = 1; i < 5; i++) {
            headers.push($('#section-' + i.toString() + ' .section-name h2').text().trim());
            $('#section-' + i.toString() + ' .list-group-item').each(function (index) {
                let row = content[index];
                if (!row) {
                    content[index] = [];
                }
                if (content[index].length !== i - 1) {
                    content[index].push('');
                }
                content[index].push($(this).text().trim());
            });
        }
        a.onclick = function (e) {
            return ExcellentExport.convert({
                anchor: this,
                filename: 'AllSections',
                format: 'xlsx'
            }, [{
                name: 'List 1',
                from: {
                    arrayHasHeader: true,
                    array: [headers,
                        ...content
                    ]
                }
            }]);
        };

        $('body').append(a);
        a.click();
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

/** Funkce pro nastavení barvy jednotlivé sekce. */
App.nastavBarvu = (sekce) => {
    console.log("Sekce");
    console.log(sekce);
    var classes = sekce.getAttribute('class').split(" ");
    console.log(classes.length);
    var color = classes[classes.length - 1];
    console.log(classes);
    sekce.style.backgroundColor = `${color}`;
};