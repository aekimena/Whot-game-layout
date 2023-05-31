let cards = [[1, 'ci'], [2, 'ci'], [3, 'ci'], [4, 'ci'], [5, 'ci'], [7, 'ci'], [8, 'ci'], [10, 'ci'], [11, 'ci'], [12, 'ci'], [13, 'ci'], [14, 'ci'], [1, 'tr'], [2, 'tr'], [3, 'tr'], [4, 'tr'], [5, 'tr'], [7, 'tr'], [8, 'tr'], [10, 'tr'], [11, 'tr'], [12, 'tr'], [13, 'tr'], [14, 'tr'], [1, 'cr'], [2, 'cr'], [3, 'cr'], [5, 'cr'], [7, 'cr'], [10, 'cr'], [11, 'cr'], [13, 'cr'], [14, 'cr'], [1, 'sq'], [2, 'sq'], [3, 'sq'], [5, 'sq'], [7, 'sq'], [10, 'sq'], [11, 'sq'], [13, 'sq'], [14, 'sq'], [1, 'st'], [2, 'st'], [3, 'st'], [4, 'st'], [5, 'st'], [7, 'st'], [8, 'st'], [20, 'ci'], [20, 'tr'], [20, 'cr'], [20, 'sq'], [20, 'st']];


let computercards = [];
let domcomputercards = [];
let playercards = [];
let showcard = []

function startgame() {
    shufflecards(cards)
    sharecards()
    ingame();
}
startgame();

function shufflecards(cards) {
    return cards.sort(() => Math.random() - 0.5);
}

function sharecards() {
    for (i of cards) {
        computercards.push(i);
        cards.splice(cards.indexOf(i), 1)
        if (computercards.length == 10) {
            break;
        }
    }

    for (i of cards) {
        playercards.push(i);
        cards.splice(cards.indexOf(i), 1)
        if (playercards.length == 10) {
            break;
        }
    }

    displaycards();
}

function displaycards() {
    document.getElementById('computer-cards').innerHTML = `Computer cards: <br/> ${computercards}`

    document.getElementById('player-cards').innerHTML = `Your cards: <br/> ${playercards}`
}

function computer() {
    document.getElementById('computer-cards-length').innerHTML = `Number of computer cards: ${computercards.length}`
}

function player() {
    document.getElementById('submit-btn').onclick = () => {
        let playerselection; 
        playerselection = document.getElementById('player-input').value;
        playerselection = String(playerselection);
        for (i of playercards) {
            if(i[0] == Number(playerselection[0]) && i[1] == playerselection.slice(1) || i[0] == Number(playerselection.slice(0, 2)) && i[1] == playerselection.slice(2)) {
                document.getElementById('player-input').value = "";
                console.log(i);
                showcard.push(i);
                playercards.splice(playercards.indexOf(i), 1);
                displaycards()
                console.log(playercards.length)
                break;
            } else{
                console.log('no');
            }
        }
    }
}

function ingame() {
    computer();
    player();
}

