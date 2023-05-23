// DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  // ORDER: setup, start game, play game in-game, end game
  // VARIABLE & OBJECT STRUCTURING, INITIAL WINDOW STATE
  // breakdown: 2 objects:
  // math (to store math problem & answer variables)
  math = {};
  // nums (to store counters, time etc)
  nums = {
    // initialize counters
    time: 10,
    correctCount: 0,
    incorrectCount: 0,
    
    // initialize max number
    maxNum: 0,
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

  // declare countdown var
  var startCountdown;

  // MATH PROBLEM FUNCTIONALITY
  // randomly generate variables
  generateX = () => {
    let x = Math.floor((Math.random() * 12) + 1);
    return x;
  }

  generateY = () => {
    let y = Math.floor((Math.random() * 12) + 1);
    return y;
  }

  // generate question variables and answer
  calculate = (x, y) => {
    return x + y;
  }

  // getNums function as object
  getNums = () => {
    let x = generateX(),
        y =  generateY(),
        answer = calculate(x, y);

    // return values
    return {x, y, answer};
  }

  /////////////////////////////////////////////////

  // START GAME
  startGame = () => {
    instructions.style.display = 'none';
    gameArea.style.display = 'block';
    focusForm();

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

    // TODO: run maxNum input grab function
    maxNumPrompt();
  }

  // TODO: define max number prompt function
  maxNumPrompt = () => {
    console.log('hi!');
    question.innerHTML = 'What maximum number do you want to use for your math problems?';
    input.placeholder = 'Enter number here';
    submitButton.onclick = () => {
      let x = Number(input.value);
      //reset input field
      input.value = '';
      if (isNaN(x) || x <= 0) {
        // rerun function
        maxNumPrompt();
      } else {
        // assign to maxNum
        nums.maxNum = x;
        console.log(nums.maxNum);
        // start game 
        playGame();
      }
    }
  }

  // play game function
  playGame = () => {
    // reset input field w placeholder
    input.value = '';
    input.placeholder = 'Type your answer here';

    // start clock sound
    clockSound.play();

    // start countdown function
    countdown();

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
    math = getNums();
    console.log(math);

    // update page elements
    question.innerHTML = math.x + ' + ' + math.y;
    question.className = 'btn btn-primary';
    question.style.fontStyle = 'normal';
    input.style.backgroundColor = 'white';
    input.value = '';

    return;
  }

  // question button functionality
  question.onclick = () => {
    // hide instructions, make game area visible, maxNum set
    if (gameArea.style.display = 'none') {
      startGame();
    } else {
      maxNumPrompt();
    }

  }

  // submit button functionality
  if (nums.maxNum != 0) {
    submitButton.onclick = () => {
      // grab input, convert to number
      const response = Number(input.value);
        
      // assign to math object
      math.response = response;
      console.log(math);
    
      // check answer
      checkAnswer();
      return;
    } 
  }

  // event listener for enter key (submit)
  input.addEventListener('keypress', function(event) {  
    if (event.key === 'Enter') {
      event.preventDefault();
      // trigger submit button element with click
      submitButton.click()
    }
  });

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

  // focus functions
  focusForm = () => {
    input.autocomplete = 'off';
    input.focus();
  }

  focusButton = () => {
    question.focus();
  }

  //////////////////////////////////////////////////

  // END GAME function
  endGame = () => {
    // stop countdown
    clearInterval(startCountdown);

    // pause clock sound, play buzzer
    clockSound.pause();
    buzzer.play();

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
    input.style.backgroundColor = 'rgb(255, 254, 200)';

    // disable submit button and input field
    submitButton.disabled = true;
    input.disabled = true;
  }
});