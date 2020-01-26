"use strict";

function send_domain() {
    var new_url = $("#add_web").attr("data-goto")+'/'+$("#domena").val();
    window.location.href = new_url;
}

jQuery(document).ready(function() {
    $('#web_modal_new').on('shown.bs.modal', function () {
        $('#add_new_web').trigger('focus');
    });

    $("#add_web").click(function(){send_domain();});

    $('#domena').on('keypress', function (e) {
        if(e.which === 13) {
            send_domain();
        }
    });

    $("#order_desc").click(function() {
        $.ajax({
            url: window.location.href+"?order=desc", success: function (result) {
                console.log(result);
                $(".kt-container .row").empty();

                var items = "";
                for (var i = 0; i < result.length; i++) {
                    items += list_generateItem(result[i]);
                }
                $(".kt-container .row").append(items);
                /*
                var score = countScore(errorCount);
                $("#validace_errors_count").text(errorCount);
                $("#validace_warnings_count").text(warningCount);
                $("#validace_total_count").text(errorCount + warningCount);
                $("#validace_total_score .progress-bar").css("width",score+"%");
                $("#validace_total_score span").text(score + "%");
                $("#validace_final .kt-widget__value").text(score + "%");
                KTApp.unblock(portlet.getSelf());
                */
            }
        });
    });
    $("#order_asc").click(function() {
        $.ajax({
            url: window.location.href+"?order=asc", success: function (result) {
                console.log(result);
                $(".kt-container .row").empty();

                var items = "";
                for (var i = 0; i < result.length; i++) {
                    items += list_generateItem(result[i]);
                }
                $(".kt-container .row").append(items);
                /*
                var score = countScore(errorCount);
                $("#validace_errors_count").text(errorCount);
                $("#validace_warnings_count").text(warningCount);
                $("#validace_total_count").text(errorCount + warningCount);
                $("#validace_total_score .progress-bar").css("width",score+"%");
                $("#validace_total_score span").text(score + "%");
                $("#validace_final .kt-widget__value").text(score + "%");
                KTApp.unblock(portlet.getSelf());
                */
            }
        });
    });
});

function list_generateItem(result) {
    return '<div class="col-xl-3">' +
        '    <div class="kt-portlet kt-portlet--height-fluid">' +
        '        <div class="kt-portlet__head kt-portlet__head--noborder">' +
        '            <div class="kt-portlet__head-label">' +
        '                <h3 class="kt-portlet__head-title">' +
        '                </h3>' +
        '            </div>' +
        '        </div>' +
        '        <div class="kt-portlet__body">' +
        '<!--begin::Widget -->' +
        '            <div class="kt-widget kt-widget--user-profile-2">' +
        '                <div class="kt-widget__head">' +
        '                    <div class="kt-widget__media">' +
        '                        <img class="kt-widget__img kt-hidden-" src="http://image.thum.io/get/width/300/http://'+result.domain+'" alt="image">' +
        '                    </div>' +
        '                    <div class="kt-widget__info">' +
        '                        <a href="'+$("#add_web").attr("data-goto")+'/'+result.domain+'" class="kt-widget__titel kt-hidden-">' +
        '                            '+result.domain +
        '                        </a>' +
        '                        <a href="#" class="kt-widget__username kt-hidden">' +
        '                            Luca Doncic' +
        '                        </a>' +
        '                        <span class="kt-widget__desc">' +
        '                                                    Head of Development' +
        '                                                </span>' +
        '                    </div>' +
        '                </div>' +
        '                <div class="kt-widget__body">' +
        '                    <div class="kt-widget__section">'+result.description+'</div>' +
        '                    <div class="kt-widget__item">' +
        '                        <div class="kt-widget__contact">' +
        '                            <span class="kt-widget__label">Celkové skóre:</span>' +
        '                            <a href="#" class="kt-widget__data">50%</a>' +
        '                        </div>' +
        '                        <div class="kt-widget__contact">' +
        '                            <span class="kt-widget__label">Přidal:</span>' +
        '                            <span class="kt-widget__data">Robert Mikšík</span>' +
        '                        </div>' +
        '                    </div>' +
        '                </div>' +
        '                <div class="kt-widget__footer">' +
        '                    <a href="'+$("#add_web").attr("data-goto")+'/'+result.domain+'" class="btn btn-label-brand btn-lg btn-upper">Zobrazit web</a>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';
}