$(document).ready(function () {
    $("#analyze_start").click(function () {
        var url = $("#analyze_url").val();
        analyze(url);
    });
});


function analyze(url) {
    $.ajax({
        url: "https://validator.nu/?doc="+url+"&out=json", success: function (result) {
            console.log(result);
            result.messages.forEach(function (message) {
                $("#result").append('<div class="alert alert-danger" role="alert">\n' +
                    message.message +
                    '<span class="float-right"><strong>'+message.lastLine+'</strong></span>' +
                    '</div>');
            });
        }
    });
}