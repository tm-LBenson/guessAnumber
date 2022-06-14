'use strict';

let gamesPlayed = 0;
let secretNumber = randNum(gamesPlayed);

const lowerMessage = 'Lower!';
const higherMessage = 'Higher!';
const guessMessage = 'Start guessing...';
const gameOver = 'Game over!'
const playAgain = 'Play again?'
let gameOn = 1;
let score = 0;
let numberOfguess = 0;
let userGuess = '';
let remainingGuesses = 5;
let highScore = 0;
let errorMessage = `You need to input a number between 1 and ${20 + gamesPlayed}`;
const winMessage = `${userGuess} is correct!`;
function randNum(gamesPlayed){
    return Math.floor(Math.random()* 20 +1 + gamesPlayed );
}


document.querySelector('.again').addEventListener('click', ()=>{
    if (remainingGuesses){
    secretNumber = randNum(gamesPlayed);
    document.querySelector('.message').textContent = guessMessage;
    document.querySelector('.number').textContent = '?'
    document.querySelector('.remaining').textContent = remainingGuesses;
    document.querySelector('.total').textContent = (20 + gamesPlayed);
    gameOn = 1 
    numberOfguess = 0;
}});

document.querySelector('.reset').addEventListener('click', ()=>{
    score = 0;
    numberOfguess = 0
    remainingGuesses = 5
    secretNumber = randNum(gamesPlayed);
    document.querySelector('.message').textContent = guessMessage;
    document.querySelector('.remaining').textContent = remainingGuesses;
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?'
    document.querySelector('.total').textContent = (20);
    gameOn = 1 
    gamesPlayed = 0;
});

document.querySelector('.check').addEventListener('click', ()=>{
    userGuess = Number(document.querySelector('.guess').value)
    if(!userGuess || userGuess > 20 + gamesPlayed || userGuess < 1){
        document.querySelector('.message').textContent = errorMessage;
    }else if(!remainingGuesses){
        document.querySelector('.message').textContent = gameOver;
        document.querySelector('.reset').classList.remove('.hideMe')
    } else if(!gameOn){
        document.querySelector('.message').textContent = playAgain;
        
    }else if(userGuess === secretNumber){

        document.querySelector('.message').textContent = winMessage;
        document.querySelector('.number').textContent = secretNumber;
        gameOn = 0;
        gamesPlayed +=1;
        score += (100 - numberOfguess);
        remainingGuesses = 5;
        document.querySelector('.score').textContent = score;
        if(score > highScore){
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }


    } else if (userGuess < secretNumber){
        document.querySelector('.message').textContent = higherMessage;

        numberOfguess+= 10;
        remainingGuesses -=1;
        document.querySelector('.remaining').textContent = remainingGuesses;
        if(!remainingGuesses){
            document.querySelector('.message').textContent = gameOver;
            document.querySelector('.reset').classList.remove('.hideMe')
        }

    } else if (userGuess > secretNumber){
        document.querySelector('.message').textContent = lowerMessage;

        numberOfguess+= 10;
        remainingGuesses -=1;
        document.querySelector('.remaining').textContent = remainingGuesses;
        if(!remainingGuesses){
            document.querySelector('.message').textContent = gameOver;
            document.querySelector('.reset').classList.remove('.hideMe')
        }
    }
    

});

