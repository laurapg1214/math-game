// DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  // ORDER: setup, start game, play game in-game, end game
  // VARIABLE & OBJECT STRUCTURING, INITIAL WINDOW STATE
  // breakdown: 2 objects:
  // math (to store math problem & answer variables)
  math = {};
  // nums (to store counters, time etc)
  nums = {
    // initialize time & counters
    time: 10,
    correctCount: 0,
    incorrectCount: 0,
    
    // initialize max number, high score, round
    maxNum: 0,
    highScore: 0,
    round: 1
  };
  console.log(nums);

  // grab elements
  const question = document.querySelector('#question');
  const input = document.querySelector('#answerText');
  const submitButton = document.querySelector('#submit');
  const seconds = document.querySelector('#seconds');
  const correctScore = document.querySelector('#correct');
  const incorrectScore = document.querySelector('#incorrect');
  const instructions = document.querySelector('#instructions');
  const gameArea = document.querySelector('#game-area');
  const scorecard = document.querySelector('#scorecard');
  const round = document.querySelector('#round');
  const highScore = document.querySelector('#highScore');

  // declare countdown var
  var startCountdown;

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
      console.log('bad y');
      let badY = y;
      y = generateY(x, z, badY);
    }
    return y;
  }

  // randomly select math operator from array (ro for random operator)
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
    let x = 5;
    let z = '/';

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
    if (nums.maxNum === 0) {
      let n = Number(input.value);
      //reset input field
      input.value = '';
      if (isNaN(n) || n <= 0) {
        // rerun function
        maxNumPrompt();
      } else {
        // assign to maxNum
        nums.maxNum = n;
        // start game 
        playGame();
      }
    } else {
      // grab input, convert to number
      const response = Number(input.value);
        
      // assign to math object
      math.response = response;
      console.log(math);
    
      // check answer
      checkAnswer();
    }
  } 

  // question button functionality
  question.onclick = () => {
    // check for beginning or new round
    if (gameArea.style.display != 'block') {
      startGame();
    } else {
      maxNumPrompt();
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
  
  // focus functions
  focusForm = () => {
    input.autocomplete = 'off';
    input.focus();
  }

  focusButton = () => {
    question.focus();
  }

  /////////////////////////////////////////////////

  // START GAME
  startGame = () => {
    instructions.style.display = 'none';
    gameArea.style.display = 'block';
    scorecard.style.display = 'none';

    // reset maxNum & score counters
    nums.maxNum = 0;
    nums.correctCount = 0;
    correctScore.innerHTML = '|| Correct: ' + nums.correctCount;
    correctScore.style.color = '#152238';
    nums.incorrectCount = 0;
    incorrectScore.innerHTML = '|| Incorrect: ' + nums.incorrectCount;
    incorrectScore.style.color = '#152238';

    // disable question button
    question.disabled = true;

    // enable & darken submit button
    submitButton.disabled = false;
    submitButton.style.backgroundColor = '#4682B4';
    submitButton.style.color = 'white';
    submitButton.style.fontWeight = 'bold';
    submitButton.innerHTML = 'Submit';

    // enable input field 
    input.disabled = false;

    // update round innerHTML
    round.innerHTML = '|| Round: ' + nums.round;

    // run maxNum input grab function
    maxNumPrompt();
  }

  // TODO: define max number prompt function
  maxNumPrompt = () => {
    focusForm();
    question.innerHTML = 'What maximum number do you want to use for your math problems?';
    input.value = '';
    input.placeholder = 'Enter number here';
    input.style.backgroundColor = 'white';
    
    // see submit button functionality above
  }

  // play game function
  playGame = () => {
    // reset input field w placeholder
    input.value = '';
    input.placeholder = 'Type your answer here';

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
      seconds.innerHTML = nums.time + 's';
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
    question.className = 'btn btn-primary';
    // ***TODO change question button background color - darker***
    question.style.fontStyle = 'normal';
    input.style.backgroundColor = 'white';
    input.value = '';

    return;
  }

  // check answer function
  checkAnswer = () => {
    if (math.answer == math.response) {
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
    if (nums.correctCount == 0) {
      correctScore.style.color = '#006400';
    }
    nums.correctCount++;
    correctScore.innerHTML = '|| Correct: ' + nums.correctCount;

    // update timer
    nums.time++;
    seconds.innerHTML = nums.time + 's';

    // new question
    mathProblem();
  }

  // incorrect response function
  incorrect = () => {
    // play incorrect chime
    chimeIncorrect.play();

    // update incorrect score, change color
    if (nums.incorrectCount == 0) {
      incorrectScore.style.color = '#B90E0A';
    }
    nums.incorrectCount++;
    incorrectScore.innerHTML = '|| Incorrect: ' + nums.incorrectCount;

    // new question
    mathProblem();
  }

  //////////////////////////////////////////////////

  // END GAME function
  endGame = () => {
    // stop countdown
    clearInterval(startCountdown);

    // pause clock sound, play buzzer
    clockSound.pause();
    buzzer.play();

    // update round (displays on new game click)
    nums.round++;

    // update high score
    if (nums.highScore < nums.correctCount) {
      nums.highScore = nums.correctCount;
      highScore.innerHTML = '|| High score: ' + nums.highScore;
    }

    // reset time
    nums.time = 10;
    seconds.innerHTML = nums.time + 's';

    // display game over
    submitButton.innerHTML = 'Score: ' + nums.correctCount;
    submitButton.style.backgroundColor = '#006400';

    // reset start game button, give focus
    question.innerHTML = 'New game';
    question.disabled = false;
    focusButton();

    // reset input field, focus form
    input.value = 'Game over!';
    input.style.color = '#006400';
    input.style.fontWeight = 'bold';
    //***TODO change awful yellow color***
    input.style.backgroundColor = 'rgb(255, 254, 200)';

    // disable submit button and input field
    submitButton.disabled = true;
    input.disabled = true;
  }
});