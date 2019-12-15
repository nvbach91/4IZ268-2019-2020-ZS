function currencyView() {
    $.ajax({
        dataTypes: "json",
        url: "https://www.csas.cz/webapi/api/v2/rates/exchangerates/?" + $.param({
            'WEB-API-key': 'b5e6ec69-95ee-4d2e-9ac5-796892da0721'
        }),
        method: 'GET',

        success: function (data) {
            console.log(data);
            v(data);


        },
        error: function (err) {
            console.log('error:' + err)
        }


    });


    var v = function zpracovaniJson(data) {
        var table = document.getElementById("tableOfCurrency");
        data.forEach(function (t) {
            //
            console.log(t.shortName);

            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = t.shortName;
            cell2.innerHTML = t.name;
            cell3.innerHTML = t.currMid + " Kč";
            cell4.innerHTML = t.country;

        });


    }

}






//
//
// //
// // $(function () {
// //     $.ajax({
// //         type: 'GET',
// //         url: 'https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt'
// //         success: function (data) {
// //             console.log('success', data);
// //
// //         }
// //
// //
// //     });
// //
// // });
//
//
// var pageExecute = {
//
//     fileContents:"Null",
//     pagePrefix:"Null",
//     slides:"Null",
//
//     init: function () {
//         $.ajax({
//             url: "https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt",
//             async: false,
//             success: function (data){
//                 pageExecute.fileContents = data;
//             }
//         });
//     }
// };



$("#btnCurrency").click(function () {
    currencyView();
});
