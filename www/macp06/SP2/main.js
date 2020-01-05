var currencies;
var intervalFavorite;
$(window).on("load", function () {
    // Get all currencies
    $.ajax({
        dataTypes: "json",
        url: "https://free.currconv.com/api/v7/currencies?" + "apiKey=" + "a59d58073ff704d66793",
        method: 'GET',
        success: function (data) {
            currencies = data.results;
            console.log(data);
        },
        error: function (err) {
            console.log('error:', err)
        }


    }).done(function () {
        $.ajax({
            dataTypes: "json",
            url: "https://api.exchangeratesapi.io/latest",
            method: 'GET',
            success: function (data) {
                changeValues(data.rates);
                console.log(data);
                renderSelect("currencyFrom", currencies);
                renderSelect("currencyTo", currencies);
                renderSelect("favoriteCurrencyAdd", currencies);
                renderSelect("favoriteCurrency", currencies);
                setUpFlags(currencies);
            },
            error: function (err) {
                console.log('error:', err)
            }
        });
    });
    $('#fromCurrency').bind('keyup mouseup', getCurrencyValue);
    $('select.convertor-select').bind('change', getCurrencyValue);
    $('#addFavorite').on("click", addFavorite);
    $('#favoriteCurrency').on("change", changeFavorite);
    $('#updateFavorite').on("click", updateFavorite);

});

function changeFavorite(){
    clearInterval(intervalFavorite);
    intervalFavorite = setInterval(updateFavorite, 2000);
    updateFavorite();
}

function updateFavorite(){
    const actualCurrency = $('#favoriteCurrency').val();
    // debugger;
    console.log("https://api.exchangeratesapi.io/latest?base="+actualCurrency);
    $.ajax({
        dataTypes: "json",
        url: "https://api.exchangeratesapi.io/latest?base="+actualCurrency,
        method: 'GET',
        success: function (data) {
            console.log(data);
            changeValues(data.rates);
            renderFavorite();
        },
        error: function (err) {
            console.log('error:', err)
        }
    });
}

function changeValues(data) {
    const c = currencies;
    const result = {};
    $.each(data, function (key, value) {
        if (typeof currencies[key] === "undefined")
            console.log(currencies, key, value);
        else
            result[key] = Object.assign({}, currencies[key], { value: value });
    });
    result.EUR = Object.assign({ value: 0 }, currencies.EUR); //Because all currencies are towards euro
    currencies = result;
}

function addFavorite() {
    const currency = $('#favoriteCurrencyAdd').val();
    const actualCurrency = $('#favoriteCurrency').val();
    var array = window.localStorage.getItem(actualCurrency);
    if (array == "" || array == null) {
        array = [];
    } else {
        array = JSON.parse(array);
    }
    console.log(array);
    if (!array.some((x) => x == currency))
        array.push(currency);
    window.localStorage.setItem(actualCurrency, JSON.stringify(array));
    //renderSelect(); //TODO
    renderFavorite();
}

function renderSelect(id, data) {
    const select = $('#' + id);
    select.empty();
    let currency;
    $.each(data, function (key, value) {
        currency = $('<option></option>').text(currencies[key].currencyName).val(key);
        select.append(currency);
    });
}

function setUpFlags(data) {
    const array = [];
    $.each(data, function (key, value) {
        array.push($.ajax({
            dataTypes: "json",
            url: "https://restcountries.eu/rest/v2/currency/" + key,
            method: 'GET',
            success: function (data) {
                if (data.length > 0)
                    currencies[key].flag = "<img height='16' src='" + data[0].flag + "' />";
                else
                    currencies[key].flag = "";
            },
            error: function (err) {
                console.log('error:', err)
            }
        }));
    });
    Promise.all(array).then(function () {
        renderFavorite();
        $('#favoriteCurrency').attr("disabled", false);
    });
}

function renderFavorite() {
    const currency = $('#favoriteCurrency').val();
    var table = $("#tableOfCurrency");
    table.empty();
    if (typeof currency === "string") {
        var favorites = window.localStorage.getItem(currency);
        if (favorites == null || favorites == "") {
            favorites = [];
        } else {
            favorites = JSON.parse(favorites);
            table = document.getElementById("tableOfCurrency");
            favorites.forEach(function (t) {
                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = currencies[t].flag;
                cell2.innerHTML = currencies[t].id;
                cell3.innerHTML = currencies[t].value;

            });
        }
    }
}

function getCurrencyValue() {
    const from = document.getElementById("currencyFrom").value,
        to = document.getElementById("currencyTo").value;
    $.ajax({
        dataTypes: "json",
        url: "https://api.exchangeratesapi.io/latest?base=" + from + "&symbols=" + to,
        method: 'GET',

        success: function (data) {
            console.log(data);
            // console.log(data.base + " 1 = " + to + " " + data.rates[to].fixed(2));
            calculateCurrency(data, to);
            $('#currencyConvert').text(data.base + " 1 = " + to + " " + (data.rates[to] + 0).toFixed(2));
        },
        error: function (err) {
            console.log('error:', err)
        }


    });
}

function calculateCurrency(data, currency) {
    const from = document.getElementById("fromCurrency").value,
        toCurrency = document.getElementById("toCurrency");
    toCurrency.value = (data.rates[currency] * from).toFixed(2);
}

