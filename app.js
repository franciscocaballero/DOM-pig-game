/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let scores, roundScore, activePlayer, gamePlaying;

let previousRoll;


let winningScore;

init()
// scores = [0,0];
// roundScore = 0;
// activePlayer = 1;


// Get integer, Get random number 0 - 6 , get number 1-  6

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// getter ^ 

// let x = document.querySelector('#score-0').textContent;
// console.log(x);
//setter ^

document.querySelector('.dice').style.display = 'none';

// document.getElementById('score-0').textContent = '0';
// document.getElementById('score-1').textContent = '0';
// document.getElementById('current-0').textContent = '0';
// document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {

        // 1. Randoom Number 
        let dice = Math.floor(Math.random() * 6) + 1;
        //2 Display the Result 
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        // console.log(scores[activePlayer]);
        // console.log(roundScore);

        //img src

        if(dice === 6 && previousRoll === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();

        }else if (dice !== 1) {
            //3 Update the round score IF the rolled number was NOt a 1
            //Add score 
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            // roundScore = roundScore + dice;
        }else {
            // Next player
            nextPlayer();
        }
        previousRoll = dice;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add Current score to global score 
        scores[activePlayer] += roundScore;
        // scores[activePlayer] = scores[activePlayer] + roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            //removes active player class
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();

        }

    }
});

function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = "player 1";
    document.getElementById('name-1').textContent = "player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-1-panel').classList.add('active');


}

// let input = document.getElementById("#userinput");
// console.log(input);

function clicked() {
    var input_value = document.getElementById('data').value;
    winningScore = document.getElementById('display').innerHTML = input_value;
}

document.getElementById('btn').addEventListener('click', clicked);;
