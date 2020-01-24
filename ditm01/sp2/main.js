var App = {};
var CLIENT_ID = '232027839626-m08sf576sh1auqkfcu7psl6k7co5rt0i.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDKxgQORJJyQEMGJlGSvMAx_8u7-m6rW7I';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";
var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
App.deleteButton = $('#delete-button');
App.eventForm = $('#event-form');
App.titleInput = $('#title-input');
App.startInput = $('#start-input');
App.endInput = $('#end-input');
App.locationInput = $('#location-input');
App.descriptionInput = $('description-input');
App.eventsList = $('#events-list');
App.detailEvent = $('#detail-info');

$(document).ready(function () {
    App.handleClientLoad();
    App.initEvent();
    App.updageLocalEvents();
});

App.handleClientLoad = function () {
    gapi.load('client:auth2', App.initClient);
};

App.initClient = function () {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(App.updateSigninStatus);
        App.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = App.handleAuthClick;
        signoutButton.onclick = App.handleSignoutClick;
    }, function (error) {
        alert(JSON.stringify(error, null, 2));
    });
}

App.updateSigninStatus = function (isSignedIn) {
    if (isSignedIn) {
        authorizeButton.className = 'signed-in';
        authorizeButton.innerText = 'Signed in';
    } else {
        authorizeButton.className = 'sign-in';;
        authorizeButton.innerText = 'Sign in';
    }
}

App.handleAuthClick = function () {
    gapi.auth2.getAuthInstance().signIn();
}

App.handleSignoutClick = function () {
    gapi.auth2.getAuthInstance().signOut();
}

App.initEvent = function () {
    App.eventForm.submit(function (event) {
        event.preventDefault();
        var titleValue = App.titleInput.val();
        var startTime = new Date(App.startInput.val());
        var endTime = new Date(App.endInput.val());
        var locationValue = App.locationInput.val();
        var descriptionText = App.descriptionInput.val();
        App.saveEvent(titleValue, startTime, endTime, locationValue, descriptionText);
        var eventItem = `<li class="event-item">${titleValue}</li>`;
        App.eventsList.append(eventItem);
        $('#events-list li').click(function () {
            var name = $(this).text();
            App.displayDetails(name);
        });
    });
};

App.updageLocalEvents = function () {
    for (var i = 0, len = localStorage.length; i < len; i++) {
        var key = localStorage.key(i);
        var eventItems = `<li class="event-item">${key}</li>`;
        App.eventsList.append(eventItems);
    }
    $('#events-list li').click(function () {
        var name = $(this).text();
        App.displayDetails(name);
    });
};

App.saveEvent = function (titleValue, startTime, endTime, locationValue, descriptionText) {
    var event = {
        'summary': titleValue,
        'location': locationValue,
        'description': descriptionText,
        'start': {
            'dateTime': startTime,
            'timeZone': 'Europe/Prague'
        },
        'end': {
            'dateTime': endTime,
            'timeZone': 'Europe/Prague'
        },
    };
    var event_serialized = JSON.stringify(event);
    var key = event.summary;
    localStorage.setItem(key, event_serialized);
}

App.displayDetails = function (name) {
    App.detailEvent.empty();
    var details = JSON.parse(localStorage.getItem(name));
    var startingDateTime = new Date(details.start.dateTime).toLocaleDateString('cs-CZ') + " at " + new Date(details.start.dateTime).toLocaleTimeString('cs-CZ');
    var endingDateTime = new Date(details.end.dateTime).toLocaleDateString('cs-CZ') + " at " + new Date(details.end.dateTime).toLocaleTimeString('cs-CZ');
    var info = `
        <div class="info">
            <div class="row">
                <div>Title</div>
                <div>${details.summary}</div>
            </div>
            <div class="row">
                <div>Start time</div>
                <div>${startingDateTime}</div>
            </div>
            <div class="row">
                <div>End time</div>
                <div>${endingDateTime}</div>
            </div>
            <div class="row">
                <div>Location</div>
                <div>${details.location || ''}</div>
            </div>
            <div class="row">
                <div>Description</div>
                <div>${details.description || ''}</div>
            </div>
        </div>
    <div class="buttons">
    <button id="send-button">Send event to your calender</button>
    <button id="delete-button">Delete event</button>
    </div>
    `;
    App.detailEvent.append(info);
    App.sendButton = $('#send-button');
    App.sendButton.click(function () {
        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': details
        });
        request.execute(function () {
            localStorage.removeItem(name);
            App.detailEvent.empty();
            App.eventsList.empty();
            App.updageLocalEvents();
            $('#content').append('your event has been successfully created');
            setTimeout(function (){
                $('#content').empty(); 
            }, 5000)
        });
    });
    App.deleteButton = $('#delete-button');
    App.deleteButton.click(function () {
        localStorage.removeItem(name);
        App.detailEvent.empty();
        App.eventsList.empty();
        App.updageLocalEvents();
    });
}