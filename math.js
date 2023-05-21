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
  var question = document.querySelector('#question');
  var newQuestion = document.querySelector('#newQuestion');
  var input = document.querySelector('#answerText');
  var questionDiv = document.querySelector('.question');
  var submit = document.querySelector('#submit');

  // focus functions
  focusForm = () => {
    input.focus();
    input.autocomplete = 'off';
  }

  focusButton = () => {
    newQuestion.focus();
  }

  // on #questionButton click, display question
  newQuestion.onclick = () => {
    question.style.backgroundColor = 'gray';
    input.style.backgroundColor = 'white';
    input.value = '';
    submit.className = 'btn btn-primary';
    focusForm();
    
    let nums = getNums();
    console.log(nums);

    // update page elements
    question.innerHTML = nums.x + ' + ' + nums.y;
    question.style.fontWeight = 'bold';
    question.style.color = 'white';
    question.style.fontStyle = 'normal';

    // on submit, generate answer; change answer to fixed; hide submit button
    // event listener for enter key
    input.addEventListener('keypress', function(event) {  
      if (event.key === 'Enter') {
        event.preventDefault();
        // trigger submit button element with click
        submit.click()
      }
    });

    // submit button functionality
    submit.onclick = () => {
      // disable submit button, change button type
      submit.className = 'btn btn-dark disabled';
      // run answer function to get correct answer
      const answer = calculate(nums.x, nums.y);

      // grab input, convert to number
      const response = Number(input.value);

      // assign to nums object
      Object.assign(nums, {'response': response});
      console.log(nums);
      
      if (answer == nums.response) {
        correct();
      } else {
        incorrect();
      }
    }

    // correct response function
    var correct = () => {
      question.style.backgroundColor = 'green';
      question.innerHTML = 'Correct!'
      input.value = nums.x + ' + ' + nums.y + ' = ' + nums.answer; 
      input.style.backgroundColor = 'green';
      input.style.color = 'white';
      focusButton();
    }

    // incorrect response function
    var incorrect = () => {
      question.style.backgroundColor = '#ff726f';
      question.style.color = 'black';
      question.style.fontStyle = 'italic';
      question.style.fontWeight = 'normal';
      question.innerHTML = nums.response + ' is incorrect';
      questionDiv.style.width = '500px';
      input.value = nums.x + ' + ' + nums.y + ' = ' + nums.answer; 
      input.style.backgroundColor = '#ff726f';
      focusButton();
    }

    // TODO: create timer
  }
    

  

  // clock timer function; end game after 10 sec; correct = +1 sec for next round
});