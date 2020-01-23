
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
                    main.renderSelect("currencyTo", 1);
                    main.renderSelect("favoriteCurrencyAdd", 1);
                    main.renderSelect("favoriteCurrency");
                    main.updateFavorite();
                    main.setUpFlags();
                    main.fromCurrency.val(1)
                    main.getCurrencyValue()
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
        this.topCurrencies = ["EUR", "CZK", "USD"] // muj top vyber $('#favoriteCurrency')
        this.favoriteCurrencyAdd = $('#favoriteCurrencyAdd')
        this.favoriteCurrency = $('#favoriteCurrency')
        this.tableOfCurrency = $('#tableOfCurrency')
        this.toCurrency = $("#toCurrency")
        this.fromCurrency = $("#fromCurrency")
        this.currencyTo = $("#currencyTo")
        this.currencyFrom = $("#currencyFrom")
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
        $.get(`https://api.exchangeratesapi.io/latest?base=${this.favoriteCurrency.val()}`)
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
        const currency = this.favoriteCurrencyAdd.val();
        const actualCurrency = this.favoriteCurrency.val();
        var array = localStorage.getItem(actualCurrency);
        if (!array) {
            array = [];
        } else {
            array = JSON.parse(array);
        }
        if (!array.some((x) => x == currency)) {
            array.push(currency);
        }
        array = array.sort()
        localStorage.setItem(actualCurrency, JSON.stringify(array));
        this.renderFavorite();
    }

    renderSelect = (id, selectedItem = 0) => {
        const select = $(`#${id}`);
        select.empty();
        let currency = [];
        this.currencies.forEach((c, index) => {
            currency.push($(`<option ${selectedItem == index ? "selected" : ""}></option>`).text(c.currencyName).val(c.key));
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
            this.favoriteCurrency.attr("disabled", false);
        });
    }

    renderFavorite = () => {
        const currency = this.favoriteCurrency.val();
        this.tableOfCurrency.empty();
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
                    this.tableOfCurrency.append(row)
                });
            }
        }
    }

    getCurrencyValue = () => {
        const from = this.currencyFrom.val(),
            to = this.currencyTo.val();
        $.get(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`)
            .then((data) => {
                this.calculateCurrency(data, to);
                $('#currencyConvert').text(" 1 " + data.base + " = ");
                $('#currencyConvertTo').text(" " + (data.rates[to] + 0).toFixed(2) + " " + to);
            })
    }

    calculateCurrency = (data, currency) => {
        let from = this.fromCurrency.val();
        if (from < 0) {
            this.fromCurrency.val(1)
            from = 1
        }
        this.toCurrency.val((data.rates[currency] * from).toFixed(2));
    }

}

