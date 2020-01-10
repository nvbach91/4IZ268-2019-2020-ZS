$(document).ready(function () {

    setTimeout(function () {
        $("#list1").typed({
            strings: ["okamžitě"],
            typeSpeed: 50,
            // schovat kurzor
            callback: function () {
                $(".typed-cursor").hide();
            }
        })
    }, 0);

    setTimeout(function () {
        $("#list2").typed({
            strings: ["bezplatně"],
            typeSpeed: 50,
            // schovat kurzor
            callback: function () {
                $(".typed-cursor").hide();
            }
        })
    }, 2000);
    setTimeout(function () {
        $("#list3").typed({
            strings: ["jednodušše"],
            typeSpeed: 50,
            // schovat kurzor
            callback: function () {
                $(".typed-cursor").hide();
            }
        })
    }, 4000);
    setTimeout(function () {
        $("#list4").typed({
            strings: ["ihned!"],
            typeSpeed: 50,
            // schovat kurzor
            callback: function () {
                $(".typed-cursor").hide();
            }
        })
    }, 6000);
});
