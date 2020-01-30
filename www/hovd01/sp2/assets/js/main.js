$(document).ready(function () {
    // <============= NEWS =============>
    $("#news").html("<h2>NEWS</h2>" + '<div class="line"></div>');

    $.ajax({
        url: 'https://api.rss2json.com/v1/api.json',
        method: 'GET',
        dataType: 'json',
        data: {
            rss_url: 'https://magic.wizards.com/en/rss/rss.xml',
            api_key: 'x0nihxvqhkynsfmnq5v6rk5m25rht1zachtm8swn',
            count: 3
        }
    }).done(function (response) {
        if (response.status != 'ok') { throw response.message; }

        console.log('====== ' + response.feed.title + ' ====== <successful>'); // info

        // 
        for (var i in response.items) {
            var item = response.items[i];
            $("#news").append("<article>" +
                "<h5>" + item.title + "</h5>" +
                "<h6>" + item.pubDate + " " + item.author + "</h6>" +
                setClassForImg(item.content) +
                "</article>" +
                '<hr>');
        }

        $("#news").append('More news at: <a href="https://magic.wizards.com/en/articles">magic.wizards.com</a>');

    });

    // adds class 'img-fluid' to images in content
    function setClassForImg(string) {
        var position = string.search(' src="https:');
        return string.substring(0, position) + ' class="img-fluid"' + string.substring(position);
    }

    // <============= DECK BUILDER =============>
    var deckList = [];

    var alreadyClicked = false;
    $('#search').on('click', function () {
        var titleCards = $("<h6/>")
            .text("Cards found: ");

        var lineSub = $("<div/>")
            .addClass("line-sub");

        $("#cards").html(titleCards);
        $("#cards").append(lineSub)

        if (alreadyClicked === false) {

            var divRow = $("<div/>")
                .addClass("row");

            var divCards = $("<div/>")
                .addClass("col-md-8 cards-found overflow-auto")
                .attr("id", "cards");

            var titleCards = $("<h6/>")
                .text("Cards found: ");

            var divDeck = $("<div/>")
                .addClass("col-md-4 cards-deck overflow-auto")
                .attr("id", "deck");

            var buttonSave = $("<button/>")
                .attr("type", "button")
                .addClass("btn btn-sm btn-secondary float-right save-button-style")
                .attr("id", "save")
                .text("Save");

            var titleDeck = $("<h6/>")
                .text("Your deck: ");

            var lineSub1 = $("<div/>")
                .addClass("line-sub");

            var lineSub2 = $("<div/>")
                .addClass("line-sub");

            divCards.append(titleCards, lineSub1);
            divDeck.append(buttonSave, titleDeck, lineSub2);
            divRow.append(divCards, divDeck);

            $("#db-content").append(divRow);

            alreadyClicked = true;

            /*$("#db-content").append(
                '<div class="row">' +
                '<div class="col-md-8 cards-found overflow-auto" id="cards">' +
                '<h6>Cards found: </h6>' +
                '<div class="line-sub"></div>' +
                '</div>' +
                '<div class="col-md-4" id="deck">' +
                '<button type="button" class="btn btn-sm btn-secondary float-right save-button-style" id="save">Save</button>' + '<h6>Your deck: </h6>' +
                '<div class="line-sub"></div>' +
                '</div>' +
                '</div>');*/
        }

        var url = 'https://api.scryfall.com/cards/search?q=';

        var name = "name%3A" + $('#input-name').val().trim() + "+";
        if (name !== "name%3A+") { url += name }

        var set = "e%3A" + $('#input-edition').val() + "+";
        if (set !== "e%3A0+") { url += set }

        var rarity = "r%3A" + ($("input[name='optionsRadios']:checked").val()) + "+";
        if (rarity !== "r%3Aundefined+") { url += rarity }

        var colour = "c%3A";
        $('input[name=checkbox-colour]').each(function () {
            if (this.checked) {
                colour += ($(this).val());
            }
        });
        colour += "+";
        if (colour !== "c%3A+") { url += colour }

        var type = "";
        $('input[name=checkbox-type]').each(function () {
            if (this.checked) {
                type += ($(this).val());
            }
        });
        if (typeof type !== "") { url += type }

        /*console.log(name);
        console.log(set);
        console.log(rarity);
        console.log(colour);
        console.log(type);
        console.log(url);*/

        $.getJSON(url, function (data) {
            console.log(data.data);
            for (var i in data.data) {
                var card = data.data[i];
                var divContainer = $("<div/>").addClass("container card-display");

                var imgCardImage = $("<img/>")
                    .attr("src", isImageAvailable(card.image_uris))
                    .addClass("img-fluid float-left card-image")
                    .attr("alt", "card");

                var buttonAddToDeck = $("<button/>")
                    .attr("type", "button")
                    .addClass("btn btn-sm btn-secondary float-right save-button-style btn-add-deck")
                    .attr("value", card.id)
                    .text("Add to deck")
                    .click(function () {
                        var buttonSave1 = $("<button/>")
                            .attr("type", "button")
                            .addClass("btn btn-sm btn-secondary float-right save-button-style")
                            .attr("id", "save")
                            .text("Save")
                            .click(function () {
                                var output = "";
                                for (var cardNumber in deckList) {
                                    output += deckList[cardNumber].numberOfCards + "x - " + deckList[cardNumber].name + "\n";
                                }
                                var blob = new Blob([output], { type: "text/plain;charset=utf-8" });
                                saveAs(blob, "my_card_deck_MTG.txt");
                            });

                        var titleDeck1 = $("<h6/>")
                            .text("Your deck: ");

                        var lineSub3 = $("<div/>")
                            .addClass("line-sub");

                        $("#deck").html(buttonSave1);
                        $("#deck").append(titleDeck1);
                        $("#deck").append(lineSub3);

                        for (var i in data.data) {
                            var card = data.data[i];
                            if (card.id === this.value) {
                                //console.log(card.id);              
                                oneCard = {
                                    "id": card.id,
                                    "name": card.name,
                                    "numberOfCards": 1
                                }

                                var isInDeck = false;

                                for (var i in deckList) {
                                    if (card.id === deckList[i].id) {
                                        deckList[i].numberOfCards++;
                                        isInDeck = true;
                                    }
                                }

                                if (isInDeck === false) {
                                    deckList.push(oneCard);
                                    isInDeck = false;
                                }

                            }
                        }

                        for (var crdNum in deckList) {
                            var singleCard = $("<div/>")
                                .attr("id", deckList[crdNum].id + "card");

                            var line1 = $("<hr>")
                                .attr("id", deckList[crdNum].id + "line");

                            //console.log(deckList[crdNum].name);
                            var cardName = $("<p/>")
                                .attr("id", deckList[crdNum].id + "name")
                                .text(deckList[crdNum].numberOfCards + "x - " + deckList[crdNum].name);

                            var removeButton = $("<button>")
                                .attr("type", "button")
                                .addClass("btn btn-sm btn-secondary float-right btn-remove-card")
                                .attr("value", deckList[crdNum].id)
                                .text("Remove")
                                .click(function () {
                                    for (var crd in deckList) {
                                        if (this.value === deckList[crd].id) {
                                            if (deckList[crd].numberOfCards === 1) {
                                                //console.log(deckList[crd].name);
                                                deckList.splice(crd, 1);
                                                $(this).parent().remove();
                                            }
                                            else {
                                                deckList[crd].numberOfCards--;

                                                var cardName2 = $("<p/>")
                                                    .attr("id", deckList[crd].id + "name")
                                                    .text(deckList[crd].numberOfCards + "x - " + deckList[crd].name);

                                                var line2 = $("<hr>")
                                                    .attr("id", deckList[crd].id + "line");

                                                $("#" + deckList[crd].id + "name").remove();
                                                $("#" + deckList[crd].id + "line").remove();
                                                $("#" + deckList[crd].id + "card").append(cardName2);
                                                $("#" + deckList[crd].id + "card").append(line2);
                                            }
                                        }
                                    }
                                });

                            $("#deck").remove(singleCard);
                            $(singleCard).append(removeButton, cardName, line1);

                            $("#deck").append(singleCard);
                        }
                    });

                var nameTitle = $("<h6/>")
                    .text("Name: ");

                var name = $("<p/>")
                    .text(card.name);

                var textTitle = $("<h6/>")
                    .text("Text: ");

                var text = $("<p/>")
                    .text(card.oracle_text);

                var clear = $("<div/>")
                    .addClass("clear");

                var line = $("<hr>");

                divContainer.append(imgCardImage, buttonAddToDeck, nameTitle, name, textTitle, text, clear);
                $("#cards").append(divContainer);
                $("#cards").append(line);

                /*$("#cards").append(
                    '<div class="container card-display">' +
                    '<img src="' + isImageAvailable(card.image_uris) + '" class="img-fluid float-left card-image" alt="card">' +
                    '<button type="button" class="btn btn-sm btn-secondary float-right save-button-style btn-add-deck" value="' + card.id + '">Add to deck</button>' +
                    '<h6>Name: ' + '</h6><p>' + card.name + "</p>" +
                    '<h6>Text: ' + '</h6><p>' + card.oracle_text + "</p>" +
                    '<div class="clear">' + '</div>' +
                    '</div>' +
                    '<hr>')*/
            }
        });
    });

    $(function () {
        $('[data-toggle="popover"]').popover()
    })

    function isImageAvailable(img) {
        if (typeof img === "undefined") {
            return "assets/img/cb.jpg";
        }
        else
            return img.small;
    }

    function addToDeck() {
        console.log("asfasfas");
    }

});