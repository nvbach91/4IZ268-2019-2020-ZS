var patientIdentifierForDelete = "";
var patientIdentifierForEdit = "";
var exerciseIdentifierForDelete = "";
var exerciseIdentifierForEdit = "";

window.onload = function () {
    if (window.location.href.indexOf("index.html") > 0) {
        loadUsers(loadUsersIntoPatientList);
        document.getElementById("submitNewPatient").addEventListener("click", addPatientsToDatabase);
        document.getElementById("submitDeletePatient").addEventListener("click", deletePatientFromDatabase);
        document.getElementById("submitEditPatient").addEventListener("click", editPatientInDatabase);
        document.getElementById("submitSearchPatient").addEventListener("click", searchForPatientName);
    } else {
        loadExercises(loadExercisesIntoExerciseList);
        const firstName = getUrlParameter('firstName');
        const lastName = getUrlParameter('lastName');
        document.getElementById("dynamicName").innerHTML = firstName + " " + lastName;
        document.getElementById("submitNewExercise").addEventListener("click", addExerciseToDatabase);
        document.getElementById("submitDeleteExercise").addEventListener("click", deleteExerciseFromDatabase);
        document.getElementById("submitEditExercise").addEventListener("click", editExerciseInDatabase);
    }
};


function loadUsersIntoPatientList(response) {
    var parsedResponse = JSON.parse(response);

    Object.keys(parsedResponse).forEach(function (key) {
        let user = parsedResponse[key];
        addRowToPatientList(user.firstName, user.lastName, user.creationDate, key);
    });
}

function loadExercisesIntoExerciseList(response) {
    console.log(response);
    var parsedResponse = JSON.parse(response);

    Object.keys(parsedResponse).forEach(function (key) {
        let exercise = parsedResponse[key];

        if (exercise.userId === getUrlParameter("userId")) {
            addExerciseToExerciseList(exercise.date, exercise.note, key);
        }
    });
}

function sendRequestToFirebase(httpMethod, url, callback, dataToSend) {    
    console.log("preparing request");

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log("data received");
            callback(xhr.response);
        }
    }

    if (!dataToSend) {
        dataToSend = '';
    }
    xhr.open(httpMethod, url, true);
    xhr.send(dataToSend);
    console.log("sent");
}

function callbackFilterUsers(response) {
    var whatIsSearchedFor = document.getElementById("patient-name-input").value;
    var parsedResponse = JSON.parse(response);

    let searchNotInserted = !whatIsSearchedFor || whatIsSearchedFor.length === 0;
    console.log("idem do cyklu")
    Object.keys(parsedResponse).forEach(function (key) {
        let user = parsedResponse[key];

        let firstNAmeFind = user.firstName.toLowerCase().indexOf(whatIsSearchedFor.toLowerCase()) > -1;
        let lastNameFind = user.lastName.toLowerCase().indexOf(whatIsSearchedFor.toLowerCase()) > -1;
        if (searchNotInserted === true || (firstNAmeFind || lastNameFind)) {
            deletePatientFromPatientListById(key);
            addRowToPatientList(user.firstName, user.lastName, user.creationDate, key);
        } else {
            deletePatientFromPatientListById(key);
        }
    });
}


function searchForPatientName() {
    loadUsers(callbackFilterUsers);
}

function loadUsers(callbackForReceivingUsers) {
    sendRequestToFirebase('GET', "https://kartoteka-project.firebaseio.com/users.json", callbackForReceivingUsers)
}


function loadExercises(callbackForReceivingExercises) {
    sendRequestToFirebase('GET', "https://kartoteka-project.firebaseio.com/exercises.json", callbackForReceivingExercises)
}

function addPatientsToDatabase() {
    var userFromForm = getUserFromForm();
    var userIdentifier = Date.parse(new Date());

    var userFromFormAsString = JSON.stringify(userFromForm);
    sendRequestToFirebase('PUT', "https://kartoteka-project.firebaseio.com/users/" + userIdentifier + ".json", function () {
        addRowToPatientList(userFromForm.firstName, userFromForm.lastName, userFromForm.creationDate, userIdentifier);
    }, userFromFormAsString);
}

