// DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  // grab elements
  const question = document.querySelector('#question');
  const input = document.querySelector('#answerText');
  const submitButton = document.querySelector('#submit');
  const seconds = document.querySelector('#seconds');
  const correctScore = document.querySelector('#correct');
  const incorrectScore = document.querySelector('#incorrect');
  const instructions = document.querySelector('#instructions');
  const gameArea = document.querySelector('#game-area');

  // declare nums objects
  nums = {};
  
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

  // declare counters
  let time = 10;
  var correctCount;
  var incorrectCount;

  var startCountdown;

  var endGame = () => {
    // stop countdown
    clearInterval(startCountdown);

    // pause clock sound, play buzzer
    clockSound.pause();
    buzzer.play();

    // reset time
    time = 10;
    seconds.innerHTML = time + 's';

    // display game over
    submitButton.innerHTML = 'Score: ' + correctCount;
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

  // define math problem function
  var mathProblem = () => {
    // focus form, autocomplete off
    focusForm();

    // generate math problem
    nums = getNums();
    console.log(nums);

    // update page elements
    question.innerHTML = nums.x + ' + ' + nums.y;
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
    correctCount = 0;
    correctScore.innerHTML = '|| Correct: ' + correctCount;
    correctScore.style.color = '#152238';
    incorrectCount = 0;
    incorrectScore.innerHTML = '|| Incorrect: ' + incorrectCount;
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
    input.placeholder = 'type your answer here';

    // start clock sound
    clockSound.play();

    // countdown function
    var countdown = () => {
      if (time > 1) {
        time--;
        seconds.innerHTML = time + 's';
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

    // assign to nums object
    Object.assign(nums, {'response': response});
    console.log(nums);
    
    if (nums.answer == nums.response) {
      correct();
    } else {
      incorrect();
    }
    return;
  }

  // correct response function
  var correct = () => {

    // play correct chime
    chimeCorrect.play();

    // update correct score, change color
    if (correctCount == 0) {
      correctScore.style.color = '#006400';
    }
    correctCount++;
    correctScore.innerHTML = '|| Correct: ' + correctCount;

    // update timer
    time++;
    seconds.innerHTML = time + 's';

    // new question
    mathProblem();
  }

  // incorrect response function
  var incorrect = () => {
    // play incorrect chime
    chimeIncorrect.play();

    // update incorrect score, change color
    if (incorrectCount == 0) {
      incorrectScore.style.color = '#B90E0A';
    }
    incorrectCount++;
    incorrectScore.innerHTML = '|| Incorrect: ' + incorrectCount;

    // new question
    mathProblem();
  }
});