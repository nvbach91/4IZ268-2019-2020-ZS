const App = {};

var ajaxReq = null;

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://killteam-12dc.restdb.io/rest/units",
    "method": "GET",
    "headers": {
        "content-type": "application/json",
        "x-apikey": "5df23c92bf46220df655da5b",
        "cache-control": "no-cache"
    }
}



App.init = () => {
    App.displayList = $('#display-list');
    App.title = $('title');
};

var stateUrl = '';

$(document).ready(() => {
    App.init();
    App.paramStateSolve();

    $('#home').click(function () {

        window.location = '/sp2testy/';

        $('nav div').css("background-color", "");
        $('aside div').css("background-color", "");
    })

    $('nav div').click(function () {

        const urlParams = App.getUrlIds();

        var stateObj = { foo: "bar" };

        if (urlParams[1] != null) {
            history.replaceState(stateObj, "page 2", `?race=${this.id}&menu=${urlParams[1]}`);//změna záznamu aktuálního stavu v historii            
        } else {
            history.replaceState(stateObj, "page 2", `?race=${this.id}&menu=description`);//změna záznamu aktuálního stavu v historii            
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
            alert("Select faction first");
        }
    })

});

App.paramStateSolve = () => {
    const urlParams = App.getUrlIds();
    if (urlParams[0] != null) {
        $('nav div').css("background-color", "");
        $('aside div').css("background-color", "");
        $(`#${urlParams[0]}`).css("background-color", "turquoise");
        $(`#${urlParams[1]}`).css("background-color", "turquoise");
        App.displayContent(urlParams[0].toLowerCase().replace('-', ' '), urlParams[1].toLowerCase().replace('-', ' '));
        document.title = `kill team - ${urlParams[0].replace('-', ' ')} - ${urlParams[1].replace('-', ' ')}`;
    }
};

App.displayContent = (faction, database) => {


    settings.url = `https://killteam-12dc.restdb.io/rest/${database}?q={%22faction%22:%22${faction}%22}&h={"$orderby":%20{"name":%201}}`;

    App.displayList.empty();

    if (ajaxReq != null) {
        ajaxReq.abort();
    }

    if (database != 'description') {

        const spinner = $('<div class="spinner"></div>');

        App.displayList.append(spinner);

        ajaxReq = $.ajax(settings).done((response) => {

            let structuredList = "";
            let blacklist = new Array()

            
            for (let i = 0; i < response.length; i++) {

                if (database == 'tactics') {
                    structuredList += `<div class="pi-row">
                                <label>Name: ${response[i].name}</label>                              
                                </div>
                                <div class="pi-row">
                                <label>${response[i].description}</label>                                                      
                                </div><br>`;
                }
                console.log(response[i].name);
                
                if (database == 'units') {
                    

                    let found = blacklist.find(element => element === response[i].name);


                    if (found == null) {

                        if (response[i].grouping != null) {
    
                            let results = response.filter(x => x.grouping != null);
                            results = results.filter(x => x.grouping[0] === response[i].grouping[0]);
                            response = response.filter((x) => !results.includes(x));
                            results.sort((a, b) => parseFloat(a.grouping[1]) - parseFloat(b.grouping[1]));
    
                            structuredList += `<div class="unit-card">
                                                <div>
                                                    <h2>${results[0].name}</h2>
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
                                                    </tr>`
    
                            for (let i = 0; i < results.length; i++) {
                                blacklist.push(results[i].name);
                                structuredList += `<tr>
                                <th>${results[i].name}</th>
                                <th>${results[i].move}</th>
                                <th>${results[i].weaponSkill}</th>
                                <th>${results[i].ballisticSkill}</th>
                                <th>${results[i].strength}</th>
                                <th>${results[i].toughness}</th>
                                <th>${results[i].wounds}</th>
                                <th>${results[i].attacks}</th>
                                <th>${results[i].leadership}</th>
                                <th>${results[i].save}</th>                            
                                <th>${results[i].max.toString().replace(100, "inf")}</th>
                                <th>${results[i].points}</th>
                                </tr>`
                            }
                            structuredList += `</table>
                            <p>keywords: ${results[0].keywords}</p>
                            </div>`;
    
                            response = response.concat(results);
    
                            response.sort((a, b) => parseFloat(a.name) - parseFloat(b.name));
    
                        } else {
                            structuredList += `<div class="unit-card">
                                 <div>
                                     <h2>${response[i].name}</h2>
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
                                     </tr>
                                    <tr>
                                    <th>${response[i].name}</th>
                                    <th>${response[i].move}</th>
                                    <th>${response[i].weaponSkill}</th>
                                    <th>${response[i].ballisticSkill}</th>
                                    <th>${response[i].strength}</th>
                                    <th>${response[i].toughness}</th>
                                    <th>${response[i].wounds}</th>
                                    <th>${response[i].attacks}</th>
                                    <th>${response[i].leadership}</th>
                                    <th>${response[i].save}</th>
                                    <th>${response[i].max.toString().replace(100, "inf")}</th>
                                    <th>${response[i].points}</th>
                                </tr>
                                </table>
                                <p>keywords: ${response[i].keywords}</p>
                                </div>`;
                        }

                    }



                }


                if (database == 'weapons') {
                    if (response[i].compound != null) {
                        //console.log(response[i].compound);
                        structuredList += `<div class="pi-row">
                                <label>Name: ${response[i].name.split('/')[0]}</label>                              
                                </div>
                                <div class="pi-row">
                                <label>${response[i].abilities}</label>                                                      
                                </div>
                                <div class="pi-row">
                                <label>${response[i + 1].abilities}</label>                                                      
                                </div><br>`;
                        i++;
                    } else {
                        structuredList += `<div class="pi-row">
                                <label>Name: ${response[i].name}</label>                              
                                </div>
                                <div class="pi-row">
                                <label>${response[i].abilities}</label>                              
                                </div><br>`;
                    }
                }

            }

            App.displayList.append(structuredList);
        }).always(() => {
            spinner.remove();
        });
    } else {
        structuredList = `
            <div class="pi-row">
            <label>${faction}</label>                              
            </div><br>`;
        App.displayList.append(structuredList);
    }

};


App.getUrlIds = () => {
    const urlID = new URL(window.location.href);
    const urlParams = [
        urlID.searchParams.get("race"),
        urlID.searchParams.get("menu")
    ];

    return urlParams;
};
