function addCourseToDatabase(courseId, mandatority, name, ects, semester) {
    var userId = uid;
    firebase.database().ref('users/' + userId + '/courses/' + courseId).set({
        mandatority: mandatority,
        courseName: name,
        ects: ects,
        recSemester: semester
    });
}

function gotData(snapshot) {
    var courses = snapshot.val();
    var keys = Object.keys(courses);
    //clearing old data so it is displayed only once
    $("#table-mandatory tbody tr").remove();
    $("#table-semi-optional tbody tr").remove();
    $("#table-optional tbody tr").remove();
    $("#id-opts option").remove();

    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var courseId = k;
        var courseName = courses[k].courseName;
        var ects = courses[k].ects;
        var mandatority = courses[k].mandatority;
        var recSemester = courses[k].recSemester;
        var actSemester = courses[k].actualSemester;

        $("#table-" + mandatority + " tbody").append(
            "<tr>" +

            "<td>" +
            "<button type='button' " +
            "onclick='courseDisplay(this);' " +
            "class='btn dark far fa-edit'" +
            "</button>" +
            "</td>" +

            "<td>" + courseId + "</td>" +
            "<td>" + courseName + "</td>" +
            "<td>" + ects + "</td>" +
            "<td>" + recSemester + "</td>" +

            "<td>" +
            "<button type='button' " +
            "onclick='courseDelete(this);' " +
            "class='btn dark far fa-trash-alt'" +
            "</button>" +
            "</td>" +

            "</tr>"
        );

        
        $("#id-opts").append(
            //Not getting full name of course even with regex (?=).+
            $("<option></option>")
            .attr("value", courseId + "-" + courseName)
        );

        if (actSemester && actSemester !== null) {
            $("#table-" + actSemester + "-sem").append(
                "<tr>" +

                "<td>" + courseId + "</td>" +
                "<td>" + courseName + "</td>" +
                "<td>" + ects + "</td>" +

                "<td>" +
                "<button type='button' " +
                "onclick='delFromPlan(this)' " +
                "class='btn dark far fa-trash-alt'" +
                "</button>" +
                "</td>" +

                "</tr>"
            );
        }
    }
}

function errData(err) {
    console.log('Error!!');
    console.log(err);
}