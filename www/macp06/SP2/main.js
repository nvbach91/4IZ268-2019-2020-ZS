
$(document).ready(() => {
    const main = new Main() //vytvoreni objektu
    $.get("https://free.currconv.com/api/v7/currencies?apiKey=a59d58073ff704d66793") // ziskani dat bez hodnoty - nazvy,mesta
        .then((data) => {
            Object.keys(data.results).forEach((key) => main.currencies.push({ ...data.results[key], key })) ///prevedu objekt na pole
            $.get("https://api.exchangeratesapi.io/latest") // ziskani men s kurzem
                .then((data) => {
                    const keys = Object.keys(data.rates)
                    keys.push("EUR") //pridani noveho prvku 
                    main.currencies = main.currencies.filter((c) => keys.some((r) => r === c.key)).sort(main.sortByName) //filtrace men ke kterym mame data a serazeni podle abecedy
                    main.renderSelect("currencyFrom", localStorage.getItem("currencyFrom"));
                    main.renderSelect("currencyTo", localStorage.getItem("currencyTo"));
                    main.renderSelect("favoriteCurrencyAdd", 1);
                    main.renderSelect("favoriteCurrency");
                    main.updateFavorite();
                    main.setUpFlags(); // nastavení obr. vlajky
                    main.fromCurrency.val(1) // nastaveni vstupu
                    main.getCurrencyValue()
                    main.getCurrencyValue()
                })
        }); 
        
        // pridani EventHandler
    $('#fromCurrency').bind('keydown', main.getCurrencyValue);
    $('select.convertor-select').change(main.getCurrencyValue);
    $('#addFavorite').click(main.addFavorite);
    $('#favoriteCurrency').change(main.changeFavorite);
    $('#updateFavorite').click(main.updateFavorite);
});

class Main { 

