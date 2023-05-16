// DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // TODO: dynamically add question to #question div
  document.querySelector('#questionButton').onclick = () => {
    let x = Math.floor((Math.random() * 12) + 1);
    let y = Math.floor((Math.random() * 12) + 1);

    var response = function (x, y) {
      const z = x + y;
      return z;
    }

    document.querySelector('#questionText').innerHTML = x + ' + ' + y;
    document.querySelector('#questionText').style.display = block;
    document.querySelector('#questionButton').style.display = none;
  }
  
    // TODO: on #questionButton click, display #question hide button

  // TODO: on submit, generate #response; change answer to fixed; hide submit button

  // clock timer function; end game after 10 sec; correct = +1 sec for next round
});