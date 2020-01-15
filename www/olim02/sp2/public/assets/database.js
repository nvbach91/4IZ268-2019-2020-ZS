function addCourseToDatabase(courseId, mandatority, name, ects, semester) {
    var userId = uid;
    firebase.database().ref('users/' + userId +'/courses/' + courseId).set({
        mandatority: mandatority,
        courseName: name,
        ects: ects,
        recSemester: semester
    });
}