    constructor() {
        this.currencyFromLS = localStorage.getItem("currencyFrom") //update zustat selecty
        this.currencyToLS = localStorage.getItem("currencyTo")
        if (this.currencyFromLS === null || this.currencyFromLS === "") { //localStorage pro currencyFrom
            localStorage.setItem ("currencyFrom", "0")
            this.currencyFromLS = 0
        }

        if (this.currencyToLS === null || this.currencyFromLS === "") {
            localStorage.setItem ("currencyTo", "1") //localStorage pro currencyTo
            this.currencyToLS = 1
        }

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

    findCurrencyByKey = (key) => { //vyhledani meny podle klice (eur,usd)
        const currency = this.currencies.filter((c) => c.key == key) // vraci kopii pole podle funkce
        return currency.length === 0 ? {} : currency[0] // kontrola pole
    }

    changeFavorite = () => { //interval pro ziskani aktualnich kurzu po 20 sekundach

       // clearInterval(this.intervalFavorite);
       // this.intervalFavorite = setInterval(this.updateFavorite, 20000);
        this.updateFavorite();
    }

    updateFavorite = () => { //provolani api, ziskani kurzu
        $.get(`https://api.exchangeratesapi.io/latest?base=${this.favoriteCurrency.val()}`)
            .then((data) => {
                this.changeValues(data.rates); //zmena dat
                this.renderFavorite(); // vykresleni dat
            });
    }

    changeValues = (data) => { //funkce na zmenu dat
        $.each(data, (key, value) => {
            this.findCurrencyByKey(key).value = value;
        });
    }

    addFavorite = () => {                   
        const currency = this.favoriteCurrencyAdd.val();
        const actualCurrency = this.favoriteCurrency.val();
        var array = localStorage.getItem(actualCurrency); // zalozeni string
        if (!array) { // existuje to?
            array = [];
        } else {
            array = JSON.parse(array); //vytvoreni array ze stringu
        }
        if (!array.some((x) => x === currency)) { // zabranuje duplicite
            array.push(currency);
        }
        array = array.sort() //serazeni tabulky oblibenych
        localStorage.setItem(actualCurrency, JSON.stringify(array)); //prepsani pole do stringu a ulozeni do localStorage
        this.renderFavorite();
    }

    renderSelect = (id, selectedItem = 0) => { //vykresleni do selectu prijem id a zvoleny sectedItem
        const select = $(`#${id}`);
        select.empty();
        let currency = [];
        this.currencies.forEach((c, index) => {
            currency.push($(`<option ${selectedItem === c.key ? "selected" : ""}></option>`).text(c.currencyName).val(c.key));
        });
        select.append(currency);
    }

    setUpFlags = () => {
        const array = [];
        this.currencies.forEach((value) => array.push($.get(`https://restcountries.eu/rest/v2/currency/${value.key}`) //pro kazdou menu prijimam vlajku
            .then((data) => {
                if (data.length > 0) {
                    value.flag = "<img height='16' src='" + data[0].flag + "' />";
                } else {
                    value.flag = "";
                }
            })
        ));
        Promise.all(array).then(() => { //zarizuje ze vykresleni vlajek bude az po tom co kazda mena ma vlajku
            this.renderFavorite();
            this.favoriteCurrency.attr("disabled", false); 
        });
    }

 // pro odstranění favorite meny z localStorage
    removeFavorite = (e) => {
        const key = $(e.currentTarget).data("key")
        let favorites = localStorage.getItem(this.favoriteCurrency.val());
        if (favorites === null || favorites === "") {
            favorites = [];
        }
        favorites = JSON.parse(favorites);
        favorites = favorites.filter((obj) => obj !== key)
        localStorage.setItem(this.favoriteCurrency.val(), JSON.stringify(favorites));
        this.renderFavorite()
    }
    renderFavorite = () => { //vykresli tabulku oblibenych
        const currency = this.favoriteCurrency.val();
        this.tableOfCurrency.empty(); //vyprazdeni tabulky
        if (typeof currency === "string") {
            let favorites = localStorage.getItem(currency);
            if (favorites === null || favorites === "") {
                favorites = [];
            } else {
                favorites = JSON.parse(favorites);
                favorites.forEach((t) => {
                    const row = $("<tr></tr>"); //vytvoreni radku
                    const c = this.findCurrencyByKey(t)
                    row.append($(`<td>${c.flag}</td>`))
                    row.append($(`<td>${c.id}</td>`))
                    row.append($(`<td>${c.value}</td>`))
                    const removeButton = $(`<td><a href="javascript:void(0)" data-key="${c.key}"><img src="cross.png" height="16" /></a></td>`)
                    row.append(removeButton)
                    this.tableOfCurrency.append(row)
                    removeButton.children("a").click(this.removeFavorite) 
                });
            }
        }
    }

    // omezeni vstupu ("e")
    getCurrencyValue = (e) => { //pri zmene
        const from = this.currencyFrom.val(),
            to = this.currencyTo.val();
        if (typeof e === "object" && e.keyCode === 69) { //ASCI
                e.preventDefault() //zrusi udalost 
                return false; 
            }   
      if (this.currencyToLS !=to) {
          localStorage.setItem("currencyTo", to)
          this.currencyToLS = to
      }

      if (this.currencyFromLS !=from) {
          localStorage.setItem("currencyFrom", from)
          this.currencyFromLS = from
      }

        $.get(`https://api.exchangeratesapi.io/latest?base=${from}&symbols=${to}`)
            .then((data) => {
                this.calculateCurrency(data, to);
                $('#currencyConvert').text(" 1 " + data.base + " = ");
                $('#currencyConvertTo').text(" " + (data.rates[to] + 0).toFixed(2) + " " + to);
            })
    }

    calculateCurrency = (data, currency) => { //vypocet 
        let from = this.fromCurrency.val();
        if (from < 0) {
            this.fromCurrency.val(1)
            from = 1
        }
        this.toCurrency.val((data.rates[currency] * from).toFixed(2));
    }

}