function addExerciseToDatabase() {
    var exerciseFromForm = getExerciseFromForm();
    var exerciseIdentifier = Date.parse(new Date()); 

    exerciseFromForm.userId = getUrlParameter("userId");

    const exerciseFromFormAsString = JSON.stringify(exerciseFromForm);
    console.log(exerciseFromFormAsString);
    sendRequestToFirebase('PUT', "https://kartoteka-project.firebaseio.com/exercises/" + exerciseIdentifier + ".json", function () {
        addExerciseToExerciseList(exerciseFromForm.date, exerciseFromForm.note, exerciseIdentifier);
    }, exerciseFromFormAsString);
}

function addRowToPatientList(firstName, lastName, creationDate, patientId) {
    var table = document.getElementById("patient-list");
    var row = table.insertRow(1);
    row.id = 'row-' + patientId;  

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    console.log(firstName);
    cell1.innerHTML = '<p>' + firstName + '</p>';
    cell2.innerHTML = lastName;
    cell3.innerHTML = creationDate;
    cell4.innerHTML = '<a style="color:black;font-size:9px;" href="" data-toggle="modal" data-target="#exampleModalEdit" onClick="passEditId(' + patientId + ');">Editovať &#124;</a>' + '<a style="color:black;font-size:9px;" href="" data-toggle="modal" data-target="#staticBackdrop" onClick="passDeleteId(' + patientId + ');">Vymazať &#124;</a>' + '<a style="color:black;font-size:9px;" href="./exercise.html?firstName=' + firstName + '&lastName=' + lastName + '&userId=' + patientId + '">Zobraziť cvičenia</a>';
}

function passEditId(patientId) {
    patientIdentifierForEdit = patientId; 
    sendRequestToFirebase('GET', "https://kartoteka-project.firebaseio.com/users/" + patientIdentifierForEdit + ".json", fillModalForEditing)
}

function fillModalForEditing(response) { 
    var parsedEditedDataToModal = JSON.parse(response); 
    document.getElementById("edit-patient-first-name").value = parsedEditedDataToModal.firstName;
    document.getElementById("edit-patient-last-name").value = parsedEditedDataToModal.lastName;
    document.getElementById("edit-create-date").value = parsedEditedDataToModal.creationDate;
    document.getElementById("edit-phone-number").value = parsedEditedDataToModal.phoneNumber;
    document.getElementById("edit-add-note").value = parsedEditedDataToModal.note;
}

function editPatientInDatabase() {
    var userFromEditForm = getUserFromEditedForm();
    var dataToSend = JSON.stringify(userFromEditForm);
    sendRequestToFirebase('PUT', "https://kartoteka-project.firebaseio.com/users/" + patientIdentifierForEdit + ".json", editPatientInPatientList, dataToSend);
}


function editPatientInPatientList(responseData) {
    var parsedEditedData = JSON.parse(responseData);
    console.log(parsedEditedData);
    deletePatientFromPatientListById(patientIdentifierForEdit);
    addRowToPatientList(parsedEditedData.firstName, parsedEditedData.lastName, parsedEditedData.creationDate, patientIdentifierForEdit);
    alert("Údaje o pacientovi boli úspešne zmenené.");
}

function passEditExerciseId(exerciseId) {
    exerciseIdentifierForEdit = exerciseId;
    sendRequestToFirebase('GET', "https://kartoteka-project.firebaseio.com/exercises/" + exerciseIdentifierForEdit + ".json", fillModalForEditingExercise)
}

function fillModalForEditingExercise(response) {
    var parsedExerciseEditedDataToModal = JSON.parse(response); 
    document.getElementById("exercise-date-edit").value = parsedExerciseEditedDataToModal.date;
    document.getElementById("exercise-note-edit").value = parsedExerciseEditedDataToModal.note;
}

function editExerciseInDatabase() {
    var exerciseFromEditForm = getExerciseFromEditedForm();
    exerciseFromEditForm.userId = getUrlParameter('userId');
    var exerciseDataToSend = JSON.stringify(exerciseFromEditForm);
    sendRequestToFirebase('PUT', "https://kartoteka-project.firebaseio.com/exercises/" + exerciseIdentifierForEdit + ".json", editExerciseInExerciseList, exerciseDataToSend);
}

