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

  // On #questionButton click, display question
  var question = document.querySelector('#question');
  var newQuestion = document.querySelector('#newQuestion');
  var input1 = document.querySelector('#answerText');
  var form1 = document.querySelector('#inputSection');
  newQuestion.onclick = () => {
    question.style.backgroundColor = 'gray';
    input1.style.backgroundColor = 'white';
    form1.innerHTML = '<input class="answer" type="text" placeholder="type your answer here" id="answerText" autofocus />';
    // getNums function as object
    var getNums = () => {
      let x = generateX(),
          y =  generateY(),
          answer = calculate(x, y);

      // return values
      return {x, y, answer};
    }
    let nums = getNums();
    console.log(nums);
    question.innerHTML = nums.x + ' + ' + nums.y;
    question.style.fontWeight = 'bold';
    question.class = '"btn btn-secondary btn-block"';

    // on submit, generate answer; change answer to fixed; hide submit button
    var submit = document.querySelector('#submit');
    var input = document.querySelector('#answerText');

    // event listener for enter key
    input.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        // trigger submit button element with click
        submit.click()
      }
    })

    // submit button functionality
    submit.onclick = () => {
      // run answer function to get correct answer
      const answer = calculate(nums.x, nums.y);

      // grab input, convert to number
      const response = Number(document.querySelector('#answerText').value);
      
      if (answer == response) {
        correct();
      } else {
        incorrect();
      }
    }

    // correct response function
    var correct = () => {
      question.style.backgroundColor = 'green';
      question.innerHTML = 'Correct!'
      question.style.fontWeight = 'normal';
      input.value = nums.x + ' + ' + nums.y + ' = ' + nums.answer; 
      input.style.backgroundColor = 'green';
      input.style.color = 'white';
    }
  }
    

  

  // clock timer function; end game after 10 sec; correct = +1 sec for next round
});