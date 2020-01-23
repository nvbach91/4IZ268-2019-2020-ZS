
$(document).ready(() => {
    const main = new Main() //vytvoreni objektu
    $.get("https://free.currconv.com/api/v7/currencies?apiKey=a59d58073ff704d66793") // ziskani dat bez hodnoty - nazvy,mesta
        .then((data) => {
            Object.keys(data.results).forEach((key) => main.currencies.push({ ...data.results[key], key })) ///prevedu objekt na pole
            $.get("https://api.exchangeratesapi.io/latest") // ziskani men s kurzem
                .then((data) => {
                    const keys = Object.keys(data.rates)
                    keys.push("EUR") //pridani eura v seznamu totiz neni
                    main.currencies = main.currencies.filter((c) => keys.some((r) => r == c.key)).sort(main.sortByName) //filtrace men ke kterym mame data a serazeni podle abecedy
                    main.renderSelect("currencyFrom");
                    main.renderSelect("currencyTo");
                    main.renderSelect("favoriteCurrencyAdd");
                    main.renderSelect("favoriteCurrency");
                    main.updateFavorite();
                    main.setUpFlags();
                })
        });
    $('#fromCurrency').bind('keyup mouseup', main.getCurrencyValue);
    $('select.convertor-select').change(main.getCurrencyValue);
    $('#addFavorite').click(main.addFavorite);
    $('#favoriteCurrency').change(main.changeFavorite);
    $('#updateFavorite').click(main.updateFavorite);
});

class Main {

    constructor() {
        this.currencies = [];
        this.intervalFavorite;
        this.topCurrencies = ["EUR", "CZK", "USD"] // muj top vyber
    }

    sortByName = (first, second) => { //funkce pro serazeni
        if (this.topCurrencies.includes(first.key)) {
            if (this.topCurrencies.includes(second.key)) {
                return first.currencyName.localeCompare(second.currencyName)
            }
            return -1
        }
        return this.topCurrencies.includes(second.key) ? 1 : first.currencyName.localeCompare(second.currencyName)
    }

    findCurrencyByKey = (key) => {
        const currency = this.currencies.filter((c) => c.key == key)
        return currency.length == 0 ? {} : currency[0] // kontrola pole
    }

    changeFavorite = () => {
        clearInterval(this.intervalFavorite);
        this.intervalFavorite = setInterval(this.updateFavorite, 20000);
        this.updateFavorite();
    }

    updateFavorite = () => {
        $.get(`https://api.exchangeratesapi.io/latest?base=${$('#favoriteCurrency').val()}`)
            .then((data) => {
                this.changeValues(data.rates);
                this.renderFavorite();
            });
    }

    changeValues = (data) => {
        $.each(data, (key, value) => {
            this.findCurrencyByKey(key).value = value;
        });
    }

    addFavorite = () => {
        const currency = $('#favoriteCurrencyAdd').val();
        const actualCurrency = $('#favoriteCurrency').val();
        var array = localStorage.getItem(actualCurrency);
        if (!array) {
            array = [];
        } else {
            array = JSON.parse(array);
        }
        if (!array.some((x) => x == currency)) {
            array.push(currency);
        }
        array = array.sort(this.sortByName)
        localStorage.setItem(actualCurrency, JSON.stringify(array));
        this.renderFavorite();
    }

    renderSelect = (id) => {
        const select = $(`#${id}`);
        select.empty();
        let currency = [];
        this.currencies.forEach((c) => {
            currency.push($('<option></option>').text(c.currencyName).val(c.key));
        });
        select.append(currency);
    }

    setUpFlags = () => {
        const array = [];
        this.currencies.forEach((value) => array.push($.get(`https://restcountries.eu/rest/v2/currency/${value.key}`)
            .then((data) => {
                if (data.length > 0) {
                    value.flag = "<img height='16' src='" + data[0].flag + "' />";
                } else {
                    value.flag = "";
                }
            })
        ));
        Promise.all(array).then(() => {
            this.renderFavorite();
            $('#favoriteCurrency').attr("disabled", false);
        });
    }

    renderFavorite = () => {
        const currency = $('#favoriteCurrency').val();
        const table = $("#tableOfCurrency");
        table.empty();
        if (typeof currency === "string") {
            let favorites = localStorage.getItem(currency);
            if (favorites == null || favorites == "") {
                favorites = [];
            } else {
                favorites = JSON.parse(favorites);
                favorites.forEach((t) => {
                    const row = $("<tr></tr>");
                    const c = this.findCurrencyByKey(t)
                    row.append($(`<td>${c.flag}</td>`))
                    row.append($(`<td>${c.id}</td>`))
                    row.append($(`<td>${c.value}</td>`))
                    table.append(row)
                });
            }
        }
    }

    getCurrencyValue = () => {
        const from = document.getElementById("currencyFrom").value,
            to = document.getElementById("currencyTo").value;
        $.get(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`)
            .then((data) => {
                this.calculateCurrency(data, to);
                $('#currencyConvert').text(" 1 " + data.base + " = ");
                $('#currencyConvertTo').text(" " + (data.rates[to] + 0).toFixed(2) + " " + to);

            })
    }

    calculateCurrency = (data, currency) => {
        const from = $("#fromCurrency").val(),
            toCurrency = $("#toCurrency");
        toCurrency.val((data.rates[currency] * from).toFixed(2));
    }

}

