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
  const newQuestion = document.querySelector('#newQuestion');
  const input = document.querySelector('#answerText');
  const questionDiv = document.querySelector('.question');
  const submitButton = document.querySelector('#submit');
  const clock = document.querySelector('#clock');
  const seconds = document.querySelector('#seconds');
  

  // focus functions
  focusForm = () => {
    input.focus();
    input.autocomplete = 'off';
  }

  focusButton = () => {
    newQuestion.focus();
  }

  // time variable
  let time = 10;

  // timer function
  var timer = () => {
    time++;
    seconds.innerHTML = time + 's';
    return time;
  }

  // link to inner html of h2
  timer.innerHTML = time + 's';

  // clock animation function
  var clockAnimation = (time) => {
    clock.style.display = 'inline';
    clock.style.position = 'relative';
    clock.style.animationName = 'move';
    clock.style.animationDuration = time + 's';
    clock.style.animationFillMode = 'forwards';
  }

  // #questionButton click
  newQuestion.onclick = () => { 
    // generate math problem
    let nums = getNums();
    console.log(nums);

    // start clock sound
    clockSound.play();

    // start animation
    clockAnimation(time);

    // update page elements
    question.innerHTML = nums.x + ' + ' + nums.y;
    question.className = 'btn btn-primary';
    question.style.fontWeight = 'bold';
    question.style.fontStyle = 'normal';
    question.style.backgroundColor = '#00008B';
    input.style.backgroundColor = 'white';
    input.value = '';
    submitButton.className = 'btn btn-info';
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
      // disable submit button, change button type
      submitButton.className = 'btn btn-dark disabled';

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
      // play correct chime
      chimeCorrect.play();
      time = timer(time);
      console.log(time);

      // announce answer
      question.innerHTML = 'Correct!'
      input.value = nums.x + ' + ' + nums.y + ' = ' + nums.answer;

      // adjust stylings
      question.style.backgroundColor = '#3A9A00'; 
      input.style.backgroundColor = '#3A9A00';
      input.style.color = 'white';

      // focus on new question button
      focusButton();
    }

    // incorrect response function
    var incorrect = () => {
      // play incorrect chime
      chimeIncorrect.play();

      // reset timer
      time = 10;
      seconds.innerHTML = time + 's';

      // announce answer
      question.innerHTML = nums.response + ' is incorrect';
      input.value = nums.x + ' + ' + nums.y + ' = ' + nums.answer; 
      
      // adjust stylings
      question.style.backgroundColor = '#ff726f';
      question.style.fontStyle = 'italic';
      question.style.fontWeight = 'normal';
      questionDiv.style.width = '500px';
      input.style.backgroundColor = '#ff726f';
      input.style.color = 'white';

      // focus on new question button
      focusButton();
    }
  }
});