'use strict';

let gameOn = 1;
let score = 0;
let numberOfguess = 0;
let userGuess = '';
let remainingGuesses = 5;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
let gamesPlayed = 0;
let maxNumber = 20;
let secretNumber = randNum(maxNumber);

document.addEventListener('DOMContentLoaded', () => {
  textChanger(classObject.highscore, highScore);
});

const messageBoxText = {
  lower: 'Lower!',
  higher: 'Higher!',
  guess: `Guess a number between 1 and ${maxNumber}`,
  gameOver: 'Game Over!',
  playAgain: 'Play Again?',
  error: `You need to input a number within current 1 and ${maxNumber}`,
};
const classObject = {
  message: '.message',
  number: '.number',
  remaining: '.remaining',
  total: '.total',
  score: '.score',
  highscore: '.highscore',
  resetButton: '.reset',
  againButton: '.again',
  checkButton: '.check',
};

const textChanger = (className, messageOutput) => {
  document.querySelector(className).textContent = messageOutput;
};

const winMessage = `${userGuess} is correct!`;
function randNum(maxNumber) {
  return Math.floor(Math.random() * maxNumber + 1);
}

const errorGuess = (maxNumber) => {
  messageBoxText.error = `You need to input a number within current 1 and ${maxNumber}`;
  messageBoxText.guess = `Guess a number between 1 and ${maxNumber}`;
};

const displayButton = (btnName) => {
  document.querySelector(btnName).classList.remove('hideMe');
};
const hideButton = (btnName) => {
  document.querySelector(btnName).classList.add('hideMe');
};

const playAgainButton = () => {
  maxNumber = 20 + gamesPlayed;
  errorGuess(maxNumber);
  if (remainingGuesses) {
    secretNumber = randNum(maxNumber);
    textChanger(classObject.message, messageBoxText.guess);
    textChanger(classObject.number, '?');
    textChanger(classObject.remaining, remainingGuesses);
    textChanger(classObject.total, maxNumber);
    gameOn = 1;
    numberOfguess = 0;
    hideButton(classObject.againButton);
    displayButton(classObject.checkButton);
    document.querySelector('.guess').value = ' ';
  }
};

const resetButton = () => {
  score = 0;
  numberOfguess = 0;
  remainingGuesses = 5;
  gameOn = 1;
  gamesPlayed = 0;
  maxNumber = 20 + gamesPlayed;
  errorGuess(maxNumber);
  secretNumber = randNum(maxNumber);
  textChanger(classObject.message, messageBoxText.guess);
  textChanger(classObject.remaining, remainingGuesses);
  textChanger(classObject.score, score);
  textChanger(classObject.number, '?');
  textChanger(classObject.total, '20');
  hideButton(classObject.resetButton);
  document.querySelector('.guess').value = ' ';
  displayButton(classObject.checkButton);
};

const checkButton = () => {
  maxNumber = 20 + gamesPlayed;
  userGuess = Number(document.querySelector('.guess').value);
  if (!userGuess || userGuess > maxNumber || userGuess < 1) {
    textChanger(classObject.message, messageBoxText.error);
  } else if (!remainingGuesses) {
    textChanger(classObject.message, messageBoxText.gameOver);
    hideButton(classObject.checkButton);
    displayButton(classObject.resetButton);
  } else if (!gameOn) {
    textChanger(classObject.message, messageBoxText.playAgain);

    // This is the win condition
  } else if (userGuess === secretNumber) {
    textChanger(classObject.message, messageBoxText.winMessage);
    textChanger(classObject.number, secretNumber);
    gameOn = 0;
    gamesPlayed += 1;
    score += 100 - numberOfguess;
    remainingGuesses = 5;
    hideButton(classObject.checkButton);
    displayButton(classObject.againButton);

    textChanger(classObject.score, score);
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('highScore', highScore);
      textChanger(classObject.highscore, highScore);
    }
  } else {
    // Higher or Lower message and reduce by 1 guess
    if (userGuess < secretNumber) {
      textChanger(classObject.message, messageBoxText.higher);
    } else {
      textChanger(classObject.message, messageBoxText.lower);
    }
    numberOfguess += 10;
    remainingGuesses -= 1;
    textChanger(classObject.remaining, remainingGuesses);
    if (!remainingGuesses) {
      textChanger(classObject.message, messageBoxText.gameOver);
      hideButton(classObject.checkButton);
      displayButton(classObject.resetButton);
    }
  }
};
// Button Logic //
document.querySelector('.again').addEventListener('click', playAgainButton);

document.querySelector('.reset').addEventListener('click', resetButton);

document.querySelector('.check').addEventListener('click', checkButton);
