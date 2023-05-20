// DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // generate question variables and answer
  var calculate = (x, y) => {
    return x + y;
  }
  
  // dynamically add question to #question div
  var question = document.querySelector('#questionButton');
  question.onclick = () => {
    
    // randomly generate variables
    let x = Math.floor((Math.random() * 12) + 1);
    let y = Math.floor((Math.random() * 12) + 1);
  
    // run answer function to get correct answer
    const answer = calculate(x, y);

    // TODO: on #questionButton click, display question, hide button
    question.innerHTML = x + ' + ' + y;
  }

  // TODO: on submit, generate answer; change answer to fixed; hide submit button
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
  submit.onclick = () => {
    console.log('submit');
  }
    

  

  // clock timer function; end game after 10 sec; correct = +1 sec for next round
});