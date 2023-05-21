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
  const questionDiv = document.querySelector('.question');
  const submitButton = document.querySelector('#submit');
  const seconds = document.querySelector('#seconds');
  

  // focus functions
  focusForm = () => {
    input.focus();
    input.autocomplete = 'off';
  }

  focusButton = () => {
    question.focus();
  }

  // time variable
  let time = 10;

  // timer function
  var timerRound = () => {
    time++;
    seconds.innerHTML = time + 's';
    return time;
  }

  // #questionButton click
  question.onclick = () => { 
    // generate math problem
    let nums = getNums();
    console.log(nums);

    // darken submit button
    submitButton.style.backgroundColor = '#4682B4';
    submitButton.style.color = 'black';
    submitButton.style.fontWeight = 'bold';

    // start clock sound
    clockSound.play();

    // countdown function
    var countdown = () => {
      if (time > 1) {
        time--;
        seconds.innerHTML = time + 's';
      } else {
        // stop countdown
        clearInterval(startCountdown);
        // reset timer to timeStart number
        time = timeStart;
        // submit 
        submitButton.click();
      }
    }

    // start countdown, storing current timer value
    let timeStart = time;
    var startCountdown = setInterval(countdown, 1000);

    // update page elements
    question.innerHTML = nums.x + ' + ' + nums.y;
    question.className = 'btn btn-primary';
    question.style.fontStyle = 'normal';
    input.style.backgroundColor = 'white';
    input.value = '';
    submitButton.innerHTML = 'Submit';
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
      // disable submit button
      submitButton.disabled = 'false';

      // stop clock sound & reset
      clockSound.pause();
      clockSound.currentTime = 0;

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
      // stop countdown
      clearInterval(startCountdown);

      // reset time
      time = timeStart;

      // play correct chime
      chimeCorrect.play();

      // update timer
      time = timerRound(time);
      seconds.innerHTML = time + 's';

      // announce answer
      question.innerHTML = 'New question';
      submitButton.innerHTML = 'Correct!';
      input.value = nums.x + ' + ' + nums.y + ' = ' + nums.answer;

      // adjust stylings
      input.style.backgroundColor = '#3A9A00';
      input.style.color = 'white';
      submitButton.style.backgroundColor = '#3A9A00';
      submitButton.style.color = 'white';

      // focus on new question button
      focusButton();
    }

    // incorrect response function
    var incorrect = () => {
      // stop countdown
      clearInterval(startCountdown);

      // reset time
      time = timeStart;

      // play incorrect chime
      chimeIncorrect.play();

      // reset timer
      time = 10;
      seconds.innerHTML = time + 's';

      // announce answer
      submitButton.innerHTML = nums.response + ' is incorrect';
      input.value = nums.x + ' + ' + nums.y + ' = ' + nums.answer; 
      
      // adjust stylings
      input.style.backgroundColor = '#ff726f';
      input.style.color = 'white';
      submitButton.style.backgroundColor = '#ff726f';
      submitButton.style.color = 'white';

      // reset new question button
      question.innerHTML = 'New question';

      // focus on new question button
      focusButton();
    }
  }
});