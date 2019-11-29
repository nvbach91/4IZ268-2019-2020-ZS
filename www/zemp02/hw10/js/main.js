/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */
var check = [];
var hider = [];
var points = 0;
var revealed = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createCard(city) {
    let card = document.createElement('div');
    card.classList.add('card')
    let text = document.createElement('h3');
    text.innerText = city;
    text.style.visibility="hidden";
    card.appendChild(text);
    card.addEventListener('click', async function () {
        if ((!card.classList.contains('revealed'))&&(check.length<2)) {
            card.classList.add('revealed');
            text.style.visibility = "visible";

            check.push(card);
            hider.push(text);

            if (check.length === 2) {
                if (check[0].innerText === check[1].innerText) {
                    points++;
                    check = [];
                    hider=[];
                    revealed++;
                } else {
                    points--;
                    await sleep(1000);
                    check[0].classList.remove('revealed');
                    hider[0].style.visibility = "hidden";
                    check[1].classList.remove('revealed');
                    hider[1].style.visibility = "hidden";
                    check = [];
                    hider=[];
                }

            }
            document.getElementById('points').innerText = points;
            if (revealed === 10) {
                if (!alert('You have finished the game with: ' + points + ' points')) { window.location.reload(); }
            }
        }
    });
    document.getElementById('game-field').appendChild(card);


}

var cities = ['Prague', 'Tokyo', 'London', 'Berlin',
    'Istanbul', 'Reykjavik', 'Oslo', 'New York',
    'Los Angeles', 'Las Vegas'
];
cities = cities.concat(cities);
cities.sort(() => {
    return 0.5 - Math.random();
});

cities.forEach(element => {
    createCard(element);
});