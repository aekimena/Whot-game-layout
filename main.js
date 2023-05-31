let cards = [[1, 'ci'], [2, 'ci'], [3, 'ci'], [4, 'ci'], [5, 'ci'], 
[7, 'ci'], [8, 'ci'], [10, 'ci'], [11, 'ci'], [12, 'ci'], [13, 'ci'], 
[14, 'ci'], [1, 'tr'], [2, 'tr'], [3, 'tr'], [4, 'tr'], [5, 'tr'], 
[7, 'tr'], [8, 'tr'], [10, 'tr'], [11, 'tr'], [12, 'tr'], [13, 'tr'], 
[14, 'tr'], [1, 'cr'], [2, 'cr'], [3, 'cr'], [5, 'cr'], [7, 'cr'], 
[10, 'cr'], [11, 'cr'], [13, 'cr'], [14, 'cr'], [1, 'sq'], [2, 'sq'], 
[3, 'sq'], [5, 'sq'], [7, 'sq'], [10, 'sq'], [11, 'sq'], [13, 'sq'], 
[14, 'sq'], [1, 'st'], [2, 'st'], [3, 'st'], [4, 'st'], [5, 'st'], 
[7, 'st'], [8, 'st'], [20, 'ci'], [20, 'tr'], [20, 'cr'], [20, 'sq'], 
[20, 'st']];

let backupcards = [];
let computercards = [];
let playercards = [];
let showcard = [];
let trash = [];
let playertrash = [];
let playerturn;

function startgame() {
    shufflecards(cards)
    sharecards()
    ingame();
    market();
}
startgame();

function shufflecards(cards) {
    return cards.sort(() => Math.random() - 0.5);
}

function sharecards() {
    for (i of cards) {
        computercards.push(i);
        backupcards.push(i);
        cards.splice(cards.indexOf(i), 1)
        if (computercards.length == 10) {
            break;
        }
    }

    for (i of cards) {
        playercards.push(i);
        backupcards.push(i);
        cards.splice(cards.indexOf(i), 1)
        if (playercards.length == 10) {
            break;
        }
    }

    for (i of cards) {
        showcard.push(i);
        backupcards.push(i);
        cards.splice(cards.indexOf(i), 1)
        if (showcard.length == 1) {
            break;
        }
    }

    displaycards();
}

function displaycards() {
    // document.getElementById('computer-cards').innerHTML = `Computer cards: <br/> ${computercards}`
    document.getElementById('player-cards').innerHTML = `Your cards(${playercards.length}): ${playercards}`;
    document.getElementById('display-card').innerHTML = `CARD ON DISPLAY: (${showcard})`;
    document.getElementById('computer-cards-length').innerHTML = `Computer cards(${computercards.length})`;
}

function computer() {
    cardscheck();
    for (i of computercards){
        if (i[0] == showcard[0][0] || i[1] == showcard[0][1] && playerturn == false){
            document.getElementById('computer-input').innerHTML = `COMPUTER PLAYED: ${i}`;
            showcard.splice(0, showcard.length);
            showcard.push(i);
            backupcards.push(i);
            computercards.splice(computercards.indexOf(i), 1);
            displaycards();
            trash.splice(0, trash.length);
            playerturn = true;
            break;
        }else if(i[0] != showcard[0][0] && i[1] != showcard[0][1]) {
            trash.push('none');
            trashcheck();
        }
    }
    winnercheck();
}

function player() {
    cardscheck();
    document.getElementById('submit-btn').onclick = () => {
        let playerselection; 
        playerselection = document.getElementById('player-input').value;
        playerselection = String(playerselection);
        for (i of playercards) {
            if((i[0] == Number(playerselection[0]) && i[1] == playerselection.slice(1) || i[0] == Number(playerselection.slice(0, 2)) && i[1] == playerselection.slice(2)) && (i[0] == showcard[0][0] || i[1] == showcard[0][1])) {
                document.getElementById('player-input').value = "";
                showcard.splice(0, showcard.length);
                showcard.push(i);
                backupcards.push(i);
                playercards.splice(playercards.indexOf(i), 1);
                displaycards();
                playertrash.splice(0, playertrash.length);
                playerturn = false;
                computer();
                break;
            }else {
                playertrash.push('none');
                if (playertrash.length == playercards.length){
                    playertrash.splice(0, playertrash.length);
                    info("Wrong input or card doesn't exist!");
                    playerturn = true;
                }
            }
        }
        winnercheck();
    }
}

function ingame() {
    player();
}

function info(information){
    document.getElementById('player-input').value = "";
    document.getElementById('info').style = "display: block";
    document.getElementById('info').innerHTML = information;
    setTimeout(()=>{
        document.getElementById('info').style = "display: none"
    }, 1500)
}

function market(){
    document.getElementById('market-btn').onclick = () => {
        document.getElementById('player-input').value = "";
        playercards.push(cards[0]);
        backupcards.push(cards[0]);
        cards.splice(0, 1);
        info('you picked a card!')
        displaycards();
        playerturn = false;
        computer();
    }
}

function trashcheck(){
    if (trash.length == computercards.length){
        computercards.push(cards[0]);
        backupcards.push(cards[0]);
        cards.splice(0, 1);
        displaycards();
        document.getElementById('computer-input').innerHTML = `COMPUTER PICKED A CARD`;
        trash.splice(0, trash.length)
        playerturn = true;
    }
}

function cardscheck(){
    if(cards.length == 0){
        cards = cards.concat(backupcards);
    }
}

function winnercheck(){
    if (computercards.length == 0){
        document.getElementById('computer-input').innerHTML = "COMPUTER WON!";
        player = null;
    } else if (playercards.length == 0){
        document.getElementById('winner').innerHTML = "You won!";
        computer = null;
    }
}
