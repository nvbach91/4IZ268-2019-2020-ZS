
var cardFilesModule = (function () {
    const context = {
        patientIdentifierForDelete: "",
        patientIdentifierForEdit: "",
        exerciseIdentifierForDelete: "",
        exerciseIdentifierForEdit: "",
        currentUserId: "",
    };

    const firebaseUrlUsers = "https://kartoteka-project.firebaseio.com/users/";
    const firebaseUrlExercises = "https://kartoteka-project.firebaseio.com/exercises/";

    const hideUI = function (displayPatientsUI) {
        const hiddenClass = "hidden-ui";

        const patientsUI = document.getElementById("patients-ui");
        const exercisesUI = document.getElementById("exercises-ui");
        const elementToHide = !displayPatientsUI ? patientsUI : exercisesUI;
        const elementToDisplay = displayPatientsUI ? patientsUI : exercisesUI;


        elementToHide.classList.add(hiddenClass);
        elementToDisplay.classList.remove(hiddenClass);
    };

    const initUI = function (displayPatientsUI, firstName, lastName, currentUserId) {
        hideUI(displayPatientsUI);

        if (displayPatientsUI) {
            loadUsers(loadUsersIntoPatientList);
            document.getElementById("submitNewPatient").addEventListener("click", addPatientsToDatabase);
            document.getElementById("submitDeletePatient").addEventListener("click", deletePatientFromDatabase);
            document.getElementById("submitEditPatient").addEventListener("click", editPatientInDatabase);
            document.getElementById("submitSearchPatient").addEventListener("click", searchForPatientName);
        } else {
            loadExercises(loadExercisesIntoExerciseList);
            context.currentUserId = currentUserId;
            document.getElementById("dynamicName").innerHTML = firstName + " " + lastName;
            document.getElementById("submitNewExercise").addEventListener("click", addExerciseToDatabase);
            document.getElementById("submitDeleteExercise").addEventListener("click", deleteExerciseFromDatabase);
            document.getElementById("submitEditExercise").addEventListener("click", editExerciseInDatabase);
        }
    };

    const loadUsersIntoPatientList = function (response) {
        let parsedResponse = JSON.parse(response);

        Object.keys(parsedResponse).forEach((key) => {
            console.log(parsedResponse);
            console.log(key)
            let user = parsedResponse[key];
            addRowToPatientList(user.firstName, user.lastName, user.creationDate, key);
        });
    };

    const loadExercisesIntoExerciseList = function (response) {
        console.log(response);
        let parsedResponse = JSON.parse(response);

        Object.keys(parsedResponse).forEach((key) => {
            let exercise = parsedResponse[key];

            if (exercise.userId === context.currentUserId) {
                addExerciseToExerciseList(exercise.date, exercise.note, key);
            }
        });
    };

    const sendRequestToFirebase = function (httpMethod, url, callback, dataToSend) {
        console.log("preparing request");

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log("data received");
                callback(xhr.response);
            }
        }

        if (!dataToSend) {
            dataToSend = "";
        }
        xhr.open(httpMethod, url, true);
        xhr.send(dataToSend);
        console.log("sent");
    };

    const callbackFilterUsers = function (response) {
        let whatIsSearchedFor = document.getElementById("patient-name-input").value;
        let parsedResponse = JSON.parse(response);

        let searchNotInserted = !whatIsSearchedFor || whatIsSearchedFor.length === 0;
        console.log("idem do cyklu")
        Object.keys(parsedResponse).forEach((key) => {
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
    };

    const searchForPatientName = function () {
        loadUsers(callbackFilterUsers);
    };

    const loadUsers = function (callbackForReceivingUsers) {
        sendRequestToFirebase("GET", firebaseUrlUsers + ".json", callbackForReceivingUsers)
    };

    const loadExercises = function (callbackForReceivingExercises) {
        sendRequestToFirebase("GET", firebaseUrlExercises + ".json", callbackForReceivingExercises)
    };

    const addPatientsToDatabase = function () {
        let userFromForm = getUserFromForm();
        let userIdentifier = Date.parse(new Date());

        let userFromFormAsString = JSON.stringify(userFromForm);
        sendRequestToFirebase("PUT", firebaseUrlUsers + userIdentifier + ".json", function () {
            addRowToPatientList(userFromForm.firstName, userFromForm.lastName, userFromForm.creationDate, userIdentifier);
        }, userFromFormAsString);
    };

    const addExerciseToDatabase = function () {
        let exerciseFromForm = getExerciseFromForm();
        let exerciseIdentifier = Date.parse(new Date());

        exerciseFromForm.userId = context.currentUserId;

        const exerciseFromFormAsString = JSON.stringify(exerciseFromForm);
        console.log(exerciseFromFormAsString);
        sendRequestToFirebase("PUT", firebaseUrlExercises + exerciseIdentifier + ".json", function () {
            addExerciseToExerciseList(exerciseFromForm.date, exerciseFromForm.note, exerciseIdentifier);
        }, exerciseFromFormAsString);
    };

    const addRowToPatientList = function (firstName, lastName, creationDate, patientId) {
        let table = document.getElementById("patient-list");
        let row = table.insertRow(1);
        row.id = "row-" + patientId;

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        cell1.innerHTML = firstName;
        cell2.innerHTML = lastName;
        cell3.innerHTML = creationDate;
        cell4.innerHTML = '<a class="small-nav" href="" data-toggle="modal" data-target="#exampleModalEdit" onClick="cardFilesModule.passEditId(' + patientId + ');">Editovať &#124;</a>' + '<a class="small-nav" href="" data-toggle="modal" data-target="#staticBackdrop" onClick="cardFilesModule.passDeleteId(' + patientId + ');">Vymazať &#124;</a>' + '<a class="small-nav" data-prevent="" href="" onClick="cardFilesModule.displayExercises(\'' + firstName + '\',\'' + lastName + '\',' + patientId + ');return false;">Zobraziť cvičenia</a>';
    };

    const displayExercises = function (firstName, lastName, patientId) {
        initUI(false, firstName, lastName, patientId);
    };

    const passEditId = function (patientId) {
        context.patientIdentifierForEdit = patientId;
        sendRequestToFirebase("GET", firebaseUrlUsers + context.patientIdentifierForEdit + ".json", fillModalForEditing)
    };

    const fillModalForEditing = function (response) {
        let parsedEditedDataToModal = JSON.parse(response);
        document.getElementById("edit-patient-first-name").value = parsedEditedDataToModal.firstName;
        document.getElementById("edit-patient-last-name").value = parsedEditedDataToModal.lastName;
        document.getElementById("edit-create-date").value = parsedEditedDataToModal.creationDate;
        document.getElementById("edit-phone-number").value = parsedEditedDataToModal.phoneNumber;
        document.getElementById("edit-add-note").value = parsedEditedDataToModal.note;
    };

    const editPatientInDatabase = function () {
        let userFromEditForm = getUserFromEditedForm();
        let dataToSend = JSON.stringify(userFromEditForm);
        sendRequestToFirebase("PUT", firebaseUrlUsers + context.patientIdentifierForEdit + ".json", editPatientInPatientList, dataToSend);
    };

    const editPatientInPatientList = function (responseData) {
        let parsedEditedData = JSON.parse(responseData);
        console.log(parsedEditedData);
        deletePatientFromPatientListById(context.patientIdentifierForEdit);
        addRowToPatientList(parsedEditedData.firstName, parsedEditedData.lastName, parsedEditedData.creationDate, context.patientIdentifierForEdit);
        alert("Údaje o pacientovi boli úspešne zmenené.");
    };

    const passEditExerciseId = function (exerciseId) {
        context.exerciseIdentifierForEdit = exerciseId;
        sendRequestToFirebase("GET", firebaseUrlExercises + context.exerciseIdentifierForEdit + ".json", fillModalForEditingExercise)
    };

    const fillModalForEditingExercise = function (response) {
        let parsedExerciseEditedDataToModal = JSON.parse(response);
        document.getElementById("exercise-date-edit").value = parsedExerciseEditedDataToModal.date;
        document.getElementById("exercise-note-edit").value = parsedExerciseEditedDataToModal.note;
    };

    const editExerciseInDatabase = function () {
        let exerciseFromEditForm = getExerciseFromEditedForm();
        exerciseFromEditForm.userId = context.currentUserId;
        let exerciseDataToSend = JSON.stringify(exerciseFromEditForm);
        sendRequestToFirebase("PUT", firebaseUrlExercises + context.exerciseIdentifierForEdit + ".json", editExerciseInExerciseList, exerciseDataToSend);
    };

    const editExerciseInExerciseList = function (responseData) {
        let exerciseParsedEditedData = JSON.parse(responseData);
        console.log(exerciseParsedEditedData);
        deleteExerciseFromExerciseListById(context.exerciseIdentifierForEdit);
        addExerciseToExerciseList(exerciseParsedEditedData.date, exerciseParsedEditedData.note, context.exerciseIdentifierForEdit);
        alert("Údaje o cvičení boli úspešne zmenené.");
    };

    const passDeleteId = function (patientId) {
        context.patientIdentifierForDelete = patientId;
    };

    const deletePatientFromDatabase = function () {
        sendRequestToFirebase("DELETE", firebaseUrlUsers + context.patientIdentifierForDelete + ".json", deletePatientFromPatientList);
    };

    const deletePatientFromPatientList = function (responseData) {
        deletePatientFromPatientListById(context.patientIdentifierForDelete);
    };

    const deletePatientFromPatientListById = function (patientId) {
        let rowToDelete = document.getElementById("row-" + patientId);
        if (rowToDelete) {
            rowToDelete.parentElement.removeChild(rowToDelete);
        }
    };

    const addExerciseToExerciseList = function (date, note, exerciseId) {
        let table = document.getElementById("planned-exercises-list");
        let currrentDateTime = new Date();
        let exerciseDate = new Date(date);
        if (currrentDateTime > exerciseDate) {
            table = document.getElementById("expired-exercises-list");
        }

        let row = table.insertRow(1);
        row.id = "row-" + exerciseId;
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = date;
        cell2.innerHTML = note;
        cell3.innerHTML = '<a class="small-nav" href="" data-toggle="modal" data-target="#exampleModalEditExercise" onClick="cardFilesModule.passEditExerciseId(' + exerciseId + ');">Editovať &#124;</a>' + '<a class="small-nav" href="" data-toggle="modal" data-target="#staticBackdropExercise" onClick="cardFilesModule.passDeleteIdOfExercise(' + exerciseId + ');">Vymazať</a>';
    };

    const getUserFromEditedForm = function () {
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
    };

    const getUserFromForm = function () {
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
    };

    const getExerciseFromForm = function () {
        let formExerciseDate = document.getElementById("date").value;
        let formExerciseNote = document.getElementById("note").value;

        return {
            date: formExerciseDate,
            note: formExerciseNote,
        };
    };

    const getExerciseFromEditedForm = function () {
        let formExerciseDate = document.getElementById("exercise-date-edit").value;
        let formExerciseNote = document.getElementById("exercise-note-edit").value;

        return {
            date: formExerciseDate,
            note: formExerciseNote,
        };
    };

    const passDeleteIdOfExercise = function (exerciseId) {
        context.exerciseIdentifierForDelete = exerciseId;
    };

    const deleteExerciseFromDatabase = function () {
        sendRequestToFirebase("DELETE", firebaseUrlExercises + context.exerciseIdentifierForDelete + ".json", deleteExerciseFromExerciseList);
    };

    const deleteExerciseFromExerciseList = function (responseData) {
        deleteExerciseFromExerciseListById(context.exerciseIdentifierForDelete);
    };

    const deleteExerciseFromExerciseListById = function (exerciseId) {
        let exerciseRowToDelete = document.getElementById("row-" + exerciseId);
        if (exerciseRowToDelete) {
            exerciseRowToDelete.parentElement.removeChild(exerciseRowToDelete);
        }
    };

    return {
        initUI: initUI,
        displayExercises: displayExercises,
        passEditExerciseId: passEditExerciseId,
        passDeleteIdOfExercise: passDeleteIdOfExercise,
        passDeleteId: passDeleteId,
        passEditId: passEditId
    };
})();

window.onload = function () {
    cardFilesModule.initUI(true);
};