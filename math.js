// DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  // randomly generate variables
  let x = Math.floor((Math.random() * 12) + 1);
  let y = Math.floor((Math.random() * 12) + 1);
  console.log(x, y);

  // generate question variables and answer
  var calculate = (x, y) => {
    return x + y;
  }
  
  // On #questionButton click, display question
  var question = document.querySelector('#questionButton');
  question.onclick = () => {
    question.innerHTML = x + ' + ' + y;
  }

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
    const answer = calculate(x, y);

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
    input.style.backgroundColor = 'green';
    input.style.color = 'white';
  }
    

  

  // clock timer function; end game after 10 sec; correct = +1 sec for next round
});