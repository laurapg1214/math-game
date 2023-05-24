// DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  // ORDER: setup, start game, play game in-game, end game
  // VARIABLE & OBJECT STRUCTURING, INITIAL WINDOW STATE

  // grab elements
  const correctScore = document.querySelector('#correct');
  const gameArea = document.querySelector('#game-area');
  const highScore = document.querySelector('#highScore');
  const incorrectScore = document.querySelector('#incorrect');
  const instructions = document.querySelector('#instructions');
  const input = document.querySelector('#answerText');
  const question = document.querySelector('#question');
  const round = document.querySelector('#round');
  const scorecard = document.querySelector('#scorecard');
  const submitButton = document.querySelector('#submit');
  const time = document.querySelector('#time');
  
  // declare countdown var & game started bool
  var startCountdown;
  var gameStarted = false;

  // 2 OBJECTS
  // math object (to store math problem & answer variables)
  math = {};

  // nums object (to store counters, time etc) with initial round value
  nums = {
    highScore: 0,
    maxNum: 0,
    round: 0,
  };

  // RESETS
  // reset function for relevant nums object properties & innerHTML
  resetNums = () => {
    // reset values
    nums.correctScore = 0;
    nums.incorrectScore = 0;
    nums.round++;
    nums.time = 10;
    console.log(nums);

    // update innerHTML for scorecard
    correctScore.innerHTML = '|| Correct: ' + nums.correctScore;
    highScore.innerHTML = '|| High score: ' + nums.highScore;
    incorrectScore.innerHTML = '|| Incorrect: ' + nums.incorrectScore;
    round.innerHTML = '|| Round: ' + nums.round;
    time.innerHTML = nums.time + 's';
  }

  resetStyles = () => {
    // form focus
    focusForm();

    // disable question button
    question.disabled = true;

    // enable & darken submit button
    submitButton.disabled = false;
    submitButton.style.backgroundColor = '#4682B4';
    submitButton.style.color = 'white';
    submitButton.style.fontWeight = 'bold';
    submitButton.innerHTML = 'Submit';

    // enable input field & change bg and text color
    input.disabled = false;
    input.style.backgroundColor = 'white';
    input.style.color = '#23395d';

    // update stylings for scores
    correctScore.style.color = '#152238';
    incorrectScore.style.color = '#152238';

    // update styling for time
    time.style.color = 'black';
  }

  // reset user input function
  resetInput = () => {
    input.value = '';
    input.placeholder = 'Type your answer here';
  }

  // MATH PROBLEM FUNCTIONALITY
  // randomly generate variables
  generateX = () => {
    let x = Math.floor((Math.random() * nums.maxNum) + 1);
    return x;
  }

  generateY = (x, z, badY) => {
    let y = Math.floor((Math.random() * nums.maxNum) + 1);

    // check for positive whole integers
    if ((z === '-' && y >= x) || (z === '/' && (x % y != 0))) {
      let badY = y;
      y = generateY(x, z, badY);
    }
    return y;
  }

  // randomly select math operator from array
  generateZ = () => {
    var operators = ['+', '-', '*', '/'];
    let z = operators[Math.floor(Math.random()*operators.length)];
    return z;
  }

  // generate question variables and answer
  calculate = (x, z, y) => {
    switch (z) {
      case '+':
        return x + y;
      case '-':
        return x - y;
      case '*':
        return x * y;
      default:
        return x / y;
    }
    return (x + y);
  }

  // getMath function 
  getMath = () => {
    let x = generateX();
    let z = generateZ();
    // check for possibility of positive whole integer results
    if ((x === 1 && z === '-') || (x % 2 !== 0 && z === '/')) {
      x++;
    }
    let y =  generateY(x, z);
    let answer = calculate(x, z, y);
    // return values
    return {x, y, z, answer};
  }

  // BUTTON FUNCTIONALITIES
  // submit button functionality
  submitButton.onclick = () => {
    // if click coming at start during maxNumPrompt
    if (nums.maxNum === 0) {
      // run function to assign maxNum
      maxNumAssign();
    } else {
      // run function to assign response
      responseAssign();
    }
  } 

  // question button functionality
  question.onclick = () => {
    // check for beginning or new round
    if (gameStarted === false) {
      startGame();
    } else {
      playGame();
    }
  }

  // event listener for enter key (submit)
  input.addEventListener('keypress', function(event) {  
    if (event.key === 'Enter') {
      event.preventDefault();
      // trigger submit button element with click
      submitButton.click();
    }
  });
  
  // focus on input function
  focusForm = () => {
    input.autocomplete = 'off';
    input.focus();
  }

  // focus question button at start
  question.focus();

  /////////////////////////////////////////////////

  // START GAME
  startGame = () => {
    instructions.style.display = 'none';
    gameArea.style.display = 'block';
    scorecard.style.display = 'none';

    // reset relevant nums properties & innerHTML
    resetNums();

    // reset stylings
    resetStyles();

    // run maxNum input grab function
    maxNumPrompt();
  }

  // max number prompt function
  maxNumPrompt = () => {
    question.innerHTML = 'What maximum number do you want to use for your math problems?';
    input.value = '';
    input.placeholder = 'Enter number here';
  }

  // max number assign function
  maxNumAssign = () => {
    let n = Number(input.value);
    //reset input field
    input.value = '';
    // check for valid input
    if (isNaN(n) || n <= 0 || n > 100) {
      if (isNaN(n)) {
        alert('Please enter a number');
      } else if (n <= 0) {
        alert('Please enter a positive number') 
      } else {
        alert('Maximum number is 100');
      }
      // rerun function
      maxNumPrompt();
    } else {
      // assign to maxNum
      nums.maxNum = n;
      // start game 
      playGame();
    }
  }

  // play game function
  playGame = () => {
    // check for first round 
    if (gameStarted === true) {
      // reset relevant nums properties & innerHTML
      resetNums();
      // reset stylings
      resetStyles();
    }

    // reset input field w placeholder
    resetInput();
    // show scorecard 
    scorecard.style.display = 'block';
    // start clock sound
    clockSound.play();
    // start countdown
    startCountdown = setInterval(countdown, 1000);
    // run math problem function
    mathProblem();
  }

  //////////////////////////////////////////////////////////

  // IN-GAME FUNCTIONS
  // countdown function
  countdown = () => {
    if (nums.time > 1) {
      nums.time--;
      time.innerHTML = nums.time + 's';
    } else {
      endGame();
    }
  }

  // math problem function
  mathProblem = () => {
    // focus form, autocomplete off
    focusForm();

    // generate math problem, assign to object
    math = getMath();
    console.log(math);

    // update page elements
    question.innerHTML = math.x + ' ' + math.z + ' ' + math.y;
    question.style.fontStyle = 'normal';
    input.style.backgroundColor = 'white';
    input.value = '';

    return;
  }

  // response assign function
  responseAssign = () => {
    // grab input, convert to number
    const response = Number(input.value);
    
    // check for string 
    if (isNaN(response) || response == '') {
      resetInput();
      return;
    }
    // assign to math object
    math.response = response;
    console.log(math);
  
    // check answer
    checkAnswer();
  }

  // check answer function
  checkAnswer = () => {
    if (math.answer === math.response) {
      correct();
    } else {
      incorrect();
    }
  }

  // correct response function
  correct = () => {
    // play correct chime
    chimeCorrect.play();

    // update correct score, change color
    if (nums.correctScore == 0) {
      correctScore.style.color = '#006400';
    }
    nums.correctScore++;
    correctScore.innerHTML = '|| Correct: ' + nums.correctScore;

    // update timer
    nums.time++;
    time.innerHTML = nums.time + 's';

    // new question
    mathProblem();
  }

  // incorrect response function
  incorrect = () => {
    // play incorrect chime
    chimeIncorrect.play();

    // update incorrect score, change color
    if (nums.incorrectScore == 0) {
      incorrectScore.style.color = '#B90E0A';
    }
    nums.incorrectScore++;
    incorrectScore.innerHTML = '|| Incorrect: ' + nums.incorrectScore;

    // new question
    mathProblem();
  }

  //////////////////////////////////////////////////

  // END GAME function
  endGame = () => {
    // update game started for replay
    if (gameStarted === false) {
      gameStarted = true;
    }

    // stop countdown
    clearInterval(startCountdown);

    // pause clock sound, play buzzer
    clockSound.pause();
    buzzer.play();

    // change time to 0
    time.innerHTML = '0s';
    time.style.color = '#B90E0A';

    // update high score
    if (nums.highScore < nums.correctScore) {
      nums.highScore = nums.correctScore;
      highScore.innerHTML = '|| High score: ' + nums.highScore;
    }

    // display game over
    submitButton.innerHTML = 'Score: ' + nums.correctScore;
    submitButton.style.backgroundColor = '#006400';

    // disable submit button and input field
    submitButton.disabled = true;
    input.disabled = true;
    
    // update start game button, give focus
    question.innerHTML = 'New game';
    question.disabled = false;
    question.focus();

    // update input field, focus form
    input.value = 'Game over!';
    input.style.color = 'white';
    input.style.fontWeight = 'bold';
    input.style.backgroundColor = '#006400';
  }
});