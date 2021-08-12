'use script';
//current score under player1 even after n turns 
const score_1 = document.querySelector("#score--1");
const score_0 = document.getElementById("score--0");

//state of game 
let bool_game = true;
let scores;
let curr_score;
let activePlayer = 0;

//the dice element
const dice = document.querySelector(".dice");

//who is the active player now? -- to get that
const currPlayerScore_1 = document.getElementById("current--0");
const currPlayerScore_2 = document.getElementById("current--1");

//score till he rolls 1 
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const init = function() {
    //setting them to 0 at first 

    //scores of players

    score_1.textContent = 0;
    score_0.textContent = 0;



    //current scores 
    currPlayerScore_1.textContent = 0;
    currPlayerScore_2.textContent = 0;

    //hiding the dice
    dice.classList.add('hidden');

    //removing winner class
    player1.classList.remove('player--winner')
    player0.classList.remove('player--winner')

    player0.classList.add('player--active')
    player1.classList.remove('player--active')

    curr_score = 0;
    scores = [0, 0];
    bool_game = true;

};

init();



const btn_newGame = document.querySelector(".btn--new");
const btn_roll = document.querySelector(".btn--roll");
const btn_hold = document.querySelector(".btn--hold");


const switchPlayer = function(dice_player) {
    curr_score = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');

}


//generate random dice roll 
btn_roll.addEventListener("click", function() {
    if (bool_game) {
        //generating random dice number
        const dice_number = Math.trunc(Math.random(1) * 6) + 1;

        //unhiding the image 
        dice.classList.remove('hidden');
        dice.src = `assets/dice-${dice_number}.png`;

        //adding scores 
        if (dice_number == 1) {
            switchPlayer();
            curr_score += dice_number;
            document.getElementById(`current--${activePlayer}`).textContent = curr_score;
        } else {
            curr_score += dice_number;
            document.getElementById(`current--${activePlayer}`).textContent = curr_score;
        }
    }

});

btn_hold.addEventListener('click', function() {
    if (bool_game) {
        // to hold the current score and add to active player score 
        console.log(scores[activePlayer]);
        scores[activePlayer] += curr_score;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // check if score is 100
        console.log(scores[activePlayer]);
        if (scores[activePlayer] >= 100) {
            bool_game = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector('.dice').classList.add('hidden');
            curr_score = 0;

        } else
            switchPlayer();

        //switch to next player 
    }
});

btn_newGame.addEventListener('click', init);