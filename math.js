// DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
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

  // grab elements
  const question = document.querySelector('#question');
  const input = document.querySelector('#answerText');
  const submitButton = document.querySelector('#submit');
  const seconds = document.querySelector('#seconds');
  const correctScore = document.querySelector('#correct');
  const incorrectScore = document.querySelector('#incorrect');
  
  // disable submit button
  submitButton.disabled = true;
  console.log(submitButton);

  // focus functions
  focusForm = () => {
    input.focus();
    input.autocomplete = 'off';
  }

  focusButton = () => {
    question.focus();
  }

  // set timer
  let time = 10;

  // timer function
  var timerRound = () => {
    time++;
    seconds.innerHTML = time + 's';
    return time;
  }

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
    submitButton.innerHTML = 'Game over!';
    submitButton.style.backgroundColor = 'red';

    // reset start game button, give focus
    question.innerHTML = 'Start game';
    question.disabled = false;
    focusButton();

    // reset input field, focus form
    input.value = '';

    // disable submit button
    submitButton.disabled = true;
  }

  // #questionButton click
  question.onclick = () => { 

    // reset score counters
    let correctCount = 0;
    correctScore.innerHTML = '|| Correct: ' + correctCount;
    correctScore.style.color = '#152238';
    let incorrectCount = 0;
    incorrectScore.innerHTML = '|| Incorrect: ' + incorrectCount;
    incorrectScore.style.color = '#152238';

    // focus form, autocomplete off
    focusForm();

    // generate math problem
    let nums = getNums();
    console.log(nums);

    // disable question button
    question.disabled = true;

    // enable & darken submit button
    submitButton.disabled = false;
    submitButton.style.backgroundColor = '#4682B4';
    submitButton.style.color = 'white';
    submitButton.style.fontWeight = 'bold';
    submitButton.innerHTML = 'Submit';

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

    // update page elements
    question.innerHTML = nums.x + ' + ' + nums.y;
    question.className = 'btn btn-primary';
    question.style.fontStyle = 'normal';
    input.style.backgroundColor = 'white';
    input.value = '';
    focusForm();

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
      console.log(correctCount);
      correctScore.innerHTML = '|| Correct: ' + correctCount;

      // update timer
      time++;
      seconds.innerHTML = time + 's';
    }

    // incorrect response function
    var incorrect = () => {
      // play incorrect chime
      chimeIncorrect.play();

      // update incorrect score, change color
      console.log(incorrectCount);
      if (incorrectCount == 0) {
        incorrectScore.style.color = '#B90E0A';
      }
      incorrectCount++;
      incorrectScore.innerHTML = '|| Incorrect: ' + incorrectCount;
    }
  }
});