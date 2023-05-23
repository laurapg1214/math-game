// DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
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
  
  // disable submit button and input field
  submitButton.disabled = true;
  input.disabled = true;

  // randomly generate variables
  var generateX = () => {
    let x = Math.floor((Math.random() * 12) + 1);
    return x;
  }

  var generateY = () => {
    let y = Math.floor((Math.random() * 12) + 1);
    return y;
  }

  // generate question variables and answer
  var calculate = (x, y) => {
    return x + y;
  }

  // getNums function as object
  var getNums = () => {
    let x = generateX(),
        y =  generateY(),
        answer = calculate(x, y);

    // return values
    return {x, y, answer};
  }

  // focus functions
  focusForm = () => {
    input.autocomplete = 'off';
    input.focus();
  }

  focusButton = () => {
    question.focus();
  }

  var endGame = () => {
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

  // TODO: define max number prompt function
  // var maxNumPrompt = () => {
    // let maxNum = 0;
    // question.innerHTML = 'Maximum number';
    // input.placeholder = 'Enter maximum number for math questions';
    // }
  // }

  // define math problem function
  var mathProblem = () => {
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

  // #questionButton click to start game
  question.onclick = () => { 

    // if start, hide instructions, make game area visible
    if (gameArea.style.display = 'none') {
      instructions.style.display = 'none';
      gameArea.style.display = 'block';
    }

    // reset score counters
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

    // enable input field and add placeholder
    input.disabled = false;
    input.placeholder = 'Type your answer here';

    // TODO: run maxNum input grab function
    // maxNumPrompt();
    // console.log(maxNum);

    // start clock sound
    clockSound.play();

    // countdown function
    var countdown = () => {
      if (nums.time > 1) {
        nums.time--;
        seconds.innerHTML = nums.time + 's';
      } else {
        endGame();
      }
    }

    // start countdown
    startCountdown = setInterval(countdown, 1000);

    // run math problem function
    mathProblem();
  }

  // event listener for enter key (submit)
  input.addEventListener('keypress', function(event) {  
    if (event.key === 'Enter') {
      event.preventDefault();
      // trigger submit button element with click
      submitButton.click()
    }
  });

  // submit button functionality
  submitButton.onclick = () => {
    // grab input, convert to number
    const response = Number(input.value);

    // TODO if-else for whether maxNum or game response
    // if (maxNum == 0) {
      // if (response <= 0) {
        // reprompt for maxNum
        // maxNumPrompt();
     // } else {
        // maxNum = response;
      // }
    // } else {
    // assign to math object
    math.response = response;
    console.log(math);
    
    if (math.answer == math.response) {
      correct();
    } else {
      incorrect();
    }
    // }
    return;
  }

  // correct response function
  var correct = () => {

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
  var incorrect = () => {
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
});