function editExerciseInExerciseList(responseData) {
    var exerciseParsedEditedData = JSON.parse(responseData);
    console.log(exerciseParsedEditedData);
    deleteExerciseFromExerciseListById(exerciseIdentifierForEdit);
    addExerciseToExerciseList(exerciseParsedEditedData.date, exerciseParsedEditedData.note, exerciseIdentifierForEdit);
    alert("Údaje o cvičení boli úspešne zmenené.");
}

function passDeleteId(patientId) {
    patientIdentifierForDelete = patientId; 
}

function deletePatientFromDatabase() {
    sendRequestToFirebase('DELETE', "https://kartoteka-project.firebaseio.com/users/" + patientIdentifierForDelete + ".json", deletePatientFromPatientList);
}

function deletePatientFromPatientList(responseData) {
    deletePatientFromPatientListById(patientIdentifierForDelete);
}

function deletePatientFromPatientListById(patientId) {
    var rowToDelete = document.getElementById("row-" + patientId);
    if (rowToDelete) {
        rowToDelete.parentElement.removeChild(rowToDelete);
    }
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function addExerciseToExerciseList(date, note, exerciseId) {
    var table = document.getElementById("planned-exercises-list");
    var currrentDateTime = new Date();
    var exerciseDate = new Date(date);
    if (currrentDateTime > exerciseDate) {
        table = document.getElementById("expired-exercises-list");
    }

    var row = table.insertRow(1);
    row.id = 'row-' + exerciseId;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = date;
    cell2.innerHTML = note;
    cell3.innerHTML = '<a style="color:black;font-size:9px;" href="" data-toggle="modal" data-target="#exampleModalEditExercise" onClick="passEditExerciseId(' + exerciseId + ');">Editovať &#124;</a>' + '<a style="color:black;font-size:9px;" href="" data-toggle="modal" data-target="#staticBackdropExercise" onClick="passDeleteIdOfExercise(' + exerciseId + ');">Vymazať</a>';
};

function getUserFromEditedForm() {
    let formPatientFirstName = document.getElementById("edit-patient-first-name").value;
    let formPatientLastName = document.getElementById("edit-patient-last-name").value;
    let formCreateDate = document.getElementById("edit-create-date").value;
    let formPhoneNumber = document.getElementById("edit-phone-number").value;
    let formAddNote = document.getElementById("edit-add-note").value;

    return { 
        firstName: formPatientFirstName,
        lastName: formPatientLastName,
        creationDate: formCreateDate,
        phoneNumber: formPhoneNumber,
        note: formAddNote
    };
}

function getUserFromForm() {
    let formPatientFirstName = document.getElementById("patient-first-name").value;
    let formPatientLastName = document.getElementById("patient-last-name").value;
    let formCreateDate = document.getElementById("create-date").value;
    let formPhoneNumber = document.getElementById("phone-number").value;
    let formAddNote = document.getElementById("add-note").value;

    return { 
        firstName: formPatientFirstName,
        lastName: formPatientLastName,
        creationDate: formCreateDate,
        phoneNumber: formPhoneNumber,
        note: formAddNote
    };
}

function getExerciseFromForm() {
    var formExerciseDate = document.getElementById("date").value;
    var formExerciseNote = document.getElementById("note").value;

    return {
        date: formExerciseDate,
        note: formExerciseNote,
    };
}

function getExerciseFromEditedForm() {
    var formExerciseDate = document.getElementById("exercise-date-edit").value;
    var formExerciseNote = document.getElementById("exercise-note-edit").value;

    return {
        date: formExerciseDate,
        note: formExerciseNote,
    };
}

function passDeleteIdOfExercise(exerciseId) {
    exerciseIdentifierForDelete = exerciseId; 
}

function deleteExerciseFromDatabase() {
    sendRequestToFirebase('DELETE', "https://kartoteka-project.firebaseio.com/exercises/" + exerciseIdentifierForDelete + ".json", deleteExerciseFromExerciseList);
}

function deleteExerciseFromExerciseList(responseData) {
    deleteExerciseFromExerciseListById(exerciseIdentifierForDelete);
}

function deleteExerciseFromExerciseListById(exerciseId) {
    var exerciseRowToDelete = document.getElementById("row-" + exerciseId);
    if (exerciseRowToDelete) {
        exerciseRowToDelete.parentElement.removeChild(exerciseRowToDelete);
    }
}