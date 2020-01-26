"use strict";

jQuery(document).ready(function() {
    if($("#web_modal_new")) {
        $("#web_modal_new").modal('show');
        $("#analyse-new").click(function(){
            $("#web_modal_new").modal('hide');
            analyse();
        });
    }
    $("#analyse").click(function(){
        analyse();
    });
});

function removeWeb(domain) {
    $.post( window.location.href+"?remove", { domain: domain, score: score } );
}

function analyse() {
    var url = $(".kt-widget__head .kt-widget__title").attr("href");
    //screenshot();
    validace(url);
    speed(url);
    logTest(url, 65); // TODO - Static 65

}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function screenshot() {
    $("#screenshot").attr("src","demo/screen.png");
}
function validace(url) {
    var errorCount = 0;
    var warningCount = 0;

    var portlet = new KTPortlet('validace');

    KTApp.block(portlet.getSelf(), {
        overlayColor: '#ffffff',
        type: 'loader',
        state: 'success',
        opacity: 0.3,
        size: 'lg'
    });

    $.ajax({ // TODO - refactor
        url: "https://validator.nu/?doc="+url+"&out=json", success: function (result) {
            $("#lab_web_validace_messages .kt-timeline-v3__items").empty();

            var items = "";
            for (var i = 0; i < result.messages.length; i++) {
                if (result.messages[i].type == "error") {
                    errorCount++;
                }
                else {
                    warningCount++;
                }
                items += validace_generateItem(result.messages[i]);
            }
            $("#lab_web_validace_messages .kt-timeline-v3__items").append(items);
            var score = countScore(errorCount);
            $("#validace_errors_count").text(errorCount);
            $("#validace_warnings_count").text(warningCount);
            $("#validace_total_count").text(errorCount + warningCount);
            $("#validace_total_score .progress-bar").css("width",score+"%");
            $("#validace_total_score span").text(score + "%");
            $("#validace_final .kt-widget__value").text(score + "%");
            KTApp.unblock(portlet.getSelf());
        }
    });
}

function validace_generateItem(message) {
    var elemClass = message.type == "error"?"danger":"warning";
    var newItem = $('<div class="kt-timeline-v3__item kt-timeline-v3__item--'+elemClass+'">' +
        '<span class="kt-timeline-v3__item-time">'+message.lastLine+'</span>' +
        '<div class="kt-timeline-v3__item-desc">' +
        '<span class="kt-timeline-v3__item-text">'+message.message+'</span>' +
        '<br><span class="kt-timeline-v3__item-user-name"><code></code></span></div></div>');
    newItem.find("code").html(escapeHtml(message.extract));
    return newItem.prop('outerHTML');
}

function speed(url) {
    var portlet = new KTPortlet('desktop-speed');

    KTApp.block(portlet.getSelf(), {
        overlayColor: '#ffffff',
        type: 'loader',
        state: 'success',
        opacity: 0.3,
        size: 'lg'
    });

    $.ajax({
        url: "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url="+url, success: function (result) {
            /*
            for (var i = 0; i < result.messages.length; i++) {
                if (result.messages[i].type == "error") {
                    errorCount++;
                }
                else {
                    warningCount++;
                }
                validace_addItem(result.messages[i]);
            }
            */
            $("#firstMeaningfulPaint").text(result.lighthouseResult.audits.metrics.details.items[0].firstMeaningfulPaint/1000 + 's');
            $("#speedIndex").text(result.lighthouseResult.audits.metrics.details.items[0].speedIndex/1000 + 's');
            $("#interactive").text(result.lighthouseResult.audits.metrics.details.items[0].interactive/1000 + 's');
            $("#interactive").text(result.lighthouseResult.audits.metrics.details.items[0].interactive/1000 + 's');

            KTApp.unblock(portlet.getSelf());
        }
    });

}

function countScore(errCount, warnCount) {
    if (warnCount === undefined || warnCount === null) {
        warnCount = 1;
    }
    var coefficient = Math.pow(1.1,errCount) * Math.pow(1.05,warnCount);
    //alert(coefficient + " (" + errCount + "," + warnCount + ") -> " + 100/coefficient)
    return Math.round(100/coefficient);
}

function logTest(domain, score) {
    $.post( "", { domain: domain, score: score } );
}